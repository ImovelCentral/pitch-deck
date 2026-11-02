---
name: brag-video
description: Executar a geração de um vídeo de lançamento do Imóvel Central usando /brag e Hyperframes a partir de um brief aprovado em video/src/<slug>/. Valida o ambiente (WSL, Node ≥22, ffmpeg, hyperframes), captura as rotas configuradas com npx hyperframes capture, reutiliza a captura quando URL e rotas não mudaram, e grava o vídeo em video/out/<slug>/. Usar ao executar ou reexecutar um vídeo já planejado, ou quando o usuário pedir o render do vídeo.
---

# Brag Video

Executar o vídeo de um slug planejado pela skill
[`video-creator`](../video-creator/SKILL.md). A geração do vídeo é feita pelo
[/brag](https://github.com/latent-spaces/brag); esta skill só prepara a fonte e
garante que a saída fique no lugar certo.

## Entrada

`video/src/<slug>/brief.md` e `storyboard.md` já aprovados. Se não existirem, volte
para `video-creator`.

## 1. Validar o ambiente (antes de qualquer coisa)

```bash
uname -r                          # deve conter microsoft-standard (WSL)
node -v                           # precisa ser >= 22
ffmpeg -version | head -1         # precisa responder
npx hyperframes doctor            # precisa passar
```

Se `node -v` não for ≥ 22 mas o nvm tiver o 22 instalado, recarregue o nvm na sessão
antes de continuar (o PATH desta sessão pode estar preso numa versão antiga):

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 22
```

Se falhar, **pare** e informe o problema exato:

| Problema | Mensagem ao usuário |
|---|---|
| Fora do WSL | "Rode o agente dentro do WSL: o ffmpeg está instalado lá, não no host." |
| Node < 22 | "Node atual é X; o Hyperframes exige ≥ 22. Rode `export NVM_DIR=\"$HOME/.nvm\"; . \"$NVM_DIR/nvm.sh\"; nvm use 22` (ou abra um terminal novo) e tente de novo." |
| ffmpeg ausente | "ffmpeg não encontrado no PATH. Instale no WSL e reabra o terminal." |
| `doctor` falha | Colar a saída do comando |

## 2. Ler a fonte

Ler `base_url` e `rotas` do `brief.md`. Cada rota tem um nome de pasta ASCII
(`home` → `/`, `buscar` → `/buscar`).

## 3. Checar reuso da captura

Destino: `video/out/<slug>/capture/`, com `manifest.json`:

```json
{
  "base_url": "https://imovelcentral.com.br",
  "routes": { "home": "/", "buscar": "/buscar" },
  "captured_at": "2026-11-02T14:30:00Z",
  "captures": { "home": { "ok": true }, "buscar": { "ok": true } }
}
```

Decisão:

| Situação | Ação |
|---|---|
| `--recapture` pedido | Recaptura todas |
| Sem `manifest.json` | Recaptura todas |
| `base_url` diferente | Recaptura todas |
| Rota nova ou `ok: false` | Recaptura só essas (e reescreve o manifest) |
| Tudo igual e todas `ok: true` | Reusa; informar a data de `captured_at` |

Ao reusar, avisar em uma linha: "Reusando captura de DD/MM HH:MM (mesma URL e rotas).
Diga `recaptura tudo` para atualizar."

## 4. Capturar

Uma captura por rota, sempre em pasta isolada:

```bash
npx hyperframes capture "<base_url><rota>" --json \
  -o "video/out/<slug>/capture/<nome>"
```

Regras:

- **Parada dura:** se a saída tiver `ok: false`, exit code ≠ 0 ou `BLOCKED.md`,
  **pare**, reporte a rota e a fase (`lastPhase`) e não renderize. Nunca inferir cores,
  fontes ou copy de captura parcial.
- Uma rota bloqueada invalida o vídeo inteiro — não há como compor só as cenas boas.
- Em retry, use **pasta nova**; não misture com a tentativa anterior.
- Atualize `manifest.json` ao final, com `ok` por rota e `captured_at`.

## 5. Executar o /brag

Diretório de trabalho: `video/` (para o `/brag` ler os HTMLs da raiz, ele precisa
receber os caminhos explicitamente — informe `../index.html`, `../deck.css`, etc. e o
`out/<slug>/capture/` como material de captura).

1. Garantir `video/out/<slug>/` criado.
2. Executar o `/brag` com:
   - o tom do `brief.md`, se houver; **sem `--tone` se estiver marcado como "inferir"**;
   - o formato em `--format`;
   - a duração em `--duration` quando fora do padrão;
   - **o destino fixado em `video/out/<slug>/`**.
3. O `/brag` escreve em `brag-output/` ou `brag-output-YYYY-MM-DD-HHmmss/`. Ao final,
   mover o conteúdo para `video/out/<slug>/` e **remover** a pasta `brag-output*`.

Não reescrever as regras do `/brag` (15–25s, leitura, claims fundamentados): elas valem.

## 6. Entregar

Informar:

- caminho do vídeo (`video/out/<slug>/brag.mp4`) e do poster (`brag.jpg`);
- caminho do `share-copy.txt` e do rascunho em `src/<slug>/share-copy.md`;
- uma frase sobre o ângulo criativo;
- a data da captura usada.

Se o usuário quiser ajustes de cena, volte para `video-creator` (storyboard) e só
depois reexecute.

## Regras

- Editar apenas `video/out/<slug>/`. Nunca sobrescrever outro slug.
- Nunca rodar captura contra `localhost` sem confirmar que o app está no ar.
- `artes-grafica/` e os HTMLs da raiz não são fonte deste pipeline; não os alterar.
