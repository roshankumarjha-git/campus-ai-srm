# Campus AI — SRM KTR

A static, single-page Campus AI demo. Open `index.html` in a browser to preview it locally. The warden console map uses Leaflet with OpenStreetMap tiles and displays the required attribution.

## Deploy

### Vercel

1. Import this project folder's GitHub repository in Vercel.
2. Choose **Other** as the framework preset.
3. Leave the build command and output directory empty; `index.html` is served as the site root.
4. Deploy.

### Render

Create a **Static Site**, connect the GitHub repository, set the root directory to `campus-ai` if this folder is inside a larger repository, leave the build command empty, and set the publish directory to `.`.

## Map tiles

The map uses the standard OpenStreetMap tile service. Keep the visible map attribution intact and use the service according to its [tile usage policy](https://operations.osmfoundation.org/policies/tiles/).
