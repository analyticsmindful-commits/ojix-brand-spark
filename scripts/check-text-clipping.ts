const DEBUG_PORT = 9222;
const VIEWPORTS = [320, 360, 390, 768, 1024, 1440, 1920, 2560, 3840];

async function fetchJson(url: string) {
  const res = await fetch(url);
  return res.json();
}

async function run() {
  const list = await fetchJson(`http://localhost:${DEBUG_PORT}/json/list`);
  const pageTarget = list.find((t: any) => t.type === "page" && t.url.includes("localhost:3000"));
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  await new Promise<void>((resolve) => (ws.onopen = () => resolve()));
  let id = 0;
  function send(method: string, params: any = {}) {
    return new Promise<any>((resolve) => {
      const msgId = ++id;
      const handler = (event: any) => {
        const data = JSON.parse(event.data.toString());
        if (data.id === msgId) {
          ws.removeEventListener("message", handler);
          resolve(data.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  console.log("=== COMPREHENSIVE TEXT CLIPPING & WORD OVERFLOW AUDIT ===");

  for (const w of VIEWPORTS) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: w,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: w < 768,
    });
    await new Promise((r) => setTimeout(r, 600));

    const evalRes = await send("Runtime.evaluate", {
      expression: `(() => {
        const issues = [];
        const all = Array.from(document.querySelectorAll('h1, h2, h3, h4, p, span, a, button, label, li, code, pre'));

        for (const el of all) {
          if (['SCRIPT', 'STYLE'].includes(el.tagName)) continue;
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) continue;

          // Check if element has horizontal scroll/clip (scrollWidth > clientWidth + 2)
          // Exclude pre/code blocks which are meant to scroll horizontally
          const isCode = el.tagName === 'PRE' || el.tagName === 'CODE' || el.closest('pre');
          const computed = window.getComputedStyle(el);
          
          if (!isCode && el.scrollWidth > el.clientWidth + 2) {
            // Check if it's text-overflow: ellipsis
            const isEllipsis = computed.textOverflow === 'ellipsis';
            // Check if it's overflow hidden clipping text
            const isClipped = computed.overflow === 'hidden' || computed.overflowX === 'hidden';
            
            issues.push({
              tag: el.tagName.toLowerCase(),
              text: (el.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 50),
              scrollWidth: el.scrollWidth,
              clientWidth: el.clientWidth,
              diff: el.scrollWidth - el.clientWidth,
              isEllipsis,
              isClipped,
              className: (typeof el.className === 'string' ? el.className.slice(0, 60) : '')
            });
          }
        }
        return { viewport: window.innerWidth, issues };
      })()`,
      returnByValue: true,
    });

    const res = evalRes.result.value;
    console.log(
      `\nViewport ${res.viewport}px - Found ${res.issues.length} potential text clip/truncation issues:`,
    );
    for (const is of res.issues) {
      console.log(
        `  [${is.tag}] diff=+${is.diff}px (scroll ${is.scrollWidth} > client ${is.clientWidth}) | ellipsis=${is.isEllipsis} clip=${is.isClipped} | text="${is.text}"`,
      );
    }
  }

  ws.close();
}

run();
