# Create Surf Travel
![App Preview](https://imgix.cosmicjs.com/be8b79a0-9bdf-11f1-b808-2563a0e22776-autopilot-photo-1502933691298-84fc14542831-1787152070194.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A surf travel journal built with Next.js, Tailwind CSS, and Cosmic. Featuring a coastal hero, a paginated stories index, full post detail pages, and destination guides for Hawaii, Bali, and Costa Rica.

## Features

- 🌊 Coastal hero homepage with recent posts and destination highlights
- 📝 Paginated Journal (posts) index — clean grid, no filters
- 📖 Post detail pages with author byline, location callout, and related stories
- 🏝️ Destinations index and detail pages (wave difficulty, best months, tagged posts)
- 🔍 Per-page SEO metadata and a dynamic `/sitemap.xml`
- 📱 Fully responsive, mobile-first layout
- 🛟 Graceful empty states for missing Cosmic data

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a85c67db4776005423c1631&clone_repository=6a85cf3fb4776005423c1733)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a surf travel blog with categories, authors, and locations: Hawaii, Bali, and Costa Rica."

### Code Generation Prompt

> Build a Next.js application for a company website called "Create Surf Travel". The content is managed in Cosmic CMS with the following object types: authors, categories, locations, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A surf travel blog website built with TanStack Start/Router and Tailwind CSS, reading content from Cosmic. Keep the scope tight and the code complete — only these routes:
>
> 1. Home page: coastal hero section, a grid of featured/recent posts, and a short list of surf destinations.
> 2. Posts index: paginated grid of all posts with title, thumbnail, excerpt, author name and date. No filtering UI.
> 3. Post detail page (/posts/$slug): full post body rendered from markdown/rich text, author byline with avatar, a location callout linking to the related location, and a "related posts" section.
> 4. Locations index (/locations): grid of surf destinations with image and short description.
> 5. Location detail page (/locations/$slug): hero image, description, wave difficulty, best months to surf, and a list of posts tagged to that location.
>
> Do NOT build author pages, category pages, or combined category/season filtering — those are intentionally deferred to a follow-up.
>
> Design: clean coastal aesthetic, ocean blues and warm sand tones, generous whitespace, responsive mobile-first layout. Include per-page SEO meta tags (title, description, og:image) and a sitemap.xml route.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — App Router, Server Components
- [TypeScript](https://www.typescriptlang.org/) — strict typing throughout
- [Tailwind CSS](https://tailwindcss.com/) — custom ocean/sand palette + typography plugin
- [Cosmic](https://www.cosmicjs.com/docs) — headless CMS content source

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed
- A Cosmic bucket with `posts`, `authors`, `locations`, and `categories` object types

### Installation

```bash
bun install
```

Create a `.env.local` file (not committed to git) with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Run the dev server:

```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all locations with resolved metadata
const { objects: locations } = await cosmic.objects
  .find({ type: 'locations' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
```

```typescript
// Fetch posts for a specific location
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts', 'metadata.location': locationId })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app reads from four Cosmic object types:
- **posts** — excerpt, content, featured_image, published_date, surf_season, author, location, categories
- **authors** — name, bio, photo, home_break
- **locations** — name, country, description, hero_image, best_months, wave_difficulty
- **categories** — name, description (displayed as badges on posts; category pages are deferred)

Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel
1. Push this repository to GitHub
2. Import the project into [Vercel](https://vercel.com)
3. Add the `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` environment variables
4. Deploy

### Netlify
1. Push this repository to GitHub
2. Import the project into [Netlify](https://netlify.com)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add the same environment variables in the Netlify dashboard
5. Deploy

<!-- README_END -->