/* global React */
const { useState, useEffect, useRef } = React;

function useMediaQuery(query) {
  const getMatches = () => (typeof window === "undefined" ? false : window.matchMedia(query).matches);
  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

// ── Top marquee bar ──────────────────────────────────────────────
function Marquee() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const bits = [
    "Open daily, call to confirm",
    "Sandwiches made to order",
    "Boba stand now serving",
    "We sell lottery tickets",
    "Across from Ashby BART",
    "Family-run since '09",
    "Exotic sodas, all the time",
  ];
  const all = [...bits, ...bits, ...bits];
  return (
    <div style={{
      borderTop: "2px solid var(--ink)",
      borderBottom: "2px solid var(--ink)",
      background: "var(--ink)",
      color: "var(--paper)",
      overflow: "hidden",
      position: "relative",
      zIndex: 2,
    }}>
      <div style={{
        display: "flex",
        gap: 48,
        whiteSpace: "nowrap",
        padding: "10px 0",
        fontFamily: "var(--mono)",
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        animation: reduceMotion ? "none" : "scroll 60s linear infinite",
      }}>
        {all.map((b, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 48 }}>
            {b} <span style={{ opacity: 0.6 }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}

// ── Top nav (sticky) ─────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 760px)");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const items = [
    ["Sandwiches", "#sandwiches"],
    ["Aisles", "#aisles"],
    ["Visit", "#visit"],
    ["The Family", "#family"],
  ];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "rgba(242,234,217,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(26,23,20,0.15)" : "1px solid transparent",
      transition: "all 220ms ease",
    }}>
      <div style={{
        maxWidth: 1440, margin: "0 auto",
        padding: isMobile ? "14px 16px 12px" : "16px 40px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "stretch" : "center",
        justifyContent: "space-between",
        gap: isMobile ? 12 : 0,
      }}>
        <a href="#top" style={{
          fontFamily: "var(--display)",
          fontSize: isMobile ? 24 : 22,
          fontStyle: "italic",
          textDecoration: "none",
          letterSpacing: 0,
        }}>
          Ashby Super Market
        </a>
        <ul style={{
          listStyle: "none", margin: 0, padding: 0,
          display: "flex",
          gap: isMobile ? "8px 14px" : 28,
          flexWrap: isMobile ? "wrap" : "nowrap",
          overflowX: "visible",
          paddingBottom: isMobile ? 2 : 0,
          width: isMobile ? "100%" : "auto",
          fontFamily: "var(--mono)", fontSize: isMobile ? 11 : 12,
          textTransform: "uppercase", letterSpacing: "0.08em",
          whiteSpace: "nowrap",
        }}>
          {items.map(([label, href]) => (
            <li key={href}>
              <a href={href} style={{ textDecoration: "none" }}>{label}</a>
            </li>
          ))}
          <li>
            <a href="#order" style={{
              textDecoration: "none",
              background: "var(--ink)",
              color: "var(--paper)",
              padding: isMobile ? "5px 10px" : "6px 12px",
              borderRadius: 999,
            }}>Order →</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// ── Hero — broadsheet layout ─────────────────────────────────────
function Hero({ sticker }) {
  const isMobile = useMediaQuery("(max-width: 760px)");
  const isTiny = useMediaQuery("(max-width: 430px)");
  return (
    <header id="top" style={{ position: "relative", padding: isMobile ? "20px 16px 0" : "32px 40px 0", maxWidth: 1440, margin: "0 auto" }}>
      {/* masthead row */}
      <div style={{
        display: isMobile ? "grid" : "flex",
        gridTemplateColumns: "1fr",
        justifyContent: "space-between",
        alignItems: isMobile ? "start" : "flex-end",
        gap: isMobile ? 4 : 0,
        fontFamily: "var(--mono)", fontSize: isMobile ? 10 : 11,
        textTransform: "uppercase", letterSpacing: "0.08em",
        paddingBottom: 12,
      }}>
        <span>Vol. XVII · No. 04</span>
        <span>South Berkeley · Est. {STORE.est}</span>
        {!isMobile && <span>{STORE.domain}</span>}
      </div>
      <hr className="hr-thick" />
      <div style={{
        display: isMobile ? "grid" : "flex",
        gridTemplateColumns: "1fr",
        gap: isMobile ? 4 : 0,
        justifyContent: "space-between",
        fontFamily: "var(--mono)", fontSize: 10,
        textTransform: "uppercase", letterSpacing: "0.08em",
        padding: isMobile ? "8px 0" : "6px 0",
        opacity: 0.85,
      }}>
        <span>The corner-store paper of record</span>
        <span>Tuesday Morning Edition</span>
        {!isMobile && <span>Free with purchase</span>}
      </div>
      <hr className="hr-thin" />

      {/* main hero */}
      <div style={{
        position: "relative",
        padding: isMobile ? "34px 0 40px" : "48px 0 56px",
      }}>
        <div style={{
          fontFamily: "var(--mono)", fontSize: isMobile ? 11 : 12,
          textTransform: "uppercase", letterSpacing: "0.08em",
          marginBottom: 18,
          display: "flex", gap: 10, alignItems: "center",
          flexWrap: "wrap",
        }}>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 999, background: "var(--tomato)" }}></span>
          Deli · groceries · boba · lottery
        </div>

        <h1 style={{
          fontFamily: "var(--display)",
          fontWeight: 400,
          fontSize: isMobile ? (isTiny ? 48 : 58) : "clamp(64px, 12vw, 188px)",
          lineHeight: isMobile ? 0.96 : 0.88,
          margin: 0,
          letterSpacing: 0,
        }}>
          Sandwiches,<br />
          <span style={{ fontStyle: "italic", color: "var(--tomato)" }}>sodas</span>, scratchers
          <span style={{ color: "var(--olive)" }}>.</span>
        </h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr 1fr",
          gap: isMobile ? 24 : 40,
          marginTop: isMobile ? 32 : 56,
          alignItems: "start",
        }}>
          <p style={{
            fontFamily: "var(--display)",
            fontSize: isMobile ? 22 : 26,
            lineHeight: 1.3,
            margin: 0,
            maxWidth: 460,
          }}>
            A small, family-run corner store across from Ashby BART. Boar's Head deli, organic milk,
            a wall of exotic sodas, and the boba stand we added last summer.
          </p>

          <div>
            <div className="mono upper" style={{ fontSize: 11, opacity: 0.65, marginBottom: 8 }}>Find us</div>
            <div style={{ fontFamily: "var(--display)", fontSize: 22, lineHeight: 1.3 }}>
              {STORE.address}<br />
              {STORE.cityLine}
            </div>
            <div className="mono" style={{ fontSize: 13, marginTop: 10 }}>
              {STORE.phone}
            </div>
          </div>

          <div>
            <div className="mono upper" style={{ fontSize: 11, opacity: 0.65, marginBottom: 8 }}>Today</div>
            <div style={{ fontFamily: "var(--display)", fontSize: 22, lineHeight: 1.3 }}>
              Call to confirm hours<br />
              <span style={{ fontStyle: "italic", color: "var(--olive)" }}>Delivery windows vary.</span>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
              <a href="#sandwiches" style={pillBtn(true)}>See the deli menu →</a>
              <a href={`tel:${STORE.phoneTel}`} style={pillBtn(false)}>Call now</a>
              <a href="#visit" style={pillBtn(false)}>Directions</a>
            </div>
          </div>
        </div>

        {/* Sticker badge */}
        {sticker && !isMobile && (
          <div style={{
            position: "absolute",
            top: 40, right: 0,
            width: 168, height: 168,
            transform: "rotate(-8deg)",
          }}>
            <Sticker />
          </div>
        )}
      </div>

      <hr className="hr-thick" />
    </header>
  );
}

function pillBtn(primary) {
  return {
    fontFamily: "var(--mono)",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    padding: "9px 14px",
    border: "1.5px solid var(--ink)",
    borderRadius: 999,
    background: primary ? "var(--ink)" : "transparent",
    color: primary ? "var(--paper)" : "var(--ink)",
    textDecoration: "none",
    display: "inline-block",
  };
}

function Sticker() {
  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
      <defs>
        <path id="circ" d="M 100,100 m -76,0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0" />
      </defs>
      <circle cx="100" cy="100" r="96" fill="var(--tomato)" />
      <circle cx="100" cy="100" r="56" fill="var(--paper)" />
      <text fontFamily="var(--mono)" fontSize="13" fill="var(--paper)" letterSpacing="3">
        <textPath href="#circ" startOffset="0">
          FRESH SANDWICHES · ICE COLD SODAS · LOTTERY · ORGANIC MILK ·
        </textPath>
      </text>
      <text x="100" y="92" textAnchor="middle" fontFamily="var(--display)" fontStyle="italic" fontSize="22" fill="var(--ink)">since</text>
      <text x="100" y="118" textAnchor="middle" fontFamily="var(--display)" fontSize="32" fill="var(--ink)" fontWeight="500">2009</text>
    </svg>
  );
}

// ── Feature strip ────────────────────────────────────────────────
function FeatureStrip() {
  const isMobile = useMediaQuery("(max-width: 760px)");
  return (
    <section style={{ maxWidth: 1440, margin: "0 auto", padding: isMobile ? "24px 16px 48px" : "32px 40px 64px" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: 0,
        border: "2px solid var(--ink)",
        background: "var(--paper-deep)",
      }}>
        {FEATURES.map((f, i) => (
          <div key={i} style={{
            padding: isMobile ? "18px 18px" : "22px 26px",
            borderRight: isMobile || (i + 1) % 3 === 0 ? "none" : "1px solid var(--ink)",
            borderBottom: isMobile ? (i < FEATURES.length - 1 ? "1px solid var(--ink)" : "none") : (i < 3 ? "1px solid var(--ink)" : "none"),
          }}>
            <div className="mono upper" style={{ fontSize: 10, opacity: 0.6, marginBottom: 4 }}>
              No. {String(i + 1).padStart(2, "0")}
            </div>
            <div style={{ fontFamily: "var(--display)", fontSize: isMobile ? 24 : 26, lineHeight: 1.1, marginBottom: 6 }}>
              {f.k}
            </div>
            <div style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.4 }}>
              {f.v}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Marquee, Nav, Hero, FeatureStrip, pillBtn });
