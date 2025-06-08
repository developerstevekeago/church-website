// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.women-nav ul');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.women-nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.women-header');
    if (window.scrollY > 50) {
        header.style.background = 'var(--sda-blue)';
    } else {
        header.style.background = 'rgba(0, 51, 102, 0.9)';
    }
});




  const modal = document.getElementById('eventModal');
  const modalTitle = document.getElementById('modalTitle');
  const closeBtn = document.querySelector('.close-modal');
  const form = document.getElementById('signupForm');

  document.querySelectorAll('.signup-link').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const eventTitle = this.dataset.event;
      modalTitle.textContent = `Sign Up: ${eventTitle}`;
      modal.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert("Thanks for signing up! We'll contact you soon.");
    form.reset();
    modal.style.display = 'none';
  });



//  


  const slides = document.querySelectorAll('.testimony-slide');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});