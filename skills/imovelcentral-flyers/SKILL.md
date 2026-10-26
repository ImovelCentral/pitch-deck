---
name: imovelcentral-flyers
description: Criar e alterar flyers do Imóvel Central em HTML/CSS prontos para gráfica, nos formatos A4 (210×297mm) e 10×15 (100×150mm), seguindo o padrão das direções A (navy) e B (clean) já estabelecidas em artes-grafica/src. Usar ao criar um flyer novo, gerar uma variação de direção visual, adaptar texto/preço/oferta, ou ajustar foto de fundo, véu, respiro, chips e CTA de um flyer existente.
---

# Flyers Imóvel Central

Produzir flyers impressos em HTML/CSS, com fidelidade em milímetros, a partir dos templates já aprovados em `artes-grafica/src/`.

## Regra de ouro: só HTML

- **Alterar e criar apenas arquivos `.html`** em `artes-grafica/src/`.
- **Não** gerar PNG, preview ou screenshot por conta própria. O usuário avalia o HTML diretamente.
- **Não** rodar `node render.js` nem gerar PDF a cada ajuste.
- **Gerar PDF somente** quando: (a) o usuário pedir explicitamente, ou (b) todas as alterações solicitadas estiverem concluídas e o usuário declarar que terminou/que pode enviar para a gráfica.

## Arquivos de referência (ler antes de criar)

| Papel | Arquivo |
|---|---|
| Sistema visual, tokens, folhas e sangria | `artes-grafica/src/print.css` |
| A4 sem foto, direção A (navy) | `artes-grafica/src/flyer-a4-a.html` |
| A4 sem foto, direção B (clean) | `artes-grafica/src/flyer-a4-b.html` |
| 10×15, direção A | `artes-grafica/src/flyer-mini-a.html` |
| 10×15, direção B | `artes-grafica/src/flyer-mini-b.html` |
| A4 com foto de fundo inteiro, A | `artes-grafica/src/flyer-a4-foto2-a.html` |
| A4 com foto de fundo inteiro, B | `artes-grafica/src/flyer-a4-foto2-b.html` |
| Pipeline (PDF/QA) | `artes-grafica/render.js`, `qa.js`, `render-lib.js` |

Sempre partir do par A/B existente. Nunca redesenhar do zero o que já é padrão.

## Fundação técnica

Herança obrigatória: `<link rel="stylesheet" href="print.css">` no `<head>` e a classe `sheet sheet--a4 pad-a4` (ou `sheet--mini pad-mini`).

```css
/* folha de trabalho = corte + 2×3mm de sangria */
.sheet--a4   { height: 303mm; width: 216mm; }  /* 210×297 */
.sheet--mini { height: 156mm; width: 106mm; }  /* 100×150 */
.pad-a4      { padding: 8mm; }                 /* 3mm sangria + 5mm respiro */
.pad-mini    { padding: 7mm; }
```

Estrutura base da folha:

```css
.sheet--a4 {
  background: var(--navy);
  color: #fff;
  display: flex;
  flex-direction: column;
  isolation: isolate;   /* cria o contexto dos z-index negativos */
}
```

Camadas: fundo/foto em `z-index: -2`, véu logo acima, marca d'água em `-1`, conteúdo por cima. `isolation: isolate` é obrigatório para que os negativos não escapem.

## Tokens (em `print.css`, não redefinir)

| Token | Valor | Uso |
|---|---|---|
| `--navy` | `#003059` | Fundo escuro, títulos |
| `--blue` | `#006FEE` | Links, CTA, URL |
| `--cyan` | `#00B1F6` | Kicker, acentos, chips |
| `--cyan-soft` | `#E5F7FE` | Fundo do QR |
| `--muted` | `#65727A` | Texto secundário sobre branco |
| `--line` | `#DCECF3` | Divisórias claras |

Direção B usa o gradiente de véu azul e `#8FD8FF` como acento de título/kicker — não `--cyan` puro.

## Assinatura de componentes (não invente variantes)

**Header** — logo à esquerda, pill à direita.
```html
<header>
  <img class="logo" src="assets/LOGO_TIPO_01.png" alt="Imóvel Central">
  <span class="pill">Assis e região</span>
</header>
```
`header .logo { height: 13mm }` no A4 e `7.5mm` no 10×15. O `.pill` vem de `print.css`; só cor de borda/tinta é sobrescrita (`--cyan` no A, branco translúcido no B).

**Kicker** com traço à direita:
```css
.kicker { align-items: center; display: flex; font-size: 10pt; font-weight: 700; gap: 3mm; letter-spacing: .2em; text-transform: uppercase; }
.kicker:after { background: var(--cyan); content: ""; height: .7mm; width: 22mm; }
```

**Título** — `h1` 45pt A4 / 23pt mini, `font-weight: 800`, `line-height` 1.03–1.06, `letter-spacing: -.02em`, `max-width: 180mm`. A ênfase final vai em `<em>`, colorida:
```html
<h1>Seu lar ideal está <em>a alguns cliques de distância!</em></h1>
```

**Sub** — 16pt A4 / 8.5pt mini, `font-weight: 300` (A) ou `400` (B), `line-height: 1.45`, `max-width: 172mm`. Números e promessas em `<b>`.

**Chips** — lista de 3 itens, marcador `✓` circular gerado por `:before`:
```css
.chips { display: flex; gap: 4mm; list-style: none; margin-top: 13mm; }
.chips li { align-items: center; border-radius: 3mm; display: flex; font-size: 11.5pt; font-weight: 600; gap: 3mm; padding: 4mm 5mm; }
.chips li:before { background: var(--cyan); border-radius: 50%; color: var(--navy); content: "✓"; display: flex; font-size: 10pt; font-weight: 800; height: 7mm; justify-content: center; width: 7mm; }
```
No A: `background: rgba(0,30,58,.5)` + borda branca 28% + `backdrop-filter: blur(1mm)`. No B: `background: rgba(255,255,255,.14)`, marcador branco com `✓` em `--blue`. No 10×15 os chips são em pilha vertical (`display: block`, `margin-top: 2mm`), sem caixa.

**CTA** — cartão branco fixado no rodapé por `margin-top: auto`:
```css
.cta { align-items: center; background: #fff; border-radius: 5mm; color: var(--navy); display: flex; gap: 7mm; margin-top: auto; padding: 7mm; }
.cta .qr { background: var(--cyan-soft); border-radius: 3mm; padding: 3mm; width: 42mm; }
.cta .cta-title { font-size: 17pt; font-weight: 700; }
.cta .cta-text { color: var(--muted); font-size: 11pt; font-weight: 500; margin-top: 1.5mm; }
.cta .url { color: var(--blue); font-size: 26pt; font-weight: 800; letter-spacing: -.02em; margin-top: 3mm; }
```
Conteúdo: QR + título "Aponte a câmera e comece a buscar" + linha de cidades + URL. No 10×15 o QR é 24mm e a URL 13pt.

**Footer** — linha divisória fina, texto 9.5pt (A4) ou 6pt centralizado (mini), com assinatura e e-mail.

**Marca d'água** — símbolo sangrando, sempre atrás do conteúdo:
```css
.bg-symbol { height: 190mm; opacity: .06; right: -54mm; top: 46mm; width: 190mm; z-index: -1; }
```
Referências: A4 sem foto 210mm/`.07` no canto superior direito; 10×15 120mm/`.08`; foto2-A 190mm/`.06` em `top: 46mm`. No foto2-B ele fica menor e abaixo dos chips (`92mm`, `opacity: .07`, `right: -18mm`, `bottom: 66mm`) para não cobrir rostos.

## Direção A × Direção B

| | A (Navy) | B (Clean) |
|---|---|---|
| Fundo | `--navy` sólido (+ `.band` diagonal ciano opcional) | Branco/azul claro; blocos navy com raio |
| Acento do título | `--cyan` | `#8FD8FF` |
| Chips | escuros translúcidos, blur | brancos translúcidos |
| Pill | borda `--cyan`, texto `--cyan` | borda branca 55%, texto branco |
| Tom do texto | `300` no sub | `400` no sub |
| Foto de fundo (se houver) | véu navy `rgba(0,48,89,…)` | véu azul `rgba(0,64,131,…)` → `rgba(0,90,190,…)` |

As duas direções compartilham a mesma grade, tamanhos e CTA. Mudam cor, peso e transparência — não a arquitetura.

## Flyer A4 com foto de fundo (padrão foto2)

O caso mais delicado. A ordem das camadas e o recorte definem o resultado.

```css
.photo-full { inset: 0; overflow: hidden; position: absolute; z-index: -2; }
.photo-full img { height: 100%; object-fit: cover; position: absolute; top: 0; width: 100%; }
.photo-full:after {           /* véu */
  background: linear-gradient(180deg, rgba(0,48,89,.92) 0%, rgba(0,48,89,.74) 28%, rgba(0,48,89,.80) 58%, rgba(0,48,89,.88) 82%, rgba(0,48,89,.97) 100%);
  content: ""; inset: 0; position: absolute;
}
```

**Colagem com duas famílias** (`assets/aplicacao-09.png`, 1920×1080, duas fotos lado a lado): escolher uma metade exige escalar, porque `object-fit` só recorta ~6% numa folha 216×303. Metade esquerda:

```css
.photo-full { overflow: hidden; }                 /* clipa o excesso */
.photo-full img { width: 200%; left: 0; object-fit: cover; }
```

Para a metade direita, use `width: 100%` com `object-position: 100% 50%` (padrão original do foto2-A). Nunca aplicar `width: 200%` sem `overflow: hidden` no container.

**Véu** — ajustar sempre pelas paradas do gradiente, nunca por um filtro global. Referência calibrada (foto2-A): 0% .92 · 28% .74 · 58% .80 · 82% .88 · 100% .97. O foto2-B usa perfil mais claro porque o fundo azul já é luminoso: 0% .86 · 28% .64 · 58% .68 · 82% .78 · 100% .94. Reduzir 4–6 pontos por parada já é perceptível; reduzir 10+ apaga o contraste do título.

**Respiro vertical calibrado** (não regredir): `.hero { margin-top: 26mm }` (era 34), `h1 { margin-top: 6mm }`, `.chips { margin-top: 13mm }`, `footer { padding-top: 6mm }`. Com isso sobram ~48mm livres entre os chips e o CTA — é a faixa que exibe a família. Não preencher sem pedido do usuário.

## Formatos

| Peça | Classe | Corte | Folha | Padding | Título |
|---|---|---|---|---|---|
| A4 | `sheet--a4 pad-a4` | 210×297 | 216×303 | 8mm | 43–45pt |
| 10×15 | `sheet--mini pad-mini` | 100×150 | 106×156 | 7mm | 23pt |

## Ativos

Em `artes-grafica/src/assets/` (ASCII):
- `LOGO_TIPO_01.png` — logo tipográfica horizontal; `_04` e `_05` são variantes para fundo claro.
- `LOGO_SIMBOLO_01.png` — símbolo casa+localização para marca d'água; `_04` e `_05` alternativas.
- `qr-navy.svg` (fundo claro), `qr-white.svg` (fundo escuro), `qr-blue.svg`.
- `aplicacao-09.png` — colagem de duas famílias para A4 com foto.

QR sempre em `<img>` com `alt="QR Code"`, envolvido em fundo `--cyan-soft` com padding ≥3mm — margem de silêncio obrigatória para leitura.

## Conteúdo e voz

- Português do Brasil, tom direto e regional ("Assis e região").
- Título em uma ideia, com a virada em `<em>`.
- Sub com benefício concreto e número quando existir (ex.: "mais de 4.000 anúncios").
- Três chips curtos, no máximo 3–4 palavras cada.
- CTA com verbo de ação + URL em destaque.
- **Sempre revisar ortografia antes de fechar** — erros em peça impressa não têm conserto. Checar termos recorrentes: "começando", "anúncios", "imobiliária", "Paraguaçu", "Cândido Mota".

## Fluxo de trabalho

1. **Ler** o par A/B de referência do formato pedido e o `print.css`.
2. **Copiar** o mais próximo como base para o novo arquivo (não sobrescrever o original sem pedido).
3. **Alterar** apenas o bloco CSS/HTML necessário, mantendo nomes de classe, tokens e estrutura de camadas.
4. **Checar** mentalmente as três armadilhas: overflow vertical (nada além de 303mm/156mm), contraste do título sobre a foto, e QR com margem de silêncio.
5. **Entregar os caminhos dos `.html`** para o usuário avaliar. Não renderizar.

## Nomenclatura

`flyer-a4-<variante>-<a|b>.html` e `flyer-mini-<variante>-<a|b>.html`, em `artes-grafica/src/`. `<variante>` descreve o layout (`foto2`, `promo`, `lancamento`). Nunca reutilizar nome existente para outro conteúdo.

## Exportar para a gráfica (só quando pedido)

Somente após o usuário confirmar que os HTMLs estão aprovados:

```bash
cd artes-grafica
node qa.js all      # overflow + QR escaneável de todas as peças
node render.js all  # previews 150dpi + PDFs com sangria
```

`render.js` lê a lista `PIECES` de `render-lib.js`. Ao criar um flyer novo, incluir a entrada correspondente lá — e, ao apagar HTMLs, remover as entradas órfãs. PDFs em `out/`, nomeados `<name>-sangria3mm-dir<A|B>.pdf`.
