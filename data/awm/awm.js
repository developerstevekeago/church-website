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
        header.style.background = 'rgba(81, 45, 109, 0.95)';
    } else {
        header.style.background = 'rgba(81, 45, 109, 0.8)';
    }
});


// Alternative for carousel (would need additional HTML)
const images = [
    'https://plus.unsplash.com/premium_photo-1673326630848-fecf43ae8db1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D', // Women studying Bible
    'https://images.unsplash.com/photo-1748274048033-6a5644a270ec?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D', // Service project
    'https://images.unsplash.com/photo-1746699421299-ac9d7e868855?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D'  // Worship gathering
];
let current = 0;

function rotateHero() {
    current = (current + 1) % images.length;
    document.querySelector('.hero-bg').style.backgroundImage = `url(${images[current]})`;
    setTimeout(rotateHero, 5000);
}
rotateHero();