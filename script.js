// ===== AOS Animations =====
AOS.init({
  duration: 900,
  easing: 'ease-out-quart',
  once: true
});

// ===== Footer Year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Navbar Shrink on Scroll =====
const nav = document.getElementById('site-nav');
const onScroll = () => {
  if (!nav) return;
  if (window.scrollY > 24) nav.classList.add('nav-compact');
  else nav.classList.remove('nav-compact');
};
document.addEventListener('scroll', onScroll, { passive: true });

// ===== Fade-in Fallback for Non-AOS Browsers =====
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('show');
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.fade').forEach((el) => io.observe(el));

// ===== Animated Counters (About Section) =====
const animateCounter = (el, target, dur = 1400) => {
  let start = 0;
  const step = Math.max(1, Math.ceil(target / (dur / 16)));
  const tick = () => {
    start += step;
    if (start < target) {
      el.textContent = start.toLocaleString();
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString();
    }
  };
  tick();
};

const countersObserved = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.counter').forEach((c) => {
          const t = parseInt(c.getAttribute('data-target'), 10) || 0;
          animateCounter(c, t);
        });
        countersObserved.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 }
);
const aboutSection = document.getElementById('about');
if (aboutSection) countersObserved.observe(aboutSection);

// ===== Mobile Menu (Slide Animation + Close on Link Click) =====
const menuBtn = document.getElementById('menuBtn');
const mobileOverlay = document.getElementById('mobileOverlay');
const closeMenuBtn = document.getElementById('closeMenu');
let scrollY = 0;

function openMenu() {
  if (!mobileOverlay) return;
  scrollY = window.scrollY;
  document.body.classList.add('menu-open');
  mobileOverlay.classList.add('open');
  mobileOverlay.setAttribute('aria-hidden', 'false');
}

function closeMenu() {
  if (!mobileOverlay) return;
  mobileOverlay.classList.remove('open');
  mobileOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
  window.scrollTo(0, scrollY);
}

menuBtn?.addEventListener('click', openMenu);
closeMenuBtn?.addEventListener('click', closeMenu);

// Close when clicking a nav link
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close with ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileOverlay?.classList.contains('open')) closeMenu();
});


// ===== Slider Controls =====
const carousel = document.getElementById('brandCarousel');
document.getElementById('slidePrev')?.addEventListener('click', () => {
  carousel.scrollBy({ left: -300, behavior: 'smooth' });
});
document.getElementById('slideNext')?.addEventListener('click', () => {
  carousel.scrollBy({ left: 300, behavior: 'smooth' });
});

// ===== Modal Logic =====
const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const closeModalBtn = document.getElementById('closeModal');

const openModal = (img, title, desc) => {
  modalImg.src = img;
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  modal.classList.remove('show');
  document.body.style.overflow = '';
};

// Open modal
document.querySelectorAll('.brand').forEach((item) => {
  item.addEventListener('click', () => {
    openModal(item.dataset.img, item.dataset.title, item.dataset.desc);
  });
});

// Close modal by click, Esc, or backdrop
closeModalBtn?.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

// ===== Netlify Form Submission + Success Popup =====
const contactForm = document.getElementById('contactForm');
const successPopup = document.getElementById('successPopup');
const closeSuccess = document.getElementById('closeSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });
      contactForm.reset();
      successPopup.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    } catch (err) {
      alert('There was an issue sending your message. Please try again.');
    }
  });
}

closeSuccess?.addEventListener('click', () => {
  successPopup.classList.add('hidden');
  document.body.style.overflow = '';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !successPopup.classList.contains('hidden')) {
    successPopup.classList.add('hidden');
    document.body.style.overflow = '';
  }
});