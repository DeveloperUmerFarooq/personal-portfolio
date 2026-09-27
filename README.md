# Configurable full-stack portfolio

A modern, responsive portfolio built with React and Vite. The presentation layer is shared across the stack-specific Git branches; content is controlled through small configuration files.

## Project structure

```text
src/
├── app/                            # Application composition
├── components/
│   ├── layout/                     # Header and footer
│   └── ui/                         # Reusable visual primitives
├── config/
│   ├── site.js                     # Identity, copy, services and toolkit
│   └── projects.js                 # Case studies and NDA flags
├── features/portfolio/components/  # Portfolio page sections
├── hooks/                          # Shared browser behaviour
└── styles/                         # Tokens, global rules and page styling
```

## Personalise the site

1. Edit `src/config/site.js` for your name, email, introduction, services and skills.
2. Edit `src/config/projects.js` for project summaries. Project URLs are intentionally not part of the schema.
3. Keep `confidential: true` on projects that must show the NDA badge.

All graphics are rendered from local CSS or local SVG files. The site does not request fonts, images or scripts from third-party CDNs.

## Local development

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.
