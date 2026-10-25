/* QA das peças: overflow de layout, dimensões dos previews e decodificação do QR.
   Uso: node qa.js [a|b|a4|mini|card|foto1|foto2|all] */
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");
const jsQR = require("jsqr");
const { PIECES, CHROME, SRC, PREVIEW } = require("./render-lib");

async function main() {
  const only = (process.argv[2] || "all").toLowerCase();
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    args: ["--no-sandbox", "--font-render-hinting=none", "--force-color-profile=srgb"],
  });

  let fail = 0;

  for (const piece of PIECES) {
    if (only !== "all" && only !== piece.dir && only !== piece.id) continue;
    const page = await browser.newPage();
    await page.goto("file://" + path.join(SRC, piece.file), { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");

    /* 1. Overflow: nada pode passar do fim da folha */
    const m = await page.evaluate(() => {
      const sheet = document.querySelector(".sheet");
      const r = sheet.getBoundingClientRect();
      let max = 0, who = "";
      for (const el of sheet.querySelectorAll("*")) {
        /* símbolo decorativo sangra de propósito (folha tem overflow:hidden) */
        if (el.classList.contains("bg-symbol")) continue;
        const b = el.getBoundingClientRect();
        if (b.height && b.bottom > max) { max = b.bottom; who = el.className || el.tagName; }
      }
      return { h: r.height, max, who: String(who), w: r.width };
    });
    const overflow = m.max - m.h;
    const okOver = overflow <= 1;

    /* 2. QR: screenshot do elemento e decodificação */
    let qr = "—";
    const qrEl = await page.$(".qr");
    if (qrEl) {
      const buf = await qrEl.screenshot({ type: "png", scale: 4 });
      const png = PNG.sync.read(buf);
      const r = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
      qr = r ? (r.data === "https://imovelcentral.com.br" ? "OK" : `ERR(${r.data})`) : "FALHA";
    }
    if (!okOver || qr !== "OK") fail++;

    console.log(
      `${okOver ? "✓" : "✗"} ${piece.file.padEnd(24)} overflow:${overflow >= 0 ? "+" : ""}${overflow.toFixed(1)}px ` +
      `(max: ${m.who})  QR:${qr}`
    );
    await page.close();
  }

  /* 3. Dimensões dos previews PNG */
  console.log("\nPreviews:");
  for (const f of fs.readdirSync(PREVIEW).filter((f) => f.endsWith(".png")).sort()) {
    const png = PNG.sync.read(fs.readFileSync(path.join(PREVIEW, f)));
    console.log(`  ${f.padEnd(48)} ${png.width}×${png.height}px`);
  }

  await browser.close();
  console.log(fail ? `\n${fail} problema(s).` : "\nTudo OK.");
  process.exit(fail ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
