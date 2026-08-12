import re

file_path = '/Users/paman/Downloads/SIMRAN DIDI/web_backup/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove duplicate timeline-slider-wrapper completely
slider_pattern = r'<div class="timeline-slider-wrapper reveal".*?</div>\s*</div>\s*'
html = re.sub(slider_pattern, '', html, flags=re.DOTALL)

# 2. Embed single active badge inside <div class="timeline reveal">
timeline_start = '<div class="timeline reveal">'
new_timeline_start = """<div class="timeline reveal" style="position:relative;">
        <div id="timelineTravelingBadge" style="position:absolute; top:24px; left:10%; transform:translate(-50%, -50%); width:52px; height:52px; border-radius:50%; background:var(--ink); color:var(--paper); display:flex; align-items:center; justify-content:center; box-shadow:0 8px 20px rgba(0,0,0,0.25); z-index:10; transition:transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
            <svg id="timelineTravelingSvg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--paper)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L9.5 10 5.5 17.5M12 17.5l4-7.5h-5.5"/>
            </svg>
        </div>"""

if 'id="timelineTravelingBadge"' not in html:
    html = html.replace(timeline_start, new_timeline_start)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Timeline HTML bug fixed cleanly.")
