import re

file_path = '/Users/paman/Downloads/SIMRAN DIDI/web_backup/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the timeline-morph-wrapper with timeline-slider-wrapper
old_wrapper_pattern = r'<div class="timeline-morph-wrapper reveal".*?</div>\s*</div>'

new_slider_wrapper = """<div class="timeline-slider-wrapper reveal" style="position:relative; max-width:900px; margin:0 auto var(--sp-3xl); padding:10px 0;">
        <div style="position:relative; height:4px; background:var(--border); margin:20px 0; border-radius:2px;">
            <div id="timelineTravelingBadge" style="position:absolute; top:50%; left:0%; transform:translate(-50%, -50%); width:54px; height:54px; border-radius:50%; background:var(--ink); color:var(--paper); display:flex; align-items:center; justify-content:center; box-shadow:0 8px 24px rgba(0,0,0,0.25); z-index:10; transition:transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                <svg id="timelineTravelingSvg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--paper)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L9.5 10 5.5 17.5M12 17.5l4-7.5h-5.5"/>
                </svg>
            </div>
        </div>
        <div id="timelineTravelingText" style="text-align:center; font-family:var(--mono); font-size:0.8125rem; font-weight:700; color:var(--ink); margin-top:24px; text-transform:uppercase; letter-spacing:0.08em;">
            2002 · ONE BICYCLE
        </div>
    </div>"""

html = re.sub(old_wrapper_pattern, new_slider_wrapper, html, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Sliding timeline HTML inserted.")
