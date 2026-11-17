# Ecobex: step-by-step build guide

**Ecobex** is a Chrome extension that tracks your browsing, estimates the CO₂ and water it causes, and helps you offset it.

Goal for v0: the extension tracks you and shows CO₂ and water in a popup. The dashboard website has sign up, sign in, onboarding and a dashboard screen. **Frontend only: no backend, no database, no server.** No payments yet. The "Offset your impact" button links to a verified offset provider.

**How to use this guide:** do one step per Claude Code session. Start each session with:

> *Read CLAUDE.md and PLAN.md. Do Step N. Explain what you changed in plain words.*

Then test it yourself, commit, and tick the box.

---

## Target structure

```
carbon-offset-app/
├── extension/        the Ecobex Chrome extension (WXT + React + Tailwind)
│   ├── entrypoints/
│   │   ├── background.js    adds up data per site per day
│   │   ├── content.js       measures the bytes each page loads
│   │   ├── ai.content.js    counts prompts on ChatGPT, Gemini and Claude
│   │   └── popup/           the window that opens when you click the icon
│   └── lib/
│       ├── footprint.js     CO₂ and water maths (uses CO2.js)
│       └── factors.js       every figure we use, with its source
├── dashboard/        the Ecobex website (your current app, deployed on Vercel)
├── CLAUDE.md         rules Claude Code follows in every session
└── PLAN.md           this guide
```

---

## Before you start (one time, 10 minutes)

- [x] Commit what you have now so you have a safe starting point:
  ```bash
  git add -A && git commit -m "Rename app to Ecobex"
  ```
- [ ] Make sure Node is installed: `node -v` should print 20 or higher.
- [ ] Use Chrome (not Arc or Brave) for testing, so what you see matches what users see.

---

## Phase A: Ecobex working on your machine (about 2 weeks part-time)

### Step 1. Organise the repo
**What happens:** your current app moves into `dashboard/`, and Claude writes `CLAUDE.md` (architecture, privacy rules, allowed permissions, "plain JavaScript, no TypeScript").

- [x] Prompt: *"Do Step 1 of PLAN.md."*
- [x] Check it: `cd dashboard && npm install && npm run dev` → the site opens with the Ecobex header
- [x] Commit: `git add -A && git commit -m "Step 1: repo structure + CLAUDE.md"`

### Step 2. Create the extension
**What happens:** Claude creates `extension/` with WXT, React and Tailwind. The popup says "Hello from Ecobex".

- [ ] Prompt: *"Do Step 2 of PLAN.md."*
- [ ] Run it: `cd extension && npm install && npm run dev`
- [ ] Load it in Chrome: open `chrome://extensions` → switch on **Developer mode** (top right) → **Load unpacked** → choose `extension/.output/chrome-mv3-dev`
- [ ] Pin it: puzzle-piece icon in the toolbar → pin Ecobex

✅ **Done when:** clicking the Ecobex icon shows your popup.

### Step 3. Track data transferred
**What happens:** on every page, a script measures the bytes downloaded and sends a total to the background worker. Totals are saved in your browser only, grouped by site and day.

- [ ] Prompt: *"Do Step 3 of PLAN.md."*
- [ ] Test: open YouTube, play a video for a minute, open the popup

✅ **Done when:** the popup shows "Today: X MB" and the number grows while the video plays, plus your top 5 sites.

### Step 4. Track active time
**What happens:** only the tab you are looking at counts. Time stops when you're idle or Chrome is in the background.

- [ ] Prompt: *"Do Step 4 of PLAN.md."*
- [ ] Test: stay on one site for 2 minutes, then walk away for 5

✅ **Done when:** the popup shows about 2 minutes for that site, not 7.

### Step 5. Count AI prompts
**What happens:** on chatgpt.com, gemini.google.com and claude.ai, Ecobex counts each prompt you send. It never reads what you typed.

- [ ] Prompt: *"Do Step 5 of PLAN.md."*
- [ ] Test: send 3 prompts in ChatGPT

✅ **Done when:** the popup shows "AI prompts today: 3".

### Step 6. CO₂ and water maths
**What happens:** CO2.js turns bytes into grams of CO₂. Water = energy used × litres per kWh. Every figure lives in `lib/factors.js` with a link to its source. Tests check the maths.

- [ ] Prompt: *"Do Step 6 of PLAN.md. Show me the figures you chose and their sources before writing code."*
- [ ] Review the figures yourself (you'll quote them on the "How we calculate" page)
- [ ] Run the tests: `npm test`

✅ **Done when:** the tests pass and the popup shows g CO₂ and litres of water.

### Step 7. Design the popup
**What happens:** your design goes in. Claude can work from a Figma link or screenshots.

- [ ] Today's footprint, weekly trend, comparisons like "≈ 3 phone charges", top sites
- [ ] A "How we calculate" page inside the extension
- [ ] An **"Offset your impact"** button that opens a verified provider's page (no payments in our code)
- [ ] Prompt: *"Do Step 7 of PLAN.md using this design: [Figma link or screenshots]."*

✅ **Done when:** it looks like your design, with real numbers.

### Step 8. Share the demo with your LM
- [ ] Record a 1–2 minute Loom: browse, open the popup, show the numbers changing
- [ ] Build a zip: `cd extension && npm run zip` → the file appears in `extension/.output/`
- [ ] Send the zip on Slack with these steps: unzip → `chrome://extensions` → Developer mode → Load unpacked → pick the folder

---

## Phase B: the dashboard website, frontend only (no backend)

Everything here runs in the browser. "Sign up" and "sign in" are **screens and flows only**: the account is a pretend one saved in the browser (`localStorage`) and the numbers on the dashboard are sample data. It is not real security, and that's fine for a v0 demo.

### Step 9. Put the dashboard on Vercel
- [ ] Push the repo to GitHub
- [ ] In Vercel: **Add New Project** → choose the repo → set **Root Directory** to `dashboard` → Deploy
- [ ] Optional: connect your own domain

✅ **Done when:** you have a link you can share.

### Step 10. Sign up and sign in screens
**What happens:** a sign-up form and a sign-in form with validation and error messages. The account is saved in the browser only. No server.

- [ ] Prompt: *"Do Step 10 of PLAN.md."*
- [ ] Test: sign up, refresh the page (still signed in), sign out, sign back in, try a wrong password

✅ **Done when:** you can go through sign up → sign out → sign in without errors.

### Step 11. Onboarding
**What happens:** a short first-time flow after sign-up (e.g. welcome, what Ecobex tracks, your goals, install the extension). Choices are saved in the browser.

- [ ] Prompt: *"Do Step 11 of PLAN.md using this design: [Figma link or screenshots]."*
- [ ] Test: a new account sees onboarding once; a returning account goes straight to the dashboard

✅ **Done when:** a new user lands on the dashboard after finishing onboarding.

### Step 12. Dashboard display
**What happens:** the dashboard screen with today's footprint, weekly trend, comparisons and top categories, using sample data. Every number is labelled as an estimate.

- [ ] Prompt: *"Do Step 12 of PLAN.md using this design: [Figma link or screenshots]."*

✅ **Done when:** it looks like your design, works on phone and desktop widths, and the "Offset your impact" button opens the external provider.

---

## Later (not in v0)
- Backend: real accounts, a database, syncing the extension's daily totals to the dashboard (daily totals by category only, never domains or URLs)
- Publish the extension on the Chrome Web Store (privacy policy page, listing, US$5 developer fee, unlisted)
- Payments (Stripe), then buying and retiring credits in bulk each month (Gold Standard, Verra or Puro.earth; prefer removals)
- Enterprise rollout: IT force-installs through Chrome policy, companies see team totals only
- Desktop companion app

---

## If something goes wrong
- **Extension not updating?** Click the reload ↻ icon on its card in `chrome://extensions`, then refresh the web page.
- **Errors?** On `chrome://extensions`, click **Errors** or **service worker** on the Ecobex card. Copy the message into Claude Code.
- **A step broke everything?** `git restore .` takes you back to your last commit.
