// Hand-drawn line illustrations, one consistent "engraved ink" style.
// Stroke = currentColor (ink). class "a" = gold accent fill, class "p" = paper fill.
(function () {
  const W = (body, vb = "0 0 160 120") =>
    `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`;
  const ground = `<path d="M14 104 H146"/>`;
  const I = {};

  // ---------- Q4: rooms of the estate ----------
  I.salon = W(`${ground}
    <path d="M30 104 V40 H98 V104"/><path d="M24 40 H104"/><path d="M24 34 H104 V40"/>
    <path d="M46 104 V70 Q64 52 82 70 V104"/>
    <path class="a" d="M56 104 Q54 92 60 86 Q60 94 64 92 Q62 82 70 76 Q70 88 76 92 Q78 98 72 104 Z"/>
    <circle cx="64" cy="24" r="7"/><path d="M64 20 V24 H67"/><path d="M60 31 H68"/>
    <path d="M112 104 V78 Q112 66 124 66 Q136 66 136 78 V104"/><path d="M108 104 V86 H140 V104"/><path d="M118 92 H130"/>`);
  I.gazebo = W(`${ground}
    <path d="M40 46 Q80 14 120 46 Z"/><path d="M80 14 V8"/><circle class="a" cx="80" cy="7" r="2.5"/>
    <path d="M46 46 V94"/><path d="M114 46 V94"/><path d="M80 46 V94"/><path d="M38 94 H122 V100 H38 Z"/>
    <path d="M46 62 Q63 70 80 62 Q97 70 114 62"/>
    <path d="M122 104 Q124 96 134 96 H146"/>
    <path d="M18 104 Q18 92 30 92 Q42 92 42 104"/><path d="M30 92 V80"/><path class="a" d="M24 80 Q30 66 36 80 Z" stroke="none"/><path d="M24 80 Q30 66 36 80"/>`);
  I.treeline = W(`${ground}
    <circle class="a" cx="128" cy="24" r="9" stroke="none"/><circle cx="128" cy="24" r="9"/>
    <path d="M14 96 Q60 90 92 96"/>
    ${[96,112,128,144].map((x,i)=>`<path d="M${x} 104 V96"/><path d="M${x-10} 96 L${x} ${62-i*3} L${x+10} 96 Z"/><path d="M${x-7} 82 L${x+7} 82"/>`).join("")}
    <path d="M30 94 V84"/><circle cx="30" cy="80" r="4"/><path d="M26 92 L30 86 L34 92"/>
    <path d="M44 30 l2 -4 l2 4 M60 20 l1.5 -3 l1.5 3 M84 34 l1.5 -3 l1.5 3"/>`);
  I.library = W(`${ground}
    <path d="M20 104 V22 H84 V104"/>
    ${[36,52,68,84].map(y=>`<path d="M20 ${y+4} H84"/>`).join("")}
    <path d="M26 40 V26 M31 40 V28 M36 40 V25 M44 40 V29 M50 40 V26 M60 40 V27 M66 40 V25 M74 40 V28"/>
    <path d="M26 56 V44 M32 56 V46 M40 56 V43 M48 56 V45 M58 56 V44 M66 56 V46 M76 56 V43"/>
    <path d="M84 22 L108 30 V100 L84 104"/><path d="M90 46 V36 M96 48 V38 M102 50 V40"/>
    <path class="a" d="M84 104 L108 100 L140 104 Z" stroke="none" opacity=".55"/>
    <path d="M128 104 V82"/><path d="M122 104 H134"/><path d="M128 82 Q124 76 128 70 Q132 76 128 82"/><circle class="a" cx="128" cy="76" r="2" stroke="none"/>`);
  I.drawing_room = W(`${ground}
    <path d="M100 18 H140 V70 H100 Z"/><path d="M120 18 V70 M100 44 H140"/>
    <path d="M24 78 H96"/><path d="M32 78 V104 M88 78 V104"/>
    <path d="M38 78 Q36 64 48 62 H56 Q66 64 64 78"/><path d="M64 66 Q72 66 70 72"/><path d="M38 68 Q30 66 32 60"/><path d="M48 62 Q52 56 56 62"/>
    <path d="M70 78 V60"/><path d="M62 60 H78"/><path d="M64 70 H76"/><circle class="a" cx="70" cy="56" r="3" stroke="none"/><circle class="a" cx="66" cy="67" r="2" stroke="none"/><circle class="a" cx="74" cy="67" r="2" stroke="none"/>
    <path d="M78 78 Q78 72 84 72 Q90 72 90 78"/><path d="M90 74 Q94 74 92 77"/>
    <path d="M52 56 Q50 50 54 46 M58 54 Q56 48 60 44"/>`);
  I.smoking_room = W(`${ground}
    <path d="M36 104 V88"/><path d="M96 104 V88"/>
    <path d="M30 88 H102 V72 Q102 64 94 64 H40 Q30 64 30 72 Z"/>
    <path d="M40 64 V36 Q40 24 52 24 H82 Q94 24 94 36 V64"/>
    <path d="M30 72 Q22 72 22 62 Q22 54 32 56 L40 60"/><path d="M102 72 Q110 72 110 62 Q110 54 100 56 L94 60"/>
    <path d="M52 30 V58 M66 28 V58 M80 30 V58"/>
    <path d="M118 104 V80"/><path d="M110 80 H136"/><path d="M130 104 V80"/>
    <path d="M120 80 Q118 70 124 66 Q130 70 128 80"/><path class="a" d="M119.5 76 Q124 74 128.5 76 Q128 80 124 80 Q120 80 119.5 76 Z" stroke="none"/>
    <path d="M140 60 Q134 52 140 44 Q146 36 140 28" opacity=".6"/><path d="M148 64 Q142 56 148 48" opacity=".6"/>`);

  // ---------- Q5: characters (same base bust) ----------
  const bust = (extra, mouth = "M75 56 Q80 59 85 56", eyes = `<circle cx="74" cy="47" r="1.3" fill="currentColor"/><circle cx="86" cy="47" r="1.3" fill="currentColor"/>`) =>
    W(`<path d="M40 114 Q42 82 80 78 Q118 82 120 114"/><circle class="p" cx="80" cy="50" r="18"/>${eyes}<path d="${mouth}"/>${extra}`);
  I.protagonist = bust(`<path d="M60 48 Q56 30 70 26 Q76 20 86 24 Q100 24 100 40 Q102 46 98 50 Q96 38 88 36 Q90 42 84 42 Q78 34 70 40 Q66 44 62 50"/>
    <path d="M86 24 Q92 14 102 16 Q96 20 98 26"/>
    <path d="M48 92 Q40 104 36 114 M112 92 Q120 104 124 114"/><path d="M48 92 Q80 102 112 92"/>
    <path d="M62 84 L100 112"/><path d="M96 106 h14 v8 h-14 Z"/>
    <path class="a" stroke="none" d="M70 90 l2.4 5 l5.4 .6 l-4 3.7 l1 5.4 l-4.8 -2.6 l-4.8 2.6 l1 -5.4 l-4 -3.7 l5.4 -.6 Z"/>`, "M74 56 Q80 61 86 56");
  I.confidant = bust(`<path d="M62 52 Q58 30 80 30 Q102 30 98 52 Q96 38 80 38 Q66 38 62 52"/><circle cx="80" cy="27" r="7"/>
    <circle cx="74" cy="48" r="4.6"/><circle cx="86" cy="48" r="4.6"/><path d="M78.6 48 H81.4"/>
    <path d="M60 82 L80 104 L100 82"/><path d="M80 104 V114"/><circle cx="76" cy="98" r="1.2" fill="currentColor"/>
    <path d="M100 96 H120 V114 H100 Z"/><path d="M104 102 H116 M104 107 H114"/><path d="M118 92 L124 86"/>
    <path d="M48 102 H64 Q66 112 56 112 Q46 112 48 102"/><path d="M64 104 Q69 104 67 109"/><path d="M53 98 Q51 94 54 90 M59 98 Q57 94 60 90" opacity=".6"/>`,
    "M76 57 Q80 59.5 84 57", `<circle cx="74" cy="48" r="1.2" fill="currentColor"/><circle cx="86" cy="48" r="1.2" fill="currentColor"/>`);
  I.wildcard = bust(`<path d="M62 44 L60 30 L68 38 L70 26 L76 36 L80 24 L84 36 L90 26 L92 38 L100 30 L98 44"/>
    <path class="a" stroke="none" d="M66 42 H94 Q96 50 88 52 Q82 52 80 48 Q78 52 72 52 Q64 50 66 42 Z" opacity=".85"/>
    <path d="M100 56 l3 6 l-3 0 l3 6"/><path d="M64 88 l6 6 l6 -6 l6 6 l6 -6 l6 6"/>`, "M74 57 Q80 60 86 55");
  I.mentor = bust(`<path d="M62 46 Q62 30 80 30 Q98 30 98 46 Q94 36 80 36 Q66 36 62 46"/><path d="M68 41 L76 41 M84 41 L92 41"/>
    <path class="a" stroke="none" d="M52 84 Q80 76 108 84 L112 114 H48 Z" style="fill:#1F3A2E"/>
    <path d="M70 80 H90 V88 H70 Z" class="p"/><path d="M76 81 H84 V87 H76 Z" class="p"/>
    <path d="M62 98 L80 94 L98 98 V112 L80 108 L62 112 Z" class="p"/><path d="M80 94 V108"/><path d="M71 99 V105 M68 101.5 H74" stroke-width="1.2"/>
    <path class="a" stroke="none" d="M84 108 l2 6 l2 -6 Z"/>`, "M75 57 Q80 60 85 57");
  I.antagonist = bust(`<path d="M50 112 L42 70 L64 84"/><path d="M110 112 L118 70 L96 84"/><path class="a" stroke="none" d="M42 70 L64 84 L58 90 Z M118 70 L96 84 L102 90 Z" style="fill:#7A2E3A"/>
    <path d="M62 46 Q60 30 80 30 Q100 30 98 46 L90 38 L80 46 L70 38 Z"/>
    <path class="a" stroke="none" d="M64 43 Q80 38 96 43 Q97 51 88 52 Q82 52 80 48 Q78 52 72 52 Q63 51 64 43 Z" style="fill:#1F3A2E"/>
    <circle cx="74" cy="47" r="1.6" fill="#FBF8F2"/><circle cx="86" cy="47" r="1.6" fill="#FBF8F2"/>
    <path class="a" stroke="none" d="M80 88 L90 98 L80 110 L70 98 Z"/><path d="M80 88 L90 98 L80 110 L70 98 Z"/><path d="M76 98 H84"/>`, "M73 57 Q80 61 87 54", "");

  // ---------- Q9: places ----------
  I.forest_cabin = W(`${ground}
    <path d="M52 104 V72 H100 V104"/><path d="M46 74 L76 50 L106 74"/><path d="M88 60 V48 H94 V65"/>
    <path d="M70 104 V86 H82 V104"/><path d="M56 80 H66 V90 H56 Z"/><path class="a" stroke="none" d="M57 81 H65 V89 H57 Z" opacity=".7"/>
    <path d="M92 44 Q86 36 92 28 Q98 20 92 12" opacity=".6"/>
    <path d="M28 104 V96 M18 96 L28 50 L38 96 Z M22 78 H34"/><path d="M128 104 V96 M116 96 L128 44 L140 96 Z M120 74 H136"/>`);
  I.beach_dawn = W(`<path d="M14 72 H146"/>
    <path class="a" stroke="none" d="M56 72 A24 24 0 0 1 104 72 Z"/><path d="M56 72 A24 24 0 0 1 104 72"/>
    <path d="M80 40 V30 M58 50 L51 43 M102 50 L109 43 M50 64 H40 M110 64 H120"/>
    <path d="M24 84 Q34 80 44 84 Q54 88 64 84 M84 84 Q94 80 104 84 Q114 88 124 84"/>
    <path d="M14 98 Q40 90 80 96 Q120 102 146 94"/><path d="M40 108 Q46 104 52 108 M96 110 Q100 106 104 110"/>`);
  I.old_library = W(`${ground}
    <path d="M56 104 V40 Q56 16 80 16 Q104 16 104 40 V104"/><path d="M80 16 V70 M56 48 H104"/>
    <path class="a" stroke="none" d="M57 49 H79 V70 H57 Z M81 49 H103 V70 H81 Z" opacity=".35"/>
    <path d="M14 104 V30 H44 V104 M14 50 H44 M14 72 H44 M14 90 H44"/><path d="M19 50 V38 M24 50 V40 M30 50 V36 M36 50 V39 M20 72 V60 M27 72 V62 M34 72 V59 M40 72 V61"/>
    <path d="M116 104 V30 H146 V104 M116 50 H146 M116 72 H146 M116 90 H146"/><path d="M122 50 V38 M128 50 V40 M134 50 V36 M141 50 V39"/>
    <path d="M110 104 L124 36 M120 104 L134 36 M112 94 H122 M115 80 H125 M118 66 H128 M121 52 H131"/>`);
  I.night_market = W(`${ground}
    <path d="M14 22 Q50 40 80 24 Q110 40 146 22"/>
    ${[30,52,72,92,112,132].map((x,i)=>{const y=[29,33,28,30,34,28][i];return `<path d="M${x} ${y} V${y+4}"/><path class="a" stroke="none" d="M${x-4} ${y+4} H${x+4} Q${x+5} ${y+12} ${x} ${y+13} Q${x-5} ${y+12} ${x-4} ${y+4} Z"/>`}).join("")}
    <path d="M18 104 V66 M62 104 V66"/><path d="M14 66 L22 56 H58 L66 66 Z"/><path d="M14 66 Q20 72 26 66 Q32 72 38 66 Q44 72 50 66 Q56 72 62 66"/><path d="M22 84 H58"/>
    <path d="M98 104 V66 M142 104 V66"/><path d="M94 66 L102 56 H138 L146 66 Z"/><path d="M94 66 Q100 72 106 66 Q112 72 118 66 Q124 72 130 66 Q136 72 142 66"/><path d="M102 84 H138"/>
    <path d="M78 76 Q74 70 78 64 M84 76 Q80 70 84 64" opacity=".6"/><path d="M72 84 H90 L86 96 H76 Z"/>`);
  I.rooftop_bar = W(`<path d="M14 72 H146"/>
    <path d="M14 72 V50 H24 V40 H34 V72 M40 72 V30 H54 V72 M60 72 V46 H70 V72 M100 72 V36 H112 V72 M118 72 V52 H132 V44 H140 V72"/>
    <path class="a" stroke="none" d="M74 72 A12 12 0 0 1 98 72 Z"/>
    <path d="M14 82 H146 M14 82 V104 M146 82 V104 M34 82 V104 M54 82 V104 M74 82 V104 M94 82 V104 M114 82 V104 M134 82 V104"/>
    <path d="M78 82 L70 64 H94 L86 82"/><path d="M82 82 V78" stroke="none"/><path d="M90 66 L98 56"/><circle class="a" cx="72" cy="66" r="3" stroke="none"/>`);
  I.garden_rain = W(`${ground}
    <path d="M44 34 Q44 20 58 22 Q64 10 78 16 Q92 10 96 24 Q110 24 108 36 Z"/>
    <path d="M56 44 l-2 6 M70 44 l-2 6 M84 44 l-2 6 M98 44 l-2 6 M62 56 l-2 6 M90 56 l-2 6"/>
    <path d="M30 104 V76"/><circle class="a" cx="30" cy="72" r="6" stroke="none"/><path d="M30 88 Q22 84 22 78 M30 92 Q38 88 38 82"/>
    <path d="M56 104 V82"/><path d="M50 82 Q56 70 62 82 Q56 88 50 82"/>
    <path d="M120 104 V74"/><circle class="a" cx="120" cy="70" r="5" stroke="none"/><path d="M120 90 Q128 86 130 80"/>
    <path d="M76 100 Q92 94 108 100 Q92 106 76 100"/><path d="M138 104 Q138 92 146 88"/>`);
  I.desert_road = W(`<path d="M14 64 H146"/>
    <path d="M72 64 L30 112 M88 64 L130 112"/><path d="M80 70 V74 M80 82 V88 M80 96 V104" stroke-width="2"/>
    <circle class="a" cx="118" cy="36" r="10" stroke="none"/>
    <path d="M14 64 Q30 50 46 64 M96 64 Q104 56 112 64"/>
    <path d="M30 100 V74 Q30 70 34 70 Q38 70 38 74 V100 M30 88 H24 V80 M38 84 H44 V76"/>
    <path d="M132 96 Q136 92 140 96"/>`);
  I.quiet_church = W(`${ground}
    <path d="M50 104 V56 L80 36 L110 56 V104"/><path d="M68 44 V24 H92 V44"/><path d="M68 24 L80 10 L92 24"/>
    <path d="M70 104 V82 Q80 70 90 82 V104"/><circle cx="80" cy="56" r="8"/><path class="a" stroke="none" d="M80 49 a7 7 0 0 1 0 14 a7 7 0 0 1 0 -14 Z" opacity=".55"/>
    <path d="M58 72 V64 Q62 58 66 64 V72 Z M94 72 V64 Q98 58 102 64 V72 Z"/>
    <path d="M24 104 V88 Q24 84 28 84 Q32 84 32 88 V104 M128 104 V92 Q128 88 132 88 Q136 88 136 92 V104"/>`);

  // ---------- Q10: drinks ----------
  const tbl = `<path d="M30 106 H130"/>`;
  I.lemonade = W(`${tbl}<path d="M62 106 L56 34 H104 L98 106 Z"/><path d="M58 56 H102"/>
    <rect x="66" y="64" width="12" height="12" rx="2"/><rect x="82" y="72" width="12" height="12" rx="2"/>
    <circle class="a" cx="100" cy="36" r="13" stroke="none"/><circle cx="100" cy="36" r="13"/><path d="M100 23 V49 M87 36 H113 M91 27 L109 45 M109 27 L91 45" opacity=".6"/>
    <path d="M86 34 L94 10"/>`);
  I.gin_tonic = W(`${tbl}<path d="M58 106 V40 H102 V106 Z"/><path d="M58 50 H102"/>
    <circle cx="68" cy="88" r="1.5"/><circle cx="76" cy="74" r="1.5"/><circle cx="90" cy="92" r="1.5"/><circle cx="84" cy="64" r="1.5"/>
    <path class="a" stroke="none" d="M74 40 A12 12 0 0 1 98 40 Z"/><path d="M74 40 A12 12 0 0 1 98 40"/>
    <path d="M66 50 L58 14"/><path d="M60 22 l-6 -2 M61 28 l-6 -2 M62 34 l-6 -2 M60 22 l6 -4 M61 28 l6 -4 M62 34 l6 -4"/>`);
  I.green_tea = W(`${tbl}<path d="M44 106 H116"/><path d="M50 106 Q48 100 56 100 H104 Q112 100 110 106"/>
    <path d="M56 100 Q50 70 54 64 H106 Q110 70 104 100"/><path d="M106 72 Q120 72 118 84 Q116 92 104 92"/>
    <path class="a" stroke="none" d="M55 66 H105 Q105 72 104 74 H56 Q55 72 55 66 Z" opacity=".55"/>
    <path d="M68 56 Q64 48 68 40 M80 54 Q76 44 80 36 M92 56 Q88 48 92 40" opacity=".6"/>
    <path d="M118 38 Q132 24 142 30 Q134 46 118 38 Z"/><path d="M118 38 Q130 34 140 31"/>`);
  I.black_coffee = W(`${tbl}<path d="M54 106 V54 H102 V106 Z"/><path d="M102 64 Q122 64 120 80 Q118 94 102 94"/>
    <path class="a" stroke="none" d="M55 55 H101 V62 H55 Z" style="fill:currentColor;opacity:.75"/>
    <path d="M68 46 Q62 36 68 26 Q74 16 68 8 M84 46 Q78 36 84 26" opacity=".6"/>
    <ellipse class="a" cx="124" cy="104" rx="5" ry="3" stroke="none"/><ellipse class="a" cx="36" cy="104" rx="5" ry="3" stroke="none"/>`);
  I.whisky = W(`${tbl}<path d="M44 106 L42 56 H94 L92 106 Z"/>
    <path class="a" stroke="none" d="M43 80 H93 L92 105 H44 Z" style="fill:#A8641E;opacity:.85"/><path d="M43 80 H93"/>
    <rect x="52" y="66" width="14" height="14" rx="2" transform="rotate(-12 59 73)"/><rect x="70" y="62" width="14" height="14" rx="2" transform="rotate(10 77 69)"/>
    <path d="M104 106 V50 H136 V106 Z"/><path d="M112 50 V40 H128 V50"/><path d="M114 40 V30 H126 V40"/>
    <path class="a" stroke="none" d="M105 66 H135 V105 H105 Z" style="fill:#A8641E;opacity:.75"/><path d="M108 70 H132 V88 H108 Z" class="p"/><path d="M112 76 H128 M114 81 H126" stroke-width="1.1"/>`);
  I.hot_chocolate = W(`${tbl}<path class="a" stroke="none" d="M51 60 H105 V105 H51 Z" style="fill:#5A3220"/><path d="M50 106 V52 H106 V106 Z"/><path d="M106 62 Q126 62 124 78 Q122 92 106 92"/>
    <path d="M50 60 Q60 64 70 60 Q80 56 90 60 Q100 64 106 60" style="stroke:#5A3220"/>
    <rect class="p" x="58" y="44" width="12" height="12" rx="3"/><rect class="p" x="74" y="42" width="12" height="12" rx="3"/><rect class="p" x="88" y="46" width="12" height="12" rx="3"/>
    <path d="M70 34 Q64 26 70 18 M88 32 Q82 24 88 16" opacity=".6"/><path d="M60 80 H96 M60 90 H96" style="stroke:#8A5A3C" opacity=".6"/>`);
  I.red_wine = W(`${tbl}<path d="M60 20 H100 Q104 56 80 66 Q56 56 60 20 Z"/>
    <path class="a" stroke="none" d="M61 38 H99 Q98 58 80 64 Q62 58 61 38 Z"/><path d="M61 38 H99"/>
    <path d="M80 66 V104"/><path d="M66 106 Q80 100 94 106"/>
    <path d="M118 106 V54 Q118 44 124 40 V18 H132 V40 Q138 44 138 54 V106 Z"/><path d="M118 70 H138 V92 H118"/>`);
  I.coconut_water = W(`${tbl}<path d="M46 76 Q46 46 80 44 Q114 46 114 76 Q114 106 80 106 Q46 106 46 76 Z"/>
    <path d="M54 56 Q80 66 106 56"/><path class="p" d="M60 54 Q80 46 100 54 Q80 62 60 54 Z"/>
    <path d="M86 56 L104 14 H112"/><path class="a" stroke="none" d="M104 14 H112 V18 H103 Z"/>
    <path d="M56 84 Q60 92 66 96 M100 90 Q96 96 90 98" opacity=".5"/>
    <path d="M118 52 Q130 40 144 46 M120 58 Q136 52 146 60" opacity=".7"/>`);

  // ---------- Q13: style (two garments per frame) ----------
  I.structured_sharp = W(`
    <path d="M18 112 V56 Q18 46 28 42 L44 36 L60 42 Q70 46 70 56 V112 Z"/>
    <path d="M30 42 L40 74 L44 66 L48 74 L58 42"/><path d="M44 66 V112"/>
    <path d="M38 40 L44 36 L50 40 L47 46 H41 Z"/><path class="a" stroke="none" d="M41 46 H47 L49 64 L44 70 L39 64 Z"/><path d="M41 46 H47 L49 64 L44 70 L39 64 Z"/>
    <circle cx="48" cy="84" r="1.5" fill="currentColor"/><circle cx="48" cy="96" r="1.5" fill="currentColor"/><path d="M58 70 H66" opacity=".6"/>
    <path d="M104 30 Q104 24 108 22 M132 30 Q132 24 128 22"/>
    <path d="M104 30 Q118 40 132 30 L130 58 Q140 84 148 112 Q118 118 88 112 Q96 84 106 58 Z"/>
    <path d="M106 58 Q118 62 130 58"/><path class="a" stroke="none" d="M106 58 Q118 62 130 58 L131 63 Q118 67 105 63 Z"/>
    <path d="M110 74 Q106 94 100 110 M126 74 Q130 94 136 110" opacity=".45"/>`);
  I.soft_fluid = W(`
    <path d="M30 36 Q30 18 48 18 Q66 18 66 36"/><path d="M30 36 Q48 46 66 36"/>
    <path d="M30 36 Q18 40 16 56 L12 100 H24 L26 64 V112 H70 V64 L72 100 H84 L80 56 Q78 40 66 36"/>
    <path d="M36 80 H60 V96 H36 Z"/><path d="M44 46 L42 62 M52 46 L54 62"/><path d="M26 108 H70" opacity=".6"/>
    <path class="a" stroke="none" d="M94 52 Q120 44 148 52 L146 112 Q120 104 92 112 Z" opacity=".55"/>
    <path d="M94 52 Q120 44 148 52 L146 112 Q120 104 92 112 Z"/>
    <path d="M94 52 Q90 60 96 66 Q122 58 146 66 Q152 58 148 52"/>
    <path d="M100 76 Q120 70 142 78 M98 92 Q120 86 144 94" opacity=".5"/><path d="M96 112 v4 M104 111 v4 M112 110 v4 M120 109 v4 M128 110 v4 M136 111 v4 M144 112 v4"/>`);
  I.relaxed_lived_in = W(`
    <path d="M18 24 H58 L62 112 H44 L38 52 L32 112 H14 Z"/><path d="M18 32 H58"/><path d="M38 32 V52"/>
    <path d="M22 32 Q24 42 32 42 M54 32 Q52 42 44 42"/><path d="M20 96 Q26 100 32 96 M44 96 Q50 100 58 96" opacity=".5"/>
    <path d="M26 104 l2 -3 M50 104 l2 -3" opacity=".6"/><circle class="a" cx="38" cy="28" r="2" stroke="none"/>
    <path class="a" stroke="none" d="M80 28 L104 24 L128 24 L152 28 L156 58 L132 58 L130 108 H82 L80 58 L76 58 Z" style="fill:#2E4A6B;opacity:.88"/>
    <path d="M100 24 L80 28 L76 58 H86 V108 H128 V58 H156 L152 28 L132 24"/>
    <path d="M86 58 L84 34 M128 58 L130 34" opacity=".7"/>
    <path class="p" d="M100 24 L114 66 V108 H106 V68 L94 26 Z M132 24 L114 66 L120 66 L136 26 Z" />
    <path d="M100 24 L114 66 V108 M132 24 L114 66 M94 26 L106 68 V108 M136 26 L120 66"/>
    <path d="M82 108 H130"/><path d="M88 100 V108 M126 100 V108" opacity=".6"/>
    ${[36,46,56].map(y=>`<path d="M80 ${y} h3 M90 ${y} h3 M140 ${y} h3 M150 ${y} h3" style="stroke:#FBF8F2" stroke-width="1.2"/>`).join("")}
    ${[74,84,94].map(y=>`<path d="M92 ${y} h3 M122 ${y} h3" style="stroke:#FBF8F2" stroke-width="1.2"/>`).join("")}`);
  I.bold_mixed = W(`
    <path class="a" stroke="none" d="M10 112 V50 Q10 38 24 34 L40 28 L56 34 Q70 38 70 50 V112 Z" style="fill:#2A2420"/>
    <path d="M10 112 V50 Q10 38 24 34 L40 28 L56 34 Q70 38 70 50 V112 Z"/>
    <path d="M24 34 L34 56 L28 60 M56 34 L46 56 L52 60" style="stroke:#FBF8F2"/>
    <path d="M44 40 L36 110" style="stroke:#B8913A" stroke-width="2"/>
    <path d="M10 98 H70" style="stroke:#FBF8F2"/><path class="a" stroke="none" d="M36 95 h8 v6 h-8 Z"/>
    <path d="M14 62 h10 M56 62 h10" style="stroke:#FBF8F2" opacity=".7"/>
    <circle class="a" cx="18" cy="44" r="1.6" stroke="none"/><circle class="a" cx="62" cy="44" r="1.6" stroke="none"/>
    <path d="M104 30 Q96 26 92 34 Q94 42 104 40"/><path d="M136 30 Q144 26 148 34 Q146 42 136 40"/>
    <path class="a" stroke="none" d="M104 28 Q120 34 136 28 L134 56 H106 Z" style="fill:#CF7C93"/><path d="M104 28 Q120 34 136 28 L134 56 H106 Z"/>
    <path d="M106 56 Q100 70 96 74 Q120 80 144 74 Q140 70 134 56"/><path d="M96 74 Q92 88 88 92 Q120 100 152 92 Q148 88 144 74"/><path d="M88 92 Q84 104 82 110 Q120 118 158 110 Q156 104 152 92"/>
    <path d="M96 74 q4 4 8 0 q4 4 8 0 q4 4 8 0 q4 4 8 0 q4 4 8 0 q4 4 8 0 M88 92 q4 4 8 0 q4 4 8 0 q4 4 8 0 q4 4 8 0 q4 4 8 0 q4 4 8 0 q4 4 8 0 q4 4 8 0" opacity=".6"/>
    ${[[112,66],[126,64],[104,84],[122,86],[140,84],[100,102],[118,104],[138,102]].map(([x,y])=>`<path class="a" stroke="none" d="M${x} ${y+2} l-2.6 -2.6 a1.6 1.6 0 0 1 2.6 -2 a1.6 1.6 0 0 1 2.6 2 Z" style="fill:#7A2E3A"/>`).join("")}`);

  // ---------- accord motifs (24x24, coloured on results) ----------
  const M = (body) => `<g fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${body}</g>`;
  I.motif = {
    citrus: M(`<circle cx="12" cy="12" r="9"/><path d="M12 3 V21 M3 12 H21 M5.6 5.6 L18.4 18.4 M18.4 5.6 L5.6 18.4" opacity=".7"/>`),
    herbal: M(`<path d="M12 22 V4"/><path d="M12 8 Q6 6 5 2 Q10 3 12 8 M12 8 Q18 6 19 2 Q14 3 12 8 M12 14 Q6 12 4 8 Q10 9 12 14 M12 14 Q18 12 20 8 Q14 9 12 14"/>`),
    green: M(`<path d="M4 20 Q4 6 20 4 Q20 20 4 20 Z"/><path d="M4 20 L16 8"/>`),
    clean: M(`<circle cx="9" cy="14" r="6"/><circle cx="17" cy="7" r="3.5"/><circle cx="18" cy="17" r="2"/>`),
    aquatic: M(`<path d="M2 9 Q6 5 10 9 Q14 13 18 9 Q20 7 22 8 M2 16 Q6 12 10 16 Q14 20 18 16 Q20 14 22 15"/>`),
    floral: M(`<circle cx="12" cy="12" r="2.5"/><path d="M12 9.5 Q9 2 12 2 Q15 2 12 9.5 M14.5 12 Q22 9 22 12 Q22 15 14.5 12 M12 14.5 Q15 22 12 22 Q9 22 12 14.5 M9.5 12 Q2 15 2 12 Q2 9 9.5 12"/>`),
    fruity: M(`<circle cx="8" cy="17" r="4.5"/><circle cx="17" cy="16" r="4.5"/><path d="M8 12.5 Q10 5 15 3 M17 11.5 Q16 6 15 3"/>`),
    sweet: M(`<path d="M12 3 Q19 12 19 15 A7 7 0 0 1 5 15 Q5 12 12 3 Z"/><path d="M9 15 A3 3 0 0 0 12 18" opacity=".7"/>`),
    woody: M(`<path d="M12 2 L4 14 H9 L5 20 H19 L15 14 H20 Z"/><path d="M12 20 V23"/>`),
    spicy: M(`<path d="M12 2 L14 9 L21 7 L16 12 L21 17 L14 15 L12 22 L10 15 L3 17 L8 12 L3 7 L10 9 Z"/><circle cx="12" cy="12" r="1.5"/>`),
    smoky: M(`<path d="M8 22 Q4 17 8 12 Q12 7 8 2 M15 22 Q11 17 15 12 Q19 7 15 2"/>`),
    earthy: M(`<path d="M4 12 Q12 2 20 12 Z"/><path d="M10 12 V20 Q12 22 14 20 V12"/><circle cx="9" cy="9" r="1"/><circle cx="14" cy="8" r="1"/>`)
  };

  // ---------- slider poles (smaller) ----------
  const S = body => W(body, "0 0 80 80");
  I.p_sweet = S(`<path d="M24 34 H56 V66 Q56 72 50 72 H30 Q24 72 24 66 Z"/><path d="M22 28 H58 V34 H22 Z"/><path class="a" stroke="none" d="M25 46 H55 V66 Q55 71 50 71 H30 Q25 71 25 66 Z"/><path d="M40 28 V12"/><path d="M34 14 H46 M33 19 H47 M35 24 H45"/>`);
  I.p_dry = S(`<path d="M26 12 H54 Q58 38 40 46 Q22 38 26 12 Z"/><path class="a" stroke="none" d="M27 26 H53 Q52 40 40 44 Q28 40 27 26 Z" style="fill:#7a2e3a"/><path d="M40 46 V68 M30 70 Q40 66 50 70"/>`);
  I.p_airy = S(`<path d="M16 12 H64"/><path d="M20 12 Q28 40 18 70 M30 12 Q36 40 28 70 M50 12 Q44 40 52 70 M60 12 Q52 40 62 70"/><path class="a" stroke="none" d="M36 30 l4 -4 l4 4 l-4 4 Z" opacity=".6"/>`);
  I.p_dense = S(`${[14,22,30,38,46,54,62].map((y,i)=>`<path class="a" stroke="none" d="M${12+i%2*2} ${y} H${68-i%2*2} V${y+7} H${12+i%2*2} Z" style="fill:${["#5A3220","#7A2E3A","#1F3A2E","#6B4F2A","#5A3220","#7A2E3A","#1F3A2E"][i]};opacity:.9"/><path d="M${12+i%2*2} ${y} H${68-i%2*2} V${y+7} H${12+i%2*2} Z"/>`).join("")}
    <path d="M12 70 H68"/>`);
  I.p_soft = S(`<circle class="a" cx="36" cy="40" r="22" stroke="none" style="fill:#EAD3C2"/><circle cx="36" cy="40" r="22"/>
    <path d="M16 32 Q36 46 56 30 M15 40 Q36 54 57 38 M17 48 Q36 60 56 46 M22 56 Q36 64 50 56 M20 24 Q36 36 52 22 M26 19 Q36 26 46 18"/>
    <path d="M24 20 Q20 40 24 60 M32 18 Q28 40 32 62 M42 18 Q46 40 42 62 M50 22 Q54 40 50 58" opacity=".55"/>
    <path d="M56 50 Q66 54 64 62 Q62 70 70 72 Q76 74 74 78"/><path d="M58 46 Q70 50 68 58" opacity=".6"/>`);
  I.p_sharp = S(`<path d="M20 32 L30 18 H50 L60 32 L40 66 Z"/><path d="M20 32 H60 M30 18 L36 32 L40 66 M50 18 L44 32 L40 66 M36 32 L40 18 L44 32"/><path class="a" stroke="none" d="M30 18 L36 32 H20 Z" opacity=".6"/>`);
  I.p_smooth = S(`<path d="M40 14 Q60 14 62 42 Q62 68 40 68 Q18 68 18 42 Q20 14 40 14 Z"/><path d="M28 30 Q40 40 36 56" opacity=".4"/><path class="a" stroke="none" d="M30 22 Q36 18 40 20 Q34 24 30 30 Z" opacity=".7"/>`);
  I.p_smoky = S(`<path d="M16 70 L64 60 M16 60 L64 70"/><path class="a" stroke="none" d="M28 62 Q26 48 36 42 Q36 52 40 50 Q40 38 48 32 Q48 46 54 52 Q54 62 48 64 Z"/><path d="M38 28 Q32 20 38 12 M48 24 Q44 18 48 10" opacity=".6"/>`);
  I.p_harmony = S(`<path d="M8 24 H72 M8 32 H72 M8 40 H72 M8 48 H72 M8 56 H72" opacity=".45"/>
    <path d="M40 72 Q34 74 34 68 Q34 64 39 65 M40 72 Q44 70 43 60 L37 8 Q44 12 44 20 Q44 30 32 40 Q24 48 30 56 Q36 62 46 58 Q52 54 48 46 Q44 40 38 44 Q34 48 38 52" stroke-width="2.4"/>
    <circle class="a" cx="37" cy="69" r="3.2" stroke="none"/>`);
  I.p_tension = S(`<path d="M8 24 H72 M8 32 H72 M8 40 H72 M8 48 H72 M8 56 H72" opacity=".45"/>
    <path class="a" stroke="none" d="M18 18 H25 V62 H18 Z" style="fill:#1F3A2E"/><path d="M29 18 V62" stroke-width="2"/>
    <path d="M30 40 L36 34 Q36 22 44 20 Q54 18 54 28 Q54 36 46 36 Q42 36 42 32 M30 40 L36 46 Q36 58 44 60 Q54 62 54 52 Q54 44 46 44 Q42 44 42 48" stroke-width="2.2"/>
    <text x="60" y="34" font-family="Georgia,serif" font-size="13" font-weight="700" fill="#B8913A" stroke="none">7</text><text x="60" y="52" font-family="Georgia,serif" font-size="13" font-weight="700" fill="#B8913A" stroke="none">8</text>`);
  I.p_familiar = S(`<path d="M14 40 L40 16 L66 40"/><path d="M20 36 V68 H60 V36"/><path d="M34 68 V50 H46 V68"/><path class="a" stroke="none" d="M26 44 H34 V52 H26 Z M46 44 H54 V52 H46 Z"/><path d="M52 24 V14 H58 V30"/>`);
  I.p_strange = S(`<circle cx="40" cy="40" r="30"/><circle cx="40" cy="40" r="25" stroke-dasharray="1 3"/>
    <path class="a" stroke="none" d="M40 16 L45 40 L35 40 Z" style="fill:#7A2E3A"/><path class="a" stroke="none" d="M40 64 L45 40 L35 40 Z"/>
    <path d="M40 16 L45 40 L40 64 L35 40 Z"/><circle cx="40" cy="40" r="2.2" fill="currentColor"/>
    <path d="M27 27 L31 31 M53 27 L49 31 M27 53 L31 49 M53 53 L49 49" opacity=".6"/>
    ${[["N",40,9],["S",40,77],["W",4.5,43],["E",75.5,43]].map(([t,x,y])=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="Georgia,serif" font-size="9" font-weight="700" fill="currentColor" stroke="none">${t}</text>`).join("")}`, );

  // Front page emblem (neutral, no perfume hint)
  I.emblem = W(`<circle cx="80" cy="60" r="44"/><circle cx="80" cy="60" r="38" stroke-dasharray="1 4"/>
    <path d="M80 30 Q66 44 70 60 Q74 76 80 90 Q86 76 90 60 Q94 44 80 30 Z"/><path class="a" stroke="none" d="M80 38 Q71 50 74 60 Q77 72 80 82 Q83 72 86 60 Q89 50 80 38 Z" opacity=".55"/>
    <path d="M36 60 H22 M124 60 H138 M80 16 V8 M80 104 V112"/>`);

  // ---------- Q8: endings, a pair of characters acting it out ----------
  // fig(x, sex, mouth, extra): head r9 at (x,40); "m" short hair + trousers, "f" long hair + dress
  const fig = (x, sex, mouth, arms, extra = "") => {
    const hair = sex === "f"
      ? `<path d="M${x-10} 44 Q${x-12} 28 ${x} 28 Q${x+12} 28 ${x+10} 44 Q${x+12} 54 ${x+8} 58 M${x-10} 44 Q${x-12} 54 ${x-8} 58"/><path class="a" stroke="none" d="M${x-9} 36 Q${x} 26 ${x+9} 36 Q${x} 32 ${x-9} 36 Z" style="fill:#7A2E3A"/>`
      : `<path d="M${x-9} 38 Q${x-8} 28 ${x} 29 Q${x+9} 28 ${x+9} 38 Q${x+2} 33 ${x-9} 38 Z" class="a" stroke="none" style="fill:#1F3A2E"/>`;
    const body = sex === "f"
      ? `<path d="M${x-6} 52 L${x-16} 98 H${x+16} L${x+6} 52 Z" class="p"/><path d="M${x-6} 52 L${x-16} 98 H${x+16} L${x+6} 52"/><path d="M${x-5} 98 V110 M${x+5} 98 V110"/>`
      : `<path d="M${x-9} 52 H${x+9} V82 H${x-9} Z" class="p"/><path d="M${x-9} 52 H${x+9} V82 H${x-9} Z"/><path d="M${x-7} 82 L${x-7} 110 M${x+7} 82 L${x+7} 110 M${x} 82 V96"/>`;
    return `${body}<circle class="p" cx="${x}" cy="40" r="9"/>${hair}<circle cx="${x-3}" cy="40" r="1.1" fill="currentColor"/><circle cx="${x+3}" cy="40" r="1.1" fill="currentColor"/><path d="${mouth(x)}"/>${arms}${extra}`;
  };
  const smile = x => `M${x-3} 44 Q${x} 47 ${x+3} 44`, flat = x => `M${x-2.5} 45 H${x+2.5}`, oh = x => `M${x} 46 m-2 0 a2 2.4 0 1 0 4 0 a2 2.4 0 1 0 -4 0`;
  I.end_resolved = W(`<path d="M10 110 H150"/>
    ${fig(58,"m",smile,`<path d="M50 56 L44 76 M66 56 L80 72"/>`)}${fig(102,"f",smile,`<path d="M96 56 L80 72 M108 56 L116 76"/>`)}
    <circle class="a" cx="80" cy="72" r="2.5" stroke="none"/>
    <path class="a" stroke="none" d="M80 22 l-6 -6 a3.6 3.6 0 0 1 6 -4.6 a3.6 3.6 0 0 1 6 4.6 Z" style="fill:#C2473A"/>`);
  I.end_bittersweet = W(`<path d="M10 110 H150"/>
    ${fig(54,"m",smile,`<path d="M46 56 L40 78 M62 56 L72 40 L70 30 M72 40 L78 34"/>`)}${fig(108,"f",smile,`<path d="M102 56 L94 78 M114 56 L118 78"/>`,`<path class="a" stroke="none" d="M112 45 q-1.6 3 0 4 q1.6 -1 0 -4 Z" style="fill:#2F78A8"/>`)}
    <path d="M80 30 Q86 40 80 50 Q76 58 82 66" stroke-dasharray="2 3" opacity=".6"/>
    <path class="a" stroke="none" d="M132 20 q6 4 2 10 q-6 -2 -2 -10 Z" style="fill:#CF7C93"/><path class="a" stroke="none" d="M124 34 q5 3 1 8 q-5 -2 -1 -8 Z" style="fill:#CF7C93"/>`);
  I.end_open = W(`<path d="M10 110 H96"/><path d="M96 110 L150 70" opacity=".6"/><path d="M104 110 L150 82" opacity=".6"/>
    ${fig(36,"m",flat,`<path d="M28 56 L22 76 M44 56 L56 66 L60 56"/>`)}${fig(74,"f",smile,`<path d="M68 56 L62 76 M80 56 L94 64"/>`)}
    <path d="M118 104 V30 H146 V96"/><path d="M118 30 L132 38 V110 L118 104" class="p"/><path d="M118 30 L132 38 V110 L118 104"/><circle cx="128" cy="74" r="1.5" fill="currentColor"/>
    <path class="a" stroke="none" d="M133 38 L146 30 V96 L133 110 Z" opacity=".45"/>
    <path d="M56 26 q0 -6 5 -6 q5 0 5 5 q0 4 -5 5 v3 M61 37 v.5" stroke-width="1.8"/>`);
  I.end_twist = W(`<path d="M10 110 H150"/>
    ${fig(54,"m",oh,`<path d="M46 56 L36 40 M62 56 L72 40"/>`)}${fig(106,"f",oh,`<path d="M100 56 L90 40 M112 56 L122 40"/>`)}
    <path class="a" stroke="none" d="M78 12 h6 l-1 16 h-4 Z M78.5 32 h5 v5 h-5 Z" style="fill:#7A2E3A"/>
    <path d="M30 22 l4 4 M26 32 h5 M128 22 l-4 4 M132 32 h-5"/>
    <path d="M80 60 Q72 66 80 72 Q88 78 80 84 Q74 88 78 94" opacity=".6"/>`);

  // ---------- front page: the scent pyramid (top / heart / base) ----------
  I.pyramid = `<svg viewBox="-12 0 392 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Top, heart and base notes">
    <g fill="none" stroke="#1F3A2E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M176 40 Q168 30 176 20 Q184 10 176 2 M188 42 Q182 34 188 26" opacity=".55"/>
      <path d="M180 48 L148 104 H212 Z" fill="#F2DC8C"/>
      <path d="M148 104 L112 168 H248 L212 104 Z" fill="#EDB9C4"/>
      <path d="M112 168 L74 236 H286 L248 168 Z" fill="#C9A27A"/>
      <path d="M180 48 L74 236 H286 Z" stroke-width="2.2"/>
    </g>
    <g font-family="Fraunces, Georgia, serif" font-weight="700" text-anchor="middle" fill="#1F3A2E" stroke="none" style="font-variation-settings:'SOFT' 100,'WONK' 1">
      <text x="180" y="95" font-size="15">Top</text>
      <text x="180" y="143" font-size="20">Heart</text>
      <text x="180" y="210" font-size="24">Base</text>
    </g>
    <g font-family="Jost, system-ui, sans-serif" font-size="11" letter-spacing="1.2" fill="#4B5F55" stroke="none">
      <path d="M200 90 H246" stroke="#B8913A" fill="none"/><circle cx="200" cy="90" r="2" fill="#B8913A"/><text x="252" y="94">how you arrive</text>
      <path d="M224 138 H266" stroke="#B8913A" fill="none"/><circle cx="224" cy="138" r="2" fill="#B8913A"/><text x="272" y="142">who you are</text>
      <path d="M262 204 H286" stroke="#B8913A" fill="none"/><circle cx="262" cy="204" r="2" fill="#B8913A"/><text x="292" y="208">what lingers</text>
    </g>
    <path d="M60 254 H300" stroke="#B8913A" stroke-width="1"/><path d="M180 248 l6 6 l-6 6 l-6 -6 Z" fill="#FAF8F3" stroke="#B8913A"/>
  </svg>`;

  window.ILLUS = I;
})();
