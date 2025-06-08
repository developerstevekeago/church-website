      // Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Floating elements animation
        const floatingContainer = document.querySelector('.floating-elements');
        for (let i = 0; i < 8; i++) {
            const shape = document.createElement('div');
            const size = Math.random() * 30 + 20;
            const colors = ['#FF9F1C', '#FFD166', '#06D6A0', '#118AB2'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.backgroundColor = color;
            shape.style.top = `${Math.random() * 80 + 10}%`;
            shape.style.left = `${Math.random() * 80 + 10}%`;
            shape.style.animationDelay = `${Math.random() * 10}s`;
            shape.style.animationDuration = `${Math.random() * 10 + 10}s`;
            
            floatingContainer.appendChild(shape);
        }


        // Fade-in animation for mission section on scroll
const missionSection = document.querySelector('#mission-values');

const fadeInOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  const sectionTop = missionSection.getBoundingClientRect().top;

  if (sectionTop < triggerBottom) {
    missionSection.classList.add('fade-in');
    window.removeEventListener('scroll', fadeInOnScroll);
  }
};

window.addEventListener('scroll', fadeInOnScroll);




const ageSection = document.querySelector('#age-groups');

const fadeInAgeSection = () => {
  const triggerPoint = window.innerHeight * 0.85;
  const top = ageSection.getBoundingClientRect().top;

  if (top < triggerPoint) {
    ageSection.classList.add('fade-in');
    window.removeEventListener('scroll', fadeInAgeSection);
  }
};

window.addEventListener('scroll', fadeInAgeSection);



const modal = document.getElementById('event-modal');
const modalTitle = modal.querySelector('#modal-title');
const modalDesc = modal.querySelector('#modal-desc');
const modalClose = modal.querySelector('.modal-close');

document.querySelectorAll('.learn-more-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.event-card');
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.details;
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
  });
});

// Close modal on close button click
modalClose.addEventListener('click', () => {
  modal.setAttribute('aria-hidden', 'true');
});

// Close modal on outside click
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.setAttribute('aria-hidden', 'true');
  }
});

// Accessibility: Close modal on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape" && modal.getAttribute('aria-hidden') === 'false') {
    modal.setAttribute('aria-hidden', 'true');
  }
});



document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);
    const answer = button.nextElementSibling;
    if (!expanded) {
      answer.removeAttribute('hidden');
      button.querySelector('.arrow').textContent = '▲';
    } else {
      answer.setAttribute('hidden', '');
      button.querySelector('.arrow').textContent = '▼';
    }
  });
});


document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const answer = button.nextElementSibling;

    if (!expanded) {
      button.setAttribute('aria-expanded', true);
      answer.hidden = false;
      button.querySelector('.arrow').textContent = '▲';
    } else {
      button.setAttribute('aria-expanded', false);
      // Add a slight delay before hiding to allow fade-out transition
      answer.style.opacity = '0';
      setTimeout(() => {
        answer.hidden = true;
        answer.style.opacity = '';
      }, 500);
      button.querySelector('.arrow').textContent = '▼';
    }
  });
});



const filterButtons = document.querySelectorAll('.filter-buttons button');
const photoItems = document.querySelectorAll('.photo-item');
const modaz = document.getElementById('fullscreen-modal');
const modalImg = modal.querySelector('.fullscreen-img');
const closeBtn = modal.querySelector('.close-btn');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    photoItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Open modal on image click
photoItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modaz.classList.add('show');
    modaz.setAttribute('aria-hidden', 'false');
  });
});

// Close modal
closeBtn.addEventListener('click', () => {
  modaz.classList.remove('show');
  modaz.setAttribute('aria-hidden', 'true');
});

// Also close modal if clicking outside the image
modaz.addEventListener('click', (e) => {
  if (e.target === modal) {
    modaz.classList.remove('show');
    modaz.setAttribute('aria-hidden', 'true');
  }
});



