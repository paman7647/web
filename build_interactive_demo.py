import re

file_path = '/Users/paman/Downloads/SIMRAN DIDI/web_backup/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Navbar Links
old_nav_links = r'<div class="nav-links">.*?</div>'
new_nav_links = '''<div class="nav-links">
            <a href="#ourWork" class="nav-link" style="text-decoration:none;">Our Work</a>
            <a href="#humanScale" class="nav-link" style="text-decoration:none;">Impact</a>
            <a href="#fundingEngine" class="nav-link" style="text-decoration:none;">Engine</a>
            <a href="#simulator" class="nav-link" style="text-decoration:none;">Simulator</a>
            <a href="#partnership" class="nav-link" style="text-decoration:none;">Blueprint</a>
            <a href="#successStories" class="nav-link" style="text-decoration:none;">Stories</a>
            <a href="#newsletter" class="nav-link" style="text-decoration:none;">Take Action</a>
        </div>'''
html = re.sub(old_nav_links, new_nav_links, html, flags=re.DOTALL)

# 2. Update Mobile Menu Links
old_mobile_links = r'<div class="mobile-overlay".*?</div>'
new_mobile_links = '''<div class="mobile-overlay" style="position:fixed;top:var(--nav-h);left:0;right:0;bottom:0;background:var(--cream);z-index:99;display:none;flex-direction:column;padding:var(--sp-xl);gap:var(--sp-lg);border-top:1px solid var(--border);">
    <a href="#ourWork" class="nav-link" style="font-size:1.3rem;color:var(--ink);" onclick="this.parentElement.classList.remove('active')">Our Work</a>
    <a href="#humanScale" class="nav-link" style="font-size:1.3rem;color:var(--ink);" onclick="this.parentElement.classList.remove('active')">Impact</a>
    <a href="#fundingEngine" class="nav-link" style="font-size:1.3rem;color:var(--ink);" onclick="this.parentElement.classList.remove('active')">Engine</a>
    <a href="#simulator" class="nav-link" style="font-size:1.3rem;color:var(--ink);" onclick="this.parentElement.classList.remove('active')">Simulator</a>
    <a href="#partnership" class="nav-link" style="font-size:1.3rem;color:var(--ink);" onclick="this.parentElement.classList.remove('active')">Blueprint</a>
    <a href="#successStories" class="nav-link" style="font-size:1.3rem;color:var(--ink);" onclick="this.parentElement.classList.remove('active')">Stories</a>
    <a href="#newsletter" class="nav-link" style="font-size:1.3rem;color:var(--ink);" onclick="this.parentElement.classList.remove('active')">Take Action</a>
</div>'''
html = re.sub(old_mobile_links, new_mobile_links, html, flags=re.DOTALL)

# 3. Add Section 06: Funding Engine HTML
engine_html = """
<!-- ═══════════════════════════════════════════════════════════
     06 — FUNDING ENGINE (INTERACTIVE DEMO)
     ═══════════════════════════════════════════════════════════ -->
<section class="sec-pad container lazy-section" id="fundingEngine" aria-label="The funding engine">
    <div class="sec-head">
        <span class="sec-num">06 / CAPITAL ENGINE</span>
        <span class="tag tag-rec">INTERACTIVE DEMO</span>
    </div>
    <h2 class="mb-lg reveal">FIVE SOURCES.<br>ONE DIVERSIFIED ENGINE.</h2>
    <p class="body-sm mb-xl reveal" style="max-width:560px">Click any channel in the system to explore target revenue ranges, unrestricted capital ratios, and strategic fit.</p>

    <div class="engine-svg reveal" id="engineDiagram" role="img" aria-label="Five-channel funding engine diagram"></div>

    <div class="engine-panel reveal" id="enginePanel" style="margin-top:var(--sp-xl); padding:var(--sp-xl); background:var(--paper); border:1px solid var(--border); border-radius:8px;">
        <div class="grid">
            <div class="col-6">
                <p class="overline mb-sm">ACTIVE CHANNEL</p>
                <h3 id="epTitle" class="mb-lg" style="color:var(--earth);">Institutional Grants</h3>
                <div class="mb-md">
                    <p class="caption mb-xs">TARGET REVENUE RANGE</p>
                    <p class="mono" style="font-size:1.3rem;font-weight:700" id="epRev">$500,000 – $1.2M</p>
                </div>
                <div>
                    <p class="caption mb-xs">UNRESTRICTED RATIO</p>
                    <p class="mono" style="font-size:1.3rem;font-weight:700;color:var(--canopy);" id="epRatio">20% Unrestricted</p>
                </div>
            </div>
            <div class="col-6">
                <p class="overline mb-sm">STRATEGIC FIT & PURPOSE</p>
                <p class="body-sm mb-lg" id="epFit">High volume, multi-year capacity building grants for operational expansion across Southern Africa.</p>
                <span class="tag tag-illustrative mt-lg" style="display:inline-flex">CLICK CHANNEL TO SWITCH</span>
            </div>
        </div>
    </div>
</section>
"""

# Insert Funding Engine right after #humanScale
if 'id="fundingEngine"' not in html:
    html = html.replace('<!-- ═══════════════════════════════════════════════════════════\n     SUCCESS STORIES', engine_html + '\n\n<!-- ═══════════════════════════════════════════════════════════\n     SUCCESS STORIES')

# 4. Add Section 13: Partnership Generator HTML
partnership_html = """
<!-- ═══════════════════════════════════════════════════════════
     13 — CORPORATE PARTNERSHIP (INTERACTIVE BLUEPRINT)
     ═══════════════════════════════════════════════════════════ -->
<section class="sec-pad container lazy-section" id="partnership" aria-label="Corporate partnership">
    <div class="sec-head">
        <span class="sec-num">13 / PARTNERSHIP BLUEPRINT</span>
        <span class="tag tag-illustrative">BLUEPRINT GENERATOR</span>
    </div>
    <h2 class="mb-xl reveal">PARTNERSHIP,<br>NOT SPONSORSHIP.</h2>

    <div class="grid">
        <div class="col-6 reveal">
            <p class="body-sm mb-lg">Configure your ESG parameters below to generate a tailored Strategic Partnership Blueprint live.</p>
            
            <p class="caption mb-xs">1. SELECT ESG IMPACT OBJECTIVE</p>
            <select class="select-styled mb-md" id="partnerObjective" style="margin-bottom:var(--sp-md);">
                <option value="SDG 5: Gender Equality">ESG: SDG 5 — Gender Equality & Empowerment</option>
                <option value="SDG 1: Eradicating Poverty">ESG: SDG 1 — Eradicating Poverty</option>
                <option value="SDG 8: Decent Work">ESG: SDG 8 — Decent Work & Economic Growth</option>
            </select>
            
            <p class="caption mb-xs">2. TARGET GEOGRAPHIC REGION</p>
            <select class="select-styled mb-md" id="partnerCountry" style="margin-bottom:var(--sp-md);">
                <option value="Malawi">Target Region: Malawi (Agriculture Focus)</option>
                <option value="Zambia">Target Region: Zambia (Retail Growth)</option>
                <option value="Zimbabwe">Target Region: Zimbabwe (Resilience)</option>
                <option value="Pan-African">Target Region: Pan-African Operations</option>
            </select>
            
            <p class="caption mb-xs">3. ANNUAL CAPITAL COMMITMENT</p>
            <select class="select-styled mb-lg" id="partnerCommitment" style="margin-bottom:var(--sp-lg);">
                <option value="$50,000 / Year">$50,000 / Year (1,000 Women)</option>
                <option value="$150,000 / Year">$150,000 / Year (3,000 Women)</option>
                <option value="$500,000 / Year">$500,000 / Year — Strategic Anchor</option>
            </select>
            <button class="btn btn-earth mt-md" onclick="generateBlueprint()" style="width:100%;">Generate Partnership Blueprint</button>
        </div>
        <div class="col-6 reveal">
            <div class="blueprint" id="blueprintDoc" style="padding:var(--sp-xl); background:var(--paper); border:1px dashed var(--earth); border-radius:8px;">
                <p class="caption" style="text-align:center;margin-bottom:var(--sp-lg)">STRATEGIC PARTNERSHIP BLUEPRINT</p>
                <h4 style="text-align:center;margin-bottom:var(--sp-lg); color:var(--earth);" id="bpTitle">SDG 5: Gender Equality — Malawi</h4>
                <p class="body-sm mb-lg" id="bpDesc">Targeted microfinance and business training deployment for female rural entrepreneurs.</p>
                <hr class="rule rule-sm">
                <div style="display:flex;justify-content:space-between">
                    <span class="caption">ANNUAL COMMITMENT</span>
                    <span class="mono" style="font-size:0.9rem;font-weight:700; color:var(--canopy);" id="bpCommit">$50,000 / Year</span>
                </div>
                <hr class="rule rule-sm">
                <p class="body-sm" style="font-size:0.8rem; color:var(--stone);">Includes quarterly SDG impact reporting, employee engagement programmes, and full client audit verification.</p>
                <span class="tag tag-illustrative mt-lg" style="display:inline-flex">LIVE GENERATED PROTOTYPE</span>
            </div>
        </div>
    </div>
</section>
"""

# Insert Partnership Blueprint right after #simulator
if 'id="partnership"' not in html:
    html = html.replace('<!-- ═══════════════════════════════════════════════════════════\n     NEWSLETTER', partnership_html + '\n\n<!-- ═══════════════════════════════════════════════════════════\n     NEWSLETTER')

# 5. Add Field Evidence Drawer HTML (#evidencePanel) before </footer>
evidence_drawer_html = """
<!-- ═══════════════════════════════════════════════════════════
     FIELD EVIDENCE SIDE DRAWER (INTERACTIVE DEMO)
     ═══════════════════════════════════════════════════════════ -->
<div class="side-panel" id="evidencePanel" style="position:fixed; top:0; right:0; width:min(450px, 90vw); height:100vh; background:var(--paper); border-left:1px solid var(--border); box-shadow:-8px 0 24px rgba(0,0,0,0.15); z-index:200; transform:translateX(100%); transition:transform 0.35s cubic-bezier(0.16, 1, 0.3, 1); padding:var(--sp-2xl); overflow-y:auto;">
    <button class="panel-close" onclick="closeEvidence()" style="position:absolute; top:var(--sp-lg); right:var(--sp-lg); background:none; border:none; font-size:2rem; cursor:pointer; color:var(--ink);">&times;</button>
    <p class="overline mb-sm">VERIFIED FIELD EVIDENCE</p>
    <h2 id="panelValue" class="mb-md" style="font-size:3rem; color:var(--earth);">99%</h2>
    <h3 id="panelTitle" class="mb-lg">Repayment Rate Across Southern Africa</h3>

    <p class="caption mb-xs">YEAR / PERIOD</p>
    <p class="body-sm mb-lg" id="panelYear">2024 Audited Report</p>

    <p class="caption mb-xs">METHODOLOGY & IMPACT</p>
    <p class="body-sm mb-lg" id="panelMeaning">Group lending accountability ensures peer support replaces physical bank collateral.</p>

    <p class="caption mb-xs">DATA SOURCE</p>
    <p class="body-sm mb-lg" id="panelSource">MLF Field Management Information System (MIS)</p>

    <p class="caption mb-xs">DATA TYPE</p>
    <p class="body-sm mb-lg" id="panelType">Audited Operational Metric</p>

    <p class="caption mb-xs">OPERATIONAL LOCATION</p>
    <p class="body-sm mb-lg" id="panelLocation">Malawi, Zambia, Zimbabwe</p>

    <hr class="rule">
    <p class="caption mb-xs">AUDIT VERIFICATION</p>
    <p class="body-sm" id="panelLimitations">Verified by independent microfinance impact evaluation teams.</p>
</div>
<style>
.side-panel.active { transform: translateX(0) !important; }
</style>
"""

if 'id="evidencePanel"' not in html:
    html = html.replace('</footer>', '</footer>\n' + evidence_drawer_html)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Interactive demo HTML sections built successfully.")
