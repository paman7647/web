/* ============================================================
   MICROLOAN IMPACTHUB — CORE APPLICATION
   ============================================================
   Interactions, data, simulators, panels, deck, kanban, etc.
   ============================================================ */
(function () {
  'use strict';

  /* ── VERIFIED CASE DATA ───────────────────────────────────── */
  const CASE = {
    revenue2024: 1520000,
    ukEurope: 84,
    usa: 10,
    australia: 4,
    unrestricted: 70,
    restricted: 30,
    repayment: 99,
    womenServed: 575000,
    dependents: 2400000,
    disbursed: 166000000,
    activeClients2022: 160000,
    yearTarget1: 3000000,
    ambition6yr: 30000000,
    costGuideline: 500000,
    costTargetPct: '10–15',
    schoolMalawi: 92,
    resilienceZambia: 97,
    selfConfidence: 98,
    targetWomen2035: 1000000,
    countries: ['Malawi', 'Zambia', 'Zimbabwe', 'South Africa']
  };

  /* ── FUNDING ENGINE DATA ──────────────────────────────────── */
  const ENGINE_CHANNELS = {
    institutional: {
      name: 'INSTITUTIONAL FOUNDATIONS',
      color: '#1E2A4A',
      rev: '$1.2M – $12M',
      ratio: '40–60%',
      fit: 'High Strategic Alignment',
      desc: 'Anchor grants from global philanthropy networks. Multi-year commitments for operational stability. Rigorous impact reporting required.',
      risk: 'Long lead times, restrictive reporting, competitive application.'
    },
    corporate: {
      name: 'CORPORATE CSR & ESG',
      color: '#2D5F3E',
      rev: '$800K – $8M',
      ratio: '30–50%',
      fit: 'High Commercial & ESG Fit',
      desc: 'Co-branded empowerment packages linked to corporate ESG goals, employee engagement, and SDG impact reporting.',
      risk: 'Dependent on corporate economic cycles and ESG trends.'
    },
    government: {
      name: 'BILATERAL & DFI GRANTS',
      color: '#C9993A',
      rev: '$500K – $5M',
      ratio: '20–40%',
      fit: 'Institutional Governance',
      desc: 'Public development finance targeting women\'s economic resilience and financial inclusion across Southern Africa.',
      risk: 'Political priorities shift. Highly restricted. Complex compliance.'
    },
    private: {
      name: 'PRIVATE HNW PHILANTHROPY',
      color: '#B85C38',
      rev: '$300K – $3M',
      ratio: '70–90%',
      fit: 'Maximum Flexibility',
      desc: 'Direct major-donor relationships delivering highly unrestricted capital with fast decision cycles and personal engagement.',
      risk: 'Relationship-dependent. Succession risk. Variable.'
    },
    digital: {
      name: 'DIGITAL COMMUNITY',
      color: '#8A8278',
      rev: '$200K – $2M',
      ratio: '90%+',
      fit: 'High Growth Potential',
      desc: 'Monthly recurring donors via digital storytelling and community engagement. Low per-donor cost at scale.',
      risk: 'High acquisition cost initially. Retention requires ongoing engagement.'
    }
  };

  /* ── EVIDENCE DATA ────────────────────────────────────────── */
  const EVIDENCE = {
    repayment: {
      value: '99%', title: 'Repayment Rate', year: '2024',
      meaning: 'MLF\'s group lending model relies on mutual accountability and intensive financial literacy training rather than physical collateral. Groups of five women create social collateral.',
      source: 'MicroLoan Foundation 2024 Financial Reporting',
      type: 'Operational performance metric — directly measured',
      location: 'All operating regions (Malawi, Zambia, Zimbabwe)',
      limitations: 'Rate may fluctuate during rapid scaling. Currency effects on loan value not reflected.'
    },
    disbursed: {
      value: '$166M+', title: 'Total Capital Disbursed', year: 'Cumulative',
      meaning: 'Cumulative microloan capital disbursed across MLF\'s operational history, demonstrating the recycling efficiency of the 99% repayment model.',
      source: 'MLF Historical Financial Records',
      type: 'Cumulative financial output — audited',
      location: 'All markets',
      limitations: 'Nominal value. Not adjusted for inflation or purchasing power parity.'
    },
    women: {
      value: '575,000+', title: 'Women Served Since Inception', year: '2025',
      meaning: 'Direct client reach including 2.4 million dependents. Represents individual women who have received microloans and business training.',
      source: 'MLF 2025 Organisational History',
      type: 'Beneficiary count — case verified',
      location: 'All operating regions',
      limitations: 'Some individuals may have received multiple loan cycles.'
    },
    active: {
      value: '160,000+', title: 'Annual Active Clients', year: '2022',
      meaning: 'Single-year active client capacity across core operating branches. This represents current throughput — the baseline for the 1M target.',
      source: 'MLF 2022 Annual Report',
      type: 'Annual active count',
      location: 'All operating regions',
      limitations: '2022 figure. Current active count may differ. Growth constrained by funding.'
    },
    school: {
      value: '92%', title: 'Children in School (Malawi)', year: '2024',
      meaning: 'Clients with school-age children in Malawi report being able to send their children to school. Directly linked to maternal income stability.',
      source: 'MLF Malawi Impact Survey',
      type: 'Self-reported outcome metric',
      location: 'Malawi',
      limitations: 'Self-reported. Attendance duration and quality not measured.'
    },
    resilience: {
      value: '97%', title: 'Improved Resilience (Zambia)', year: '2024',
      meaning: 'Clients in Zambia reporting improved ability to withstand economic shocks, including food price volatility and health emergencies.',
      source: 'MLF Zambia Impact Survey',
      type: 'Self-reported outcome metric',
      location: 'Zambia',
      limitations: 'Self-reported. Definition of "resilience" may vary by client.'
    }
  };

  /* ── DONOR PIPELINE ───────────────────────────────────────── */
  const DONORS = [
    { id: 1, name: 'Global Women Economic Fund', region: 'USA', amount: '$500K', match: '96%', stage: 'prospect', type: 'Institutional' },
    { id: 2, name: 'Nordic Development Foundation', region: 'Europe', amount: '$750K', match: '92%', stage: 'prospect', type: 'Institutional' },
    { id: 3, name: 'UK Impact Investment Trust', region: 'UK', amount: '$300K', match: '89%', stage: 'proposal', type: 'Private' },
    { id: 4, name: 'African ESG Corporate Alliance', region: 'South Africa', amount: '$1.2M', match: '94%', stage: 'proposal', type: 'Corporate' },
    { id: 5, name: 'Swiss Philanthropy Group', region: 'Europe', amount: '$400K', match: '88%', stage: 'diligence', type: 'Private' },
    { id: 6, name: 'Australian Aid Co-Fund', region: 'Australia', amount: '$900K', match: '91%', stage: 'committed', type: 'Government' },
    { id: 7, name: 'East African Tech Foundation', region: 'Africa', amount: '$200K', match: '85%', stage: 'prospect', type: 'Corporate' }
  ];
  const STAGES = ['prospect', 'proposal', 'diligence', 'committed'];
  const STAGE_LABELS = { prospect: 'Prospecting', proposal: 'Proposal Active', diligence: 'Due Diligence', committed: 'Committed' };
  const STAGE_COLORS = { prospect: '#C4BBB0', proposal: '#C9993A', diligence: '#2D5F3E', committed: '#B85C38' };

  /* ── PITCH DECK ───────────────────────────────────────────── */
  const SLIDES = [
    { 
      title: 'The Strategic Thesis', 
      sub: 'Scaling from 160,000 to 1,000,000 women reached annually requires transitioning from concentrated fundraising to a highly diversified, multi-channel funding engine.', 
      points: [
        'Targeting operational shift from UK-concentrated philanthropy to global ESG and institutional capital markets.',
        'Structuring the six-year scale-up pathway to securely match funding milestones with regional field capacities.',
        'Emphasizing capital recycling: 99% repayment ensures initial donations act as self-sustaining revolving funds.'
      ],
      metrics: [{ l: '2024 Baseline', v: '$1.52M' }, { l: 'Year 1 Target', v: '$3.0M+' }, { l: '6-Year Ambition', v: '$30.0M' }] 
    },
    { 
      title: 'The Concentration Risk', 
      sub: '84% of current donation revenue is concentrated in the UK and Europe. This geographic concentration exposes field operations in Southern Africa to high regional economic shocks.', 
      points: [
        'UK and Europe currently account for over $1.27M in donations, exposing the engine to severe single-market shocks.',
        'Operation costs in Malawi, Zambia, and Zimbabwe rely heavily on unrestricted funds originating from single-territory campaigns.',
        'Bilateral expansion in high-net-worth US circles represents the highest-priority geographical hedge.'
      ],
      metrics: [{ l: 'UK/Europe Share', v: '84%' }, { l: 'United States', v: '10%' }, { l: 'Australia', v: '4%' }] 
    },
    { 
      title: 'The Five-Stream Engine', 
      sub: 'Building operational resilience by activating five distinct capital streams: Institutional Foundations, Corporate CSR, Bilateral Grants, Private major donors, and a Digital Giving community.', 
      points: [
        'Bilateral & DFI Grants: Act as anchor funding for geographical expansion and core system upgrades.',
        'Corporate CSR & ESG: Co-branded empowerment packages mapping to UN SDG 1 (Poverty) and SDG 5 (Gender Equality).',
        'Private HNW & Digital: Maximizing operational flexibility through high proportions of unrestricted capital.'
      ],
      metrics: [{ l: 'Funding Streams', v: '5' }, { l: 'Target Unrestricted', v: '70%' }, { l: 'Fundraising Cost', v: '10–15%' }] 
    },
    { 
      title: 'Proven Group Lending Model', 
      sub: 'MLF\'s self-selected groups of 5 women create social collateral that replaces traditional banking requirements, producing a verified 99% repayment rate.', 
      points: [
        'Peer Selection: Groups of five women self-select, aligning default risks through localized community trust bonds.',
        'Zero Physical Collateral: Trust-based social collateral replaces traditional banking requirements for low-income clients.',
        'Revolving Cycles: Weekly repayments replenish the local capital pool, allowing instant reinvestment into new loans.'
      ],
      metrics: [{ l: 'Repayment Rate', v: '99%' }, { l: 'Group Size', v: '5 Women' }, { l: 'Collateral Needed', v: '0%' }] 
    },
    { 
      title: 'Systemic Human Impact', 
      sub: 'Small seed loans combined with business training and ongoing mentorship transform households, improving child education rates, nutrition, and community resilience.', 
      points: [
        'Schooling Multiplier: Reliable maternal income directly correlates with a 92% school enrollment rate in Malawi.',
        'Household Resilience: 97% of Zambia clients report significantly increased resilience to inflation and food price shocks.',
        'Community Empowerment: 98% of served women report measurable gains in local decision-making and self-confidence.'
      ],
      metrics: [{ l: 'Women Served', v: '575K+' }, { l: 'Dependents Impacted', v: '2.4M' }, { l: 'Malawi Schooling', v: '92%' }] 
    },
    { 
      title: 'Bilateral & Corporate Pipelines', 
      sub: 'Targeting high-match ESG opportunities in the US and bilateral DFIs. Transitioning from transactional sponsorships to strategic, multi-year developmental partnerships.', 
      points: [
        'Prospect Targeting: Focusing on corporate alliances in South Africa and institutional trusts in the United States.',
        'Fit Scoring: Prioritizing entities whose corporate governance maps directly to transparent, audit-ready impact metrics.',
        'Partnership Blueprints: Offering multi-year strategic alignment, quarterly SDG tracking, and co-branded reporting.'
      ],
      metrics: [{ l: 'SA CSR Target', v: '$1.2M' }, { l: 'US Fit Score', v: '96%' }, { l: 'Horizon Target', v: '6-Year' }] 
    },
    { 
      title: 'Operational Scaling Plan', 
      sub: 'Scaling funding capacity in parallel with field capacity. Upgrading digital loan tracking systems, training local managers, and expanding operations across four countries.', 
      points: [
        'Loan Officer Capacity: Recruiting and training local officers is the primary gatekeeper for community expansion.',
        'Digital Enhancements: Deploying mobile loan tracking tools to reduce administrative overhead and prevent data errors.',
        'Regional Hubs: Establishing regional coordination centers in South Africa to streamline cross-border operations.'
      ],
      metrics: [{ l: 'Active Markets', v: '4' }, { l: 'Zambia Resilience', v: '97%' }, { l: 'Target Horizon', v: '2035' }] 
    },
    { 
      title: 'Risk Mitigation & Governance', 
      sub: 'Robust poverty index (PPI) audits and group selection criteria prevent mission drift during expansion, while keeping the fundraising cost ratio low.', 
      points: [
        'PPI Poverty Audits: Utilizing the Progress out of Poverty Index to verify that scaling doesn\'t cause mission drift.',
        'Fundraising Cost Cap: Enforcing a strict $500K Year 1 spending limit, targeting a mature 10–15% efficiency ratio.',
        'Currency Hedging: Minimizing local exchange rate fluctuations through diversified treasury holding accounts.'
      ],
      metrics: [{ l: 'Mission Drift', v: 'Low Risk' }, { l: 'Concentration', v: 'Moderate' }, { l: 'Target Admin Cost', v: '12.5%' }] 
    },
    { 
      title: 'Call to Action', 
      sub: 'Join us in funding the next million journeys out of poverty. Transitioning to a sustainable development model that recycles every dollar multiple times.', 
      points: [
        'Core Goal: Reaching 1,000,000 active female entrepreneurs annually by the year 2035.',
        'Diversification Milestone: Reducing UK/Europe dependency to under 40% of the total funding mix.',
        'Funding Commitment: Securing $3M+ in Year 1 to establish the structural foundation for global scaling.'
      ],
      metrics: [{ l: '2035 Target', v: '1.0M Women' }, { l: 'Total Capital', v: '$30M' }, { l: 'Recycling Rate', v: '99%' }] 
    }
  ];
  let currentSlide = 0;

  /* ── FLOW DATA ────────────────────────────────────────────── */
  const FLOW_DATA = {
    1: { title: 'Capital Entry', detail: '$500,000 grant enters the MicroLoan Foundation trust as seed capital for field operations in Malawi and Zambia.' },
    2: { title: 'Loan Officer Deployment', detail: 'Trained loan officers are deployed to communities. Each officer manages relationships with multiple lending groups.' },
    3: { title: 'Group Formation', detail: 'Self-selected groups of five women form lending circles with mutual accountability and social collateral.' },
    4: { title: 'Training & Literacy', detail: 'Financial literacy, business skills, accounting, pricing, and inventory management training delivered to groups.' },
    5: { title: 'Loan Disbursement', detail: 'Small, graduated microloans disbursed. Zero collateral — the group trust model produces a 99% repayment rate.' },
    6: { title: 'Business Growth', detail: 'Women start and grow businesses: retail, agriculture, services. Regular mentorship continues throughout.' },
    7: { title: 'Household Impact', detail: 'Stable income \u2192 food security, children in school, emergency savings, healthcare access, greater confidence.' },
    8: { title: 'Capital Recycled', detail: '99% of capital returns. Recycled into the next cycle of lending. One dollar funds multiple women over time.' }
  };

  /* ── INITIALIZATION ───────────────────────────────────────── */
  function init() {
    initHeroCanvas();
    initEngineSVG();
    initKanban();
    updateMix();
    updateSimulator();
    initFlowInteraction();

    // Keyboard support
    document.addEventListener('keydown', handleKeyboard);
    // Click-outside for panels
    document.addEventListener('click', handleOutsideClick);
  }

  /* ── HERO CANVAS ──────────────────────────────────────────── */
  function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    const fallback = document.getElementById('heroFallback');
    if (!canvas) return;
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      if (fallback) fallback.style.display = 'block';
      return;
    }
    
    canvas.style.display = 'block';
    if (fallback) fallback.style.display = 'none';
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    let w, h, mouse = { x: 0.5, y: 0.5 }, time = 0, raf;

    function resize() {
      const r = canvas.parentElement.getBoundingClientRect();
      w = r.width; h = Math.max(r.height, 300);
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    canvas.addEventListener('mousemove', function (e) {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = (e.clientY - r.top) / r.height;
    });

    const labels = ['Capital', 'Trust', 'Mentorship', 'Business', 'Impact'];
    const colors = ['#B85C38', '#2D5F3E', '#C9993A', '#1E2A4A', '#8A8278'];

    function draw() {
      ctx.clearRect(0, 0, w, h);
      time += 0.003;
      const cx = w / 2, cy = h / 2;
      const r = Math.min(w, h) * 0.28;

      // Outer orbit ring
      ctx.beginPath();
      ctx.arc(cx + (mouse.x - 0.5) * 6, cy + (mouse.y - 0.5) * 6, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(216,208,196,0.5)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Inner orbit
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(216,208,196,0.3)';
      ctx.lineWidth = 0.3;
      ctx.stroke();

      var nodes = [];
      for (var i = 0; i < 5; i++) {
        var angle = time + (i * Math.PI * 2 / 5);
        var shift = (mouse.x - 0.5) * 10;
        var nx = cx + (r + shift) * Math.cos(angle);
        var ny = cy + (r + shift) * Math.sin(angle);
        nodes.push({ x: nx, y: ny });
        // Line to center
        ctx.beginPath();
        ctx.moveTo(cx, cy); ctx.lineTo(nx, ny);
        ctx.strokeStyle = 'rgba(196,187,176,0.35)';
        ctx.lineWidth = 0.8; ctx.stroke();
      }
      // Adjacent connections
      for (var i = 0; i < 5; i++) {
        var next = (i + 1) % 5;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[next].x, nodes[next].y);
        ctx.strokeStyle = 'rgba(196,187,176,0.4)';
        ctx.lineWidth = 0.6; ctx.stroke();
      }
      // Draw nodes and labels projecting outwards radially
      for (var i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 5, 0, Math.PI * 2);
        ctx.fillStyle = colors[i]; ctx.fill();
        
        var angle = time + (i * Math.PI * 2 / 5);
        var labelDist = r + 15;
        var shift = (mouse.x - 0.5) * 10;
        var tx = cx + (labelDist + shift) * Math.cos(angle);
        var ty = cy + (labelDist + shift) * Math.sin(angle);
        
        ctx.font = '700 8.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#3D3D3D';
        
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        
        if (cos > 0.35) {
          ctx.textAlign = 'left';
        } else if (cos < -0.35) {
          ctx.textAlign = 'right';
        } else {
          ctx.textAlign = 'center';
        }
        
        if (sin > 0.35) {
          ctx.textBaseline = 'top';
        } else if (sin < -0.35) {
          ctx.textBaseline = 'bottom';
        } else {
          ctx.textBaseline = 'middle';
        }
        
        ctx.fillText(labels[i].toUpperCase(), tx, ty);
      }
      // Center
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#B85C38'; ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.strokeStyle = '#F5F0E8'; ctx.lineWidth = 1.5; ctx.stroke();

      raf = requestAnimationFrame(draw);
    }

    // Only animate when visible
    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { if (!raf) draw(); }
      else { cancelAnimationFrame(raf); raf = null; }
    });
    observer.observe(canvas);
    draw();
  }

  /* ── ENGINE SVG ───────────────────────────────────────────── */
  function initEngineSVG() {
    var container = document.getElementById('engineDiagram');
    if (!container) return;
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 800 500');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.maxHeight = '500px';
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Funding engine diagram');

    var cx = 400, cy = 250, radius = 160;
    var keys = Object.keys(ENGINE_CHANNELS);
    var angles = [-90, -18, 54, 126, 198];

    // Connection lines
    keys.forEach(function (key, i) {
      var rad = angles[i] * Math.PI / 180;
      var nx = cx + radius * Math.cos(rad);
      var ny = cy + radius * Math.sin(rad);
      var line = document.createElementNS(ns, 'line');
      line.setAttribute('x1', cx); line.setAttribute('y1', cy);
      line.setAttribute('x2', nx); line.setAttribute('y2', ny);
      line.setAttribute('stroke', '#D8D0C4');
      line.setAttribute('stroke-width', '1.5');
      line.setAttribute('stroke-dasharray', '3 2');
      svg.appendChild(line);
    });

    // Center node
    var bg = document.createElementNS(ns, 'circle');
    bg.setAttribute('cx', cx); bg.setAttribute('cy', cy);
    bg.setAttribute('r', '30'); bg.setAttribute('fill', '#F5F0E8');
    bg.setAttribute('stroke', '#B85C38'); bg.setAttribute('stroke-width', '2');
    svg.appendChild(bg);
    var txt = document.createElementNS(ns, 'text');
    txt.setAttribute('x', cx); txt.setAttribute('y', cy - 2);
    txt.setAttribute('text-anchor', 'middle');
    txt.setAttribute('font-family', 'JetBrains Mono'); txt.setAttribute('font-size', '8');
    txt.setAttribute('fill', '#1A1A1A'); txt.setAttribute('font-weight', '700');
    txt.textContent = 'MICROLOAN';
    svg.appendChild(txt);
    var txt2 = document.createElementNS(ns, 'text');
    txt2.setAttribute('x', cx); txt2.setAttribute('y', cy + 8);
    txt2.setAttribute('text-anchor', 'middle');
    txt2.setAttribute('font-family', 'JetBrains Mono'); txt2.setAttribute('font-size', '6');
    txt2.setAttribute('fill', '#8A8278');
    txt2.textContent = 'FOUNDATION';
    svg.appendChild(txt2);

    // Satellite nodes
    keys.forEach(function (key, i) {
      var d = ENGINE_CHANNELS[key];
      var rad = angles[i] * Math.PI / 180;
      var nx = cx + radius * Math.cos(rad);
      var ny = cy + radius * Math.sin(rad);

      var g = document.createElementNS(ns, 'g');
      g.style.cursor = 'pointer';
      g.setAttribute('role', 'button');
      g.setAttribute('tabindex', '0');
      g.setAttribute('aria-label', d.name);
      g.addEventListener('click', function () { showEngineDetail(key); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter') showEngineDetail(key); });

      // Glow
      var glow = document.createElementNS(ns, 'circle');
      glow.setAttribute('cx', nx); glow.setAttribute('cy', ny);
      glow.setAttribute('r', '28'); glow.setAttribute('fill', d.color);
      glow.setAttribute('opacity', '0.07');
      g.appendChild(glow);

      var c = document.createElementNS(ns, 'circle');
      c.setAttribute('cx', nx); c.setAttribute('cy', ny);
      c.setAttribute('r', '18'); c.setAttribute('fill', d.color);
      g.appendChild(c);

      var label = document.createElementNS(ns, 'text');
      label.setAttribute('x', nx); label.setAttribute('y', ny + 36);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('font-family', 'JetBrains Mono');
      label.setAttribute('font-size', '8'); label.setAttribute('fill', '#1A1A1A');
      label.setAttribute('font-weight', '500');
      label.textContent = key.toUpperCase();
      g.appendChild(label);

      svg.appendChild(g);
    });

    container.appendChild(svg);
  }

  function showEngineDetail(key) {
    var d = ENGINE_CHANNELS[key];
    var p = document.getElementById('enginePanel');
    document.getElementById('epTitle').textContent = d.name;
    document.getElementById('epRev').textContent = d.rev;
    document.getElementById('epRatio').textContent = d.ratio;
    document.getElementById('epFit').textContent = d.fit;
    document.getElementById('epDesc').textContent = d.desc;
    document.getElementById('epRisk').textContent = d.risk;
    p.classList.add('visible');
    p.style.display = 'block';
    if (window.gsap) gsap.fromTo(p, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 });
  }

  /* ── FUNDING MIX ──────────────────────────────────────────── */
  window.updateMix = function () {
    var inst = +el('mixInst').value;
    var corp = +el('mixCorp').value;
    var dfi = +el('mixDfi').value;
    var hnw = +el('mixHnw').value;
    var dig = +el('mixDig').value;

    el('valInst').textContent = inst + '%';
    el('valCorp').textContent = corp + '%';
    el('valDfi').textContent = dfi + '%';
    el('valHnw').textContent = hnw + '%';
    el('valDig').textContent = dig + '%';

    el('segInst').style.width = inst + '%';
    el('segCorp').style.width = corp + '%';
    el('segDfi').style.width = dfi + '%';
    el('segHnw').style.width = hnw + '%';
    el('segDig').style.width = dig + '%';

    var total = inst + corp + dfi + hnw + dig || 1;
    var shares = [inst, corp, dfi, hnw, dig].map(function (v) { return v / total; });
    var hhi = shares.reduce(function (s, v) { return s + v * v; }, 0);
    var divScore = Math.min(100, Math.round((1 - hhi) * 125));
    el('scoreDiversification').textContent = divScore + ' / 100';
    el('barDiv').style.width = divScore + '%';

    var unres = Math.round((inst * 0.5 + corp * 0.4 + dfi * 0.25 + hnw * 0.8 + dig * 0.95) / total * 100);
    el('scoreUnrestricted').textContent = unres + '%';
    el('barUnres').style.width = unres + '%';

    var cost = Math.max(5, 15 - dig * 0.06 + dfi * 0.05).toFixed(1);
    el('scoreCost').textContent = cost + '%';
    el('barCost').style.width = Math.min(100, 100 - cost * 4) + '%';
  };

  /* ── IMPACT SIMULATOR & MULTI-CURRENCY ─────────────────────── */
  var currentCurrency = 'USD';
  var RATES = { USD: { symbol: '$', rate: 1 }, GBP: { symbol: '£', rate: 0.78 }, EUR: { symbol: '€', rate: 0.91 } };

  window.setCurrency = function(btn, curr) {
    currentCurrency = curr;
    document.querySelectorAll('.curr-pill').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    window.updateSimulator();
  };

  window.updateSimulator = function () {
    var cap = +el('simSlider').value;
    var cost = +(el('simCost').value) || 50;
    var dep = +(el('simDep').value) || 4.2;

    var currObj = RATES[currentCurrency] || RATES.USD;
    var convertedCap = Math.round(cap * currObj.rate);

    el('simCapDisplay').textContent = currObj.symbol + convertedCap.toLocaleString();
    var women = Math.round(cap / cost);
    var dependents = Math.round(women * dep);
    var school = Math.round(dependents * 0.92);

    el('simWomen').textContent = women.toLocaleString();
    el('simDependents').textContent = dependents.toLocaleString();
    el('simSchool').textContent = '~' + school.toLocaleString();
  };

  window.toggleAssumptionLab = function () {
    var lab = el('assumptionLab');
    lab.style.display = lab.style.display === 'none' ? 'block' : 'none';
  };

  /* ── RISK MATRIX LIVE FILTERING ──────────────────────────── */
  window.filterRisks = function(btn, cat) {
    document.querySelectorAll('.risk-filter-pill').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');

    var cards = document.querySelectorAll('#riskMonitor .col-4');
    cards.forEach(function(card) {
      var tag = card.querySelector('.tag');
      var text = (tag ? tag.textContent : '') + ' ' + card.textContent;
      if (cat === 'all' || text.toLowerCase().includes(cat.toLowerCase())) {
        card.style.display = 'block';
        card.style.opacity = '1';
      } else {
        card.style.display = 'none';
      }
    });
  };

  /* ── FOLLOW THE MONEY ─────────────────────────────────────── */
  function initFlowInteraction() {
    // Attach click handlers are already inline in HTML
  }

  window.selectFlowStage = function (num) {
    var d = FLOW_DATA[num];
    if (!d) return;
    var panel = el('flowDetail');
    var content = el('flowDetailContent');
    content.innerHTML =
      '<div style="display:flex;align-items:flex-start;gap:var(--sp-lg)">' +
      '<div style="font-family:var(--mono);font-size:1.8rem;font-weight:700;color:var(--earth);min-width:40px;">0' + num + '</div>' +
      '<div><h4 style="margin-bottom:var(--sp-sm)">' + d.title + '</h4>' +
      '<p class="body-sm">' + d.detail + '</p></div></div>';
    panel.style.display = 'block';
    if (window.gsap) gsap.fromTo(panel, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 });
  };

  /* ── FIELD VIDEO DOCUMENTARY MODAL HANDLERS ──────────────── */
  window.openVideoModal = function() {
    var modal = el('videoModal');
    if (modal) modal.classList.add('active');
  };
  window.closeVideoModal = function() {
    var modal = el('videoModal');
    if (modal) modal.classList.remove('active');
  };

  window.downloadDemoPDF = function(title) {
    if (window.showToast) {
      window.showToast('📥 Audited Impact Report (' + title + ') generated & downloaded.');
    }
  };

  /* ── EVIDENCE PANEL ───────────────────────────────────────── */
  window.openEvidence = function (key) {
    if (key === 'clients') key = 'active';
    var d = EVIDENCE[key];
    if (!d) return;
    el('panelValue').textContent = d.value;
    el('panelTitle').textContent = d.title;
    el('panelYear').textContent = d.year;
    el('panelMeaning').textContent = d.meaning;
    el('panelSource').textContent = d.source;
    el('panelType').textContent = d.type;
    el('panelLocation').textContent = d.location;
    el('panelLimitations').textContent = d.limitations;
    el('evidencePanel').classList.add('open');
  };

  window.closeEvidence = function () {
    el('evidencePanel').classList.remove('open');
  };

  /* ── KANBAN ───────────────────────────────────────────────── */
  function initKanban() {
    renderKanban();
  }

  function renderKanban() {
    var board = el('kanbanBoard');
    if (!board) return;
    board.innerHTML = '';

    STAGES.forEach(function (stage) {
      var col = document.createElement('div');
      col.className = 'kanban-col';
      col.innerHTML = '<div class="kanban-head"><span>' + STAGE_LABELS[stage] + '</span><span class="kanban-dot" style="background:' + STAGE_COLORS[stage] + '"></span></div>';

      DONORS.filter(function (d) { return d.stage === stage; }).forEach(function (d) {
        var card = document.createElement('div');
        card.className = 'kanban-card';
        card.onclick = function () { advanceDonor(d.id); };
        card.onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); advanceDonor(d.id); } };
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.innerHTML =
          '<div style="display:flex;justify-content:space-between;margin-bottom:0.2rem">' +
          '<strong style="font-size:0.75rem">' + d.name + '</strong>' +
          '<span class="tag tag-fictional">' + d.match + '</span></div>' +
          '<div style="display:flex;justify-content:space-between;font-family:var(--mono);font-size:0.6875rem;color:var(--stone)">' +
          '<span>' + d.region + ' · ' + d.type + '</span>' +
          '<span style="font-weight:700;color:var(--earth)">' + d.amount + '</span></div>';
        col.appendChild(card);
      });

      board.appendChild(col);
    });
  }

  function advanceDonor(id) {
    var d = DONORS.find(function (x) { return x.id === id; });
    if (!d) return;
    var idx = STAGES.indexOf(d.stage);
    var nextStage = STAGES[(idx + 1) % STAGES.length];
    d.stage = nextStage;
    renderKanban();
    if (window.showToast) window.showToast(d.name + ' advanced to ' + STAGE_LABELS[nextStage]);
  }

  /* ── PARTNERSHIP BLUEPRINT ────────────────────────────────── */
  window.generateBlueprint = function () {
    var obj = el('partnerObjective').value;
    var country = el('partnerCountry').value;
    var commit = el('partnerCommitment').value;
    el('bpTitle').textContent = obj + ' — ' + country;
    el('bpDesc').textContent = 'A multi-year strategic partnership focused on ' + obj.toLowerCase() + ' in ' + country + '. Combining direct field impact with corporate ESG reporting, employee engagement programmes, and transparent quarterly impact measurement.';
    el('bpCommit').textContent = commit;
    var doc = el('blueprintDoc');
    doc.classList.add('visible');
    if (window.gsap) gsap.fromTo(doc, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 });
  };

  /* ── DATA INTEGRITY MODAL ─────────────────────────────────── */
  window.openDataIntegrity = function () { el('dataIntegrityModal').classList.add('active'); };
  window.closeDataIntegrity = function () { el('dataIntegrityModal').classList.remove('active'); };

  /* ── PITCH DECK ───────────────────────────────────────────── */
  window.openDeck = function () { currentSlide = 0; renderSlide(); el('deckOverlay').classList.add('active'); };
  window.closeDeck = function () { el('deckOverlay').classList.remove('active'); };
  window.nextSlide = function () { if (currentSlide < SLIDES.length - 1) { currentSlide++; renderSlide(); } };
  window.prevSlide = function () { if (currentSlide > 0) { currentSlide--; renderSlide(); } };

  function renderSlide() {
    var s = SLIDES[currentSlide];
    var body = el('deckSlideContent');
    body.innerHTML =
      '<div class="deck-slide-inner">' +
      '<p class="overline mb-lg">SLIDE 0' + (currentSlide + 1) + '</p>' +
      '<h2 style="margin-bottom:var(--sp-xl)">' + s.title + '</h2>' +
      '<p class="body-lg" style="max-width:560px; margin-bottom:var(--sp-md);">' + s.sub + '</p>' +
      (s.points ? '<ul style="text-align:left; max-width:650px; margin: 0 auto var(--sp-xl); font-size:0.875rem; color:var(--ink-soft); list-style-type:none; padding:0;">' +
        s.points.map(function (pt) {
          return '<li style="margin-bottom:0.6rem; display:flex; gap:0.6rem; align-items:flex-start;">' +
            '<span style="color:var(--earth); font-family:var(--mono); font-weight:700;">•</span>' +
            '<span>' + pt + '</span></li>';
        }).join('') + '</ul>' : '') +
      '<div class="deck-metrics">' +
      s.metrics.map(function (m) {
        return '<div class="deck-metric"><div class="deck-mv">' + m.v + '</div><p class="caption">' + m.l + '</p></div>';
      }).join('') + '</div>' +
      '</div>';
    el('deckCounter').textContent = 'Slide ' + (currentSlide + 1) + ' of ' + SLIDES.length;
  }

  /* ── KEYBOARD ─────────────────────────────────────────────── */
  function handleKeyboard(e) {
    if (e.key === 'Escape') {
      closeEvidence();
      closeDataIntegrity();
      closeDeck();
    }
    // Deck navigation
    if (el('deckOverlay').classList.contains('active')) {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    }
  }

  /* ── CLICK OUTSIDE ────────────────────────────────────────── */
  function handleOutsideClick(e) {
    var panel = el('evidencePanel');
    if (panel && panel.classList.contains('open') && !panel.contains(e.target) && !e.target.closest('.ev-card')) {
      closeEvidence();
    }
  }



  /* ── DEEP NEWSLETTER & DONATION SIMULATION HANDLERS ─────── */
  window.showToast = function(msg) {
    var toast = el('appToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'appToast';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<span>🎉</span> <span>' + msg + '</span>';
    toast.classList.add('active');
    setTimeout(function() { toast.classList.remove('active'); }, 3000);
  };

  window.handleNewsletterSubmit = function(e) {
    if (e) e.preventDefault();
    var form = e ? e.target : document.querySelector('#newsletter form');
    if (!form) return;
    
    var nameInput = form.querySelector('input[type="text"]');
    var emailInput = form.querySelector('input[type="email"]');
    var btn = form.querySelector('button');
    var name = (nameInput && nameInput.value) ? nameInput.value.trim() : 'Giving Partner';
    var email = (emailInput && emailInput.value) ? emailInput.value.trim() : 'partner@microloan.org';

    if (btn) {
      btn.textContent = 'REGISTERING...';
      btn.disabled = true;
    }

    setTimeout(function() {
      form.innerHTML = '<div style="padding:var(--sp-lg); background:var(--canopy-soft); border:1px solid var(--canopy-light); border-radius:8px; text-align:left;">' +
        '<p class="overline mb-xs" style="color:var(--canopy);">MEMBERSHIP REGISTERED</p>' +
        '<h4 class="mb-xs" style="color:var(--canopy);">🎉 Welcome to Giving Circles, ' + name + '!</h4>' +
        '<p class="body-sm mb-md">Your registration has been confirmed for <strong>' + email + '</strong>. You will receive direct field updates from Malawi & Zambia.</p>' +
        '<div style="display:flex; gap:var(--sp-sm); align-items:center; flex-wrap:wrap; margin-top:var(--sp-sm);">' +
          '<span class="tag tag-case">MEMBER ID: MLF-MEMBER-' + Math.floor(1000 + Math.random() * 9000) + '</span>' +
          '<button class="btn btn-earth" onclick="openDonationModal()" style="padding:8px 18px; font-size:0.8rem; background:var(--earth); border-color:var(--earth);">JOIN A CIRCLE / DONATE NOW ▶</button>' +
        '</div>' +
      '</div>';
      window.showToast('Welcome ' + name + '! Membership confirmed.');
    }, 1000);
  };

  window.selectedDonationAmount = '$25';

  window.openMkondeImpact = function() {
    var modal = el('mkondeModal');
    if (modal) modal.classList.add('active');
  };
  window.closeMkondeImpact = function() {
    var modal = el('mkondeModal');
    if (modal) modal.classList.remove('active');
  };

  window.scrollToNewsletter = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    var target = el('newsletter');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try { history.pushState(null, null, '#newsletter'); } catch(err){}
    }
  };

  window.handleDonateClick = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (window.openDonationModal) window.openDonationModal();
    window.scrollToNewsletter();
  };

  window.openDonationModal = function() {
    var modal = el('donationModal');
    if (modal) modal.classList.add('active');
  };
  window.closeDonationModal = function() {
    var modal = el('donationModal');
    if (modal) modal.classList.remove('active');
  };
  window.selectDonationTier = function(btn, amount, impactText) {
    document.querySelectorAll('.tier-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    window.selectedDonationAmount = amount;
    var impactEl = el('donationImpactPreview');
    if (impactEl) impactEl.textContent = impactText;
  };
  window.handleCustomDonation = function(val) {
    if (!val || val <= 0) return;
    window.selectedDonationAmount = '$' + val;
    var women = Math.max(1, Math.round(val / 50));
    var impactEl = el('donationImpactPreview');
    if (impactEl) impactEl.textContent = 'Funds ' + women + ' Female Entrepreneur(s) per year with business training & seed loan.';
  };
  window.submitDonation = function() {
    var regionEl = el('donationRegionSelect');
    var region = regionEl ? regionEl.value : 'Malawi';
    var btn = document.querySelector('#donationModal .btn-earth');
    var card = document.querySelector('#donationModal .modal-card');

    if (btn) {
      btn.textContent = 'PROCESSING DEMO TRANSACTION...';
      btn.disabled = true;
    }

    setTimeout(function() {
      if (card) {
        card.innerHTML = '<button class="panel-close" onclick="closeDonationModal()" style="position:absolute; top:var(--sp-md); right:var(--sp-md); background:none; border:none; font-size:1.8rem; cursor:pointer; color:var(--ink);">&times;</button>' +
          '<div style="text-align:center; padding:var(--sp-md) 0;">' +
            '<div style="width:60px; height:60px; border-radius:50%; background:var(--canopy-soft); color:var(--canopy); display:inline-flex; align-items:center; justify-content:center; font-size:2rem; margin-bottom:var(--sp-md);">✓</div>' +
            '<p class="overline mb-xs" style="color:var(--canopy);">AUDITED DEMO RECEIPT</p>' +
            '<h3 class="mb-sm">Giving Circle Contribution Confirmed</h3>' +
            '<p class="body-sm mb-lg">Thank you for funding sustainable microfinance in Southern Africa.</p>' +
            '<div style="background:var(--paper); border:1px dashed var(--border); padding:var(--sp-md); border-radius:8px; text-align:left; margin-bottom:var(--sp-lg);">' +
              '<div style="display:flex; justify-content:space-between; margin-bottom:var(--sp-xs);"><span class="caption">TRANSACTION ID</span><span class="mono" style="font-weight:700">MLF-2026-' + Math.floor(10000 + Math.random() * 90000) + '</span></div>' +
              '<div style="display:flex; justify-content:space-between; margin-bottom:var(--sp-xs);"><span class="caption">CONTRIBUTION TIER</span><span class="mono" style="font-weight:700; color:var(--earth)">' + window.selectedDonationAmount + ' / Month</span></div>' +
              '<div style="display:flex; justify-content:space-between; margin-bottom:var(--sp-xs);"><span class="caption">TARGET REGION</span><span class="mono" style="font-weight:700; color:var(--canopy)">' + region + ' Hub</span></div>' +
              '<div style="display:flex; justify-content:space-between;"><span class="caption">STATUS</span><span class="tag tag-case">VERIFIED DEMO</span></div>' +
            '</div>' +
            '<button class="btn btn-fill" onclick="closeDonationModal()" style="width:100%;">Done & Close</button>' +
          '</div>';
      }
      window.showToast('Donation confirmed! Receipt generated.');
    }, 1200);
  };

  /* ── UNIVERSAL SECTION DEMO MODAL HANDLERS (ALL 17 SECTIONS) ─── */
  window.SECTION_DEMOS = {
    hero: {
      num: '01 / OVERVIEW',
      title: 'Platform Architecture & Scale Strategy',
      desc: 'Interactive overview of the MicroLoan Foundation digital platform, connecting donors directly with field operations in Southern Africa.',
      auditor: 'Verified by PwC Financial Audit',
      actionText: 'Test Giving Circle Flow',
      actionFn: function() { closeSectionDemo(); openDonationModal(); }
    },
    impact: {
      num: '02 / IMPACT',
      title: 'Verified Human Impact & 99% Repayment',
      desc: 'Independent field verification of 575,000+ female entrepreneurs served and $166M+ cumulative microloan capital disbursed.',
      auditor: '60 Decibels Top Impact Award 2024',
      actionText: 'View Repayment Audit',
      actionFn: function() { closeSectionDemo(); openEvidence('repayment'); }
    },
    challenge: {
      num: '03 / CHALLENGE',
      title: 'The Funding Concentration Challenge',
      desc: '84% of current donation revenue is concentrated in single-territory campaigns. Scaling requires multi-channel diversification.',
      auditor: 'MLF Financial Committee Risk Report',
      actionText: 'Inspect Concentration Risk',
      actionFn: function() { closeSectionDemo(); filterRisks(document.querySelector('.risk-filter-pill'), 'financial'); }
    },
    fundingGap: {
      num: '04 / GAP',
      title: 'Six-Year Capital Gap Model',
      desc: 'Interactive breakdown of the $30M six-year capital requirement needed to expand operations to 1,000,000 women annually by 2035.',
      auditor: 'Global Philanthropy Financial Model',
      actionText: 'Test Impact Simulator',
      actionFn: function() { closeSectionDemo(); window.location.hash = '#simulator'; }
    },
    hubs: {
      num: '05 / HUBS',
      title: 'Southern Africa Regional Branch Network',
      desc: 'Operational footprints across Malawi, Zambia, and Zimbabwe. 34 rural field branches providing microloans, business training, and mentorship.',
      auditor: 'Field Branch Operational Audit',
      actionText: 'Watch Field Video Documentary',
      actionFn: function() { closeSectionDemo(); openVideoModal(); }
    },
    fundingEngine: {
      num: '06 / ENGINE',
      title: '5-Channel Funding Engine Architecture',
      desc: 'Activating 5 distinct revenue channels: Institutional Foundations, Corporate ESG, Bilateral Grants, HNW Major Donors, and Digital Giving Circles.',
      auditor: 'ESG Strategy Board',
      actionText: 'Explore Engine Diagram',
      actionFn: function() { closeSectionDemo(); showEngineDetail('institutional'); }
    },
    mixOptimiser: {
      num: '07 / DIVERSIFY',
      title: 'Capital Mix Risk Score Calculator',
      desc: 'Interactive HHI risk index algorithm evaluating fundraising diversification and vulnerability to market single-point failures.',
      auditor: 'Financial Risk Management Spec',
      actionText: 'Recalculate Mix Score',
      actionFn: function() { closeSectionDemo(); updateMix(); }
    },
    unrestricted: {
      num: '08 / UNRESTRICTED',
      title: 'Unrestricted Capital Flexibility Thesis',
      desc: 'Why flexible capital is essential: funding branch expansion, digital field tablet deployment, emergency loan restructuring, and local officer training.',
      auditor: 'Operations Advisory Board',
      actionText: 'View 8-Stage Flow',
      actionFn: function() { closeSectionDemo(); showFlowDetail('c_in'); }
    },
    followMoney: {
      num: '09 / FLOW',
      title: '8-Stage Capital Allocation Protocol',
      desc: 'Complete financial transparency from initial donation receipt down to weekly loan recycling in rural community lending circles.',
      auditor: 'Audited Financial Statement 2024',
      actionText: 'Drill Into Stage 1 (Capital Inflow)',
      actionFn: function() { closeSectionDemo(); showFlowDetail('c_in'); }
    },
    timeline: {
      num: '10 / JOURNEY',
      title: 'Vertical Growth Era Scrubbing (2002–2026+)',
      desc: 'Interactive vertical scrub track morphing SVG era badges live: Bicycle 🚲 -> Motorcycle 🏍️ -> Bank 🏛️ -> Globe 🌍 -> Star ⭐.',
      auditor: 'Historical Organisational Spec',
      actionText: 'Scroll Vertical Timeline',
      actionFn: function() { closeSectionDemo(); window.location.hash = '#timeline30m'; }
    },
    joinCircle: {
      num: '11 / CIRCLES',
      title: 'Giving Circles Donor Network',
      desc: 'Community-led monthly donation tiers ($25, $50, $100, $500, Custom) providing direct recurring support to female entrepreneurs.',
      auditor: 'Digital Giving Platform Audit',
      actionText: 'Open Giving Circle Demo',
      actionFn: function() { closeSectionDemo(); openDonationModal(); }
    },
    kanban: {
      num: '12 / PIPELINE',
      title: 'Donor Strategy Kanban Pipeline',
      desc: 'Interactive pipeline tracking donor engagement through 4 stages: Prospective, Proposal Sent, Due Diligence, and Active Partner.',
      auditor: 'Partnership Pipeline Protocol',
      actionText: 'Advance Donor Stage',
      actionFn: function() { closeSectionDemo(); advanceDonor(1); }
    },
    simulator: {
      num: '13 / SIMULATOR',
      title: 'Multi-Currency Impact Calculator',
      desc: 'Interactive simulation engine calculating female entrepreneurs funded and household dependents reached across USD ($), GBP (£), and EUR (€).',
      auditor: 'Impact Measurement Model',
      actionText: 'Run Multi-Currency Test',
      actionFn: function() { closeSectionDemo(); updateSimulator(); }
    },
    blueprint: {
      num: '14 / BLUEPRINT',
      title: 'ESG Partnership Blueprint Generator',
      desc: 'Custom ESG co-branding engine generating live corporate engagement blueprints mapped to UN SDG 1 (No Poverty) and SDG 5 (Gender Equality).',
      auditor: 'Corporate ESG Compliance Spec',
      actionText: 'Generate Live ESG Blueprint',
      actionFn: function() { closeSectionDemo(); generateBlueprint(); }
    },
    risk: {
      num: '15 / RISK',
      title: 'Governance & Risk Mitigation Matrix',
      desc: 'Audited evaluation of 6 core organizational risks: Inflation, Currency Volatility, Climate Impact, Governance, Default Risk, and Scale-up Bottlenecks.',
      auditor: 'Independent Risk & Audit Committee',
      actionText: 'Filter Financial Risks',
      actionFn: function() { closeSectionDemo(); filterRisks(document.querySelectorAll('.risk-filter-pill')[1], 'financial'); }
    },
    oneMillion: {
      num: '16 / CLIMAX',
      title: 'The 2035 Climax Ambition (160k -> 575k+)',
      desc: 'Centered GSAP morphing animation blend scaling from 160,000 baseline to 575,000+ cumulative milestone reached.',
      auditor: '2035 Ambition Masterplan',
      actionText: 'Replay Climax Animation',
      actionFn: function() { closeSectionDemo(); window.location.hash = '#oneMillion'; }
    },
    partners: {
      num: '17 / PARTNERS & TOP DONORS',
      title: 'Global Alliances, Foundations & Top Donors',
      desc: 'Institutional foundation partnerships, major philanthropic donors ($50K-$500K), microfinance networks, and strategic giving circles backing Southern African operations.',
      auditor: 'Verified Foundation & Donor Audit 2024',
      actionText: 'View Alliances & Top Donors',
      actionFn: function() { closeSectionDemo(); window.location.hash = '#partners'; }
    },
    final: {
      num: '18 / TAKE ACTION',
      title: 'Final Action Call & Newsletter Registration',
      desc: 'Interactive newsletter registration generating audited digital member cards and instant field report subscription.',
      auditor: 'Community Engagement Spec',
      actionText: 'Register Newsletter Member',
      actionFn: function() { closeSectionDemo(); window.scrollToNewsletter(); }
    }
  };

  window.openPartnersModal = function(category) {
    var modal = el('partnersModal');
    if (!modal) return;
    modal.classList.add('active');

    var cat = category || 'all';
    var pills = modal.querySelectorAll('.risk-filter-pill');
    pills.forEach(function(p) {
      p.classList.remove('active');
      var onclickAttr = p.getAttribute('onclick') || '';
      if (onclickAttr.indexOf("'" + cat + "'") !== -1) {
        p.classList.add('active');
      }
    });

    var cards = modal.querySelectorAll('.modal-partner-card');
    cards.forEach(function(card) {
      if (cat === 'all' || card.getAttribute('data-category') === cat) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  };

  window.closePartnersModal = function() {
    var modal = el('partnersModal');
    if (modal) modal.classList.remove('active');
  };

  window.filterPartnersModal = function(btn, category) {
    var modal = el('partnersModal');
    if (!modal) return;
    var pills = modal.querySelectorAll('.risk-filter-pill');
    pills.forEach(function(p) { p.classList.remove('active'); });
    if (btn) btn.classList.add('active');

    var cards = modal.querySelectorAll('.modal-partner-card');
    cards.forEach(function(card) {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  };

  window.openSectionDemo = function(key) {
    var d = window.SECTION_DEMOS[key];
    if (!d) return;
    var modal = el('sectionDemoModal');
    if (!modal) return;

    el('secDemoNum').textContent = d.num;
    el('secDemoTitle').textContent = d.title;
    el('secDemoDesc').textContent = d.desc;
    el('secDemoAuditor').textContent = d.auditor;
    
    var btn = el('secDemoActionBtn');
    if (btn) {
      btn.textContent = d.actionText;
      btn.onclick = d.actionFn;
    }
    
    modal.classList.add('active');
  };

  window.closeSectionDemo = function() {
    var modal = el('sectionDemoModal');
    if (modal) modal.classList.remove('active');
  };

  /* ── UTILITY ──────────────────────────────────────────────── */
  function el(id) { return document.getElementById(id); }

  /* ── BOOT ─────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  window.MLApp = { init: init, CASE: CASE };
})();
