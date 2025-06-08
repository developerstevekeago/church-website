        // Mobile menu toggle
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
        
        // Change navbar style on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            header.style.background = window.scrollY > 50 ? 'rgba(0, 51, 102, 1)' : 'rgba(0, 51, 102, 0.9)';
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', function() {
            const parallax = document.querySelector('.parallax-bg');
            let scrollPosition = window.pageYOffset;
            parallax.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
        });


        // Mission Section Animation
const missionCards = document.querySelectorAll('.mission-card');

const missionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

missionCards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    missionObserver.observe(card);
});



// Animate progress bars when section comes into view
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target;
            const targetWidth = progressFill.getAttribute('data-progress') + '%';
            progressFill.style.width = targetWidth;
            progressObserver.unobserve(progressFill);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-fill').forEach(bar => {
    progressObserver.observe(bar);
});

// Project card animation
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transitionDelay = `${index * 0.1}s`;
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    projectObserver.observe(card);
});


// Leader Modal Functionality
const leaderProfiles = {
    1: {
        name: "Eng. Daniel Ochieng",
        title: "Head of Church Development & Infrastructure",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: `<p>A licensed civil engineer and longtime church member, Eng. Daniel brings 15+ years of construction and project management experience to our development team. He oversees all building projects from blueprint to blessing, ensuring every structure is safe, modern, and cost-effective.</p>
              <p>Daniel also serves as our liaison with government offices for approvals and compliance, using his professional network to navigate regulatory requirements efficiently. His technical expertise combined with his spiritual maturity makes him invaluable to our projects.</p>
              <p>Before joining the church full-time, Daniel worked with several major construction firms in Nairobi, specializing in sustainable building practices that we've incorporated into our development approach.</p>`,
        funFact: "He still draws plans by hand before going digital."
    },
    2: {
        name: "Martha Nyaboke",
        title: "Finance & Resource Mobilization Lead",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: `<p>Martha handles the money — and she does it prayerfully. With a background in finance and NGO accounting, she ensures transparency in all fundraising and spending for our development projects.</p>
              <p>She coordinates member contributions, prepares donor reports, and maintains meticulous budget tracking that has earned the trust of all our partners. Martha developed the church's innovative "Adopt-a-Brick" fundraising program that has engaged hundreds of members in our building projects.</p>
              <p>Her systems for financial accountability have become a model for other churches in our conference. Martha believes that proper stewardship is a form of worship.</p>`,
        funFact: "She once balanced the budget down to the last shilling — no calculator!"
    },
    3: {
        name: "Samuel Kiprono",
        title: "Community Engagement Coordinator",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: `<p>Samuel connects the dots between the development team and the congregation. With his background in community organizing, he runs townhall meetings, gathers feedback, and rallies volunteers for our building projects.</p>
              <p>His calm leadership ensures members are informed, involved, and inspired throughout every phase of development. Samuel developed the church's volunteer scheduling system that has mobilized over 200 members to contribute their skills and time.</p>
              <p>He also coordinates our "Skills for Service" program that trains members in basic construction techniques, creating both short-term project help and long-term employable skills.</p>`,
        funFact: "He turns every site meeting into a motivational session."
    },
    4: {
        name: "Brenda Achieng'",
        title: "Design & Visual Communications Lead",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: `<p>Brenda handles all visual aspects of our development projects — from architectural renderings and project signboards to social media updates and impact reports. With her creative edge and deep love for the church, she documents every milestone in compelling ways.</p>
              <p>Her work keeps our online audience engaged with progress updates and helps potential donors visualize the impact of their contributions. Brenda developed the church's "Virtual Hard Hat Tour" series that gives members 360° views of projects in progress.</p>
              <p>Before joining the church staff, Brenda worked as a graphic designer for several Christian organizations, bringing professional polish to all our communications.</p>`,
        funFact: "She once edited a full project video on her phone — while on a mission trip!"
    }
};

const modal = document.getElementById('leaderModal');
const modalBody = document.getElementById('modalBody');

document.querySelectorAll('.view-profile').forEach(button => {
    button.addEventListener('click', function() {
        const leaderId = this.getAttribute('data-leader');
        const leader = leaderProfiles[leaderId];
        
        modalBody.innerHTML = `
            <img src="${leader.image}" alt="${leader.name}" class="modal-image">
            <h3>${leader.name}</h3>
            <h4>${leader.title}</h4>
            ${leader.bio}
            <div class="fun-fact-modal">
                <strong>Fun Fact:</strong> ${leader.funFact}
            </div>
        `;
        
        modal.style.display = "block";
        setTimeout(() => {
            modal.style.opacity = "1";
        }, 10);
    });
});

document.querySelector('.close-modal').addEventListener('click', function() {
    modal.style.opacity = "0";
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
});

window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
});

// Leader card animation
const leaderObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transitionDelay = `${index * 0.1}s`;
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.leader-card').forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    leaderObserver.observe(card);
});