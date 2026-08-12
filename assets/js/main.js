/*=============== NAVIGATION MENU TOGGLE ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navOverlay = document.getElementById('nav-overlay');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
    navOverlay.classList.add('show-overlay');
    document.body.style.overflow = 'hidden';
  });
}

// Hide menu
const closeMenu = () => {
  navMenu.classList.remove('show-menu');
  navOverlay.classList.remove('show-overlay');
  document.body.style.overflow = 'auto';
};

if (navClose) navClose.addEventListener('click', closeMenu);
if (navOverlay) navOverlay.addEventListener('click', closeMenu);

navLinks.forEach(link => link.addEventListener('click', closeMenu));


/*=============== STICKY HEADER ===============*/
const scrollHeader = () => {
  const header = document.getElementById('header');
  if (window.scrollY >= 50) {
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }
};
window.addEventListener('scroll', scrollHeader);


/*=============== SCROLLSECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');
    const sectionsClass = document.querySelector(`.nav__menu a[href*='${sectionId}']`);

    if (sectionsClass) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        sectionsClass.classList.add('active-link');
      } else {
        sectionsClass.classList.remove('active-link');
      }
    }
  });
};
window.addEventListener('scroll', scrollActive);


/*=============== MULTI-ROLE TYPEWRITER ANIMATION ===============*/
const typingElement = document.getElementById('typing');
if (typingElement) {
  const roles = [
    "Full-Stack Web Developer",
    "DSA & Problem Solving Enthusiast",
    "B.Tech CSE Student",
    "Software Engineering Aspirant"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeRoles = () => {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(typeRoles, typeSpeed);
  };

  typeRoles();
}


/*=============== SKILLS FILTER TABS ===============*/
const filterBtns = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    skillCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});


/*=============== JOURNEY / TIMELINE TABS ===============*/
const journeyTabs = document.querySelectorAll('.journey__tab');
const journeyContents = document.querySelectorAll('.journey__content');

journeyTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetSelector = tab.getAttribute('data-target');
    const targetContent = document.querySelector(targetSelector);

    journeyTabs.forEach(t => t.classList.remove('active'));
    journeyContents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    if (targetContent) {
      targetContent.classList.add('active');
    }
  });
});


/*=============== STATS COUNTER ANIMATION ===============*/
const statNumbers = document.querySelectorAll('.stat__number');
let animatedStats = false;

const animateStats = () => {
  const statsSection = document.querySelector('.stats');
  if (!statsSection) return;

  const sectionPos = statsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.3;

  if (sectionPos < screenPos && !animatedStats) {
    animatedStats = true;
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      let count = 0;
      const duration = 1500; // Total animation time
      const increment = Math.ceil(target / (duration / 20));

      const updateCount = () => {
        count += increment;
        if (count >= target) {
          const suffix = target >= 10 ? '+' : (target === 1 ? 'st' : target === 2 ? 'nd' : target === 3 ? 'rd' : 'th');
          stat.textContent = target + suffix;
        } else {
          stat.textContent = count + '+';
          setTimeout(updateCount, 20);
        }
      };
      updateCount();
    });
  }
};
window.addEventListener('scroll', animateStats);


/*=============== TOAST NOTIFICATIONS & COPY EMAIL ===============*/
const showToast = (message, iconClass = 'ri-checkbox-circle-fill') => {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="${iconClass}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
};

const copyEmailBtn = document.getElementById('copy-email-btn');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', () => {
    const emailText = 'mansirajput9045@gmail.com';
    navigator.clipboard.writeText(emailText).then(() => {
      showToast('Email address copied to clipboard!');
    }).catch(() => {
      showToast('Failed to copy email', 'ri-error-warning-fill');
    });
  });
}


/*=============== INTERACTIVE CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.form__submit-btn');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `<span>Sending...</span> <i class="ri-loader-4-line ri-spin"></i>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      showToast('Thank you! Your message has been sent.');
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}


/*=============== BACK TO TOP & SCROLL PROGRESS ===============*/
const scrollTopBtn = document.getElementById('scroll-top');
const progressPath = document.querySelector('.scroll-top__circle path');

if (progressPath) {
  const pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
  progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

  const updateScrollProgress = () => {
    const scroll = window.pageYOffset;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;

    if (scroll >= 300) {
      scrollTopBtn.classList.add('show-scroll');
    } else {
      scrollTopBtn.classList.remove('show-scroll');
    }
  };

  window.addEventListener('scroll', updateScrollProgress);
}


/*=============== CUSTOM GLOW CURSOR ===============*/
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');
const pointerGlow = document.getElementById('pointer-glow');

if (cursorDot && cursorOutline && pointerGlow && window.innerWidth > 768) {
  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

    pointerGlow.style.left = `${mouseX}px`;
    pointerGlow.style.top = `${mouseY}px`;
  });

  const animateCursor = () => {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateCursor);
  };
  animateCursor();
}


/*=============== SCROLL REVEAL ANIMATIONS ===============*/
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1200,
    delay: 200,
    reset: false
  });

  sr.reveal('.home__content, .home__image-wrapper, .section__header');
  sr.reveal('.stat__card', { interval: 150 });
  sr.reveal('.about__content, .about__highlights', { delay: 300 });
  sr.reveal('.skills__filters', { delay: 200 });
  sr.reveal('.skill-card', { interval: 100 });
  sr.reveal('.project-card', { interval: 150 });
  sr.reveal('.journey__tabs, .journey__content', { delay: 200 });
  sr.reveal('.contact__info, .contact__form', { interval: 200 });
}
