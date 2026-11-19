// Every number Ecobex uses to estimate CO₂ and water lives in this file, and nowhere else.
// Each factor has a range (low to high), a central value, a source link and how well we
// could check that source. All of them are ESTIMATES, so anything shown to a user is labelled
// "≈". The "How we calculate" page explains each one.
//
// Sources were read on 19 Nov 2026. "read: direct" means we read the page or paper itself.
// "read: secondary" means we only saw it quoted by another page. Where a figure is missing,
// the factor says "not estimated yet" and we show nothing instead of inventing a number.

// ---------------------------------------------------------------------------
// Electricity: how much CO₂ one kilowatt-hour causes
// ---------------------------------------------------------------------------
export const GRID = {
  // World average for 2024. Down from 484 in 2023.
  world: {
    gCO2PerKWh: 473,
    year: 2024,
    source: {
      name: "Ember, Global Electricity Review 2025",
      // https://ember-energy.org/latest-insights/global-electricity-review-2025/global-electricity-trends/
      url: "https://ember-energy.org/latest-insights/global-electricity-review-2025/global-electricity-trends/",
      read: "direct",
    },
    note: "Ember's data now has 2025 figures for many countries, but we have not read a 2025 world average yet.",
  },
  // One example of how much a country can differ. Other countries are not added yet.
  countries: {
    India: {
      gCO2PerKWh: 708,
      year: 2024,
      source: {
        name: "Ember, Global Electricity Review 2025",
        url: "https://ember-energy.org/latest-insights/global-electricity-review-2025/global-electricity-trends/",
        read: "direct",
      },
      note: "The page gives the figure in its 2024 section but the sentence itself names no year.",
    },
    // Pakistan, US, UK, Germany: not found on the pages we read. Add from Ember's
    // "Yearly Electricity Data" (https://ember-energy.org/data/yearly-electricity-data) later.
  },
};

// ---------------------------------------------------------------------------
// AI chatbot text prompt (one typical question and answer)
// CO₂ is NOT stored here: footprint.js multiplies energy by the grid figure above.
// ---------------------------------------------------------------------------
export const AI_PROMPT = {
  unit: "per prompt",
  energyWh: {
    low: 0.24, // Google, median Gemini Apps text prompt, May 2025 data
    central: 0.3, // Epoch AI estimate for a typical ChatGPT query
    high: 0.34, // OpenAI CEO's stated average query
    sources: [
      {
        name: "Google Cloud, measuring the environmental impact of AI inference (22 Aug 2025)",
        // https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference
        url: "https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference",
        read: "direct",
        note: "0.24 Wh. Google's own figure; it says it has not been independently verified.",
      },
      {
        name: "Epoch AI, How much energy does ChatGPT use? (7 Feb 2025)",
        // https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use
        url: "https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use",
        read: "direct",
        note: "About 0.3 Wh for GPT-4o. Epoch calls this relatively pessimistic and says other assumptions give 0.1 to 4 Wh.",
      },
      {
        name: "Sam Altman, The Gentle Singularity",
        // https://blog.samaltman.com/the-gentle-singularity
        url: "https://blog.samaltman.com/the-gentle-singularity",
        read: "direct",
        note: "0.34 Wh. An informal essay with no method or sources.",
      },
    ],
  },
  waterMl: {
    low: 0.26, // Google, same prompt as above
    central: 0.29, // midpoint of low and high, not a published figure
    high: 0.32, // OpenAI CEO's 0.000085 gallons, converted (1 US gallon = 3785 mL)
    sources: [
      {
        name: "Google Cloud (as above)",
        url: "https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference",
        read: "direct",
        note: "0.26 mL, about five drops. Data-centre water only.",
      },
      {
        name: "Sam Altman, The Gentle Singularity",
        url: "https://blog.samaltman.com/the-gentle-singularity",
        read: "direct",
        note: "0.000085 gallons. No method given.",
      },
    ],
  },
  confidence: "Medium",
  leftOut:
    "Long prompts, reasoning models, image and video generation use more. Epoch gives 2.5 to 40 Wh for very long inputs. These are not included.",
};

// ---------------------------------------------------------------------------
// Video streaming (one hour watching on demand)
// Only CO₂ is given by the sources; energy and water per hour are not estimated yet.
// ---------------------------------------------------------------------------
export const STREAMING = {
  unit: "per hour",
  gCO2: {
    low: 36, // IEA central estimate for 2019, worldwide
    central: 45.5, // midpoint of the two sourced figures, not a published figure
    high: 55, // Carbon Trust 2021, European viewer
    sources: [
      {
        name: "IEA (George Kamiya), The carbon footprint of streaming video: fact-checking the headlines",
        // https://www.iea.org/commentaries/the-carbon-footprint-of-streaming-video-fact-checking-the-headlines
        url: "https://www.iea.org/commentaries/the-carbon-footprint-of-streaming-video-fact-checking-the-headlines",
        read: "secondary",
        note: "36 g for 2019, as reported by Carbon Brief (https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix/). We did not read the IEA page itself.",
      },
      {
        name: "Carbon Trust, Carbon impact of video streaming (June 2021)",
        // https://www.carbontrust.com/sites/default/files/documents/resource/public/Carbon-impact-of-video-streaming.pdf
        url: "https://www.carbontrust.com/sites/default/files/documents/resource/public/Carbon-impact-of-video-streaming.pdf",
        read: "secondary",
        note: "About 55 g for a European viewer, from several news reports. Funded by Netflix. We could not extract text from the PDF.",
      },
    ],
  },
  // Held back until the source is read: Fraunhofer FAME Greenstreaming whitepaper (Oct 2024)
  // reportedly gives about 92 g per hour. We only saw this in a search summary.
  // https://www.fokus.fraunhofer.de/content/dam/fokus/dokumente/fame/studien-paper/FAME_Greenstreaming_Whitepaper_2024-10_en.pdf
  heldBackGCO2: 92,
  energyWh: null, // not estimated yet
  waterMl: null, // not estimated yet
  confidence: "Medium",
  note: "The viewing device is the largest share. Switching between HD and SD changes little.",
};

// ---------------------------------------------------------------------------
// Video calls
// Not estimated yet. The only per-hour figure we found (150 to 1,000 g CO₂ and 2 to 12 L water
// for videoconferencing or streaming, from a 2021 Purdue, Yale and MIT study) came from a press
// release, mixes streaming with calls, is three to ten times the streaming figures above, and
// has a published critique of its method. We will not show a number until we find a better source.
// ---------------------------------------------------------------------------
export const VIDEO_CALL = {
  unit: "per hour",
  gCO2: null,
  energyWh: null,
  waterMl: null,
  status: "not estimated yet",
  confidence: "None",
  rejected: {
    claim: "150 to 1,000 g CO2 and 2 to 12 litres of water per hour",
    // https://www.sciencedaily.com/releases/2021/01/210114134033.htm
    url: "https://www.sciencedaily.com/releases/2021/01/210114134033.htm",
    why: "Secondary press release. Streaming and calls combined. Basis for the 96% camera-off claim not stated. Method criticised.",
  },
};

// ---------------------------------------------------------------------------
// Context: background numbers for the "How we calculate" page. Not used in the maths.
// ---------------------------------------------------------------------------
export const CONTEXT = {
  dataCentreElectricity: {
    twh2024: 415, // about 1.5% of world electricity
    twh2030Projected: 945,
    source: {
      name: "IEA, Energy and AI (April 2025), executive summary",
      // https://www.iea.org/reports/energy-and-ai/executive-summary
      url: "https://www.iea.org/reports/energy-and-ai/executive-summary",
      read: "direct",
    },
  },
  googleWaterPerKWh: {
    litresPerKWh: 1.15, // Google's fleet-wide figure, the same for 2023 and 2024
    source: {
      name: "Google, Elsworth et al., AI inference environmental paper (arXiv 2508.15734, Aug 2025)",
      // https://arxiv.org/abs/2508.15734
      url: "https://arxiv.org/abs/2508.15734",
      read: "direct",
    },
    note: "One company's own fleet, so it is context only. The Berkeley Lab figure of 0.45 to 0.48 L/kWh is not used because we could not read the report.",
  },
};
