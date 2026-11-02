/* Renderiza as peças gráficas via Chrome headless.
   - preview/*.png  → aprovação visual (150 dpi)
   - out/*.pdf      → arquivos finais para gráfica (tamanho exato, sangria 3mm)
   Uso: node render.js [a|b|a4|mini|card|foto1|foto2|all] */
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");
const { SRC, ASSETS, PREVIEW, OUT, CHROME, PIECES } = require("./render-lib");

/* Copia os logos oficiais (assets/brand/logo) para src/assets/logo com nomes ASCII. */
function stageAssets() {
  const brand = path.join(__dirname, "..", "assets", "brand", "logo");
  const sym = path.join(brand, "simbolo");
  const tipo = path.join(brand, "tipografica");
  const dest = path.join(ASSETS, "logo");
  fs.mkdirSync(dest, { recursive: true });
  const map = [
    [path.join(sym, "logo-01.png"), path.join(dest, "LOGO_SIMBOLO_01.png")],
    [path.join(sym, "logo-04.png"), path.join(dest, "LOGO_SIMBOLO_04.png")],
    [path.join(sym, "logo-05.png"), path.join(dest, "LOGO_SIMBOLO_05.png")],
    [path.join(tipo, "logo-tipo-01.png"), path.join(dest, "LOGO_TIPO_01.png")],
    [path.join(tipo, "logo-tipo-04.png"), path.join(dest, "LOGO_TIPO_04.png")],
    [path.join(tipo, "logo-tipo-05.png"), path.join(dest, "LOGO_TIPO_05.png")],
  ];
  for (const [from, to] of map) fs.copyFileSync(from, to);
  console.log("✓ logos copiados para artes-grafica/src/assets/logo/");
}

async function main() {
  if (!CHROME) {
    console.error("Chrome não encontrado. Defina CHROME_BIN.");
    process.exit(1);
  }
  const only = (process.argv[2] || "all").toLowerCase();
  fs.mkdirSync(PREVIEW, { recursive: true });
  fs.mkdirSync(OUT, { recursive: true });
  stageAssets();

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    args: ["--no-sandbox", "--font-render-hinting=none", "--force-color-profile=srgb"],
  });

  for (const piece of PIECES) {
    if (only !== "all" && only !== piece.dir && only !== piece.id) continue;
    const page = await browser.newPage();
    const url = "file://" + path.join(SRC, piece.file);
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");

    /* PNG de preview a 150 dpi: layout em CSS px (96dpi) × deviceScaleFactor 1.5625 */
    const CSS_MM = 96 / 25.4;   /* px CSS por mm */
    const DSF = 150 / 96;       /* 1.5625 → 150 dpi no PNG final */
    await page.setViewport({
      width: Math.round(piece.w * CSS_MM),
      height: Math.round(piece.h * CSS_MM),
      deviceScaleFactor: DSF,
    });
    const png = path.join(PREVIEW, `${piece.name}-dir${piece.dir.toUpperCase()}.png`);
    /* fullPage captura todas as folhas empilhadas (frente/verso do cartão). */
    await page.screenshot({ path: png, fullPage: true });

    /* PDF final no tamanho exato da folha com sangria */
    const pdf = path.join(OUT, `${piece.name}-sangria3mm-dir${piece.dir.toUpperCase()}.pdf`);
    await page.pdf({
      path: pdf,
      width: `${piece.w}mm`,
      height: `${piece.h}mm`,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      pageRanges: piece.pages ? `1-${piece.pages}` : "1",
      preferCSSPageSize: false,
    });

    console.log(`✓ ${piece.file} → preview/${path.basename(png)} + out/${path.basename(pdf)}`);
    await page.close();
  }

  await browser.close();
  console.log("\nConcluído.");
}

main().catch((e) => { console.error(e); process.exit(1); });
