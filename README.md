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

No build tools or package installation are needed.

```bash
git clone https://github.com/roshankumarjha-git/campus-ai-srm.git
cd campus-ai-srm
open index.html
```

On Windows or Linux, open `index.html` directly in your browser instead of using the macOS `open` command.

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

The page contains an optional Gemini image-analysis integration. Its API key is intentionally not included in this repository. Without a key, the demo uses text-based severity scoring and displays a notice that image analysis is not configured.

Do not put a Gemini or other private API key in `index.html` or any browser-delivered file: visitors can inspect client-side code. To enable image analysis for a deployed app, route requests through a backend that stores the key securely, or use another provider-supported secure deployment pattern.

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
