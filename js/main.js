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
    { threshold: 0.5 }
  );

  sections.forEach((s) => sectionObserver.observe(s));
});
