import re

file_path = '/Users/paman/Downloads/SIMRAN DIDI/web_backup/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

badge_html = """    <div class="timeline-morph-wrapper reveal" style="text-align:center; margin-bottom:var(--sp-2xl);">
        <div id="timelineMorphBadge" style="width:64px; height:64px; border-radius:50%; background:var(--ink); color:var(--paper); display:inline-flex; align-items:center; justify-content:center; box-shadow:0 8px 24px rgba(0,0,0,0.18); margin:0 auto;">
            <svg id="timelineMorphSvg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--paper)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L9.5 10 5.5 17.5M12 17.5l4-7.5h-5.5"/>
            </svg>
        </div>
        <div id="timelineMorphText" style="font-family:var(--mono); font-size:0.8125rem; font-weight:700; color:var(--ink); margin-top:var(--sp-sm); text-transform:uppercase; letter-spacing:0.08em;">
            2002 · ONE BICYCLE
        </div>
    </div>

    <div class="timeline reveal">"""

# Insert badge above <div class="timeline reveal"> if not already inserted
if 'id="timelineMorphBadge"' not in html:
    html = html.replace('<div class="timeline reveal">', badge_html)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Morph badge inserted into index.html.")
