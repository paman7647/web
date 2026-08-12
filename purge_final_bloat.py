import re

file_path = '/Users/paman/Downloads/SIMRAN DIDI/web_backup/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Function to remove section by ID
def remove_sec(sid, html_content):
    pattern = rf'<!-- ═+[^>]*?\n<section[^>]*id="{sid}".*?</section>'
    if re.search(pattern, html_content, flags=re.DOTALL):
        return re.sub(pattern, '', html_content, flags=re.DOTALL)
    pattern_direct = rf'<section[^>]*id="{sid}".*?</section>'
    return re.sub(pattern_direct, '', html_content, flags=re.DOTALL)

html = remove_sec('joinCircles', html)
html = remove_sec('recommendation', html)

# Clean up double line breaks
html = re.sub(r'\n\s*\n\s*\n+', '\n\n', html)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Final bloat purged.")
