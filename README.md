# Dr.siulik-frontend

Modern Next.js App Router frontend for **Dr. Siulik's Dental Care** web application.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Library**: React 18
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Animations & Icons**: Framer Motion, Lucide React, clsx, tailwind-merge

---

## 📁 Repository Structure

```
Dr.siulik-frontend/
├── public/                       # Static media, icons, certificates, video assets
├── src/
│   ├── app/                      # Next.js App Router (layout.js, page.js, globals.css)
│   ├── components/
│   │   ├── navigation/           # Navbar, Footer, MobileStickyBar
│   │   ├── sections/             # 19 dedicated editorial homepage sections
│   │   └── ui/                   # Modal, Lightbox, Touch gestures, Buttons
│   └── data/                     # Clinic content, doctor profiles, credentials data
├── .env.example
├── .gitignore
├── jsconfig.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

---

## ⚙️ Environment Variables

Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🔗 Related Services

- **Backend REST API**: [Dr.siulik-backend](https://github.com/affankhan2533-pixel/Dr.siulik-backend)
