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
  I.protagonist = bust(`<path d="M62 46 Q62 28 80 30 Q96 30 98 44 Q90 36 78 40 Q68 42 62 46"/>
    <path d="M56 84 Q80 96 104 84"/><path d="M98 86 L110 112"/><path class="a" stroke="none" d="M80 92 l3 6 l6.5 .8 l-4.8 4.5 l1.2 6.5 l-5.9 -3.1 l-5.9 3.1 l1.2 -6.5 l-4.8 -4.5 l6.5 -.8 Z"/>`, "M74 56 Q80 61 86 56");
  I.confidant = bust(`<path d="M62 50 Q60 30 80 30 Q100 30 98 50 Q96 40 84 38 Q70 38 62 50"/>
    <path d="M62 52 Q58 62 60 72"/><path d="M98 52 Q102 62 100 72"/>
    <path d="M70 100 H90 Q92 112 80 112 Q68 112 70 100"/><path d="M90 102 Q96 102 94 108"/><path d="M76 96 Q74 92 78 88 M84 96 Q82 92 86 88" opacity=".6"/>`,
    "M76 57 Q80 59 84 57", `<path d="M71 47 Q74 45 77 47"/><path d="M83 47 Q86 45 89 47"/>`);
  I.wildcard = bust(`<path d="M62 44 L60 30 L68 38 L70 26 L76 36 L80 24 L84 36 L90 26 L92 38 L100 30 L98 44"/>
    <path class="a" stroke="none" d="M66 42 H94 Q96 50 88 52 Q82 52 80 48 Q78 52 72 52 Q64 50 66 42 Z" opacity=".85"/>
    <path d="M100 56 l3 6 l-3 0 l3 6"/><path d="M64 88 l6 6 l6 -6 l6 6 l6 -6 l6 6"/>`, "M74 57 Q80 60 86 55");
  I.mentor = bust(`<path d="M62 44 Q64 30 80 30 Q96 30 98 44"/><circle cx="74" cy="47" r="5"/><circle cx="86" cy="47" r="5"/><path d="M79 47 H81"/>
    <path d="M66 58 Q68 72 80 74 Q92 72 94 58"/><path d="M76 62 H84"/>
    <path d="M64 100 L80 96 L96 100 V112 L80 108 L64 112 Z"/><path d="M80 96 V108"/>`, "M76 64 H84");
  I.antagonist = bust(`<path d="M60 34 H100"/><path d="M66 34 V12 H94 V34"/><path class="a" stroke="none" d="M66 28 H94 V33 H66 Z"/>
    <circle cx="86" cy="47" r="4.5"/><path d="M90 50 Q94 62 92 72"/>
    <path d="M58 84 L66 100 L74 86"/><path d="M102 84 L94 100 L86 86"/>
    <path d="M70 41 L77 44 M83 44 L90 41"/>`, "M74 57 Q82 60 86 54");

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
  I.whisky = W(`${tbl}<path d="M52 106 L50 50 H110 L108 106 Z"/>
    <path class="a" stroke="none" d="M51 76 H109 L108 105 H52 Z" opacity=".75"/><path d="M51 76 H109"/>
    <rect x="62" y="62" width="16" height="16" rx="2" transform="rotate(-12 70 70)"/><rect x="82" y="58" width="16" height="16" rx="2" transform="rotate(10 90 66)"/>
    <path d="M118 106 V60 Q118 50 124 46 V34 H134 V46 Q140 50 140 60 V106 Z"/><path d="M118 78 H140 M118 94 H140"/>`);
  I.hot_chocolate = W(`${tbl}<path d="M50 106 V52 H106 V106 Z"/><path d="M106 62 Q126 62 124 78 Q122 92 106 92"/>
    <rect class="a" x="58" y="42" width="12" height="12" rx="3" stroke="none"/><rect x="58" y="42" width="12" height="12" rx="3"/>
    <rect x="74" y="40" width="12" height="12" rx="3"/><rect class="a" x="88" y="44" width="12" height="12" rx="3" stroke="none"/><rect x="88" y="44" width="12" height="12" rx="3"/>
    <path d="M70 32 Q64 24 70 16 M88 30 Q82 22 88 14" opacity=".6"/><path d="M60 72 H96 M60 82 H96" opacity=".4"/>`);
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
    <path d="M22 24 H62 L66 112 H48 L42 52 L36 112 H18 Z"/><path d="M22 32 H62"/><path d="M42 32 V52"/>
    <path d="M26 32 Q28 42 36 42 M58 32 Q56 42 48 42"/><path d="M24 96 Q30 100 36 96 M48 96 Q54 100 62 96" opacity=".5"/>
    <path d="M30 104 l2 -3 M54 104 l2 -3" opacity=".6"/><circle class="a" cx="42" cy="28" r="2" stroke="none"/>
    <path d="M96 26 L120 22 L144 26 L156 54 L144 58 L140 44 V112 H100 V44 L96 58 L84 54 Z"/>
    <path d="M110 24 L128 112"/><path d="M130 24 L112 74"/><path d="M110 24 L104 112" opacity=".0"/>
    <path class="a" stroke="none" d="M110 24 L116 24 L134 112 H128 Z" opacity=".6"/>
    <path d="M104 60 h2 M104 70 h2 M104 80 h2 M104 90 h2 M104 100 h2 M136 60 h2 M136 70 h2 M136 80 h2 M136 90 h2 M136 100 h2" stroke-width="1.2"/>
    <path d="M100 84 H112 V96 H100 Z"/>`);
  I.bold_mixed = W(`
    <path d="M12 112 V50 Q12 38 26 34 L44 28 L62 34 Q76 38 76 50 V112 Z"/>
    <path d="M12 50 L4 96 H14 M76 50 L84 96 H74"/><path d="M36 30 Q44 38 52 30"/>
    <path d="M12 104 H76" stroke-width="3"/>
    <path class="a" stroke="none" d="M28 52 L44 46 L60 52 L56 76 L44 84 L32 76 Z"/><path d="M28 52 L44 46 L60 52 L56 76 L44 84 L32 76 Z"/>
    <path d="M38 62 L44 58 L50 62 L44 72 Z"/>
    <path d="M18 92 l8 -6 M18 100 l14 -10 M62 92 l8 -6" opacity=".6"/>
    <path d="M96 100 Q96 88 106 86 L122 84 Q132 82 136 90 L150 94 Q156 96 156 104 V108 H96 Z"/><path d="M96 108 H156" stroke-width="3"/>
    <path d="M106 92 l4 4 M114 90 l4 4 M122 88 l4 4"/><path class="a" stroke="none" d="M136 96 h14 v6 h-14 Z"/>
    <path d="M108 66 V48 H140 V66 Z"/><path d="M114 48 Q114 36 124 36 Q134 36 134 48"/><path class="a" stroke="none" d="M120 52 h8 v6 h-8 Z"/>`);

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
  I.p_dense = S(`<path d="M14 12 H66"/><path d="M18 12 Q16 40 14 70 H66 Q64 40 62 12"/><path d="M26 12 Q28 40 24 70 M36 12 Q38 40 34 70 M46 12 Q44 40 46 70 M56 12 Q54 40 56 70"/><path class="a" stroke="none" d="M15 62 H65 V70 H14 Z" opacity=".8"/>`);
  I.p_soft = S(`<circle cx="40" cy="42" r="22"/><path d="M22 32 Q40 46 58 30 M20 44 Q40 58 60 42 M26 56 Q40 64 54 56"/><path d="M58 52 Q70 62 66 72"/><circle class="a" cx="66" cy="72" r="2.5" stroke="none"/>`);
  I.p_sharp = S(`<path d="M20 32 L30 18 H50 L60 32 L40 66 Z"/><path d="M20 32 H60 M30 18 L36 32 L40 66 M50 18 L44 32 L40 66 M36 32 L40 18 L44 32"/><path class="a" stroke="none" d="M30 18 L36 32 H20 Z" opacity=".6"/>`);
  I.p_smooth = S(`<path d="M40 14 Q60 14 62 42 Q62 68 40 68 Q18 68 18 42 Q20 14 40 14 Z"/><path d="M28 30 Q40 40 36 56" opacity=".4"/><path class="a" stroke="none" d="M30 22 Q36 18 40 20 Q34 24 30 30 Z" opacity=".7"/>`);
  I.p_smoky = S(`<path d="M16 70 L64 60 M16 60 L64 70"/><path class="a" stroke="none" d="M28 62 Q26 48 36 42 Q36 52 40 50 Q40 38 48 32 Q48 46 54 52 Q54 62 48 64 Z"/><path d="M38 28 Q32 20 38 12 M48 24 Q44 18 48 10" opacity=".6"/>`);
  I.p_harmony = S(`<circle cx="28" cy="56" r="7"/><circle cx="56" cy="50" r="7"/><path d="M35 56 V20 L63 14 V50"/><path d="M35 28 L63 22"/><path class="a" stroke="none" d="M21 56 a7 7 0 0 0 14 0 a7 7 0 0 0 -14 0 Z M49 50 a7 7 0 0 0 14 0 a7 7 0 0 0 -14 0 Z"/>`);
  I.p_tension = S(`<path class="a" stroke="none" d="M44 8 L22 44 H38 L32 72 L58 32 H42 Z"/><path d="M44 8 L22 44 H38 L32 72 L58 32 H42 Z"/>`);
  I.p_familiar = S(`<path d="M14 40 L40 16 L66 40"/><path d="M20 36 V68 H60 V36"/><path d="M34 68 V50 H46 V68"/><path class="a" stroke="none" d="M26 44 H34 V52 H26 Z M46 44 H54 V52 H46 Z"/><path d="M52 24 V14 H58 V30"/>`);
  I.p_strange = S(`<circle cx="40" cy="40" r="26"/><path class="a" stroke="none" d="M40 18 L46 40 L40 62 L34 40 Z" opacity=".85"/><path d="M40 18 L46 40 L40 62 L34 40 Z"/><circle cx="40" cy="40" r="2.5" fill="currentColor"/><path d="M40 10 V14 M40 66 V70 M10 40 H14 M66 40 H70"/>`);

  // Front page emblem (neutral, no perfume hint)
  I.emblem = W(`<circle cx="80" cy="60" r="44"/><circle cx="80" cy="60" r="38" stroke-dasharray="1 4"/>
    <path d="M80 30 Q66 44 70 60 Q74 76 80 90 Q86 76 90 60 Q94 44 80 30 Z"/><path class="a" stroke="none" d="M80 38 Q71 50 74 60 Q77 72 80 82 Q83 72 86 60 Q89 50 80 38 Z" opacity=".55"/>
    <path d="M36 60 H22 M124 60 H138 M80 16 V8 M80 104 V112"/>`);

  window.ILLUS = I;
})();
