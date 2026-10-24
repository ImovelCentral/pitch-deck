---
name: template-designer
description: Visual template selection for image design agents. Generates template variations, renders them as images for user review, and saves the approved visual identity.
type: prompt
version: "2.0.0"
categories: [design, visual, templates]
---

# Template Designer

Visual template selection and refinement for creation and editing.

## When to Use

- During creation: when the Design phase identifies an image design agent and the user opts to choose a template
- During editing: when the user asks to define, edit, or change the visual identity / template of a design agent
- Trigger: presence of `image-creator` skill (or similar image-producing skill) in the project's skill list

## Prerequisites

- A design agent that produces images (uses `image-creator` skill)
- `image-creator` skill installed (for rendering HTML to PNG)

## How It Works

1. You read context and base templates
2. You generate 3 adapted HTML template variations
3. You render each as a PNG image using the `image-creator` skill
4. You present the image file paths to the user for review
5. You iterate with feedback until approval
6. You save the approved template as HTML reference + structured style rules

## Generating Templates

### Step 0: Read Design Guidelines (MANDATORY)

Key rules to always follow:
- **Font sizes**: Hero 58px, Heading 43px, Body 34px, Caption 24px minimum for Instagram carousel (1080x1440). Absolute minimum 20px for any readable text on any platform.
- **Font weight**: 500 or higher for body text and above.
- **Colors**: Maximum 5 colors per design system (primary, secondary, accent, background, text).
- **Contrast**: WCAG AA minimum 4.5:1 for all text against background.
- **Layout**: CSS Grid or Flexbox only. No absolute positioning for primary content.
- **Self-contained HTML**: Inline CSS only. Only Google Fonts @import allowed as external resource.
- **No slide counters**: Never include "1/7" or similar. Instagram has native navigation.

You should also apply general web design best practices: proper white space, visual hierarchy through scale and weight, consistent spacing rhythm, and balanced composition.

### HARD RULES — Dimensions and Typography

These rules are NON-NEGOTIABLE. Every template must comply:

**Fixed Dimensions (never use height: auto or flexible height):**
- Instagram Carousel: `width: 1080px; height: 1440px` (3:4 portrait)
- Instagram Story/Reel: `width: 1080px; height: 1920px` (9:16 portrait)
- Instagram Post: `width: 1080px; height: 1080px` (1:1 square)
- LinkedIn Post: `width: 1200px; height: 627px` (1.91:1 horizontal)
- BCO. Deck (16:9): `width: 1920px; height: 1080px`
- BCO. Document (A4 vertical): `width: 210mm; height: 297mm` with `overflow: hidden` per page — content must fit the page; never let a block spill past the footer

The root container of every template MUST set explicit `width` and `height` in pixels. The template must render at exactly these dimensions — no overflow, no scrolling, no flexible height.

**Minimum Font Sizes (Instagram at 1080px width):**
- Hero/Title: **58px** minimum
- Heading: **43px** minimum
- Body text: **34px** minimum
- Caption/small text: **24px** minimum
- Absolute minimum for ANY readable text on ANY platform: **20px**

**Font Weight:** 500 or higher for body text and above. Never use font-weight below 400 for any visible text.

Templates that violate these rules are rejected — no exceptions.

### Step 1: Read Context

Use the company context and user preferences to adapt template content: example text should reflect the company's domain and audience, colors should align with brand if available, and language should match the user's Output Language preference.

### Step 2: Read Base Templates

Select the base template according to the presentation context:

- For **BCO. — Consultoria em TI** documents and presentations (own brand — proposals, reports, TAP, client decks), choose:
  - `bco-documento.html` — vertical A4 document template (210×297mm, print-ready with `@page` breaks) with cover, section pages, scope/investment tables, numbered clauses, timeline and signature blocks.
  - `bco-apresentacao.html` — 16:9 presentation template (1920×1080, keyboard navigation) with cover, agenda, card grids, tables/timelines and closing slide.
- For FEMA classes, especially Project Management lessons, choose between:
  - `model-fema-gestaodeprojetos-aulas.html` — 16:9 academic template that combines FEMA colors and graphic elements with the card-based composition, hierarchy and spacing.

### Step 3: Generate Adapted Variations

For each base template, create an adapted version:
- Adjust colors to match the domain/brand (use Sherlock palette if available, company brand colors from company.md if available)
- Adjust typography following the platform-specific minimum font sizes from `image-design.md`
- Replace example content with domain-relevant content that reflects the company's industry, audience, and language
- Set the root container to the exact fixed dimensions from HARD RULES above. Never use percentage heights or auto heights.
- Add any visual elements that match the project personality
- Apply proper white space, visual hierarchy, and spacing rhythm per `image-design.md` methodology

Write each adapted template as a **complete, self-contained HTML file** (with `<!DOCTYPE html>`, inline CSS, and Google Fonts imports if needed).


### Step 4: Render as Images

Use the `image-creator` skill to render each HTML template as a PNG image:

1. Read `skills/image-creator/SKILL.md` for rendering instructions
2. Render each template HTML to PNG using the image-creator workflow
3. Save rendered images

**Important:** Always use the full absolute path (e.g., `d:\Projects\slide-creator\_build\template-a.png`) inside the markdown link — relative paths are not clickable in the IDE.

## Iteration Loop

1. Present template images with clickable markdown links using absolute file paths
2. Wait for user feedback in terminal
3. Generate new version based on feedback — save as `template-v2.html`, render as `template-v2.png`, etc.
4. Present updated image with clickable markdown link using absolute file path
5. Repeat until user approves


# Visual Identity — BCO. (marca própria do repositório)

Fonte oficial: `assets/identidade-bco/` (kit completo + `html/manual-da-marca.html`).
Todo documento e apresentação desta consultoria herda estes padrões.

## Color Palette
- **Primary (Navy):** `#0E1726` — base da marca, capas, headers de tabela, texto de título. ~40% da peça
- **Surface:** `#F6F7F9` · **Background:** `#E4E8EE` — cards, zebrado de tabelas, respiro (~30%)
- **Text (Slate):** `#3F4B5F` — corpo de texto corrido
- **Accent (Azul claro):** `#B8D1E7` — ponto do logo, réguas e traços de destaque (~10%). **Nunca cor de texto** (contraste 1,47:1)
- **Interaction (Azul digital):** `#3B82C4` — só links, kickers e ênfase de UI (~5%). Nunca texto corrido
- **Muted:** `#B4BFD0` — texto sobre navy, metadados. Proporção de uso do manual: 40/30/15/10/5

## Typography
- **Headings:** Space Grotesk 700 — Display 64/66px (tracking −0.03em), H1 34/37px (−0.02em), H2 22/28px
- **Body:** Inter 400 — 15/24px; ênfases em Inter 600
- **Caption:** Inter 400 — 12,5/18px
- **Labels/kickers:** Inter 700 — 10,5px caixa alta, tracking +0.14em
- **Minimums (A4):** 12px tela / 9pt impresso para texto de leitura. Em deck 1920px: corpo ≥22px
- **Fallback:** `system-ui` para títulos, `Segoe UI/Roboto` para texto. Nunca terceiras fontes decorativas

## Layout
- **Documento:** A4 vertical `210mm × 297mm`, margem 16mm, header em 8mm e footer em 8mm (texto 9px caixa alta, `#9AA5B5`)
- **Deck:** `1920 × 1080px`, padding 64/88/56px
- **Grid:** CSS Grid/Flex apenas — grid2/grid3/grid4 com gap 12–26px; nada de position absolute no conteúdo primário
- **Spacing:** ritmo de 4–6mm (A4) / 18–26px (deck) entre blocos; um bloco dark por página/slide, no máximo

## Composition Rules
- **Logo:** somente SVGs oficiais de `assets/identidade-bco/svg/` — principal (versão clara) em fundo claro, invertida em fundo navy, horizontal em cabeçalhos. Nunca redesenhar, distorcer, rotacionar, trocar cores ou aplicar sombra/efeitos. O ponto é azul `#B8D1E7`. Sempre.
- **Capa:** fundo navy, logo invertido no topo, régua `#B8D1E7` de 74–96px acima do título, ghost “BCO.” ao fundo direito, site no rodapé
- **Páginas/slides internos:** header fininho com tipo do documento à esquerda e seção à direita; kicker numerado (chip navy) + título + lead; footer `brunocarazato.me` + numeração
- **Hierarquia:** kicker (azul digital) → título (navy) → lead (slate) → blocos; superfície clara carrega, navy destaca
- **Tabelas:** header navy, primeira coluna em negrito, zebrado `#F6F7F9`
- **Rodapé/CTA:** feche sempre com próximo passo explícito — decisão, data ou contato

## Adaptation Rules
- **Fixo:** paleta, fontes, logo, header/footer e proporções de uso
- **Adapta:** conteúdo, número de cards/colunas e ordem dos blocos; nunca introduza novas cores ou fontes
- Documentos A4 nunca excedem a altura da página — redistribua entre páginas em vez de reduzir fonte abaixo dos mínimos
- Para outra marca (ex.: FEMA), substitua paleta e logo mantendo a mesma estrutura de composição
