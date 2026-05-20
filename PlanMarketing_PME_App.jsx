
import { useState, useCallback } from "react";

// ─── PALETTE ───────────────────────────────────────────────────────────────
const C = {
  navy: "#1B3A6B", gold: "#C9A84C", white: "#FFFFFF",
  green: "#1B6B3A", orange: "#E65100", teal: "#1A7A8A",
  red: "#C62828", purple: "#4A148C", dark: "#272525",
  lBlue: "#D3E0F0", lGreen: "#E8F5E9", lGold: "#FDF3DC",
  lOrange: "#FFF3E0", lRed: "#FDECEA", gray: "#F5F7FA",
  lPurple: "#F3E5F5",
};

// ─── COACHING TIPS ──────────────────────────────────────────────────────────
const TIPS = {
  segments: "Un bon segment répond à 4 critères : il est mesurable, accessible, rentable et vous avez un avantage sur lui. Si vous répondez NON à l'un des quatre — ce n'est pas le bon choix maintenant.",
  ciblage: "Cibler ce n'est pas choisir le segment le plus grand. C'est choisir celui sur lequel vous avez le plus de chances de gagner avec ce que vous avez aujourd'hui.",
  marge: "La plupart des entrepreneurs calculent : Prix − Matières = Marge. C'est faux. Le temps, le transport, les pertes, le coût d'acquisition — tout ça mange votre marge sans que vous le voyiez.",
  message: "Un message efficace parle du bénéfice pour le client, pas de votre produit. Pas 'mon riz est local' mais 'votre famille mange sain avec un riz qui digère en 30 min'.",
  kpi: "Un KPI que vous ne mesurez pas n'existe pas. Choisissez 4 indicateurs maximum. Mesurez-les chaque mois sans exception.",
};

// ─── HELPERS ────────────────────────────────────────────────────────────────
const fmt = (n) => isNaN(n) || n === "" ? "—" : Number(n).toLocaleString("fr-FR") + " FCFA";
const pct = (n) => isNaN(n) || n === "" ? "—" : (Number(n) * 100).toFixed(1) + "%";
const score = (a, b, c) => {
  const s = (Number(a) || 0) + (Number(b) || 0) + (Number(c) || 0);
  if (s === 0) return null;
  if (s >= 12) return { label: "⭐ Priorité absolue", color: C.green };
  if (s >= 9)  return { label: "📈 À développer",    color: C.teal };
  if (s >= 6)  return { label: "🔒 À fidéliser",     color: C.navy };
  return             { label: "⛔ À abandonner",    color: C.red };
};

// ─── COMPOSANTS UI ──────────────────────────────────────────────────────────
const Label = ({ children, color = C.navy }) => (
  <label style={{ fontSize: 11, fontWeight: 700, color, textTransform: "uppercase",
    letterSpacing: 1, marginBottom: 4, display: "block" }}>
    {children}
  </label>
);

const formatNum = (val) => {
  if (val === "" || val === null || val === undefined) return "";
  const clean = String(val).replace(/\s/g, "").replace(/[^0-9]/g, "");
  if (!clean) return "";
  return Number(clean).toLocaleString("fr-FR");
};
const unformatNum = (val) => String(val).replace(/\s/g, "").replace(/[^0-9]/g, "");

const Input = ({ value, onChange, placeholder, type = "text", small }) => {
  const isNum = type === "number";
  const displayVal = isNum ? formatNum(value) : value;
  return (
    <input
      type="text"
      value={displayVal}
      onChange={e => {
        const raw = isNum ? unformatNum(e.target.value) : e.target.value;
        onChange(raw);
      }}
      placeholder={placeholder}
      style={{ width: "100%", border: `2px solid ${C.lBlue}`, borderRadius: 6,
        padding: small ? "6px 10px" : "9px 12px", fontSize: small ? 12 : 13,
        color: C.dark, background: C.lGold, fontFamily: "inherit",
        outline: "none", boxSizing: "border-box", transition: "border .2s",
        textAlign: isNum ? "right" : "left" }}
      onFocus={e => e.target.style.borderColor = C.navy}
      onBlur={e => e.target.style.borderColor = C.lBlue}
    />
  );
};

const Textarea = ({ value, onChange, placeholder, rows = 3 }) => (
  <textarea value={value} onChange={e => onChange(e.target.value)}
    placeholder={placeholder} rows={rows}
    style={{ width: "100%", border: `2px solid ${C.lBlue}`, borderRadius: 6,
      padding: "9px 12px", fontSize: 13, color: C.dark, background: C.lGold,
      fontFamily: "inherit", outline: "none", resize: "vertical",
      boxSizing: "border-box", transition: "border .2s" }}
    onFocus={e => e.target.style.borderColor = C.navy}
    onBlur={e => e.target.style.borderColor = C.lBlue} />
);

const Card = ({ children, bg = C.white, border = C.lBlue, shadow = true, style = {} }) => (
  <div style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 10,
    padding: 20, boxShadow: shadow ? "0 2px 12px #1B3A6B15" : "none", ...style }}>
    {children}
  </div>
);

const SectionHeader = ({ title, sub, color = C.navy, icon }) => (
  <div style={{ background: color, borderRadius: 10, padding: "14px 20px",
    marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
    {icon && <span style={{ fontSize: 22 }}>{icon}</span>}
    <div>
      <div style={{ color: C.white, fontWeight: 800, fontSize: 17 }}>{title}</div>
      {sub && <div style={{ color: C.gold, fontSize: 12, marginTop: 2 }}>{sub}</div>}
    </div>
  </div>
);

const CoachTip = ({ tip, visible, onClose }) => visible ? (
  <div style={{ background: C.lGold, border: `2px solid ${C.gold}`, borderRadius: 8,
    padding: "12px 16px", marginBottom: 16, display: "flex", gap: 10, alignItems: "flex-start" }}>
    <span style={{ fontSize: 18 }}>💡</span>
    <div style={{ flex: 1, fontSize: 12, color: C.dark, lineHeight: 1.6 }}>{tip}</div>
    <button onClick={onClose} style={{ background: "none", border: "none",
      cursor: "pointer", color: C.gold, fontSize: 16, padding: 0 }}>✕</button>
  </div>
) : null;

const Badge = ({ label, color, bg }) => (
  <span style={{ background: bg || color + "22", color, border: `1.5px solid ${color}`,
    borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
    {label}
  </span>
);

const NavBtn = ({ active, onClick, children, color }) => (
  <button onClick={onClick} style={{ padding: "8px 16px", borderRadius: 20,
    border: `2px solid ${active ? color : "#E0E0E0"}`,
    background: active ? color : C.white,
    color: active ? C.white : "#666", fontSize: 12, fontWeight: 700,
    cursor: "pointer", transition: "all .2s", whiteSpace: "nowrap" }}>
    {children}
  </button>
);

const ProgressBar = ({ value, max, color }) => (
  <div style={{ background: "#E0E0E0", borderRadius: 10, height: 8, overflow: "hidden" }}>
    <div style={{ width: `${Math.min(100, (value/max)*100)}%`, height: "100%",
      background: color, borderRadius: 10, transition: "width .5s" }} />
  </div>
);

// ─── DONNÉES INITIALES ──────────────────────────────────────────────────────
const initSegment = () => ({
  nom: "", criteres: "", taille: "", freq: "", panier: "",
  acces: "", rentabilite: "", concurrence: "",
});

const initMarge = () => ({
  produit: "", prix: "", qty: "", matieres: "", emballage: "",
  transport: "", heures: "", taux_h: "", pertes: "", degustation: "",
  cac_budget: "", cac_clients: "", cac_freq: "", autres: "",
  loyer: "", salaires: "", tel: "", elec: "", banque: "", fixes_autres: "",
});

const initKPI = () => ({ nom: "", objectif: "", m1: "", m2: "", m3: "" });

// ─── APP PRINCIPALE ─────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState(0);
  const [coachMode, setCoachMode] = useState(false);
  const [tips, setTips] = useState({});

  // Données
  const [entreprise, setEntreprise] = useState({
    nom: "", secteur: "", produit: "", zone: "", ca_actuel: "", ca_objectif: "",
    employes: "", annee: "",
  });
  const [segments, setSegments] = useState([initSegment(), initSegment(), initSegment()]);
  const [ciblePrio, setCiblePrio] = useState({ segment: "", pourquoi: "", secondaire: "", abandonner: "" });
  const [persona, setPersona] = useState({
    prenom: "", age: "", localisation: "", profession: "",
    motivation: "", critere: "", frein: "", objection: "", reponse: "",
    canal: "", freq: "", panier: "",
  });
  const [message, setMessage] = useState([
    { segment: "", besoin: "", msg: "", arg: "", canal: "" },
    { segment: "", besoin: "", msg: "", arg: "", canal: "" },
    { segment: "", besoin: "", msg: "", arg: "", canal: "" },
  ]);
  const [mix, setMix] = useState({
    produit_desc: "", produit_diff: "", produit_pack: "", produit_evo: "",
    prix_actuel: "", prix_min: "", prix_remise: "", prix_concurrent: "",
    dist_canal: "", dist_dev: "", dist_partenaires: "", dist_objectif: "",
    comm_reseaux: "", comm_terrain: "", comm_budget: "", comm_kpi: "",
  });
  const [marges, setMarges] = useState([initMarge()]);
  const [kpis, setKpis] = useState([initKPI(), initKPI(), initKPI(), initKPI()]);
  const [actions, setActions] = useState({
    m1: [{ action: "", comment: "", qui: "", delai: "" }],
    m2: [{ action: "", comment: "", qui: "", delai: "" }],
    m3: [{ action: "", comment: "", qui: "", delai: "" }],
  });

  const upd = (setter) => (field) => (val) =>
    setter(prev => ({ ...prev, [field]: val }));

  const updArr = (setter, idx) => (field) => (val) =>
    setter(prev => prev.map((item, i) => i === idx ? { ...item, [field]: val } : item));

  const showTip = (key) => setTips(t => ({ ...t, [key]: true }));
  const hideTip = (key) => setTips(t => ({ ...t, [key]: false }));

  // Calculs marge
  const calcMarge = (m) => {
    const prix = Number(m.prix) || 0;
    const qty  = Number(m.qty)  || 0;
    const mat  = Number(m.matieres) || 0;
    const emb  = Number(m.emballage) || 0;
    const tr   = Number(m.transport) || 0;
    const tps  = (Number(m.heures) || 0) * (Number(m.taux_h) || 0);
    const perte= (Number(m.pertes) || 0) / 100 * mat;
    const degu = Number(m.degustation) || 0;
    const cac  = (Number(m.cac_clients) || 0) === 0 ? 0 :
      (Number(m.cac_budget) || 0) / (Number(m.cac_clients) || 1) /
      (Number(m.cac_freq) || 1);
    const autres= Number(m.autres) || 0;
    const cout_u = mat + emb + tr + tps + perte + degu + cac + autres;
    const fixes = (Number(m.loyer)||0) + (Number(m.salaires)||0) +
      (Number(m.tel)||0) + (Number(m.elec)||0) + (Number(m.banque)||0) +
      (Number(m.fixes_autres)||0);
    const ca   = prix * qty;
    const cv   = cout_u * qty;
    const marge_nette = ca - cv - fixes;
    const taux = ca === 0 ? 0 : marge_nette / ca;
    const seuil = (prix - cout_u) === 0 ? Infinity :
      Math.ceil(fixes / (prix - cout_u));
    const prix_min = cout_u + (qty === 0 ? 0 : fixes / qty);
    return { cout_u, fixes, ca, cv, marge_nette, taux, seuil, prix_min };
  };

  // Score segments
  const getScore = (seg) => score(seg.acces, seg.rentabilite, seg.concurrence);

  // Completion %
  const completion = () => {
    let filled = 0, total = 0;
    const check = (val) => { total++; if (val && val.toString().trim()) filled++; };
    Object.values(entreprise).forEach(check);
    segments.forEach(s => [s.nom, s.criteres, s.panier].forEach(check));
    [ciblePrio.segment, ciblePrio.pourquoi].forEach(check);
    [persona.prenom, persona.motivation].forEach(check);
    [mix.prix_actuel, mix.comm_reseaux].forEach(check);
    marges.forEach(m => [m.produit, m.prix, m.matieres].forEach(check));
    kpis.forEach(k => [k.nom, k.objectif].forEach(check));
    return Math.round((filled / total) * 100);
  };

  const TABS = [
    { label: "🏢 Entreprise",   color: C.navy },
    { label: "🔍 Segmentation", color: C.teal },
    { label: "🎯 Ciblage",      color: C.green },
    { label: "💬 Message",      color: C.orange },
    { label: "🛠 Mix 4P",       color: C.purple },
    { label: "💰 Marge",        color: C.red },
    { label: "📊 KPIs & Plan",  color: C.gold },
  ];

  const comp = completion();

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh",
      background: "#F0F4F8" }}>

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <div style={{ background: C.navy, padding: "0 24px", position: "sticky",
        top: 0, zIndex: 100, boxShadow: "0 2px 16px #00000030" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex",
          alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 36, height: 36, background: C.gold, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, color: C.navy, fontSize: 14 }}>DS</div>
            <div>
              <div style={{ color: C.white, fontWeight: 800, fontSize: 15, lineHeight: 1 }}>
                Plan Marketing PME
              </div>
              <div style={{ color: C.gold, fontSize: 10, marginTop: 2 }}>
                Dolph Stats Consulting
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 11, color: C.lBlue }}>Avancement</div>
              <div style={{ width: 100, background: "#FFFFFF30", borderRadius: 10, height: 6 }}>
                <div style={{ width: `${comp}%`, height: "100%", background: C.gold,
                  borderRadius: 10, transition: "width .5s" }} />
              </div>
              <div style={{ color: C.gold, fontWeight: 800, fontSize: 12 }}>{comp}%</div>
            </div>
            <button onClick={() => setCoachMode(!coachMode)} style={{
              background: coachMode ? C.gold : "transparent",
              border: `2px solid ${C.gold}`, borderRadius: 20, padding: "5px 14px",
              color: coachMode ? C.navy : C.gold, fontSize: 11, fontWeight: 700,
              cursor: "pointer", transition: "all .2s" }}>
              {coachMode ? "💡 Coach ON" : "💡 Mode Coach"}
            </button>
          </div>
        </div>
      </div>

      {/* ── NAVIGATION ─────────────────────────────────────────────────── */}
      <div style={{ background: C.white, borderBottom: `2px solid ${C.lBlue}`,
        padding: "10px 24px", overflowX: "auto" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 8 }}>
          {TABS.map((t, i) => (
            <NavBtn key={i} active={tab === i} onClick={() => setTab(i)} color={t.color}>
              {t.label}
            </NavBtn>
          ))}
        </div>
      </div>

      {/* ── CONTENT ────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: "24px auto", padding: "0 24px" }}>

        {/* ════ TAB 0 — ENTREPRISE ════════════════════════════════════ */}
        {tab === 0 && (
          <div>
            <SectionHeader title="Mon Entreprise & Mon Marché"
              sub="Le point de départ de votre plan" color={C.navy} icon="🏢" />
            {coachMode && <CoachTip tip="Commencez par décrire votre entreprise honnêtement. Un plan basé sur des chiffres réels vaut 10 fois plus qu'un plan basé sur des estimations optimistes." visible={!tips.ent} onClose={() => showTip("ent")} />}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                ["nom", "Nom de l'entreprise", "Ex : Adep Agro Service"],
                ["secteur", "Secteur d'activité", "Ex : Agroalimentaire, Commerce..."],
                ["produit", "Produit / Service principal", "Ex : Riz local, Assaisonnements..."],
                ["zone", "Zone géographique", "Ex : Dakar, Sénégal..."],
                ["annee", "Année de création", "Ex : 2019"],
                ["employes", "Nombre d'employés", "Ex : 5"],
                ["ca_actuel", "CA mensuel actuel (FCFA)", "Ordre de grandeur"],
                ["ca_objectif", "Objectif CA dans 12 mois (FCFA)", "Ce que vous voulez atteindre"],
              ].map(([field, label, ph]) => (
                <Card key={field}>
                  <Label>{label}</Label>
                  <Input value={entreprise[field]}
                    onChange={upd(setEntreprise)(field)}
                    placeholder={ph}
                    type={["ca_actuel","ca_objectif","employes"].includes(field) ? "number" : "text"} />
                </Card>
              ))}
            </div>

            {/* SWOT */}
            <div style={{ marginTop: 24 }}>
              <div style={{ background: C.navy, borderRadius: 8, padding: "10px 16px",
                color: C.white, fontWeight: 800, marginBottom: 12 }}>
                Analyse SWOT rapide
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  ["swot_f", "💪 Forces", "Ce que vous faites mieux", C.green, C.lGreen],
                  ["swot_w", "⚠️ Faiblesses", "Ce qui vous limite", C.red, C.lRed],
                  ["swot_o", "🚀 Opportunités", "Ce que le marché offre", C.teal, "#E0F7FA"],
                  ["swot_t", "🌩 Menaces", "Ce qui pourrait nuire", C.orange, C.lOrange],
                ].map(([field, label, hint, color, bg]) => (
                  <Card key={field} bg={bg} border={color}>
                    <Label color={color}>{label}</Label>
                    <div style={{ fontSize: 11, color: "#888", marginBottom: 8 }}>{hint}</div>
                    <Textarea value={entreprise[field] || ""}
                      onChange={upd(setEntreprise)(field)}
                      placeholder="Écrivez ici..." rows={3} />
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════ TAB 1 — SEGMENTATION ══════════════════════════════════ */}
        {tab === 1 && (
          <div>
            <SectionHeader title="Segmentation Client"
              sub="Qui existe sur votre marché ?" color={C.teal} icon="🔍" />
            {coachMode && <CoachTip tip={TIPS.segments} visible={!tips.seg} onClose={() => showTip("seg")} />}

            {/* Légende scoring */}
            <Card style={{ marginBottom: 20, background: C.lBlue, border: `1.5px solid ${C.teal}` }}>
              <div style={{ fontWeight: 700, color: C.teal, marginBottom: 8 }}>
                📊 Système de scoring (colonnes 7, 8, 9)
              </div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {[
                  ["Facilité d'accès", "1=très difficile → 5=très facile"],
                  ["Rentabilité", "1=faible marge → 5=très forte marge"],
                  ["Concurrence", "1=marché saturé → 5=peu de concurrents"],
                ].map(([l, d]) => (
                  <div key={l} style={{ fontSize: 11 }}>
                    <strong style={{ color: C.navy }}>{l}</strong>
                    <div style={{ color: "#666" }}>{d}</div>
                  </div>
                ))}
              </div>
            </Card>

            {segments.map((seg, i) => {
              const sc = getScore(seg);
              const ca = (Number(seg.taille)||0) * (Number(seg.freq)||0) * (Number(seg.panier)||0);
              return (
                <Card key={i} style={{ marginBottom: 16 }}
                  border={sc ? sc.color : C.lBlue}>
                  <div style={{ display: "flex", justifyContent: "space-between",
                    alignItems: "center", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%",
                        background: [C.navy,C.teal,C.green,C.orange,C.purple,C.red][i],
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: C.white, fontWeight: 900, fontSize: 14 }}>{i+1}</div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: C.navy }}>
                        {seg.nom || `Segment ${i+1}`}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      {ca > 0 && <Badge label={fmt(ca) + "/mois"} color={C.green} />}
                      {sc && <Badge label={sc.label} color={sc.color} />}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", gap: 10 }}>
                    {[
                      ["nom", "Nom du segment", "text"],
                      ["criteres", "Critères principaux", "text"],
                      ["taille", "Nb clients estimé", "number"],
                      ["freq", "Fréquence/mois", "number"],
                      ["panier", "Panier moyen (FCFA)", "number"],
                      ["acces", "Facilité (1-5)", "number"],
                      ["rentabilite", "Rentabilité (1-5)", "number"],
                      ["concurrence", "Concurrence (1-5)", "number"],
                    ].map(([field, label, type]) => (
                      <div key={field}>
                        <Label color={C.teal}>{label}</Label>
                        <Input value={seg[field]} onChange={updArr(setSegments, i)(field)}
                          placeholder="—" type={type} small />
                      </div>
                    ))}
                    {/* CA auto */}
                    <div>
                      <Label color={C.green}>CA potentiel</Label>
                      <div style={{ background: C.lGreen, border: `1.5px solid ${C.green}`,
                        borderRadius: 6, padding: "6px 10px", fontSize: 12,
                        fontWeight: 700, color: C.green }}>
                        {ca > 0 ? ca.toLocaleString("fr-FR") : "—"}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}

            <button onClick={() => setSegments(s => [...s, initSegment()])}
              style={{ background: C.teal, color: C.white, border: "none",
                borderRadius: 8, padding: "10px 20px", cursor: "pointer",
                fontWeight: 700, marginTop: 8 }}>
              + Ajouter un segment
            </button>
          </div>
        )}

        {/* ════ TAB 2 — CIBLAGE ═══════════════════════════════════════ */}
        {tab === 2 && (
          <div>
            <SectionHeader title="Ciblage — Matrice Valeur / Potentiel"
              sub="Sur qui vous misez ?" color={C.green} icon="🎯" />
            {coachMode && <CoachTip tip={TIPS.ciblage} visible={!tips.cib} onClose={() => showTip("cib")} />}

            {/* Matrice visuelle */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {[
                ["⭐ PRIORITÉ ABSOLUE", "Valeur forte + Potentiel élevé → Accélérer", C.green, C.lGreen],
                ["📈 INVESTIR",         "Valeur faible + Potentiel élevé → Développer", C.teal, "#E0F7FA"],
                ["🔒 FIDÉLISER",        "Valeur forte + Potentiel faible → Maintenir",  C.navy, C.lBlue],
                ["⛔ ABANDONNER",       "Valeur faible + Potentiel faible → Ignorer",   C.red,  C.lRed],
              ].map(([label, desc, color, bg]) => (
                <Card key={label} bg={bg} border={color}>
                  <div style={{ fontWeight: 800, color, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{desc}</div>
                </Card>
              ))}
            </div>

            {/* Classement automatique des segments */}
            <Card style={{ marginBottom: 20, background: C.lGold, border: `1.5px solid ${C.gold}` }}>
              <div style={{ fontWeight: 800, color: C.navy, marginBottom: 12 }}>
                Classement automatique de vos segments
              </div>
              {segments.filter(s => s.nom).length === 0 ? (
                <div style={{ color: "#888", fontSize: 13 }}>
                  Remplissez d'abord l'onglet Segmentation pour voir le classement.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {segments.filter(s => s.nom).map((seg, i) => {
                    const sc = getScore(seg);
                    const ca = (Number(seg.taille)||0)*(Number(seg.freq)||0)*(Number(seg.panier)||0);
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center",
                        gap: 12, padding: "10px 14px", background: C.white,
                        borderRadius: 8, border: `1.5px solid ${sc ? sc.color : C.lBlue}` }}>
                        <div style={{ fontWeight: 800, color: C.navy, minWidth: 140 }}>{seg.nom}</div>
                        <div style={{ flex: 1 }}>
                          <ProgressBar value={(Number(seg.acces)||0)+(Number(seg.rentabilite)||0)+(Number(seg.concurrence)||0)}
                            max={15} color={sc ? sc.color : C.lBlue} />
                        </div>
                        {ca > 0 && <div style={{ fontSize: 11, color: C.green, fontWeight: 700 }}>{fmt(ca)}</div>}
                        {sc && <Badge label={sc.label} color={sc.color} />}
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* Décision */}
            <Card>
              <div style={{ fontWeight: 800, color: C.navy, marginBottom: 16, fontSize: 15 }}>
                Ma décision de ciblage
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  ["segment", "Mon segment PRIORITAIRE", "Celui avec le meilleur score"],
                  ["pourquoi", "Pourquoi ce choix", "Basé sur les données — pas l'intuition"],
                  ["secondaire", "Mon segment SECONDAIRE", "À développer en parallèle"],
                  ["abandonner", "Ce que j'arrête de cibler", "Le segment qui épuise sans rentabilité"],
                ].map(([field, label, hint]) => (
                  <div key={field}>
                    <Label>{label}</Label>
                    <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{hint}</div>
                    <Input value={ciblePrio[field]}
                      onChange={upd(setCiblePrio)(field)} placeholder="..." />
                  </div>
                ))}
              </div>
            </Card>

            {/* Buyer Persona */}
            <div style={{ marginTop: 24 }}>
              <SectionHeader title="Mon Buyer Persona"
                sub="Le portrait de mon client idéal" color={C.green} icon="👤" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  ["prenom",     "Prénom du persona",   "Ex : Aminata, Boucar..."],
                  ["age",        "Âge / tranche",       "Ex : 30-45 ans"],
                  ["localisation","Localisation",       "Ex : Dakar, Mermoz..."],
                  ["profession", "Profession",          "Ex : Restauratrice, ménagère..."],
                  ["motivation", "Ce qui le/la motive", "Santé, prix, qualité..."],
                  ["critere",    "Critère de décision", "Ce qui fait qu'il/elle achète"],
                  ["frein",      "Frein principal",     "Ce qui l'empêche d'acheter"],
                  ["objection",  "Objection habituelle","Ce qu'il/elle dit souvent"],
                  ["reponse",    "Ma réponse à cette objection", "Ce que je lui dis"],
                  ["canal",      "Canal d'achat préféré","Marché, réseau, boutique..."],
                  ["freq",       "Fréquence d'achat",   "Fois par mois"],
                  ["panier",     "Panier moyen (FCFA)", "Dépense par achat"],
                ].map(([field, label, ph]) => (
                  <Card key={field}>
                    <Label>{label}</Label>
                    <Input value={persona[field]} onChange={upd(setPersona)(field)}
                      placeholder={ph} />
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════ TAB 3 — MESSAGE ═══════════════════════════════════════ */}
        {tab === 3 && (
          <div>
            <SectionHeader title="Positionnement & Message"
              sub="Quoi dire, à qui, et comment se différencier" color={C.orange} icon="💬" />
            {coachMode && <CoachTip tip={TIPS.message} visible={!tips.msg} onClose={() => showTip("msg")} />}

            <Card style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 800, color: C.navy, marginBottom: 16 }}>
                Mon positionnement global
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  ["pos_phrase", "Ma phrase de positionnement",
                   "Pour [cible], [marque] est le [catégorie] qui [bénéfice unique]"],
                  ["pos_avantage", "Mon avantage concurrentiel unique",
                   "Ce que vous seul pouvez offrir"],
                  ["pos_preuve", "Preuve de cet avantage",
                   "Chiffre, certification, témoignage"],
                  ["pos_non", "Ce que je ne suis PAS",
                   "La frontière de votre positionnement"],
                ].map(([field, label, hint]) => (
                  <div key={field}>
                    <Label color={C.orange}>{label}</Label>
                    <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{hint}</div>
                    <Input value={mix[field] || ""}
                      onChange={upd(setMix)(field)} placeholder="..." />
                  </div>
                ))}
              </div>
            </Card>

            <div style={{ fontWeight: 800, color: C.navy, marginBottom: 12, fontSize: 15 }}>
              Message par segment
            </div>
            {message.map((msg, i) => (
              <Card key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%",
                    background: [C.navy, C.teal, C.green][i],
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: C.white, fontWeight: 900, fontSize: 12 }}>{i+1}</div>
                  <div style={{ fontWeight: 700, color: C.navy }}>Segment {i+1}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 2fr 1fr 1fr", gap: 10 }}>
                  {[
                    ["segment", "Segment", "Nom du segment"],
                    ["besoin",  "Besoin principal", "Ce qu'il cherche"],
                    ["msg",     "Message clé (1 phrase)", "Ce que vous lui dites"],
                    ["arg",     "Argument #1", "Chiffré si possible"],
                    ["canal",   "Canal", "WhatsApp, foire..."],
                  ].map(([field, label, hint]) => (
                    <div key={field}>
                      <Label color={C.orange}>{label}</Label>
                      <Input value={msg[field]}
                        onChange={(val) => setMessage(prev =>
                          prev.map((m,j) => j===i ? {...m,[field]:val} : m))}
                        placeholder={hint} small />
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* ════ TAB 4 — MIX 4P ════════════════════════════════════════ */}
        {tab === 4 && (
          <div>
            <SectionHeader title="Mix Marketing — Les 4P"
              sub="Produit · Prix · Distribution · Communication" color={C.purple} icon="🛠" />

            {[
              ["PRODUIT", C.navy, [
                ["produit_desc","Mon offre principale","Ce que je vends exactement"],
                ["produit_diff","Mes arguments différenciants","Pourquoi me choisir"],
                ["produit_pack","Packaging / présentation","Comment il se présente"],
                ["produit_evo","Amélioration prévue à 6 mois","Ce que je vais améliorer"],
              ]],
              ["PRIX", C.teal, [
                ["prix_actuel","Prix de vente actuel (FCFA)","Prix standard"],
                ["prix_min","Prix minimum (seuil rentabilité)","En dessous = perte"],
                ["prix_remise","Politique de remise","Quand et combien"],
                ["prix_concurrent","Vs concurrents","Plus cher / moins cher ?"],
              ]],
              ["DISTRIBUTION", C.green, [
                ["dist_canal","Canal principal actuel","Comment je vends aujourd'hui"],
                ["dist_dev","Canal à développer","Où je veux aller"],
                ["dist_partenaires","Partenaires clés","Revendeurs, grossistes..."],
                ["dist_objectif","Objectif pts de vente J+90","Dans 90 jours"],
              ]],
              ["COMMUNICATION", C.orange, [
                ["comm_reseaux","Réseaux sociaux actifs","Lesquels et fréquence"],
                ["comm_terrain","Actions terrain","Foires, activations, dégustations"],
                ["comm_budget","Budget comm. mensuel (FCFA)","Ce que j'alloue"],
                ["comm_kpi","Indicateur de succès","Comment je sais que ça marche"],
              ]],
            ].map(([title, color, fields]) => (
              <Card key={title} style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 800, color, marginBottom: 14,
                  fontSize: 14, borderBottom: `2px solid ${color}`, paddingBottom: 8 }}>
                  P — {title}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {fields.map(([field, label, hint]) => (
                    <div key={field}>
                      <Label color={color}>{label}</Label>
                      <div style={{ fontSize: 11, color: "#888", marginBottom: 5 }}>{hint}</div>
                      <Input value={mix[field] || ""}
                        onChange={upd(setMix)(field)} placeholder="..." />
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* ════ TAB 5 — MARGE ═════════════════════════════════════════ */}
        {tab === 5 && (
          <div>
            <SectionHeader title="Simulateur de Marge Réelle"
              sub="Incluant tous les coûts oubliés" color={C.red} icon="💰" />
            {coachMode && <CoachTip tip={TIPS.marge} visible={!tips.mrg} onClose={() => showTip("mrg")} />}

            {marges.map((m, idx) => {
              const r = calcMarge(m);
              const diag = r.marge_nette < 0 ? { txt: "🔴 PERTE — Révisez vos prix ou charges", bg: C.lRed, c: C.red }
                : r.taux < 0.15 ? { txt: "🟠 FRAGILE — Taux de marge insuffisant", bg: C.lOrange, c: C.orange }
                : { txt: "🟢 BON — Votre marge est saine", bg: C.lGreen, c: C.green };

              return (
                <div key={idx}>
                  <Card style={{ marginBottom: 16 }}>
                    <div style={{ fontWeight: 800, color: C.red, marginBottom: 14,
                      fontSize: 15, borderBottom: `2px solid ${C.red}`, paddingBottom: 8 }}>
                      Produit {idx+1}
                    </div>

                    {/* Infos de base */}
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
                      {[
                        ["produit","Nom du produit","Ex : Riz local 50kg"],
                        ["prix","Prix de vente (FCFA)","Ex : 17500"],
                        ["qty","Quantités vendues/mois","Ex : 40"],
                      ].map(([field,label,ph]) => (
                        <div key={field}>
                          <Label color={C.red}>{label}</Label>
                          <Input value={m[field]} onChange={updArr(setMarges,idx)(field)}
                            placeholder={ph} type={field!=="produit"?"number":"text"} />
                        </div>
                      ))}
                    </div>

                    {/* Charges par unité */}
                    <div style={{ background: C.lBlue, borderRadius: 8, padding: 14, marginBottom: 12 }}>
                      <div style={{ fontWeight: 700, color: C.navy, marginBottom: 10 }}>
                        Charges par unité vendue
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
                        {[
                          ["matieres","Matières premières (FCFA)"],
                          ["emballage","Emballage (FCFA)"],
                          ["transport","Transport par unité (FCFA)"],
                          ["degustation","Dégustation/activation (FCFA)"],
                          ["heures","Heures de travail/unité"],
                          ["taux_h","Valeur horaire (FCFA/h)"],
                          ["pertes","Pertes & invendus (%)"],
                          ["autres","Autres charges directes"],
                        ].map(([field,label]) => (
                          <div key={field}>
                            <Label color={C.navy} >{label}</Label>
                            <Input value={m[field]} onChange={updArr(setMarges,idx)(field)}
                              placeholder="0" type="number" small />
                          </div>
                        ))}
                      </div>

                      {/* Coût main d'oeuvre auto */}
                      <div style={{ marginTop: 10, padding: "8px 12px",
                        background: C.white, borderRadius: 6, fontSize: 12 }}>
                        <span style={{ fontWeight: 700, color: C.navy }}>
                          Coût main d'œuvre auto : </span>
                        <span style={{ color: C.teal, fontWeight: 700 }}>
                          {fmt((Number(m.heures)||0)*(Number(m.taux_h)||0))} / unité
                        </span>
                      </div>
                    </div>

                    {/* CAC */}
                    <div style={{ background: C.lPurple, borderRadius: 8, padding: 14, marginBottom: 12 }}>
                      <div style={{ fontWeight: 700, color: C.purple, marginBottom: 10 }}>
                        Coût d'acquisition client (CAC)
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                        {[
                          ["cac_budget","Budget acquisition/mois (FCFA)","Foires, pub, SMS..."],
                          ["cac_clients","Nouveaux clients acquis/mois","Nombre"],
                          ["cac_freq","Fréquence d'achat/client/mois","Ex : 3"],
                        ].map(([field,label,ph]) => (
                          <div key={field}>
                            <Label color={C.purple}>{label}</Label>
                            <Input value={m[field]} onChange={updArr(setMarges,idx)(field)}
                              placeholder={ph} type="number" small />
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: 10, padding: "8px 12px",
                        background: C.white, borderRadius: 6, fontSize: 12 }}>
                        <span style={{ fontWeight: 700, color: C.purple }}>CAC par unité auto : </span>
                        <span style={{ color: C.purple, fontWeight: 700 }}>
                          {(() => {
                            const cac = (Number(m.cac_clients)||0)===0 ? 0 :
                              (Number(m.cac_budget)||0) /
                              (Number(m.cac_clients)||1) /
                              (Number(m.cac_freq)||1);
                            return fmt(Math.round(cac));
                          })()} / unité
                        </span>
                      </div>
                    </div>

                    {/* Charges fixes */}
                    <div style={{ background: C.lOrange, borderRadius: 8, padding: 14, marginBottom: 16 }}>
                      <div style={{ fontWeight: 700, color: C.orange, marginBottom: 10 }}>
                        Charges fixes mensuelles
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                        {[
                          ["loyer","Loyer / espace (FCFA/mois)"],
                          ["salaires","Salaires (FCFA/mois)"],
                          ["tel","Téléphone / internet"],
                          ["elec","Électricité / eau"],
                          ["banque","Frais bancaires"],
                          ["fixes_autres","Autres fixes (FCFA/mois)"],
                        ].map(([field,label]) => (
                          <div key={field}>
                            <Label color={C.orange}>{label}</Label>
                            <Input value={m[field]} onChange={updArr(setMarges,idx)(field)}
                              placeholder="0" type="number" small />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Résultats */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
                      {[
                        ["CA mensuel", fmt(r.ca), C.navy, C.lBlue],
                        ["Coût unitaire réel", fmt(Math.round(r.cout_u)), C.teal, "#E0F7FA"],
                        ["Marge nette", fmt(Math.round(r.marge_nette)), r.marge_nette >= 0 ? C.green : C.red, r.marge_nette >= 0 ? C.lGreen : C.lRed],
                        ["Taux de marge", r.ca === 0 ? "—" : (r.taux*100).toFixed(1)+"%", r.taux >= 0.15 ? C.green : C.orange, r.taux >= 0.15 ? C.lGreen : C.lOrange],
                        ["Prix plancher", fmt(Math.round(r.prix_min)), C.red, C.lRed],
                        ["Seuil rentabilité", r.seuil === Infinity ? "∞" : r.seuil + " unités/mois", C.orange, C.lOrange],
                      ].map(([label, val, color, bg]) => (
                        <div key={label} style={{ background: bg, border: `1.5px solid ${color}`,
                          borderRadius: 8, padding: "12px 14px", textAlign: "center" }}>
                          <div style={{ fontSize: 10, color: "#666", fontWeight: 700,
                            textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
                          <div style={{ color, fontWeight: 900, fontSize: 16, marginTop: 4 }}>{val}</div>
                        </div>
                      ))}
                    </div>

                    {/* Diagnostic */}
                    {r.ca > 0 && (
                      <div style={{ marginTop: 14, background: diag.bg, border: `2px solid ${diag.c}`,
                        borderRadius: 8, padding: "12px 16px", fontWeight: 700,
                        color: diag.c, fontSize: 13 }}>{diag.txt}</div>
                    )}
                  </Card>
                </div>
              );
            })}

            <button onClick={() => setMarges(m => [...m, initMarge()])}
              style={{ background: C.red, color: C.white, border: "none",
                borderRadius: 8, padding: "10px 20px", cursor: "pointer",
                fontWeight: 700 }}>
              + Ajouter un produit
            </button>
          </div>
        )}

        {/* ════ TAB 6 — KPIs & PLAN ════════════════════════════════ */}
        {tab === 6 && (
          <div>
            <SectionHeader title="Plan d'action & KPIs"
              sub="Qui fait quoi, quand — et comment mesurer" color={C.gold}
              icon="📊" />
            {coachMode && <CoachTip tip={TIPS.kpi} visible={!tips.kpi} onClose={() => showTip("kpi")} />}

            {/* Plan 90 jours */}
            {[
              ["MOIS 1 — LANCER", C.navy, "m1"],
              ["MOIS 2 — DÉVELOPPER", C.teal, "m2"],
              ["MOIS 3 — ACCÉLÉRER", C.green, "m3"],
            ].map(([title, color, key]) => (
              <Card key={key} style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 800, color, marginBottom: 14,
                  fontSize: 14, borderBottom: `2px solid ${color}`, paddingBottom: 8 }}>
                  {title}
                </div>
                {actions[key].map((action, i) => (
                  <div key={i} style={{ display: "grid",
                    gridTemplateColumns: "2fr 2fr 1fr 1fr", gap: 10,
                    marginBottom: 10, padding: "10px 12px",
                    background: C.gray, borderRadius: 8 }}>
                    {[
                      ["action","Action prioritaire","Quoi faire"],
                      ["comment","Comment","Détail / méthode"],
                      ["qui","Qui","Responsable"],
                      ["delai","Délai","Ex : S2"],
                    ].map(([field,label,ph]) => (
                      <div key={field}>
                        <Label color={color}>{label}</Label>
                        <Input value={action[field]}
                          onChange={(val) => setActions(prev => ({
                            ...prev,
                            [key]: prev[key].map((a,j) =>
                              j===i ? {...a,[field]:val} : a)
                          }))}
                          placeholder={ph} small />
                      </div>
                    ))}
                  </div>
                ))}
                <button onClick={() => setActions(prev => ({
                  ...prev, [key]: [...prev[key], {action:"",comment:"",qui:"",delai:""}]
                }))} style={{ background: "none", border: `1.5px dashed ${color}`,
                  borderRadius: 6, padding: "6px 14px", color, cursor: "pointer",
                  fontSize: 12, fontWeight: 700, marginTop: 4 }}>
                  + Ajouter une action
                </button>
              </Card>
            ))}

            {/* KPIs */}
            <Card>
              <div style={{ fontWeight: 800, color: C.navy, marginBottom: 16, fontSize: 15 }}>
                Tableau de bord — Suivi mensuel
              </div>
              {coachMode && (
                <div style={{ background: C.lGold, borderRadius: 6, padding: "8px 12px",
                  marginBottom: 14, fontSize: 11, color: C.dark }}>
                  💡 La tendance se calcule automatiquement. 📈 = progression, 📉 = recul.
                </div>
              )}

              {/* En-têtes */}
              <div style={{ display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr",
                gap: 8, marginBottom: 8 }}>
                {["KPI", "Objectif", "Mois 1", "Mois 2", "Mois 3", "Tendance", ""].map(h => (
                  <div key={h} style={{ background: C.gold, color: C.navy, fontWeight: 800,
                    fontSize: 10, textAlign: "center", borderRadius: 4,
                    padding: "6px 8px", textTransform: "uppercase" }}>{h}</div>
                ))}
              </div>

              {kpis.map((kpi, i) => {
                const trend = kpi.m1 && kpi.m2 ?
                  (Number(kpi.m2) > Number(kpi.m1) ? "📈" : "📉") : "—";
                const trendColor = trend === "📈" ? C.green : trend === "📉" ? C.red : "#888";
                return (
                  <div key={i} style={{ display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr",
                    gap: 8, marginBottom: 8, alignItems: "center" }}>
                    <Input value={kpi.nom}
                      onChange={updArr(setKpis,i)("nom")}
                      placeholder="Ex : CA mensuel (FCFA)" small />
                    {["objectif","m1","m2","m3"].map(field => (
                      <Input key={field} value={kpi[field]}
                        onChange={updArr(setKpis,i)(field)}
                        placeholder="0" type="number" small />
                    ))}
                    <div style={{ textAlign: "center", fontSize: 18, color: trendColor }}>
                      {trend}
                    </div>
                    {kpi.objectif && kpi.m3 ? (
                      <div style={{ textAlign: "center" }}>
                        <Badge
                          label={Number(kpi.m3) >= Number(kpi.objectif) ? "✅ Atteint" : "❌ Non atteint"}
                          color={Number(kpi.m3) >= Number(kpi.objectif) ? C.green : C.red} />
                      </div>
                    ) : <div />}
                  </div>
                );
              })}

              <button onClick={() => setKpis(k => [...k, initKPI()])}
                style={{ background: "none", border: `1.5px dashed ${C.gold}`,
                  borderRadius: 6, padding: "6px 14px", color: C.gold,
                  cursor: "pointer", fontSize: 12, fontWeight: 700, marginTop: 8 }}>
                + Ajouter un KPI
              </button>
            </Card>

            {/* Engagement */}
            <Card style={{ marginTop: 20, background: C.navy }}>
              <div style={{ color: C.gold, fontWeight: 800, fontSize: 16, marginBottom: 10,
                textAlign: "center" }}>
                Mon engagement
              </div>
              <div style={{ color: C.white, fontSize: 13, textAlign: "center",
                lineHeight: 1.8, marginBottom: 16 }}>
                Je m'engage à mettre en œuvre ce plan marketing.<br />
                Je le relis chaque mois. Je mesure mes KPIs.<br />
                Je l'ajuste si les résultats ne sont pas au rendez-vous.
              </div>
              <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                <div>
                  <Label color={C.gold}>Signature</Label>
                  <Input value={entreprise.signature || ""}
                    onChange={upd(setEntreprise)("signature")}
                    placeholder="Votre nom" />
                </div>
                <div>
                  <Label color={C.gold}>Date</Label>
                  <Input value={entreprise.date_sign || ""}
                    onChange={upd(setEntreprise)("date_sign")}
                    placeholder="JJ/MM/AAAA" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ── NAVIGATION PREV / NEXT ─────────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "space-between",
          marginTop: 32, paddingBottom: 40 }}>
          <button onClick={() => setTab(t => Math.max(0, t-1))}
            disabled={tab === 0}
            style={{ background: tab === 0 ? "#E0E0E0" : C.navy,
              color: C.white, border: "none", borderRadius: 8,
              padding: "10px 24px", cursor: tab === 0 ? "default" : "pointer",
              fontWeight: 700, fontSize: 13 }}>
            ← Précédent
          </button>
          <div style={{ display: "flex", gap: 6 }}>
            {TABS.map((t, i) => (
              <div key={i} onClick={() => setTab(i)}
                style={{ width: 10, height: 10, borderRadius: "50%",
                  background: tab === i ? t.color : "#D0D0D0",
                  cursor: "pointer", transition: "background .2s" }} />
            ))}
          </div>
          <button onClick={() => setTab(t => Math.min(TABS.length-1, t+1))}
            disabled={tab === TABS.length-1}
            style={{ background: tab === TABS.length-1 ? "#E0E0E0" : C.gold,
              color: C.navy, border: "none", borderRadius: 8,
              padding: "10px 24px",
              cursor: tab === TABS.length-1 ? "default" : "pointer",
              fontWeight: 700, fontSize: 13 }}>
            Suivant →
          </button>
        </div>
      </div>
    </div>
  );
}
