/* global React, ReactDOM, Marquee, Nav, Hero, FeatureStrip, Sandwiches, Aisles, Visit, Reviews, Family, Footer,
   TweaksPanel, useTweaks, TweakSection, TweakColor, TweakRadio, TweakToggle */
const { useEffect } = React;

// Palettes keyed by their hero swatch array (used as the TweakColor option value).
const PALETTE_OPTIONS = [
  ["#F2EAD9","#1A1714","#D24B3A","#6B7A3A"], // cream  (default)
  ["#F7F2E8","#191A20","#E0532A","#3F6B47"], // bodega
  ["#FFF5DB","#1B1A12","#E63A2E","#F0A82A"], // citrus
  ["#1A1D24","#F0E9D7","#FF6B4A","#A7C25E"], // midnight
];

const PALETTES = {
  '["#F2EAD9","#1A1714","#D24B3A","#6B7A3A"]':
    { paper: "#F2EAD9", paperDeep: "#E8DEC6", ink: "#1A1714", inkSoft: "#4A413A", tomato: "#D24B3A", olive: "#6B7A3A", mustard: "#D89B2C" },
  '["#F7F2E8","#191A20","#E0532A","#3F6B47"]':
    { paper: "#F7F2E8", paperDeep: "#ECE3CC", ink: "#191A20", inkSoft: "#4A4A55", tomato: "#E0532A", olive: "#3F6B47", mustard: "#E4B940" },
  '["#FFF5DB","#1B1A12","#E63A2E","#F0A82A"]':
    { paper: "#FFF5DB", paperDeep: "#F6E5B3", ink: "#1B1A12", inkSoft: "#4D4830", tomato: "#E63A2E", olive: "#5B7522", mustard: "#F0A82A" },
  '["#1A1D24","#F0E9D7","#FF6B4A","#A7C25E"]':
    { paper: "#1A1D24", paperDeep: "#262A33", ink: "#F0E9D7", inkSoft: "#B5AC95", tomato: "#FF6B4A", olive: "#A7C25E", mustard: "#F5C062" },
};

const DISPLAY_FONTS = {
  instrument: '"Instrument Serif", Georgia, serif',
  fraunces:   '"Fraunces", Georgia, serif',
};

function applyPalette(paletteArr) {
  const key = JSON.stringify(paletteArr);
  const p = PALETTES[key] || PALETTES[JSON.stringify(PALETTE_OPTIONS[0])];
  const r = document.documentElement;
  r.style.setProperty("--paper", p.paper);
  r.style.setProperty("--paper-deep", p.paperDeep);
  r.style.setProperty("--ink", p.ink);
  r.style.setProperty("--ink-soft", p.inkSoft);
  r.style.setProperty("--tomato", p.tomato);
  r.style.setProperty("--olive", p.olive);
  r.style.setProperty("--mustard", p.mustard);
}

function applyDisplay(name) {
  const f = DISPLAY_FONTS[name] || DISPLAY_FONTS.instrument;
  document.documentElement.style.setProperty("--display", f);
}

// Migrate legacy stored value ("cream" string) → palette array
function normalizePalette(v) {
  if (Array.isArray(v)) return v;
  const legacy = {
    cream:    PALETTE_OPTIONS[0],
    bodega:   PALETTE_OPTIONS[1],
    citrus:   PALETTE_OPTIONS[2],
    midnight: PALETTE_OPTIONS[3],
  };
  return legacy[v] || PALETTE_OPTIONS[0];
}

function App() {
  const defaults = { ...window.__TWEAK_DEFAULTS, palette: normalizePalette(window.__TWEAK_DEFAULTS.palette) };
  const [t, setTweak] = useTweaks(defaults);

  useEffect(() => { applyPalette(t.palette); }, [t.palette]);
  useEffect(() => { applyDisplay(t.display); }, [t.display]);

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <Marquee />
      <Nav />
      <Hero sticker={t.showSticker} />
      <FeatureStrip />
      <Sandwiches />
      <Aisles />
      <Visit />
      <Reviews />
      <Family />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette">
          <TweakColor
            label="Theme"
            value={t.palette}
            onChange={v => setTweak("palette", v)}
            options={PALETTE_OPTIONS}
          />
        </TweakSection>
        <TweakSection label="Type">
          <TweakRadio
            label="Display font"
            value={t.display}
            onChange={v => setTweak("display", v)}
            options={[
              { value: "instrument", label: "Instrument" },
              { value: "fraunces",   label: "Fraunces" },
            ]}
          />
        </TweakSection>
        <TweakSection label="Details">
          <TweakToggle
            label="Sticker badge"
            value={t.showSticker}
            onChange={v => setTweak("showSticker", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
