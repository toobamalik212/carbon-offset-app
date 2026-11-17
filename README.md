# Ecobex

Ecobex is a project to help people understand and reduce the environmental
impact of their digital habits. People enter habits such as streaming, video
calls and AI prompts, see an estimate of the CO₂ and water they cause, and find
ways to offset that impact. It runs entirely in the browser, with no backend.

The project is under development. The current website in `dashboard/` is an
early landing page; it does not yet calculate a footprint. The calculator,
results, demo sign-in, onboarding and dashboard are planned work, not
currently available features.

## Project structure

- `dashboard/` — the Ecobex website, built with Vite, React, and Tailwind CSS.
- `PLAN.md` — the step-by-step product and development plan.
- `CLAUDE.md` — project structure and rules for working on it.

## Run the dashboard locally

```bash
cd dashboard
npm install
npm run dev
```

Vite prints the local URL after the development server starts.
