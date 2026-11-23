import { useEffect, useMemo, useState } from "react";
import { Plane, ArrowLeftRight, ArrowRight, Search, MapPin, CalendarDays, Users, Video, Share2, Phone, Headphones, Compass, Laptop, RotateCcw, User, Globe2, Zap, BadgeCheck, Wallet } from "lucide-react";

const img = (slug: string, _w?: number) => `/cities/${slug}.webp`;
const CITY = {
  Dubai: "dubai", London: "london", Paris: "paris", Tokyo: "tokyo", Istanbul: "istanbul",
  Singapore: "singapore", "New York": "newyork", Bangkok: "bangkok",
} as const;

const routes = [
  { c: "Dubai", k: "UAE", f: "LHR", t: "DXB", fc: "London" }, { c: "London", k: "United Kingdom", f: "DXB", t: "LHR", fc: "Dubai" },
  { c: "Paris", k: "France", f: "JFK", t: "CDG", fc: "New York" }, { c: "Tokyo", k: "Japan", f: "SIN", t: "HND", fc: "Singapore" },
  { c: "Istanbul", k: "Türkiye", f: "FRA", t: "IST", fc: "Frankfurt" }, { c: "Singapore", k: "Singapore", f: "SYD", t: "SIN", fc: "Sydney" },
] as const;

function Field({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return <div className="min-w-0 flex-1 px-5 py-2"><div className="text-xs text-muted-foreground">{label}</div><div className={`truncate ${muted ? "text-muted-foreground" : ""}`}>{value}</div></div>;
}

export function FlightsSection() {
  const [i, setI] = useState(2);
  const [paused, setPaused] = useState(false);
  useEffect(() => { if (paused) return; const t = setInterval(() => setI((x) => (x + 1) % routes.length), 5000); return () => clearInterval(t); }, [paused]);
  const r = routes[i]!;
  return (
    <section id="flights" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20">
      <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">Book the whole trip <span className="text-muted-foreground">in crypto</span></h2>
      <p className="mt-3 max-w-xl text-muted-foreground">Flights on 900+ airlines, paid with Bitcoin, USDT, ETH and 200+ coins.</p>
      <div className="mt-8 flex flex-col items-stretch gap-2 rounded-3xl border bg-card p-2 lg:flex-row lg:items-center lg:rounded-full">
        <Field label="From" value={`${r.fc} (${r.f})`} />
        <span className="glass-silver mx-auto grid h-10 w-10 shrink-0 max-lg:rotate-90 place-items-center rounded-full"><ArrowLeftRight className="h-4 w-4" /></span>
        <Field label="To" value={`${r.c} (${r.t})`} />
        <Field label="Dates" value="Add dates" muted />
        <Field label="Travellers" value="1 adult, Economy" />
        <a href="#flights" className="glass-silver inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium">Search flights <ArrowRight className="h-4 w-4" /></a>
      </div>
      <div className="mt-6 flex h-[360px] gap-3 sm:h-[460px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {routes.map((x, n) => {
          const on = n === i;
          return (
            <button key={x.c} onClick={() => setI(n)} aria-label={`Flights to ${x.c}`}
              className={`group relative overflow-hidden rounded-3xl border text-left transition-[flex-grow] duration-700 ease-out ${on ? "grow-[6]" : "hidden grow sm:block"}`} style={{ flexBasis: 0 }}>
              <img src={img(CITY[x.c], on ? 1400 : 500)} alt={`${x.c}, ${x.k}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
              {on ? (
                <>
                  <span className="absolute left-5 top-5 rounded-full bg-background/70 px-3 py-1.5 text-sm backdrop-blur"><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" />Popular route</span>
                  <div className="absolute bottom-6 left-6"><div className="text-sm text-muted-foreground">{x.k}</div><div className="text-5xl font-medium sm:text-6xl">{x.c}</div></div>
                  <div className="absolute bottom-6 right-6 hidden w-80 rounded-2xl border bg-background/75 p-5 backdrop-blur-xl md:block">
                    <div className="flex items-center gap-3 text-2xl font-medium"><span>{x.f}</span><span className="flex-1 border-t border-dashed border-muted-foreground/50" /><Plane className="h-4 w-4" /><span className="flex-1 border-t border-dashed border-muted-foreground/50" /><span>{x.t}</span></div>
                    <div className="mt-4 flex items-center justify-between border-t border-dashed pt-4 text-sm text-muted-foreground">Any airline<span className="glass-silver rounded-full px-4 py-1.5 text-foreground">Search →</span></div>
                  </div>
                </>
              ) : (
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rotate-180 whitespace-nowrap text-lg font-medium [writing-mode:vertical-rl]">{x.c}</span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-6 flex items-center gap-4 text-sm"><span className="tabular-nums">{String(i + 1).padStart(2, "0")} <span className="text-muted-foreground">/ 0{routes.length}</span></span>
        <div className="flex flex-1 gap-2">{routes.map((_, n) => <span key={n} className={`h-0.5 flex-1 rounded ${n <= i ? "bg-foreground" : "bg-muted"}`} />)}</div></div>
    </section>
  );
}

const acts = [
  { k: "video", t: "Watching Video", s: "Netflix, YouTube, Disney+, Prime Video", i: Video, gb: 1.5, c: "oklch(0.72 0.14 230)" },
  { k: "social", t: "Social Media", s: "TikTok, Instagram, Facebook, Photos", i: Share2, gb: 0.7, c: "oklch(0.65 0.18 280)" },
  { k: "calls", t: "Calls and Messaging", s: "WhatsApp, FaceTime, Zoom, Telegram", i: Phone, gb: 0.25, c: "oklch(0.72 0.16 155)" },
  { k: "music", t: "Music and Podcasts", s: "Spotify, Apple Music, Podcasts", i: Headphones, gb: 0.12, c: "oklch(0.8 0.15 75)" },
  { k: "web", t: "Browsing, Maps and Apps", s: "Web, email, maps, ride apps, games", i: Compass, gb: 0.15, c: "oklch(0.75 0 0)" },
  { k: "hot", t: "Laptop or Tablet Hotspot", s: "Sharing the eSIM with another device", i: Laptop, gb: 1, c: "oklch(0.7 0.12 20)" },
] as const;
const DEF = [0.5, 1.5, 0.5, 1, 2, 0];
const countries = ["Türkiye", "United States", "Japan", "Thailand", "United Kingdom", "France", "UAE", "Spain", "Italy", "Indonesia", "Mexico", "Germany"];

export function EsimSection() {
  const [days, setDays] = useState(7);
  const [ppl, setPpl] = useState(1);
  const [h, setH] = useState<number[]>(DEF);
  const [dest, setDest] = useState("");
  const per = acts.map((a, n) => a.gb * (h[n] ?? 0) * days * ppl);
  const total = per.reduce((a, b) => a + b, 0);
  const rec = useMemo(() => [1, 3, 5, 10, 20, 30, 50, 100].find((g) => g >= total) ?? 100, [total]);
  const hrs = h.reduce((a, b) => a + b, 0);
  return (
    <section id="esim" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20">
      <div className="text-center">
        <span className="glass-silver rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em]">Data calculator</span>
        <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-medium tracking-tight sm:text-5xl">Tell us what your normal day looks like — we'll find the right eSIM</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Travel eSIMs for 190+ destinations. Install in minutes, pay in crypto, no roaming fees.</p>
      </div>
      <div className="mt-10 grid gap-4 rounded-[2rem] border bg-card/60 p-4 lg:grid-cols-[1fr_300px] lg:p-6">
        <div className="rounded-3xl border bg-background/60 p-5">
          <div className="flex items-center justify-between"><span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Trip profile</span>
            <button onClick={() => { setDays(7); setPpl(1); setH(DEF); setDest(""); }} className="glass-silver inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs"><RotateCcw className="h-3 w-3" />Reset</button></div>
          <div className="mt-4 flex items-center gap-3 rounded-2xl border bg-card px-4 py-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <input list="esim-countries" value={dest} onChange={(e) => setDest(e.target.value)} placeholder="Where are you flying? Search a country…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            <datalist id="esim-countries">{countries.map((c) => <option key={c} value={c} />)}</datalist>
            <span className="hidden rounded-md border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground sm:inline">190+ destinations</span>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div><div className="flex justify-between text-sm"><span>Trip length</span><span className="rounded-md border px-2 font-mono text-xs leading-6">{days} days</span></div>
              <input type="range" min={1} max={30} value={days} onChange={(e) => setDays(+e.target.value)} aria-label="Trip length" className="mt-4 w-full accent-[oklch(0.85_0_0)]" /></div>
            <div><div className="flex justify-between text-sm"><span>People sharing eSIM</span><span className="rounded-md border px-2 font-mono text-xs leading-6">{ppl === 1 ? "Just you" : `${ppl} people`}</span></div>
              <div className="mt-3 flex gap-2">{[1, 2, 3, 4, 5, 6].map((n) => <button key={n} onClick={() => setPpl(n)} aria-label={`${n} people`} className={`grid h-9 flex-1 place-items-center rounded-lg border ${n <= ppl ? "glass-silver" : "text-muted-foreground"}`}><User className="h-4 w-4" /></button>)}</div></div>
          </div>
          <div className="mt-8 flex justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground"><span>A day on your phone</span><span className="hidden sm:inline">Hours per day</span></div>
          <div className="mt-3 space-y-3">
            {acts.map((a, n) => {
              const I = a.i; const v = h[n] ?? 0;
              return (
                <div key={a.k} className="grid grid-cols-[auto_1fr_3rem] items-center gap-3 sm:grid-cols-[auto_14rem_1fr_3rem]">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border"><I className="h-4 w-4" style={{ color: a.c }} /></span>
                  <div className="min-w-0 sm:block"><div className="truncate text-sm font-medium">{a.t}</div><div className="hidden truncate text-xs text-muted-foreground sm:block">{a.s}</div></div>
                  <input type="range" min={0} max={8} step={0.5} value={v} onChange={(e) => setH(h.map((x, m) => (m === n ? +e.target.value : x)))} aria-label={a.t} className="col-span-3 w-full sm:col-span-1" style={{ accentColor: a.c }} />
                  <span className="text-right font-mono text-sm max-sm:col-start-3 max-sm:row-start-1">{v}h</span>
                </div>
              );
            })}
          </div>
          <p className="mt-5 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">Daily screen time · {hrs}h per person</p>
        </div>
        <div className="flex flex-col rounded-3xl border bg-background/60 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Estimated data</div>
          <div className="mt-2 text-5xl font-semibold tabular-nums">{total < 10 ? total.toFixed(1) : Math.round(total)} GB</div>
          <div className="text-sm text-muted-foreground">{days} days · {ppl === 1 ? "just you" : `${ppl} people`}</div>
          <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-muted">{per.map((p, n) => <span key={n} style={{ width: `${total ? (p / total) * 100 : 0}%`, background: acts[n]!.c }} className="transition-all duration-500" />)}</div>
          <ul className="mt-5 space-y-2 text-sm">{acts.map((a, n) => <li key={a.k} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: a.c }} /><span className="flex-1 truncate">{a.t}</span><span className="font-mono text-xs text-muted-foreground">{(per[n] ?? 0).toFixed(1)} GB</span></li>)}</ul>
          <div className="mt-auto pt-6"><div className="rounded-2xl border border-dashed p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Recommended eSIM</div>
            <div className="mt-1 font-medium">{dest ? `${dest} · ${rec} GB · ${days} days` : `${rec} GB plan · pick a destination`}</div>
          </div>
            <a href="#esim" className="glass-silver mt-3 flex items-center justify-center gap-2 rounded-full py-3 font-medium">Get this eSIM <ArrowRight className="h-4 w-4" /></a></div>
        </div>
      </div>
    </section>
  );
}

const hotels = [
  { c: "Dubai", k: "UAE", p: 89 }, { c: "London", k: "UK", p: 112 }, { c: "Paris", k: "France", p: 98 }, { c: "New York", k: "USA", p: 129 },
  { c: "Tokyo", k: "Japan", p: 76 }, { c: "Istanbul", k: "Türkiye", p: 54 }, { c: "Singapore", k: "Singapore", p: 95 }, { c: "Bangkok", k: "Thailand", p: 42 },
] as const;

export function HotelsSection() {
  const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const [dates, setDates] = useState("Pick your dates");
  useEffect(() => { const a = new Date(); a.setDate(a.getDate() + 1); const b = new Date(a); b.setDate(b.getDate() + 3); setDates(`${fmt(a)} – ${fmt(b)}`); }, []);
  return (
    <section id="hotels" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20">
      <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">Book hotels <span className="text-muted-foreground">with crypto</span></h2>
      <p className="mt-3 max-w-xl text-muted-foreground">2 million+ properties in 200+ countries. Pay with Bitcoin, USDT or 200+ coins — confirmation lands in your inbox.</p>
      <div className="mt-8 grid gap-2 rounded-3xl border bg-card p-3 md:grid-cols-2 lg:grid-cols-[1.4fr_1.2fr_1fr_auto]">
        <div className="flex items-center gap-3 rounded-2xl border bg-background/50 px-4 py-3"><MapPin className="h-4 w-4 text-muted-foreground" /><div><div className="text-xs text-muted-foreground">Destination</div><div className="text-muted-foreground">City, hotel or destination</div></div></div>
        <div className="flex items-center gap-3 rounded-2xl border bg-background/50 px-4 py-3"><CalendarDays className="h-4 w-4 text-muted-foreground" /><div className="flex-1"><div className="text-xs text-muted-foreground">Check-in and check-out</div><div>{dates}</div></div><span className="text-sm text-muted-foreground">3 nights</span></div>
        <div className="flex items-center gap-3 rounded-2xl border bg-background/50 px-4 py-3"><Users className="h-4 w-4 text-muted-foreground" /><div><div className="text-xs text-muted-foreground">Guests and rooms</div><div>2 guests · 1 room</div></div></div>
        <a href="#hotels" className="glass-silver inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-medium"><Search className="h-4 w-4" />Search</a>
      </div>
      <h3 className="mt-14 text-2xl font-medium">Popular destinations</h3>
      <div className="mt-6 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-[1.6fr_1.6fr_1fr_1fr_1fr]">
        {hotels.map((x, n) => (
          <a key={x.c} href="#hotels" className={`group relative overflow-hidden rounded-3xl border ${n < 2 ? "col-span-2 md:row-span-2 lg:col-span-1" : ""}`}>
            <img src={img(CITY[x.c], n < 2 ? 900 : 500)} alt={`Hotels in ${x.c}, ${x.k}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
            <div className={`absolute inset-x-5 bottom-4 flex gap-1 ${n < 2 ? "items-end justify-between" : "flex-col"}`}>
              <div><div className={`${n < 2 ? "text-3xl" : "text-lg"} font-medium`}>{x.c}</div><div className="text-xs text-muted-foreground">{x.k}</div></div>
              <div className="text-sm">from <span className="text-lg font-medium">${x.p}</span> / night</div>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-12 grid border-y md:grid-cols-4">
        {[[Globe2, "Global coverage", "Hotels in 200+ countries"], [Zap, "Live rates", "Real-time prices from top suppliers"], [BadgeCheck, "Flexible options", "Free cancellation available"], [Wallet, "Pay your way", "200+ coins or stablecoins"]].map(([I, t, d], n) => {
          const Icon = I as typeof Zap;
          return <div key={n} className="border-b p-6 md:border-b-0 md:border-l first:md:border-l-0"><Icon className="h-5 w-5 text-muted-foreground" /><div className="mt-3 font-medium">{t as string}</div><div className="text-sm text-muted-foreground">{d as string}</div></div>;
        })}
      </div>
    </section>
  );
}
