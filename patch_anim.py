import re

js_path = '/Users/paman/Documents/GitHub/web/www/js/animations.js'
with open(js_path, 'r') as f:
    js = f.read()

timeline_anim = """
  // TIMELINE STAGGER ANIMATION
  const timelineSection = document.getElementById('timeline30m');
  if (timelineSection) {
    const years = timelineSection.querySelectorAll('.timeline-year');
    if (years.length > 0) {
      window.gsap.fromTo(years, 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out'
        }
      );
    }
  }
"""

if "// TIMELINE STAGGER ANIMATION" not in js:
    # Find the closing brace of initScrollTrigger or just append it before the init call
    js = js.replace('window.addEventListener(\'DOMContentLoaded\', () => {', 'window.addEventListener(\'DOMContentLoaded\', () => {\n' + timeline_anim)
    with open(js_path, 'w') as f:
        f.write(js)

print("Patched animations.js")
