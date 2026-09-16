import React, { useState, useMemo } from "react";
import {
  Building2, CalendarDays, MapPin, Users, IndianRupee, Sparkles,
  ChevronRight, Check, Search, Bookmark, BookmarkCheck, ArrowLeft, Globe, Plus, X, LayoutDashboard, LogOut, TrendingUp,
} from "lucide-react";

/* ----------------------------------------------------------------------
   DESIGN TOKENS
   Ink/paper/marigold/teal system. Marigold nods to the garlands & string
   lights of Indian college fests — the actual subject matter — rather
   than a generic SaaS palette. Organizer = navy, Sponsor = marigold,
   teal reserved for match/success signals only.
---------------------------------------------------------------------- */
const C = {
  ink: "#12182B",
  inkSoft: "#4B5468",
  paper: "#F5F5F1",
  paperRaised: "#FFFFFF",
  line: "#E1DFD6",
  navy: "#1E2A52",
  navySoft: "#EEF0F6",
  marigold: "#E0972E",
  marigoldSoft: "#FBF0DD",
  teal: "#1F6F63",
  tealSoft: "#E7F2EF",
  rust: "#B4502F",
};

const FONTS = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
    .f-display { font-family: 'Fraunces', serif; }
    .f-body { font-family: 'Inter', sans-serif; }
  `}</style>
);

/* ----------------------------------------------------------------------
   SAMPLE DATA — 10 events, 10 sponsors, Indian cities & currency
---------------------------------------------------------------------- */
const CATEGORIES = ["Tech", "Cultural", "Sports", "Business", "Music", "Social Impact"];
const CITIES = ["Varanasi", "Lucknow", "Delhi", "Mumbai", "Bengaluru", "Pune", "Jaipur", "Kolkata", "Hyderabad", "Chandigarh"];

const BENEFIT_SET = ["Logo placement", "Social media promotion", "Stall/booth", "Stage mention", "Audience engagement", "Speaking opportunity"];

  const EVENTS = [
    { id: "e1", name: "TechNova 2026", org: "Banaras Institute of Technology", category: "Tech", city: "Varanasi", date: "2026-11-14", description: "A three-day college tech fest with hackathons, robotics, and a startup pitch stage.", expectedAudience: 2200, targetAudience: "Engineering students, 18–24", socialReach: "18K Instagram followers", sponsorshipType: "Both", budgetMin: 40000, budgetMax: 90000, requirements: "Looking for a title sponsor for the hackathon track and a co-sponsor for the pitch stage.", benefits: ["Logo placement", "Social media promotion", "Stall/booth", "Stage mention"] },
    { id: "e2", name: "Rang Utsav", org: "Lucknow Christian College", category: "Cultural", city: "Lucknow", date: "2026-10-02", description: "Annual cultural fest with dance, music, and a fashion showcase drawing crowds from across the city.", expectedAudience: 5000, targetAudience: "College students & local youth, 17–25", socialReach: "32K Instagram followers", sponsorshipType: "Monetary", budgetMin: 100000, budgetMax: 250000, requirements: "Title sponsorship for the closing-night concert.", benefits: ["Logo placement", "Social media promotion", "Stage mention", "Speaking opportunity"] },
    { id: "e3", name: "Founders' Circuit", org: "Delhi School of Business", category: "Business", city: "Delhi", date: "2026-12-05", description: "A student-run startup summit with investor panels and a founder bootcamp.", expectedAudience: 800, targetAudience: "Aspiring founders & MBA students, 21–28", socialReach: "9K LinkedIn followers", sponsorshipType: "Monetary", budgetMin: 80000, budgetMax: 200000, requirements: "Seeking a presenting sponsor and workshop partners.", benefits: ["Logo placement", "Speaking opportunity", "Audience engagement"] },
    { id: "e4", name: "Court Kings 5x5", org: "St. Xavier's Sports Council", category: "Sports", city: "Mumbai", date: "2026-11-28", description: "An inter-college basketball tournament with 40 teams and a live-streamed final.", expectedAudience: 3000, targetAudience: "Athletes & sports fans, 16–24", socialReach: "14K Instagram followers", sponsorshipType: "Product/Barter", budgetMin: 20000, budgetMax: 60000, requirements: "Needs jerseys, hydration, and equipment partners.", benefits: ["Logo placement", "Stall/booth", "Social media promotion"] },
    { id: "e5", name: "Decibel", org: "Bengaluru Music Collective", category: "Music", city: "Bengaluru", date: "2026-10-18", description: "An independent-artist music festival across two stages, run by a student-alumni collective.", expectedAudience: 4500, targetAudience: "Young professionals & students, 18–30", socialReach: "45K Instagram followers", sponsorshipType: "Both", budgetMin: 150000, budgetMax: 350000, requirements: "Looking for a beverage partner and an audio-equipment sponsor.", benefits: ["Logo placement", "Stall/booth", "Stage mention", "Social media promotion"] },
    { id: "e6", name: "Disha Impact Fest", org: "Pune Social Work Society", category: "Social Impact", city: "Pune", date: "2026-11-07", description: "A day-long fair spotlighting student-led social ventures, with stalls, talks, and a fundraiser run.", expectedAudience: 1500, targetAudience: "Socially conscious students & families", socialReach: "7K Instagram followers", sponsorshipType: "Product/Barter", budgetMin: 15000, budgetMax: 40000, requirements: "Needs merchandise, refreshments, and print sponsors.", benefits: ["Logo placement", "Stall/booth", "Audience engagement"] },
    { id: "e7", name: "Pink City Hackfest", org: "Jaipur Institute of Engineering", category: "Tech", city: "Jaipur", date: "2026-12-12", description: "A 24-hour hackathon focused on fintech and climate-tech problem statements.", expectedAudience: 900, targetAudience: "Engineering & CS students, 18–23", socialReach: "6K Instagram followers", sponsorshipType: "Both", budgetMin: 30000, budgetMax: 70000, requirements: "Seeking a title sponsor and prize-pool contributors.", benefits: ["Logo placement", "Stage mention", "Speaking opportunity"] },
    { id: "e8", name: "Baithak Litfest", org: "Kolkata University Literary Circle", category: "Cultural", city: "Kolkata", date: "2026-10-25", description: "A two-day literature festival with author talks, open mics, and a small book fair.", expectedAudience: 1200, targetAudience: "Readers & students, 18–35", socialReach: "11K Instagram followers", sponsorshipType: "Monetary", budgetMin: 25000, budgetMax: 60000, requirements: "Looking for a publishing or stationery brand partner.", benefits: ["Logo placement", "Stall/booth", "Social media promotion"] },
    { id: "e9", name: "Nizam Sports Meet", org: "Hyderabad Central University", category: "Sports", city: "Hyderabad", date: "2026-11-20", description: "An annual multi-sport intercollegiate meet with athletics, badminton, and chess.", expectedAudience: 2600, targetAudience: "Student athletes, 17–24", socialReach: "13K Instagram followers", sponsorshipType: "Both", budgetMin: 50000, budgetMax: 120000, requirements: "Needs a fitness-apparel sponsor and an energy-drink partner.", benefits: ["Logo placement", "Stall/booth", "Stage mention", "Social media promotion"] },
    { id: "e10", name: "Zenith Summit", org: "Chandigarh College of Management", category: "Business", city: "Chandigarh", date: "2026-12-19", description: "A flagship management fest with case competitions, a CXO panel, and a placement mixer.", expectedAudience: 1800, targetAudience: "Management students & young professionals, 20–26", socialReach: "16K LinkedIn followers", sponsorshipType: "Monetary", budgetMin: 60000, budgetMax: 150000, requirements: "Seeking a title sponsor for the case competition.", benefits: ["Logo placement", "Speaking opportunity", "Stage mention"] },
];

const SPONSORS = [
  { id: "s1", brand: "ABC Beverages", industry: "Food & Beverage", city: "Varanasi", description: "A regional beverage brand expanding into campus and youth-fest sponsorships.", website: "abcbeverages.in", targetAudience: "Students, 18–25", preferredCategories: ["Tech", "Cultural", "Sports"], preferredCities: ["Varanasi", "Lucknow", "Jaipur"], sponsorshipType: "Both", budgetMin: 50000, budgetMax: 100000, preferredAudienceMin: 1000, preferredAudienceMax: 3000, marketingGoals: "Brand recall among North Indian college students.", collaborationPrefs: ["Stall/booth", "Logo placement", "Social media promotion"] },
  { id: "s2", brand: "Krishe FinServ", industry: "Financial Services", city: "Delhi", description: "A fintech company sponsoring business fests and founder-focused events.", website: "krishefinserv.com", targetAudience: "MBA students & young professionals", preferredCategories: ["Business"], preferredCities: ["Delhi", "Chandigarh", "Mumbai"], sponsorshipType: "Monetary", budgetMin: 80000, budgetMax: 200000, preferredAudienceMin: 500, preferredAudienceMax: 2000, marketingGoals: "Positioning as the go-to fintech partner for future founders.", collaborationPrefs: ["Speaking opportunity", "Logo placement", "Stage mention"] },
  { id: "s3", brand: "Threadwork Apparel", industry: "Fashion & Apparel", city: "Mumbai", description: "A youth streetwear label looking to sponsor fests with strong fashion visibility.", website: "threadwork.co", targetAudience: "College students, 17–26", preferredCategories: ["Cultural", "Music"], preferredCities: ["Mumbai", "Bengaluru", "Kolkata"], sponsorshipType: "Product/Barter", budgetMin: 20000, budgetMax: 60000, preferredAudienceMin: 2000, preferredAudienceMax: 6000, marketingGoals: "Merchandise seeding and social buzz at fashion-forward events.", collaborationPrefs: ["Stall/booth", "Social media promotion"] },
  { id: "s4", brand: "PulseFit Nutrition", industry: "Fitness & Wellness", city: "Hyderabad", description: "A sports-nutrition brand sponsoring athletic meets and tournaments.", website: "pulsefit.in", targetAudience: "Student athletes, 16–25", preferredCategories: ["Sports"], preferredCities: ["Hyderabad", "Mumbai", "Pune"], sponsorshipType: "Both", budgetMin: 40000, budgetMax: 120000, preferredAudienceMin: 1500, preferredAudienceMax: 4000, marketingGoals: "Sampling and trial among competitive student athletes.", collaborationPrefs: ["Stall/booth", "Logo placement"] },
  { id: "s5", brand: "Beatbox Audio", industry: "Consumer Electronics", city: "Bengaluru", description: "A speaker and headphone brand active in the college music-festival circuit.", website: "beatboxaudio.com", targetAudience: "Music-going youth, 18–30", preferredCategories: ["Music", "Cultural"], preferredCities: ["Bengaluru", "Pune", "Mumbai"], sponsorshipType: "Both", budgetMin: 150000, budgetMax: 300000, preferredAudienceMin: 3000, preferredAudienceMax: 6000, marketingGoals: "On-ground product demos at large music fests.", collaborationPrefs: ["Stage mention", "Stall/booth", "Logo placement"] },
  { id: "s6", brand: "GreenLoop", industry: "Sustainability", city: "Pune", description: "A sustainable-goods startup that partners with social-impact and community events.", website: "greenloop.earth", targetAudience: "Socially conscious youth", preferredCategories: ["Social Impact"], preferredCities: ["Pune", "Bengaluru", "Delhi"], sponsorshipType: "Product/Barter", budgetMin: 10000, budgetMax: 35000, preferredAudienceMin: 500, preferredAudienceMax: 2000, marketingGoals: "Community goodwill and product sampling.", collaborationPrefs: ["Stall/booth", "Audience engagement"] },
  { id: "s7", brand: "Rooted Learning", industry: "Ed-tech", city: "Jaipur", description: "An ed-tech platform sponsoring hackathons and technical fests for student acquisition.", website: "rootedlearning.in", targetAudience: "Engineering & CS students", preferredCategories: ["Tech"], preferredCities: ["Jaipur", "Varanasi", "Delhi"], sponsorshipType: "Both", budgetMin: 30000, budgetMax: 80000, preferredAudienceMin: 500, preferredAudienceMax: 1500, marketingGoals: "App sign-ups among engineering students.", collaborationPrefs: ["Logo placement", "Stage mention", "Speaking opportunity"] },
  { id: "s8", brand: "Kagaz & Co.", industry: "Stationery & Publishing", city: "Kolkata", description: "An independent publisher and stationery brand sponsoring literary and cultural events.", website: "kagazandco.in", targetAudience: "Readers & students, 18–35", preferredCategories: ["Cultural"], preferredCities: ["Kolkata", "Lucknow", "Delhi"], sponsorshipType: "Monetary", budgetMin: 20000, budgetMax: 55000, preferredAudienceMin: 800, preferredAudienceMax: 2000, marketingGoals: "Visibility among a readership-oriented youth audience.", collaborationPrefs: ["Stall/booth", "Logo placement"] },
  { id: "s9", brand: "Volt Motors", industry: "Automobile", city: "Chandigarh", description: "An electric two-wheeler brand sponsoring business and management fests.", website: "voltmotors.in", targetAudience: "Young professionals & students, 20–28", preferredCategories: ["Business", "Tech"], preferredCities: ["Chandigarh", "Delhi", "Jaipur"], sponsorshipType: "Monetary", budgetMin: 60000, budgetMax: 180000, preferredAudienceMin: 800, preferredAudienceMax: 2500, marketingGoals: "Brand association with innovation-led campus events.", collaborationPrefs: ["Logo placement", "Speaking opportunity", "Stage mention"] },
  { id: "s10", brand: "Mandap Foods", industry: "Food & Beverage", city: "Lucknow", description: "A regional snacks and catering brand sponsoring large cultural gatherings.", website: "mandapfoods.in", targetAudience: "General campus audience, 17–30", preferredCategories: ["Cultural", "Music", "Social Impact"], preferredCities: ["Lucknow", "Varanasi", "Kolkata"], sponsorshipType: "Product/Barter", budgetMin: 25000, budgetMax: 70000, preferredAudienceMin: 1000, preferredAudienceMax: 5000, marketingGoals: "Sampling at high-footfall cultural events.", collaborationPrefs: ["Stall/booth", "Social media promotion"] },
];

/* Demo personas so the dashboards have "your" content on first load */
const DEMO_ORGANIZER = { name: "Aditi Sharma", org: "Banaras Institute of Technology", ownedEventIds: ["e1"] };
const DEMO_SPONSOR = { name: "Rohan Verma", brandId: "s1" };

/* ----------------------------------------------------------------------
   MATCHING ALGORITHM — simple, explainable, weighted rule-based score
---------------------------------------------------------------------- */
function computeMatch(event, sponsor) {
  const reasons = [];
  let score = 0;

  // Location — 20%
  if (sponsor.preferredCities.includes(event.city)) {
    score += 20;
    reasons.push(`${sponsor.brand.split(" ")[0]} actively sponsors events in ${event.city}`);
  } else {
    score += 5;
  }

  // Category / industry — 25%
  if (sponsor.preferredCategories.includes(event.category)) {
    score += 25;
    reasons.push(`Event category (${event.category}) matches the industries this sponsor targets`);
  } else {
    score += 6;
  }

  // Budget — 20%
  const overlap = event.budgetMin <= sponsor.budgetMax && sponsor.budgetMin <= event.budgetMax;
  if (overlap) {
    score += 20;
    reasons.push("Sponsorship budget ranges overlap");
  } else {
    const gap = Math.min(Math.abs(event.budgetMin - sponsor.budgetMax), Math.abs(sponsor.budgetMin - event.budgetMax));
    if (gap < 20000) { score += 10; reasons.push("Budget ranges are close, within negotiation range"); }
    else score += 2;
  }

  // Audience size — 20%
  if (event.expectedAudience >= sponsor.preferredAudienceMin && event.expectedAudience <= sponsor.preferredAudienceMax) {
    score += 20;
    reasons.push("Expected turnout fits the sponsor's preferred audience size");
  } else {
    score += 7;
  }

  // Collaboration type — 15%
  if (event.sponsorshipType === sponsor.sponsorshipType || event.sponsorshipType === "Both" || sponsor.sponsorshipType === "Both") {
    score += 15;
    reasons.push(`Preferred collaboration type (${sponsor.sponsorshipType}) is available`);
  } else {
    score += 3;
  }

  return { score: Math.round(score), reasons };
}

const fmtINR = (n) => "₹" + n.toLocaleString("en-IN");
const tier = (score) => (score >= 80 ? { c: C.teal, bg: C.tealSoft, label: "Strong match" } : score >= 60 ? { c: C.marigold, bg: C.marigoldSoft, label: "Good match" } : { c: C.inkSoft, bg: C.navySoft, label: "Possible match" });

/* ----------------------------------------------------------------------
   SMALL UI ATOMS
---------------------------------------------------------------------- */
function Button({ children, onClick, variant = "primary", icon: Icon, full, type = "button" }) {
  const base = "f-body inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[14px] font-semibold transition-colors";
  const styles = {
    primary: { backgroundColor: C.navy, color: "#fff" },
    marigold: { backgroundColor: C.marigold, color: "#fff" },
    ghost: { backgroundColor: "transparent", color: C.ink, border: `1px solid ${C.line}` },
    subtle: { backgroundColor: C.navySoft, color: C.navy },
  };
  return (
    <button type={type} onClick={onClick} className={base + (full ? " w-full" : "")} style={styles[variant]}>
      {Icon && <Icon size={16} />} {children}
    </button>
  );
}

function Pill({ children, tone = "default" }) {
  const tones = {
    default: { backgroundColor: C.navySoft, color: C.navy },
    marigold: { backgroundColor: C.marigoldSoft, color: "#8A5A16" },
    teal: { backgroundColor: C.tealSoft, color: C.teal },
  };
  return <span className="f-body inline-block rounded px-2.5 py-1 text-[12px] font-semibold" style={tones[tone]}>{children}</span>;
}

function MatchBadge({ score }) {
  const t = tier(score);
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1" style={{ backgroundColor: t.bg }}>
      <Sparkles size={13} style={{ color: t.c }} />
      <span className="f-body text-[13px] font-bold" style={{ color: t.c }}>{score}% Match</span>
    </div>
  );
}

function WhyMatch({ reasons }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="f-body text-[13px] font-semibold" style={{ color: C.navy }}>
        {open ? "Hide match details" : "Why this match?"}
      </button>
      {open && (
        <ul className="mt-2 space-y-1.5">
          {reasons.map((r, i) => (
            <li key={i} className="f-body flex items-start gap-2 text-[13px]" style={{ color: C.inkSoft }}>
              <Check size={14} className="mt-0.5 shrink-0" style={{ color: C.teal }} /> {r}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg p-4" style={{ backgroundColor: C.paperRaised, border: `1px solid ${C.line}` }}>
      <div className="f-display text-3xl" style={{ color: C.ink }}>{value}</div>
      <div className="f-body mt-1 text-[13px]" style={{ color: C.inkSoft }}>{label}</div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   NAVBAR
---------------------------------------------------------------------- */
function Navbar({ go, role, onExit }) {
  return (
    <div className="sticky top-0 z-20 border-b" style={{ backgroundColor: C.paper, borderColor: C.line }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button onClick={() => go(role ? (role === "organizer" ? "organizerDashboard" : "sponsorDashboard") : "landing")} className="f-display flex items-center gap-2 text-xl font-semibold" style={{ color: C.ink }}>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded" style={{ backgroundColor: C.marigold }}>
            <span className="f-display text-sm text-white">स</span>
          </span>
          Setu
        </button>
        {!role ? (
          <div className="f-body hidden items-center gap-7 text-[14px] font-medium sm:flex" style={{ color: C.inkSoft }}>
            <button onClick={() => go("browseEvents")}>Explore Events</button>
            <button onClick={() => go("browseSponsors")}>Find Sponsors</button>
            <button onClick={() => go("landing")}>How It Works</button>
            <Button variant="ghost" onClick={() => go("auth-organizer")}>Log in</Button>
            <Button variant="primary" onClick={() => go("roleSelect")}>Get Started</Button>
          </div>
        ) : (
          <div className="f-body flex items-center gap-3 text-[14px] font-medium">
            <Pill tone={role === "organizer" ? "default" : "marigold"}>{role === "organizer" ? "Organizer" : "Sponsor"}</Pill>
            <button onClick={() => go(role === "organizer" ? "organizerDashboard" : "sponsorDashboard")} className="flex items-center gap-1.5" style={{ color: C.inkSoft }}>
              <LayoutDashboard size={15} /> Dashboard
            </button>
            <button onClick={onExit} className="flex items-center gap-1.5" style={{ color: C.inkSoft }}>
              <LogOut size={15} /> Exit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   LANDING PAGE
---------------------------------------------------------------------- */
function Landing({ go }) {
  return (
    <div>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="f-display text-[44px] leading-[1.08] sm:text-[54px]" style={{ color: C.ink }}>
            Where events meet the right sponsors.
          </h1>
          <p className="f-body mt-5 max-w-md text-[17px] leading-relaxed" style={{ color: C.inkSoft }}>
            Organizers stop cold-emailing brands one by one. Sponsors stop guessing which fests are worth backing. Setu matches both sides on fit, not just footfall.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="marigold" icon={ChevronRight} onClick={() => go("auth-organizer")}>I'm an Organizer</Button>
            <Button variant="ghost" icon={ChevronRight} onClick={() => go("auth-sponsor")}>I'm a Sponsor</Button>
          </div>
          <div className="mt-12 flex gap-10">
            <div><div className="f-display text-2xl" style={{ color: C.ink }}>500+</div><div className="f-body text-[13px]" style={{ color: C.inkSoft }}>Events listed</div></div>
            <div><div className="f-display text-2xl" style={{ color: C.ink }}>300+</div><div className="f-body text-[13px]" style={{ color: C.inkSoft }}>Sponsor brands</div></div>
            <div><div className="f-display text-2xl" style={{ color: C.ink }}>1,200+</div><div className="f-body text-[13px]" style={{ color: C.inkSoft }}>Connections made</div></div>
          </div>
        </div>

        {/* Organizer <-> Platform <-> Sponsor visual */}
        <div className="rounded-2xl p-8" style={{ backgroundColor: C.paperRaised, border: `1px solid ${C.line}` }}>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: C.navySoft }}>
                <CalendarDays style={{ color: C.navy }} />
              </div>
              <span className="f-body text-[13px] font-semibold" style={{ color: C.ink }}>Organizer</span>
              <span className="f-body text-[12px]" style={{ color: C.inkSoft }}>Lists event & needs</span>
            </div>
            <div className="h-px flex-1" style={{ backgroundColor: C.line }} />
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full" style={{ backgroundColor: C.marigoldSoft }}>
                <Sparkles style={{ color: C.marigold }} size={26} />
              </div>
              <span className="f-body text-[13px] font-semibold" style={{ color: C.ink }}>Setu</span>
              <span className="f-body text-[12px]" style={{ color: C.inkSoft }}>Scores the fit</span>
            </div>
            <div className="h-px flex-1" style={{ backgroundColor: C.line }} />
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: C.tealSoft }}>
                <Building2 style={{ color: C.teal }} />
              </div>
              <span className="f-body text-[13px] font-semibold" style={{ color: C.ink }}>Sponsor</span>
              <span className="f-body text-[12px]" style={{ color: C.inkSoft }}>Lists brand & budget</span>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            {EVENTS.slice(0, 1).map((e) => {
              const m = computeMatch(e, SPONSORS[0]);
              return (
                <div key={e.id} className="flex items-center justify-between rounded-lg p-3" style={{ backgroundColor: C.paper }}>
                  <span className="f-body text-[13px]" style={{ color: C.ink }}>{e.name} × {SPONSORS[0].brand}</span>
                  <MatchBadge score={m.score} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="border-t" style={{ borderColor: C.line, backgroundColor: C.paperRaised }}>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="f-display text-3xl" style={{ color: C.ink }}>How it works</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="f-body text-[13px] font-bold uppercase tracking-wide" style={{ color: C.navy }}>For organizers</h3>
              <ol className="mt-4 space-y-4">
                {["Create your event listing", "Tell us what kind of sponsorship you need", "Discover sponsors matched to your event", "Connect and take the conversation forward"].map((s, i) => (
                  <li key={i} className="f-body flex gap-3 text-[15px]" style={{ color: C.inkSoft }}>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full f-body text-[12px] font-bold" style={{ backgroundColor: C.navySoft, color: C.navy }}>{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="f-body text-[13px] font-bold uppercase tracking-wide" style={{ color: C.marigold }}>For sponsors</h3>
              <ol className="mt-4 space-y-4">
                {["Create your brand profile", "Set your sponsorship preferences", "Discover events matched to your goals", "Partner with the ones that fit"].map((s, i) => (
                  <li key={i} className="f-body flex gap-3 text-[15px]" style={{ color: C.inkSoft }}>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full f-body text-[12px] font-bold" style={{ backgroundColor: C.marigoldSoft, color: "#8A5A16" }}>{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="f-display text-3xl" style={{ color: C.ink }}>Ready to find your match?</h2>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="marigold" onClick={() => go("auth-organizer")}>I'm an Organizer</Button>
          <Button variant="ghost" onClick={() => go("auth-sponsor")}>I'm a Sponsor</Button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   MOCK AUTH — non-functional, transitions straight to the dashboard.
   This is clearly a prototype stand-in for real registration/login.
---------------------------------------------------------------------- */
function AuthMock({ roleHint, go, setRole }) {
  const [mode, setMode] = useState("login");
  const [role, setLocalRole] = useState(roleHint || "organizer");

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <button onClick={() => go("landing")} className="f-body mb-6 flex items-center gap-1.5 text-[13px]" style={{ color: C.inkSoft }}>
        <ArrowLeft size={14} /> Back
      </button>
      <h1 className="f-display text-3xl" style={{ color: C.ink }}>{mode === "login" ? "Log in" : "Create your account"}</h1>
      <p className="f-body mt-2 text-[14px]" style={{ color: C.inkSoft }}>This is a demo — no real account is created. Choose a role and continue to see that side of the platform.</p>

      <div className="mt-6 flex gap-2">
        <button onClick={() => setLocalRole("organizer")} className="flex-1 rounded-md px-4 py-2.5 f-body text-[14px] font-semibold" style={{ backgroundColor: role === "organizer" ? C.navy : C.navySoft, color: role === "organizer" ? "#fff" : C.navy }}>I'm an Organizer</button>
        <button onClick={() => setLocalRole("sponsor")} className="flex-1 rounded-md px-4 py-2.5 f-body text-[14px] font-semibold" style={{ backgroundColor: role === "sponsor" ? C.marigold : C.marigoldSoft, color: role === "sponsor" ? "#fff" : "#8A5A16" }}>I'm a Sponsor</button>
      </div>

      <div className="mt-6 space-y-3">
        <input placeholder="Email address" className="f-body w-full rounded-md px-4 py-2.5 text-[14px] outline-none" style={{ border: `1px solid ${C.line}`, backgroundColor: C.paperRaised }} />
        <input placeholder="Password" type="password" className="f-body w-full rounded-md px-4 py-2.5 text-[14px] outline-none" style={{ border: `1px solid ${C.line}`, backgroundColor: C.paperRaised }} />
      </div>

      <div className="mt-6">
        <Button full variant={role === "organizer" ? "primary" : "marigold"} onClick={() => { setRole(role); go(role === "organizer" ? "organizerDashboard" : "sponsorDashboard"); }}>
          Continue to dashboard
        </Button>
      </div>
      <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="f-body mt-4 w-full text-center text-[13px]" style={{ color: C.inkSoft }}>
        {mode === "login" ? "New here? Create an account" : "Already have an account? Log in"}
      </button>
    </div>
  );
}

/* ----------------------------------------------------------------------
   EVENT CARD / SPONSOR CARD
---------------------------------------------------------------------- */
function EventCard({ event, onView, matchScore, right }) {
  return (
    <div className="rounded-lg p-5" style={{ backgroundColor: C.paperRaised, border: `1px solid ${C.line}`, borderLeft: `3px solid ${C.navy}` }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="f-display text-lg" style={{ color: C.ink }}>{event.name}</h3>
          <p className="f-body text-[13px]" style={{ color: C.inkSoft }}>{event.org}</p>
        </div>
        {typeof matchScore === "number" && <MatchBadge score={matchScore} />}
      </div>
      <div className="f-body mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px]" style={{ color: C.inkSoft }}>
        <span className="flex items-center gap-1"><MapPin size={13} /> {event.city}</span>
        <span className="flex items-center gap-1"><CalendarDays size={13} /> {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
        <span className="flex items-center gap-1"><Users size={13} /> {event.expectedAudience.toLocaleString("en-IN")}+ expected</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Pill>{event.category}</Pill>
        <Pill tone="marigold">{event.sponsorshipType}</Pill>
        <Pill tone="teal">{fmtINR(event.budgetMin)}–{fmtINR(event.budgetMax)}</Pill>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button onClick={() => onView(event.id)} className="f-body text-[13px] font-semibold" style={{ color: C.navy }}>View event details →</button>
        {right}
      </div>
    </div>
  );
}

function SponsorCard({ sponsor, onView, matchScore, right }) {
  return (
    <div className="rounded-lg p-5" style={{ backgroundColor: C.paperRaised, border: `1px solid ${C.line}`, borderLeft: `3px solid ${C.marigold}` }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="f-display text-lg" style={{ color: C.ink }}>{sponsor.brand}</h3>
          <p className="f-body text-[13px]" style={{ color: C.inkSoft }}>{sponsor.industry}</p>
        </div>
        {typeof matchScore === "number" && <MatchBadge score={matchScore} />}
      </div>
      <div className="f-body mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px]" style={{ color: C.inkSoft }}>
        <span className="flex items-center gap-1"><MapPin size={13} /> {sponsor.city}</span>
        <span className="flex items-center gap-1"><Users size={13} /> {sponsor.targetAudience}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Pill>{sponsor.sponsorshipType}</Pill>
        <Pill tone="teal">{fmtINR(sponsor.budgetMin)}–{fmtINR(sponsor.budgetMax)}</Pill>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button onClick={() => onView(sponsor.id)} className="f-body text-[13px] font-semibold" style={{ color: C.navy }}>View sponsor profile →</button>
        {right}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   FILTER BAR
---------------------------------------------------------------------- */
function FilterBar({ filters, setFilters, categories, cities }) {
  const set = (k, v) => setFilters((f) => ({ ...f, [k]: v }));
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg p-4" style={{ backgroundColor: C.paperRaised, border: `1px solid ${C.line}` }}>
      <div className="flex items-center gap-2 rounded-md px-3 py-2" style={{ backgroundColor: C.paper, flex: "1 1 200px" }}>
        <Search size={15} style={{ color: C.inkSoft }} />
        <input value={filters.q} onChange={(e) => set("q", e.target.value)} placeholder="Search by name..." className="f-body w-full bg-transparent text-[13px] outline-none" />
      </div>
      <select value={filters.city} onChange={(e) => set("city", e.target.value)} className="f-body rounded-md px-3 py-2 text-[13px]" style={{ backgroundColor: C.paper, border: `1px solid ${C.line}` }}>
        <option value="">All cities</option>
        {cities.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={filters.category} onChange={(e) => set("category", e.target.value)} className="f-body rounded-md px-3 py-2 text-[13px]" style={{ backgroundColor: C.paper, border: `1px solid ${C.line}` }}>
        <option value="">All categories</option>
        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={filters.type} onChange={(e) => set("type", e.target.value)} className="f-body rounded-md px-3 py-2 text-[13px]" style={{ backgroundColor: C.paper, border: `1px solid ${C.line}` }}>
        <option value="">Any sponsorship type</option>
        <option>Monetary</option>
        <option>Product/Barter</option>
        <option>Both</option>
      </select>
      <select value={filters.budget} onChange={(e) => set("budget", e.target.value)} className="f-body rounded-md px-3 py-2 text-[13px]" style={{ backgroundColor: C.paper, border: `1px solid ${C.line}` }}>
        <option value="">Any budget</option>
        <option value="0-50000">Under ₹50K</option>
        <option value="50000-150000">₹50K – ₹1.5L</option>
        <option value="150000-999999999">Above ₹1.5L</option>
      </select>
    </div>
  );
}

/* ----------------------------------------------------------------------
   BROWSE EVENTS / BROWSE SPONSORS
---------------------------------------------------------------------- */
function BrowseEvents({ events, go, setSelectedEventId, currentSponsor, saved, toggleSave, interestedIds }) {
  const [filters, setFilters] = useState({ q: "", city: "", category: "", type: "", budget: "" });
  const filtered = useMemo(() => events.filter((e) => {
    if (filters.q && !e.name.toLowerCase().includes(filters.q.toLowerCase())) return false;
    if (filters.city && e.city !== filters.city) return false;
    if (filters.category && e.category !== filters.category) return false;
    if (filters.type && e.sponsorshipType !== filters.type && e.sponsorshipType !== "Both") return false;
    if (filters.budget) {
      const [lo, hi] = filters.budget.split("-").map(Number);
      if (e.budgetMax < lo || e.budgetMin > hi) return false;
    }
    return true;
  }), [events, filters]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="f-display text-3xl" style={{ color: C.ink }}>Explore events</h1>
      <p className="f-body mt-1 text-[14px]" style={{ color: C.inkSoft }}>{filtered.length} events open for sponsorship</p>
      <div className="mt-6"><FilterBar filters={filters} setFilters={setFilters} categories={CATEGORIES} cities={CITIES} /></div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((e) => {
          const m = currentSponsor ? computeMatch(e, currentSponsor) : null;
          return (
            <EventCard key={e.id} event={e} matchScore={m?.score} onView={(id) => { setSelectedEventId(id); go("eventDetails"); }}
              right={currentSponsor && (
                <button onClick={() => toggleSave(e.id)} className="flex items-center gap-1 f-body text-[12px]" style={{ color: C.inkSoft }}>
                  {saved.includes(e.id) ? <BookmarkCheck size={14} style={{ color: C.marigold }} /> : <Bookmark size={14} />}
                </button>
              )} />
          );
        })}
      </div>
    </div>
  );
}

function BrowseSponsors({ sponsors, go, setSelectedSponsorId, currentEvent }) {
  const [filters, setFilters] = useState({ q: "", city: "", category: "", type: "", budget: "" });
  const filtered = useMemo(() => sponsors.filter((s) => {
    if (filters.q && !s.brand.toLowerCase().includes(filters.q.toLowerCase())) return false;
    if (filters.city && s.city !== filters.city) return false;
    if (filters.category && !s.preferredCategories.includes(filters.category)) return false;
    if (filters.type && s.sponsorshipType !== filters.type && s.sponsorshipType !== "Both") return false;
    if (filters.budget) {
      const [lo, hi] = filters.budget.split("-").map(Number);
      if (s.budgetMax < lo || s.budgetMin > hi) return false;
    }
    return true;
  }), [sponsors, filters]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="f-display text-3xl" style={{ color: C.ink }}>Find sponsors</h1>
      <p className="f-body mt-1 text-[14px]" style={{ color: C.inkSoft }}>{filtered.length} brands looking to sponsor events like yours</p>
      <div className="mt-6"><FilterBar filters={filters} setFilters={setFilters} categories={CATEGORIES} cities={CITIES} /></div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((s) => {
          const m = currentEvent ? computeMatch(currentEvent, s) : null;
          return <SponsorCard key={s.id} sponsor={s} matchScore={m?.score} onView={(id) => { setSelectedSponsorId(id); go("sponsorProfile"); }} />;
        })}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   EVENT DETAILS
---------------------------------------------------------------------- */
function EventDetails({ event, go, currentSponsor, expressInterest, interested }) {
  if (!event) return null;
  const m = currentSponsor ? computeMatch(event, currentSponsor) : null;
  const already = interested.includes(event.id);
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <button onClick={() => go(-1)} className="f-body mb-6 flex items-center gap-1.5 text-[13px]" style={{ color: C.inkSoft }}>
        <ArrowLeft size={14} /> Back
      </button>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="f-display text-4xl" style={{ color: C.ink }}>{event.name}</h1>
          <p className="f-body mt-1 text-[15px]" style={{ color: C.inkSoft }}>Organized by {event.org}</p>
        </div>
        {m && <MatchBadge score={m.score} />}
      </div>

      <div className="f-body mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px]" style={{ color: C.inkSoft }}>
        <span className="flex items-center gap-1.5"><CalendarDays size={15} /> {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
        <span className="flex items-center gap-1.5"><MapPin size={15} /> {event.city}</span>
        <span className="flex items-center gap-1.5"><Users size={15} /> {event.expectedAudience.toLocaleString("en-IN")}+ expected attendees</span>
        <Pill>{event.category}</Pill>
      </div>

      <p className="f-body mt-6 max-w-2xl text-[15px] leading-relaxed" style={{ color: C.ink }}>{event.description}</p>

      <div className="mt-8 rounded-lg p-6" style={{ backgroundColor: C.navySoft }}>
        <h2 className="f-display text-xl" style={{ color: C.ink }}>Sponsorship opportunity</h2>
        <div className="f-body mt-3 flex flex-wrap gap-x-8 gap-y-2 text-[14px]" style={{ color: C.ink }}>
          <span><strong>Budget:</strong> {fmtINR(event.budgetMin)} – {fmtINR(event.budgetMax)}</span>
          <span><strong>Type:</strong> {event.sponsorshipType}</span>
          <span><strong>Target audience:</strong> {event.targetAudience}</span>
        </div>
        <p className="f-body mt-3 text-[14px]" style={{ color: C.inkSoft }}>{event.requirements}</p>
      </div>

      <div className="mt-8">
        <h2 className="f-display text-xl" style={{ color: C.ink }}>Brand visibility</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {event.benefits.map((b) => (
            <div key={b} className="f-body flex items-center gap-2 rounded-md p-3 text-[14px]" style={{ backgroundColor: C.paperRaised, border: `1px solid ${C.line}`, color: C.ink }}>
              <Check size={15} style={{ color: C.teal }} /> {b}
            </div>
          ))}
        </div>
      </div>

      {m && (
        <div className="mt-8 rounded-lg p-5" style={{ border: `1px solid ${C.line}` }}>
          <WhyMatch reasons={m.reasons} />
        </div>
      )}

      <div className="mt-10">
        {already ? (
          <Pill tone="teal">Interest sent — the organizer has been notified</Pill>
        ) : (
          <Button variant="marigold" icon={ChevronRight} onClick={() => expressInterest(event.id)}>Express Interest</Button>
        )}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   SPONSOR PROFILE PAGE
---------------------------------------------------------------------- */
function SponsorProfile({ sponsor, go, events, currentEvent, expressInterest, interested }) {
  if (!sponsor) return null;
  const recommended = [...events].map((e) => ({ e, m: computeMatch(e, sponsor) })).sort((a, b) => b.m.score - a.m.score).slice(0, 3);
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <button onClick={() => go(-1)} className="f-body mb-6 flex items-center gap-1.5 text-[13px]" style={{ color: C.inkSoft }}>
        <ArrowLeft size={14} /> Back
      </button>
      <h1 className="f-display text-4xl" style={{ color: C.ink }}>{sponsor.brand}</h1>
      <p className="f-body mt-1 text-[15px]" style={{ color: C.inkSoft }}>{sponsor.industry} · {sponsor.city}</p>
      <div className="f-body mt-3 flex items-center gap-4 text-[13px]" style={{ color: C.navy }}>
        <span className="flex items-center gap-1"><Globe size={13} /> {sponsor.website}</span>
      </div>
      <p className="f-body mt-6 max-w-2xl text-[15px] leading-relaxed" style={{ color: C.ink }}>{sponsor.description}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg p-5" style={{ backgroundColor: C.paperRaised, border: `1px solid ${C.line}` }}>
          <h3 className="f-body text-[13px] font-bold uppercase tracking-wide" style={{ color: C.inkSoft }}>Sponsorship preferences</h3>
          <div className="f-body mt-3 space-y-2 text-[14px]" style={{ color: C.ink }}>
            <p><strong>Budget:</strong> {fmtINR(sponsor.budgetMin)} – {fmtINR(sponsor.budgetMax)}</p>
            <p><strong>Type:</strong> {sponsor.sponsorshipType}</p>
            <p><strong>Preferred categories:</strong> {sponsor.preferredCategories.join(", ")}</p>
            <p><strong>Preferred cities:</strong> {sponsor.preferredCities.join(", ")}</p>
          </div>
        </div>
        <div className="rounded-lg p-5" style={{ backgroundColor: C.paperRaised, border: `1px solid ${C.line}` }}>
          <h3 className="f-body text-[13px] font-bold uppercase tracking-wide" style={{ color: C.inkSoft }}>Goals</h3>
          <div className="f-body mt-3 space-y-2 text-[14px]" style={{ color: C.ink }}>
            <p><strong>Target audience:</strong> {sponsor.targetAudience}</p>
            <p><strong>Marketing goals:</strong> {sponsor.marketingGoals}</p>
            <p><strong>Collaboration preferences:</strong> {sponsor.collaborationPrefs.join(", ")}</p>
          </div>
        </div>
      </div>

      {currentEvent && (
        <div className="mt-8 flex items-center justify-between rounded-lg p-5" style={{ border: `1px solid ${C.line}` }}>
          <div>
            <p className="f-body text-[13px]" style={{ color: C.inkSoft }}>Match with your event, {currentEvent.name}</p>
            <div className="mt-1"><MatchBadge score={computeMatch(currentEvent, sponsor).score} /></div>
          </div>
          {interested.includes(sponsor.id) ? (
            <Pill tone="teal">Interest sent</Pill>
          ) : (
            <Button variant="marigold" onClick={() => expressInterest(sponsor.id)}>Invite to sponsor</Button>
          )}
        </div>
      )}

      <div className="mt-10">
        <h2 className="f-display text-xl" style={{ color: C.ink }}>Recommended events for this brand</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {recommended.map(({ e, m }) => (
            <div key={e.id} className="rounded-lg p-4" style={{ backgroundColor: C.paperRaised, border: `1px solid ${C.line}` }}>
              <h4 className="f-display text-[15px]" style={{ color: C.ink }}>{e.name}</h4>
              <p className="f-body text-[12px]" style={{ color: C.inkSoft }}>{e.city}</p>
              <div className="mt-2"><MatchBadge score={m.score} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   CREATE EVENT FORM
---------------------------------------------------------------------- */
function CreateEventForm({ onCreate, go }) {
  const [form, setForm] = useState({
    name: "", org: "", category: CATEGORIES[0], city: CITIES[0], date: "", description: "",
    expectedAudience: "", targetAudience: "", sponsorshipType: "Both", budgetMin: "", budgetMax: "", requirements: "", benefits: [],
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleBenefit = (b) => setForm((f) => ({ ...f, benefits: f.benefits.includes(b) ? f.benefits.filter((x) => x !== b) : [...f.benefits, b] }));

  const inputStyle = { border: `1px solid ${C.line}`, backgroundColor: C.paperRaised };
  const label = (t) => <label className="f-body mb-1 block text-[13px] font-semibold" style={{ color: C.ink }}>{t}</label>;

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <button onClick={() => go(-1)} className="f-body mb-6 flex items-center gap-1.5 text-[13px]" style={{ color: C.inkSoft }}>
        <ArrowLeft size={14} /> Back
      </button>
      <h1 className="f-display text-3xl" style={{ color: C.ink }}>List a new event</h1>
      <p className="f-body mt-1 text-[14px]" style={{ color: C.inkSoft }}>The more detail you give, the better sponsor matches you'll get.</p>

      <div className="mt-8 space-y-5">
        <div><label className="f-body mb-1 block text-[13px] font-semibold" style={{ color: C.ink }}>Event name</label>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. TechNova 2026" className="f-body w-full rounded-md px-3 py-2.5 text-[14px] outline-none" style={inputStyle} /></div>
        <div><label className="f-body mb-1 block text-[13px] font-semibold" style={{ color: C.ink }}>Organization / college name</label>
          <input value={form.org} onChange={(e) => set("org", e.target.value)} className="f-body w-full rounded-md px-3 py-2.5 text-[14px] outline-none" style={inputStyle} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="f-body mb-1 block text-[13px] font-semibold" style={{ color: C.ink }}>Category</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)} className="f-body w-full rounded-md px-3 py-2.5 text-[14px]" style={inputStyle}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
          <div><label className="f-body mb-1 block text-[13px] font-semibold" style={{ color: C.ink }}>City</label>
            <select value={form.city} onChange={(e) => set("city", e.target.value)} className="f-body w-full rounded-md px-3 py-2.5 text-[14px]" style={inputStyle}>{CITIES.map((c) => <option key={c}>{c}</option>)}</select></div>
        </div>
        <div><label className="f-body mb-1 block text-[13px] font-semibold" style={{ color: C.ink }}>Event date</label>
          <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className="f-body w-full rounded-md px-3 py-2.5 text-[14px] outline-none" style={inputStyle} /></div>
        <div><label className="f-body mb-1 block text-[13px] font-semibold" style={{ color: C.ink }}>Description</label>
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} className="f-body w-full rounded-md px-3 py-2.5 text-[14px] outline-none" style={inputStyle} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="f-body mb-1 block text-[13px] font-semibold" style={{ color: C.ink }}>Expected audience</label>
            <input type="number" value={form.expectedAudience} onChange={(e) => set("expectedAudience", e.target.value)} placeholder="e.g. 2000" className="f-body w-full rounded-md px-3 py-2.5 text-[14px] outline-none" style={inputStyle} /></div>
          <div><label className="f-body mb-1 block text-[13px] font-semibold" style={{ color: C.ink }}>Target audience</label>
            <input value={form.targetAudience} onChange={(e) => set("targetAudience", e.target.value)} placeholder="e.g. Students, 18–24" className="f-body w-full rounded-md px-3 py-2.5 text-[14px] outline-none" style={inputStyle} /></div>
        </div>
        <div><label className="f-body mb-1 block text-[13px] font-semibold" style={{ color: C.ink }}>Sponsorship type</label>
          <div className="flex gap-2">
            {["Monetary", "Product/Barter", "Both"].map((t) => (
              <button key={t} onClick={() => set("sponsorshipType", t)} className="f-body flex-1 rounded-md px-3 py-2 text-[13px] font-semibold" style={{ backgroundColor: form.sponsorshipType === t ? C.navy : C.navySoft, color: form.sponsorshipType === t ? "#fff" : C.navy }}>{t}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="f-body mb-1 block text-[13px] font-semibold" style={{ color: C.ink }}>Budget from (₹)</label>
            <input type="number" value={form.budgetMin} onChange={(e) => set("budgetMin", e.target.value)} className="f-body w-full rounded-md px-3 py-2.5 text-[14px] outline-none" style={inputStyle} /></div>
          <div><label className="f-body mb-1 block text-[13px] font-semibold" style={{ color: C.ink }}>Budget to (₹)</label>
            <input type="number" value={form.budgetMax} onChange={(e) => set("budgetMax", e.target.value)} className="f-body w-full rounded-md px-3 py-2.5 text-[14px] outline-none" style={inputStyle} /></div>
        </div>
        <div><label className="f-body mb-1 block text-[13px] font-semibold" style={{ color: C.ink }}>What sponsors get in return</label>
          <div className="grid grid-cols-2 gap-2">
            {BENEFIT_SET.map((b) => (
              <button key={b} onClick={() => toggleBenefit(b)} className="f-body flex items-center gap-2 rounded-md px-3 py-2 text-left text-[13px]" style={{ backgroundColor: form.benefits.includes(b) ? C.tealSoft : C.paper, border: `1px solid ${form.benefits.includes(b) ? C.teal : C.line}`, color: C.ink }}>
                {form.benefits.includes(b) ? <Check size={14} style={{ color: C.teal }} /> : <span className="h-3.5 w-3.5 rounded-sm" style={{ border: `1px solid ${C.line}` }} />} {b}
              </button>
            ))}
          </div>
        </div>
        <div><label className="f-body mb-1 block text-[13px] font-semibold" style={{ color: C.ink }}>Sponsorship requirements</label>
          <textarea value={form.requirements} onChange={(e) => set("requirements", e.target.value)} rows={2} placeholder="What are you specifically looking for?" className="f-body w-full rounded-md px-3 py-2.5 text-[14px] outline-none" style={inputStyle} /></div>

        <Button full variant="marigold" onClick={() => { if (!form.name || !form.org) return; onCreate(form); }}>Publish event</Button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   ORGANIZER DASHBOARD
---------------------------------------------------------------------- */
function OrganizerDashboard({ events, sponsors, go, setSelectedEventId, setSelectedSponsorId, myEventIds, interestsReceived }) {
  const myEvents = events.filter((e) => myEventIds.includes(e.id));
  const primaryEvent = myEvents[0];
  const applications = interestsReceived.length;
  const recommended = primaryEvent
    ? [...sponsors].map((s) => ({ s, m: computeMatch(primaryEvent, s) })).sort((a, b) => b.m.score - a.m.score).slice(0, 4)
    : [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="f-display text-3xl" style={{ color: C.ink }}>Welcome back, {DEMO_ORGANIZER.name.split(" ")[0]}</h1>
      <p className="f-body mt-1 text-[14px]" style={{ color: C.inkSoft }}>{DEMO_ORGANIZER.org}</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Active events" value={myEvents.length} />
        <Stat label="Applications" value={applications} />
        <Stat label="Sponsor matches" value={recommended.filter((r) => r.m.score >= 60).length} />
        <Stat label="Connections" value={interestsReceived.length} />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="f-display text-xl" style={{ color: C.ink }}>My events</h2>
        <Button variant="subtle" icon={Plus} onClick={() => go("createEvent")}>New event</Button>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {myEvents.map((e) => (
          <EventCard key={e.id} event={e} onView={(id) => { setSelectedEventId(id); go("eventDetails"); }} right={<Pill tone="teal">Live</Pill>} />
        ))}
        {myEvents.length === 0 && <p className="f-body text-[14px]" style={{ color: C.inkSoft }}>You haven't listed an event yet.</p>}
      </div>

      <div className="mt-10">
        <h2 className="f-display text-xl" style={{ color: C.ink }}>Recommended sponsors</h2>
        <p className="f-body mt-1 text-[13px]" style={{ color: C.inkSoft }}>Ranked by fit with {primaryEvent?.name || "your event"}</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {recommended.map(({ s, m }) => (
            <SponsorCard key={s.id} sponsor={s} matchScore={m.score} onView={(id) => { setSelectedSponsorId(id); go("sponsorProfile"); }} />
          ))}
        </div>
        <div className="mt-4">
          <Button variant="ghost" onClick={() => go("browseSponsors")}>Browse all sponsors</Button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   SPONSOR DASHBOARD
---------------------------------------------------------------------- */
function SponsorDashboard({ events, sponsor, go, setSelectedEventId, saved, interested }) {
  const recommended = [...events].map((e) => ({ e, m: computeMatch(e, sponsor) })).sort((a, b) => b.m.score - a.m.score).slice(0, 4);
  const savedEvents = events.filter((e) => saved.includes(e.id));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="f-display text-3xl" style={{ color: C.ink }}>Welcome back, {DEMO_SPONSOR.name.split(" ")[0]}</h1>
      <p className="f-body mt-1 text-[14px]" style={{ color: C.inkSoft }}>{sponsor.brand}</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Saved events" value={savedEvents.length} />
        <Stat label="Interested" value={interested.length} />
        <Stat label="Active partnerships" value={0} />
        <Stat label="Strong matches" value={recommended.filter((r) => r.m.score >= 80).length} />
      </div>

      <div className="mt-10">
        <h2 className="f-display text-xl" style={{ color: C.ink }}>Recommended events</h2>
        <p className="f-body mt-1 text-[13px]" style={{ color: C.inkSoft }}>Ranked by fit with {sponsor.brand}'s preferences</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {recommended.map(({ e, m }) => (
            <EventCard key={e.id} event={e} matchScore={m.score} onView={(id) => { setSelectedEventId(id); go("eventDetails"); }} />
          ))}
        </div>
        <div className="mt-4"><Button variant="ghost" onClick={() => go("browseEvents")}>Browse all events</Button></div>
      </div>

      {savedEvents.length > 0 && (
        <div className="mt-10">
          <h2 className="f-display text-xl" style={{ color: C.ink }}>Saved events</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {savedEvents.map((e) => <EventCard key={e.id} event={e} onView={(id) => { setSelectedEventId(id); go("eventDetails"); }} />)}
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------
   APP — routing via state (no real router needed for a prototype)
---------------------------------------------------------------------- */
export default function App() {
  const [history, setHistory] = useState(["landing"]);
  const view = history[history.length - 1];
  const [role, setRole] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedSponsorId, setSelectedSponsorId] = useState(null);
  const [events, setEvents] = useState(EVENTS);
  const [myEventIds, setMyEventIds] = useState(["e1"]);
  const [saved, setSaved] = useState([]);
  const [interested, setInterested] = useState([]); // sponsor's expressed interest in event ids (or organizer's invites)

  const go = (target) => {
    if (target === -1) { setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h)); return; }
    setHistory((h) => [...h, target]);
    window.scrollTo?.(0, 0);
  };
  const exit = () => { setRole(null); setHistory(["landing"]); };

  const selectedEvent = events.find((e) => e.id === selectedEventId);
  const selectedSponsor = SPONSORS.find((s) => s.id === selectedSponsorId);
  const currentSponsor = role === "sponsor" ? SPONSORS.find((s) => s.id === DEMO_SPONSOR.brandId) : null;
  const currentOrganizerEvent = role === "organizer" ? events.find((e) => e.id === myEventIds[0]) : null;

  const toggleSave = (id) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const expressInterest = (id) => setInterested((s) => (s.includes(id) ? s : [...s, id]));

  const handleCreateEvent = (form) => {
    const id = "e" + (events.length + 1);
    const newEvent = {
      id, name: form.name, org: form.org, category: form.category, city: form.city, date: form.date || "2026-12-01",
      description: form.description, expectedAudience: Number(form.expectedAudience) || 500, targetAudience: form.targetAudience || "General audience",
      socialReach: "", sponsorshipType: form.sponsorshipType, budgetMin: Number(form.budgetMin) || 10000, budgetMax: Number(form.budgetMax) || 50000,
      requirements: form.requirements, benefits: form.benefits.length ? form.benefits : ["Logo placement"],
    };
    setEvents((e) => [newEvent, ...e]);
    setMyEventIds((m) => [id, ...m]);
    setSelectedEventId(id);
    setHistory(["landing", "organizerDashboard"]);
  };

  let content;
  if (view === "landing") content = <Landing go={go} />;
  else if (view === "roleSelect") content = <Landing go={go} />;
  else if (view === "auth-organizer") content = <AuthMock roleHint="organizer" go={go} setRole={setRole} />;
  else if (view === "auth-sponsor") content = <AuthMock roleHint="sponsor" go={go} setRole={setRole} />;
  else if (view === "organizerDashboard") content = <OrganizerDashboard events={events} sponsors={SPONSORS} go={go} setSelectedEventId={setSelectedEventId} setSelectedSponsorId={setSelectedSponsorId} myEventIds={myEventIds} interestsReceived={interested} />;
  else if (view === "sponsorDashboard") content = <SponsorDashboard events={events} sponsor={currentSponsor || SPONSORS[0]} go={go} setSelectedEventId={setSelectedEventId} saved={saved} interested={interested} />;
  else if (view === "browseEvents") content = <BrowseEvents events={events} go={go} setSelectedEventId={setSelectedEventId} currentSponsor={currentSponsor} saved={saved} toggleSave={toggleSave} interestedIds={interested} />;
  else if (view === "browseSponsors") content = <BrowseSponsors sponsors={SPONSORS} go={go} setSelectedSponsorId={setSelectedSponsorId} currentEvent={currentOrganizerEvent} />;
  else if (view === "eventDetails") content = <EventDetails event={selectedEvent} go={go} currentSponsor={currentSponsor} expressInterest={expressInterest} interested={interested} />;
  else if (view === "sponsorProfile") content = <SponsorProfile sponsor={selectedSponsor} go={go} events={events} currentEvent={currentOrganizerEvent} expressInterest={expressInterest} interested={interested} />;
  else if (view === "createEvent") content = <CreateEventForm onCreate={handleCreateEvent} go={go} />;
  else content = <Landing go={go} />;

  return (
    <div className="f-body min-h-screen" style={{ backgroundColor: C.paper }}>
      {FONTS}
      <Navbar go={(v) => { if (v === "landing") exit(); else setHistory((h) => [...h, v]); }} role={role} onExit={exit} />
      {content}
      <div className="border-t py-8 text-center" style={{ borderColor: C.line }}>
        <p className="f-body text-[12px]" style={{ color: C.inkSoft }}>Setu — BCA capstone prototype. Registration, login, and messaging are simulated for this demo.</p>
      </div>
    </div>
  );
}
