---
name: video-creator
description: Enquadrar, planejar e revisar vídeos de divulgação do Imóvel Central (lançamento, teaser, anúncio) de 15–25 segundos, a partir de uma URL do produto ou de um app local. Usar ao pedir um vídeo de lançamento, teaser, reel ou anúncio em vídeo; define objetivo, público, formato, tom e storyboard antes de qualquer render, e só então aciona a skill brag-video.
---

# Video Creator

Transformar uma intenção de divulgação em um contrato criativo — `brief.md` e
`storyboard.md` — para um vídeo curto (15–25s) gerado a partir do site do produto.

Esta skill **não renderiza**. Ela enquadra e planeja; a execução fica com
[`brag-video`](../brag-video/SKILL.md).

## Quando usar

- "Quero um vídeo de lançamento do imovelcentral.com.br"
- "Faz um teaser de 15s no formato vertical para o Instagram"
- "Preciso de um anúncio em vídeo para investidores"

Se o pedido já for "executar o vídeo do slug X", vá direto para `brag-video`.

## Fluxo

### 1. Enquadrar

Identificar, a partir do pedido:

- **objetivo**: lançamento, divulgação, pitch, anúncio, apresentação de funcionalidade;
- **público**: corretores/parceiros, investidores, usuários finais, redes sociais;
- **formato**: `landscape` (1920×1080), `vertical` (1080×1920) ou `square` (1080×1080);
- **duração**: 15–25s; padrão ~20s;
- **tom**: **sem padrão fixo**. Se o usuário informar (`polished`, `default`, `cinematic`,
  `app-store`, `deadpan`, `yc-parody`, `chaotic` ou uma direção livre), respeite. Se não
  informar, **não escolha agora** — o `/brag` infere, e você registra no brief que o tom
  será inferido.

Perguntar apenas o que mudar materialmente o resultado.

### 2. Perguntar a fonte (obrigatório, todo vídeo novo)

**Sempre perguntar**, mesmo que já tenha havido vídeo anterior:

1. **URL base** — produção (`https://imovelcentral.com.br`) ou local
   (`http://localhost:3000`). Confirme que está no ar com uma requisição leve.
2. **Rotas** — quais páginas devem aparecer. Não assuma conjunto padrão. Exemplos para
   orientar: `/` (home), `/buscar`, `/anunciar`.

Se a URL não responder, informe e peça a URL correta ou instrua a subir o app local.
Nunca prossiga com uma fonte inacessível.

Registre cada rota com um nome de pasta ASCII (`home` para `/`, `buscar` para `/buscar`).

### 3. Definir a linha narrativa

Escrever uma frase com a mensagem central. Estrutura de partida (adaptável):

```
Hook (2–3s) → Revelação (2–4s) → 2–3 destaques (5–12s) → Fecho (2–4s)
```

Regras que vêm do `/brag` e não devem ser contrariadas:

- **Mostrar o produto.** Pelo menos uma cena com UI, copy ou visual real da captura.
- **Tudo legível.** Texto que o espectador precisa ler fica parado o tempo de leitura
  (rótulo curto ~0,8s; frase ~0,3s por palavra).
- **Sem linguagem genérica de SaaS.** Use as frases reais do site.
- **Afirmações fundamentadas.** Nomes, números, recursos e citações precisam existir no
  produto. Piadas, enquadramento e transições são livres.

### 4. Escrever os artefatos

Criar `video/src/<slug>/` (slug `YYYY-MM-tema`, ex. `2026-11-lancamento`).

**`brief.md`**

```markdown
# Brief — [Nome do vídeo]

## Objetivo / público
[o que o vídeo deve provocar em quem]

## Fonte
- base_url: [URL]
- rotas:
  - home: /
  - buscar: /buscar

## Formato e duração
- formato: landscape | vertical | square
- duração: [15–25]s

## Tom
- pedido: [preset/direção livre | "não informado — inferir no /brag"]

## Mensagem central
[uma frase]

## Share copy (rascunho)
[1–3 frases]
```

**`storyboard.md`** — uma seção por cena:

```markdown
### Cena 1 — [nome] — [duração]s
- rota: buscar
- o que deve ser visto: [elemento real da página]
- texto na tela: [linhas exatas, se houver]
- leitura mínima: [s]
- transição: [corte seco / crossfade / ...]
```

Somar as durações e confirmar que ficam entre 15 e 25s.

### 5. Aprovar

Apresentar `brief.md` e o storyboard e esperar aprovação explícita. Só então acionar
`brag-video` com o slug. Se o usuário pedir ajustes, edite os arquivos e reapresente.

## Regras

- Editar apenas `video/src/<slug>/`. Não tocar em `video/out/` nem executar captura.
- Nunca reutilizar slug existente para conteúdo novo.
- Nunca prometer afirmações que não existam no produto capturado.
