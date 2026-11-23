import { useEffect, useRef } from "react";
import { FlightsSection, EsimSection, HotelsSection } from "./components/TravelSections";
const logo = { url: "./logo.webp" };
import { Search, Gift, Smartphone, Wifi, Hotel, Plane, Zap, ShieldCheck, Globe, ArrowRight, Wallet, Mail, ChevronLeft, ChevronRight } from "lucide-react";

const TITLE = "SwiftRecharge — Buy Gift Cards, Mobile Top-Up, eSIMs, Hotels & Flights with Crypto";
const DESC = "Spend Bitcoin, USDT, ETH and 200+ coins on gift cards, mobile top-ups, travel eSIMs, hotels and flights. Instant delivery, worldwide.";

const SITE = "https://swiftrecharge.com";
const OG = SITE + "/og-image.jpg";
const LD = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", name: "SwiftRecharge", url: SITE, logo: SITE + "/favicon.png" },
    { "@type": "WebSite", name: "SwiftRecharge", url: SITE, description: DESC },
    { "@type": "OnlineStore", name: "SwiftRecharge", url: SITE, paymentAccepted: "Bitcoin, Ethereum, USDT, USDC, Solana, 200+ cryptocurrencies",
      hasOfferCatalog: { "@type": "OfferCatalog", name: "Crypto shopping", itemListElement: ["Gift cards", "Mobile top-up", "Travel eSIM", "Hotels", "Flights"].map((n) => ({ "@type": "OfferCatalog", name: n })) } },
  ],
};

const cards = [
  { n: "Uber", t: "Rides & Eats", slug: "uber", bg: "linear-gradient(150deg,#2b2b2b,#000)" },
  { n: "Apple", t: "App Store", slug: "apple", bg: "linear-gradient(150deg,#5b5b66,#1c1c22)" },
  { n: "Google Play", t: "Apps & Games", slug: "googleplay", bg: "linear-gradient(150deg,#1fa463,#0b5d3a)" },
  { n: "Steam", t: "Games", slug: "steam", bg: "linear-gradient(150deg,#2a475e,#0b1a2a)" },
  { n: "PlayStation", t: "Store", slug: "playstation", bg: "linear-gradient(150deg,#1f6fe0,#0a2c74)" },
  { n: "Roblox", t: "Robux", slug: "roblox", bg: "linear-gradient(150deg,#e2231a,#6e0f0b)" },
  { n: "Airbnb", t: "Travel", slug: "airbnb", bg: "linear-gradient(150deg,#ff5a5f,#a3203b)" },
  { n: "Netflix", t: "Streaming", slug: "netflix", bg: "linear-gradient(150deg,#e50914,#3a0003)" },
  { n: "Spotify", t: "Premium", slug: "spotify", bg: "linear-gradient(150deg,#1ed760,#0a5a29)" },
];
const coins = [["Bitcoin","BTC"],["Ethereum","ETH"],["Tether","USDT"],["USD Coin","USDC"],["Solana","SOL"],["XRP","XRP"],["BNB","BNB"],["Cardano","ADA"],["Dogecoin","DOGE"],["Litecoin","LTC"],["Tron","TRX"]] as const;
const cats = [
  { i: Gift, t: "Gift Cards", d: "4,000+ brands from Amazon to Steam, delivered in seconds." },
  { i: Smartphone, t: "Mobile Top-Up", d: "Recharge any prepaid phone in 150+ countries and 800+ operators." },
  { i: Wifi, t: "Travel eSIM", d: "Instant data plans in 190+ destinations. No roaming fees." },
  { i: Hotel, t: "Hotels", d: "Over 2 million properties worldwide at member prices." },
  { i: Plane, t: "Flights", d: "Search 900+ airlines and pay for your ticket in crypto." },
];

export default function App() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const st = useRef({ angle: 0, target: null as number | null, paused: false, drag: null as null | { x: number; a: number } });
  const ring = Array.from({ length: 5 }, () => cards).flat();
  const STEP = 360 / ring.length;
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const R = 900;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const s = st.current;
      if (s.target !== null) {
        const d = s.target - s.angle;
        s.angle += d * 0.1;
        if (Math.abs(d) < 0.02) { s.angle = s.target; s.target = null; }
      } else if (!s.paused && !s.drag) {
        s.angle -= dt * 0.0025;
      }
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        let a = (((i * STEP + s.angle) % 360) + 540) % 360 - 180;
        const abs = Math.abs(a);
        if (abs > 62) { el.style.visibility = "hidden"; return; }
        el.style.visibility = "visible";
        const rad = (a * Math.PI) / 180;
        const x = R * Math.sin(rad);
        const y = R * (1 - Math.cos(rad));
        const lift = Math.max(0, 1 - abs / (STEP * 1.2));
        const sc = 1 + 0.2 * lift - Math.min(abs / 60, 1) * 0.08;
        el.style.transform = `translate(-50%, 0) translate(${x}px, ${y - 40 * lift}px) rotate(${a * 0.85}deg) scale(${sc})`;
        el.style.zIndex = String(1000 - Math.round(abs * 10));
        el.style.filter = `brightness(${1 - Math.min(abs / 60, 1) * 0.6})`;
        el.style.opacity = String(abs > 48 ? (62 - abs) / 14 : 1);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [STEP]);
  const step = (d: number) => {
    const s = st.current;
    const base = Math.round((s.target ?? s.angle) / STEP) * STEP;
    s.target = base - d * STEP;
  };
  const onDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    st.current.target = null;
    st.current.drag = { x: e.clientX, a: st.current.angle };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = st.current.drag;
    if (d) st.current.angle = d.a + (e.clientX - d.x) * 0.06;
  };
  const onUp = () => {
    const s = st.current;
    if (!s.drag) return;
    s.drag = null;
    s.target = Math.round(s.angle / STEP) * STEP;
  };
  return (
    <div className="min-h-screen overflow-x-hidden">
      <header className="sticky top-4 z-50 mx-3 mt-4 flex max-w-6xl items-center md:mx-auto justify-between gap-4 rounded-full border bg-background/70 px-5 py-2.5 backdrop-blur-xl">
        <a href="/" className="flex items-center" aria-label="SwiftRecharge home">
          <img src={logo.url} alt="SwiftRecharge" className="h-7 w-auto sm:h-8" />
        </a>
        <nav className="hidden gap-2 text-sm font-medium lg:flex">
          {[["Gift cards","#categories"],["Mobile","#categories"],["eSIM","#esim"],["Hotels","#hotels"],["Flights","#flights"]].map(([x, h]) => <a key={x} href={h} className="glass-silver whitespace-nowrap rounded-full px-4 py-1.5">{x}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Language" className="glass-silver hidden h-9 w-9 place-items-center rounded-full sm:grid"><Globe className="h-4 w-4" /></button>
          <a href="#categories" className="glass-silver whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium">Sign in</a>
        </div>
      </header>
      <nav aria-label="Services" className="relative z-40 mx-auto mt-3 flex max-w-full gap-2 overflow-x-auto px-4 pb-1 text-sm font-medium [scrollbar-width:none] lg:hidden">
        {[["Gift cards","#categories"],["Mobile","#categories"],["eSIM","#esim"],["Hotels","#hotels"],["Flights","#flights"]].map(([x, h]) => <a key={x} href={h} className="glass-silver shrink-0 rounded-full px-4 py-1.5">{x}</a>)}
      </nav>

      <section className="hero-glow relative -mt-20 pt-36">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-5xl font-medium leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">Top up life<br />with crypto.</h1>
          <p className="mx-auto mt-6 max-w-md text-muted-foreground">Gift cards, mobile top-ups, eSIMs, hotels and flights — paid in Bitcoin, USDT and 200+ coins.</p>
        </div>

        <div
          className="relative mx-auto mt-2 h-[480px] w-full cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing [mask-image:linear-gradient(180deg,black_75%,transparent)]"
          onMouseEnter={() => (st.current.paused = true)}
          onMouseLeave={() => { st.current.paused = false; onUp(); }}
          onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
        >
          {ring.map((c, i) => (
            <div key={i} ref={(el) => { cardRefs.current[i] = el; }} className="absolute left-1/2 top-16 origin-center will-change-transform" style={{ visibility: "hidden" }}>
              <div className="relative flex h-[250px] w-[180px] flex-col overflow-hidden rounded-[22px] p-2 ring-1 ring-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_24px_40px_-10px_rgba(0,0,0,0.9),0_0_0_1px_rgba(0,0,0,0.5)]" style={{ background: c.bg }}>
                <div className="relative grid h-[110px] place-items-center overflow-hidden rounded-[16px] bg-white/10 ring-1 ring-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20" />
                  <img src={`https://cdn.simpleicons.org/${c.slug}/white`} alt={`${c.n} logo`} draggable={false} className="relative h-14 w-14 drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]" loading="lazy" />
                </div>
                <div className="mt-3 px-2 text-lg font-semibold leading-tight">{c.n}</div>
                <div className="mx-2 mt-auto flex justify-between border-t border-white/20 pt-2 pb-1 text-xs opacity-85"><span>{c.t}</span><span className="font-semibold">Gift card</span></div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-[1100] mx-auto -mt-24 flex max-w-2xl items-center gap-3 px-4">
          <button onClick={() => step(-1)} aria-label="Previous" className="hidden h-10 w-10 place-items-center glass-silver rounded-full sm:grid"><ChevronLeft className="h-4 w-4" /></button>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-1 items-center gap-2 rounded-full border bg-card/90 p-1.5 backdrop-blur">
            <span className="glass-silver rounded-full px-4 py-2 text-sm font-medium">Search</span>
            <input placeholder="Amazon, Steam, eSIM Europe, flights to Dubai…" className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground" />
            <button aria-label="Search" className="grid h-10 w-10 place-items-center glass-silver rounded-full"><Search className="h-4 w-4" /></button>
          </form>
          <button onClick={() => step(1)} aria-label="Next" className="hidden h-10 w-10 place-items-center glass-silver rounded-full sm:grid"><ChevronRight className="h-4 w-4" /></button>
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground">Pay with 200+ coins, on-chain or straight from your exchange</p>
        <div className="relative mt-4 overflow-hidden pb-16 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee flex w-max gap-3">
            {[...coins, ...coins].map(([n, s], i) => (
              <div key={i} className="flex items-center gap-2 rounded-full border bg-card/60 px-4 py-2 text-sm">
                <img src={`https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/${s.toLowerCase()}.svg`} alt={n} className="h-6 w-6" loading="lazy" />
                {n} <span className="text-muted-foreground">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-4xl font-medium tracking-tight">Everything you need, <span className="text-muted-foreground">one checkout.</span></h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {cats.map(({ i: I, t, d }) => (
            <a key={t} href="#categories" className="group rounded-2xl border bg-gradient-to-b from-card to-background p-6 transition hover:-translate-y-1 hover:border-primary/50">
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-primary/30 to-accent/20 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition group-hover:shadow-[0_0_30px_-5px] group-hover:shadow-primary/60"><I className="h-5 w-5" strokeWidth={1.75} /></span>
              <h3 className="mt-5 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              <ArrowRight className="mt-4 h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
            </a>
          ))}
        </div>
      </section>

      <FlightsSection />
      <EsimSection />
      <HotelsSection />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[[Wallet,"1. Pick it","Choose a gift card, top-up, eSIM, hotel or flight."],[Zap,"2. Pay in crypto","Send from any wallet or exchange in 200+ coins."],[Mail,"3. Get it instantly","Codes and confirmations land in your inbox in seconds."]].map(([I, t, d]) => {
            const Icon = I as typeof Zap;
            return (
              <div key={t as string} className="rounded-2xl border bg-gradient-to-b from-card to-background p-8">
                <Icon className="h-6 w-6 text-accent" />
                <h3 className="mt-6 text-2xl font-medium">{t as string}</h3>
                <p className="mt-2 text-muted-foreground">{d as string}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 rounded-2xl border bg-card p-8 text-center md:grid-cols-4">
          {[["200+","Cryptocurrencies"],["4,000+","Brands"],["180+","Countries"],["24/7","Support"]].map(([a, b]) => (
            <div key={b}><div className="text-4xl font-semibold text-primary">{a}</div><div className="mt-1 text-sm text-muted-foreground">{b}</div></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="hero-glow rounded-3xl border bg-card p-12 text-center">
          <ShieldCheck className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">Your crypto. Real-world value.</h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">No bank, no card, no borders. Just instant delivery.</p>
          <a href="#categories" className="mt-8 inline-flex items-center gap-2 glass-silver rounded-full px-6 py-3 font-medium">Start shopping <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>

      <footer className="border-t py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground md:flex-row">
          <img src={logo.url} alt="SwiftRecharge" className="h-6 w-auto" />
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2"><a href="#categories">Gift cards</a><a href="#categories">Mobile top-up</a><a href="#esim">eSIM</a><a href="#hotels">Hotels</a><a href="#flights">Flights</a></div>
          <span>© 2026 SwiftRecharge.com</span>
        </div>
      </footer>
    </div>
  );
}
