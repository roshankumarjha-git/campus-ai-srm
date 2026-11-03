<div align="center">

# Campus AI — SRM KTR

### A smarter way to surface and prioritize campus issues.

A privacy-first campus issue reporting and triage demo for SRM Institute of Science and Technology, Kattankulathur. Students can report facility issues, while wardens and administrators review prioritized incidents and campus hotspots.

[Live Demo](#deployment) · [Features](#features) · [Run Locally](#run-locally) · [Deployment](#deployment)

</div>

---

## About

Campus AI brings student reports and facilities response into one simple interface. Reports are grouped into incidents, ranked by severity, and shown in a warden dashboard with a map for geographic context. The project is delivered as a standalone static webpage, so it can be previewed locally or hosted on a static site platform.

> **Project status:** Demonstration prototype. Sign-in and reporting flows are intended for demo use and are not connected to an institutional identity system or production incident-management backend.

## Features

- **Student portal** for submitting campus issue reports.
- **Warden and admin console** with an AI-prioritized action queue and incident summaries.
- **Severity map** showing report locations and campus hotspots.
- **Multi-institution demo data** for switching between configured campuses.
- **Privacy-conscious report handling** with anonymization and triage features in the prototype.
- **Responsive, dark interface** designed for desktop and mobile screens.

## Preview

Open `index.html` in a modern browser. The map requires an internet connection. MapLibre is loaded from a CDN and uses OpenFreeMap’s dark vector style; no map API key is required.

## Run Locally

Run the included local server for the map and AI API:

```bash
git clone https://github.com/roshankumarjha-git/campus-ai-srm.git
cd campus-ai-srm
node dev-server.js
```

Then open `http://localhost:4173`. The local server reads `GEMINI_API_KEY` from `.env.local` when that ignored file exists. Opening `index.html` directly with `file://` cannot serve the API route or map worker correctly.

## Deployment

This is a static site: the repository root contains `index.html` and there is no build step.

### Vercel

1. Import this repository in Vercel.
2. Select **Other** as the framework preset.
3. Leave the build command and output directory at their defaults or blank.
4. Deploy.

### Render

1. Create a **Static Site** and connect this repository.
2. Leave the build command empty.
3. Set the publish directory to `.`.
4. Deploy.

The included `vercel.json` supplies minimal Vercel configuration.

## AI Media Analysis

Photo and video analysis uses the Gemini API through the Vercel serverless function in `api/analyze-media.js`. The key stays on the server and is never sent to the browser.

To enable it on Vercel, open the project **Settings → Environment Variables**, add `GEMINI_API_KEY`, and redeploy. Create a fresh key in Google AI Studio; do not reuse a key that was previously committed. For local development, put it in the ignored `.env.local` file; `node dev-server.js` loads it automatically. If the key is missing or the API is unavailable, the app falls back to text-based severity scoring. Evidence uploads for AI analysis must be under 3 MB.

Do not put a Gemini or other private API key in `index.html` or any browser-delivered file: visitors can inspect client-side code. Restrict the key to the Gemini API and monitor its usage, since the demo endpoint is publicly reachable when deployed.

## Map Attribution

The map uses [OpenFreeMap](https://openfreemap.org/) with [OpenStreetMap](https://www.openstreetmap.org/) data. MapLibre displays the provider attribution automatically; keep it visible.

## Built With

- HTML, CSS, and JavaScript
- [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/) for interactive maps
- [OpenFreeMap](https://openfreemap.org/) vector map style and tiles, based on OpenStreetMap

## Contributing

Suggestions and improvements are welcome. For substantial changes, open an issue first to discuss the proposal, then submit a pull request with a clear description of the change.

## License

No license has been specified yet. All rights remain with the copyright holder unless a license is added. If you want others to reuse or modify this project, add a license file.
