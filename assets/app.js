// CertHR AI Lab — minimal interactions
(function () {
  // year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // theme toggle
  const root = document.documentElement;
  const btn = document.querySelector('[data-theme-toggle]');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let mode = prefersDark ? 'dark' : 'light';
  root.setAttribute('data-theme', mode);
  const renderIcon = () => {
    if (!btn) return;
    btn.innerHTML =
      mode === 'dark'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    btn.setAttribute('aria-label', mode === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
  };
  renderIcon();
  if (btn)
    btn.addEventListener('click', () => {
      mode = mode === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', mode);
      renderIcon();
    });

  // mobile menu
  const menuBtn = document.querySelector('.menu-toggle');
  const header = document.querySelector('.site-header');
  if (menuBtn && header) {
    menuBtn.addEventListener('click', () => {
      const open = header.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    header.querySelectorAll('.site-nav a').forEach((a) =>
      a.addEventListener('click', () => {
        header.classList.remove('nav-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }),
    );
  }

  // reveal on scroll — mark page as reveal-ready ONLY when IO is available
  const els = document.querySelectorAll('.hero-dash, .problem, .tool, .service, .plan, .resource, .flagship-steps li, .diagram, .strip-text, .cta-card');
  els.forEach((el) => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    root.setAttribute('data-reveal-ready', '');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );
    els.forEach((el) => io.observe(el));
    // safety net: reveal everything after 3s regardless
    setTimeout(() => els.forEach((el) => el.classList.add('in')), 3000);
  } else {
    els.forEach((el) => el.classList.add('in'));
  }
})();
