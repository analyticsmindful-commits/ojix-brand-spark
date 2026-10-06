import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const VIEWPORTS = [320, 360, 390, 768, 1024, 1440, 1920, 2560, 3840];
const DEBUG_PORT = 9222;

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJson(url: string) {
  const res = await fetch(url);
  return res.json();
}

class CdpClient {
  private ws: WebSocket;
  private id = 0;
  private callbacks = new Map<number, (res: any) => void>();

  constructor(wsUrl: string) {
    this.ws = new WebSocket(wsUrl);
  }

  async connect() {
    return new Promise<void>((resolve, reject) => {
      this.ws.onopen = () => resolve();
      this.ws.onerror = (e) => reject(e);
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data.toString());
        if (data.id && this.callbacks.has(data.id)) {
          const cb = this.callbacks.get(data.id)!;
          this.callbacks.delete(data.id);
          cb(data);
        }
      };
    });
  }

  async send(method: string, params: any = {}) {
    const id = ++this.id;
    return new Promise<any>((resolve, reject) => {
      this.callbacks.set(id, (res) => {
        if (res.error) reject(new Error(JSON.stringify(res.error)));
        else resolve(res.result);
      });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.ws.close();
  }
}

interface ViewportResult {
  vw: number;
  docScrollWidth: number;
  docClientWidth: number;
  bodyScrollWidth: number;
  bodyClientWidth: number;
  hasHorizontalScroll: boolean;
  portfolioWidth: number;
  portfolioScrollWidth: number;
  preWidth: number;
  preScrollWidth: number;
  preClientWidth: number;
  preHasHorizontalBlowout: boolean;
  uncontainedElements: any[];
}

interface TouchTargetResult {
  selector: string;
  label: string;
  width: number;
  height: number;
  meets48px: boolean;
  meets44px: boolean;
  category: "tab" | "button" | "toggle";
}

async function run() {
  console.log("=== CHALLENGER M2: BROWSER RESPONSIVE STRESS TEST ===");

  const list = await fetchJson(`http://localhost:${DEBUG_PORT}/json/list`);
  const pageTarget = list.find(
    (t: any) => t.type === "page" && t.webSocketDebuggerUrl && t.url.includes("5174"),
  );

  if (!pageTarget) {
    console.error("Could not find page target on port 5174!");
    process.exit(1);
  }

  console.log(`Connecting to page: ${pageTarget.url}`);
  const client = new CdpClient(pageTarget.webSocketDebuggerUrl);
  await client.connect();

  await client.send("Page.enable");
  await client.send("DOM.enable");
  await client.send("Runtime.enable");

  // Ensure page is navigated to portfolio section
  await client.send("Page.navigate", { url: "http://localhost:5174/#portfolio" });
  await sleep(2000);

  const viewportResults: ViewportResult[] = [];

  // ==========================================
  // OBJECTIVE 1 & 2: 9 CANONICAL VIEWPORTS & ZERO HORIZONTAL SCROLL
  // ==========================================
  for (const width of VIEWPORTS) {
    console.log(`\n--------------------------------------------`);
    console.log(`STRESS-TESTING VIEWPORT: ${width}px x 1080px`);

    await client.send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });
    await sleep(600);

    // Scroll portfolio into view
    await client.send("Runtime.evaluate", {
      expression: `(() => {
        const el = document.getElementById('portfolio');
        if (el) el.scrollIntoView();
      })()`,
    });
    await sleep(200);

    // Test DOM and JSON block in initial state
    const evalResult = await client.send("Runtime.evaluate", {
      expression: `(() => {
        const vw = window.innerWidth;
        const docEl = document.documentElement;
        const body = document.body;
        const portfolio = document.getElementById('portfolio');
        const pre = document.querySelector('#portfolio pre');

        const docScrollWidth = docEl.scrollWidth;
        const docClientWidth = docEl.clientWidth;
        const bodyScrollWidth = body.scrollWidth;
        const bodyClientWidth = body.clientWidth;

        const hasHorizontalScroll = docScrollWidth > vw || bodyScrollWidth > vw;

        // Check if pre blows out its container or document
        let preWidth = 0;
        let preScrollWidth = 0;
        let preClientWidth = 0;
        let preHasHorizontalBlowout = false;

        if (pre) {
          const preRect = pre.getBoundingClientRect();
          preWidth = Math.round(preRect.width);
          preScrollWidth = pre.scrollWidth;
          preClientWidth = pre.clientWidth;
          // pre should scroll internally; its right edge must not exceed vw
          preHasHorizontalBlowout = preRect.right > vw + 1;
        }

        // Check uncontained elements within portfolio
        const uncontained = [];
        if (portfolio) {
          const allPortfolioElements = portfolio.querySelectorAll('*');
          for (const el of allPortfolioElements) {
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) continue;
            if (rect.right > vw + 1) {
              const comp = window.getComputedStyle(el);
              const parentComp = el.parentElement ? window.getComputedStyle(el.parentElement) : null;
              const isScrollable = comp.overflowX === 'auto' || comp.overflowX === 'scroll' || 
                                   (parentComp && (parentComp.overflowX === 'auto' || parentComp.overflowX === 'scroll'));
              if (!isScrollable) {
                uncontained.push({
                  tag: el.tagName.toLowerCase(),
                  className: (typeof el.className === 'string') ? el.className.slice(0, 80) : '',
                  right: Math.round(rect.right),
                  vw,
                  overflowPx: Math.round(rect.right - vw)
                });
              }
            }
          }
        }

        const portRect = portfolio ? portfolio.getBoundingClientRect() : null;

        return {
          vw,
          docScrollWidth,
          docClientWidth,
          bodyScrollWidth,
          bodyClientWidth,
          hasHorizontalScroll,
          portfolioWidth: portRect ? Math.round(portRect.width) : 0,
          portfolioScrollWidth: portfolio ? portfolio.scrollWidth : 0,
          preWidth,
          preScrollWidth,
          preClientWidth,
          preHasHorizontalBlowout,
          uncontainedElements: uncontained
        };
      })()`,
      returnByValue: true,
    });

    const res = evalResult.result.value as ViewportResult;
    viewportResults.push(res);

    console.log(`  Window innerWidth: ${res.vw}px`);
    console.log(`  Doc scrollWidth: ${res.docScrollWidth}px (client: ${res.docClientWidth}px)`);
    console.log(`  Body scrollWidth: ${res.bodyScrollWidth}px (client: ${res.bodyClientWidth}px)`);
    console.log(
      `  Horizontal Document Scroll: ${res.hasHorizontalScroll ? "DETECTED (FAIL)" : "ZERO (PASS)"}`,
    );
    console.log(
      `  JSON <pre> Width: ${res.preWidth}px, scrollWidth: ${res.preScrollWidth}px, clientWidth: ${res.preClientWidth}px`,
    );
    console.log(
      `  JSON <pre> Horizontal Blowout: ${res.preHasHorizontalBlowout ? "BLOWOUT (FAIL)" : "CONTAINED (PASS)"}`,
    );
    console.log(`  Uncontained Elements: ${res.uncontainedElements.length}`);
    if (res.uncontainedElements.length > 0) {
      console.warn("  Uncontained elements detail:", JSON.stringify(res.uncontainedElements));
    }
  }

  // ==========================================
  // OBJECTIVE 3: TABLET 768px STRESS TEST
  // ==========================================
  console.log(`\n============================================`);
  console.log(`STRESS-TESTING TABLET VIEWPORT (768px) LAYOUT INTEGRITY`);

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 768,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await sleep(600);

  const tabletEval = await client.send("Runtime.evaluate", {
    expression: `(() => {
      const tabs = Array.from(document.querySelectorAll('#portfolio [role="tablist"] button')).map(b => {
        const r = b.getBoundingClientRect();
        const textSpan = b.querySelector('span.truncate');
        const isClipped = textSpan ? textSpan.scrollWidth > textSpan.clientWidth : false;
        return {
          text: b.textContent.replace(/\\s+/g, ' ').trim(),
          width: Math.round(r.width),
          height: Math.round(r.height),
          isClipped,
          textScrollWidth: textSpan ? textSpan.scrollWidth : 0,
          textClientWidth: textSpan ? textSpan.clientWidth : 0
        };
      });

      const metricsContainer = document.querySelector('[data-testid="metric-dashboard"]');
      const metricCards = metricsContainer ? Array.from(metricsContainer.children).map((c, i) => {
        const r = c.getBoundingClientRect();
        const headline = c.querySelector('.font-display');
        return {
          index: i,
          width: Math.round(r.width),
          height: Math.round(r.height),
          left: Math.round(r.left),
          right: Math.round(r.right),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          headline: headline ? headline.textContent.trim() : ''
        };
      }) : [];

      // Check metric card collisions
      const metricCollisions = [];
      for (let i = 0; i < metricCards.length; i++) {
        for (let j = i + 1; j < metricCards.length; j++) {
          const c1 = metricCards[i];
          const c2 = metricCards[j];
          const hOverlap = Math.max(0, Math.min(c1.right, c2.right) - Math.max(c1.left, c2.left));
          const vOverlap = Math.max(0, Math.min(c1.bottom, c2.bottom) - Math.max(c1.top, c2.top));
          // allow 1px border gap overlap
          if (hOverlap > 2 && vOverlap > 2) {
            metricCollisions.push({ c1: c1.index, c2: c2.index, hOverlap, vOverlap });
          }
        }
      }

      // Check Forensic split
      const forensicCols = Array.from(document.querySelectorAll('#portfolio .grid-cols-1 > div, #portfolio .lg\\\\:grid-cols-2 > div')).filter(d => {
        return d.textContent.includes('Fragile Manual Baseline') || d.textContent.includes('OJIX Proprietary Operating System');
      }).map(d => {
        const r = d.getBoundingClientRect();
        return {
          title: d.textContent.includes('Fragile') ? 'Fragile' : 'OJIX',
          width: Math.round(r.width),
          height: Math.round(r.height),
          left: Math.round(r.left),
          right: Math.round(r.right),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom)
        };
      });

      // Check Topology nodes
      const topologyNodes = Array.from(document.querySelectorAll('#portfolio [aria-label="Workflow Topology Stages"] > button')).map((b, i) => {
        const r = b.getBoundingClientRect();
        return {
          stage: i + 1,
          width: Math.round(r.width),
          height: Math.round(r.height),
          left: Math.round(r.left),
          right: Math.round(r.right),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          text: b.querySelector('h4') ? b.querySelector('h4').textContent.trim() : ''
        };
      });

      // Check topology collisions
      const topologyCollisions = [];
      for (let i = 0; i < topologyNodes.length; i++) {
        for (let j = i + 1; j < topologyNodes.length; j++) {
          const n1 = topologyNodes[i];
          const n2 = topologyNodes[j];
          const hOverlap = Math.max(0, Math.min(n1.right, n2.right) - Math.max(n1.left, n2.left));
          const vOverlap = Math.max(0, Math.min(n1.bottom, n2.bottom) - Math.max(n1.top, n2.top));
          if (hOverlap > 2 && vOverlap > 2) {
            topologyCollisions.push({ n1: n1.stage, n2: n2.stage, hOverlap, vOverlap });
          }
        }
      }

      return {
        tabs,
        metricCards,
        metricCollisions,
        forensicCols,
        topologyNodes,
        topologyCollisions
      };
    })()`,
    returnByValue: true,
  });

  const tabletRes = tabletEval.result.value;
  console.log(`  Domain Tabs rendered: ${tabletRes.tabs.length}`);
  tabletRes.tabs.forEach((t: any, i: number) => {
    console.log(
      `    Tab ${i + 1}: ${t.width}x${t.height}px | Clipped: ${t.isClipped ? "YES" : "NO"} | text: "${t.text}"`,
    );
  });
  console.log(`  Metric Cards rendered: ${tabletRes.metricCards.length}`);
  console.log(`  Metric Collisions: ${tabletRes.metricCollisions.length}`);
  console.log(`  Forensic Columns rendered: ${tabletRes.forensicCols.length}`);
  tabletRes.forensicCols.forEach((f: any) => {
    console.log(
      `    Forensic ${f.title}: ${f.width}x${f.height}px [L:${f.left}, R:${f.right}, T:${f.top}, B:${f.bottom}]`,
    );
  });
  console.log(`  Topology Stage Nodes rendered: ${tabletRes.topologyNodes.length}`);
  console.log(`  Topology Collisions: ${tabletRes.topologyCollisions.length}`);
  tabletRes.topologyNodes.forEach((n: any) => {
    console.log(
      `    Stage ${n.stage} ("${n.text}"): ${n.width}x${n.height}px [L:${n.left}, R:${n.right}, T:${n.top}, B:${n.bottom}]`,
    );
  });

  // ==========================================
  // OBJECTIVE 4: TOUCH TARGET MEASUREMENTS (WCAG 2.5.5 & 2.5.8)
  // ==========================================
  console.log(`\n============================================`);
  console.log(`STRESS-TESTING INTERACTIVE TOUCH TARGETS (WCAG STANDARDS)`);

  // We test touch targets across 320px, 390px, 768px, and 1024px
  const touchViewports = [320, 390, 768, 1024];
  const touchResultsByVw: Record<number, TouchTargetResult[]> = {};

  for (const vw of touchViewports) {
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: vw,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: vw < 768,
    });
    await sleep(400);

    const touchEval = await client.send("Runtime.evaluate", {
      expression: `(() => {
        const results = [];

        // 1. Domain Tabs
        const tabList = document.querySelectorAll('#portfolio [role="tablist"] button');
        tabList.forEach((btn, idx) => {
          const r = btn.getBoundingClientRect();
          results.push({
            selector: 'tablist-button-' + idx,
            label: btn.textContent.replace(/\\s+/g, ' ').trim().slice(0, 30),
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10,
            meets48px: r.height >= 48 && r.width >= 48,
            meets44px: r.height >= 44 && r.width >= 44,
            category: 'tab'
          });
        });

        // 2. Primary CTA ("Extract This Workflow")
        const cta = document.querySelector('#portfolio a[href="#extraction"]');
        if (cta) {
          const r = cta.getBoundingClientRect();
          results.push({
            selector: 'cta-extract-workflow',
            label: cta.textContent.replace(/\\s+/g, ' ').trim(),
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10,
            meets48px: r.height >= 48 && r.width >= 48,
            meets44px: r.height >= 44 && r.width >= 44,
            category: 'button'
          });
        }

        // 3. Architecture Mode switch buttons
        const modeButtons = document.querySelectorAll('#portfolio button:has(text), #portfolio button');
        modeButtons.forEach((btn, idx) => {
          const text = btn.textContent.trim();
          if (text.includes('OJIX Engineered Core') || text.includes('Fragile Manual Baseline')) {
            const r = btn.getBoundingClientRect();
            results.push({
              selector: 'mode-switch-' + (text.includes('OJIX') ? 'ojix' : 'baseline'),
              label: text.slice(0, 30),
              width: Math.round(r.width * 10) / 10,
              height: Math.round(r.height * 10) / 10,
              meets48px: r.height >= 48 && r.width >= 48,
              meets44px: r.height >= 44 && r.width >= 44,
              category: 'button'
            });
          }
        });

        // 4. State Toggles (Switches and Segmented Buttons)
        const switches = document.querySelectorAll('#portfolio button[role="switch"]');
        switches.forEach((btn, idx) => {
          const r = btn.getBoundingClientRect();
          results.push({
            selector: 'switch-' + idx,
            label: (btn.getAttribute('aria-label') || 'Switch ' + idx).slice(0, 30),
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10,
            meets48px: r.height >= 48 && r.width >= 48,
            meets44px: r.height >= 44 && r.width >= 44,
            category: 'toggle'
          });
        });

        // 5. Topology stage node buttons
        const stageButtons = document.querySelectorAll('#portfolio [aria-label="Workflow Topology Stages"] > button');
        stageButtons.forEach((btn, idx) => {
          const r = btn.getBoundingClientRect();
          results.push({
            selector: 'topology-stage-' + (idx + 1),
            label: 'Stage ' + (idx + 1) + ': ' + (btn.querySelector('h4') ? btn.querySelector('h4').textContent.trim().slice(0, 20) : ''),
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10,
            meets48px: r.height >= 48 && r.width >= 48,
            meets44px: r.height >= 44 && r.width >= 44,
            category: 'button'
          });
        });

        // 6. Copy JSON button
        const copyBtn = document.querySelector('#portfolio button[aria-label="Copy JSON contract payload to clipboard"]');
        if (copyBtn) {
          const r = copyBtn.getBoundingClientRect();
          results.push({
            selector: 'copy-json-button',
            label: copyBtn.textContent.replace(/\\s+/g, ' ').trim(),
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10,
            meets48px: r.height >= 48 && r.width >= 48,
            meets44px: r.height >= 44 && r.width >= 44,
            category: 'button'
          });
        }

        return results;
      })()`,
      returnByValue: true,
    });

    touchResultsByVw[vw] = touchEval.result.value as TouchTargetResult[];
  }

  // Print touch target analysis for 390px (mobile canonical) and 768px (tablet canonical)
  for (const vw of [390, 768]) {
    console.log(`\nTouch targets at ${vw}px:`);
    touchResultsByVw[vw].forEach((item) => {
      const status48 = item.meets48px ? "PASS(>=48)" : "FAIL(<48)";
      const status44 = item.meets44px ? "PASS(>=44)" : "FAIL(<44)";
      console.log(
        `  [${item.category}] ${item.label.padEnd(30)}: ${item.width}x${item.height}px | min44: ${status44} | min48: ${status48}`,
      );
    });
  }

  // ==========================================
  // OBJECTIVE 5: COMPREHENSIVE INTERACTION STRESS ACROSS ALL 4 DOMAINS
  // ==========================================
  console.log(`\n============================================`);
  console.log(`STRESS-TESTING INTERACTION STATE FLOW ACROSS ALL 4 DOMAINS AT 360px`);

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 360,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await sleep(400);

  const interactionEval = await client.send("Runtime.evaluate", {
    expression: `(async () => {
      const tabs = Array.from(document.querySelectorAll('#portfolio [role="tablist"] button'));
      const log = [];

      for (let t = 0; t < tabs.length; t++) {
        tabs[t].click();
        await new Promise(r => setTimeout(r, 100));

        // Click Baseline
        const buttons = Array.from(document.querySelectorAll('#portfolio button'));
        const baselineBtn = buttons.find(b => b.textContent.includes('Fragile Manual Baseline'));
        if (baselineBtn) {
          baselineBtn.click();
          await new Promise(r => setTimeout(r, 50));
        }

        // Click OJIX Core back
        const ojixBtn = buttons.find(b => b.textContent.includes('OJIX Engineered Core'));
        if (ojixBtn) {
          ojixBtn.click();
          await new Promise(r => setTimeout(r, 50));
        }

        // Click each of 4 topology nodes
        const nodes = Array.from(document.querySelectorAll('#portfolio [aria-label="Workflow Topology Stages"] > button'));
        for (let n = 0; n < nodes.length; n++) {
          nodes[n].click();
          await new Promise(r => setTimeout(r, 50));

          // Check if document has horizontal overflow
          const docSW = document.documentElement.scrollWidth;
          const vw = window.innerWidth;
          if (docSW > vw) {
            log.push({ error: 'Horizontal scroll on tab ' + t + ' node ' + n, docSW, vw });
          }
        }
      }

      return {
        completedTabs: tabs.length,
        errors: log
      };
    })()`,
    awaitPromise: true,
    returnByValue: true,
  });

  console.log("Interaction stress results:", JSON.stringify(interactionEval.result.value));

  // Write full raw results to file for inclusion in handoff report
  const rawReport = {
    viewports: viewportResults,
    tablet: tabletRes,
    touchTargets: touchResultsByVw,
    interactions: interactionEval.result.value,
  };

  writeFileSync(
    resolve(
      "/Users/FOUDER/Documents/6oct-ojix.si/.agents/teamwork/challenger_m2_1/raw_stress_results.json",
    ),
    JSON.stringify(rawReport, null, 2),
  );

  console.log(
    "\nSaved raw test results to .agents/teamwork/challenger_m2_1/raw_stress_results.json",
  );

  client.close();
}

run().catch((e) => {
  console.error("FATAL ERROR IN RUNNER:", e);
  process.exit(1);
});
