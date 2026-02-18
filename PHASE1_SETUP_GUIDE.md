# 🛕 Mandirlok – Phase 1 Setup Guide
> **Frontend Foundation: Next.js + Tailwind CSS + Homepage + All Panels**

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Folder Structure](#folder-structure)
4. [Running the App](#running-the-app)
5. [Pages & Routes](#pages--routes)
6. [Design System](#design-system)
7. [Phase 1 Deliverables](#phase-1-deliverables)
8. [Next Phases Preview](#next-phases-preview)
9. [Common Issues](#common-issues)

---

## 1. Prerequisites

Before starting, make sure you have the following installed:

| Tool        | Version  | Install Command                                              |
|-------------|----------|--------------------------------------------------------------|
| Node.js     | 18+      | https://nodejs.org (download LTS)                           |
| npm         | 9+       | Comes with Node.js                                           |
| Git         | Any      | https://git-scm.com                                          |
| VS Code     | Any      | https://code.visualstudio.com (recommended editor)           |

### Check versions
```bash
node -v       # should be v18 or higher
npm -v        # should be 9 or higher
git --version # any version
```

---

## 2. Project Setup

### Step 1: Copy the project folder
The project folder `Mandirlok` is ready. Move it to your Desktop (or keep where it is).

### Step 2: Open terminal in the project folder
```bash
# Navigate to project folder
cd Desktop/Mandirlok

# OR if you're already in the folder
pwd   # should show .../Mandirlok
```

### Step 3: Install dependencies
```bash
npm install
```
This will install all required packages. It may take 2–3 minutes.

> ⚠️ If you see errors, run: `npm install --legacy-peer-deps`

### Step 4: Start the development server
```bash
npm run dev
```

### Step 5: Open in browser
Navigate to: **http://localhost:3000**

You should see the Mandirlok homepage! 🎉

---

## 3. Folder Structure

```
Mandirlok/
│
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   ├── page.tsx                # Homepage
│   ├── temples/
│   │   ├── page.tsx            # Temple listing page
│   │   └── [id]/page.tsx       # Temple detail page
│   ├── poojas/
│   │   └── [id]/page.tsx       # Pooja detail + booking
│   ├── chadhava/               # Chadhava offerings (Phase 2)
│   ├── cart/
│   │   └── page.tsx            # Cart / Sankalp form + payment
│   ├── login/
│   │   └── page.tsx            # OTP Login page
│   ├── dashboard/
│   │   └── page.tsx            # User my bookings dashboard
│   ├── booking-success/
│   │   └── page.tsx            # Order confirmation page
│   ├── admin/
│   │   └── page.tsx            # Admin dashboard
│   └── pandit/
│       └── page.tsx            # Pandit dashboard
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   └── Footer.tsx          # Footer with links
│   └── home/
│       ├── HeroSection.tsx     # Hero banner with search
│       ├── FeaturedTemples.tsx # Temple cards section
│       ├── HowItWorks.tsx      # 4-step process section
│       ├── FeaturedPoojas.tsx  # Pooja cards section
│       ├── ChadhavaSection.tsx # Offerings + CTA banner
│       ├── WhatsAppCTA.tsx     # WhatsApp features section
│       └── Testimonials.tsx    # Reviews slider
│
├── lib/
│   └── utils.ts               # Helper functions
│
├── styles/
│   └── globals.css            # Global CSS + design tokens
│
├── public/
│   └── images/                # Static images (add your own)
│
├── package.json               # Dependencies
├── tailwind.config.ts         # Tailwind + brand colors
├── tsconfig.json              # TypeScript config
├── next.config.js             # Next.js config
└── postcss.config.js          # PostCSS config
```

---

## 4. Running the App

### Development Mode
```bash
npm run dev
# App runs at http://localhost:3000
# Changes auto-reload in the browser (Hot Reload)
```

### Build for Production
```bash
npm run build
npm run start
```

### Lint Check
```bash
npm run lint
```

---

## 5. Pages & Routes

| Route                  | Page                        | Panel  |
|------------------------|-----------------------------|--------|
| `/`                    | Homepage                    | User   |
| `/temples`             | Temple Listing              | User   |
| `/temples/[id]`        | Temple Detail               | User   |
| `/poojas/[id]`         | Pooja Detail + Book         | User   |
| `/cart`                | Sankalp Form + Payment      | User   |
| `/login`               | OTP Login / Signup          | User   |
| `/dashboard`           | My Bookings Dashboard       | User   |
| `/booking-success`     | Booking Confirmation        | User   |
| `/admin`               | Admin Dashboard             | Admin  |
| `/pandit`              | Pandit Dashboard            | Pandit |

---

## 6. Design System

### Brand Colors
```css
--saffron:   #ff7f0a   /* Primary CTA, accents */
--maroon:    #8b0000   /* Secondary, header elements */
--gold:      #f0bc00   /* Stars, ratings, decorative */
--bg:        #fdf6ee   /* Page background */
--border:    #f0dcc8   /* Card borders */
--text:      #1a1209   /* Main text */
--muted:     #6b5b45   /* Secondary text */
```

### Fonts
- **Display (Headings):** Playfair Display (Google Fonts)
- **Body:** DM Sans (Google Fonts)
- **Devanagari:** Tiro Devanagari Hindi (Google Fonts)

### CSS Utility Classes (custom)
```css
.btn-saffron         /* Orange gradient CTA button */
.btn-maroon          /* Deep red button */
.btn-outline-saffron /* Outline orange button */
.temple-card         /* Temple card with hover lift */
.card-lift           /* General card hover effect */
.input-divine        /* Styled form input */
.badge-saffron       /* Orange badge pill */
.badge-green         /* Green verified badge */
.container-app       /* Max-width centered container */
.section-py          /* Standard section padding */
.heading-xl/lg/md    /* Typography scale */
```

---

## 7. Phase 1 Deliverables ✅

- [x] Complete Next.js 14 project setup
- [x] Tailwind CSS with custom brand colors
- [x] Global design system (fonts, colors, utilities)
- [x] Responsive Navbar (desktop + mobile drawer)
- [x] Footer with links
- [x] Homepage with 7 sections:
  - Hero + Search bar
  - Featured Temples
  - How It Works (4 steps)
  - Featured Poojas with filters
  - Chadhava Offerings section
  - WhatsApp CTA section
  - Testimonials slider
- [x] Temples listing page with search + filters
- [x] Temple detail page (poojas, chadhava, ratings, map)
- [x] Pooja booking page (date picker, offerings, price)
- [x] Cart + Sankalp form (2-step: details → payment)
- [x] OTP Login page (3-step: phone → OTP → name)
- [x] User dashboard (bookings, stats)
- [x] Booking success page
- [x] Admin dashboard (orders, stats, quick actions)
- [x] Pandit dashboard (today's poojas, upload, earnings)
- [x] Mobile responsive on all pages

---

## 8. Next Phases Preview

### Phase 2: Backend + Database
- Node.js + Express API server setup
- MongoDB database with schemas
- Razorpay payment integration
- JWT authentication

### Phase 3: Admin Panel (Full)
- Full CRUD for temples, poojas, chadhava
- Order assignment to pandits
- Payment tracking
- Revenue analytics charts

### Phase 4: Pandit Panel (Full)
- Real video upload to AWS S3
- Earnings & payout management
- Profile management

### Phase 5: WhatsApp + Video
- Twilio or Meta WhatsApp Business API
- Automated message flows
- Video storage on AWS S3
- Video delivery pipeline

### Phase 6: Testing + Deployment
- Vercel deployment (frontend)
- AWS/VPS deployment (backend)
- Performance optimization
- Final testing

---

## 9. Common Issues

### Issue: `npm install` fails
```bash
# Try with legacy peer deps
npm install --legacy-peer-deps

# Or clear cache
npm cache clean --force
npm install
```

### Issue: Fonts not loading
The app uses Google Fonts. Make sure you have an internet connection. The fonts are loaded via CDN in `app/layout.tsx`.

### Issue: Port 3000 already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Issue: TypeScript errors
These are usually harmless in development. Run:
```bash
npm run build  # See if the build succeeds
```

### Issue: Tailwind classes not working
Make sure `tailwind.config.ts` includes all file paths in the `content` array.

---

## 💡 Tips for Development

1. **VS Code Extensions** (install these):
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript + JavaScript Grammar

2. **Mobile Testing**: Use Chrome DevTools → Toggle Device Toolbar (`Ctrl+Shift+M`)

3. **Components**: Each section is a separate component in `components/home/`. Easy to modify independently.

4. **Data**: All data is currently hardcoded (mock data). In Phase 2, this will be replaced with API calls.

5. **Images**: Replace placeholder temple emojis with real images. Add image files to `public/images/` and reference them with Next.js `<Image>` component.

---

## 📞 Need Help?

If you get stuck on any step:
1. Check the terminal for error messages
2. Google the exact error message
3. Check Node.js version (`node -v` should be 18+)
4. Try restarting the dev server (`Ctrl+C` then `npm run dev`)

---

*Phase 1 Complete ✅ | Ready for Phase 2: Backend + Database*
