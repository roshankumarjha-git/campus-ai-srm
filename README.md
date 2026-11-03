<div align="center">

# Campus AI — SRM KTR

### A smarter way to surface and prioritize campus issues.

Privacy-conscious campus issue reporting and triage demo for SRM Institute of Science and Technology, Kattankulathur.

[Open the live site](https://campus-ai-srm.vercel.app) · [Features](#features) · [Run locally](#run-locally) · [Deployment](#deployment)

</div>

---

## About

Campus AI gives students a simple way to report campus facility issues and gives wardens and administrators a dashboard to review prioritized incidents, summaries, and campus hotspots. The project is deployed on Vercel and can be opened directly in a browser.

> **Project status:** Demonstration prototype. Sign-in and reporting flows are for demo use and are not connected to an institutional identity system or production incident-management backend.

## Features

- **Student portal** for submitting campus issue reports.
- **Warden and admin console** with an AI-prioritized action queue and incident summaries.
- **Interactive severity map** for report locations and campus hotspots.
- **Multi-institution demo data** for switching between configured campuses.
- **Privacy-conscious reporting** with anonymization and triage features in the prototype.
- **Photo and video analysis** through a server-side Gemini API function when configured; text-based severity scoring is used as a fallback.
- **Responsive dark interface** for desktop and mobile screens.

## Deployment

The live site is hosted on Vercel:

**[https://campus-ai-srm.vercel.app](https://campus-ai-srm.vercel.app)**

The repository is configured for Vercel deployment from its root. There is no frontend build step. Vercel serves the static site and the `api/analyze-media.js` serverless function.

## Run locally

```bash
git clone https://github.com/roshankumarjha-git/campus-ai-srm.git
cd campus-ai-srm
node dev-server.js
```

Open [http://localhost:4173](http://localhost:4173). Use the local server instead of opening `index.html` directly with `file://`; the server supports the API route and map worker. The map needs an internet connection.

For local photo and video analysis, set `GEMINI_API_KEY` in an ignored `.env.local` file. Never commit API keys or put them in browser-delivered code. On Vercel, the key is configured as a server-side environment variable for the analysis function. If analysis is unavailable, the app falls back to text-based severity scoring. Evidence uploads for AI analysis must be under 3 MB.

## Map and attribution

The interactive map uses [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/) and the [OpenFreeMap](https://openfreemap.org/) dark vector style, with data from [OpenStreetMap](https://www.openstreetmap.org/). An internet connection is required to load the map. Keep the provider and map data attribution visible.

## Built with

- HTML, CSS, and JavaScript
- [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/)
- [OpenFreeMap](https://openfreemap.org/) map style and tiles
- Vercel static hosting and serverless functions
- Gemini API for optional server-side media analysis

## License

No license has been specified. All rights remain with the copyright holder unless a license is added.
