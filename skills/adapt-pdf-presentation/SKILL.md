---
name: adapt-pdf-presentation
description: Adaptar uma apresentação de origem em PDF a um template HTML existente. Usar quando o usuário fornecer um PDF e indicar o template desejado, precisando preservar integralmente o conteúdo original ou recriá-lo com uma nova narrativa informada pelo usuário, com aprovações antes da produção em HTML e antes da exportação em PDF.
---

# Adaptar PDF para template

Converter uma apresentação em PDF em uma nova apresentação HTML que respeite o template escolhido. Conduzir o trabalho por etapas aprováveis; nunca produzir HTML antes de aprovar o roteiro, nem exportar PDF sem pedido explícito após a aprovação do HTML.

## Entradas obrigatórias

Confirmar ou solicitar, antes de começar:

1. o caminho do PDF de origem;
2. o template a aplicar — um caminho de arquivo ou um nome que possa ser resolvido no projeto;
3. o modo de conteúdo:
   - **preservar**: manter todas as informações, dados, mensagens e referências relevantes da origem; apenas reorganizar para caber no template;
   - **recriar**: permitir seleção, condensação, reorganização e novas conexões baseadas no PDF;
4. no modo **recriar**, o estilo narrativo desejado, por exemplo: executivo, didático, consultivo, storytelling, problema-solução, cronológico ou outro especificado pelo usuário.

Não presumir o modo de conteúdo. Se o usuário escolher **preservar**, não remover ou inventar informação factual; registrar anexos ou notas para conteúdo que não caiba no fluxo principal. Se escolher **recriar**, distinguir explicitamente no roteiro o que veio do PDF e o que é uma proposta editorial. Não introduzir fatos, métricas, fontes ou citações sem base verificável.

## Convenção de saída

Derivar um identificador curto e estável (`<deck>`) do nome do PDF. Criar somente artefatos desta adaptação em:

```text
outputs/
  extracoes/<deck>.md
  roteiros/<deck>.md
  html/<deck>.html
  html/<deck>-assets/       # somente recursos locais necessários ao HTML
  pdf/<deck>.pdf            # somente se solicitado após aprovar o HTML
```

Criar os diretórios necessários, preservar o PDF e o template de origem e nunca gravar artefatos gerados em `output/`. Usar nomes sem espaços, em minúsculas e com hífens. Não apagar artefatos anteriores sem autorização; criar uma versão numerada quando houver colisão relevante.

## Fluxo obrigatório

### 1. Extrair e conferir o PDF

1. Validar que o arquivo existe e identificar quantidade de páginas e se há texto extraível.
2. Extrair texto por página, títulos aparentes, tabelas, notas, URLs e referências com uma ferramenta apropriada, preferindo uma extração local reproduzível.
3. Se o PDF for escaneado ou a extração estiver vazia/ininteligível, aplicar OCR e registrar essa condição.
4. Inspecionar visualmente as páginas quando a leitura textual não capturar gráficos, diagramas, hierarquia, tabelas ou conteúdo essencial.
5. Salvar em `outputs/extracoes/<deck>.md` com metadados do arquivo, conteúdo organizado por página e uma seção de lacunas ou limitações da extração.

Não tratar texto extraído como estrutura de apresentação: reconciliar a extração com a ordem e a aparência das páginas antes de elaborar o roteiro.

### 2. Analisar o template e criar o roteiro

1. Ler o template informado por completo e identificar formato, dimensões, paleta, tipografia, layouts, componentes, recursos e regras de uso.
2. Se o template estiver em `skills/template-designer/base-templates/`, manter sua identidade visual; para decisões de design adicionais, ler `skills/template-designer/SKILL.md`.
3. Criar `outputs/roteiros/<deck>.md` com:
   - parâmetros da adaptação: PDF, template, modo e, quando aplicável, estilo narrativo;
   - mensagem central e público inferido, deixando premissas explícitas;
   - estrutura narrativa;
   - tabela por slide: número, título, objetivo/mensagem, conteúdo de origem utilizado, visual/layout previsto e notas de fala ou transição;
   - para o modo **preservar**, mapa de cobertura ligando cada página ou tópico de origem ao slide, anexo ou nota correspondente;
   - para o modo **recriar**, seção `Propostas editoriais` que marque as mudanças de ordem, cortes, sínteses e acréscimos de estrutura.
4. Verificar que o roteiro cobre informações essenciais no modo **preservar** e que o estilo narrativo escolhido orienta o arco no modo **recriar**.

### 3. Solicitar e aguardar aprovação do roteiro

Apresentar o caminho do roteiro e um resumo conciso de sua linha narrativa. Solicitar aprovação explícita ou ajustes. Interromper o fluxo neste ponto: não criar o HTML enquanto o usuário não aprovar o roteiro.

Após ajustes, atualizar o mesmo roteiro (ou uma versão numerada, se o usuário desejar manter o histórico) e solicitar nova aprovação.

### 4. Produzir e revisar o HTML

Somente após aprovação explícita do roteiro:

1. Criar `outputs/html/<deck>.html` como documento completo e editável, usando o template escolhido como base real, não apenas sua paleta.
2. Aplicar o conteúdo aprovado sem alterar silenciosamente escopo, dados ou narrativa.
3. Manter as dimensões, os componentes e a linguagem visual do template; usar CSS Grid ou Flexbox, contraste suficiente e tamanhos legíveis em 16:9.
4. Resolver referências locais necessárias para que o HTML funcione a partir de `outputs/html/`, preferindo caminhos relativos a `<deck>-assets/` ou recursos incorporados. Não depender de arquivos temporários.
5. Renderizar uma prévia de todos os slides para inspeção visual. Ler `skills/image-creator/SKILL.md` quando usar seu fluxo de renderização.
6. Corrigir texto cortado, sobreposição, contraste insuficiente, recursos ausentes, quebra de layout e diferenças injustificadas em relação ao roteiro aprovado.

Em seguida, apresentar o caminho do HTML e solicitar aprovação. Informar que a exportação em PDF ocorrerá apenas se o usuário quiser.

### 5. Exportar o PDF sob solicitação

Depois de o usuário aprovar o HTML e solicitar o PDF:

1. Renderizar todas as páginas na proporção do template, sem cabeçalhos, rodapés ou margens do navegador.
2. Salvar em `outputs/pdf/<deck>.pdf`.
3. Conferir páginas, ordem, cortes, fontes, imagens e legibilidade do PDF final contra o HTML aprovado.
4. Entregar os caminhos dos artefatos produzidos e mencionar qualquer limitação de extração, OCR ou recurso indisponível.

## Critérios de qualidade

- Rastrear toda afirmação factual até o PDF ou uma fonte fornecida pelo usuário.
- Preservar referências e atribuições existentes no modo **preservar**.
- Priorizar uma ideia principal por slide e títulos que expressem uma conclusão ou pergunta útil.
- Usar imagens, diagramas e tabelas apenas quando tornam a mensagem mais clara do que texto corrido.
- Tratar a aprovação do roteiro e a aprovação do HTML como pontos de controle obrigatórios, não como sugestões.
