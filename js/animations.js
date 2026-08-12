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
            start: 'top 88%',
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
    const millionPillars = document.getElementById('millionPillars');

    if (!millionNum) return;

    if (millionText1 && !millionText1.textContent.trim()) millionText1.textContent = 'ONE MILLION IS NOT A NUMBER.';
    if (millionText2 && !millionText2.textContent.trim()) millionText2.textContent = 'IT IS ONE MILLION OPPORTUNITIES.';
    if (millionDetail && !millionDetail.textContent.trim()) millionDetail.textContent = 'One million businesses started. One million households secured. Four million children in school.';

    const step1 = document.getElementById('millionStep1');
    const step2 = document.getElementById('millionStep2');

    if (!isDesktop) {
      if (step1) {
        step1.style.opacity = '0';
        step1.style.visibility = 'hidden';
      }
      if (step2) {
        step2.style.opacity = '1';
        step2.style.visibility = 'visible';
      }
      if (millionText1) millionText1.style.opacity = '1';
      if (millionText2) millionText2.style.opacity = '1';
      if (millionDetail) millionDetail.style.opacity = '1';
      if (millionPillars) millionPillars.style.opacity = '1';
      return;
    }

    if (millionText1) millionText1.style.opacity = '0';
    if (millionText2) millionText2.style.opacity = '0';
    if (millionDetail) millionDetail.style.opacity = '0';
    if (millionPillars) millionPillars.style.opacity = '0';

    const obj = { val: 160000 };

    window.gsap.to(obj, {
      val: 1000000,
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: 'top top',
        end: '+=900',
        pin: isDesktop,
        scrub: reduceMotion ? false : 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          if (p < 0.5) {
            if (step1) { step1.style.visibility = 'visible'; step1.style.opacity = '1'; }
            if (step2) { step2.style.visibility = 'hidden'; step2.style.opacity = '0'; }

            const mappedVal = Math.floor(obj.val);
            millionNum.textContent = mappedVal.toLocaleString();
            if (millionFrom) millionFrom.textContent = p < 0.1 ? 'FROM' : 'GROWING';
            if (millionContext) millionContext.textContent = 'WOMEN / YEAR';
          } 
          else if (p < 0.6) {
            const localP = (p - 0.5) / 0.1;
            if (step1) {
              step1.style.opacity = String(1 - localP);
              if (1 - localP <= 0) step1.style.visibility = 'hidden';
            }
            if (step2) {
              step2.style.visibility = 'visible';
              step2.style.opacity = String(localP);
            }
            if (millionText1) millionText1.style.opacity = '1';
            if (millionText2) millionText2.style.opacity = '0';
            if (millionDetail) millionDetail.style.opacity = '0';
            if (millionPillars) millionPillars.style.opacity = '0';
          }
          else if (p < 0.7) {
            if (step1) step1.style.visibility = 'hidden';
            if (step2) { step2.style.visibility = 'visible'; step2.style.opacity = '1'; }

            const localP = (p - 0.6) / 0.1;
            if (millionText1) millionText1.style.opacity = '1';
            if (millionText2) millionText2.style.opacity = String(localP);
            if (millionDetail) millionDetail.style.opacity = '0';
            if (millionPillars) millionPillars.style.opacity = '0';
          }
          else if (p < 0.8) {
            if (step1) step1.style.visibility = 'hidden';
            if (step2) { step2.style.visibility = 'visible'; step2.style.opacity = '1'; }

            const localP = (p - 0.7) / 0.1;
            if (millionText1) millionText1.style.opacity = '1';
            if (millionText2) millionText2.style.opacity = '1';
            if (millionDetail) millionDetail.style.opacity = String(localP);
            if (millionPillars) millionPillars.style.opacity = '0';
          }
          else {
            if (step1) step1.style.visibility = 'hidden';
            if (step2) { step2.style.visibility = 'visible'; step2.style.opacity = '1'; }

            const localP = Math.min(1, (p - 0.8) / 0.15);
            if (millionText1) millionText1.style.opacity = '1';
            if (millionText2) millionText2.style.opacity = '1';
            if (millionDetail) millionDetail.style.opacity = '1';
            if (millionPillars) millionPillars.style.opacity = String(localP);
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
