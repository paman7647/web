import re

file_path = '/Users/paman/Downloads/SIMRAN DIDI/web_backup/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Extract successStories
success_pattern = r'(<!-- ═══════════════════════════════════════════════════════════\s*SUCCESS STORIES \(INJECTED\).*?</section>)'
success_match = re.search(success_pattern, html, flags=re.DOTALL)

# Extract awards
awards_pattern = r'(<!-- ═══════════════════════════════════════════════════════════\s*AWARDS BANNER \(INJECTED\).*?</section>)'
awards_match = re.search(awards_pattern, html, flags=re.DOTALL)

if success_match and awards_match:
    success_block = success_match.group(1)
    awards_block = awards_match.group(1)
    
    html = html.replace(success_block, '')
    html = html.replace(awards_block, '')
    
    # Insert right after section id="humanScale"
    insert_target = r'(</section>\s*<!-- ═══════════════════════════════════════════════════════════\s*10 — THE JOURNEY)'
    replacement = f'</section>\n\n{success_block}\n\n{awards_block}\n\n<!-- ═══════════════════════════════════════════════════════════\n     10 — THE JOURNEY'
    html = re.sub(insert_target, replacement, html, flags=re.DOTALL)

# Clean double blank lines
html = re.sub(r'\n\s*\n\s*\n+', '\n\n', html)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Resequencing completed.")
