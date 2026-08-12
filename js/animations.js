(function() {
  'use strict';
  
  let mm;

  function init() {
    if (!window.gsap || !window.ScrollTrigger) {
      console.warn('GSAP or ScrollTrigger not found.');
      return;
    }
    window.gsap.registerPlugin(window.ScrollTrigger);
    
    mm = window.gsap.matchMedia();
 
    // Setup animations that respect user preferences and screen sizing
    mm.add({
      reduceMotion: "(prefers-reduced-motion: reduce)",
      isDesktop: "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
      isMobile: "(max-width: 768px) or (prefers-reduced-motion: reduce)"
    }, (context) => {
      let { reduceMotion, isDesktop, isMobile } = context.conditions;
 
      initNavScroll();
      initFundingGap(isDesktop, reduceMotion);
      initOneMillion(isDesktop, reduceMotion);
      initReveals(reduceMotion);
      initTimeline(isDesktop, reduceMotion);
      initNavProgress();
      initSceneIntegration();
    });
  }
  
  function initReveals(reduceMotion) {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
      window.gsap.fromTo(el, 
        { autoAlpha: 0, y: reduceMotion ? 0 : 20 }, 
        { 
          autoAlpha: 1, 
          y: 0, 
          duration: reduceMotion ? 0.1 : 0.8, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            once: true
          }
        }
      );
    });

    const evGrids = document.querySelectorAll('.ev-grid');
    evGrids.forEach(grid => {
      const cards = grid.children;
      window.gsap.fromTo(cards,
        { autoAlpha: 0, y: reduceMotion ? 0 : 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: reduceMotion ? 0.1 : 0.6,
          stagger: reduceMotion ? 0 : 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 88%',
            once: true
          }
        }
      );
    });
  }

    function initNavProgress() {
    const sections = [
      { id: 'humanModel', link: 'a[href="#humanModel"]' },
      { id: 'humanScale', link: 'a[href="#humanScale"]' },
      { id: 'fundingEngine', link: 'a[href="#fundingEngine"]' },
      { id: 'simulator', link: 'a[href="#simulator"]' },
      { id: 'partnership', link: 'a[href="#partnership"]' },
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
  }

  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      lastScroll = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (lastScroll > 80) {
            nav.classList.add('scrolled');
          } else {
            nav.classList.remove('scrolled');
          }
          const btt = document.getElementById('backToTop');
          if (btt) {
            if (lastScroll > 500) btt.classList.add('active');
            else btt.classList.remove('active');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  function initFundingGap(isDesktop, reduceMotion) {
    const wrap = document.querySelector('.gap-wrap');
    if (!wrap) return;

    const gapNumber = document.getElementById('gapNumber');
    const gapLabel = document.getElementById('gapLabel');
    const gapContext = document.getElementById('gapContext');

    if (!gapNumber || !gapLabel || !gapContext) return;

    if (!isDesktop) {
      gapNumber.textContent = '$30M';
      gapNumber.style.color = 'var(--canopy)';
      gapLabel.textContent = 'SIX-YEAR AMBITION';
      gapContext.textContent = 'Total capital required to reach 1M women annually by 2035.';
      return;
    }

    window.ScrollTrigger.create({
      trigger: wrap,
      start: 'top top',
      end: '+=700',
      pin: isDesktop,
      scrub: reduceMotion ? false : 0.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        
        if (p < 0.33) {
          gapNumber.textContent = '$1.52M';
          gapNumber.style.color = 'var(--ink)';
          gapLabel.textContent = '2024 BASELINE';
          gapContext.textContent = 'Current annual donation income. 84% from UK + Europe.';
        } else if (p < 0.66) {
          gapNumber.textContent = '$3M+';
          gapNumber.style.color = 'var(--gold)';
          gapLabel.textContent = 'FIRST-YEAR TARGET';
          gapContext.textContent = 'Required to fund scale-up initiatives and diversification.';
        } else {
          gapNumber.textContent = '$30M';
          gapNumber.style.color = 'var(--canopy)';
          gapLabel.textContent = 'SIX-YEAR AMBITION';
          gapContext.textContent = 'Total capital required to reach 1M women annually by 2035.';
        }
      }
    });
  }

  function initOneMillion(isDesktop, reduceMotion) {
    const wrap = document.querySelector('.million-wrap');
    if (!wrap) return;

    const millionFrom = document.getElementById('millionFrom');
    const millionNum = document.getElementById('millionNum');
    const millionContext = document.getElementById('millionContext');
    const millionText1 = document.getElementById('millionText1');
    const millionText2 = document.getElementById('millionText2');
    const millionDetail = document.getElementById('millionDetail');

    if (!millionNum) return;

    const step1 = document.getElementById('millionStep1');
    const step2 = document.getElementById('millionStep2');

    if (step1) {
      step1.style.opacity = '1';
      step1.style.visibility = 'visible';
      step1.style.transform = 'translate(-50%, -50%) scale(1)';
    }
    if (step2) {
      step2.style.opacity = '0';
      step2.style.visibility = 'visible';
      step2.style.transform = 'translate(-50%, -45%) scale(0.95)';
    }

    if (millionText1) millionText1.textContent = 'ONE MILLION IS NOT A NUMBER.';
    if (millionText2) millionText2.textContent = 'IT IS ONE MILLION OPPORTUNITIES.';
    if (millionDetail) millionDetail.textContent = 'One million businesses started. One million households secured. Four million children in school.';

    millionNum.textContent = '160,000';
    if (millionFrom) millionFrom.textContent = 'ANNUAL CLIENTS';
    if (millionContext) millionContext.textContent = 'WOMEN / YEAR';

    window.ScrollTrigger.create({
      trigger: wrap,
      start: 'top top',
      end: '+=800',
      pin: isDesktop,
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;

        if (p < 0.45) {
          const localP = p / 0.45;
          const mappedVal = Math.floor(160000 + localP * (575000 - 160000));
          millionNum.textContent = mappedVal.toLocaleString() + (localP > 0.9 ? '+' : '');
          if (millionFrom) millionFrom.textContent = localP < 0.1 ? 'ANNUAL CLIENTS' : 'REACHED TO DATE';
          if (millionContext) millionContext.textContent = 'CUMULATIVE WOMEN IMPACTED';

          if (step1) {
            step1.style.opacity = '1';
            step1.style.transform = 'translate(-50%, -50%) scale(' + (1 + localP * 0.05) + ')';
          }
          if (step2) {
            step2.style.opacity = '0';
            step2.style.transform = 'translate(-50%, -45%) scale(0.95)';
          }
        } 
        else if (p < 0.55) {
          const localP = (p - 0.45) / 0.1;
          if (step1) {
            step1.style.opacity = String(1 - localP);
            step1.style.transform = 'translate(-50%, -55%) scale(' + (1.05 - localP * 0.1) + ')';
          }
          if (step2) {
            step2.style.opacity = String(localP);
            step2.style.transform = 'translate(-50%, ' + (-45 - localP * 5) + '%) scale(' + (0.95 + localP * 0.05) + ')';
          }
        } 
        else {
          if (step1) {
            step1.style.opacity = '0';
          }
          if (step2) {
            step2.style.opacity = '1';
            step2.style.transform = 'translate(-50%, -50%) scale(1)';
          }
        }
      }
    });
  }

  function initSceneIntegration() {
    if (!window.MLScene) return;
    const concentrationSection = document.getElementById('concentration');
    if (!concentrationSection) return;

    window.ScrollTrigger.create({
      trigger: concentrationSection,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onEnter: () => {
        if (typeof window.MLScene.resume === 'function') {
          window.MLScene.resume();
        }
      },
      onLeave: () => {
        if (typeof window.MLScene.pause === 'function') {
          window.MLScene.pause();
        }
      },
      onEnterBack: () => {
        if (typeof window.MLScene.resume === 'function') {
          window.MLScene.resume();
        }
      },
      onLeaveBack: () => {
        if (typeof window.MLScene.pause === 'function') {
          window.MLScene.pause();
        }
      },
      onUpdate: (self) => {
        if (typeof window.MLScene.setProgress === 'function') {
          window.MLScene.setProgress(self.progress);
        }
      }
    });
  }

  function initTimeline(isDesktop, reduceMotion) {
    if (reduceMotion) return;
    
    const timelineSection = document.getElementById('timeline30m');
    if (!timelineSection) return;
    
    const nodes = timelineSection.querySelectorAll('.timeline-node');
    if (!nodes || nodes.length === 0) return;

    const travelingSvg = document.getElementById('timelineTravelingSvg');
    const travelingBadge = document.getElementById('timelineTravelingBadge');

    const ERAS = [
      { svg: '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L9.5 10 5.5 17.5M12 17.5l4-7.5h-5.5"/>' },
      { svg: '<circle cx="6" cy="16" r="3"/><circle cx="18" cy="16" r="3"/><path d="M9 16l3-6h5l2 3M6 16l3-9h4"/>' },
      { svg: '<path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11"/>' },
      { svg: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/>' },
      { svg: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>' }
    ];

    let currentEraIdx = -1;

    window.gsap.set(nodes, { opacity: 0.3 });

    window.ScrollTrigger.create({
      trigger: '.timeline-container',
      start: 'top 60%',
      end: 'bottom 60%',
      scrub: 0.4,
      onUpdate: (self) => {
        if (travelingBadge) {
          const posY = Math.min(95, Math.max(0, self.progress * 100));
          travelingBadge.style.top = posY + '%';
        }

        const eraIdx = Math.min(ERAS.length - 1, Math.floor(self.progress * ERAS.length));
        if (eraIdx !== currentEraIdx) {
          currentEraIdx = eraIdx;
          const era = ERAS[eraIdx];
          if (travelingSvg) travelingSvg.innerHTML = era.svg;
          if (travelingBadge) {
            window.gsap.fromTo(travelingBadge, 
              { scale: 0.75, rotation: -15 }, 
              { scale: 1, rotation: 0, duration: 0.3, ease: 'back.out(2)' }
            );
          }

          nodes.forEach((n, idx) => {
            if (idx === eraIdx) {
              window.gsap.to(n, { opacity: 1, duration: 0.3 });
            } else {
              window.gsap.to(n, { opacity: 0.3, duration: 0.3 });
            }
          });
        }
      }
    });
  }

  function dispose() {
    if (mm) {
      mm.revert();
    } else if (window.ScrollTrigger) {
      window.ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }

  window.MLAnimations = { init, dispose };
})();
