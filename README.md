# Manjot Singh — Developer Portfolio

An Awwwards-style, cinematic developer portfolio built with React 19, Vite, Tailwind, GSAP, Lenis, and Three.js. Projects are **fetched live from the GitHub REST API** — the "Major Projects" cards auto-select your top 4 repos by stars → forks → recency, so nothing is hardcoded or fake.

## 1. Install

```bash
npm install
```

## 2. Configure

- **GitHub username**: already set to `manjot3093` in `src/services/github.js` (`GITHUB_USERNAME`). Change it there if needed.
- **Contact form (EmailJS)**: copy `.env.example` to `.env` and fill in your EmailJS Service ID, Template ID, and Public Key from https://www.emailjs.com. Your EmailJS template should include fields named `name`, `email`, `subject`, `message` to match the form.
- **Resume**: drop your PDF at `public/resume.pdf` — the "Download Resume" button already links to `/resume.pdf`.
- **Social links**: update the LinkedIn/LeetCode/email URLs in `Hero.jsx` and `Footer.jsx` with your real profiles.
- **OG image**: add `public/og-image.png` (1200×630) for link previews.

## 3. Run

```bash
npm run dev
```

## 4. Build for production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to Vercel, Netlify, or GitHub Pages.

## Notes on the GitHub integration

- No token/auth needed — the public GitHub API allows ~60 unauthenticated requests/hour per IP, which is plenty for a portfolio. If you ever hit the rate limit during heavy testing, the UI shows a friendly message instead of breaking.
- `pickFeaturedRepos()` in `src/services/github.js` controls how the "major 4" are chosen. Adjust the ranking logic there if you'd rather manually pin specific repos (e.g. by filtering on repo name).

## Structure

```
src/
 ├── components/   Navbar, Hero, About, Skills, Projects, Achievements,
 │                 Github stats, Contact, Footer, Loader, Cursor,
 │                 ScrollProgress, CommandPalette, ParticleBackground
 ├── hooks/         useLenis, useGithub
 ├── services/      github.js (API calls)
 ├── pages/         Home, NotFound
 └── App.jsx / main.jsx
```
