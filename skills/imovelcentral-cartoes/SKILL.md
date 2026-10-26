---
name: imovelcentral-cartoes
description: Criar e alterar cartões de visita do Imóvel Central (9×5cm, frente e verso) em HTML/CSS prontos para gráfica, seguindo o template das direções A (navy) e B (clean) de artes-grafica/src/cartao-*.html. Usar ao criar um cartão para um novo contato, trocar nomes/telefones/e-mail, ajustar QR, ou gerar uma variação de direção visual do cartão.
---

# Cartões de contato Imóvel Central

Produzir cartões de visita 9×5cm (frente e verso) em HTML/CSS, reaproveitando o template já aprovado em `artes-grafica/src/cartao-a.html` e `cartao-b.html`.

## Regra de ouro: só HTML

- **Alterar e criar apenas arquivos `.html`** em `artes-grafica/src/`.
- **Não** gerar PNG, preview ou screenshot por conta própria. O usuário avalia o HTML diretamente.
- **Não** rodar `node render.js` nem gerar PDF a cada ajuste.
- **Gerar PDF somente** quando: (a) o usuário pedir explicitamente, ou (b) todas as alterações solicitadas estiverem concluídas e o usuário declarar que terminou/que pode enviar para a gráfica.

## Arquivos de referência

| Papel | Arquivo |
|---|---|
| Sistema visual, tokens e medidas de sangria | `artes-grafica/src/print.css` |
| Cartão direção A (frente navy, verso branco) | `artes-grafica/src/cartao-a.html` |
| Cartão direção B (frente branca com bloco navy, verso navy) | `artes-grafica/src/cartao-b.html` |

## Fundação técnica

Herança obrigatória: `<link rel="stylesheet" href="print.css">` e a classe `sheet sheet--card pad-card`.

```css
.sheet--card { height: 56mm; width: 96mm; }  /* 90×50 + 3mm sangria */
.pad-card    { padding: 6mm; }               /* 3mm sangria + 3mm respiro */
```

O arquivo tem **duas folhas no mesmo documento** — frente e verso, nessa ordem. O pipeline gera um PDF de 2 páginas por direção (`pages: 2` em `render-lib.js`).

```html
<!-- FRENTE -->
<div class="sheet sheet--card pad-card front">…</div>

<!-- VERSO -->
<div class="sheet sheet--card pad-card back">…</div>
```

Manter os comentários `<!-- FRENTE -->` e `<!-- VERSO -->`.

## Estrutura das duas direções

**Direção A** — frente sólida navy com logo, régua ciano e tagline; verso branco com faixa navy de 3mm na borda esquerda.
```css
.front { background: var(--navy); color: #fff; isolation: isolate; justify-content: center; }
.front .bg-symbol { height: 96mm; opacity: .1; right: -26mm; top: -22mm; width: 96mm; z-index: -1; }
.front .logo { height: 9mm; }
.front .tagline { color: var(--cyan); font-size: 5.6pt; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; }
.front .rule { background: var(--cyan); height: .8mm; width: 14mm; }
.front .site { bottom: 6mm; left: 6mm; font-size: 5.4pt; color: rgba(255,255,255,.66); position: absolute; }
.back { background: #fff; color: var(--ink); }
.back .accent { background: var(--navy); bottom: 0; left: 0; position: absolute; top: 0; width: 3mm; }
```

**Direção B** — frente branca com painel navy arredondado interno e símbolo em círculo; verso navy.
```css
.front .panel { background: var(--navy); border-radius: 3mm; inset: 6mm; position: absolute; }
.front .sym { background: rgba(255,255,255,.1); border-radius: 50%; height: 17mm; width: 17mm; align-items: center; justify-content: center; }
.front .sym img { height: 10mm; }
.front .logo { height: 7.5mm; }
.back { background: var(--navy); color: #fff; display: flex; gap: 5mm; }
```

## QR Code

Sempre no verso, como `<img class="qr">`, com fundo `--cyan-soft` e padding para margem de silêncio:

```css
.back .qr { align-self: center; background: var(--cyan-soft); border-radius: 2.5mm; flex-shrink: 0; padding: 2.5mm; width: 28mm; } /* B: 27mm */
```

`qr-navy.svg` atende as duas direções (inclusive o verso navy do B), porque o módulo é navy `#003059` sobre `--cyan-soft`. Só trocar para `qr-white.svg` se o fundo atrás do QR for navy sólido.

## Bloco de contato (verso)

Ambas as direções usam a mesma marcação e grade:

```html
<div class="info">
  <p class="info-title">Vamos conversar?</p>
  <p class="info-sub">Buscamos parceiros e investidores para escalar o hub regional.</p>
  <div class="contacts">
    <div class="email"><b>E-mail</b><span>contato@imovelcentral.com.br</span></div>
    <div><b>Bruno</b><span>(43) 99606-6392</span></div>
    <div><b>João</b><span>(18) 99777-1759</span></div>
    <div><b>Luis</b><span>(18) 99678-2516</span></div>
  </div>
</div>
```

```css
.back .info-title { font-size: 8.5pt; font-weight: 800; line-height: 1.15; letter-spacing: -.01em; }
.back .info-sub   { font-size: 5.6pt; line-height: 1.35; margin-top: 1.2mm; }
.back .contacts   { border-top: .3mm solid var(--line); margin-top: 2.5mm; padding-top: 2.5mm; }
.back .contacts div { align-items: baseline; display: flex; font-size: 6pt; margin-top: .9mm; }
.back .contacts b   { width: 12mm; font-weight: 700; }   /* coluna fixa: mantém os telefones alinhados */
```

Cores por direção: A usa `--muted` no sub/contato, `--navy` no rótulo e `--blue` no e-mail; B usa branco translúcido 72%/85% e `--cyan` no rótulo.

**Limite físico:** o verso tem 84×44mm úteis e o bloco `.info` hoje ocupa 31,5mm (título + sub + 4 linhas de contato). Há folga para **1 linha extra** de contato (~4mm). Acima disso, encurtar o `info-sub` para uma linha ou reduzir o QR. Nunca reduzir a fonte abaixo de 5.6pt.

## Regras de composição

- Logo e símbolo apenas nas versões oficiais de `artes-grafica/src/assets/` — nunca redesenhar, distorcer ou recolorir.
- Margem de segurança: nada a menos de 6mm da borda da folha (equivalente a 3mm do corte).
- Tipografia pequena exige contraste alto: sobre navy, branco ≥72% de opacidade.
- Uma única mensagem no verso. Cartão não é flyer.
- Revisar ortografia, DDD e formato dos telefones: `(DD) 99999-9999`. E-mail em minúsculas.

## Ativos

`LOGO_TIPO_01.png` (frente), `LOGO_SIMBOLO_01.png` (marca d'água no A, círculo da frente no B), `qr-navy.svg` (verso).

## Fluxo de trabalho

1. **Ler** `cartao-a.html` e `cartao-b.html` e o `print.css`.
2. **Copiar** a direção desejada para o novo arquivo (não sobrescrever o original sem pedido).
3. **Alterar** dados de contato no HTML e, se necessário, apenas ajustes pontuais de CSS.
4. **Conferir** contagem de linhas do verso e se o QR mantém padding.
5. **Entregar os caminhos dos `.html`** para o usuário avaliar. Não renderizar.

## Nomenclatura

`cartao-<variante>-<a|b>.html` em `artes-grafica/src/`. Para um cartão nominal, `cartao-<nome>-<a|b>.html` (ex.: `cartao-bruno-a.html`).

## Exportar para a gráfica (só quando pedido)

Somente após confirmação dos HTMLs:

```bash
cd artes-grafica
node qa.js card      # overflow + QR escaneável
node render.js card  # PDFs de 2 páginas (frente/verso) com sangria
```

Cada direção gera um PDF com duas páginas em `out/cartao-9x5-v2-sangria3mm-dir<A|B>.pdf`. Se criar um cartão novo, adicionar a entrada em `PIECES` (`render-lib.js`) com `pages: 2`.
