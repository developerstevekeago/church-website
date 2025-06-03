   
   // Mobile Menu Toggle
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.mobile-menu').classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Close mobile menu if open
    document.querySelector('.mobile-menu-toggle').classList.remove('active');
    document.querySelector('.mobile-menu').classList.remove('active');
    
    // Scroll to section
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});

// Sticky header on scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('.ministry-header');
  if (window.scrollY > 150) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});
   
   
   
   // Typewriter Effect
    const phrases = [
      "A Generation on Fire for Christ.",
      "We worship.",
      "We serve.",
      "We grow.",
      "We lead."
    ];
    let currentPhrase = 0;
    let currentLetter = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
      const typewriter = document.getElementById('typewriter');
      const currentText = phrases[currentPhrase].substring(0, currentLetter);
      
      typewriter.innerHTML = `<span class="typewriter-text">${currentText}</span>`;
      
      if (!isDeleting && currentLetter === phrases[currentPhrase].length) {
        // Pause at end of phrase
        isDeleting = true;
        setTimeout(typeWriter, 1500);
      } else if (isDeleting && currentLetter === 0) {
        // Move to next phrase
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        setTimeout(typeWriter, 500);
      } else {
        // Continue typing/deleting
        if (isDeleting) {
          currentLetter--;
        } else {
          currentLetter++;
        }
        const speedVariation = Math.random() * 50;
        setTimeout(typeWriter, isDeleting ? typingSpeed/2 : typingSpeed + speedVariation);
      }
    }
    
    // Carousel Auto-rotation
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    
    function rotateCarousel() {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }
    
    // Initialize effects
    window.onload = function() {
      // Start typewriter effect
      setTimeout(typeWriter, 1000);
      
      // Start carousel rotation every 5 seconds
      setInterval(rotateCarousel, 5000);
      
      // Add scroll animation
      document.querySelector('.scroll-cue').addEventListener('click', function() {
        window.scrollBy({
          top: window.innerHeight - 100,
          behavior: 'smooth'
        });
      });
    };


    // paralax effect

    // Initialize Parallax effect
document.addEventListener('DOMContentLoaded', function() {
  // Simple parallax implementation
  const parallaxBg = document.querySelector('.parallax-bg');
  const parallaxSection = document.querySelector('.parallax-section');
  
  if (parallaxSection) {
    parallaxSection.addEventListener('mousemove', function(e) {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      parallaxBg.style.transform = `translate(-${x * 30}px, -${y * 30}px)`;
    });
  }
  
  // Initialize AOS (Animate On Scroll) library
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-in-out'
  });
  
  // Floating cards animation
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
});



// Tab functionality
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons and tabs
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    
    // Add active class to clicked button and corresponding tab
    btn.classList.add('active');
    const tabId = btn.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// Make calendar emojis draggable for fun interaction
document.querySelectorAll('.floating-dates span').forEach(emoji => {
  emoji.setAttribute('draggable', 'true');
  
  emoji.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', emoji.textContent);
    setTimeout(() => emoji.style.visibility = 'hidden', 0);
  });
  
  emoji.addEventListener('dragend', () => {
    emoji.style.visibility = 'visible';
  });
});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
});

document.addEventListener('drop', (e) => {
  e.preventDefault();
  const emoji = e.dataTransfer.getData('text/plain');
  if (emoji) {
    const newEmoji = document.createElement('span');
    newEmoji.textContent = emoji;
    newEmoji.style.position = 'absolute';
    newEmoji.style.left = `${e.clientX}px`;
    newEmoji.style.top = `${e.clientY}px`;
    newEmoji.style.fontSize = '3rem';
    newEmoji.style.opacity = '0.5';
    newEmoji.style.animation = 'none';
    document.querySelector('.floating-dates').appendChild(newEmoji);
    
    setTimeout(() => {
      newEmoji.remove();
    }, 3000);
  }
});


// Testimonial slider functionality
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.testimonial-nav span');

// Create dots
testimonials.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => showTestimonial(index));
  document.querySelector('.testimonial-nav').appendChild(dot);
});

// Initialize first dot as active
dots[0]?.classList.add('active');

function showTestimonial(index) {
  testimonials[currentTestimonial].classList.remove('active');
  dots[currentTestimonial]?.classList.remove('active');
  
  currentTestimonial = (index + testimonials.length) % testimonials.length;
  
  testimonials[currentTestimonial].classList.add('active');
  dots[currentTestimonial]?.classList.add('active');
}

// Auto-rotate testimonials
setInterval(() => {
  showTestimonial(currentTestimonial + 1);
}, 5000);

// Make leadership cards clickable for more details
document.querySelectorAll('.leadership-card').forEach(card => {
  card.addEventListener('click', function() {
    this.classList.toggle('expanded');
  });
});


// Make topics stay flipped when clicked
document.querySelectorAll('.topic-card').forEach(card => {
  card.addEventListener('click', function() {
    this.classList.toggle('flipped');
  });
});

// Confidential chat button interaction
document.querySelector('.chat-button')?.addEventListener('click', function() {
  this.innerHTML = 'Connecting you with a mentor...';
  setTimeout(() => {
    // This would be replaced with actual chat functionality
    alert('A mentor will contact you within 24 hours. Thank for reaching out!');
    this.innerHTML = 'Request Private Chat <svg>...</svg>';
  }, 1500);
});

// Animate bubbles on scroll
function animateBubbles() {
  const bubbles = document.querySelectorAll('.bubble');
  bubbles.forEach((bubble, index) => {
    const scrollPos = window.scrollY;
    const delay = index * 0.2;
    bubble.style.transform = `translateY(${Math.sin(scrollPos * 0.01 + delay) * 20}px)`;
  });
  requestAnimationFrame(animateBubbles);
}
animateBubbles();


// Initialize the video gallery

// Gallery Filter Functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    const filter = this.dataset.filter;
    
    // Filter items
    document.querySelectorAll('.gallery-item').forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Lightbox Functionality
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', function() {
    const imgSrc = this.querySelector('img').src;
    const caption = this.querySelector('h3').textContent;
    
    const lightbox = document.querySelector('.lightbox');
    lightbox.querySelector('img').src = imgSrc;
    lightbox.querySelector('.caption').textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Close lightbox
document.querySelector('.close-btn').addEventListener('click', function() {
  document.querySelector('.lightbox').classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Video play button
document.querySelector('.play-button').addEventListener('click', function() {
  // In a real implementation, this would launch a video player
  alert('Video player would launch here!');
});

// Parallax effect
window.addEventListener('scroll', function() {
  const scrollPosition = window.pageYOffset;
  document.querySelector('.layer-1').style.transform = `translateY(${scrollPosition * 0.1}px)`;
  document.querySelector('.layer-2').style.transform = `translateY(${scrollPosition * 0.3}px)`;
});


// Countdown Timer
function updateCountdown() {
  const eventDate = new Date("June 15, 2024 15:00:00").getTime();
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days.toString().padStart(2, "0");
  document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Event Modal Functionality
document.querySelectorAll('.event-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const card = this.closest('.event-card');
    const eventName = card.querySelector('h3').textContent;
    const eventType = card.dataset.eventType;
    
    document.getElementById('event-modal-name').textContent = eventName;
    
    // Show/hide volunteer options based on button clicked
    const volunteerSection = document.getElementById('volunteer-options');
    if (this.classList.contains('volunteer')) {
      volunteerSection.style.display = 'block';
    } else {
      volunteerSection.style.display = 'none';
    }
    
    document.querySelector('.event-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
document.querySelector('.close-modal').addEventListener('click', function() {
  document.querySelector('.event-modal').classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Form submission
document.querySelector('.registration-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Registration submitted successfully!');
  document.querySelector('.event-modal').classList.remove('active');
  document.body.style.overflow = 'auto';
  this.reset();
});

// Share buttons
document.querySelectorAll('.event-btn.share').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const card = this.closest('.event-card');
    const eventName = card.querySelector('h3').textContent;
    const eventDate = card.querySelector('.date-day').textContent + ' ' + 
                     card.querySelector('.date-month').textContent;
    
    // In a real implementation, this would use the Web Share API or social media links
    alert(`Share "${eventName}" on ${eventDate} with your friends!`);
  });
});

// iCal download
document.querySelector('.download-ical').addEventListener('click', function() {
  // In a real implementation, this would download an actual .ics file
  alert('iCal file would download here. Alternatively, you can subscribe to our Google Calendar.');
});


// Animate pathway dots on hover
document.querySelectorAll('.pathway-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    const dots = this.querySelectorAll('.pathway-dots span');
    dots.forEach((dot, index) => {
      dot.style.animation = `bounce 0.6s ${index * 0.1}s`;
    });
  });
});

// Form submission
document.querySelector('.involvement-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('involvement-name').value;
  const interest = document.getElementById('involvement-interest').value;
  
  // Show confirmation
  alert(`Thanks ${name}! We're excited you're interested in ${interest}. Our team will contact you soon!`);
  
  // Reset form
  this.reset();
});

// Add bounce animation
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
`;
document.head.appendChild(style);

// Animate connection lines on scroll
window.addEventListener('scroll', function() {
  const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  const lines = document.querySelector('.connection-lines svg');
  
  if (lines) {
    lines.style.transform = `translateY(${scrollPercent * 100}px)`;
  }
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Newsletter Form Submission
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = this.querySelector('input').value;
  // In a real implementation, you would send this to your email service
  alert(`Thank you for subscribing with ${email}! You'll receive our next newsletter.`);
  this.reset();
});