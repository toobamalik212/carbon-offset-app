# Ecobex

Ecobex is a project to help people understand and reduce the environmental
impact of their digital habits. The planned Chrome extension will estimate the
CO₂ emissions and water use associated with browsing, then help people find
ways to offset that impact.

The project is under development. The current website in `dashboard/` is an
early landing page; it does not yet collect browsing data, calculate a
footprint, or sync user data. The extension, dashboard data, sign-in, and
offset-purchasing features are planned work, not currently available features.

## Project structure

- `dashboard/` — the Ecobex website, built with Vite, React, and Tailwind CSS.
- `PLAN.md` — the step-by-step product and development plan.
- `CLAUDE.md` — project architecture and privacy requirements.

## Run the dashboard locally

```bash
cd dashboard
npm install
npm run dev
```

Vite prints the local URL after the development server starts.
