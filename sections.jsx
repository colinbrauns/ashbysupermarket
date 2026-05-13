/* global React, SANDWICHES, BUILD_OPTIONS, AISLES, REVIEWS, HOURS, STORE, ORDER_LINKS, pillBtn */
const { useState, useEffect } = React;

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

// ── Sandwich menu / deli board ───────────────────────────────────
function Sandwiches() {
  const [hover, setHover] = useState(null);
  const isMobile = useMediaQuery("(max-width: 760px)");
  return (
    <section id="sandwiches" style={{
      background: "var(--ink)",
      color: "var(--paper)",
      padding: isMobile ? "64px 16px" : "96px 40px",
      scrollMarginTop: isMobile ? 120 : 80,
    }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "stretch" : "baseline",
          marginBottom: isMobile ? 28 : 36,
          flexWrap: "wrap",
          gap: isMobile ? 18 : 16,
        }}>
          <div>
            <div className="mono upper" style={{ fontSize: 11, opacity: 0.55, marginBottom: 10 }}>
              The Deli Counter · Section A
            </div>
            <h2 style={{
              fontFamily: "var(--display)",
              fontWeight: 400,
              fontSize: isMobile ? 42 : "clamp(48px, 7vw, 96px)",
              lineHeight: isMobile ? 1 : 0.95,
              margin: 0,
              letterSpacing: 0,
            }}>
              Made to order,<br />
              <span style={{ fontStyle: "italic", color: "var(--tomato)" }}>cut to order</span>,<br />
              wrapped in paper.
            </h2>
          </div>
          <div style={{ maxWidth: isMobile ? "none" : 360, fontSize: 15, lineHeight: 1.55, opacity: 0.8 }}>
            All sandwiches built on house focaccia, ciabatta, soft roll, whole wheat, or wrap.
            Boar's Head meats. Cheese cut from the block. We toast it if you want.
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: 0,
          border: "1px solid rgba(242,234,217,0.25)",
        }}>
          {SANDWICHES.map((s, i) => {
            const right = i % 2 === 1;
            return (
              <div key={s.n}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{
                  padding: isMobile ? "20px 16px" : "28px 32px",
                  borderRight: isMobile || right ? "none" : "1px solid rgba(242,234,217,0.25)",
                  borderBottom: isMobile ? (i < SANDWICHES.length - 1 ? "1px solid rgba(242,234,217,0.25)" : "none") : (i < SANDWICHES.length - 2 ? "1px solid rgba(242,234,217,0.25)" : "none"),
                  display: "grid",
                  gridTemplateColumns: isMobile ? "34px minmax(0, 1fr)" : "48px 1fr auto",
                  gap: isMobile ? 12 : 18,
                  alignItems: "start",
                  background: hover === i ? "rgba(210,75,58,0.08)" : "transparent",
                  transition: "background 140ms ease",
                  cursor: "pointer",
                }}>
                <div className="mono" style={{ fontSize: 13, opacity: 0.5, paddingTop: 8 }}>
                  {s.n}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--display)", fontSize: isMobile ? 27 : 32, lineHeight: 1.05 }}>
                      {s.name}
                    </span>
                    <Tag kind={s.tag} />
                  </div>
                  <div style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.5, maxWidth: 440 }}>
                    {s.desc}
                  </div>
                </div>
                <div style={{
                  fontFamily: "var(--mono)",
                  fontSize: 14,
                  whiteSpace: "nowrap",
                  paddingTop: isMobile ? 0 : 8,
                  color: "var(--tomato)",
                  gridColumn: isMobile ? "2" : "auto",
                  gridRow: isMobile ? "2" : "auto",
                }}>
                  {s.price}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: 28,
          padding: isMobile ? "18px 16px" : "20px 24px",
          border: "1px dashed rgba(242,234,217,0.4)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: 20,
          flexWrap: "wrap",
        }}>
          <div style={{ fontFamily: "var(--display)", fontSize: isMobile ? 21 : 22, fontStyle: "italic" }}>
            Don't see what you want? Tell us. We build custom.
          </div>
          <a href={`tel:${STORE.phoneTel}`} style={{
            ...pillBtn(true),
            background: "var(--tomato)",
            borderColor: "var(--tomato)",
          }}>
            Call to order · {STORE.phone}
          </a>
        </div>

        <div id="order" style={{
          scrollMarginTop: isMobile ? 120 : 80,
          marginTop: 18,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr",
          gap: 18,
        }}>
          <div style={{
            padding: isMobile ? "18px 16px" : "22px 24px",
            border: "1px solid rgba(242,234,217,0.25)",
          }}>
            <div className="mono upper" style={{ fontSize: 11, opacity: 0.6, marginBottom: 10 }}>Build your own</div>
            <div style={{ display: "grid", gap: 12 }}>
              {BUILD_OPTIONS.map(group => (
                <div key={group.label}>
                  <div style={{ fontFamily: "var(--display)", fontSize: 22, lineHeight: 1.1, marginBottom: 4 }}>
                    {group.label}
                  </div>
                  <div className="mono" style={{ fontSize: 12, lineHeight: 1.55, opacity: 0.72 }}>
                    {group.items.join(" · ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            padding: isMobile ? "18px 16px" : "22px 24px",
            border: "1px solid rgba(242,234,217,0.25)",
            background: "rgba(242,234,217,0.04)",
          }}>
            <div className="mono upper" style={{ fontSize: 11, opacity: 0.6, marginBottom: 10 }}>Order online</div>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
              gap: 10,
            }}>
              {ORDER_LINKS.map(link => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener" style={{
                  color: "var(--paper)",
                  textDecoration: "none",
                  border: "1px solid rgba(242,234,217,0.25)",
                  padding: "12px 14px",
                  minHeight: 72,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}>
                  <span style={{ fontFamily: "var(--display)", fontSize: 23, lineHeight: 1 }}>{link.name} ↗</span>
                  <span className="mono upper" style={{ fontSize: 9, letterSpacing: "0.08em", opacity: 0.58 }}>{link.note}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tag({ kind }) {
  const map = {
    house:  { label: "House", bg: "var(--mustard)", color: "#1A1714" },
    hot:    { label: "Hot",   bg: "var(--tomato)",  color: "#F2EAD9" },
    veg:    { label: "Veg",   bg: "var(--olive)",   color: "#F2EAD9" },
    cold:   { label: "Cold",  bg: "transparent",    color: "#F2EAD9", border: "1px solid rgba(242,234,217,0.5)" },
    byo:    { label: "Build your own", bg: "var(--paper)", color: "#1A1714" },
  };
  const t = map[kind] || map.cold;
  return (
    <span style={{
      fontFamily: "var(--mono)",
      fontSize: 9,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      padding: "3px 8px",
      borderRadius: 999,
      background: t.bg,
      color: t.color,
      border: t.border || "none",
    }}>{t.label}</span>
  );
}

// ── Aisles directory ─────────────────────────────────────────────
function Aisles() {
  const isMobile = useMediaQuery("(max-width: 760px)");
  return (
    <section id="aisles" style={{
      padding: isMobile ? "64px 16px" : "96px 40px",
      maxWidth: 1440,
      margin: "0 auto",
      scrollMarginTop: isMobile ? 120 : 80,
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? 22 : 60,
        marginBottom: isMobile ? 30 : 48,
        alignItems: "end",
      }}>
        <div>
          <div className="mono upper" style={{ fontSize: 11, opacity: 0.55, marginBottom: 10 }}>
            What we carry · Inventory list
          </div>
          <h2 style={{
            fontFamily: "var(--display)", fontWeight: 400,
            fontSize: isMobile ? 42 : "clamp(48px, 7vw, 96px)",
            lineHeight: isMobile ? 1 : 0.95, margin: 0, letterSpacing: 0,
          }}>
            Eight tight aisles.<br />
            <span style={{ fontStyle: "italic" }}>One </span>
            <span style={{ color: "var(--tomato)" }}>good</span>
            <span style={{ fontStyle: "italic" }}> store.</span>
          </h2>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0, maxWidth: isMobile ? "none" : 480 }}>
          We're small on purpose. Every shelf is picked by someone who works here.
          If you want something we don't have, ask — we'll often get it next week.
        </p>
      </div>

      <div style={{ border: "2px solid var(--ink)" }}>
        {AISLES.map((a, i) => (
          <div key={a.row} style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "54px minmax(0, 1fr)" : "80px 240px 1fr 80px",
            borderBottom: i < AISLES.length - 1 ? "1px solid var(--ink)" : "none",
            background: i % 2 === 0 ? "transparent" : "rgba(26,23,20,0.03)",
            alignItems: isMobile ? "start" : "center",
          }}>
            <div style={{
              fontFamily: "var(--display)",
              fontSize: isMobile ? 42 : 56,
              padding: isMobile ? "16px 0 0 14px" : "16px 0 16px 24px",
              fontStyle: "italic",
              color: "var(--tomato)",
              lineHeight: 1,
            }}>
              {a.row}
            </div>
            <div style={{
              fontFamily: "var(--display)",
              fontSize: isMobile ? 24 : 28,
              padding: isMobile ? "16px 14px 0 0" : "20px 0",
              lineHeight: 1.1,
            }}>
              {a.label}
            </div>
            <div style={{
              gridColumn: isMobile ? "1 / -1" : "auto",
              padding: isMobile ? "8px 14px 16px" : "20px 24px",
              fontSize: 14,
              color: "var(--ink-soft)",
              fontFamily: "var(--mono)",
              lineHeight: 1.55,
            }}>
              {a.items.join(" · ")}
            </div>
            {!isMobile && (
              <div className="mono upper" style={{
                fontSize: 10,
                textAlign: "right",
                paddingRight: 24,
                opacity: 0.45,
              }}>
                Aisle {String(i + 1).padStart(2, "0")}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Visit / hours / map ──────────────────────────────────────────
function Visit() {
  const isMobile = useMediaQuery("(max-width: 760px)");
  const isTablet = useMediaQuery("(max-width: 980px)");
  return (
    <section id="visit" style={{
      background: "var(--paper-deep)",
      borderTop: "2px solid var(--ink)",
      borderBottom: "2px solid var(--ink)",
      padding: isMobile ? "64px 16px" : "96px 40px",
      scrollMarginTop: isMobile ? 120 : 80,
    }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div className="mono upper" style={{ fontSize: 11, opacity: 0.55, marginBottom: 10 }}>
          Visit us · {STORE.neighborhood}
        </div>
        <h2 style={{
          fontFamily: "var(--display)", fontWeight: 400,
          fontSize: isMobile ? 42 : "clamp(48px, 7vw, 96px)",
          lineHeight: isMobile ? 1 : 0.95, margin: isMobile ? "0 0 30px" : "0 0 48px", letterSpacing: 0,
          maxWidth: 1000,
        }}>
          Two blocks south of campus,<br />
          <span style={{ fontStyle: "italic", color: "var(--tomato)" }}>across the street</span> from the BART.
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: isTablet ? "1fr" : "1.4fr 1fr 1fr",
          gap: isMobile ? 16 : 24,
        }}>
          <Map />
          <div style={{
            background: "var(--paper)",
            border: "2px solid var(--ink)",
            padding: isMobile ? "22px 18px" : "28px 28px",
          }}>
            <div className="mono upper" style={{ fontSize: 11, marginBottom: 14 }}>Address</div>
            <div style={{ fontFamily: "var(--display)", fontSize: isMobile ? 24 : 28, lineHeight: 1.2, marginBottom: 18 }}>
              {STORE.address}<br />
              {STORE.cityLine}
            </div>
            <div className="mono upper" style={{ fontSize: 11, marginBottom: 6 }}>Phone</div>
            <div style={{ fontFamily: "var(--display)", fontSize: 22, marginBottom: 20 }}>
              {STORE.phone}
            </div>
            <div className="mono upper" style={{ fontSize: 11, marginBottom: 6 }}>Transit</div>
            <div style={{ fontSize: 15, lineHeight: 1.5 }}>
              Ashby BART, 1-min walk.<br />
              AC Transit 18 + F lines.
            </div>
            <a href={STORE.mapsUrl} target="_blank" rel="noopener" style={{
              ...pillBtn(true),
              marginTop: 22,
              background: "var(--tomato)",
              borderColor: "var(--tomato)",
              color: "var(--paper)",
            }}>Open in Maps →</a>
          </div>
          <div style={{
            background: "var(--paper)",
            border: "2px solid var(--ink)",
            padding: isMobile ? "22px 18px" : "28px 28px",
          }}>
            <div className="mono upper" style={{ fontSize: 11, marginBottom: 14 }}>Hours</div>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 22 }}>
              <tbody>
                {HOURS.map(([d, h], i) => {
                  const today = new Date().getDay();
                  const dayIdx = [1,2,3,4,5,6,0][i];
                  const isToday = dayIdx === today;
                  return (
                    <tr key={d} style={{ borderBottom: "1px solid rgba(26,23,20,0.15)" }}>
                      <td style={{
                        padding: "8px 0",
                        fontFamily: "var(--mono)",
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: isToday ? "var(--tomato)" : "inherit",
                        fontWeight: isToday ? 700 : 400,
                      }}>
                        {isToday && "→ "}{d}{isToday && " (today)"}
                      </td>
                      <td style={{
                        padding: "8px 0",
                        fontFamily: "var(--mono)",
                        fontSize: 12,
                        textAlign: "right",
                        color: isToday ? "var(--tomato)" : "inherit",
                      }}>{h}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mono upper" style={{ fontSize: 11, marginBottom: 6 }}>Order online</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {ORDER_LINKS.map(link => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener" style={{
                  color: "inherit",
                  textDecoration: "none",
                  fontFamily: "var(--mono)", fontSize: 12,
                  display: "flex", justifyContent: "space-between",
                  borderBottom: "1px dashed rgba(26,23,20,0.2)",
                  paddingBottom: 4,
                }}>
                  <span>{link.name}</span><span style={{ opacity: 0.5 }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Stylized map placeholder ─────────────────────────────────────
function Map() {
  const isMobile = useMediaQuery("(max-width: 760px)");
  return (
    <div style={{
      position: "relative",
      border: "2px solid var(--ink)",
      background: "var(--paper)",
      minHeight: isMobile ? 280 : 420,
      overflow: "hidden",
    }}>
      {/* grid streets */}
      <svg width="100%" height="100%" viewBox="0 0 600 440" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.7" fill="rgba(26,23,20,0.25)" />
          </pattern>
        </defs>
        <rect width="600" height="440" fill="url(#dots)" />
        {/* roads */}
        <line x1="0" y1="160" x2="600" y2="160" stroke="rgba(26,23,20,0.35)" strokeWidth="22" />
        <line x1="0" y1="160" x2="600" y2="160" stroke="var(--paper)" strokeWidth="20" />
        <line x1="0" y1="160" x2="600" y2="160" stroke="rgba(26,23,20,0.5)" strokeDasharray="6 8" strokeWidth="0.6" />

        <line x1="220" y1="0" x2="220" y2="440" stroke="rgba(26,23,20,0.35)" strokeWidth="22" />
        <line x1="220" y1="0" x2="220" y2="440" stroke="var(--paper)" strokeWidth="20" />
        <line x1="220" y1="0" x2="220" y2="440" stroke="rgba(26,23,20,0.5)" strokeDasharray="6 8" strokeWidth="0.6" />

        <line x1="0" y1="320" x2="600" y2="320" stroke="rgba(26,23,20,0.2)" strokeWidth="10" />
        <line x1="430" y1="0" x2="430" y2="440" stroke="rgba(26,23,20,0.2)" strokeWidth="10" />

        {/* BART rail */}
        <line x1="0" y1="80" x2="600" y2="80" stroke="var(--olive)" strokeWidth="3" strokeDasharray="2 6" />

        {/* labels */}
        <text x="14" y="172" fontFamily="var(--mono)" fontSize="9" fill="rgba(26,23,20,0.55)" letterSpacing="1.5">
          ASHBY AVE
        </text>
        <text x="228" y="22" fontFamily="var(--mono)" fontSize="9" fill="rgba(26,23,20,0.55)" letterSpacing="1.5">
          MLK JR WAY ↑
        </text>
        <text x="14" y="74" fontFamily="var(--mono)" fontSize="9" fill="var(--olive)" letterSpacing="1.5">
          BART · ASHBY STATION →
        </text>

        {/* The store */}
        <g transform="translate(220, 160)">
          <line x1="0" y1="0" x2="0" y2="-60" stroke="var(--tomato)" strokeWidth="2" />
          <circle r="9" fill="var(--tomato)" stroke="var(--ink)" strokeWidth="2" />
          <circle r="3" fill="var(--paper)" />
        </g>
        <g transform="translate(238, 96)">
          <rect x="-4" y="-12" width="148" height="38" fill="var(--ink)" />
          <text x="6" y="2" fontFamily="var(--display)" fontStyle="italic" fontSize="16" fill="var(--paper)">Ashby Super Market</text>
          <text x="6" y="18" fontFamily="var(--mono)" fontSize="8" fill="var(--paper)" letterSpacing="1">YOU ARE WELCOME HERE</text>
        </g>

        {/* compass */}
        <g transform="translate(550, 50)">
          <circle r="22" fill="none" stroke="var(--ink)" strokeWidth="1" />
          <text x="0" y="-8" textAnchor="middle" fontFamily="var(--mono)" fontSize="10">N</text>
          <line x1="0" y1="-4" x2="0" y2="4" stroke="var(--ink)" />
        </g>
      </svg>
      <div style={{
        position: "absolute", bottom: 12, left: 12,
        right: isMobile ? 12 : "auto",
        fontFamily: "var(--mono)", fontSize: 10,
        textTransform: "uppercase", letterSpacing: "0.08em",
        background: "var(--paper)",
        padding: "4px 8px",
        border: "1px solid var(--ink)",
        lineHeight: 1.35,
      }}>
        Not to scale · click "Open in Maps" for real
      </div>
    </div>
  );
}

// ── Reviews / quotes ─────────────────────────────────────────────
function Reviews() {
  const isMobile = useMediaQuery("(max-width: 760px)");
  return (
    <section style={{ padding: isMobile ? "64px 16px" : "96px 40px", maxWidth: 1440, margin: "0 auto" }}>
      <div className="mono upper" style={{ fontSize: 11, opacity: 0.55, marginBottom: 14 }}>
        Letters to the Editor · The Neighborhood says
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
        gap: 0,
        borderTop: "2px solid var(--ink)",
        borderBottom: "2px solid var(--ink)",
      }}>
        {REVIEWS.map((r, i) => (
          <div key={i} style={{
            padding: isMobile ? "28px 0" : "48px 36px",
            borderRight: isMobile || i % 2 !== 0 ? "none" : "1px solid var(--ink)",
            borderBottom: isMobile ? (i < REVIEWS.length - 1 ? "1px solid var(--ink)" : "none") : (i < 2 ? "1px solid var(--ink)" : "none"),
          }}>
            <div style={{
              fontFamily: "var(--display)",
              fontSize: isMobile ? 28 : 36,
              lineHeight: 1.15,
              fontStyle: "italic",
              marginBottom: 20,
              letterSpacing: 0,
              textWrap: "pretty",
            }}>
              "{r.q}"
            </div>
            <div className="mono upper" style={{ fontSize: 11, opacity: 0.6 }}>
              ↳ {r.who}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Family story + Instagram ─────────────────────────────────────
function Family() {
  const isMobile = useMediaQuery("(max-width: 760px)");
  return (
    <section id="family" style={{
      padding: isMobile ? "64px 16px" : "96px 40px",
      maxWidth: 1440,
      margin: "0 auto",
      scrollMarginTop: isMobile ? 120 : 80,
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr",
        gap: isMobile ? 42 : 80,
        alignItems: "start",
      }}>
        <div>
          <div className="mono upper" style={{ fontSize: 11, opacity: 0.55, marginBottom: 10 }}>
            The Family · About us
          </div>
          <h2 style={{
            fontFamily: "var(--display)", fontWeight: 400,
            fontSize: isMobile ? 42 : "clamp(48px, 7vw, 88px)",
            lineHeight: isMobile ? 1 : 0.95, margin: "0 0 28px", letterSpacing: 0,
          }}>
            <span style={{ fontStyle: "italic" }}>We've been</span> on this corner<br />
            <span style={{ color: "var(--tomato)" }}>since 2009</span>.
          </h2>
          <p style={{ fontFamily: "var(--display)", fontSize: 22, lineHeight: 1.4, marginBottom: 18 }}>
            Ashby Super Market is family-run. Whoever rings you up probably knows
            whoever stocked your milk this morning.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--ink-soft)" }}>
            We started as a small corner grocer with a deli counter and a fridge of
            sodas. Last year we added the boba stand. Next year — who knows. We try
            to stock the things our regulars ask for, and to remember your usual
            order if you come in often enough.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--ink-soft)" }}>
            Thanks for shopping here. It means something to us.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
            <a href="#sandwiches" style={pillBtn(true)}>Order a sandwich →</a>
            <a href={`https://instagram.com/${STORE.instagram.replace('@', '')}`} target="_blank" rel="noopener" style={pillBtn(false)}>
              Follow on Instagram
            </a>
          </div>
        </div>

        <InstagramGrid />
      </div>
    </section>
  );
}

function InstagramGrid() {
  const isMobile = useMediaQuery("(max-width: 760px)");
  const tiles = [
    { tone: "tomato", label: "New menu board", w: 1, h: 1 },
    { tone: "olive",  label: "Avocado day",    w: 1, h: 1 },
    { tone: "ink",    label: "Sandwich #04",   w: 1, h: 2 },
    { tone: "paper",  label: "Soda wall",      w: 1, h: 1 },
    { tone: "mustard",label: "Boba stand",     w: 1, h: 1 },
    { tone: "tomato", label: "Storefront, AM", w: 2, h: 1 },
  ];
  const toneBg = (t) => ({
    tomato:  "var(--tomato)",
    olive:   "var(--olive)",
    ink:     "var(--ink)",
    paper:   "var(--paper-deep)",
    mustard: "var(--mustard)",
  }[t]);
  const toneFg = (t) => (t === "paper" || t === "mustard" ? "var(--ink)" : "var(--paper)");
  return (
    <div>
      <div className="mono upper" style={{ fontSize: 11, opacity: 0.55, marginBottom: 12, display: "flex", justifyContent: "space-between" }}>
        <span>@ashbysupermarket</span>
        <span>↗ instagram</span>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(3, 1fr)",
        gridAutoRows: isMobile ? "130px" : "180px",
        gap: 8,
      }}>
        {tiles.map((t, i) => (
          <div key={i} style={{
            gridColumn: `span ${t.w}`,
            gridRow: `span ${t.h}`,
            background: toneBg(t.tone),
            color: toneFg(t.tone),
            position: "relative",
            overflow: "hidden",
            border: t.tone === "paper" ? "1px solid var(--ink)" : "none",
          }}>
            <PhotoPlaceholder label={t.label} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PhotoPlaceholder({ label }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      padding: 14,
      backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 9px)",
    }}>
      <div className="mono upper" style={{ fontSize: 9, opacity: 0.75, letterSpacing: "0.16em" }}>
        photo
      </div>
      <div className="mono" style={{ fontSize: 11, opacity: 0.9 }}>
        {label}
      </div>
    </div>
  );
}

// ── Footer ───────────────────────────────────────────────────────
function Footer() {
  const isMobile = useMediaQuery("(max-width: 760px)");
  return (
    <footer style={{
      background: "var(--ink)", color: "var(--paper)",
      padding: isMobile ? "64px 16px 28px" : "80px 40px 32px",
    }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{
          fontFamily: "var(--display)",
          fontSize: isMobile ? 64 : "clamp(80px, 18vw, 260px)",
          lineHeight: isMobile ? 0.95 : 0.85,
          letterSpacing: 0,
          fontStyle: "italic",
        }}>
          See you<br />
          <span style={{ color: "var(--tomato)", fontStyle: "normal" }}>tomorrow.</span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: isMobile ? 24 : 32,
          marginTop: isMobile ? 42 : 64,
          paddingTop: isMobile ? 24 : 32,
          borderTop: "1px solid rgba(242,234,217,0.25)",
        }}>
          <div>
            <div className="mono upper" style={{ fontSize: 10, opacity: 0.55, marginBottom: 10 }}>Address</div>
            <a href={STORE.mapsUrl} target="_blank" rel="noopener" style={{ display: "block", color: "inherit", fontSize: 14, lineHeight: 1.5 }}>
              {STORE.address}<br />{STORE.cityLine}
            </a>
          </div>
          <div>
            <div className="mono upper" style={{ fontSize: 10, opacity: 0.55, marginBottom: 10 }}>Hours</div>
            <div style={{ fontSize: 14, lineHeight: 1.5 }}>
              Daily<br />9am-10pm
            </div>
          </div>
          <div>
            <div className="mono upper" style={{ fontSize: 10, opacity: 0.55, marginBottom: 10 }}>Phone</div>
            <a href={`tel:${STORE.phoneTel}`} style={{ color: "inherit", fontSize: 14, lineHeight: 1.5 }}>{STORE.phone}</a>
          </div>
          <div>
            <div className="mono upper" style={{ fontSize: 10, opacity: 0.55, marginBottom: 10 }}>Elsewhere</div>
            <div style={{ fontSize: 14, lineHeight: 1.7 }}>
              <a href={`https://instagram.com/${STORE.instagram.replace('@','')}`} target="_blank" rel="noopener" style={{ display: "block" }}>Instagram ↗</a>
              <a href={STORE.mapsUrl} target="_blank" rel="noopener" style={{ display: "block" }}>Google Maps ↗</a>
              <a href={STORE.yelpUrl} target="_blank" rel="noopener" style={{ display: "block" }}>Yelp ↗</a>
              <a href="#order" style={{ display: "block" }}>Order online</a>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 56,
          paddingTop: 16,
          borderTop: "1px solid rgba(242,234,217,0.15)",
          fontFamily: "var(--mono)", fontSize: 11,
          textTransform: "uppercase", letterSpacing: "0.08em",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          opacity: 0.65,
        }}>
          <span>© Ashby Super Market · MMXXVI</span>
          <span>{STORE.domain}</span>
          <span>Made with butter & black ink</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Sandwiches, Aisles, Visit, Reviews, Family, Footer });
