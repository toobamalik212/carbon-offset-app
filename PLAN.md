# Ecobex: step-by-step build guide

**Ecobex** is a website where you enter your digital habits, see an estimate of the CO₂ and water they cause, and find ways to offset it.

Goal for v0: a calculator, results, sign up, sign in, onboarding and a dashboard, all running in the browser. **Frontend only: no backend, no database, no server.** No payments. The "Offset your impact" button links to a verified offset provider.

**How to use this guide:** do one step per session. Start each session with:

> *Read CLAUDE.md and PLAN.md. Do Step N. Explain what you changed in plain words.*

Then check it yourself, commit, and tick the box.

**Run the site locally:**
```bash
cd dashboard
npm run dev
```
Open the `localhost` link it prints. Press `Ctrl+C` to stop.

---

## Target structure

```
carbon-offset-app/
├── dashboard/                the Ecobex website
│   └── src/
│       ├── components/       reusable pieces (Header, inputs, cards)
│       ├── pages/            one file per page
│       ├── data/factors.js   every figure we use, with its source
│       └── lib/footprint.js  CO₂ and water maths
├── CLAUDE.md                 rules Claude follows in every session
└── PLAN.md                   this guide
```

---

## Done so far

- [x] React + Vite + Tailwind set up
- [x] App renamed to Ecobex
- [x] Step 0. Organise the repo: website moved to `dashboard/`, `CLAUDE.md` written
- [x] Step 1. Housekeeping: plan rewritten for frontend only, tool folders ignored, pushed to GitHub

---

## Phase A: the core calculator

### Step 2. Pages and navigation
**What happens:** the site gets separate pages (Home, Calculator, Results, How we calculate) with links in the header. Uses React Router (new library, ask first).

- [ ] Prompt: *"Do Step 2 of PLAN.md."*
- [ ] Check: click each header link; the address bar and the page change, and the back button works

✅ **Done when:** you can move between all four pages.

### Step 3. The figures file
**What happens:** `data/factors.js` holds every figure (energy per hour of video, per video call, per AI prompt, grid intensity, water per kWh), each with a link to its source.

- [ ] Prompt: *"Do Step 3 of PLAN.md. Show me the figures you chose and their sources before writing code."*
- [ ] Review the figures yourself (you'll quote them on the "How we calculate" page)

✅ **Done when:** every figure has a source you're happy with.

### Step 4. The calculator
**What happens:** inputs for video streaming, video calls, music, social media, AI prompts, emails and cloud storage. Built from one reusable input component.

- [ ] Prompt: *"Do Step 4 of PLAN.md."*
- [ ] Check: change each input and see the values update

✅ **Done when:** all habits can be entered.

### Step 5. Results
**What happens:** daily, monthly and yearly CO₂ and water, a breakdown by habit, and comparisons like "≈ 3 phone charges". Tests check the maths.

- [ ] Prompt: *"Do Step 5 of PLAN.md."*
- [ ] Run the tests: `npm test`

✅ **Done when:** the numbers update as you change your answers, and the tests pass.

### Step 6. Remember answers
**What happens:** your answers are saved in the browser, so they're still there after a refresh.

- [ ] Prompt: *"Do Step 6 of PLAN.md."*
- [ ] Check: fill in the calculator, refresh the page, see your answers

✅ **Done when:** answers survive a refresh.

---

## Phase B: the app experience (demo, saved in the browser)

"Sign up" and "sign in" are **screens and flows only**: the account is a pretend one saved in the browser (`localStorage`). It is not real security, and that's fine for a v0 demo.

### Step 7. Sign up and sign in
- [ ] Prompt: *"Do Step 7 of PLAN.md."*
- [ ] Check: sign up, refresh (still signed in), sign out, sign back in, try a wrong password

✅ **Done when:** sign up → sign out → sign in works, with clear error messages.

### Step 8. Onboarding
**What happens:** a short first-time flow after sign up: welcome, your goals, then the habits quiz.

- [ ] Prompt: *"Do Step 8 of PLAN.md using this design: [Figma link or screenshots]."*
- [ ] Check: a new account sees onboarding once; a returning account goes straight to the dashboard

✅ **Done when:** a new user lands on the dashboard after finishing onboarding.

### Step 9. Dashboard
**What happens:** your footprint, a breakdown by category and a weekly trend chart (Recharts, new library, ask first) with sample history. Every number is labelled as an estimate.

- [ ] Prompt: *"Do Step 9 of PLAN.md using this design: [Figma link or screenshots]."*

✅ **Done when:** it shows your own numbers and the chart.

### Step 10. Offset your impact
**What happens:** a section explaining offsetting, with a button that opens a verified provider's site. No payments in our code.

- [ ] Prompt: *"Do Step 10 of PLAN.md."*

✅ **Done when:** the button opens the provider in a new tab.

---

## Phase C: polish and share

### Step 11. Design system
**What happens:** your colours, fonts and spacing become tokens in `index.css`, from a design system you choose or your own.

- [ ] Prompt: *"Do Step 11 of PLAN.md using this design system: [link]."*

### Step 12. Phone, dark mode and accessibility
- [ ] Prompt: *"Do Step 12 of PLAN.md."*
- [ ] Check: phone and desktop widths, dark mode, keyboard-only use

### Step 13. Go live on Vercel
- [ ] In Vercel: **Add New Project** → choose the repo → set **Root Directory** to `dashboard` → Deploy
- [ ] Optional: connect your own domain

✅ **Done when:** you have a link you can share.

---

## Later (not in v0)
- A backend: real accounts and saved history across devices
- The Chrome extension that measures browsing automatically
- Payments, then buying and retiring credits (Gold Standard, Verra or Puro.earth; prefer removals)

---

## If something goes wrong
- **Page not updating?** Check the terminal running `npm run dev` for errors, then refresh.
- **"Could not read package.json"?** You're in the wrong folder. Run `cd dashboard` first.
- **A step broke everything?** `git restore .` takes you back to your last commit.
