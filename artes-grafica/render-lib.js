/* Constantes compartilhadas entre render.js e qa.js. */
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "src");
const ASSETS = path.join(SRC, "assets");
const PREVIEW = path.join(__dirname, "preview");
const OUT = path.join(__dirname, "out");

const CHROME = [
  process.env.CHROME_BIN,
  ...fs.readdirSync(path.join(process.env.HOME, ".cache/puppeteer/chrome"))
    .filter((d) => d.startsWith("linux-"))
    .sort()
    .reverse()
    .map((d) => path.join(process.env.HOME, ".cache/puppeteer/chrome", d, "chrome-linux64/chrome")),
].find((p) => p && fs.existsSync(p));

const PIECES = [
  /* v2 — versão de trabalho (textos editados pelo cliente) */
  { id: "a4",    file: "flyer-a4-a.html",  dir: "a", w: 216, h: 303, name: "flyer-a4-210x297-v2" },
  { id: "a4",    file: "flyer-a4-b.html",  dir: "b", w: 216, h: 303, name: "flyer-a4-210x297-v2" },
  { id: "mini",  file: "flyer-mini-a.html",dir: "a", w: 106, h: 156, name: "flyer-10x15-100x150-v2" },
  { id: "mini",  file: "flyer-mini-b.html",dir: "b", w: 106, h: 156, name: "flyer-10x15-100x150-v2" },
  { id: "card",  file: "cartao-a.html",    dir: "a", w:  96, h:  56, name: "cartao-9x5-v2", pages: 2 },
  { id: "card",  file: "cartao-b.html",    dir: "b", w:  96, h:  56, name: "cartao-9x5-v2", pages: 2 },
  /* A4 com foto (Aplicação_09) — 2 layouts × 2 direções */
  { id: "foto1", file: "flyer-a4-foto1-a.html", dir: "a", w: 216, h: 303, name: "flyer-a4-210x297-foto1-faixaTopo" },
  { id: "foto1", file: "flyer-a4-foto1-b.html", dir: "b", w: 216, h: 303, name: "flyer-a4-210x297-foto1-faixaTopo" },
  { id: "foto2", file: "flyer-a4-foto2-a.html", dir: "a", w: 216, h: 303, name: "flyer-a4-210x297-foto2-fundoInteiro" },
  { id: "foto2", file: "flyer-a4-foto2-b.html", dir: "b", w: 216, h: 303, name: "flyer-a4-210x297-foto2-fundoInteiro" },
];

module.exports = { SRC, ASSETS, PREVIEW, OUT, CHROME, PIECES };
