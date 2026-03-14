# Ace Smoke Shop — Website

Production-ready Next.js website for **Ace Smoke Shop**, Woodbury Heights, NJ.  
Designed & developed by [SmartOps Technologies](https://www.smartopstechnologies.com/).

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🖼️ Adding Store Photos (Required Before Launch)

All gallery images are served from the `/public/images/` folder.  
**No external image URLs are used** — everything is self-hosted.

### Steps:
1. Place your store photos in `/public/images/`
2. Name them: `photo-01.jpg`, `photo-02.jpg` ... `photo-20.jpg`
3. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
4. Recommended size: **640×480px** minimum (landscape orientation works best)

The PHOTOS array in `app/page.tsx` already points to these local paths.  
No code changes are needed — just drop the files in.

### To add more or fewer photos:
Edit the `PHOTOS` array at the top of `app/page.tsx`.

---

## 🏷️ Store Logo

Place your logo file at:
```
/public/images/logo.png
```
The navbar already references this path. Recommended: PNG with transparent background, at least 200px tall.

If you don't have a logo file yet, the navbar falls back to the styled text "ACE · SMOKE SHOP" automatically.

---

## 🌐 Deployment

### GitHub Pages (current setup)
```bash
npm run build   # outputs to /out/
```
The `next.config.js` is set to `basePath: '/Smokeshop_WebApp'` for GitHub Pages.

### Custom Domain (e.g. acesmokeshopnj.com)
1. Open `next.config.js`
2. Remove or comment out the `basePath` line
3. Deploy the `/out` folder to Vercel, Netlify, or Cloudflare Pages

---

## 📁 Project Structure

```
/
├── app/
│   ├── layout.tsx        # HTML head, metadata, fonts
│   ├── page.tsx          # Full single-page app
│   └── globals.css       # All styles
├── public/
│   └── images/
│       ├── logo.png          ← Add your logo here
│       ├── photo-01.jpg      ← Add store photos here
│       ├── photo-02.jpg
│       └── ... (up to photo-20.jpg)
├── next.config.js
├── LICENSE
└── README.md
```

---

## ⚖️ Copyright & Licensing

- **Code**: MIT License — see `LICENSE` file
- **Store content & branding**: Property of Ace Smoke Shop / The Ace Distributors
- **Photos**: Must be owned by or licensed to Ace Smoke Shop before use
- **No external image CDNs are used** in this codebase

Social media links (Facebook, Instagram, Yelp, Join Us) are standard hyperlinks — no copyright concern.

---

## 🔧 Customization

All store data is centralized at the top of `app/page.tsx`:

| Constant | What it controls |
|----------|-----------------|
| `PHOTOS` | Gallery image paths |
| `HOURS`  | Store hours table |
| `STATS`  | Hero stat numbers |
| `MARQUEE`| Scrolling ticker text |
| `REVIEWS`| Customer review cards |
| `PRODUCTS`| Product category cards |
| `FEATURES`| About section feature tiles |

---

*Built with Next.js 14 · TypeScript · Tailwind CSS*  
*© 2025 SmartOps Technologies*
