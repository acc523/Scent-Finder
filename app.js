// ScentFinder v2 — psychology-first quiz, axis scoring, narrative result, Google Sheets logging.
// No dependencies. Needs data.js (PERFUMES, TIERS) and config.js loaded first.
(function () {
  const CFG = window.SCENTFINDER_CONFIG || {};
  const ACC = ["citrus","herbal","green","clean","aquatic","floral","fruity","sweet","woody","spicy","smoky","earthy"];
  const ACC_WORD = {
    citrus:"bright citrus", herbal:"fresh herbs", green:"green leaves", clean:"clean musk", aquatic:"sea air",
    floral:"soft florals", fruity:"juicy fruit", sweet:"warm amber", woody:"woods", spicy:"spice",
    smoky:"smoke and leather", earthy:"earth and moss"
  };
  const AXES = ["dry","dense","sharp","smoky","tension","strange"];

  // ---------- QUESTIONS ----------
  // a = accord points, x = axis nudges (-1..1, centred at 0), p = projection nudge, frag = narrative fragment, fam = family tag for consistency checks
  const Q = [
    // ===== TOP NOTES: first impression =====
    { id:"q1_walk_in", layer:"top", section:"First impressions",
      title:"When you walk into a room, people should feel…",
      options:[
        { v:"full_of_life", label:"Full of life", a:{citrus:2,fruity:2}, x:{sharp:.2}, p:.6, frag:"full of life, like the lights just came on" },
        { v:"at_ease", label:"At ease", a:{clean:2,aquatic:1,floral:1}, x:{dense:-.3,sharp:-.3}, p:-.3, frag:"at ease, like someone opened a window" },
        { v:"curious", label:"Curious", a:{herbal:2,green:2}, x:{strange:.4}, p:0, frag:"curious, with a question they can't quite name" },
        { v:"impressed", label:"Impressed", a:{woody:2,spicy:1,citrus:1}, x:{dense:.3,sharp:.2}, p:.5, frag:"impressed, as if they should already know your name" },
        { v:"unsettled", label:"Unsettled", a:{smoky:2,earthy:1,spicy:1}, x:{tension:.5,strange:.4}, p:.4, frag:"unsettled, as if the room shifted slightly" }
      ]},
    { id:"q2_first_meet", layer:"top", section:"First impressions",
      title:"Meeting someone new, you're usually…",
      options:[
        { v:"joke", label:"The joke", a:{citrus:2,fruity:1,sweet:1}, x:{}, p:.5 },
        { v:"listener", label:"The listener", a:{clean:2,floral:1}, x:{dense:-.2,sharp:-.3}, p:-.5 },
        { v:"question", label:"The question", a:{herbal:2,green:1}, x:{strange:.3,sharp:.2}, p:0 },
        { v:"presence", label:"The presence", a:{woody:2,smoky:1}, x:{dense:.4}, p:.6 }
      ]},
    { id:"q3_misread", layer:"top", section:"First impressions",
      title:"People sometimes misread you as…",
      hint:"The misread is the surface. What's underneath shows up later in the scent.",
      options:[
        { v:"colder", label:"Colder than you are", a:{citrus:1,aquatic:1,sweet:1,spicy:1}, x:{tension:.2}, p:0 },   // cool opening, warm heart
        { v:"softer", label:"Softer than you are", a:{floral:1,spicy:1,herbal:1}, x:{sharp:.4,tension:.2}, p:0 },  // gentle open, sharp edge
        { v:"louder", label:"Louder than you are", a:{clean:1,woody:1}, x:{dense:-.3}, p:-.4 },                     // quieter drydown
        { v:"more_serious", label:"More serious than you are", a:{woody:1,fruity:1}, x:{tension:.2}, p:0 }        // dry frame, playful twist
      ]},

    // ===== HEART NOTES: who you are =====
    { id:"q4_room", layer:"heart", section:"At heart",
      title:"A dinner party at an old estate. The host hasn't arrived and the house is yours to wander. Which room are you found in?",
      options:[
        { v:"salon", label:"The salon, by a fire that's been burning since before you came", a:{sweet:2,spicy:2,woody:1}, x:{dense:.4,dry:-.3}, fam:"amber", frag:"warm and generous, the room people drift toward" },
        { v:"gazebo", label:"The garden gazebo, watching the fountain", a:{herbal:2,green:2,floral:1}, x:{dense:-.3}, fam:"green", frag:"alive and a little restless, happiest outdoors" },
        { v:"treeline", label:"Where the lawn gives way to the trees, and the house lights don't reach", a:{woody:3,earthy:2}, x:{dry:.3,strange:.2}, fam:"woody", frag:"grounded and private, sure of your footing" },
        { v:"library", label:"A library behind a door nobody else found", a:{woody:1,smoky:1,earthy:1,herbal:1}, x:{tension:.4,strange:.4}, fam:"tension", frag:"calm on the surface, with something unresolved underneath" },
        { v:"drawing_room", label:"The drawing room, by the tea and the little cakes", a:{clean:2,floral:1,green:1,sweet:1}, x:{dense:-.2,sharp:-.4}, fam:"skin", frag:"gentle and close, the comfort people don't notice until it's gone" },
        { v:"smoking_room", label:"The smoking room, in a leather armchair with a brandy", a:{smoky:3,woody:1,sweet:1}, x:{smoky:.5,dense:.4}, fam:"smoke", frag:"magnetic and a little dangerous, comfortable in the dark" }
      ]},
    { id:"q5_role", layer:"heart", section:"At heart",
      title:"In the story of your friend group, you're…",
      options:[
        { v:"protagonist", label:"The protagonist", a:{citrus:1,woody:2}, x:{strange:-.3}, p:.3, fam:"woody" },
        { v:"confidant", label:"The confidant", a:{clean:2,floral:1}, x:{sharp:-.3}, p:-.3, fam:"skin" },
        { v:"wildcard", label:"The wildcard", a:{fruity:1,spicy:2,herbal:1}, x:{tension:.4,strange:.5}, p:.3, fam:"tension" },
        { v:"mentor", label:"The mentor", a:{woody:2,earthy:1,herbal:1}, x:{dense:.2,dry:.2}, p:0, fam:"woody" },
        { v:"antagonist", label:"The antagonist people secretly like", a:{smoky:2,sweet:1,spicy:1}, x:{tension:.4}, p:.4, fam:"smoke" }
      ]},
    { id:"q6_compliment", layer:"heart", section:"At heart",
      title:"The compliment that actually lands for you:",
      options:[
        { v:"easy", label:"\"You're so easy to be around\"", a:{clean:2,aquatic:1}, x:{sharp:-.3}, fam:"skin" },
        { v:"warm", label:"\"You're so warm\"", a:{sweet:2,spicy:1}, x:{dry:-.3}, fam:"amber" },
        { v:"interesting", label:"\"You're so interesting\"", a:{herbal:2,green:1}, x:{strange:.4}, fam:"green" },
        { v:"put_together", label:"\"You're so put together\"", a:{woody:2,citrus:1}, x:{sharp:.3}, fam:"woody" },
        { v:"unforgettable", label:"\"You're unforgettable\"", a:{smoky:2,woody:1}, x:{dense:.3}, p:.4, fam:"smoke" },
        { v:"surprising", label:"\"You always surprise me\"", a:{fruity:1,spicy:1,earthy:1}, x:{tension:.4,strange:.3}, fam:"tension" }
      ]},

    // ===== BASE NOTES: what lingers =====
    { id:"q7_after_leave", layer:"base", section:"What lingers",
      title:"After you leave, people feel…",
      options:[
        { v:"comforted", label:"Comforted", a:{sweet:2,clean:1,woody:1}, x:{sharp:-.3}, frag:"comforted, without being able to say why" },
        { v:"quieter", label:"Like the room got quieter", a:{woody:2,earthy:1}, x:{dense:.1,sharp:-.2}, frag:"aware of the quiet you left behind" },
        { v:"thinking", label:"Still thinking about something you said", a:{herbal:1,woody:2}, x:{sharp:.3,dry:.2}, frag:"still turning over something you said" },
        { v:"lighter", label:"Lighter", a:{citrus:2,clean:1,aquatic:1}, x:{dense:-.4}, frag:"lighter than before you arrived" },
        { v:"intrigued", label:"Intrigued, and a little unsure", a:{smoky:2,earthy:1}, x:{tension:.4,strange:.3}, frag:"intrigued, and not quite sure what happened" }
      ]},
    { id:"q8_ending", layer:"base", section:"What lingers",
      title:"The kind of ending you like best:",
      options:[
        { v:"resolved", label:"Resolved", a:{sweet:1,woody:1,clean:1}, x:{tension:-.4,smoky:-.2} },
        { v:"bittersweet", label:"Bittersweet", a:{green:1,floral:1,sweet:1}, x:{tension:.3} },
        { v:"open", label:"Open", a:{herbal:1,clean:1}, x:{dense:-.3,strange:.2} },
        { v:"twist", label:"A twist", a:{smoky:1,spicy:1}, x:{tension:.5,strange:.4} }
      ]},

    // ===== PLACES & SENSES =====
    { id:"q9_place", section:"Places & senses",
      title:"You're suddenly transported to the place that fits you best. You take a deep breath. Where are you?",
      options:[
        { v:"forest_cabin", label:"A cabin deep in a pine forest", a:{woody:3,smoky:1,green:1} },
        { v:"beach_dawn", label:"A beach at dawn", a:{aquatic:3,citrus:1,clean:1}, x:{dense:-.4} },
        { v:"old_library", label:"An old library", a:{woody:2,earthy:1,sweet:1}, x:{dense:.2} },
        { v:"night_market", label:"A night market", a:{spicy:2,sweet:1,smoky:1,fruity:1}, x:{dense:.3,tension:.2} },
        { v:"rooftop_bar", label:"A rooftop bar at sunset", a:{citrus:2,fruity:1,woody:1,sweet:1} },
        { v:"garden_rain", label:"A garden just after rain", a:{green:2,floral:1,earthy:1,herbal:1}, x:{dense:-.2} },
        { v:"desert_road", label:"A desert road", a:{earthy:2,spicy:1,woody:1}, x:{dry:.5} },
        { v:"quiet_church", label:"A quiet church", a:{smoky:2,woody:1,clean:1}, x:{strange:.2} }
      ]},
    { id:"q10_drink", section:"Places & senses",
      title:"Pick a drink.",
      options:[
        { v:"lemonade", label:"Ice-cold lemonade", a:{citrus:3}, x:{dense:-.3} },
        { v:"gin_tonic", label:"Gin & tonic", a:{herbal:2,citrus:1}, x:{dry:.4,sharp:.3} },
        { v:"green_tea", label:"Green tea", a:{green:2,clean:1}, x:{dry:.3,dense:-.2} },
        { v:"black_coffee", label:"Black coffee", a:{earthy:2,woody:1}, x:{dry:.4,dense:.3} },
        { v:"whisky", label:"Whisky, neat", a:{smoky:2,woody:2}, x:{smoky:.4,dry:.2} },
        { v:"hot_chocolate", label:"Hot chocolate", a:{sweet:3}, x:{dry:-.5,dense:.4} },
        { v:"red_wine", label:"Red wine", a:{fruity:2,woody:1}, x:{dense:.3} },
        { v:"coconut_water", label:"Coconut water", a:{aquatic:2,clean:1,sweet:1}, x:{dense:-.3} }
      ]},
    { id:"q11_sound", section:"Places & senses",
      title:"The sound you'd fall asleep to:",
      options:[
        { v:"rain_window", label:"Rain on a window", a:{green:1,earthy:1,aquatic:1}, x:{sharp:-.2} },
        { v:"fire", label:"A crackling fire", a:{smoky:2,woody:1}, x:{smoky:.3} },
        { v:"waves", label:"Waves", a:{aquatic:2,clean:1}, x:{dense:-.3} },
        { v:"jazz", label:"A jazz bar through the wall", a:{sweet:1,smoky:1,spicy:1}, x:{dense:.2} },
        { v:"wind_trees", label:"Wind through trees", a:{green:2,herbal:1,woody:1} },
        { v:"city_night", label:"A city at night", a:{spicy:1,fruity:1,woody:1}, x:{tension:.3} },
        { v:"silence", label:"Total silence", a:{clean:2}, x:{dense:-.3,sharp:-.2} },
        { v:"cello", label:"A cello", a:{woody:2,earthy:1}, x:{dense:.3} }
      ]},

    // ===== SLIDERS =====
    { id:"sliders", type:"sliders", section:"Gut feel",
      title:"Place yourself between each pair.",
      hint:"Don't overthink it. These are about you, not about perfume.",
      sliders:[
        { id:"s_sweet_dry", axis:"dry", left:"Sweet", right:"Dry", lh:"honey", rh:"dry red wine" },
        { id:"s_airy_dense", axis:"dense", left:"Airy", right:"Dense", lh:"linen curtains", rh:"velvet" },
        { id:"s_soft_sharp", axis:"sharp", left:"Soft", right:"Sharp", lh:"cashmere", rh:"cut glass" },
        { id:"s_smooth_smoky", axis:"smoky", left:"Smooth", right:"Smoky", lh:"polished marble", rh:"a campfire" },
        { id:"s_harmony_tension", axis:"tension", left:"Harmony", right:"Tension", lh:"a chord that resolves", rh:"a note held against it" },
        { id:"s_familiar_strange", axis:"strange", left:"Familiar", right:"Strange", lh:"a song you know by heart", rh:"one you've never heard" }
      ]},

    // ===== STYLE =====
    { id:"q12_style", section:"Style",
      title:"Your style usually reads as…",
      options:[
        { v:"structured_sharp", label:"Structured & sharp", a:{citrus:1,woody:1,herbal:1}, x:{sharp:.4} },
        { v:"soft_fluid", label:"Soft & fluid", a:{floral:1,clean:1}, x:{sharp:-.4,dense:-.2} },
        { v:"relaxed_lived_in", label:"Relaxed & lived-in", a:{earthy:1,woody:1,smoky:1}, x:{dry:.2} },
        { v:"bold_mixed", label:"Bold & mixed", a:{spicy:1,fruity:1}, x:{tension:.4,strange:.3}, p:.4 }
      ]},

    // ===== ANCHOR (last, soft) =====
    { id:"favourites", type:"text", optional:true, section:"Last one",
      title:"What is (or are) your favourite perfume(s)?",
      hint:"Optional. Anything you've owned, borrowed, or smelled on someone and remembered. \"None\" is a perfectly good answer." }
  ];

  const clamp = (v, lo=0, hi=1) => Math.max(lo, Math.min(hi, v));
  const norm = s => (s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
  const optOf = (qid, v) => { const q = Q.find(x=>x.id===qid); return q && q.options ? q.options.find(o=>o.v===v) : null; };

  // ---------- PERFUME AXES (derived from accords) ----------
  function perfumeAxes(p) {
    const a = k => (p.acc[k]||0);
    const fresh = a("citrus")+a("aquatic")+a("clean")+a("green")+a("herbal");
    const warm = a("sweet")+a("woody")+a("spicy")+a("smoky")+a("earthy");
    const bright = Math.max(a("citrus"),a("herbal"),a("green"),a("fruity"),a("aquatic"));
    const dark = Math.max(a("smoky"),a("earthy"),a("spicy"),a("woody")*0.7, a("sweet")*0.6);
    return {
      dry: clamp(0.55 - (a("sweet")*0.22 + a("fruity")*0.08) + (a("woody")+a("earthy")+a("herbal"))*0.04),
      dense: clamp(0.5 + (warm - fresh)/10 + ((p.strength||2)-2)*0.15),
      sharp: clamp(0.3 + (a("citrus")+a("herbal")+a("green")+a("spicy"))/9 - (a("sweet")+a("clean")+a("floral"))/12),
      smoky: clamp((a("smoky") + a("earthy")*0.4)/3),
      tension: p.tension != null ? p.tension : clamp((Math.min(bright, dark) / 3) * 1.1 + (bright>=2 && dark>=2 ? 0.15 : 0)),
      strange: clamp((p.crowd ? 0.2 : 0.6) + (p.tier>=5 ? 0.15 : 0) + (p.tier===7 ? 0.05 : 0))
    };
  }
  function cosine(u, v) {
    let d=0, nu=0, nv=0;
    for (const k of ACC) { const x=u[k]||0, y=v[k]||0; d+=x*y; nu+=x*x; nv+=y*y; }
    return (nu && nv) ? d/Math.sqrt(nu*nv) : 0;
  }

  // ---------- FAVOURITE MATCHING ----------
  function matchFavourites(text) {
    const t = norm(text);
    if (!t || /^(none|no|wala|idk|n a|na)$/.test(t)) return [];
    const parts = t.split(/ and | or |\s{2,}/).join(" ");
    const out = [];
    for (const p of window.PERFUMES) {
      const n = norm(p.name);
      const STOP = new Set(["edp","edt","eau","de","parfum","extrait","the","pour","homme","femme","le","la","les","l"]);
      const words = n.split(" ").filter(w => w.length > 2 && !STOP.has(w));
      const hit = parts.includes(n) || (words.length && words.every(w => parts.includes(w)));
      if (hit) out.push(p);
    }
    // prefer longest names when one name contains another (e.g. "Aventus" vs "Absolu Aventus")
    return out.filter(p => !out.some(o => o!==p && norm(o.name).includes(norm(p.name)) && norm(o.name).length>norm(p.name).length && parts.includes(norm(o.name))));
  }

  // ---------- PROFILE ----------
  function buildProfile(ans) {
    const accW = Object.fromEntries(ACC.map(k=>[k,0]));
    const nudge = Object.fromEntries(AXES.map(k=>[k,0]));
    let proj = 0;
    const layerWeight = { top:0.9, heart:1.3, base:1.1 };
    const scenTension = [];
    for (const q of Q) {
      if (!q.options) continue;
      const o = optOf(q.id, ans[q.id]); if (!o) continue;
      const w = layerWeight[q.layer] || 1;
      for (const [k,v] of Object.entries(o.a||{})) if (accW[k]!=null) accW[k] += v*w;
      for (const [k,v] of Object.entries(o.x||{})) nudge[k] += v;
      if (o.x && o.x.tension != null) scenTension.push(o.x.tension);
      proj += o.p || 0;
    }
    // anchor: favourites pull the accord vector toward what they already love
    const favs = matchFavourites(ans.favourites);
    for (const f of favs) for (const k of ACC) accW[k] += (f.acc[k]||0) * 1.2;

    // axes: sliders (60%) blended with scenario nudges (40%)
    const sl = ans.sliders || {};
    const axes = {};
    for (const s of Q.find(q=>q.id==="sliders").sliders) {
      const sv = (sl[s.id] != null ? sl[s.id] : 50) / 100;
      const sc = clamp(0.5 + nudge[s.axis] / 2);
      axes[s.axis] = clamp(sv*0.6 + sc*0.4);
    }

    // tension consistency check: Harmony<->Tension slider vs Familiar<->Strange slider vs scenario picks
    const t = (sl.s_harmony_tension ?? 50)/100, s = (sl.s_familiar_strange ?? 50)/100;
    const scen = clamp(0.5 + nudge.tension/2);
    const gap1 = Math.abs(t - s), gap2 = Math.abs(t - scen);
    const tensionConf = clamp(1 - (Math.max(0, gap1-0.25) + Math.max(0, gap2-0.25)) * 1.4, 0.2, 1);
    // low confidence: pull the tension target toward the average of the other two signals
    axes.tension = clamp(tensionConf*axes.tension + (1-tensionConf)*((s+scen)/2));

    // heart consistency: does the room agree with the compliment / role?
    const famOf = id => (optOf(id, ans[id])||{}).fam;
    const adj = { amber:["smoke","skin"], green:["woody","skin"], woody:["green","smoke","tension"], tension:["woody","smoke"], skin:["amber","green"], smoke:["amber","woody","tension"] };
    const room = famOf("q4_room");
    const agree = id => { const f = famOf(id); if (!room || !f) return .5; return f===room ? 1 : (adj[room]||[]).includes(f) ? .6 : .2; };
    const heartConf = Math.round(((agree("q6_compliment")*0.6 + agree("q5_role")*0.4)) * 100) / 100;

    const strengthPref = clamp(2 + proj*0.5 + (axes.dense-0.5)*1.2, 1, 3);
    const ranked = ACC.map(k=>[k,accW[k]]).sort((a,b)=>b[1]-a[1]);
    return { accW, axes, tensionConf: Math.round(tensionConf*100)/100, heartConf, strengthPref, favs, topAccords: ranked.slice(0,4).map(r=>r[0]), ranked };
  }

  // ---------- SCORING ----------
  function score(p, prof) {
    const pa = perfumeAxes(p);
    const accScore = cosine(prof.accW, p.acc);                       // 0..1
    const wts = { dry:1, dense:1, sharp:.8, smoky:1.2, tension: 1.1*prof.tensionConf, strange:.7 };
    let diff=0, tw=0;
    for (const k of AXES) { diff += Math.abs(prof.axes[k]-pa[k]) * wts[k]; tw += wts[k]; }
    const axisScore = 1 - diff/tw;                                    // 0..1
    const strScore = 1 - Math.abs((p.strength||2) - prof.strengthPref)/2;
    let anchor = 0;
    for (const f of prof.favs) anchor = Math.max(anchor, f===p ? 0 : cosine(f.acc, p.acc));
    const raw = accScore*0.55 + axisScore*0.30 + strScore*0.08 + (prof.favs.length ? anchor*0.12 : accScore*0.07);
    return { raw, accScore, axisScore, pa };
  }
  function rank(ans) {
    const prof = buildProfile(ans);
    const favSet = new Set(prof.favs);
    const scored = window.PERFUMES.filter(p=>!favSet.has(p)).map(p => ({ p, ...score(p, prof) })).sort((a,b)=>b.raw-a.raw);
    const max = scored[0].raw, min = scored[scored.length-1].raw;
    for (const s of scored) s.pct = Math.round(52 + (s.raw-min)/((max-min)||1) * 45);
    return { prof, scored };
  }

  // ---------- NARRATIVE ----------
  function narrative(ans, prof) {
    const top = optOf("q1_walk_in", ans.q1_walk_in), room = optOf("q4_room", ans.q4_room), after = optOf("q7_after_leave", ans.q7_after_leave);
    const [a1,a2,a3] = prof.topAccords.map(k=>ACC_WORD[k]);
    const sig = `${cap(a1)} over ${a2}, with an edge of ${a3}`;
    const tex = [
      prof.axes.dry > .6 ? "dry" : prof.axes.dry < .4 ? "sweet-leaning" : null,
      prof.axes.dense > .6 ? "dense" : prof.axes.dense < .4 ? "airy" : null,
      prof.axes.sharp > .6 ? "sharp-edged" : prof.axes.sharp < .4 ? "soft-edged" : null,
      prof.axes.smoky > .6 ? "smoky" : null
    ].filter(Boolean);
    const arc = prof.axes.tension > .6 ? "built on contrast, two things that shouldn't work together and do"
              : prof.axes.tension < .4 ? "smooth and resolved, every part agreeing with the next"
              : "balanced, with just enough friction to stay interesting";
    const story = `You walk in and people feel ${top ? top.frag : "something"}. At heart you're ${room ? room.frag : "hard to pin down"}. And when you've gone, they're left ${after ? after.frag : "thinking about you"}.`;
    return { signature: sig, texture: tex.join(", "), arc, story };
  }
  const cap = s => s ? s[0].toUpperCase()+s.slice(1) : s;

  // ---------- LOGGING ----------
  const SESSION = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2)).slice(0, 18);
  const START = Date.now();
  function payload(ans, res) {
    const { prof, scored } = res, n = narrative(ans, prof);
    const sl = ans.sliders || {};
    const perTier = window.TIERS.map(t => { const b = scored.find(s=>s.p.tier===t.id); return b ? `T${t.id}: ${b.p.brand} ${b.p.name}` : ""; }).filter(Boolean).join(" | ");
    const row = {
      session_id: SESSION, version: CFG.VERSION || "v2",
      duration_sec: Math.round((Date.now()-START)/1000),
      device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
      favourites: ans.favourites || "",
      favourites_matched: prof.favs.map(f=>`${f.brand} ${f.name}`).join(", "),
      tension_confidence: prof.tensionConf, heart_confidence: prof.heartConf,
      axis_dry: r2(prof.axes.dry), axis_dense: r2(prof.axes.dense), axis_sharp: r2(prof.axes.sharp),
      axis_smoky: r2(prof.axes.smoky), axis_tension: r2(prof.axes.tension), axis_strange: r2(prof.axes.strange),
      strength_pref: r2(prof.strengthPref),
      top_accords: prof.topAccords.join(", "),
      signature: n.signature, narrative: n.story,
      pick_1: label(scored[0]), pick_2: label(scored[1]), pick_3: label(scored[2]),
      tier_picks: perTier
    };
    for (const q of Q) if (q.options) row[q.id] = ans[q.id] || "";
    for (const s of Q.find(q=>q.id==="sliders").sliders) row[s.id] = sl[s.id] ?? 50;
    row.sliders_touched = Object.keys(ans.slidersTouched||{}).length;
    return row;
  }
  const r2 = v => Math.round(v*100)/100;
  const label = s => s ? `${s.p.brand} ${s.p.name} (${s.pct}%)` : "";
  function send(row) {
    if (!CFG.SHEET_WEBAPP_URL) return Promise.resolve("no-url");
    // text/plain + no-cors = a "simple" request: no CORS preflight, Apps Script still receives the body.
    return fetch(CFG.SHEET_WEBAPP_URL, { method:"POST", mode:"no-cors", headers:{ "Content-Type":"text/plain;charset=utf-8" }, body: JSON.stringify(row) })
      .then(()=> "sent").catch(()=> "failed");
  }

  // ---------- UI ----------
  const el = (tag, attrs={}, ...kids) => { const e=document.createElement(tag); for (const [k,v] of Object.entries(attrs)) { if (k==="class") e.className=v; else if (k.startsWith("on")) e.addEventListener(k.slice(2), v); else if (v!==false && v!=null) e.setAttribute(k, v); } for (const k of kids.flat()) if (k!=null) e.append(k.nodeType ? k : document.createTextNode(k)); return e; };
  const $ = s => document.querySelector(s);
  let step = 0; const ans = { sliders:{}, slidersTouched:{} };

  function renderQuestion() {
    const q = Q[step], box = $("#quiz"); box.innerHTML = "";
    $("#progress-bar").style.width = `${(step/Q.length)*100}%`;
    $("#step-count").textContent = `${q.section} · ${step+1} of ${Q.length}`;
    box.append(el("h2", {}, q.title));
    if (q.hint) box.append(el("p", { class:"hint" }, q.hint));
    const next = el("button", { class:"primary", id:"next", onclick: goNext }, step === Q.length-1 ? "See my scent →" : "Next →");
    if (q.options) {
      const list = el("div", { class: q.options.length > 5 ? "opts grid" : "opts list" });
      for (const o of q.options) {
        const b = el("button", { class: "opt" + (ans[q.id]===o.v ? " on" : ""), onclick: () => { ans[q.id]=o.v; renderQuestion(); setTimeout(goNext, 220); } }, o.label);
        list.append(b);
      }
      box.append(list);
      next.disabled = !ans[q.id];
    } else if (q.type === "sliders") {
      const wrap = el("div", { class:"sliders" });
      for (const s of q.sliders) {
        const val = ans.sliders[s.id] ?? 50;
        const input = el("input", { type:"range", min:0, max:100, value:val, "aria-label":`${s.left} to ${s.right}` });
        input.addEventListener("input", () => { ans.sliders[s.id] = +input.value; ans.slidersTouched[s.id] = 1; });
        wrap.append(el("div", { class:"sl" },
          el("div", { class:"sl-ends" }, el("span", {}, el("b", {}, s.left), el("i", {}, s.lh)), el("span", { class:"r" }, el("b", {}, s.right), el("i", {}, s.rh))),
          input));
      }
      box.append(wrap);
    } else if (q.type === "text") {
      const ta = el("textarea", { rows:3, placeholder:"e.g. Bleu de Chanel, my dad's Aventus, or none" });
      ta.value = ans.favourites || "";
      ta.addEventListener("input", () => { ans.favourites = ta.value; });
      box.append(ta);
      box.append(el("label", { class:"consent" },
        (() => { const c = el("input", { type:"checkbox", id:"consent" }); c.checked = ans.consent !== false; c.addEventListener("change", ()=>{ ans.consent = c.checked; }); return c; })(),
        " Share my answers anonymously to help improve ScentFinder. No name, email or contact details are collected."));
    }
    box.append(el("div", { class:"nav" },
      el("button", { class:"ghost", disabled: step===0 ? "" : false, onclick: () => { step--; renderQuestion(); } }, "← Back"), next));
  }
  function goNext() {
    const q = Q[step];
    if (q.options && !ans[q.id]) return;
    if (step < Q.length-1) { step++; renderQuestion(); window.scrollTo({ top: $("#app").offsetTop - 10, behavior:"smooth" }); }
    else showResults();
  }

  function card(s, big) {
    const p = s.p, t = window.TIERS.find(t=>t.id===p.tier);
    return el("div", { class:"card" + (big ? "" : " compact") },
      el("div", { class:"card-top" }, el("span", { class:`tier-chip t${p.tier}` }, t.short), el("span", { class:"match" }, `${s.pct}% match`)),
      el("h3", {}, p.name), el("p", { class:"brand" }, p.brand),
      big ? el("p", { class:"blurb" }, p.blurb) : null,
      el("p", { class:"notes" }, el("b", {}, "Notes: "), p.notes),
      el("div", { class:"meta" }, el("span", {}, "$".repeat(p.price)), el("span", {}, ["","Close to skin","Moderate","Loud"][p.strength]), el("span", {}, {M:"Marketed masculine",F:"Marketed feminine",U:"Unisex"}[p.gender])));
  }

  function showResults() {
    if (ans.consent === undefined) ans.consent = true;
    const res = rank(ans), { prof, scored } = res, n = narrative(ans, prof);
    $("#progress-bar").style.width = "100%";
    $("#quiz").classList.add("hidden");
    $("#step-count").textContent = ""; document.querySelector(".progress").classList.add("hidden");
    const out = $("#results"); out.innerHTML = ""; out.classList.remove("hidden");

    out.append(el("div", { class:"logo" }, "Your scent"),
      el("h1", { class:"sig" }, n.signature),
      el("p", { class:"story" }, n.story),
      el("p", { class:"profile" }, `Your ideal scent is ${n.texture ? n.texture + ", " : ""}${n.arc}.`));
    const flags = [];
    if (prof.tensionConf < 0.6) flags.push("Your answers about contrast pulled in different directions, so we went easy on that part of the match.");
    if (prof.heartConf < 0.4) flags.push("Your heart answers split between two moods. That's normal; it often means a scent that shifts as it dries down suits you.");
    if (prof.favs.length) flags.push(`Calibrated against what you already like: ${prof.favs.map(f=>f.name).join(", ")}.`);
    if (flags.length) out.append(el("ul", { class:"flags" }, flags.map(f=>el("li", {}, f))));

    out.append(el("h2", { class:"sec" }, "Your top 3"), el("div", { class:"cards big" }, scored.slice(0,3).map(s=>card(s,true))));
    out.append(el("h2", { class:"sec" }, "Your best match at every price tier"),
      el("p", { class:"hint" }, "Same profile, different budgets. Start wherever your wallet is comfortable."));
    for (const t of window.TIERS) {
      const picks = scored.filter(s=>s.p.tier===t.id).slice(0,2); if (!picks.length) continue;
      out.append(el("div", { class:"tier-row" },
        el("div", { class:"tier-head" }, el("span", { class:`tier-chip t${t.id}` }, t.short), el("div", {}, el("h4", {}, t.name), el("p", {}, t.desc))),
        el("div", { class:"cards" }, picks.map(s=>card(s,false)))));
    }
    const worst = scored.slice(-3).reverse();
    out.append(el("h2", { class:"sec" }, "Probably not for you"),
      el("p", { class:"avoid" }, worst.map(s=>`${s.p.brand} ${s.p.name}`).join(" · ")));
    out.append(el("div", { class:"tips" }, el("h3", {}, "Before you buy"),
      el("ul", {},
        el("li", {}, "Test on skin, not paper, and wait 2–3 hours. The first ten minutes lie."),
        el("li", {}, "Buy a decant (5–10 ml) before a full bottle, especially at the higher tiers."),
        el("li", {}, "Spray chest and neck, don't rub your wrists together."))));
    const status = el("p", { class:"hint", id:"send-status" });
    out.append(el("div", { class:"nav" }, el("button", { class:"primary", onclick: restart }, "Take it again")), status);

    if (ans.consent) send(payload(ans, res)).then(r => { status.textContent = r==="sent" ? "Thanks, your anonymous answers were shared." : ""; });
    window.scrollTo({ top: 0, behavior:"smooth" });
  }
  function restart() {
    step = 0; for (const k of Object.keys(ans)) delete ans[k]; ans.sliders = {}; ans.slidersTouched = {};
    $("#results").classList.add("hidden"); $("#quiz").classList.remove("hidden"); document.querySelector(".progress").classList.remove("hidden"); renderQuestion();
  }

  window.ScentFinder = { Q, rank, buildProfile, narrative, payload, perfumeAxes, matchFavourites, HEADERS: null };
  // Header order used for the Google Sheet (timestamp is added server-side).
  window.ScentFinder.HEADERS = ["timestamp","session_id","version","duration_sec","device",
    ...Q.filter(q=>q.options).map(q=>q.id), ...Q.find(q=>q.id==="sliders").sliders.map(s=>s.id), "sliders_touched",
    "favourites","favourites_matched","tension_confidence","heart_confidence",
    "axis_dry","axis_dense","axis_sharp","axis_smoky","axis_tension","axis_strange","strength_pref",
    "top_accords","signature","narrative","pick_1","pick_2","pick_3","tier_picks"];

  if (typeof document !== "undefined" && document.getElementById("start")) {
    $("#start").addEventListener("click", () => { $("#intro").classList.add("hidden"); $("#app").classList.remove("hidden"); renderQuestion(); });
  }
})();
