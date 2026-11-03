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

Open `index.html` in a modern browser. The map requires an internet connection to load its tiles. Leaflet is loaded from a CDN, and map tiles are provided by OpenStreetMap.

## Run Locally

The page can be opened directly, but photo AI needs the serverless API route. To try the complete app locally, install Node.js, then run:

```bash
git clone https://github.com/roshankumarjha-git/campus-ai-srm.git
cd campus-ai-srm
cp .env.example .env.local
# Add your key to .env.local (never commit this file)
npx vercel dev
```

Set `GEMINI_API_KEY` in `.env.local`, then open the local URL printed by Vercel CLI. Opening `index.html` directly with `file://` supports the UI but cannot reach the AI API route.

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

To enable it on Vercel, open the project **Settings → Environment Variables**, add `GEMINI_API_KEY`, and redeploy. Create a fresh key in Google AI Studio; do not reuse a key that was previously committed. For local development, put it in the ignored `.env.local` file. If the key is missing or the API is unavailable, the app falls back to text-based severity scoring. Evidence uploads for AI analysis must be under 3 MB.

Do not put a Gemini or other private API key in `index.html` or any browser-delivered file: visitors can inspect client-side code. Restrict the key to the Gemini API and monitor its usage, since the demo endpoint is publicly reachable when deployed.

## Map Attribution

Map tiles are provided by [OpenStreetMap](https://www.openstreetmap.org/). Keep the visible attribution in the map. Use the tile service in accordance with the [OpenStreetMap tile usage policy](https://operations.osmfoundation.org/policies/tiles/).

## Built With

- HTML, CSS, and JavaScript
- [Leaflet](https://leafletjs.com/) for interactive maps
- [OpenStreetMap](https://www.openstreetmap.org/) map tiles

## Contributing

Suggestions and improvements are welcome. For substantial changes, open an issue first to discuss the proposal, then submit a pull request with a clear description of the change.

## License

No license has been specified yet. All rights remain with the copyright holder unless a license is added. If you want others to reuse or modify this project, add a license file.
