---
name: presentation-creator
description: Planejar, estruturar, produzir e revisar apresentações para contextos corporativos, acadêmicos, educacionais, técnicos ou gerais. Usar ao criar um deck, aula, palestra, treinamento, proposta, relatório ou defesa; ao transformar conteúdo bruto em uma narrativa de slides; ou ao adaptar uma apresentação ao objetivo, público, duração e formato de entrega.
---

# Presentation Creator

Transformar uma intenção ou um conjunto de materiais em uma apresentação coerente, adequada ao público e pronta para entrega. Adaptar a narrativa ao contexto em vez de aplicar uma estrutura corporativa a todos os casos.

## Fluxo

### 1. Enquadrar a apresentação

Identificar, a partir do pedido e dos materiais disponíveis:

- objetivo: informar, ensinar, convencer, apoiar uma decisão, treinar ou inspirar;
- público: repertório, interesses, necessidades e possíveis objeções;
- resultado esperado: o que o público deve compreender, sentir, decidir ou conseguir fazer;
- contexto: corporativo, acadêmico, educacional, técnico ou outro;
- restrições: duração, quantidade de slides, idioma, formato, identidade visual e prazo;
- fontes: dados, referências, documentos, imagens e conteúdo fornecido pelo usuário.

Inferir o que for seguro a partir do contexto. Solicitar esclarecimento apenas quando uma lacuna mudar materialmente a narrativa ou o resultado.

### 2. Definir a linha narrativa

Escrever uma frase que resuma a mensagem central. Organizar o conteúdo em um arco com:

1. abertura que estabeleça relevância e expectativa;
2. desenvolvimento em blocos lógicos;
3. síntese que retome a mensagem central;
4. encerramento coerente com o objetivo, como decisão solicitada, próximos passos, exercício, recapitulação ou convite à discussão.

Eliminar tópicos que não contribuam para o resultado esperado. Tratar a quantidade de slides como consequência da narrativa e do tempo disponível, não como meta isolada.

### 3. Adaptar a estrutura ao propósito

#### Contexto corporativo

- Começar pelo problema, oportunidade ou decisão, antes de aprofundar a solução.
- Conectar a recomendação a impacto, risco, custo, prazo, dependências e benefício.
- Comparar alternativas e explicitar trade-offs.
- Sustentar afirmações com evidências e indicar riscos de agir e de não agir.
- Encerrar com uma decisão solicitada, responsáveis e próximos passos.

Para propostas técnicas, traduzir detalhes de engenharia para consequências compreensíveis ao público, preservando anexos para aprofundamento.

#### Aula ou apresentação acadêmica

- Formular objetivos de aprendizagem observáveis.
- Considerar conhecimentos prévios e introduzir conceitos em progressão.
- Alternar explicação, exemplo, aplicação e verificação de compreensão.
- Usar casos, problemas, perguntas ou exercícios relacionados à realidade dos estudantes.
- Diferenciar fato, interpretação e opinião; citar fontes e atribuir imagens.
- Encerrar com síntese, atividade ou questão para reflexão e indicar referências.

Para uma aula de Gestão de Projetos, privilegiar situações de decisão, análise de cenários, artefatos reais ou simulados e discussão dos trade-offs entre escopo, prazo, custo, qualidade, risco e valor.

#### Treinamento, palestra, relatório ou outro contexto

- Identificar a convenção do formato e o nível de participação esperado.
- Em treinamento, priorizar demonstração, prática guiada, prática autônoma e critérios de sucesso.
- Em palestra, construir uma tese memorável apoiada por histórias, exemplos e evidências.
- Em relatório, destacar achados, interpretação, implicações e recomendações.
- Quando nenhuma estrutura específica se aplicar, usar contexto, desenvolvimento, síntese e encaminhamento.

### 4. Criar o storyboard

Antes do design final, descrever cada slide com:

- título que expresse a conclusão, pergunta ou função do slide;
- mensagem principal;
- evidência, exemplo ou elemento visual que sustente a mensagem;
- observação de fala, interação ou transição quando necessária.

Dar uma função principal a cada slide. Dividir slides sobrecarregados e combinar slides redundantes. Não usar o texto do slide como roteiro completo da fala.

### 5. Produzir a apresentação

1. Ler `skills/template-designer/SKILL.md` quando for necessário selecionar ou adaptar a identidade visual.
2. Reutilizar um template compatível em `skills/template-designer/base-templates/` ou criar uma variação apropriada ao contexto.
3. Ler as skills de imagem somente quando a apresentação precisar de seus recursos:
   - `skills/image-fetcher/SKILL.md` para buscar ou capturar referências visuais;
   - `skills/image-ai-generator/SKILL.md` para gerar imagens por script;
   - `skills/image-creator/SKILL.md` para renderizar HTML/CSS.
4. Manter hierarquia visual, contraste, alinhamento, consistência e espaço em branco.
5. Preferir diagramas, tabelas, exemplos e imagens quando tornarem a ideia mais clara do que texto corrido.
6. Exportar a versão final em PDF e preservar o HTML necessário para manutenção.

Não presumir a identidade corporativa da Digix fora de um pedido que a exija. Adaptar cores, tipografia, linguagem e exemplos ao contexto informado.

### 6. Revisar

Verificar antes da entrega:

- a sequência responde ao objetivo e faz sentido sem explicações ausentes;
- cada slide tem uma mensagem identificável;
- títulos, dados, exemplos e visuais apoiam a narrativa;
- linguagem e profundidade correspondem ao repertório do público;
- fatos, números e citações são verificáveis e têm fonte;
- não há conteúdo inventado apresentado como fato;
- texto, contraste e tamanho dos elementos permanecem legíveis na projeção;
- a apresentação cabe no tempo disponível;
- o encerramento deixa claro o resultado esperado.

### 7. Organizar a saída

- Salvar o PDF em `output/` com nome curto, descritivo e data de geração, no formato `nome-da-apresentacao-AAAA-MM-DD.pdf`.
- Manter em `output/` somente os arquivos `.pdf` e `.html` que façam parte da entrega.
- Remover arquivos e diretórios intermediários criados exclusivamente para a geração, sem apagar materiais fornecidos pelo usuário.

## Princípios de conteúdo

- Projetar para o público e para o propósito, não para um gênero fixo de apresentação.
- Usar uma ideia principal por slide.
- Transformar títulos genéricos em afirmações ou perguntas informativas.
- Preferir clareza e progressão a volume de conteúdo.
- Mostrar relações e consequências, não apenas listar tópicos.
- Explicitar incertezas, premissas e limitações.
- Preservar detalhes complementares em anexos quando isso melhorar o fluxo principal.
- Usar notas do apresentador para orientações de fala que não precisam aparecer no slide.
