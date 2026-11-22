// "The Character Study" (ScentFinder v3) — quiz, scoring, narrative, Google Sheets logging.
// Needs config.js, data.js, illus.js loaded first.
(function () {
  const CFG = window.SCENTFINDER_CONFIG || {};
  const IL = window.ILLUS || {};
  const ACC = ["citrus","herbal","green","clean","aquatic","floral","fruity","sweet","woody","spicy","smoky","earthy"];
  const ACC_WORD = {
    citrus:"bright citrus", herbal:"fresh herbs", green:"green leaves", clean:"clean musk", aquatic:"sea air",
    floral:"soft florals", fruity:"juicy fruit", sweet:"warm amber", woody:"woods", spicy:"spice",
    smoky:"smoke and leather", earthy:"earth and moss"
  };
  const AXES = ["dry","dense","sharp","smoky","tension","strange"];

  // ---------- QUESTIONS ----------
  // e = emoji, img = illustration key, a = accord points, x = axis nudges, p = projection, frag = narrative, fam = heart family
  const Q = [
    // ===== FIRST IMPRESSIONS (top notes) =====
    { id:"q1_walk_in", layer:"top", section:"Top notes · First impressions",
      title:"When you walk into a room of strangers, you'd want the people to suddenly feel…",
      options:[
        { v:"full_of_life", e:"🎉", label:"Full of life", a:{citrus:2,fruity:2}, x:{sharp:.2}, p:.6, frag:"full of life, like the lights just came on" },
        { v:"at_ease", e:"🕊️", label:"At ease", a:{clean:2,aquatic:1,floral:1}, x:{dense:-.3,sharp:-.3}, p:-.3, frag:"at ease, like someone opened a window" },
        { v:"curious", e:"🔍", label:"Curious", a:{herbal:2,green:2}, x:{strange:.4}, p:0, frag:"curious, with a question they can't quite name" },
        { v:"impressed", e:"👑", label:"Impressed", a:{woody:2,spicy:1,citrus:1}, x:{dense:.3,sharp:.2}, p:.5, frag:"impressed, as if they should already know your name" },
        { v:"unsettled", e:"🌀", label:"Unsettled", a:{smoky:2,earthy:1,spicy:1}, x:{tension:.5,strange:.4}, p:.4, frag:"unsettled, as if the room shifted slightly" }
      ]},
    { id:"q2_first_meet", layer:"top", section:"Top notes · First impressions",
      title:"New place, new people, new everything. You're usually…",
      options:[
        { v:"joke", e:"😄", label:"The one who makes people laugh", a:{citrus:2,fruity:1,sweet:1}, x:{}, p:.5 },
        { v:"listener", e:"👂", label:"The one observing all the hidden details", a:{clean:2,floral:1}, x:{dense:-.2,sharp:-.3}, p:-.5 },
        { v:"question", e:"🧐", label:"The one asking intriguing questions", a:{herbal:2,green:1}, x:{strange:.3,sharp:.2}, p:0 },
        { v:"presence", e:"✨", label:"The one people notice first", a:{woody:2,smoky:1}, x:{dense:.4}, p:.6 }
      ]},
    { id:"q3_misread", layer:"top", section:"Top notes · First impressions",
      title:"People sometimes get you wrong. They think you're…",
      hint:"The first impression is the top note. What's underneath is the heart.",
      options:[
        { v:"colder", e:"🧊", label:"Colder than you are", a:{citrus:1,aquatic:1,sweet:1,spicy:1}, x:{tension:.2}, p:0 },
        { v:"softer", e:"🧸", label:"Softer than you are", a:{floral:1,spicy:1,herbal:1}, x:{sharp:.4,tension:.2}, p:0 },
        { v:"louder", e:"📣", label:"Louder than you are", a:{clean:1,woody:1}, x:{dense:-.3}, p:-.4 },
        { v:"more_serious", e:"🎩", label:"More serious than you are", a:{woody:1,fruity:1}, x:{tension:.2}, p:0 }
      ]},

    // ===== AT HEART =====
    { id:"q4_room", layer:"heart", section:"Heart notes · Who you are", grid:"pics",
      title:"A dinner party at an old estate. The host is late and the house is yours to wander. Where are you found?",
      options:[
        { v:"salon", img:"salon", e:"🔥", label:"The salon", sub:"by a fire that's been burning for hours", a:{sweet:2,spicy:2,woody:1}, x:{dense:.4,dry:-.3}, fam:"amber", frag:"warm and generous, the room people drift toward" },
        { v:"gazebo", img:"gazebo", e:"⛲", label:"The garden gazebo", sub:"watching the fountain", a:{herbal:2,green:2,floral:1}, x:{dense:-.3}, fam:"green", frag:"alive and a little restless, happiest outdoors" },
        { v:"treeline", img:"treeline", e:"🌲", label:"The edge of the woods", sub:"where the house lights don't reach", a:{woody:3,earthy:2}, x:{dry:.3,strange:.2}, fam:"woody", frag:"grounded and private, sure of your footing" },
        { v:"library", img:"library", e:"🗝️", label:"The hidden library", sub:"behind a door nobody else found", a:{woody:1,smoky:1,earthy:1,herbal:1}, x:{tension:.4,strange:.4}, fam:"tension", frag:"calm on the surface, with something unresolved underneath" },
        { v:"drawing_room", img:"drawing_room", e:"🫖", label:"The drawing room", sub:"by the tea and the little cakes", a:{clean:2,floral:1,green:1,sweet:1}, x:{dense:-.2,sharp:-.4}, fam:"skin", frag:"gentle and close, the comfort people don't notice until it's gone" },
        { v:"smoking_room", img:"smoking_room", e:"🥃", label:"The smoking room", sub:"in a leather armchair, brandy in hand", a:{smoky:3,woody:1,sweet:1}, x:{smoky:.5,dense:.4}, fam:"smoke", frag:"magnetic and a little dangerous, comfortable in the dark" }
      ]},
    { id:"q5_role", layer:"heart", section:"Heart notes · Who you are", grid:"chars",
      title:"Choose your character. In the story of your friend group, you're…",
      options:[
        { v:"protagonist", img:"protagonist", e:"⭐", label:"The Protagonist", sub:"it's your story, they're all in it", a:{citrus:1,woody:2}, x:{strange:-.3}, p:.3, fam:"woody" },
        { v:"confidant", img:"confidant", e:"🤝", label:"The Confidant", sub:"everyone's 2am phone call", a:{clean:2,floral:1}, x:{sharp:-.3}, p:-.3, fam:"skin" },
        { v:"wildcard", img:"wildcard", e:"🃏", label:"The Wildcard", sub:"nobody knows what you'll do next", a:{fruity:1,spicy:2,herbal:1}, x:{tension:.4,strange:.5}, p:.3, fam:"tension" },
        { v:"mentor", img:"mentor", e:"📖", label:"The Mentor", sub:"the one with the answer", a:{woody:2,earthy:1,herbal:1}, x:{dense:.2,dry:.2}, p:0, fam:"woody" },
        { v:"antagonist", img:"antagonist", e:"🎭", label:"The Lovable Villain", sub:"trouble, but everyone's favourite", a:{smoky:2,sweet:1,spicy:1}, x:{tension:.4}, p:.4, fam:"smoke" }
      ]},
    { id:"q6_compliment", layer:"heart", section:"Heart notes · Who you are",
      title:"Which compliment would mean the most to you?",
      options:[
        { v:"easy", e:"😌", label:"\"I always feel relaxed around you.\"", a:{clean:2,aquatic:1}, x:{sharp:-.3}, fam:"skin" },
        { v:"warm", e:"🤗", label:"\"You make people feel welcome.\"", a:{sweet:2,spicy:1}, x:{dry:-.3}, fam:"amber" },
        { v:"interesting", e:"💡", label:"\"You see things differently.\"", a:{herbal:2,green:1}, x:{strange:.4}, fam:"green" },
        { v:"put_together", e:"👔", label:"\"You always look like you've got it together.\"", a:{woody:2,citrus:1}, x:{sharp:.3}, fam:"woody" },
        { v:"unforgettable", e:"🌟", label:"\"I can't stop thinking about you.\"", a:{smoky:2,woody:1}, x:{dense:.3}, p:.4, fam:"smoke" },
        { v:"surprising", e:"🎁", label:"\"You always surprise me.\"", a:{fruity:1,spicy:1,earthy:1}, x:{tension:.4,strange:.3}, fam:"tension" }
      ]},

    // ===== WHAT LINGERS =====
    { id:"q7_after_leave", layer:"base", section:"Base notes · What lingers",
      title:"After you leave the room, you'd want the people you've just left to feel…",
      options:[
        { v:"comforted", e:"🫶", label:"Comforted by you", a:{sweet:2,clean:1,woody:1}, x:{sharp:-.3}, frag:"comforted, without being able to say why" },
        { v:"quieter", e:"🌙", label:"Like the room feels a bit lonelier without you", a:{woody:2,earthy:1}, x:{dense:.1,sharp:-.2}, frag:"a little lonelier without you" },
        { v:"thinking", e:"💭", label:"Still thinking about something you said", a:{herbal:1,woody:2}, x:{sharp:.3,dry:.2}, frag:"still turning over something you said" },
        { v:"lighter", e:"🎈", label:"Like you've helped them feel lighter", a:{citrus:2,clean:1,aquatic:1}, x:{dense:-.4}, frag:"lighter than before you arrived" },
        { v:"intrigued", e:"🕯️", label:"Intrigued, and a little unsure", a:{smoky:2,earthy:1}, x:{tension:.4,strange:.3}, frag:"intrigued, and not quite sure what happened" }
      ]},
    { id:"q8_ending", layer:"base", section:"Base notes · What lingers", grid:"pics",
      title:"In a book or a film, the ending you like best is…",
      options:[
        { v:"resolved", img:"end_resolved", e:"🎀", label:"Resolved", sub:"everything ties up", a:{sweet:1,woody:1,clean:1}, x:{tension:-.4,smoky:-.2} },
        { v:"bittersweet", img:"end_bittersweet", e:"🥀", label:"Bittersweet", sub:"happy and sad at once", a:{green:1,floral:1,sweet:1}, x:{tension:.3} },
        { v:"open", img:"end_open", e:"🚪", label:"Open", sub:"you decide what happens next", a:{herbal:1,clean:1}, x:{dense:-.3,strange:.2} },
        { v:"twist", img:"end_twist", e:"🔀", label:"A twist", sub:"you didn't see it coming", a:{smoky:1,spicy:1}, x:{tension:.5,strange:.4} }
      ]},

    // ===== PLACES =====
    { id:"q9_place", section:"Mood · Places & senses", grid:"pics",
      title:"You're suddenly teleported somewhere that fits you perfectly. You take a deep breath. Where are you?",
      options:[
        { v:"forest_cabin", img:"forest_cabin", e:"🌲", label:"A cabin in a pine forest", a:{woody:3,smoky:1,green:1} },
        { v:"beach_dawn", img:"beach_dawn", e:"🌅", label:"A beach at dawn", a:{aquatic:3,citrus:1,clean:1}, x:{dense:-.4} },
        { v:"old_library", img:"old_library", e:"📚", label:"An old library", a:{woody:2,earthy:1,sweet:1}, x:{dense:.2} },
        { v:"night_market", img:"night_market", e:"🏮", label:"A night market", a:{spicy:2,sweet:1,smoky:1,fruity:1}, x:{dense:.3,tension:.2} },
        { v:"rooftop_bar", img:"rooftop_bar", e:"🌆", label:"A rooftop bar at sunset", a:{citrus:2,fruity:1,woody:1,sweet:1} },
        { v:"garden_rain", img:"garden_rain", e:"🌧️", label:"A garden just after rain", a:{green:2,floral:1,earthy:1,herbal:1}, x:{dense:-.2} },
        { v:"desert_road", img:"desert_road", e:"🌵", label:"A long desert road", a:{earthy:2,spicy:1,woody:1}, x:{dry:.5} },
        { v:"quiet_church", img:"quiet_church", e:"🕍", label:"A quiet old chapel", a:{smoky:2,woody:1,clean:1}, x:{strange:.2} }
      ]},
    { id:"q10_drink", section:"Mood · Places & senses", grid:"pics",
      title:"Someone hands you a drink. Which one do you hope it is?",
      options:[
        { v:"lemonade", img:"lemonade", e:"🍋", label:"Ice-cold lemonade", a:{citrus:3}, x:{dense:-.3} },
        { v:"gin_tonic", img:"gin_tonic", e:"🍸", label:"Gin & tonic", a:{herbal:2,citrus:1}, x:{dry:.4,sharp:.3} },
        { v:"green_tea", img:"green_tea", e:"🍵", label:"Green tea", a:{green:2,clean:1}, x:{dry:.3,dense:-.2} },
        { v:"black_coffee", img:"black_coffee", e:"☕", label:"Black coffee", a:{earthy:2,woody:1}, x:{dry:.4,dense:.3} },
        { v:"whisky", img:"whisky", e:"🥃", label:"Whisky, neat", a:{smoky:2,woody:2}, x:{smoky:.4,dry:.2} },
        { v:"hot_chocolate", img:"hot_chocolate", e:"🍫", label:"Hot chocolate", a:{sweet:3}, x:{dry:-.5,dense:.4} },
        { v:"red_wine", img:"red_wine", e:"🍷", label:"Red wine", a:{fruity:2,woody:1}, x:{dense:.3} },
        { v:"coconut_water", img:"coconut_water", e:"🥥", label:"Coconut water", a:{aquatic:2,clean:1,sweet:1}, x:{dense:-.3} }
      ]},
    { id:"q11_sound", section:"Mood · Places & senses",
      title:"The sound you'd want to fall asleep to:",
      options:[
        { v:"rain_window", e:"🌧️", label:"Rain on a window", a:{green:1,earthy:1,aquatic:1}, x:{sharp:-.2} },
        { v:"fire", e:"🔥", label:"A crackling fire", a:{smoky:2,woody:1}, x:{smoky:.3} },
        { v:"waves", e:"🌊", label:"Waves", a:{aquatic:2,clean:1}, x:{dense:-.3} },
        { v:"jazz", e:"🎷", label:"A jazz bar through the wall", a:{sweet:1,smoky:1,spicy:1}, x:{dense:.2} },
        { v:"wind_trees", e:"🍃", label:"Wind through trees", a:{green:2,herbal:1,woody:1} },
        { v:"city_night", e:"🌃", label:"A city at night", a:{spicy:1,fruity:1,woody:1}, x:{tension:.3} },
        { v:"silence", e:"🤫", label:"Total silence", a:{clean:2}, x:{dense:-.3,sharp:-.2} },
        { v:"cello", e:"🎻", label:"A cello", a:{woody:2,earthy:1}, x:{dense:.3} }
      ]},

    // ===== GUT FEEL (one pair per screen, 5 steps) =====
    ...[
      { id:"s_sweet_dry", axis:"dry", left:"Sweet", right:"Dry", li:"p_sweet", ri:"p_dry",
        lx:["Honey","Caramel","Ripe mango","Birthday cake"], rx:["Dry red wine","Black coffee","Toast","Dry humour"] },
      { id:"s_airy_dense", axis:"dense", left:"Airy", right:"Dense", li:"p_airy", ri:"p_dense",
        lx:["Linen curtains","Morning mist","A high ceiling","A paper kite"], rx:["Velvet","A heavy wool coat","Dark chocolate","A packed bookshelf"] },
      { id:"s_soft_sharp", axis:"sharp", left:"Soft", right:"Sharp", li:"p_soft", ri:"p_sharp",
        lx:["Cashmere","A whisper","Smooth pebbles","Warm bread"], rx:["Cut glass","A crisp collar","A fresh lemon","Cold morning air"] },
      { id:"s_smooth_smoky", axis:"smoky", left:"Smooth", right:"Smoky", li:"p_smooth", ri:"p_smoky",
        lx:["Polished marble","Silk","Still water","Fresh sheets"], rx:["A campfire","An old jazz bar","Burnt sugar","A leather jacket"] },
      { id:"s_harmony_tension", axis:"tension", left:"Harmony", right:"Tension", li:"p_harmony", ri:"p_tension",
        lx:["A song that resolves","A matching outfit","A calm lake","A perfectly set table"], rx:["A note held too long","A print that clashes but works","A storm on a hot day","Salted caramel"] },
      { id:"s_familiar_strange", axis:"strange", left:"Familiar", right:"Strange", li:"p_familiar", ri:"p_strange",
        lx:["A song you know by heart","Your usual order","Your hometown","A favourite sweater"], rx:["A song you've never heard","A dish you can't name","A city you got lost in","A half-remembered dream"] }
    ].map(s => ({ ...s, type:"slider", section:"Texture · Where do you sit?", title:`${s.left} or ${s.right}?`, hint:"Slide or tap to place yourself, then continue. These shape the texture of your scent." })),

    // ===== STYLE =====
    { id:"q12_style", section:"Style · How you show up", grid:"pics",
      title:"Your style usually reads as…",
      options:[
        { v:"structured_sharp", img:"structured_sharp", e:"📐", label:"Structured & sharp", a:{citrus:1,woody:1,herbal:1}, x:{sharp:.4} },
        { v:"soft_fluid", img:"soft_fluid", e:"🌊", label:"Soft & fluid", a:{floral:1,clean:1}, x:{sharp:-.4,dense:-.2} },
        { v:"relaxed_lived_in", img:"relaxed_lived_in", e:"🧶", label:"Relaxed & lived-in", a:{earthy:1,woody:1,smoky:1}, x:{dry:.2} },
        { v:"bold_mixed", img:"bold_mixed", e:"🎨", label:"Bold & mixed", a:{spicy:1,fruity:1}, x:{tension:.4,strange:.3}, p:.4 }
      ]},

    // ===== LAST =====
    { id:"favourites", type:"text", optional:true, section:"Last one",
      title:"Any perfumes or colognes you've loved?",
      hint:"List as many as you like: ones you own, ones you've borrowed, or ones you smelled on someone and never forgot. Skip it if nothing comes to mind." }
  ];
  const SLIDERS = Q.filter(q => q.type === "slider");
  const STEPS = [0, 25, 50, 75, 100];

  const clamp = (v, lo=0, hi=1) => Math.max(lo, Math.min(hi, v));
  const norm = s => (s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
  const optOf = (qid, v) => { const q = Q.find(x=>x.id===qid); return q && q.options ? q.options.find(o=>o.v===v) : null; };
  const cap = s => s ? s[0].toUpperCase()+s.slice(1) : s;
  const r2 = v => Math.round(v*100)/100;

  // ---------- PERFUME AXES ----------
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
  const STOP = new Set(["edp","edt","eau","de","parfum","extrait","the","pour","homme","femme","le","la","les","l"]);
  function matchFavourites(text) {
    const t = norm(text);
    if (!t || /^(none|no|wala|idk|n a|na|nothing)$/.test(t)) return [];
    const out = [];
    for (const p of window.PERFUMES) {
      const n = norm(p.name);
      const words = n.split(" ").filter(w => w.length > 2 && !STOP.has(w));
      if (t.includes(n) || (words.length && words.every(w => t.includes(w)))) out.push(p);
    }
    return out.filter(p => !out.some(o => o!==p && norm(o.name).includes(norm(p.name)) && norm(o.name).length>norm(p.name).length && t.includes(norm(o.name))));
  }

  // ---------- PROFILE ----------
  function buildProfile(ans) {
    const accW = Object.fromEntries(ACC.map(k=>[k,0]));
    const nudge = Object.fromEntries(AXES.map(k=>[k,0]));
    let proj = 0;
    const layerWeight = { top:0.9, heart:1.3, base:1.1 };
    const layerAcc = { top:{}, heart:{}, base:{} };
    for (const q of Q) {
      if (!q.options) continue;
      const o = optOf(q.id, ans[q.id]); if (!o) continue;
      const w = layerWeight[q.layer] || 1;
      for (const [k,v] of Object.entries(o.a||{})) if (accW[k]!=null) { accW[k] += v*w; if (q.layer) layerAcc[q.layer][k] = (layerAcc[q.layer][k]||0) + v; }
      for (const [k,v] of Object.entries(o.x||{})) nudge[k] += v;
      proj += o.p || 0;
    }
    const favs = matchFavourites(ans.favourites);
    for (const f of favs) for (const k of ACC) accW[k] += (f.acc[k]||0) * 1.2;

    const sl = ans.sliders || {};
    const axes = {};
    for (const s of SLIDERS) {
      const sv = (sl[s.id] ?? 50) / 100;
      const sc = clamp(0.5 + nudge[s.axis] / 2);
      axes[s.axis] = clamp(sv*0.6 + sc*0.4);
    }
    const t = (sl.s_harmony_tension ?? 50)/100, s = (sl.s_familiar_strange ?? 50)/100;
    const scen = clamp(0.5 + nudge.tension/2);
    const tensionConf = clamp(1 - (Math.max(0, Math.abs(t-s)-0.25) + Math.max(0, Math.abs(t-scen)-0.25)) * 1.4, 0.2, 1);
    axes.tension = clamp(tensionConf*axes.tension + (1-tensionConf)*((s+scen)/2));

    const famOf = id => (optOf(id, ans[id])||{}).fam;
    const adj = { amber:["smoke","skin"], green:["woody","skin"], woody:["green","smoke","tension"], tension:["woody","smoke"], skin:["amber","green"], smoke:["amber","woody","tension"] };
    const room = famOf("q4_room");
    const agree = id => { const f = famOf(id); if (!room || !f) return .5; return f===room ? 1 : (adj[room]||[]).includes(f) ? .6 : .2; };
    const heartConf = r2(agree("q6_compliment")*0.6 + agree("q5_role")*0.4);

    const strengthPref = clamp(2 + proj*0.5 + (axes.dense-0.5)*1.2, 1, 3);
    const ranked = ACC.map(k=>[k,accW[k]]).sort((a,b)=>b[1]-a[1]);
    const layerTop = Object.fromEntries(Object.entries(layerAcc).map(([l,m]) => [l, Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,2).map(e=>e[0])]));
    return { accW, axes, tensionConf: r2(tensionConf), heartConf, strengthPref, favs, layerTop, topAccords: ranked.slice(0,4).map(r=>r[0]) };
  }

  // ---------- SCORING ----------
  function score(p, prof) {
    const pa = perfumeAxes(p);
    const accScore = cosine(prof.accW, p.acc);
    const wts = { dry:1, dense:1, sharp:.8, smoky:1.2, tension: 1.1*prof.tensionConf, strange:.7 };
    let diff=0, tw=0;
    for (const k of AXES) { diff += Math.abs(prof.axes[k]-pa[k]) * wts[k]; tw += wts[k]; }
    const axisScore = 1 - diff/tw;
    const strScore = 1 - Math.abs((p.strength||2) - prof.strengthPref)/2;
    let anchor = 0;
    for (const f of prof.favs) anchor = Math.max(anchor, cosine(f.acc, p.acc));
    const raw = accScore*0.55 + axisScore*0.30 + strScore*0.08 + (prof.favs.length ? anchor*0.12 : accScore*0.07);
    return { raw, accScore, axisScore };
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

  // ---------- BRAND MARKS ----------
  const BRAND_DOMAIN = {
    "Amouage":"amouage.com","Armaf":"armaf.com","Byredo":"byredo.com","Calvin Klein":"calvinklein.com","Carolina Herrera":"carolinaherrera.com",
    "Chanel Les Exclusifs":"chanel.com","Chanel":"chanel.com","Creed":"creedfragrances.com","D.S. & Durga":"dsanddurga.com","Davidoff":"davidoff.com",
    "Dior Privée":"dior.com","Dior":"dior.com","Diptyque":"diptyqueparis.com","Etat Libre d'Orange":"etatlibredorange.com","Frédéric Malle":"fredericmalle.com",
    "Giorgio Armani":"armani.com","Gucci":"gucci.com","Guerlain L'Art & La Matière":"guerlain.com","Hermès":"hermes.com","Hiram Green":"hiramgreen.com",
    "Imaginary Authors":"imaginaryauthors.com","Initio":"initioparfums.com","Jean Paul Gaultier":"jeanpaulgaultier.com","Jo Malone London":"jomalone.com",
    "L'Artisan Parfumeur":"artisanparfumeur.com","Lattafa":"lattafa.com","Le Labo":"lelabofragrances.com","Maison Crivelli":"maisoncrivelli.com",
    "Maison Francis Kurkdjian":"franciskurkdjian.com","Maison Margiela Replica":"maisonmargiela.com","Parfums de Marly":"parfums-de-marly.com",
    "Penhaligon's":"penhaligons.com","Prada":"prada.com","Rasasi":"rasasi.com","Tom Ford Private Blend":"tomford.com","Xerjoff":"xerjoff.com",
    "YSL":"yslbeauty.com","Zoologist":"zoologistperfumes.com"
  };
  // null = no reliable icon found, show the name badge
  const LOGO_OVERRIDE = { "Guerlain L'Art & La Matière": "https://icons.duckduckgo.com/ip3/guerlain.com.ico", "Rasasi": null };
  const initials = b => b.replace(/[^A-Za-z ]/g,"").split(" ").filter(Boolean).slice(0,2).map(w=>w[0]).join("").toUpperCase();

  // ---------- LOGGING ----------
  const SESSION = (window.crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2)).slice(0, 18);
  const START = Date.now();
  const HEADERS = ["timestamp","session_id","first_name","version","duration_sec","device",
    ...Q.filter(q=>q.options).map(q=>q.id), ...SLIDERS.map(s=>s.id), "sliders_touched",
    "favourites","favourites_matched","tension_confidence","heart_confidence",
    "axis_dry","axis_dense","axis_sharp","axis_smoky","axis_tension","axis_strange","strength_pref",
    "top_accords","signature","narrative","pick_1","pick_2","pick_3","tier_picks"];
  function payload(ans, res) {
    const { prof, scored } = res, n = narrative(ans, prof), sl = ans.sliders || {};
    const label = s => s ? `${s.p.brand} ${s.p.name} (${s.pct}%)` : "";
    const row = {
      session_id: SESSION, first_name: (ans.first_name||"").trim(), version: CFG.VERSION || "v3",
      duration_sec: Math.round((Date.now()-START)/1000),
      device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
      favourites: ans.favourites || "", favourites_matched: prof.favs.map(f=>`${f.brand} ${f.name}`).join(", "),
      tension_confidence: prof.tensionConf, heart_confidence: prof.heartConf,
      axis_dry: r2(prof.axes.dry), axis_dense: r2(prof.axes.dense), axis_sharp: r2(prof.axes.sharp),
      axis_smoky: r2(prof.axes.smoky), axis_tension: r2(prof.axes.tension), axis_strange: r2(prof.axes.strange),
      strength_pref: r2(prof.strengthPref), top_accords: prof.topAccords.join(", "),
      signature: n.signature, narrative: n.story,
      pick_1: label(scored[0]), pick_2: label(scored[1]), pick_3: label(scored[2]),
      tier_picks: window.TIERS.map(t => { const b = scored.find(s=>s.p.tier===t.id); return b ? `T${t.id}: ${b.p.brand} ${b.p.name}` : ""; }).filter(Boolean).join(" | "),
      sliders_touched: Object.keys(sl).length
    };
    for (const q of Q) if (q.options) row[q.id] = ans[q.id] || "";
    for (const s of SLIDERS) row[s.id] = sl[s.id] ?? "";
    return row;
  }
  function send(row) {
    if (!CFG.SHEET_WEBAPP_URL) return Promise.resolve("no-url");
    return fetch(CFG.SHEET_WEBAPP_URL, { method:"POST", mode:"no-cors", headers:{ "Content-Type":"text/plain;charset=utf-8" }, body: JSON.stringify(row) })
      .then(()=> "sent").catch(()=> "failed");
  }

  // ---------- UI ----------
  const el = (tag, attrs={}, ...kids) => { const e=document.createElement(tag); for (const [k,v] of Object.entries(attrs)) { if (k==="class") e.className=v; else if (k==="html") e.innerHTML=v; else if (k.startsWith("on")) e.addEventListener(k.slice(2), v); else if (v!==false && v!=null) e.setAttribute(k, v); } for (const k of kids.flat()) if (k!=null) e.append(k.nodeType ? k : document.createTextNode(k)); return e; };
  const $ = s => document.querySelector(s);
  const art = key => el("div", { class:"art", html: IL[key] || "" });
  let step = 0; const ans = { sliders:{}, favList:["","",""] };

  const ACC_COLOR = { citrus:"#D9A520", herbal:"#5E8C4E", green:"#3F7A4B", clean:"#8FB3C9", aquatic:"#2F78A8", floral:"#CF7C93",
    fruity:"#C2473A", sweet:"#C98545", woody:"#7A5233", spicy:"#B5502A", smoky:"#55524E", earthy:"#76663F" };
  const ACC_NAME = { citrus:"Citrus", herbal:"Herbal", green:"Green", clean:"Clean musk", aquatic:"Aquatic", floral:"Floral",
    fruity:"Fruity", sweet:"Amber & sweet", woody:"Woody", spicy:"Spicy", smoky:"Smoke & leather", earthy:"Earthy" };
  const TIER_COLOR = { 1:"#7D8C92", 2:"#3F6E8C", 3:"#6B4F8A", 4:"#B07034", 5:"#8E2F3F", 6:"#2F6B4F", 7:"#A8842F" };

  function progress() {
    $("#progress-bar").style.width = `${(step/Q.length)*100}%`;
    $("#step-count").textContent = `${Q[step].section}  ·  ${step+1} / ${Q.length}`;
  }
  function navRow(nextBtn) {
    return el("div", { class:"nav" },
      el("button", { class:"ghost", disabled: step===0 ? "" : false, onclick: () => { step--; renderQuestion(); } }, "Back"), nextBtn);
  }

  function renderQuestion() {
    const q = Q[step], box = $("#quiz"); box.innerHTML = ""; progress();
    box.append(el("h2", { class:"q" }, q.title));
    if (q.hint) box.append(el("p", { class:"hint" }, q.hint));
    const isLast = step === Q.length-1;
    const next = el("button", { class:"primary", id:"next", onclick: goNext }, isLast ? "What is my scent?" : q.type === "slider" ? "Continue" : "Next");

    if (q.options) {
      const cls = q.grid === "pics" ? "opts pics" : q.grid === "chars" ? "opts chars" : "opts list";
      const list = el("div", { class: cls });
      for (const o of q.options) {
        const on = ans[q.id]===o.v;
        const pick = () => { ans[q.id]=o.v; renderQuestion(); };
        if (o.img) list.append(el("button", { class:"opt pic"+(on?" on":""), onclick: pick },
          art(o.img), el("span", { class:"lbl" }, el("span", { class:"em" }, o.e), " ", o.label), o.sub ? el("span", { class:"sub" }, o.sub) : null));
        else list.append(el("button", { class:"opt"+(on?" on":""), onclick: pick }, el("span", { class:"em" }, o.e), el("span", {}, o.label)));
      }
      box.append(list);
      next.disabled = !ans[q.id];
    } else if (q.type === "slider") {
      box.append(renderSlider(q, next));
      next.disabled = ans.sliders[q.id] == null;
    } else if (q.type === "text") {
      const list = el("div", { class:"favs" });
      const draw = () => {
        list.innerHTML = "";
        ans.favList.forEach((v, i) => {
          const inp = el("input", { type:"text", maxlength:80, placeholder: ["e.g. Bleu de Chanel","e.g. my dad's cologne","another one…"][i] || "another one…" });
          inp.value = v; inp.addEventListener("input", () => { ans.favList[i] = inp.value; });
          list.append(inp);
        });
        list.append(el("button", { class:"add", type:"button", onclick: () => { ans.favList.push(""); draw(); list.querySelectorAll("input")[ans.favList.length-1].focus(); } }, "+ Add another"));
      };
      draw(); box.append(list);
    }
    box.append(navRow(next));
  }

  const STEP_LABELS = q => ["Very "+q.left.toLowerCase(), "A bit "+q.left.toLowerCase(), "Right in between", "A bit "+q.right.toLowerCase(), "Very "+q.right.toLowerCase()];
  function renderSlider(q, next) {
    const pole = (side, key, label, ex) => el("div", { class:`pole ${side}` }, art(key), el("h3", {}, label), el("ul", {}, ex.map(x=>el("li", {}, x))));
    const wrap = el("div", { class:"slider" });
    const caption = el("p", { class:"caption" }, " ");
    const range = el("input", { type:"range", min:0, max:4, step:1, "aria-label":`${q.left} to ${q.right}` });
    const ticks = el("div", { class:"ticks" });
    const apply = (idx, touched) => {
      if (touched) { ans.sliders[q.id] = STEPS[idx]; next.disabled = false; }
      const set = ans.sliders[q.id] != null;
      const v = set ? STEPS.indexOf(ans.sliders[q.id]) : 2;
      range.value = v;
      wrap.className = "slider" + (set ? " set" : "") + (set && v < 2 ? " lean-l" : set && v > 2 ? " lean-r" : "") + (set && (v===0||v===4) ? " strong" : "");
      caption.textContent = set ? STEP_LABELS(q)[v] : "Not placed yet";
      [...ticks.children].forEach((t,i) => t.classList.toggle("on", set && i===v));
      range.style.setProperty("--pct", `${v*25}%`);
    };
    STEPS.forEach((_, i) => ticks.append(el("button", { class:"tick", type:"button", "aria-label": STEP_LABELS(q)[i], onclick: () => apply(i, true) })));
    range.addEventListener("input", () => apply(+range.value, true));
    range.addEventListener("pointerdown", () => { if (ans.sliders[q.id] == null) setTimeout(() => apply(+range.value, true), 0); });
    range.addEventListener("keydown", () => setTimeout(() => apply(+range.value, true), 0));
    wrap.append(el("div", { class:"poles" }, pole("l", q.li, q.left, q.lx), pole("r", q.ri, q.right, q.rx)),
      el("div", { class:"track-wrap" }, ticks, range), caption);
    apply(null, false);
    return wrap;
  }

  function goNext() {
    const q = Q[step];
    if (q.options && !ans[q.id]) return;
    if (q.type === "slider" && ans.sliders[q.id] == null) return;
    if (q.type === "text") ans.favourites = ans.favList.map(s=>s.trim()).filter(Boolean).join("; ");
    if (step < Q.length-1) { step++; renderQuestion(); window.scrollTo({ top: 0, behavior:"smooth" }); }
    else showResults();
  }

  // ---------- RESULTS ----------
  function logoEl(brand) {
    const box = el("div", { class:"mark word" }, el("span", {}, brand));
    const d = BRAND_DOMAIN[brand]; if (!d) return box;
    const sources = [];
    if (CFG.BRANDFETCH_CLIENT_ID) sources.push(`https://cdn.brandfetch.io/domain/${d}/w/400/h/160/theme/dark/fallback/404/type/logo?c=${CFG.BRANDFETCH_CLIENT_ID}`);
    // Site icons, checked brand by brand (Nov 2026). Google's icon is right for all but these two.
    if (LOGO_OVERRIDE[brand] !== undefined) { if (LOGO_OVERRIDE[brand]) sources.push(LOGO_OVERRIDE[brand]); }
    else sources.push(`https://www.google.com/s2/favicons?domain=${d}&sz=128`);
    const tryNext = () => {
      const src = sources.shift(); if (!src) return;
      const img = el("img", { alt:`${brand} logo`, referrerpolicy:"no-referrer" });
      img.addEventListener("load", () => { if (img.naturalWidth >= 16) { box.innerHTML = ""; box.classList.remove("word"); box.classList.toggle("wide", img.naturalWidth > img.naturalHeight*1.4); box.append(img); } else tryNext(); });
      img.addEventListener("error", tryNext);
      img.src = src;
    };
    tryNext();
    return box;
  }
  function tierBadge(t) { return el("span", { class:"tbadge", style:`--t:${TIER_COLOR[t.id]}` }, `Tier ${t.id} · ${t.short}`); }
  function card(s, big) {
    const p = s.p, t = window.TIERS.find(t=>t.id===p.tier);
    const accs = Object.entries(p.acc).sort((a,b)=>b[1]-a[1]).slice(0,4);
    return el("div", { class:"card" + (big ? " big" : ""), style:`--t:${TIER_COLOR[p.tier]}` },
      tierBadge(t),
      logoEl(p.brand),
      el("p", { class:"brand" }, p.brand),
      el("h3", {}, p.name),
      el("p", { class:"tier" }, `${"$".repeat(p.price)}  ·  ${s.pct}% match`),
      el("div", { class:"chips" }, accs.map(([k]) => el("span", { class:"chip", style:`--c:${ACC_COLOR[k]}` }, ACC_NAME[k]))),
      big ? el("p", { class:"blurb" }, p.blurb) : null,
      el("p", { class:"notes" }, p.notes));
  }

  // composite portrait: chosen character in an oval frame, tinted by the top accords, motifs orbiting
  function portrait(prof) {
    const role = optOf("q5_role", ans.q5_role), room = optOf("q4_room", ans.q4_room);
    const charKey = role ? role.img : "protagonist";
    const [c1, c2, c3] = prof.topAccords.map(k => ACC_COLOR[k]);
    const nested = (svg, x, y, w, h) => (svg||"").replace("<svg ", `<svg x="${x}" y="${y}" width="${w}" height="${h}" `);
    const roomArt = nested(IL[room ? room.img : "salon"], 70, 150, 180, 135);
    const char = nested(IL[charKey], 0, 66, 320, 240);
    const pos = [[44,70],[262,64],[24,190],[282,186],[60,300],[246,300]];
    const motifs = prof.topAccords.concat(prof.topAccords.slice(0,2)).slice(0,6).map((k,i) =>
      `<g transform="translate(${pos[i][0]-16} ${pos[i][1]-16}) scale(1.35)" stroke="${ACC_COLOR[k]}" color="${ACC_COLOR[k]}">${IL.motif[k]}</g>`).join("");
    return `<svg viewBox="0 0 320 370" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Your character portrait">
      <defs><radialGradient id="pg" cx="50%" cy="42%" r="62%"><stop offset="0" stop-color="${c1}" stop-opacity=".42"/><stop offset=".6" stop-color="${c2}" stop-opacity=".28"/><stop offset="1" stop-color="${c3}" stop-opacity=".18"/></radialGradient>
      <clipPath id="ov"><ellipse cx="160" cy="180" rx="104" ry="136"/></clipPath></defs>
      <ellipse cx="160" cy="180" rx="104" ry="136" fill="#FFFEFB"/>
      <ellipse cx="160" cy="180" rx="104" ry="136" fill="url(#pg)"/>
      <g clip-path="url(#ov)" color="#1F3A2E" opacity=".22">${roomArt}</g>
      <g clip-path="url(#ov)" color="#1F3A2E">${char}</g>
      <ellipse cx="160" cy="180" rx="104" ry="136" fill="none" stroke="#B8913A" stroke-width="3"/>
      <ellipse cx="160" cy="180" rx="112" ry="144" fill="none" stroke="#B8913A" stroke-width="1"/>
      <ellipse cx="160" cy="180" rx="117" ry="149" fill="none" stroke="#B8913A" stroke-width=".6" stroke-dasharray="1 5"/>
      <path d="M160 26 l6 8 l-6 8 l-6 -8 Z M160 318 l6 8 l-6 8 l-6 -8 Z" fill="#B8913A"/>
      ${motifs}
    </svg>`;
  }

  function showResults() {
    const res = rank(ans), { prof, scored } = res, n = narrative(ans, prof);
    const name = (ans.first_name || "").trim();
    const role = optOf("q5_role", ans.q5_role), room = optOf("q4_room", ans.q4_room);
    $("#quiz").classList.add("hidden"); $("#progress").classList.add("hidden");
    const out = $("#results"); out.innerHTML = ""; out.classList.remove("hidden");

    out.append(el("p", { class:"eyebrow" }, `The scent portrait of`),
      el("p", { class:"pname" }, name || "you"),
      el("div", { class:"portrait", html: portrait(prof) }),
      el("p", { class:"ptitle" }, `${role ? role.label : "The Protagonist"}${room ? ", found in " + room.label.replace(/^The /, "the ") : ""}`),
      el("div", { class:"rule" }),
      el("h1", { class:"sig" }, n.signature),
      el("p", { class:"story" }, n.story));

    // pyramid
    const lt = prof.layerTop || {};
    const row = (label, keys, w) => el("div", { class:"prow", style:`width:${w}%` },
      el("span", { class:"plabel" }, label), el("div", { class:"chips" }, (keys||[]).map(k => el("span", { class:"chip", style:`--c:${ACC_COLOR[k]}` }, ACC_NAME[k]))));
    out.append(el("h2", { class:"sec" }, "Your notes"),
      el("div", { class:"pyramid" }, row("Top · how you arrive", lt.top, 62), row("Heart · who you are", lt.heart, 80), row("Base · what lingers", lt.base, 100)));

    // accord bars
    const tot = Object.values(prof.accW).reduce((a,b)=>a+b,0) || 1;
    const bars = Object.entries(prof.accW).sort((a,b)=>b[1]-a[1]).slice(0,6);
    const max = bars[0][1] || 1;
    out.append(el("div", { class:"bars" }, bars.map(([k,v]) => el("div", { class:"bar" },
      el("span", { class:"bl" }, ACC_NAME[k]), el("span", { class:"bt" }, el("span", { class:"bf", style:`width:${(v/max)*100}%;background:${ACC_COLOR[k]}` })), el("span", { class:"bp" }, `${Math.round(v/tot*100)}%`)))));
    out.append(el("p", { class:"profile" }, `Your scent should be ${n.texture ? n.texture + ", " : ""}${n.arc}.`));

    const flags = [];
    if (prof.tensionConf < 0.6) flags.push("Your answers about contrast pulled in different directions, so we went easy on that part.");
    if (prof.heartConf < 0.4) flags.push("Your heart answers split between two moods. That often means a scent that changes as it wears suits you.");
    if (prof.favs.length) flags.push(`Tuned against what you already love: ${prof.favs.map(f=>f.name).join(", ")}.`);
    if (flags.length) out.append(el("ul", { class:"flags" }, flags.map(f=>el("li", {}, f))));

    out.append(el("h2", { class:"sec" }, "Your top three"), el("div", { class:"cards big" }, scored.slice(0,3).map(s=>card(s,true))));
    out.append(el("h2", { class:"sec" }, "Your match in every tier"), el("p", { class:"hint" }, "The same character, from everyday budget to rare and collectible."));
    for (const t of window.TIERS) {
      const picks = scored.filter(s=>s.p.tier===t.id).slice(0,2); if (!picks.length) continue;
      out.append(el("div", { class:"tier-row", style:`--t:${TIER_COLOR[t.id]}` },
        el("div", { class:"thead" }, el("span", { class:"tnum" }, `Tier ${t.id}`), el("h4", {}, t.name)),
        el("p", { class:"tdesc" }, t.desc), el("div", { class:"cards" }, picks.map(s=>card(s,false)))));
    }
    out.append(el("h2", { class:"sec" }, "Probably not for you"), el("p", { class:"avoid" }, scored.slice(-3).reverse().map(s=>`${s.p.brand} ${s.p.name}`).join("  ·  ")));
    out.append(el("p", { class:"fine" }, "Prices and formulas change, so treat tiers as a rough guide. Every scent is wearable by anyone. Logos are shown to identify each house."));
    out.append(el("div", { class:"nav" }, el("button", { class:"ghost", onclick: restart }, "Start again")));
    send(payload(ans, res));
    window.scrollTo({ top: 0, behavior:"smooth" });
  }
  function restart() {
    const nm = ans.first_name; step = 0; for (const k of Object.keys(ans)) delete ans[k]; ans.sliders = {}; ans.favList = ["","",""]; ans.first_name = nm;
    $("#results").classList.add("hidden"); $("#quiz").classList.remove("hidden"); $("#progress").classList.remove("hidden"); renderQuestion();
  }

  window.ScentFinder = { Q, SLIDERS, rank, buildProfile, narrative, payload, perfumeAxes, matchFavourites, HEADERS };

  if (typeof document !== "undefined" && document.getElementById("start")) {
    if (IL.pyramid) $("#emblem").innerHTML = IL.pyramid;
    const nameIn = $("#first-name"), start = $("#start");
    const sync = () => { start.disabled = nameIn.value.trim().length < 1; };
    nameIn.addEventListener("input", sync); sync();
    const begin = () => { if (start.disabled) return; ans.first_name = nameIn.value.trim(); $("#intro").classList.add("hidden"); $("#app").classList.remove("hidden"); renderQuestion(); };
    start.addEventListener("click", begin);
    nameIn.addEventListener("keydown", e => { if (e.key === "Enter") begin(); });
  }
})();
