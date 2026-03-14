'use client'

import { useState, useEffect, useRef } from 'react'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

/* ═══════════════════════════════════════════════════════════════
   STORE DATA
   ─────────────────────────────────────────────────────────────
   PHOTOS: All images are served from /public/images/.
   ✅ No external CDNs, no hotlinked URLs, no copyright issues.

   TO ADD YOUR PHOTOS:
     1. Place your store photos in /public/images/
     2. Name them photo-01.jpg, photo-02.jpg … photo-20.jpg
     3. Done — no code changes needed.

   TO ADD MORE / FEWER PHOTOS:
     Edit the PHOTOS array below.
═══════════════════════════════════════════════════════════════ */
const PHOTOS: string[] = [
  `${BASE}/images/photo-01.jpg`,
  `${BASE}/images/photo-02.jpg`,
  `${BASE}/images/photo-03.jpg`,
  `${BASE}/images/photo-04.jpg`,
  `${BASE}/images/photo-05.jpg`,
  `${BASE}/images/photo-06.jpg`,
  `${BASE}/images/photo-07.jpg`,
  `${BASE}/images/photo-08.jpg`,
  `${BASE}/images/photo-09.jpg`,
  `${BASE}/images/photo-10.jpg`,
  `${BASE}/images/photo-11.jpg`,
  `${BASE}/images/photo-12.jpg`,
  `${BASE}/images/photo-13.jpg`,
  `${BASE}/images/photo-14.jpg`,
  `${BASE}/images/photo-15.jpg`,
  `${BASE}/images/photo-16.jpg`,
  `${BASE}/images/photo-17.jpg`,
  `${BASE}/images/photo-18.jpg`,
  `${BASE}/images/photo-19.jpg`,
  `${BASE}/images/photo-20.jpg`,
]

const HOURS = [
  { day: 'Monday',    open: '9:00 AM',  close: '9:00 PM'  },
  { day: 'Tuesday',   open: '9:00 AM',  close: '9:00 PM'  },
  { day: 'Wednesday', open: '9:00 AM',  close: '9:00 PM'  },
  { day: 'Thursday',  open: '9:00 AM',  close: '10:00 PM' },
  { day: 'Friday',    open: '9:00 AM',  close: '10:00 PM' },
  { day: 'Saturday',  open: '9:00 AM',  close: '10:00 PM' },
  { day: 'Sunday',    open: '10:00 AM', close: '8:00 PM'  },
]

const STATS = [
  { num: '4.7★', lbl: 'Yelp Rating'       },
  { num: '114+', lbl: 'Customer Reviews'   },
  { num: '2020', lbl: 'Established'        },
  { num: '7',    lbl: 'Days a Week'        },
  { num: '6+',   lbl: 'Product Categories' },
]

const MARQUEE = [
  'Glass Pipes','·','Disposable Vapes','·','Hookah & Shisha','·',
  'CBD Products','·','Premium Cigars','·','Dab Rigs','·',
  'Nic Salts','·','Loyalty Rewards','·','Bitcoin ATM','·',
  'Mention Yelp for Discount','·','Open 7 Days','·',
]

const REVIEWS = [
  { name: 'David M.',      init: 'DM', date: 'April 2022',  stars: 5, text: 'Best smoke shop by far. Has everything you could possibly need. Great staff, well organized. Just a beautiful shop — would highly recommend.' },
  { name: 'Satyam P.',     init: 'SP', date: 'Feb 2022',    stars: 5, text: 'Amazing employees, super friendly. They got everything you can ask for. One of the best smoke shops in all of New Jersey.' },
  { name: 'Wendy D.',      init: 'WD', date: 'May 2021',    stars: 5, text: 'Staff was incredibly helpful on my first visit. Terrific variety and great product knowledge. I highly recommend this place.' },
  { name: 'Ej K.',         init: 'EK', date: 'June 2022',   stars: 5, text: 'Great smoke shop with plenty of options. Nina & Alex were very helpful and knowledgeable. Real good people working here.' },
  { name: 'Donald B.',     init: 'DB', date: 'March 2024',  stars: 5, text: 'Great place and easy to get to. Lots of different vapes, nic salts, rigs, and more. Definitely check them out.' },
  { name: "Wayne's World", init: 'WW', date: 'March 2024',  stars: 5, text: 'Great customer service and very knowledgeable staff. They take time to help you find exactly the right product.' },
]

/* ═══════════════════════════════════════════════════════════════
   PRODUCT ICONS — hand-crafted SVG paths, no icon library
═══════════════════════════════════════════════════════════════ */

/* Glass bong — tube, water chamber, bowl on side */
const IcoGlass = () => (
  <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="11" y="2" width="4" height="4.5" rx="1.5" />
    <line x1="13" y1="6.5" x2="13" y2="10" />
    <path d="M8.5 10 Q6 13 6 16 Q6 21 9.5 22 H16.5 Q20 21 20 16 Q20 13 17.5 10 Z" />
    <path d="M8 18.5 Q13 17 18 18.5" strokeDasharray="1.5 1.5" strokeWidth="1.2" />
    <line x1="18" y1="12.5" x2="22" y2="9.5" />
    <circle cx="22.5" cy="9" r="1.6" />
    <line x1="7" y1="22" x2="19" y2="22" strokeWidth="2" />
  </svg>
)

/* Vape pen — cylindrical body, display panel, mouthpiece */
const IcoVape = () => (
  <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8.5" y="5" width="9" height="17" rx="4" />
    <rect x="10" y="3" width="6" height="3.5" rx="1.5" />
    <rect x="10.5" y="9" width="5" height="6" rx="1.5" strokeWidth="1.2" opacity="0.5" />
    <line x1="12" y1="11" x2="14" y2="11" strokeWidth="1" opacity="0.7" />
    <line x1="12" y1="13" x2="14" y2="13" strokeWidth="1" opacity="0.7" />
    <circle cx="13" cy="19" r="1.5" strokeWidth="1.2" opacity="0.5" />
    <path d="M11 2.5 Q10 0.8 11.5 0.5" strokeWidth="1.2" opacity="0.4" />
    <path d="M14.5 2 Q15.5 0.5 14 0.3" strokeWidth="1.2" opacity="0.35" />
  </svg>
)

/* Traditional hookah — globe base, stem, bowl, hose port */
const IcoHookah = () => (
  <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 7.5 Q9 5 13 5 Q17 5 16.5 7.5 Z" />
    <line x1="9.5" y1="7.5" x2="16.5" y2="7.5" />
    <line x1="13" y1="7.5" x2="13" y2="11" />
    <ellipse cx="13" cy="17" rx="7" ry="6" />
    <path d="M8 18.5 Q13 17 18 18.5" strokeDasharray="1.4 1.4" strokeWidth="1.2" opacity="0.55" />
    <line x1="7" y1="23" x2="19" y2="23" strokeWidth="1.8" />
    <line x1="20" y1="15.5" x2="24" y2="13.5" />
    <circle cx="24.5" cy="13" r="1.2" />
  </svg>
)

/* Cannabis / CBD leaf — compound leaf shape */
const IcoCBD = () => (
  <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="13" y1="24" x2="13" y2="12.5" />
    <path d="M13 12.5 Q10 7 13 4 Q16 7 13 12.5" />
    <path d="M13 11 Q8 8.5 5.5 11.5 Q9 12.5 13 11" />
    <path d="M13 11 Q18 8.5 20.5 11.5 Q17 12.5 13 11" />
    <path d="M13 14 Q7.5 11.5 4.5 14.5 Q8.5 16 13 14" />
    <path d="M13 14 Q18.5 11.5 21.5 14.5 Q17.5 16 13 14" />
    <path d="M13 22 Q11 20 9.5 18" opacity="0.5" />
    <path d="M13 22 Q15 20 16.5 18" opacity="0.5" />
  </svg>
)

/* Cigar — torpedo body, band ring, lit end */
const IcoCigar = () => (
  <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 13 Q4 10.5 6.5 10.5 L20 10.5 Q23 10.5 23 13 Q23 15.5 20 15.5 L6.5 15.5 Q4 15.5 4 13 Z" />
    <line x1="9" y1="10.5" x2="9" y2="15.5" strokeWidth="1.2" opacity="0.4" />
    <rect x="9" y="10.5" width="4.5" height="5" rx="0.5" strokeWidth="1" opacity="0.2" />
    <path d="M2.5 10 Q1.5 8 2.5 6.5 Q3.5 5 2.5 4" opacity="0.5" />
    <path d="M4 9.5 Q3.5 7.5 4.5 6.5" opacity="0.4" />
  </svg>
)

/* Herb grinder — circular, 8 teeth, center knob */
const IcoAccessories = () => {
  const teeth = [0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
    const r = (Math.PI * deg) / 180
    return {
      x1: (13 + 5.8 * Math.cos(r)).toFixed(2),
      y1: (13 + 5.8 * Math.sin(r)).toFixed(2),
      x2: (13 + 7.4 * Math.cos(r)).toFixed(2),
      y2: (13 + 7.4 * Math.sin(r)).toFixed(2),
    }
  })
  return (
    <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="13" r="9.5" />
      <circle cx="13" cy="13" r="5.5" />
      {teeth.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth="2" />
      ))}
      <circle cx="13" cy="13" r="2" strokeWidth="1.2" />
      <line x1="11.5" y1="13" x2="14.5" y2="13" strokeWidth="1" />
      <line x1="13" y1="11.5" x2="13" y2="14.5" strokeWidth="1" />
    </svg>
  )
}

/* ── Feature icons ───────────────────────────────────────────── */
const IcoStar = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="10,2 12.4,7.5 18.5,8.1 14,12.5 15.5,18.5 10,15.2 4.5,18.5 6,12.5 1.5,8.1 7.6,7.5" />
  </svg>
)
const IcoCard = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1.5" y="4" width="17" height="12" rx="2" />
    <line x1="1.5" y1="8" x2="18.5" y2="8" strokeWidth="2" />
    <rect x="3.5" y="11" width="4" height="3" rx="0.8" strokeWidth="1.2" opacity="0.6" />
    <line x1="11" y1="12.5" x2="16.5" y2="12.5" strokeWidth="1.2" opacity="0.4" />
  </svg>
)
const IcoLoyalty = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 2 H12.5 L17 7 V18 Q17 19 16 19 H4 Q3 19 3 18 V3 Q3 2 4 2" />
    <path d="M12.5 2 V7 H17" />
    <circle cx="6.5" cy="11" r="1.1" />
    <circle cx="10"  cy="11" r="1.1" />
    <circle cx="13.5" cy="11" r="1.1" />
    <circle cx="6.5" cy="15" r="1.1" />
    <circle cx="10"  cy="15" r="1.1" />
    <circle cx="13.5" cy="15" r="1.1" />
  </svg>
)
const IcoAccessible = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="3.2" r="1.8" />
    <path d="M10 5 V9 H14.5" />
    <path d="M8 9 H13 Q14 9 14 10 V14" />
    <circle cx="9.5" cy="16.5" r="3" />
    <circle cx="15"  cy="17.5" r="1.8" />
    <line x1="14" y1="14" x2="14" y2="17.5" />
  </svg>
)
const IcoBitcoin = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="8.5" />
    <path d="M8 6.5 H11.5 Q13.2 6.5 13.2 8.5 Q13.2 10 11.5 10 Q13.8 10 13.8 12 Q13.8 14 11.5 14 H8 Z" />
    <line x1="9" y1="10" x2="12.5" y2="10" strokeWidth="1.2" />
    <line x1="7.5" y1="5.5" x2="7.5" y2="6.8" />
    <line x1="10"  y1="5"   x2="10"  y2="6.5" />
    <line x1="7.5" y1="14"  x2="7.5" y2="15.5" />
    <line x1="10"  y1="14"  x2="10"  y2="15.5" />
  </svg>
)
const IcoInventory = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5.5" y="2"   width="9" height="4.5" rx="1" />
    <line x1="10" y1="2"   x2="10" y2="6.5"  strokeWidth="1" opacity="0.4" />
    <rect x="3"   y="7.5"  width="14" height="5" rx="1" />
    <line x1="10" y1="7.5" x2="10" y2="12.5" strokeWidth="1" opacity="0.4" />
    <rect x="1"   y="14"   width="18" height="5" rx="1" />
    <line x1="10" y1="14"  x2="10" y2="19"   strokeWidth="1" opacity="0.4" />
  </svg>
)

/* ── Small UI icons ──────────────────────────────────────────── */
const IcoPhone = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.09 2.18 2 2 0 012.06 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
)
const IcoMail = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)
const IcoPin = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)
const IcoClock = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)
const IcoChevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)
const IcoZoomIn = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8"  x2="11" y2="14" />
    <line x1="8"  y1="11" x2="14" y2="11" />
  </svg>
)
const IcoX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6"  x2="6"  y2="18" />
    <line x1="6"  y1="6"  x2="18" y2="18" />
  </svg>
)
const IcoMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6"  x2="21" y2="6"  />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)
const IcoCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const IcoSmoke = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M5 20 Q6.5 17 6 14 Q5.5 11 7 9 Q8.5 7 8 5" />
    <path d="M11 20 Q13 16 12 13 Q11 10 13 8 Q15 6 14 4" />
    <path d="M17 20 Q18.5 15 18 12 Q17.5 9 19 7" />
  </svg>
)

/* ── Inline SVG logo — shown when /public/images/logo.png is absent ── */
const LogoSVG = () => (
  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.15 }}>
    <span className="ace">ACE</span>
    <span className="rest">SMOKE SHOP</span>
  </span>
)

/* ── Products data ───────────────────────────────────────────── */
const PRODUCTS = [
  { Icon: IcoGlass,       name: 'Glass Pieces',        desc: 'Hand-selected bongs, bubblers, dab rigs, and pipes. From everyday beaters to artisan display pieces — every style and budget.',         tag: 'Premium Selection' },
  { Icon: IcoVape,        name: 'Vapes & Disposables',  desc: 'Latest pod systems, disposable vapes, mods, and e-liquids. Every nicotine strength and hundreds of flavors always in stock.',           tag: 'Latest Devices'    },
  { Icon: IcoHookah,      name: 'Hookah & Shisha',      desc: 'Complete hookah setups, premium coconut charcoal, and an extensive range of shisha flavors from the world\'s top brands.',             tag: 'Lounge Quality'    },
  { Icon: IcoCBD,         name: 'CBD Products',         desc: 'Lab-tested CBD oils, gummies, topicals, and flower. Our knowledgeable staff will help find exactly the right product for your needs.',  tag: 'Lab Tested'        },
  { Icon: IcoCigar,       name: 'Cigars & Tobacco',     desc: 'Premium cigars, pipe tobacco, rolling papers, blunts, and wraps. A curated selection for every preference and every occasion.',        tag: 'Curated Stock'     },
  { Icon: IcoAccessories, name: 'Accessories',          desc: 'Grinders, torches, rolling trays, lighters, cases, cleaning kits — every small accessory you need, all under one roof.',              tag: 'Everything Else'   },
]

const FEATURES = [
  { Icon: IcoStar,       label: '4.7 Star Rating',  detail: '114+ verified Yelp & Google reviews'   },
  { Icon: IcoCard,       label: 'Cards Accepted',   detail: 'Credit, debit & contactless payments'  },
  { Icon: IcoLoyalty,    label: 'Loyalty Rewards',  detail: 'Earn points & redeem on every visit'   },
  { Icon: IcoAccessible, label: 'Fully Accessible', detail: 'Wheelchair-friendly layout throughout' },
  { Icon: IcoBitcoin,    label: 'Bitcoin ATM',      detail: 'Buy cryptocurrency on-site'            },
  { Icon: IcoInventory,  label: 'Deep Inventory',   detail: 'Extensive, constantly refreshed stock' },
]

/* Returns 0 = Monday … 6 = Sunday (matches HOURS array order) */
const todayIdx = () => { const d = new Date().getDay(); return d === 0 ? 6 : d - 1 }

/* ═══════════════════════════════════════════════════════════════
   SLIDE COMPONENT — graceful fallback if image file is missing
═══════════════════════════════════════════════════════════════ */
function Slide({ src, n, onClick }: { src: string; n: number; onClick: () => void }) {
  const [err, setErr] = useState(false)
  return (
    <div className="slider-thumb" onClick={onClick}>
      {!err ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={`Ace Smoke Shop photo ${n}`} loading="lazy" onError={() => setErr(true)} />
      ) : (
        <div className="placeholder-slide">
          <IcoSmoke />
          <span>Add photo-{String(n).padStart(2,'0')}.jpg<br />to /public/images/</span>
        </div>
      )}
      <div className="slider-overlay"><IcoZoomIn /></div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function AceSmokeShop() {
  const [ageOk,    setAgeOk]    = useState(true)
  const [checked,  setChecked]  = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lb,       setLb]       = useState<string | null>(null)
  const [form,     setForm]     = useState({ name: '', email: '', phone: '', msg: '' })
  const [sent,     setSent]     = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const today = todayIdx()

  /* Age gate — persists for the session */
  useEffect(() => {
    setAgeOk(!!sessionStorage.getItem('ace_v5'))
    setChecked(true)
  }, [])

  /* Sticky nav shadow on scroll */
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const h = () => { if (window.innerWidth > 860) setMenuOpen(false) }
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  /* ── Smoke particle canvas ─────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf: number, W = 0, H = 0

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    type Puff = {
      x: number; y: number; r: number
      vx: number; vy: number
      alpha: number; grow: number
      life: number; maxLife: number
      hue: number; sat: number
    }
    const puffs: Puff[] = []
    const COLS = [0.05, 0.16, 0.27, 0.38, 0.50, 0.62, 0.73, 0.84, 0.94]

    const makePuff = (): Puff => {
      const col = COLS[Math.floor(Math.random() * COLS.length)]
      return {
        x: col * W + (Math.random() - 0.5) * 65,
        y: H + 15,
        r: 22 + Math.random() * 22,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(0.7 + Math.random() * 0.6),
        alpha: 0,
        grow: 0.65 + Math.random() * 0.45,
        life: 0,
        maxLife: 160 + Math.random() * 140,
        hue: 22 + Math.random() * 20,
        sat: 16 + Math.random() * 18,
      }
    }

    /* seed initial puffs at various heights */
    for (let i = 0; i < 28; i++) {
      const p = makePuff()
      const frac = Math.random()
      p.y    = H - frac * H * 0.88
      p.r    = 24 + frac * 42
      p.life = Math.floor(frac * p.maxLife * 0.55)
      puffs.push(p)
    }

    let frame = 0
    const draw = () => {
      raf = requestAnimationFrame(draw)
      frame++
      ctx.clearRect(0, 0, W, H)
      if (frame % 5 === 0) puffs.push(makePuff())

      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i]
        p.life++
        p.x += p.vx + Math.sin(p.life * 0.024 + p.r * 0.1) * 0.28
        p.y += p.vy
        p.r += p.grow

        const t = p.life / p.maxLife
        if      (t < 0.10) p.alpha = (t / 0.10) * 0.75
        else if (t < 0.55) p.alpha = 0.75
        else               p.alpha = 0.75 * (1 - (t - 0.55) / 0.45)

        if (p.life >= p.maxLife || p.y + p.r < -60) { puffs.splice(i, 1); continue }

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
        g.addColorStop(0,    `hsla(${p.hue},${p.sat}%,18%,${p.alpha})`)
        g.addColorStop(0.38, `hsla(${p.hue},${p.sat - 4}%,27%,${p.alpha * 0.55})`)
        g.addColorStop(0.65, `hsla(${p.hue},${p.sat - 8}%,38%,${p.alpha * 0.20})`)
        g.addColorStop(1,    `hsla(${p.hue},10%,46%,0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      }
    }
    draw()
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }
  const ageYes = () => { sessionStorage.setItem('ace_v5', '1'); setAgeOk(true) }
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', phone: '', msg: '' })
  }

  if (!checked) return null

  /* Double the photos for the infinite loop slider */
  const slides = [...PHOTOS, ...PHOTOS]

  return (
    <>
    {/* ── AGE GATE ─────────────────────────────────────────── */}
    {!ageOk && (
      <div className="age-wrap">
        <div className="age-box">
          <div className="age-icon"><IcoSmoke /></div>
          <span className="eyebrow" style={{ display: 'block', marginBottom: 12 }}>Age Verification Required</span>
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', fontWeight: 800, letterSpacing: '-.02em', color: 'var(--ink)', marginBottom: 12, lineHeight: 1.15 }}>
            You must be<br />21 or older
          </h2>
          <p style={{ fontSize: '.875rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: 32 }}>
            This website is intended for adults 21 and over. By entering you confirm you meet the age requirement.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={ageYes}>Yes, I&apos;m 21+</button>
            <button className="btn-outline" onClick={() => { window.location.href = 'https://google.com' }}>Exit</button>
          </div>
        </div>
      </div>
    )}

    {/* ── LIGHTBOX ─────────────────────────────────────────── */}
    <div
      className={`lb-wrap${lb ? ' open' : ''}`}
      onClick={() => setLb(null)}
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
    >
      <button className="lb-close" onClick={() => setLb(null)} aria-label="Close lightbox"><IcoX /></button>
      {lb && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={lb} alt="Ace Smoke Shop store photo" className="lb-img" onClick={e => e.stopPropagation()} />
      )}
    </div>

    {/* ── NAV ──────────────────────────────────────────────── */}
    <header className={`nav-root${scrolled ? ' scrolled' : ''}`} role="banner">
      <div className="nav-inner">
        {/* ─── LOGO ───────────────────────────────────────────
            Uses /public/images/logo.png if it exists.
            Falls back to styled text — no external CDN used.
            ✅ COPYRIGHT CLEAN: No filesafe.space or other
            3rd-party CDN URLs.
        ──────────────────────────────────────────────────── */}
        <button
          className="nav-logo"
          onClick={() => scrollTo('hero')}
          aria-label="Go to top"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE}/images/logo.png`}
            alt="Ace Smoke Shop"
            style={{ height: 44, width: 'auto', display: 'block', objectFit: 'contain' }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
          <LogoSVG />
        </button>

        <nav className="nav-links" aria-label="Main navigation">
          {([['Products','products'],['Gallery','gallery'],['About','about'],['Reviews','reviews'],['Find Us','contact']] as [string,string][]).map(([l, id]) => (
            <button key={id} className="nav-link" onClick={() => scrollTo(id)}>{l}</button>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="tel:8563025348" className="btn-primary nav-cta-d" style={{ padding: '9px 18px', fontSize: '.74rem', gap: 6 }}>
            <IcoPhone /> Call Now
          </a>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(p => !p)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 6 }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IcoX /> : <IcoMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          style={{ background: 'var(--white)', borderTop: '1px solid var(--border)', padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: 2 }}
          aria-label="Mobile navigation"
        >
          {([['Products','products'],['Gallery','gallery'],['About','about'],['Reviews','reviews'],['Find Us','contact']] as [string,string][]).map(([l, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '11px 4px', borderBottom: '1px solid var(--border2)', fontFamily: 'var(--font-b)', fontSize: '.9rem', color: 'var(--ink2)', fontWeight: 500 }}
            >
              {l}
            </button>
          ))}
          <a href="tel:8563025348" className="btn-primary" style={{ marginTop: 16, justifyContent: 'center' }}>
            <IcoPhone /> (856) 302-5348
          </a>
        </nav>
      )}
    </header>

    {/* ── HERO ─────────────────────────────────────────────── */}
    <section
      id="hero"
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(160deg,#faf5ed 0%,#f3ead8 40%,#ecdfd0 70%,#e6d8c8 100%)' }}
      aria-label="Hero"
    >
      {/* Ambient blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="amb-blob" style={{ width: 700, height: 700, top: '-5%', left: '-12%', background: 'radial-gradient(circle,rgba(184,92,24,.07)0%,transparent 65%)', animation: 'blobA 22s ease-in-out infinite' }} />
        <div className="amb-blob" style={{ width: 600, height: 600, bottom: '-5%', right: '-10%', background: 'radial-gradient(circle,rgba(212,119,58,.06)0%,transparent 65%)', animation: 'blobB 28s ease-in-out infinite' }} />
        <div className="amb-blob" style={{ width: 500, height: 500, top: '35%', left: '38%', background: 'radial-gradient(circle,rgba(184,92,24,.04)0%,transparent 65%)', animation: 'blobC 20s ease-in-out infinite' }} />
      </div>

      {/* Smoke canvas — z:2, behind content (z:4) */}
      <canvas
        ref={canvasRef}
        id="smoke-canvas"
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}
      />

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '38%', background: 'linear-gradient(to top,rgba(235,225,210,.5),transparent)', pointerEvents: 'none', zIndex: 3 }} />

      <div style={{ position: 'relative', zIndex: 4, width: '100%', textAlign: 'center', padding: '120px 32px 100px' }}>
        <span className="eyebrow" style={{ display: 'block', marginBottom: 22, fontSize: '.7rem' }}>
          Woodbury Heights, NJ &nbsp;·&nbsp; Open 7 Days
        </span>

        <div className="hero-title-wrap" style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span className="hero-ace">ACE</span>
          <span className="hero-smoke">SMOKE</span>
          <span className="hero-shop">SHOP</span>
        </div>

        <div style={{ width: 56, height: 3, background: 'linear-gradient(90deg,var(--amber),var(--amber3))', borderRadius: 2, margin: '30px auto 26px' }} />

        <p style={{ fontSize: 'clamp(.9rem,2vw,1.05rem)', color: 'var(--muted)', lineHeight: 1.8, maxWidth: 500, margin: '0 auto 38px', fontWeight: 300 }}>
          Glass pieces · Vapes · Hookah · CBD · Cigars · Accessories
          <br /><span style={{ fontSize: '.9em' }}>Expert staff · Loyalty rewards · Bitcoin ATM</span>
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => scrollTo('products')} style={{ fontSize: '.82rem', padding: '14px 34px', gap: 8 }}>
            Explore Products <IcoChevron />
          </button>
          <button className="btn-outline" onClick={() => scrollTo('contact')} style={{ fontSize: '.82rem', padding: '13px 28px' }}>
            Visit the Shop
          </button>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 40, padding: '12px 22px', background: 'rgba(255,255,255,.72)', border: '1px solid var(--border)', borderRadius: 40, backdropFilter: 'blur(8px)', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ color: '#d4851a', fontSize: '.95rem', letterSpacing: 2 }}>★★★★★</span>
          <span style={{ fontSize: '.82rem', color: 'var(--ink2)', fontWeight: 500 }}>
            <strong>4.7 / 5</strong>&nbsp;·&nbsp;114+ Reviews on Yelp
          </span>
        </div>
      </div>
    </section>

    {/* ── MARQUEE ───────────────────────────────────────────── */}
    <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '13px 0', overflow: 'hidden' }} aria-hidden="true">
      <div className="marquee-belt">
        {[...MARQUEE, ...MARQUEE].map((item, i) => (
          <span key={i} style={{ flexShrink: 0, paddingRight: 26, whiteSpace: 'nowrap', fontSize: '.68rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: item === '·' ? 'var(--amber)' : 'var(--muted)' }}>{item}</span>
        ))}
      </div>
    </div>

    {/* ── GALLERY ───────────────────────────────────────────── */}
    <section id="gallery" style={{ padding: '96px 0', background: 'var(--bg)' }} aria-labelledby="gallery-heading">
      <div className="sw" style={{ textAlign: 'center', marginBottom: 48 }}>
        <span className="eyebrow" style={{ marginBottom: 12 }}>Our Store</span>
        <h2 id="gallery-heading" className="section-title" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', marginBottom: 14 }}>See It In Person</h2>
        <div className="amber-bar" style={{ margin: '0 auto 18px' }} />
        <p style={{ fontSize: '.92rem', color: 'var(--muted)', lineHeight: 1.75, maxWidth: 440, margin: '0 auto' }}>
          Clean, organized, and beautifully stocked. Hover to pause · Click to enlarge.
        </p>
      </div>
      <div className="slider-shell">
        <div className="slider-belt">
          {slides.map((src, i) => (
            <Slide key={i} src={src} n={(i % PHOTOS.length) + 1} onClick={() => setLb(src)} />
          ))}
        </div>
      </div>
    </section>

    {/* ── PRODUCTS ──────────────────────────────────────────── */}
    <section id="products" style={{ padding: '96px 0', background: 'var(--bg2)' }} aria-labelledby="products-heading">
      <div className="sw">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow" style={{ marginBottom: 12 }}>What We Carry</span>
          <h2 id="products-heading" className="section-title" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', marginBottom: 14 }}>Our Product Range</h2>
          <div className="amber-bar" style={{ margin: '0 auto 18px' }} />
          <p style={{ fontSize: '.92rem', color: 'var(--muted)', lineHeight: 1.75, maxWidth: 480, margin: '0 auto' }}>
            Curated selection across every category. Something for everyone, every time.
          </p>
        </div>
        <div className="products-grid">
          {PRODUCTS.map(({ Icon, name, desc, tag }, i) => (
            <div key={i} className="pc">
              <div className="pc-icon"><Icon /></div>
              <h3>{name}</h3>
              <p>{desc}</p>
              <span className="pc-tag">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── STATS BAR ─────────────────────────────────────────── */}
    <div className="stats-bar" aria-label="Store statistics">
      <div className="stats-inner">
        {STATS.map(({ num, lbl }) => (
          <div key={lbl} className="stat-cell">
            <span className="stat-num">{num}</span>
            <span className="stat-lbl">{lbl}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ── ABOUT ─────────────────────────────────────────────── */}
    <section id="about" style={{ padding: '96px 0', background: 'var(--bg)' }} aria-labelledby="about-heading">
      <div className="sw">
        <div className="about-grid">
          <div>
            <span className="eyebrow" style={{ marginBottom: 16 }}>Who We Are</span>
            <h2 id="about-heading" className="section-title" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', marginBottom: 4 }}>More Than</h2>
            <h2 className="section-title" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', color: 'var(--amber)' }}>a Smoke Shop</h2>
            <div className="amber-bar" style={{ margin: '20px 0' }} />
            <p style={{ fontSize: '.95rem', color: 'var(--muted)', lineHeight: 1.85, marginBottom: 18 }}>
              Ace Smoke Shop has been Woodbury Heights&apos; premier destination since 2020. We built our reputation on an impressive selection, honest prices, and a team that genuinely cares about your experience.
            </p>
            <p style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.85, marginBottom: 32 }}>
              Whether you&apos;re new to smoke shops or an enthusiast hunting for something specific — our staff are here to help. No pressure, no upsells, just real friendly guidance.
            </p>
            <div className="yelp-callout">
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--amber-bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--amber)' }}>
                <IcoStar />
              </div>
              <div>
                <p style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 4 }}>Yelp Exclusive</p>
                <p style={{ fontSize: '.9rem', color: 'var(--ink2)', fontWeight: 500 }}>Mention Yelp when you visit for an exclusive discount!</p>
              </div>
            </div>
            <div style={{ marginTop: 28 }}>
              {/*
                ✅ FOLLOW & REVIEW LINKS: These are plain hyperlinks to public business profiles.
                   Linking to another website is NOT a copyright issue — it is standard web practice.
                   Facebook, Instagram, Yelp, and acesmokeshops.com are the business owner's own profiles.
              */}
              <a href="https://www.yelp.com/biz/ace-smoke-shop-woodbury-heights" target="_blank" rel="noopener noreferrer" className="btn-text" style={{ textDecoration: 'none' }}>
                Read All Reviews on Yelp <IcoChevron />
              </a>
            </div>
          </div>
          <div className="feature-grid">
            {FEATURES.map(({ Icon, label, detail }, i) => (
              <div key={i} className="feature-tile">
                <div className="ft-icon"><Icon /></div>
                <div><h4>{label}</h4><p>{detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <hr className="rule" />

    {/* ── REVIEWS ───────────────────────────────────────────── */}
    <section id="reviews" style={{ padding: '96px 0', background: 'var(--bg2)' }} aria-labelledby="reviews-heading">
      <div className="sw">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow" style={{ marginBottom: 12 }}>Customer Reviews</span>
          <h2 id="reviews-heading" className="section-title" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', marginBottom: 14 }}>What People Say</h2>
          <div className="amber-bar" style={{ margin: '0 auto 20px' }} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '12px 24px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <span style={{ color: '#d4851a', fontSize: '1.05rem', letterSpacing: 2 }}>★★★★★</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', lineHeight: 1 }}>4.7 / 5.0</div>
              <div style={{ fontSize: '.72rem', color: 'var(--muted)', marginTop: 2 }}>114+ verified Yelp reviews</div>
            </div>
          </div>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <article key={i} className="review-card">
              <span className="r-quote">&ldquo;</span>
              <span className="r-stars" aria-label={`${r.stars} stars`}>{'★'.repeat(r.stars)}</span>
              <p className="r-text">&ldquo;{r.text}&rdquo;</p>
              <div className="r-meta">
                <div className="r-avatar" aria-hidden="true">{r.init}</div>
                <div>
                  <div className="r-name">{r.name}</div>
                  <div className="r-date">{r.date} · Yelp</div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href="https://www.yelp.com/biz/ace-smoke-shop-woodbury-heights" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-flex', textDecoration: 'none' }}>
            Read All Reviews on Yelp <IcoChevron />
          </a>
        </div>
      </div>
    </section>

    {/* ── CTA BAND ──────────────────────────────────────────── */}
    <div className="cta-band">
      <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <span className="eyebrow" style={{ color: 'var(--amber3)', marginBottom: 16 }}>Ready to Shop?</span>
        <h2 className="section-title" style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', color: '#fff', marginBottom: 18, marginTop: 8 }}>Come Visit Us In Store</h2>
        <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '.95rem', lineHeight: 1.8, maxWidth: 480, margin: '0 auto 36px' }}>
          722 Mantua Pike, Unit #7, Woodbury Heights NJ. Browse our full selection, speak to our staff, and take advantage of our loyalty program.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:8563025348" className="btn-primary" style={{ fontSize: '.85rem', padding: '14px 32px' }}><IcoPhone /> Call — (856) 302-5348</a>
          <a href="mailto:viraj@theacedist.com" className="btn-outline" style={{ fontSize: '.85rem', padding: '13px 28px', borderColor: 'rgba(255,255,255,.25)', color: 'rgba(255,255,255,.8)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7 }}><IcoMail /> Email Us</a>
        </div>
        <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.28)', marginTop: 24, letterSpacing: '.06em' }}>
          Mon–Wed 9AM–9PM &nbsp;·&nbsp; Thu–Sat 9AM–10PM &nbsp;·&nbsp; Sun 10AM–8PM
        </p>
      </div>
    </div>

    {/* ── CONTACT ───────────────────────────────────────────── */}
    <section id="contact" style={{ padding: '96px 0', background: 'var(--bg)' }} aria-labelledby="contact-heading">
      <div className="sw">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow" style={{ marginBottom: 12 }}>Location &amp; Hours</span>
          <h2 id="contact-heading" className="section-title" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', marginBottom: 14 }}>Find Us</h2>
          <div className="amber-bar" style={{ margin: '0 auto' }} />
        </div>

        <div className="contact-grid">
          {/* Hours card */}
          <div className="contact-card">
            <div className="contact-title"><span className="ci"><IcoClock /></span>Store Hours</div>
            <table className="h-tbl" aria-label="Store hours">
              <tbody>
                {HOURS.map((h, i) => (
                  <tr key={i} className={i === today ? 'tod' : ''}>
                    <td className="dn">{h.day}{i === today && <span className="tbadge">Today</span>}</td>
                    <td className="dt">{h.open} – {h.close}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Contact info card */}
          <div className="contact-card">
            <div className="contact-title"><span className="ci"><IcoPin /></span>Contact Info</div>

            <div className="info-row">
              <span className="info-lbl">Address</span>
              <a href="https://maps.google.com/?q=722+Mantua+Pike+Unit+7+Woodbury+Heights+NJ+08097" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.9rem', color: 'var(--ink)', textDecoration: 'none', lineHeight: 1.7, display: 'block' }}>
                722 Mantua Pike, Unit #7<br />Woodbury Heights, NJ 08097
              </a>
            </div>

            <div className="info-row">
              <span className="info-lbl">Phone</span>
              <a href="tel:8563025348" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--amber)', textDecoration: 'none' }}>(856) 302-5348</a>
            </div>

            <div className="info-row">
              <span className="info-lbl">Email</span>
              <a href="mailto:viraj@theacedist.com" style={{ fontSize: '.9rem', color: 'var(--ink2)', textDecoration: 'none' }}>viraj@theacedist.com</a>
            </div>

            <div className="info-row">
              {/*
                ✅ FOLLOW & REVIEW BUTTONS — COPYRIGHT CLEAN:
                   These are standard hyperlinks to publicly accessible business profiles.
                   Facebook, Instagram, Yelp = the business's own social pages.
                   "Join Us" = links to acesmokeshops.com (business's own affiliate/loyalty site).
                   Linking to another website is NOT copyright infringement.
                   No logos, icons, or brand assets from those sites are used — only text.
              */}
              <span className="info-lbl">Follow &amp; Review</span>
              <div>
                {([
                  ['Facebook', 'https://www.facebook.com/people/Ace-Smoke-Shop/100063747595584/'],
                  ['Instagram', 'https://www.instagram.com/acesmokeshop/'],
                  ['Yelp', 'https://www.yelp.com/biz/ace-smoke-shop-woodbury-heights'],
                ] as [string, string][]).map(([n, h]) => (
                  <a key={n} href={h} target="_blank" rel="noopener noreferrer" className="social-pill">{n}</a>
                ))}
                {/* "Join Us" links to the business owner's own loyalty/affiliate website — no copyright issue */}
                <a href="https://join.acesmokeshops.com/" target="_blank" rel="noopener noreferrer" className="social-pill">Join Us</a>
              </div>
            </div>
          </div>

          {/* Contact form card */}
          <div className="contact-card">
            <div className="contact-title"><span className="ci"><IcoMail /></span>Send a Message</div>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }} role="status" aria-live="polite">
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--amber-bg)', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IcoCheck />
                </div>
                <p style={{ fontFamily: 'var(--font-d)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>Message Sent!</p>
                <p style={{ fontSize: '.88rem', color: 'var(--muted)' }}>We&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }} noValidate>
                {([
                  { k: 'name',  l: 'Your Name',       t: 'text',  p: 'John Doe',        r: true  },
                  { k: 'email', l: 'Email Address',    t: 'email', p: 'you@email.com',   r: true  },
                  { k: 'phone', l: 'Phone (optional)', t: 'tel',   p: '(xxx) xxx-xxxx',  r: false },
                ] as { k: keyof typeof form; l: string; t: string; p: string; r: boolean }[]).map(f => (
                  <div key={f.k} className="fg">
                    <label className="fl" htmlFor={`field-${f.k}`}>{f.l}</label>
                    <input
                      id={`field-${f.k}`}
                      type={f.t}
                      className="fi"
                      placeholder={f.p}
                      required={f.r}
                      value={form[f.k]}
                      onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                      autoComplete={f.k === 'email' ? 'email' : f.k === 'phone' ? 'tel' : 'name'}
                    />
                  </div>
                ))}
                <div className="fg">
                  <label className="fl" htmlFor="field-msg">Message</label>
                  <textarea
                    id="field-msg"
                    className="fi"
                    rows={4}
                    placeholder="How can we help?"
                    required
                    style={{ resize: 'none' }}
                    value={form.msg}
                    onChange={e => setForm({ ...form, msg: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', gap: 8 }}>
                  Send Message <IcoChevron />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Google Maps embed */}
        <div style={{ borderRadius: 'var(--r)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', marginTop: 8 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3062.0!2d-75.149!3d39.823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6db3849ca0cfd%3A0xe0bc7a6ae819c923!2sAce%20Smoke%20Shop!5e0!3m2!1sen!2sus!4v1&q=722+Mantua+Pike+Woodbury+Heights+NJ+08097"
            width="100%"
            height="420"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ace Smoke Shop on Google Maps"
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <a href="https://maps.google.com/?q=722+Mantua+Pike+Unit+7+Woodbury+Heights+NJ+08097" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', textDecoration: 'none' }}>
            <IcoPin /> Open in Google Maps
          </a>
        </div>
      </div>
    </section>

    {/* ── FOOTER ────────────────────────────────────────────── */}
    <footer className="footer-root" role="contentinfo">
      <div className="footer-grid">
        <div>
          <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.55rem', fontWeight: 800, color: '#fff', letterSpacing: '-.01em', marginBottom: 14 }}>
            <span className="blink" style={{ color: 'var(--amber2)', display: 'inline-block' }}>ACE</span>
            <span style={{ color: 'var(--amber3)', margin: '0 6px' }}>·</span>
            <span className="blink" style={{ fontSize: '.95rem', fontWeight: 600, opacity: .8, display: 'inline-block' }}>SMOKE SHOP</span>
          </div>
          <p style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.35)', lineHeight: 1.8, maxWidth: 220 }}>
            Premier smoke &amp; vape destination in Woodbury Heights, NJ. Quality products, expert staff, open 7 days.
          </p>
        </div>

        <div>
          <span className="fh">Navigate</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {([['Products','products'],['Gallery','gallery'],['About','about'],['Reviews','reviews'],['Find Us','contact']] as [string,string][]).map(([l, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '.85rem', color: 'rgba(255,255,255,.4)', padding: 0, fontFamily: 'var(--font-b)', transition: 'color .2s' }}
                onMouseOver={e => (e.currentTarget.style.color = 'rgba(255,255,255,.85)')}
                onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,.4)')}
              >{l}</button>
            ))}
          </div>
        </div>

        <div>
          <span className="fh">Contact</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <span style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.4)', lineHeight: 1.7 }}>722 Mantua Pike, Unit #7<br />Woodbury Heights, NJ 08097</span>
            <a href="tel:8563025348" style={{ fontSize: '.9rem', color: 'var(--amber2)', textDecoration: 'none', fontWeight: 600 }}>(856) 302-5348</a>
            <a href="mailto:viraj@theacedist.com" style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.38)', textDecoration: 'none' }}>viraj@theacedist.com</a>
          </div>
        </div>

        <div>
          <span className="fh">Hours</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Mon – Wed: 9 AM – 9 PM', 'Thu – Sat:  9 AM – 10 PM', 'Sunday: 10 AM – 8 PM'].map(h => (
              <span key={h} style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.38)' }}>{h}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bot">
        <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.22)' }}>
          © {new Date().getFullYear()} Ace Smoke Shop · All Rights Reserved
        </p>
        <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.22)' }}>
          Must be 21+ to purchase tobacco &amp; vape products. Please consume responsibly.
        </p>
        <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          Designed &amp; Developed by&nbsp;
          <a
            href="https://www.smartopstechnologies.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,.5)', transition: 'color .2s', textDecoration: 'none', fontWeight: 600, letterSpacing: '.04em' }}
            onMouseOver={e => (e.currentTarget.style.color = 'rgba(255,255,255,.85)')}
            onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,.5)')}
          >
            <img
              src={`${BASE}/images/smartops_logo_only.png`}
              alt="SmartOps Technologies"
              className="blink"
              style={{ height: 18, width: 'auto', display: 'block', objectFit: 'contain', opacity: 0.6 }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
            <span className="blink">SmartOps Technologies</span>
          </a>
        </p>
      </div>
    </footer>
    </>
  )
}
