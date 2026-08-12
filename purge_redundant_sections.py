import re

file_path = '/Users/paman/Downloads/SIMRAN DIDI/web_backup/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Function to remove a section by ID accurately
def remove_section_by_id(sid, html_content):
    pattern = rf'<!-- ═+[^>]*?\n<section[^>]*id="{sid}".*?</section>'
    if re.search(pattern, html_content, flags=re.DOTALL):
        return re.sub(pattern, '', html_content, flags=re.DOTALL)
    # Direct fallback
    pattern_direct = rf'<section[^>]*id="{sid}".*?</section>'
    return re.sub(pattern_direct, '', html_content, flags=re.DOTALL)

redundant_ids = [
    'fundingChallenge',
    'fundingGap',
    'concentration',
    'fundingEngine',
    'fundingMix',
    'unrestricted',
    'followMoney',
    'donorStrategy',
    'partnership',
    'riskMonitor',
    'scalability',
    'oneMillion'
]

for sid in redundant_ids:
    html = remove_section_by_id(sid, html)

# Clean up any leftover empty comments or double line breaks
html = re.sub(r'\n\s*\n\s*\n+', '\n\n', html)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Redundant sections purged cleanly.")
