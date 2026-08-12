import re

file_path = '/Users/paman/Downloads/SIMRAN DIDI/web_backup/js/animations.js'

with open(file_path, 'r', encoding='utf-8') as f:
    js = f.read()

new_nav_progress = """  function initNavProgress() {
    const sections = [
      { id: 'ourWork', link: 'a[href="#ourWork"]' },
      { id: 'humanScale', link: 'a[href="#humanScale"]' },
      { id: 'successStories', link: 'a[href="#successStories"]' },
      { id: 'newsletter', link: 'a[href="#newsletter"]' }
    ];

    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(item => {
      const section = document.getElementById(item.id);
      if (section) {
        window.ScrollTrigger.create({
          trigger: section,
          start: 'top 40%',
          end: 'bottom 40%',
          onToggle: (self) => {
            if (self.isActive) {
              navLinks.forEach(link => link.classList.remove('active'));
              const activeLinks = document.querySelectorAll(item.link);
              activeLinks.forEach(l => l.classList.add('active'));
            }
          }
        });
      }
    });
  }"""

pattern = r'function initNavProgress\(\) \{.*?\}\s*function initNavScroll'
js = re.sub(pattern, new_nav_progress + '\n\n  function initNavScroll', js, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(js)

print("JS nav progress updated.")
