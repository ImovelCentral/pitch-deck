# Vídeos — Imóvel Central

Vídeos de lançamento/divulgação (15–25s) gerados a partir de uma URL do produto, via
[/brag](https://github.com/latent-spaces/brag) + [Hyperframes](https://hyperframes.heygen.com/).

A URL pode ser produção (`https://imovelcentral.com.br`) ou um app rodando localmente
(`http://localhost:3000`). Nada de screenshot manual: a captura é automática.

## Pré-requisitos

Tudo deve rodar **dentro do WSL** (agente, Node e ffmpeg no mesmo ambiente).

| Requisito | Verificação | Observação |
|---|---|---|
| Rodar no WSL | `uname -r` contém `microsoft-standard` | Se rodar no host, o ffmpeg do WSL não aparece no PATH |
| Node.js ≥ 22 | `node -v` | Abaixo disso o Hyperframes recusa rodar |
| FFmpeg | `ffmpeg -version` | Necessário para render e extração de poster |
| Hyperframes CLI | `npx hyperframes doctor` | Instalado on-demand via `npx` |

Verificação em um comando:

```bash
node -v && ffmpeg -version | head -1 && npx hyperframes doctor
```

> **Sessão do agente presa no Node antigo:** o PATH de um terminal já aberto não
> recarrega o nvm. Se `node -v` mostrar < 22 mesmo após o upgrade, rode antes dos
> comandos de vídeo:
>
> ```bash
> export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use 22
> ```
>
> O arquivo `.nvmrc` na raiz do projeto já aponta para `22` (use `nvm use` sem
> argumento). Em terminais novos o nvm já entrega o 22 (alias `default`).

> Após subir o Node para 22, se `artes-grafica/render.js` (pipeline gráfico) falhar,
> rode `npm ci` dentro de `artes-grafica/`.

## Estrutura

```
video/
├── src/
│   └── <slug>/            # commitado — o contrato criativo
│       ├── brief.md       # fonte (URL + rotas), público, tom, formato, duração
│       ├── storyboard.md  # cena a cena: rota + o que deve ser visto
│       └── share-copy.md  # rascunho; o /brag escreve a versão final
└── out/
    └── <slug>/            # gitignored — sempre regenerável
        ├── capture/       # saída do `npx hyperframes capture`
        │   └── manifest.json
        ├── composition/   # projeto Hyperframes
        ├── brag.mp4
        ├── brag.jpg
        └── share-copy.txt
```

**Slug:** `YYYY-MM-tema`, por exemplo `2026-11-lancamento`. Nunca reutilizar um slug
para outro conteúdo; crie um novo.

## Skills

| Skill | Papel |
|---|---|
| [`video-creator`](../skills/video-creator/SKILL.md) | Enquadra, pergunta URL/rotas, escreve `brief.md` + `storyboard.md`, aguarda aprovação |
| [`brag-video`](../skills/brag-video/SKILL.md) | Valida ambiente, captura as rotas, executa o `/brag` com saída em `out/<slug>/` |

## Fluxo

```bash
# 1. Criar o contrato (skill video-creator)
#    "vídeo de lançamento do imovelcentral.com.br"
#    → pergunta rotas → escreve src/<slug>/brief.md e storyboard.md → aguarda aprovação

# 2. Executar (skill brag-video)
node -v && ffmpeg -version | head -1 && npx hyperframes doctor
npx hyperframes capture <url/rota> --json -o video/out/<slug>/capture/<rota>
# → /brag com saída em video/out/<slug>/
```

## Captura multi-rota

Uma captura por rota, em pasta própria:

```
video/out/<slug>/capture/
├── manifest.json
├── home/
├── buscar/
└── anunciar/
```

**Reuso:** antes de capturar, a skill compara `base_url` e `routes` do `brief.md` com o
`manifest.json`.

| Situação | Ação |
|---|---|
| URL e rotas iguais, todas `ok: true` | Reusa e informa a data da captura |
| Rotas novas ou alteradas | Recaptura só as rotas afetadas |
| `manifest.json` ausente ou alguma rota `ok: false` | Recaptura tudo |
| `--recapture` no pedido | Recaptura tudo, sempre |

**Parada dura:** se qualquer rota retornar `ok: false` ou `BLOCKED.md`, a skill para e
não renderiza. Nunca inferir cores, fontes ou copy de uma captura parcial.

## Saídas

| Arquivo | Descrição |
|---|---|
| `brag.mp4` | Vídeo final com o poster como frame 0 |
| `brag.jpg` | Poster (frame settled mais forte) |
| `share-copy.txt` | Legenda única, pronta para publicar |
| `composition/` | Projeto Hyperframes editável |

Nada em `out/` é versionado — tudo pode ser regenerado a partir de `src/<slug>/`.
