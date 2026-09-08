// ============ JP IMPERIAL PORTFOLIO — behavior ============

document.addEventListener('DOMContentLoaded', () => {
  const topNav = document.getElementById('topNav');
  const hero = document.getElementById('hero');
  const railItems = document.querySelectorAll('.page-rail__item');
  const sections = document.querySelectorAll('section[data-page]');

  // ---- Top nav: visible only while Hero is in view ----
  if (hero && topNav) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            topNav.classList.remove('is-hidden');
          } else {
            topNav.classList.add('is-hidden');
          }
        });
      },
      { threshold: [0, 0.4, 1] }
    );
    navObserver.observe(hero);
  }

  // ---- Page rail: click to scroll ----
  railItems.forEach((item) => {
    item.addEventListener('click', () => {
      const target = document.getElementById(item.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ---- Page rail: highlight active section on scroll ----
  // Uses a center-line trick (rootMargin shrinks the viewport to a single
  // horizontal line at 50% height) so detection works regardless of how
  // tall or short any individual section is.
  const railMap = new Map();
  railItems.forEach((item) => railMap.set(item.dataset.target, item));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const railItem = railMap.get(entry.target.id);
        if (!railItem) return;
        if (entry.isIntersecting) {
          railItems.forEach((i) => i.classList.remove('is-active'));
          railItem.classList.add('is-active');
        }
      });
    },
    { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((s) => sectionObserver.observe(s));
});
