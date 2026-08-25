document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
      themeToggle.textContent = isDark ? '🌙' : '☀️';
    });
  }

  // Mobile Menu Toggle
  const burgerBtn = document.getElementById('burgerBtn');
  const mobilePanel = document.getElementById('mobilePanel');
  if (burgerBtn && mobilePanel) {
    burgerBtn.addEventListener('click', () => {
      mobilePanel.classList.toggle('open');
    });

    mobilePanel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobilePanel.classList.remove('open'));
    });
  }

  // Animated Counters
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 40));

          const tick = () => {
            current += step;
            if (current >= target) {
              el.textContent = target + suffix;
            } else {
              el.textContent = current + suffix;
              requestAnimationFrame(tick);
            }
          };
          tick();
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => counterObserver.observe(c));

  // Timeline Scroll Reveal
  const tlItems = document.querySelectorAll('.tl-item');
  const tlObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          tlObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  tlItems.forEach((item) => tlObserver.observe(item));

  // Render All 28 Indian States
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const activeStates = [
    "Chhattisgarh", "Delhi", "Maharashtra", "Uttar Pradesh", "Madhya Pradesh"
  ];

  const stateGrid = document.getElementById('stateGrid');
  if (stateGrid) {
    states.forEach((state) => {
      const chip = document.createElement('div');
      chip.className = 'chip';
      if (activeStates.includes(state)) {
        chip.classList.add('confirmed');
      }
      chip.textContent = state;
      stateGrid.appendChild(chip);
    });
  }

  // Before / After Slider
  const compareBox = document.getElementById('compareBox');
  const compareHandle = document.getElementById('compareHandle');
  const afterWrap = document.getElementById('afterWrap');
  const dividerLine = document.getElementById('dividerLine');
  const afterImg = document.getElementById('afterImg');

  function updateSlider() {
    if (!compareHandle || !afterWrap || !dividerLine) return;
    const val = compareHandle.value;
    afterWrap.style.width = `${val}%`;
    dividerLine.style.left = `${val}%`;

    if (compareBox && afterImg) {
      afterImg.style.width = `${compareBox.offsetWidth}px`;
    }
  }

  if (compareHandle) {
    compareHandle.addEventListener('input', updateSlider);
    window.addEventListener('resize', updateSlider);
    updateSlider();
  }

  // Contact Form Submission Mock
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formStatus.classList.add('show');
      contactForm.reset();
      setTimeout(() => {
        formStatus.classList.remove('show');
      }, 5000);
    });
  }
});