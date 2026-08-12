import re

file_path = '/Users/paman/Downloads/SIMRAN DIDI/web_backup/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

new_timeline_html = """    <div class="timeline reveal">
        <div class="timeline-year">
            <div class="timeline-icon-badge" style="width:48px; height:48px; border-radius:50%; background:var(--paper); border:2px solid var(--earth); display:flex; align-items:center; justify-content:center; margin:0 auto var(--sp-md); box-shadow:0 4px 12px rgba(184, 92, 56, 0.15); transition:transform 0.3s ease;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--earth)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L9.5 10 5.5 17.5M12 17.5l4-7.5h-5.5"/>
                </svg>
            </div>
            <div class="timeline-label">2002</div>
            <h3 class="timeline-title">One bicycle</h3>
            <p class="body-sm c-stone">One loan officer, one branch, Malawi.</p>
        </div>
        <div class="timeline-year">
            <div class="timeline-icon-badge" style="width:48px; height:48px; border-radius:50%; background:var(--paper); border:2px solid var(--earth-light); display:flex; align-items:center; justify-content:center; margin:0 auto var(--sp-md); box-shadow:0 4px 12px rgba(212, 132, 90, 0.15); transition:transform 0.3s ease;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--earth-light)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="6" cy="16" r="3"/><circle cx="18" cy="16" r="3"/><path d="M9 16l3-6h5l2 3M6 16l3-9h4"/>
                </svg>
            </div>
            <div class="timeline-label">2008</div>
            <h3 class="timeline-title">Motorcycles</h3>
            <p class="body-sm c-stone">Expansion into Zambia and reach into rural terrain.</p>
        </div>
        <div class="timeline-year">
            <div class="timeline-icon-badge" style="width:48px; height:48px; border-radius:50%; background:var(--paper); border:2px solid var(--indigo); display:flex; align-items:center; justify-content:center; margin:0 auto var(--sp-md); box-shadow:0 4px 12px rgba(30, 42, 74, 0.15); transition:transform 0.3s ease;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--indigo)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11"/>
                </svg>
            </div>
            <div class="timeline-label">2023</div>
            <h3 class="timeline-title">Self-sufficiency</h3>
            <p class="body-sm c-stone">All three countries reach operational self-sufficiency.</p>
        </div>
        <div class="timeline-year">
            <div class="timeline-icon-badge" style="width:48px; height:48px; border-radius:50%; background:var(--paper); border:2px solid var(--canopy); display:flex; align-items:center; justify-content:center; margin:0 auto var(--sp-md); box-shadow:0 4px 12px rgba(45, 95, 62, 0.15); transition:transform 0.3s ease;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--canopy)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
            </div>
            <div class="timeline-label">2025</div>
            <h3 class="timeline-title">South Africa</h3>
            <p class="body-sm c-stone">575,000 women and 2.4M dependents reached.</p>
        </div>
        <div class="timeline-year">
            <div class="timeline-icon-badge" style="width:48px; height:48px; border-radius:50%; background:var(--gold-glow); border:2px solid var(--gold); display:flex; align-items:center; justify-content:center; margin:0 auto var(--sp-md); box-shadow:0 4px 12px rgba(201, 153, 58, 0.25); transition:transform 0.3s ease;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            </div>
            <div class="timeline-label">2026 →</div>
            <h3 class="timeline-title" style="color:var(--canopy)">Giving circles</h3>
            <p class="body-sm c-stone">Donor-side infrastructure to fund the next million.</p>
        </div>
    </div>"""

pattern = r'<div class="timeline reveal">.*?</div>\s*</div>'
html = re.sub(pattern, new_timeline_html, html, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Timeline SVG icons inserted successfully.")
