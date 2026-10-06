import { resolve } from "path";

const DEBUG_PORT = 9222;

async function run() {
  const list = await fetch(`http://localhost:${DEBUG_PORT}/json/list`).then((r) => r.json());
  const p = list.find((t: any) => t.type === "page" && t.url.includes("5174"));
  const ws = new WebSocket(p.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));

  let id = 1;
  const send = (m: string, params: any = {}) =>
    new Promise<any>((resolve) => {
      const i = id++;
      const handler = (e: any) => {
        const d = JSON.parse(e.data);
        if (d.id === i) {
          ws.removeEventListener("message", handler);
          resolve(d.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id: i, method: m, params }));
    });

  const viewports = [320, 360, 390, 768, 1024, 1440];

  for (const vw of viewports) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: vw,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: vw < 768,
    });
    await new Promise((r) => setTimeout(r, 400));

    console.log(`\n======================================================`);
    console.log(`AUDITING INTERACTIVE TOUCH TARGETS AT ${vw}px VIEWPORT`);
    console.log(`======================================================`);

    for (let tabIndex = 0; tabIndex < 4; tabIndex++) {
      // Click tab
      await send("Runtime.evaluate", {
        expression: `(() => {
          const tabs = document.querySelectorAll('#portfolio [role="tablist"] button');
          if (tabs[${tabIndex}]) tabs[${tabIndex}].click();
        })()`,
      });
      await new Promise((r) => setTimeout(r, 200));

      const evalRes = await send("Runtime.evaluate", {
        expression: `(() => {
          const domainTabs = Array.from(document.querySelectorAll('#portfolio [role="tablist"] button')).map((b, idx) => {
            const r = b.getBoundingClientRect();
            return {
              category: 'tab',
              label: 'Domain Tab ' + (idx + 1) + ': ' + b.textContent.replace(/\\s+/g, ' ').trim(),
              w: Math.round(r.width * 10) / 10,
              h: Math.round(r.height * 10) / 10,
              meets48px: r.width >= 48 && r.height >= 48,
              meets44px: r.width >= 44 && r.height >= 44
            };
          });

          // Primary CTA
          const cta = document.querySelector('#portfolio a[href="#extraction"]');
          const ctaItem = cta ? (() => {
            const r = cta.getBoundingClientRect();
            return [{
              category: 'cta',
              label: cta.textContent.replace(/\\s+/g, ' ').trim(),
              w: Math.round(r.width * 10) / 10,
              h: Math.round(r.height * 10) / 10,
              meets48px: r.width >= 48 && r.height >= 48,
              meets44px: r.width >= 44 && r.height >= 44
            }];
          })() : [];

          // Mode buttons
          const modeButtons = Array.from(document.querySelectorAll('#portfolio [role="radiogroup"] button[role="radio"]')).map(b => {
            const r = b.getBoundingClientRect();
            return {
              category: 'mode-radio',
              label: b.textContent.replace(/\\s+/g, ' ').trim(),
              w: Math.round(r.width * 10) / 10,
              h: Math.round(r.height * 10) / 10,
              meets48px: r.width >= 48 && r.height >= 48,
              meets44px: r.width >= 44 && r.height >= 44
            };
          });

          // State Switches
          const switches = Array.from(document.querySelectorAll('#portfolio button[role="switch"]')).map(b => {
            const r = b.getBoundingClientRect();
            return {
              category: 'switch',
              label: b.getAttribute('aria-label') || 'Switch',
              w: Math.round(r.width * 10) / 10,
              h: Math.round(r.height * 10) / 10,
              meets48px: r.width >= 48 && r.height >= 48,
              meets44px: r.width >= 44 && r.height >= 44
            };
          });

          // Segmented Radio Buttons
          const segmentedRadios = Array.from(document.querySelectorAll('#portfolio .inline-flex.rounded-lg.border.bg-white button[role="radio"]')).map(b => {
            const r = b.getBoundingClientRect();
            return {
              category: 'segmented-radio',
              label: b.textContent.replace(/\\s+/g, ' ').trim(),
              w: Math.round(r.width * 10) / 10,
              h: Math.round(r.height * 10) / 10,
              meets48px: r.width >= 48 && r.height >= 48,
              meets44px: r.width >= 44 && r.height >= 44
            };
          });

          // Live Inspector COPY JSON Button
          const copyBtn = document.querySelector('#payload-inspector-panel button');
          const copyItem = copyBtn ? (() => {
            const r = copyBtn.getBoundingClientRect();
            return [{
              category: 'copy-json',
              label: copyBtn.textContent.replace(/\\s+/g, ' ').trim(),
              w: Math.round(r.width * 10) / 10,
              h: Math.round(r.height * 10) / 10,
              meets48px: r.width >= 48 && r.height >= 48,
              meets44px: r.width >= 44 && r.height >= 44
            }];
          })() : [];

          // Topology Nodes
          const topologyNodes = Array.from(document.querySelectorAll('#portfolio [aria-label="Workflow Topology Stages"] button')).map((b, idx) => {
            const r = b.getBoundingClientRect();
            return {
              category: 'topology-node',
              label: 'Stage 0' + (idx + 1) + ': ' + (b.querySelector('h4') ? b.querySelector('h4').textContent.trim() : ''),
              w: Math.round(r.width * 10) / 10,
              h: Math.round(r.height * 10) / 10,
              meets48px: r.width >= 48 && r.height >= 48,
              meets44px: r.width >= 44 && r.height >= 44
            };
          });

          return {
            tabIndex: ${tabIndex + 1},
            items: [
              ...domainTabs,
              ...ctaItem,
              ...modeButtons,
              ...switches,
              ...segmentedRadios,
              ...copyItem,
              ...topologyNodes
            ]
          };
        })()`,
        returnByValue: true,
      });

      const res = evalRes?.result?.value;
      if (evalRes?.exceptionDetails) {
        console.error("Evaluation exception:", evalRes.exceptionDetails);
      }
      if (res) {
        console.log(`\n  Domain Tab [${res.tabIndex}/4]:`);
        res.items.forEach((item: any) => {
          const status = item.meets44px ? "PASS" : "FAIL";
          console.log(
            `    [${item.category.padEnd(15)}] ${item.w.toString().padStart(6)} x ${item.h.toString().padStart(4)} px | >=44px: ${status} | "${item.label}"`,
          );
        });
      }
    }
  }

  ws.close();
}

run().catch(console.error);
