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

  for (const vw of [320, 360, 390]) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: vw,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: true,
    });
    console.log(`\n========================================`);
    console.log(`CHECKING DOMAIN TOGGLES AT ${vw}px`);

    for (let i = 0; i < 4; i++) {
      // Click tab
      await send("Runtime.evaluate", {
        expression: `(() => {
          const tabs = document.querySelectorAll('#portfolio [role="tablist"] button');
          if (tabs[${i}]) tabs[${i}].click();
        })()`,
      });
      await new Promise((r) => setTimeout(r, 200));

      const evalRes = await send("Runtime.evaluate", {
        expression: `(() => {
          const card = document.querySelector('#portfolio .rounded-xl');
          if (!card) return null;
          const cardRect = card.getBoundingClientRect();

          const tabs = document.querySelectorAll('#portfolio [role="tablist"] button');
          const currentTab = tabs[${i}] ? tabs[${i}].textContent.replace(/\\s+/g, ' ').trim() : 'Unknown';

          const switches = Array.from(document.querySelectorAll('#portfolio button[role="switch"]')).map(btn => {
            const container = btn.parentElement;
            const cr = container.getBoundingClientRect();
            const textSpan = container.querySelector('span.truncate');
            return {
              type: 'switch',
              label: btn.getAttribute('aria-label') || '',
              width: Math.round(cr.width),
              right: Math.round(cr.right),
              cardRight: Math.round(cardRect.right),
              isClipped: cr.right > cardRect.right + 1,
              clippedPx: Math.max(0, Math.round(cr.right - cardRect.right)),
              textTruncated: textSpan ? textSpan.scrollWidth > textSpan.clientWidth : false,
              textScrollWidth: textSpan ? textSpan.scrollWidth : 0,
              textClientWidth: textSpan ? textSpan.clientWidth : 0
            };
          });

          // Check segmented options
          const segmentedContainers = Array.from(document.querySelectorAll('#portfolio .inline-flex.rounded-lg.border.bg-white')).map(seg => {
            const cr = seg.getBoundingClientRect();
            return {
              type: 'segmented',
              label: seg.textContent.replace(/\\s+/g, ' ').trim(),
              width: Math.round(cr.width),
              right: Math.round(cr.right),
              cardRight: Math.round(cardRect.right),
              isClipped: cr.right > cardRect.right + 1,
              clippedPx: Math.max(0, Math.round(cr.right - cardRect.right))
            };
          });

          return {
            tab: currentTab,
            cardWidth: Math.round(cardRect.width),
            switches,
            segmentedContainers
          };
        })()`,
        returnByValue: true,
      });

      const res = evalRes?.result?.value ?? evalRes?.value;
      if (res) {
        console.log(`\nDomain [${i + 1}/4]: ${res.tab} (Card width: ${res.cardWidth}px)`);
        res.switches.forEach((s: any) => {
          console.log(`  Switch: "${s.label}"`);
          console.log(
            `    Container Width: ${s.width}px (Right: ${s.right}px, Card Right: ${s.cardRight}px)`,
          );
          console.log(
            `    Clipped by card boundary: ${s.isClipped ? `YES (${s.clippedPx}px invisible/cut off)` : "NO"}`,
          );
          console.log(
            `    Text Truncated with ellipsis: ${s.textTruncated ? `YES (${s.textScrollWidth}px > ${s.textClientWidth}px)` : "NO"}`,
          );
        });
        res.segmentedContainers.forEach((seg: any) => {
          console.log(
            `  Segmented: "${seg.label}" (Width: ${seg.width}px, Clipped: ${seg.isClipped ? `YES (${seg.clippedPx}px)` : "NO"})`,
          );
        });
      }
    }
  }

  ws.close();
}

run().catch(console.error);
