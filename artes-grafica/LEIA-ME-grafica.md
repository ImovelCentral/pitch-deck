# Artes para gráfica — Imóvel Central

Versão atual: **v2** (v1 preservada nos mesmos pastos com sufixo `-v1`).

## Arquivos para enviar à gráfica

Todos em `artes-grafica/out/`, PDF com **sangria de 3mm**, **sem marcas de corte**, CMYK convertido pela gráfica.

| Arquivo | Corte | Com sangria | Páginas | Qtd. |
|---|---|---|---|---|
| `flyer-a4-210x297-v2-sangria3mm-dirA.pdf` | 210 × 297 mm | 216 × 303 mm | 1 | 10 un |
| `flyer-10x15-100x150-v2-sangria3mm-dirA.pdf` | 100 × 150 mm | 106 × 156 mm | 1 | 100 un |
| `cartao-9x5-v2-sangria3mm-dirA.pdf` | 90 × 50 mm | 96 × 56 mm | 2 (frente/verso) | 50 un |
| `flyer-a4-210x297-foto1-faixaTopo-sangria3mm-dirA.pdf` | 210 × 297 mm | 216 × 303 mm | 1 | — |
| `flyer-a4-210x297-foto2-fundoInteiro-sangria3mm-dirA.pdf` | 210 × 297 mm | 216 × 303 mm | 1 | — |

> Substitua `dirA` por `dirB` para a outra direção visual.
> **Direção A (dirA):** navy premium, fundo escuro, alto contraste.
> **Direção B (dirB):** clean branco + azul, visual mais leve e informativo.
>
> **A4 com foto (foto1/foto2):** foto `assets/Aplicações/Aplicação_09.png`.
> `foto1-faixaTopo` = foto sangrando nos ~40% superiores, texto embaixo.
> `foto2-fundoInteiro` = foto cobrindo a folha com véu navy/azul, texto por cima.
> Título próprio: "Seu lar ideal está a alguns cliques de distância!".

Previews em `artes-grafica/preview/` (PNG, 150 dpi) — para conferência antes do envio.

## Especificações de impressão

- **Material:** Papel Couché
- **Sangria:** 3 mm em todos os lados (já embutido nos PDFs)
- **Marcas de corte:** não incluir (conforme pedido)
- **Margem de segurança:** conteúdo a 8 mm da borda do corte
- **Resolução:** vetorial (texto e QR) + logos PNG 1081px
- **Fontes:** Poppins incorporada ao PDF (Light/Regular/Medium/SemiBold/Bold/ExtraBold)
- **Cores:** converter RGB → CMYK na gráfica

### Paleta da marca (para conferência de cores)

| Cor | HEX | Uso |
|---|---|---|
| Navy | `#003059` | Fundos escuros, títulos |
| Azul | `#006FEE` | Links, destaques, CTAs |
| Ciano | `#00B1F6` | Acentos, marca d'água, QR |
| Superfície | `#F2F8FB` | Blocos de fundo claro |
| Branco | `#FFFFFF` | Respiro, blocos CTA |

### Gramaturas sugeridas

| Peça | Sugerido |
|---|---|
| Flyer A4 (fixar em mural) | Couché 200g |
| Flyer 10×15 (balcão) | Couché 170g |
| Cartão 9×5 (entrega manual) | Couché 300g + **laminação fosca** |

## QR Code

Todos apontam para `https://imovelcentral.com.br` (nível de correção M).
Testado por decodificação automática nos 6 arquivos — todos escaneiam.

## Alterações de texto (v2 = textos atuais)

- **A4 (título):** "Todos os imóveis da região **em um só lugar.**"
- **10×15 (título):** "Sua casa nova esta aqui no **Imovel Central**"
- **Cartão (verso):** "**Vamos conversar?**" + "Buscamos parceiros e investidores para escalar o hub regional."
- **A4 com foto (título):** "Seu lar ideal está **a alguns cliques de distância!**"
- **Contatos do cartão:** contato@imovelcentral.com.br · (43) 99606-6392 Bruno · (18) 99777-1759 João · (18) 99678-2516 Luis

## Versões

- `src/*-v1.html` — primeira versão (preservada, intocada)
- `src/*.html` (sem sufixo) — versão de trabalho atual (v2)
- `src/flyer-a4-foto1-*.html` / `foto2-*.html` — A4 com foto, 2 layouts × 2 direções

## Como regerar

```bash
cd artes-grafica
node render.js        # gera previews + PDFs de todas as peças
node render.js a      # só direção A
node render.js foto1  # só o layout "faixa no topo" (id da peça)
node qa.js            # QA: overflow de layout, tamanho dos previews, QR escaneável
```

Fontes em `artes-grafica/src/*.html` + `print.css`. Constantes/peças em `render-lib.js`.
Logos copiados de `assets/` para `src/assets/` a cada execução (nomes em ASCII).
Previews saem a 150 dpi; PDFs a tamanho exato com sangria de 3mm.

## Para criar uma nova versão

1. Copie os HTMLs: `cp src/flyer-a4-a.html src/flyer-a4-a-v2.html`
2. Renomeie os PNGs/PDFs atuais com o sufixo da versão
3. Atualize a lista `PIECES` em `render.js` com o novo `name`
4. `node render.js`
