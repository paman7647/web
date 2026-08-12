import re

file_path = '/Users/paman/Downloads/SIMRAN DIDI/web_backup/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update desktop nav links
old_desktop_links = r'<div class="nav-links">.*?</div>'
new_desktop_links = '''<div class="nav-links">
            <a href="#ourWork" class="nav-link" style="text-decoration:none;">Our Work</a>
            <a href="#humanScale" class="nav-link" style="text-decoration:none;">Impact</a>
            <a href="#successStories" class="nav-link" style="text-decoration:none;">Stories</a>
            <a href="#newsletter" class="nav-link" style="text-decoration:none;">Take Action</a>
            <a href="#newsletter" class="nav-link" style="text-decoration:none;">Contact</a>
        </div>'''
html = re.sub(old_desktop_links, new_desktop_links, html, flags=re.DOTALL)

# 2. Update mobile overlay links & remove View Deck button
old_mobile_overlay = r'<div class="mobile-overlay".*?</div>'
new_mobile_overlay = '''<div class="mobile-overlay" style="position:fixed;top:var(--nav-h);left:0;right:0;bottom:0;background:var(--cream);z-index:99;display:none;flex-direction:column;padding:var(--sp-xl);gap:var(--sp-lg);border-top:1px solid var(--border);">
    <a href="#ourWork" class="nav-link" style="font-size:1.5rem;color:var(--ink);" onclick="this.parentElement.classList.remove('active')">Our Work</a>
    <a href="#humanScale" class="nav-link" style="font-size:1.5rem;color:var(--ink);" onclick="this.parentElement.classList.remove('active')">Impact</a>
    <a href="#successStories" class="nav-link" style="font-size:1.5rem;color:var(--ink);" onclick="this.parentElement.classList.remove('active')">Stories</a>
    <a href="#newsletter" class="nav-link" style="font-size:1.5rem;color:var(--ink);" onclick="this.parentElement.classList.remove('active')">Take Action</a>
    <a href="#newsletter" class="nav-link" style="font-size:1.5rem;color:var(--ink);" onclick="this.parentElement.classList.remove('active')">Contact</a>
</div>'''
html = re.sub(old_mobile_overlay, new_mobile_overlay, html, flags=re.DOTALL)

# 3. Remove DECK button from nav-actions
html = re.sub(r'<button class="nav-deck-btn".*?</button>\s*', '', html)

# 4. Set section IDs for Our Work
html = html.replace('id="humanModel"', 'id="ourWork"')

# 5. Fix Join a Circle button target
html = html.replace("window.location.hash='#joinCircles'", "window.location.hash='#newsletter'")

# 6. Purge dangling text after </footer> if present
pattern_footer_orphans = r'</footer>\s*.*?\s*<!-- ═══════════════════════════════════════════════════════════\s*SCRIPTS'
replacement = '</footer>\n\n<!-- ═══════════════════════════════════════════════════════════\n     SCRIPTS'
html = re.sub(pattern_footer_orphans, replacement, html, flags=re.DOTALL)

# 7. Update Footer links
old_footer_links = r'<div class="footer-links">.*?</div>'
new_footer_links = '''<div class="footer-links">
                <a href="#hero">Overview</a>
                <a href="#ourWork">Our Work</a>
                <a href="#humanScale">Impact</a>
                <a href="#successStories">Stories</a>
                <a href="#newsletter">Take Action</a>
            </div>'''
html = re.sub(old_footer_links, new_footer_links, html, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Nav fix and presentation purge script completed successfully.")
