import re

file_path = '/Users/paman/Downloads/SIMRAN DIDI/web_backup/js/animations.js'

with open(file_path, 'r', encoding='utf-8') as f:
    js = f.read()

new_timeline_js = """  function initTimeline(isDesktop, reduceMotion) {
    if (reduceMotion) return;
    
    const timelineSection = document.getElementById('timeline30m');
    if (!timelineSection) return;
    
    const years = timelineSection.querySelectorAll('.timeline-year');
    if (!years || years.length === 0) return;

    window.gsap.set(years, { opacity: 0.3 });

    const tl = window.gsap.timeline({
      scrollTrigger: {
        trigger: '.timeline',
        start: isDesktop ? 'center center' : 'top center',
        end: '+=1200', 
        pin: isDesktop,
        scrub: 0.5
      }
    });

    years.forEach((year, i) => {
      const badge = year.querySelector('.timeline-icon-badge');
      tl.to(year, { opacity: 1, duration: 1 }, "+=0.2");
      if (badge) {
        tl.to(badge, { scale: 1.25, duration: 1 }, "<");
      }
      if (i < years.length - 1) {
        tl.to(year, { opacity: 0.3, duration: 1 }, "+=0.5");
        if (badge) {
          tl.to(badge, { scale: 1, duration: 1 }, "<");
        }
      }
    });
  }"""

pattern = r'function initTimeline\(isDesktop, reduceMotion\) \{.*?\}\s*function dispose'
js = re.sub(pattern, new_timeline_js + '\n\n  function dispose', js, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(js)

print("Timeline JS animation patched.")
