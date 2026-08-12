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

    const morphSvg = document.getElementById('timelineMorphSvg');
    const morphText = document.getElementById('timelineMorphText');
    const morphBadge = document.getElementById('timelineMorphBadge');

    const ERAS = [
      {
        text: '2002 · ONE BICYCLE',
        svg: '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L9.5 10 5.5 17.5M12 17.5l4-7.5h-5.5"/>'
      },
      {
        text: '2008 · RURAL MOTORCYCLES',
        svg: '<circle cx="6" cy="16" r="3"/><circle cx="18" cy="16" r="3"/><path d="M9 16l3-6h5l2 3M6 16l3-9h4"/>'
      },
      {
        text: '2023 · SELF-SUFFICIENCY',
        svg: '<path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11"/>'
      },
      {
        text: '2025 · 575K WOMEN REACHED',
        svg: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'
      },
      {
        text: '2026+ · THE NEXT MILLION',
        svg: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
      }
    ];

    let currentEraIdx = -1;

    window.gsap.set(years, { opacity: 0.3 });

    const tl = window.gsap.timeline({
      scrollTrigger: {
        trigger: '.timeline',
        start: isDesktop ? 'center center' : 'top center',
        end: '+=1200', 
        pin: isDesktop,
        scrub: 0.5,
        onUpdate: (self) => {
          const eraIdx = Math.min(4, Math.floor(self.progress * 5));
          if (eraIdx !== currentEraIdx) {
            currentEraIdx = eraIdx;
            const era = ERAS[eraIdx];
            if (morphSvg) morphSvg.innerHTML = era.svg;
            if (morphText) morphText.textContent = era.text;
            if (morphBadge) {
              window.gsap.fromTo(morphBadge, 
                { scale: 0.85, rotation: -10 }, 
                { scale: 1, rotation: 0, duration: 0.35, ease: 'back.out(2)' }
              );
            }
          }
        }
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

print("Real-time monochrome morphing JS patched.")
