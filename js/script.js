// import $ from 'jquery';

/* ============================== Aside ============================ */
const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;

// Initialize navigation
for(let i=0; i<totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function() {
        removeBackSection();
        for(let j=0; j<totalNavList; j++) {
            if(navList[j].querySelector("a").classList.contains("active")) {
                addBackSection(j);
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);
        
        // Close mobile menu after navigation
        if(window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    });
}

function removeBackSection() {
    for(let i=0; i<totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }   
}

function addBackSection(num) {
    allSection[num].classList.add("back-section");
}

function showSection(element) {
    for(let i=0; i<totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");
}

function updateNav(element) {
    for(let i=0; i<totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

// Mobile navigation toggler
const navTogglerBtn = document.querySelector(".nav-toggler"),
      aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for(let i=0; i<totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideAside = aside.contains(event.target);
    const isClickOnToggler = navTogglerBtn.contains(event.target);
    
    if (!isClickInsideAside && !isClickOnToggler && aside.classList.contains('open')) {
        asideSectionTogglerBtn();
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth >= 1200 && aside.classList.contains('open')) {
        asideSectionTogglerBtn();
    }
});

/* ============================== typing animation ============================ */
document.addEventListener("DOMContentLoaded", function() {
    // Initialize typing animations
    if (typeof Typed !== 'undefined') {
        var typed = new Typed(".typing", {
            strings: ["Data Analyst", "Financial Analyst", "Python Developer", "SQL Expert"],
            typeSpeed: 80,
            backSpeed: 50,
            loop: true,
            backDelay: 2000
        });

        var typed2 = new Typed(".typing2", {
            strings: ["Modern C++", "Technical Interview Basics", "Data Structures and Algorithms", "Computer Architecture"],
            typeSpeed: 80,
            backSpeed: 50,
            loop: true,
            backDelay: 2000
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        });
    }

    // Add hover effects to service items
    document.querySelectorAll('.service-item-inner').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

/* ============================== search ============================ */
//function that searches for a company in the JSON data
function search() {
    // Get the company name from the input field
    let companyName = document.getElementById("company-name").value;

    // Fetch the JSON data from the server
    fetch('path/to/data.json')
    .then(response => response.json())
    .then(data => {
        // Filter the JSON data based on the company name
        let searchResults = data.jobs.filter(job => job.title.toLowerCase() === companyName.toLowerCase());
        // Clear the search results div
        document.getElementById("results").innerHTML = "";
        // Loop through the search results and display the job details
        searchResults.forEach(job => {
            document.getElementById("results").innerHTML += `
                <div class="job">
                    <h3>${job.title}</h3>
                    <p>Location: ${job.location}</p>
                    <p>Role Type: ${job.roleType}</p>
                    <p>TC: ${job.tc}</p>
                    <p>Difficulty Rating: ${job.difficultyRating}</p>
                    <p>Experience: ${job.experience}</p>
                </div>
            `;
        });
    });
}

function redirect() {
    window.location.hash = "#CompanyInfo";
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

