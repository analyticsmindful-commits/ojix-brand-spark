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

  await send("Emulation.setDeviceMetricsOverride", {
    width: 768,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await new Promise((r) => setTimeout(r, 600));

  const evalRes = await send("Runtime.evaluate", {
    expression: `(() => {
      // Find all buttons in the topology pipeline and domain buttons
      const hero = document.getElementById('hero');
      const buttons = Array.from(hero.querySelectorAll('button'));
      const cardData = buttons.map(b => {
        const rect = b.getBoundingClientRect();
        const spans = Array.from(b.querySelectorAll('span')).map(s => ({
          text: s.textContent.trim(),
          scrollWidth: s.scrollWidth,
          clientWidth: s.clientWidth,
          truncated: s.scrollWidth > s.clientWidth
        }));
        return {
          btnText: b.textContent.replace(/\\s+/g, ' ').trim(),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          spans
        };
      });

      return {
        cardData
      };
    })()`,
    returnByValue: true,
  });

  console.log("Hero button geometry at 768px:");
  console.log(JSON.stringify(evalRes.result.value, null, 2));
  ws.close();
}

run();
