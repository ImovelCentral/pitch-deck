# Skill Catalog

Browse the skills bundled with this project.

## Available Skills

| Skill | Type | Description | Env Vars | Availability |
|-------|------|-------------|----------|--------------|
| [presentation-creator](./presentation-creator/) | prompt | Planeja, estrutura, produz e revisa apresentações para diferentes públicos e propósitos. | _(none)_ | Bundled |
| [adapt-pdf-presentation](./adapt-pdf-presentation/) | prompt | Adapta uma apresentação em PDF a um template HTML com roteiro e aprovações. | _(none)_ | Bundled |
| [apify](./apify/) | mcp | Web scraping and automation platform. Extract data from any website using pre-built Actors. | `APIFY_TOKEN` | Bundled |
| [canva](./canva/) | mcp | Create, search, autofill, and export designs from Canva. | _(none -- OAuth)_ | Bundled |
| [image-fetcher](./image-fetcher/) | hybrid | Acquire visual assets via web search, live screenshots (Playwright), and user-provided files. | _(none)_ | Bundled |
| [image-creator](./image-creator/) | mcp | Render HTML/CSS into production-ready PNG images via Playwright. | _(none)_ | Bundled |
| [image-ai-generator](./image-ai-generator/) | script | Generate AI images via Openrouter API. Test mode (cheap) and production mode (high-quality). Supports reference images for brand consistency. | `OPENROUTER_API_KEY` | Bundled |

## Skill Types

- **mcp** -- Connects to an external MCP server (stdio or HTTP transport)
- **script** -- Runs a local script (Node.js, Python, etc.)
- **hybrid** -- Combines MCP server access with local script capabilities

## Directory Structure

Each skill lives in its own folder with a `SKILL.md` file:

```
skills/
  presentation-creator/
    SKILL.md
    agents/
      openai.yaml
  apify/
    SKILL.md
  canva/
    SKILL.md
  image-fetcher/
    SKILL.md
  image-creator/
    SKILL.md
  image-ai-generator/
    SKILL.md
    scripts/
      generate.py
```

The `SKILL.md` file contains YAML frontmatter with at least `name` and `description`, followed by a Markdown body with usage instructions and available operations. Skills may also include `agents/openai.yaml` with interface metadata.

## Adding a New Skill

1. Create a new folder under `skills/` with the skill ID as the name
2. Add a `SKILL.md` file with valid YAML frontmatter and Markdown body
3. If the skill includes scripts, place them in a `scripts/` subfolder
4. Update this README to include the new skill in the catalog table
