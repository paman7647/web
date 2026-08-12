import re

file_path = '/Users/paman/Downloads/SIMRAN DIDI/web_backup/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Helper to extract an HTML section by ID
def get_section(sid, html_content):
    pattern = rf'(<!-- ═+.*?id="{sid}".*?</section>)'
    match = re.search(pattern, html_content, flags=re.DOTALL)
    if match:
        return match.group(1)
    # Fallback search
    pattern_fallback = rf'(<section[^>]*id="{sid}"[^>]*>.*?</section>)'
    match2 = re.search(pattern_fallback, html_content, flags=re.DOTALL)
    return match2.group(1) if match2 else ''

# Extract Head & Nav
head_nav_pattern = r'(.*?<!-- ═══════════════════════════════════════════════════════════\s*00 — HERO)'
head_nav_match = re.search(head_nav_pattern, html, flags=re.DOTALL)
head_nav = head_nav_match.group(1) if head_nav_match else ''

# Extract Hero section
hero_sec = get_section('hero', html)

# Extract Our Work section
our_work_sec = get_section('ourWork', html)

# Extract Human Scale section
human_scale_sec = get_section('humanScale', html)

# Extract Success Stories section
success_sec = get_section('successStories', html)

# Extract Awards section
awards_pattern = r'(<!-- ═══════════════════════════════════════════════════════════\s*AWARDS BANNER.*?<\/section>)'
awards_match = re.search(awards_pattern, html, flags=re.DOTALL)
awards_sec = awards_match.group(1) if awards_match else ''

# Extract Timeline section
timeline_sec = get_section('timeline30m', html)

# Extract Simulator section
simulator_sec = get_section('simulator', html)

# Extract Newsletter section
newsletter_sec = get_section('newsletter', html)

# Extract Final section
final_sec = get_section('final', html)

# Extract Footer & Scripts
footer_scripts_pattern = r'(<!-- ═══════════════════════════════════════════════════════════\s*FOOTER.*)'
footer_scripts_match = re.search(footer_scripts_pattern, html, flags=re.DOTALL)
footer_scripts = footer_scripts_match.group(1) if footer_scripts_match else ''

# Clean up DECK buttons if any remain in head_nav
head_nav = re.sub(r'<button class="nav-deck-btn".*?</button>\s*', '', head_nav)

# Assemble 5-Chapter Clean HTML
clean_html = f"""{head_nav}
{hero_sec}

{our_work_sec}

{human_scale_sec}

{success_sec}

{awards_sec}

{timeline_sec}

{simulator_sec}

{newsletter_sec}

{final_sec}

{footer_scripts}
"""

# Clean extra blank lines
clean_html = re.sub(r'\n\s*\n\s*\n+', '\n\n', clean_html)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(clean_html)

print("Holistic UX refactor script executed successfully.")
