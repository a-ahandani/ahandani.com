# ahandani.com

Personal site and blog of Ahmad Esmaeilzadeh Ahandani. Built with Astro, content in Markdoc files, edited with Keystatic, hosted on Cloudflare Workers.

## Editing content

- Posts live in `src/content/posts/*.mdoc`, pages in `src/content/pages/*.mdoc`.
- Images and videos live in `public/images/posts/`.
- Visual editor: run `npm run dev` and open `http://localhost:4321/keystatic` (saves files locally), or open `https://ahandani.com/keystatic` and sign in with GitHub (saves commits to this repo, which redeploys the site).

## Commands

| Command           | Action                                          |
| :---------------- | :---------------------------------------------- |
| `npm install`     | Install dependencies                            |
| `npm run dev`     | Local dev server and editor at `localhost:4321` |
| `npm run build`   | Build the site into `./dist/`                   |
| `npm run preview` | Preview the production build locally            |

## URLs

Routes match the previous Next.js site: `/posts/<slug>`, `/pages/<slug>`, `/categories/<Name>`, `/tags/<name>`.
