# Red Bull × AiMSA Interactive Landing Page

This project is a **single-page interactive landing website** built using modern frontend technologies. It features a layered scroll-based layout that presents Red Bull energy drink content, an interactive visual challenge, and information about the **AiMSA student association at PCCOE**. The experience is designed to be immersive, visually rich, and event-focused.

---

## 🚀 Purpose & Use Case

The website serves as a **promotional and engagement-focused landing page** intended for events, collaborations, or themed campaigns involving **Red Bull** and the **AiMSA student association**. It aims to:
- Capture user attention through motion-driven design
- Encourage interaction via a time-limited visual challenge
- Present brand and association information in a memorable format

---

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Languages:** TypeScript, JavaScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Build Tools:** npm, Next.js build system

---

## 📁 Project Structure

app/
├─ layout.tsx # Root layout using App Router
├─ page.tsx # Main single-page implementation

components/
├─ Navbar.tsx # Fixed pill-shaped navigation bar
└─ Reusable UI components

public/
├─ images/ # Product images, challenge images, logos
├─ audio/ # Background MP3 files
└─ Static assets


---

## ✨ Core Features

- Horizontal parallax-style slide transitions driven by vertical scroll
- Fixed, pill-shaped navigation bar with active state tracking and smooth-scroll shortcuts
- Interactive Focus Challenge with:
  - Randomized image selection
  - 60-second countdown timer
  - Background music playback
- Audio controls for muting and unmuting background music
- Visual effects including noise overlays and hover-based 3D bottle rotations

---

## 🧭 Scroll & Layout Behaviour

- Uses a **300vh vertical scroll track**
- Vertical scrolling maps to **horizontal X-axis movement** using Framer Motion
- Three visually distinct sections appear within a fixed viewport
- Each section:
  - Occupies one full viewport height
  - Uses absolute positioning and controlled stacking order
- Creates the illusion of horizontal navigation within a single-page experience

---

## 💻 Local Development

### Install dependencies and run locally

```bash
npm install
npm run dev
```

Access the site at:

```
http://localhost:3000
```

---

## 🌐 Deployment

- **Repository:** Black-Cat1999/redbullxArtimas
- **Build Command:**

```bash
npm run build
```

- **Deployment Platform:** Vercel (recommended)
- **Output:** Static and server-rendered assets optimized via Next.js

---

## 🎨 Customization Points

- Edit text content and background colors in:
  - `app/page.tsx`

- Replace product images, logos, and challenge assets in:
  - `public/`

- Modify navigation labels and scroll targets in:
  - `components/Navbar.tsx`

- Configure challenge logic (timer duration, image list) via variables in the main page logic

---

## ⚠️ Known Limitations

- Scroll logic relies on hardcoded viewport heights and may require adjustment for extreme screen sizes
- Background music autoplay depends on browser permissions and requires an initial user interaction
- The transition system is optimized specifically for a three-section vertical-to-horizontal scrolling flow
