const DEBUG_PORT = 9222;

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

  const widths = [768, 800, 850, 900, 950, 1000, 1024];
  console.log("Investigating Navbar breakpoint collision between 768px and 1024px:");

  for (const w of widths) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: w,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await new Promise((r) => setTimeout(r, 600));

    const evalRes = await send("Runtime.evaluate", {
      expression: `(() => {
        const header = document.querySelector('header');
        const rightContainer = header.querySelector('.flex.items-center.gap-3:last-child');
        const ctaBtn = header.querySelector('a[href="#extraction"]');
        const nav = header.querySelector('nav');
        const rect = ctaBtn ? ctaBtn.getBoundingClientRect() : null;
        return {
          viewport: window.innerWidth,
          navDisplay: nav ? window.getComputedStyle(nav).display : null,
          ctaVisible: ctaBtn ? window.getComputedStyle(ctaBtn).display : null,
          ctaRight: rect ? Math.round(rect.right) : null,
          ctaOverflow: rect ? Math.round(rect.right - window.innerWidth) : null
        };
      })()`,
      returnByValue: true,
    });
    console.log(JSON.stringify(evalRes.result.value));
  }
  ws.close();
}

run();
