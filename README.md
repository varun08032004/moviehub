# MovieHub (React + Vite + Tailwind)

A slick Netflix-style UI using TailwindCSS. It uses your own movie list in `src/data/movies.js`.
Each movie can have a Terabox link. If the link is empty, the Watch button is disabled.

## Quick start

```bash
npm install
npm run dev
```

Then open the URL that Vite prints (usually http://localhost:5173).

## Add your Terabox links

Edit `src/data/movies.js` and replace the `link: ""` with your actual Terabox share link for each movie.
You can also add a `poster` URL if you have one. If you leave `poster` empty, a placeholder poster will be generated automatically.

Example:

```js
{ title: "Dumplin", year: "2018", link: "https://teraboxapp.com/s/your-id", poster: "https://your-poster.jpg" }
```

## Tech
- React 18 + Vite 5
- TailwindCSS 3
- Fancy glassmorphism + neon hover effects
