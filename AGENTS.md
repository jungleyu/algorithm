# AGENTS.md — algorithm practice repo

This repo contains ~88 algorithm practice problems (likely for Huawei/coding interview prep). Each problem is a numbered pair: `N. solution.js` + `N. {Chinese title}.md`.

## Structure

- `N. solution.js` — JavaScript solution with inline `console.log` test cases at the bottom
- `N. {Chinese title}.md` — Problem description in Chinese
- `知识点N. {Chinese & English title}.md` — Knowledge document

No package.json, no test runner, no lint/typecheck config.

## How to verify

```bash
node "N. solution.js"
```

Tests are embedded in each solution file and run directly via Node.js. No setup needed.

## Conventions

- Solutions are vanilla JavaScript (ES6+), no external dependencies.
- Each solution includes inline test cases at the bottom of the file.
- Problem descriptions are in Chinese (`.md` files).
- Code comments may also be in Chinese.
- When adding new solutions, follow the same `N. solution.js` + `N. {Chinese title}.md` naming, using the next available number.
