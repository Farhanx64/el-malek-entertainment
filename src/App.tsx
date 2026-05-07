import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Music, Calendar, Phone, Instagram, Youtube, Facebook, Mail, Star, Crown, MapPin, ChevronDown, Quote, Menu, X, CheckCircle, Mic } from "lucide-react";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#about", label: "ABOUT" },
  { href: "#services", label: "SERVICES" },
  { href: "#gallery", label: "GALLERY" },
  { href: "#testimonials", label: "REVIEWS" },
  { href: "#contact", label: "BOOK NOW", cta: true },
];

const SERVICES = [
  {
    title: "Weddings",
    arabic: "أعراس",
    icon: <Crown className="w-10 h-10" />,
    desc: "From the entrance zaffa to the last dance — a full evening of live oriental music tailored to your wedding vision.",
    features: ["Live zaffa performance", "Customised song list", "Full-night sets"],
  },
  {
    title: "Celebrations",
    arabic: "أفراح",
    icon: <Music className="w-10 h-10" />,
    desc: "Engagement parties, graduation ceremonies, and family gatherings elevated with authentic oriental atmosphere.",
    features: ["Engagement parties", "Graduation events", "Family gatherings"],
  },
  {
    title: "Private Events",
    arabic: "حفلات",
    icon: <Calendar className="w-10 h-10" />,
    desc: "Bespoke music curation for VIP corporate events, exclusive private parties, and special occasions.",
    features: ["Corporate events", "VIP celebrations", "Themed shows"],
  },
];

const TESTIMONIALS = [
  {
    name: "Ahmad & Layla",
    event: "Wedding — Dubai, 2025",
    text: "El Malek turned our wedding into something truly unforgettable. Every guest was on their feet. The energy and artistry were beyond anything we imagined.",
    stars: 5,
  },
  {
    name: "The Al-Rashid Family",
    event: "Engagement Party — Abu Dhabi, 2025",
    text: "We've attended many events but nothing compared to this. The blend of classic maqam with modern arrangements was absolutely stunning.",
    stars: 5,
  },
  {
    name: "Rania Khalil",
    event: "Private Celebration — Sharjah, 2024",
    text: "Professional, punctual, and incredibly talented. Our guests are still talking about the performance months later. Highly recommended.",
    stars: 5,
  },
];

const WHY_ITEMS = [
  { label: "PSR-A5000 & KORG setups", desc: "Professional-grade instruments for crystal-clear live sound." },
  { label: "Full bilingual sets", desc: "Arabic, Turkish, Persian — and Western hits on request." },
  { label: "Custom repertoire", desc: "Send us your song list. We learn it before your event." },
  { label: "Sound system included", desc: "Premium PA system available for venues without in-house audio." },
];

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/95 backdrop-blur-md shadow-lg shadow-gold/5" : "bg-transparent"
      } border-b border-white/5`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button onClick={() => scrollTo("#hero")} className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="El Malek Logo"
            className="h-14 w-auto drop-shadow-[0_0_12px_rgba(212,175,55,0.5)] group-hover:drop-shadow-[0_0_22px_rgba(212,175,55,0.8)] transition-all duration-500"
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-serif text-xl gold-text tracking-widest leading-none">EL MALEK</span>
            <span className="text-[8px] text-gold/60 tracking-[0.4em]">ENTERTAINMENT</span>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm tracking-[0.2em]">
          {NAV_LINKS.map((l) =>
            l.cta ? (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="px-6 py-2.5 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 font-semibold"
              >
                {l.label}
              </button>
            ) : (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-zinc-300 hover:text-gold transition-colors font-light"
              >
                {l.label}
              </button>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-gold p-2">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/98 border-t border-gold/10 overflow-hidden"
          >
            <div className="flex flex-col py-6 px-6 gap-5">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className={`text-left text-sm tracking-[0.2em] py-2 transition-colors ${
                    l.cta ? "text-gold border-b border-gold/30" : "text-zinc-300 hover:text-gold"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.4], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden font-sans selection:bg-gold selection:text-black">
      <NavBar />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Artist photo as background */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/artist.jpg"
            alt="El Malek performing live"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10" />

        <motion.div
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative z-20 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.img
            src="/logo.png"
            alt="El Malek Entertainment"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="w-52 md:w-72 mx-auto mb-10 drop-shadow-[0_0_40px_rgba(212,175,55,0.5)]"
          />

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-5 tracking-tight leading-tight">
            Royal <span className="gold-text italic">Oriental</span> Melodies
          </h1>

          <p className="text-zinc-300 text-base md:text-xl font-light mb-2 tracking-[0.25em] uppercase">
            Weddings · Celebrations · Private Events
          </p>
          <p className="text-gold/70 font-arabic text-xl mb-10 tracking-wide">
            أفراح · أعراس · حفلات
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-4 bg-gold text-black font-bold tracking-[0.25em] text-sm shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-shadow"
            >
              BOOK PERFORMANCE
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-4 border border-white/30 text-white hover:border-gold hover:text-gold transition-colors text-sm tracking-[0.25em]"
            >
              DISCOVER MORE
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 z-20 text-gold/50 hover:text-gold transition-colors flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </section>

      <main className="relative z-20 bg-black">

        {/* ── ABOUT ─────────────────────────────────────────────────── */}
        <section id="about" className="py-28 md:py-36 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative group"
            >
              {/* Decorative frame */}
              <div className="absolute -inset-0 border border-gold/25 translate-x-6 translate-y-6 pointer-events-none transition-transform duration-700 group-hover:translate-x-3 group-hover:translate-y-3" />
              <div className="relative overflow-hidden border border-white/5">
                <img
                  src="/artist.jpg"
                  alt="El Malek — Live Performance"
                  className="w-full aspect-[3/4] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gold overlay shimmer on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-black/90 backdrop-blur border border-gold/30 px-4 py-3">
                <p className="text-gold font-serif text-lg leading-none">200+</p>
                <p className="text-[9px] text-zinc-400 tracking-[0.3em] uppercase mt-1">Events Performed</p>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-gold" />
                <span className="text-gold tracking-[0.3em] text-xs uppercase">The Artist</span>
              </div>

              <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
                Master of the <span className="italic gold-text">Arabic</span> Scale
              </h2>

              <p className="text-zinc-400 text-base leading-relaxed mb-5">
                El Malek has established himself as the premier keyboard artist and vocalist in the region — blending centuries-old maqam traditions with the power of modern synthesis on the Yamaha PSR-A5000 and KORG flagship workstations.
              </p>
              <p className="text-zinc-400 text-base leading-relaxed mb-8">
                Whether commanding a grand wedding hall or an intimate private gathering, his performances carry the unmistakable energy of a live royal concert — authentic, passionate, and impossible to forget.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-10 py-8 border-y border-white/5">
                {[
                  { val: "5+", label: "Years Experience" },
                  { val: "200+", label: "Events Performed" },
                  { val: "100%", label: "5-Star Reviews" },
                ].map((s) => (
                  <div key={s.label}>
                    <h4 className="text-gold font-bold text-3xl mb-1 font-serif">{s.val}</h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {["Yamaha PSR-A5000", "KORG PA Series", "Live Vocal", "Maqam Specialist", "Arabic · Turkish · Persian"].map((tag) => (
                  <span key={tag} className="text-[10px] px-3 py-1.5 border border-gold/20 text-gold/70 tracking-widest uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SERVICES ──────────────────────────────────────────────── */}
        <section id="services" className="py-28 md:py-36 bg-zinc-950 px-6 border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-gold text-xs tracking-[0.4em] uppercase mb-4 block">What We Offer</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-4">Our Services</h2>
              <div className="h-px w-24 gold-gradient mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7 }}
                  className="group p-10 border border-white/5 bg-black hover:border-gold/30 transition-all duration-500 relative overflow-hidden"
                >
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-gold/10 group-hover:border-t-gold/25 transition-colors" />

                  <div className="text-gold mb-6 transition-transform duration-500 group-hover:scale-110">
                    {s.icon}
                  </div>
                  <h3 className="font-serif text-2xl mb-1">{s.title}</h3>
                  <p className="text-gold/60 font-arabic text-lg mb-4">{s.arabic}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">{s.desc}</p>
                  <ul className="space-y-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-zinc-400 tracking-wide">
                        <CheckCircle className="w-3.5 h-3.5 text-gold/60 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY ───────────────────────────────────────────────── */}
        <section id="gallery" className="py-28 md:py-36 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-gold text-xs tracking-[0.4em] uppercase mb-4 block">In the Spotlight</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-4">Gallery</h2>
              <div className="h-px w-24 gold-gradient mx-auto" />
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Main large photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="col-span-2 row-span-2 relative group overflow-hidden aspect-square md:aspect-auto"
              >
                <img
                  src="/artist.jpg"
                  alt="El Malek live performance"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-sm text-white font-serif italic">Live Performance</p>
                  <p className="text-xs text-gold/70 tracking-widest uppercase">Yamaha PSR-A5000</p>
                </div>
              </motion.div>

              {/* Placeholder tiles */}
              {[1, 2, 3, 4].map((n) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: n * 0.1 }}
                  className="relative group overflow-hidden bg-zinc-900 border border-white/5 aspect-square flex items-center justify-center"
                >
                  <div className="text-center opacity-40 group-hover:opacity-60 transition-opacity">
                    <Mic className="w-8 h-8 text-gold mx-auto mb-2" />
                    <p className="text-[9px] text-gold tracking-[0.3em] uppercase">Coming Soon</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm tracking-[0.2em] text-gold/70 hover:text-gold transition-colors border-b border-gold/20 hover:border-gold pb-1"
              >
                <Instagram className="w-4 h-4" />
                FOLLOW FOR MORE ON INSTAGRAM
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── WHY EL MALEK ──────────────────────────────────────────── */}
        <section className="py-24 bg-zinc-950 px-6 border-y border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold text-xs tracking-[0.4em] uppercase mb-4 block">The Difference</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
                Why Choose <span className="italic gold-text">El Malek</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed text-base">
                Every event is unique, and El Malek treats it that way. No pre-recorded backing tracks, no generic playlists — only live, soulful performance crafted around your celebration.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid gap-5"
            >
              {WHY_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 items-start p-5 border border-white/5 hover:border-gold/20 transition-colors bg-black"
                >
                  <Star className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold mb-1 tracking-wide">{item.label}</p>
                    <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
        <section id="testimonials" className="py-28 md:py-36 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-gold text-xs tracking-[0.4em] uppercase mb-4 block">Happy Clients</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-4">What They Say</h2>
              <div className="h-px w-24 gold-gradient mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="p-8 border border-white/5 bg-zinc-950 hover:border-gold/20 transition-all group relative"
                >
                  <Quote className="w-8 h-8 text-gold/20 mb-4 group-hover:text-gold/40 transition-colors" />
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.stars)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-gold fill-gold" />
                    ))}
                  </div>
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-[10px] text-zinc-500 tracking-widest uppercase mt-1">{t.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ───────────────────────────────────────────────── */}
        <section id="contact" className="py-28 md:py-36 px-6 bg-zinc-950 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-gold text-xs tracking-[0.4em] uppercase mb-4 block">Reserve Your Date</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-4 italic">Request a Booking</h2>
              <p className="text-zinc-500 text-sm tracking-widest uppercase">Dates fill up fast — reach out early</p>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-12">
              {/* Contact info */}
              <div className="md:col-span-2 space-y-8">
                {[
                  {
                    icon: <Phone className="text-gold w-5 h-5" />,
                    label: "Call / WhatsApp",
                    value: "+971 00 000 0000",
                    href: "tel:+97100000000",
                  },
                  {
                    icon: <Mail className="text-gold w-5 h-5" />,
                    label: "Email",
                    value: "booking@elmalek.com",
                    href: "mailto:booking@elmalek.com",
                  },
                  {
                    icon: <Instagram className="text-gold w-5 h-5" />,
                    label: "Instagram",
                    value: "@el_malek_ent",
                    href: "https://www.instagram.com/",
                  },
                  {
                    icon: <MapPin className="text-gold w-5 h-5" />,
                    label: "Location",
                    value: "New England — available for travel",
                    href: null,
                  },
                ].map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-5"
                  >
                    <div className="w-12 h-12 bg-black flex items-center justify-center rounded-full border border-gold/20 shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-0.5">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-gold transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-sm">{c.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}

                <div className="pt-4 flex gap-4">
                  {[
                    { icon: <Instagram className="w-4 h-4" />, href: "https://www.instagram.com/" },
                    { icon: <Youtube className="w-4 h-4" />, href: "https://www.youtube.com/" },
                    { icon: <Facebook className="w-4 h-4" />, href: "https://www.facebook.com/" },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center text-zinc-500 transition-all"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Form */}
              <motion.form
                onSubmit={(e) => e.preventDefault()}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:col-span-3 space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="YOUR NAME"
                    className="bg-black border border-white/8 p-4 text-xs tracking-widest focus:border-gold outline-none transition-all placeholder:text-zinc-700 w-full"
                  />
                  <input
                    type="text"
                    placeholder="PHONE / WHATSAPP"
                    className="bg-black border border-white/8 p-4 text-xs tracking-widest focus:border-gold outline-none transition-all placeholder:text-zinc-700 w-full"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    className="bg-black border border-white/8 p-4 text-xs tracking-widest focus:border-gold outline-none transition-all placeholder:text-zinc-700 w-full"
                  />
                  <input
                    type="text"
                    placeholder="EVENT DATE"
                    className="bg-black border border-white/8 p-4 text-xs tracking-widest focus:border-gold outline-none transition-all placeholder:text-zinc-700 w-full"
                  />
                </div>
                <select className="w-full bg-black border border-white/8 p-4 text-xs tracking-widest focus:border-gold outline-none transition-all text-zinc-500">
                  <option value="" disabled selected>EVENT TYPE</option>
                  <option value="wedding">Wedding (عرس)</option>
                  <option value="celebration">Celebration (فرح)</option>
                  <option value="private">Private Event (حفلة)</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  placeholder="TELL US ABOUT YOUR EVENT — VENUE, GUEST COUNT, SPECIAL REQUESTS..."
                  rows={4}
                  className="w-full bg-black border border-white/8 p-4 text-xs tracking-widest focus:border-gold outline-none transition-all placeholder:text-zinc-700 resize-none"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-5 bg-gold text-black font-bold tracking-[0.3em] text-sm uppercase hover:bg-gold-light transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
                >
                  SEND INQUIRY
                </motion.button>
                <p className="text-[10px] text-zinc-600 text-center tracking-widest">
                  WE TYPICALLY RESPOND WITHIN 24 HOURS
                </p>
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="relative py-16 px-6 border-t border-white/5 text-center bg-black">
        <img
          src="/logo.png"
          alt="El Malek Entertainment"
          className="w-24 mx-auto mb-6 opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-500"
        />
        <p className="font-serif text-xl gold-text mb-1">EL MALEK</p>
        <p className="text-[9px] text-zinc-600 tracking-[0.4em] uppercase mb-8">ENTERTAINMENT</p>

        <div className="flex justify-center gap-6 mb-8">
          {[
            { icon: <Instagram className="w-4 h-4" />, href: "https://www.instagram.com/" },
            { icon: <Youtube className="w-4 h-4" />, href: "https://www.youtube.com/" },
            { icon: <Facebook className="w-4 h-4" />, href: "https://www.facebook.com/" },
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center text-zinc-500 transition-all rounded-sm"
            >
              {s.icon}
            </a>
          ))}
        </div>

        <div className="h-px w-32 gold-gradient mx-auto mb-8 opacity-30" />

        <p className="text-[10px] text-zinc-700 tracking-[0.35em] uppercase">
          © 2026 El Malek Entertainment &nbsp;·&nbsp; Authenticity in Every Note
        </p>
      </footer>
    </div>
  );
}
