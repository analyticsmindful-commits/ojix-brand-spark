const VIEWPORTS = [320, 360, 390, 768, 1024, 1440, 1920, 2560, 3840];
const TARGET_URL = "http://localhost:3000/";
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

async function run() {
  console.log("=== EMPIRICAL RESPONSIVE LAYOUT VERIFICATION ===");
  console.log(`Target: ${TARGET_URL}`);
  console.log(`Viewports to test: ${VIEWPORTS.join(", ")}px\n`);

  const list = await fetchJson(`http://localhost:${DEBUG_PORT}/json/list`);
  const pageTarget = list.find((t: any) => t.type === "page" && t.url.includes("localhost:3000"));

  if (!pageTarget || !pageTarget.webSocketDebuggerUrl) {
    console.error("Could not find localhost:3000 page target in Chrome!");
    process.exit(1);
  }

  console.log(`Connecting to page target: ${pageTarget.title} (${pageTarget.id})`);
  const client = new CdpClient(pageTarget.webSocketDebuggerUrl);
  await client.connect();

  await client.send("Page.enable");
  await client.send("DOM.enable");
  await client.send("Runtime.enable");

  await client.send("Page.navigate", { url: TARGET_URL });
  await sleep(1500);

  const results: any[] = [];

  for (const width of VIEWPORTS) {
    console.log(`\n=========================================`);
    console.log(`TESTING VIEWPORT: ${width}px x 1080px`);

    await client.send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sleep(800); // Wait for full layout reflow and CSS clamp calculation

    const evalResult = await client.send("Runtime.evaluate", {
      expression: `(() => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const docEl = document.documentElement;
        const body = document.body;

        const docScrollWidth = docEl.scrollWidth;
        const bodyScrollWidth = body.scrollWidth;
        const docClientWidth = docEl.clientWidth;
        const bodyClientWidth = body.clientWidth;

        // Zero horizontal scrolling test
        const hasDocHorizontalScroll = docScrollWidth > vw;
        const hasBodyHorizontalScroll = bodyScrollWidth > vw;

        // Query all rendered DOM elements for uncontained boundary breakout
        const allElements = Array.from(document.querySelectorAll('*'));
        const overflowingElements = [];

        for (const el of allElements) {
          if (['SCRIPT', 'STYLE', 'HEAD', 'META', 'LINK', 'TITLE', 'HTML', 'BODY'].includes(el.tagName)) continue;
          
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) continue;

          // Check if right edge exceeds viewport boundary
          if (rect.right > vw + 1) {
            const computed = window.getComputedStyle(el);
            const parent = el.parentElement;
            const parentComputed = parent ? window.getComputedStyle(parent) : null;
            const isScrollable = computed.overflowX === 'auto' || computed.overflowX === 'scroll';
            const parentIsScrollable = parentComputed && (parentComputed.overflowX === 'auto' || parentComputed.overflowX === 'scroll');

            overflowingElements.push({
              tag: el.tagName.toLowerCase(),
              id: el.id,
              className: (typeof el.className === 'string') ? el.className.slice(0, 120) : '',
              textSnippet: (el.textContent || '').trim().slice(0, 60),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
              vw,
              overflowPixels: Math.round(rect.right - vw),
              overflowX: computed.overflowX,
              isScrollable: isScrollable || parentIsScrollable
            });
          }
        }

        // Check for text clipping & truncation
        const truncatedElements = [];
        for (const el of allElements) {
          if (['SCRIPT', 'STYLE', 'HEAD', 'META', 'LINK', 'TITLE'].includes(el.tagName)) continue;
          const computed = window.getComputedStyle(el);
          // If element has text-overflow: ellipsis, check if it is active
          if (computed.textOverflow === 'ellipsis') {
            if (el.scrollWidth > el.clientWidth) {
              truncatedElements.push({
                tag: el.tagName.toLowerCase(),
                text: (el.textContent || '').trim().slice(0, 40),
                scrollWidth: el.scrollWidth,
                clientWidth: el.clientWidth,
                className: (typeof el.className === 'string') ? el.className.slice(0, 80) : ''
              });
            }
          }
        }

        // Check colliding layout columns in major sections
        const collidingPairs = [];
        const sections = Array.from(document.querySelectorAll('section, header, footer'));
        for (const sec of sections) {
          const grids = sec.querySelectorAll('.grid, .flex');
          for (const container of grids) {
            const children = Array.from(container.children).filter(c => {
              const r = c.getBoundingClientRect();
              return r.width > 0 && r.height > 0;
            });
            for (let i = 0; i < children.length; i++) {
              for (let j = i + 1; j < children.length; j++) {
                const c1 = children[i];
                const c2 = children[j];
                const r1 = c1.getBoundingClientRect();
                const r2 = c2.getBoundingClientRect();
                const computed1 = window.getComputedStyle(c1);
                const computed2 = window.getComputedStyle(c2);

                if (computed1.position !== 'absolute' && computed2.position !== 'absolute') {
                  const hOverlap = Math.max(0, Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left));
                  const vOverlap = Math.max(0, Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top));
                  if (hOverlap > 8 && vOverlap > 8) {
                    collidingPairs.push({
                      secId: sec.id || sec.tagName,
                      el1: c1.tagName + '.' + (typeof c1.className === 'string' ? c1.className.slice(0, 40) : ''),
                      el2: c2.tagName + '.' + (typeof c2.className === 'string' ? c2.className.slice(0, 40) : ''),
                      hOverlap: Math.round(hOverlap),
                      vOverlap: Math.round(vOverlap)
                    });
                  }
                }
              }
            }
          }
        }

        // Computed typography font sizes across sections
        const getFontSize = (selector) => {
          const el = document.querySelector(selector);
          return el ? window.getComputedStyle(el).fontSize : 'NOT_FOUND';
        };

        const typography = {
          heroTitle: getFontSize('#hero-title'),
          portfolioHeading: getFontSize('#portfolio-heading'),
          methodologyHeading: getFontSize('#methodology-heading'),
          xrayHeading: getFontSize('#xray-heading'),
          engineeringHeading: getFontSize('#engineering-heading'),
          faqHeading: getFontSize('#faq-heading'),
          ctaHeading: getFontSize('#cta-heading')
        };

        return {
          vw,
          docScrollWidth,
          bodyScrollWidth,
          docClientWidth,
          bodyClientWidth,
          hasDocHorizontalScroll,
          hasBodyHorizontalScroll,
          overflowingElements,
          uncontainedOverflows: overflowingElements.filter(e => !e.isScrollable),
          truncatedElements,
          collidingPairs,
          typography
        };
      })()`,
      returnByValue: true,
    });

    if (evalResult.exceptionDetails) {
      console.error("Evaluation error:", JSON.stringify(evalResult.exceptionDetails, null, 2));
      continue;
    }
    const res = evalResult.result?.value ?? evalResult.value;
    if (!res) {
      console.error("Unexpected eval result structure:", JSON.stringify(evalResult, null, 2));
      continue;
    }
    console.log(`  Window innerWidth: ${res.vw}px`);
    console.log(`  Doc scrollWidth: ${res.docScrollWidth}px (client: ${res.docClientWidth}px)`);
    console.log(`  Body scrollWidth: ${res.bodyScrollWidth}px (client: ${res.bodyClientWidth}px)`);
    console.log(
      `  Horizontal Scroll Detected: ${res.hasDocHorizontalScroll || res.hasBodyHorizontalScroll ? "YES (FAIL)" : "NO (PASS)"}`,
    );
    console.log(`  Colliding Layout Columns: ${res.collidingPairs.length}`);
    console.log(`  Typography computed font-sizes:`);
    for (const [k, v] of Object.entries(res.typography)) {
      console.log(`    ${k}: ${v}`);
    }
    console.log(`  Uncontained overflowing elements: ${res.uncontainedOverflows.length}`);
    if (res.uncontainedOverflows.length > 0) {
      console.log(`  Overflow Details:`);
      for (const ov of res.uncontainedOverflows) {
        console.log(
          `    - <${ov.tag}> right=${ov.right}px (+${ov.overflowPixels}px beyond ${ov.vw}px) | class="${ov.className}" | text="${ov.textSnippet}"`,
        );
      }
    }
    if (res.truncatedElements.length > 0) {
      console.log(`  Active Text Ellipsis / Truncations: ${res.truncatedElements.length}`);
      for (const tr of res.truncatedElements) {
        console.log(`    - "${tr.text}" (scroll=${tr.scrollWidth}px > client=${tr.clientWidth}px)`);
      }
    }

    results.push(res);
  }

  client.close();

  console.log("\n=======================================================");
  console.log("FINAL EMPIRICAL VIEWPORT MATRIX SUMMARY");
  console.log("=======================================================");
  let failedViewports = 0;
  for (const r of results) {
    const uncontained = r.uncontainedOverflows.length;
    const scrollFail = r.hasDocHorizontalScroll || r.hasBodyHorizontalScroll;
    const collisions = r.collidingPairs.length;
    const isFail = scrollFail || uncontained > 0 || collisions > 0;
    if (isFail) failedViewports++;

    console.log(
      `| ${r.vw.toString().padStart(4)}px | ` +
        `Doc: ${r.docScrollWidth.toString().padStart(4)}px | ` +
        `Body: ${r.bodyScrollWidth.toString().padStart(4)}px | ` +
        `Scroll: ${scrollFail ? "FAIL" : "PASS"} | ` +
        `Overflows: ${uncontained.toString().padStart(2)} | ` +
        `Collisions: ${collisions.toString().padStart(2)} | ` +
        `Status: ${isFail ? "FAIL" : "PASS"} |`,
    );
  }

  console.log("\nTotal failed viewports: " + failedViewports + " / " + VIEWPORTS.length);
  if (failedViewports > 0) {
    console.log("FINAL OUTCOME: VERDICT = REQUEST_CHANGES");
  } else {
    console.log("FINAL OUTCOME: VERDICT = APPROVE");
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
