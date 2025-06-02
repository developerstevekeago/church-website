// index.html 
// contains code for the 
// navigation menu, sliding images, animated counters, testimonials, event cards, service cards, and form submission handling
// Navigation menu toggle for mobile


function toggleMenu() {
  const menu = document.getElementById("navMenu");
  menu.classList.toggle("show");
}

// Sliding images from right to left
const images = document.querySelectorAll(".about-gallery img");
let current = 0;
let prev = images.length - 1;
images[current].classList.add("active");
images[prev].classList.remove("active");
images[prev].classList.remove("prev");

setInterval(() => {
  images[prev].classList.remove("prev");
  images[current].classList.remove("active");
  prev = current;
  current = (current + 1) % images.length;
  images[prev].classList.add("prev");
  images[current].classList.add("active");
}, 3000);

// Animated counters for about icons
function animateCounter(element, end, duration) {
  let start = 0;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent =
      Math.floor(progress * (end - start) + start) + (end > 50 ? "+" : "");
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end + (end > 50 ? "+" : "");
    }
  };
  window.requestAnimationFrame(step);
}

window.addEventListener("DOMContentLoaded", () => {
  animateCounter(document.querySelectorAll(".about-icon-label")[0], 300, 1200);
  animateCounter(document.querySelectorAll(".about-icon-label")[1], 12, 1000);
  animateCounter(document.querySelectorAll(".about-icon-label")[2], 1, 800);
});

    // Add this at the end of your HTML file, before </body>
document.addEventListener('DOMContentLoaded', function() {
  const testimonials = document.querySelectorAll('.testimonial-card');
  let current = 0;
  if (testimonials.length > 1) {
    testimonials.forEach((card, i) => {
      card.style.display = i === 0 ? 'flex' : 'none';
    });
    setInterval(() => {
      testimonials[current].style.display = 'none';
      current = (current + 1) % testimonials.length;
      testimonials[current].style.display = 'flex';
    }, 5000);
  }
});

const track = document.getElementById("track");
const cards = document.querySelectorAll(".event-card");
const cardWidth = cards[0].offsetWidth + 20; // including gap
let position = 0;
const maxPosition = -(cardWidth * (cards.length - 3));

function moveLeft() {
  position = Math.min(position + cardWidth, 0);
  track.style.transform = `translateX(${position}px)`;
}

function moveRight() {
  position = Math.max(position - cardWidth, maxPosition);
  track.style.transform = `translateX(${position}px)`;
}

// Auto-scroll every 5 seconds
setInterval(() => {
  if (position <= maxPosition) {
    position = 0;
  } else {
    position -= cardWidth;
  }
  track.style.transform = `translateX(${position}px)`;
}, 5000);

function toggleDetails(card) {
  const detail = card.querySelector(".details");
  const isOpen = detail.style.display === "block";
  document
    .querySelectorAll(".service-card .details")
    .forEach((d) => (d.style.display = "none"));
  if (!isOpen) detail.style.display = "block";
}

// VanillaTilt initialization for tilt effect on cards
VanillaTilt.init(document.querySelectorAll(".tilt"), {
  max: 10,
  speed: 300,
  glare: true,
  "max-glare": 0.2,
  scale: 1.03,
});

// Function to toggle the visibility of the mobile navigation menu
VanillaTilt.init(document.querySelectorAll(".tilt"), {
  max: 10,
  speed: 400,
  scale: 1.05,
  glare: true,
  "max-glare": 0.3,
});

document.addEventListener("DOMContentLoaded", function () {
  // Form submission handling
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Here you would typically send the data to a server
      // For now, we'll just log it and show a success message
      console.log("Form submitted:", { name, email, message });

      // Show success message
      alert("Thank you for your message! We will get back to you soon.");

      // Reset form
      contactForm.reset();
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Social media links - track clicks (optional)
  document
    .querySelectorAll('.social-icons a, .contact-link[target="_blank"]')
    .forEach((link) => {
      link.addEventListener("click", function () {
        // You could add analytics tracking here
        console.log("Social link clicked:", this.href);
      });
    });
});

document
  .getElementById("dismiss-banner")
  .addEventListener("click", function () {
    const banner = document.getElementById("emergency-banner");
    banner.style.display = "none";
  });
