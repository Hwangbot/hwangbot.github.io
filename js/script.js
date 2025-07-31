// ===== LEAGUE OF LEGENDS THEMED PORTFOLIO JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // Ensure page starts at top immediately
    window.scrollTo(0, 0);
    
    // Force scroll to top after a brief delay to ensure it takes effect
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
    
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initScrollToTop();
    initCounterAnimation();
    initChatWidget(); // Initialize chat widget
    initAboutInteractions(); // Initialize About section interactions
});

// ===== ABOUT SECTION INTERACTIONS =====
function initAboutInteractions() {
    initHobbiesHub();
    initInterestSections();
}

function initHobbiesHub() {
    const interestSatellites = document.querySelectorAll('.interest-satellite');
    const hubCenter = document.querySelector('.hub-center');
    const interestsOrbit = document.querySelector('.interests-orbit');
    
    // Initialize hub center click functionality
    if (hubCenter && interestsOrbit) {
        hubCenter.addEventListener('click', function() {
            const isExpanded = interestsOrbit.classList.contains('expanded');
            
            // Toggle expanded state
            if (isExpanded) {
                // Collapse
                interestsOrbit.classList.remove('expanded');
                hubCenter.classList.remove('expanded');
                hubCenter.closest('.hobbies-hub').classList.remove('expanded');
                hideAllSections();
            } else {
                // Expand
                interestsOrbit.classList.add('expanded');
                hubCenter.classList.add('expanded');
                hubCenter.closest('.hobbies-hub').classList.add('expanded');
                
                // Add click animation
                hubCenter.classList.add('clicked');
                setTimeout(() => {
                    hubCenter.classList.remove('clicked');
                }, 300);
            }
        });
        
        // Add hover effect to show it's clickable
        hubCenter.addEventListener('mouseenter', function() {
            if (!interestsOrbit.classList.contains('expanded')) {
                this.style.transform = 'translate(-50%, -50%) scale(1.1)';
                this.style.boxShadow = 'var(--shadow-gold)';
            }
        });
        
        hubCenter.addEventListener('mouseleave', function() {
            if (!interestsOrbit.classList.contains('expanded')) {
                this.style.transform = 'translate(-50%, -50%) scale(1)';
                this.style.boxShadow = '';
            }
        });
    }
    
    interestSatellites.forEach(satellite => {
        // Add hover effects
        satellite.addEventListener('mouseenter', function() {
            // Add a subtle glow effect
            this.style.boxShadow = '0 0 20px rgba(0, 123, 255, 0.6)';
        });
        
        satellite.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
        
        // Add click interaction to show specific section
        satellite.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering hub center click
            
            const category = this.getAttribute('data-category');
            showSection(category);
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Remove the document click listener that closes hub when clicking outside
    // Now the hub will only close when clicking the hub center itself
    
    // Add Show All button functionality
    const showAllBtn = document.querySelector('.show-all-button');
    console.log('🔍 Show All button found:', !!showAllBtn);
    if (showAllBtn) {
        showAllBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering hub center click
            console.log('🖱️ Show All button clicked');
            
            // Get current button text to determine action
            const buttonText = this.querySelector('span');
            console.log('📝 Button text element found:', !!buttonText);
            
            if (buttonText) {
                const currentText = buttonText.textContent;
                console.log('📝 Current button text:', currentText);
                
                // Execute the action based on current button text
                const sectionsNowActive = showAllSections();
                console.log('📊 Sections now active:', sectionsNowActive);
                
                // Update button text to the opposite action
                const newText = currentText === 'Show All' ? 'Close All' : 'Show All';
                buttonText.textContent = newText;
                console.log('✅ Button text updated to:', newText);
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
}

function initInterestSections() {
    const sections = document.querySelectorAll('.interest-section');
    
    // Initially hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Set up intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('active')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else if (!entry.target.classList.contains('active')) {
                // Ensure sections are hidden when not active
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

function showSection(category) {
    // Hide all sections first
    hideAllSections();
    
    // Show the selected section
    const targetSection = document.querySelector(`.interest-section[data-category="${category}"]`);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll to the section
        setTimeout(() => {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }
}

function hideAllSections() {
    const sections = document.querySelectorAll('.interest-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
}

function showAllSections() {
    const sections = document.querySelectorAll('.interest-section');
    console.log('🔍 showAllSections called');
    console.log('📊 Number of sections found:', sections.length);
    
    // Log each section and its current state
    sections.forEach((section, index) => {
        const category = section.getAttribute('data-category');
        const isActive = section.classList.contains('active');
        console.log(`📋 Section ${index + 1}: ${category} - Active: ${isActive}`);
    });
    
    // Check current button text to determine action
    const showAllBtn = document.querySelector('.show-all-button');
    const buttonText = showAllBtn ? showAllBtn.querySelector('span') : null;
    const currentText = buttonText ? buttonText.textContent : 'Show All';
    
    console.log('📝 Current button text:', currentText);
    
    if (currentText === 'Show All') {
        // Show All action - open all sections
        console.log('✅ Opening all sections');
        sections.forEach((section, index) => {
            const category = section.getAttribute('data-category');
            section.classList.add('active');
            // Force opacity and transform changes immediately
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            console.log(`✅ Opened section ${index + 1}: ${category}`);
        });
        
        // Scroll to the first section
        setTimeout(() => {
            const firstSection = document.querySelector('.interest-section');
            if (firstSection) {
                firstSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 300);
        
        return true; // Sections are now active
    } else {
        // Close All action - close all sections
        console.log('❌ Closing all sections');
        sections.forEach((section, index) => {
            const category = section.getAttribute('data-category');
            section.classList.remove('active');
            // Force opacity and transform changes immediately
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            console.log(`❌ Closed section ${index + 1}: ${category}`);
        });
        
        return false; // Sections are now inactive
    }
}



// ===== NAVIGATION =====
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Reset scroll position to top when switching sections
                // Use immediate scroll for better reliability
                window.scrollTo(0, 0);
                
                // Force scroll to top after a brief delay to ensure it takes effect
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 50);
                
                // Additional scroll reset for About section specifically
                if (targetId === 'about') {
                    setTimeout(() => {
                        window.scrollTo(0, 0);
                        document.documentElement.scrollTop = 0;
                        document.body.scrollTop = 0;
                    }, 100);
                }
            }
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

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
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background effect
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(15, 20, 25, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(15, 20, 25, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .project-card, .stat-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Hero section animations
    const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-stats, .hero-actions');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('#home');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Hover animations for cards
    document.querySelectorAll('.service-card, .project-card, .stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    console.log('🔢 Found counters:', counters.length);
    
    const animateCounter = (counter) => {
        const targetText = counter.getAttribute('data-target');
        const target = parseInt(targetText);
        const hasPercent = targetText.includes('%');
        const hasPlus = targetText.includes('+');
        console.log('🎯 Animating counter to:', target, hasPercent ? 'with %' : '', hasPlus ? 'with +' : '');
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            let suffix = '';
            if (hasPercent) suffix += '%';
            if (hasPlus) suffix += '+';
            counter.textContent = Math.floor(current) + suffix;
        }, 16);
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('👁️ Counter visible, starting animation');
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        console.log('👀 Observing counter:', counter.textContent);
        counterObserver.observe(counter);
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--lol-green)' : type === 'error' ? 'var(--lol-red)' : 'var(--lol-blue)'};
        color: var(--lol-white);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-dark);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up to document click listener
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Chat Widget Functionality
function initChatWidget() {
    console.log('🤖 Initializing GPT-powered chat widget...');
    const chatWidget = document.getElementById('chat-widget');
    const chatMinimize = document.getElementById('chatMinimize');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    console.log('📋 Chat widget elements found:', {
        chatWidget: !!chatWidget,
        chatMinimize: !!chatMinimize,
        chatInput: !!chatInput,
        sendButton: !!sendButton,
        chatMessages: !!chatMessages
    });

    if (!chatWidget) {
        console.error('❌ Chat widget not found!');
        return;
    }

    console.log('✅ Chat widget initialized successfully');

    // Load environment variables
    let envConfig = {};
    console.log('🔍 Starting to load environment config...');
    try {
        // Try to load from localStorage (set by user)
        const storedConfig = localStorage.getItem('envConfig');
        console.log('📦 Raw localStorage data:', storedConfig ? 'Found' : 'Not found');
        
        if (storedConfig) {
            envConfig = JSON.parse(storedConfig);
            console.log('✅ Environment config loaded:', { 
                hasApiKey: !!envConfig.OPENAI_API_KEY,
                model: envConfig.CHATBOT_MODEL,
                maxTokens: envConfig.CHATBOT_MAX_TOKENS,
                apiKeyLength: envConfig.OPENAI_API_KEY ? envConfig.OPENAI_API_KEY.length : 0
            });
        } else {
            console.log('❌ No environment config found in localStorage');
            console.log('💡 Please go to setup-env.html and save your configuration');
        }
    } catch (error) {
        console.error('❌ Error loading environment config:', error);
    }

    // API Configuration
    const API_CONFIG = {
        // Load from environment or use defaults
        OPENAI_API_KEY: envConfig.OPENAI_API_KEY || 'your-openai-api-key-here',
        PROXY_URL: envConfig.PROXY_URL || 'https://your-proxy-service.com/api/chat',
        MODEL: envConfig.CHATBOT_MODEL || 'gpt-3.5-turbo',
        MAX_TOKENS: parseInt(envConfig.CHATBOT_MAX_TOKENS) || 200,
        TEMPERATURE: parseFloat(envConfig.CHATBOT_TEMPERATURE) || 0.7,
        // Fallback responses if API fails
        FALLBACK_RESPONSES: {
            'hello': 'Hello! How can I help you today?',
            'hi': 'Hi there! What can I assist you with?',
            'help': 'I\'m here to help! What would you like to know?',
            'portfolio': 'This is Timothy\'s portfolio showcasing his data analysis skills and projects.',
            'contact': 'You can reach Timothy through the contact section above.',
            'projects': 'Check out the Projects section to see Timothy\'s work!',
            'experience': 'Timothy has experience in data analysis, SQL, Python, and BI tools.',
            'about': 'Timothy is a Data Analyst, Storyteller, and People Builder.'
        }
    };

    console.log('⚙️ API Configuration loaded:', {
        hasApiKey: API_CONFIG.OPENAI_API_KEY !== 'your-openai-api-key-here',
        apiKeyLength: API_CONFIG.OPENAI_API_KEY.length,
        model: API_CONFIG.MODEL,
        maxTokens: API_CONFIG.MAX_TOKENS,
        temperature: API_CONFIG.TEMPERATURE
    });

    // Minimize chat widget (make it a small circle)
    chatMinimize.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the widget click handler from firing
        chatWidget.classList.add('minimized');
    });

    // Click anywhere on minimized widget to reopen
    chatWidget.addEventListener('click', (e) => {
        if (chatWidget.classList.contains('minimized')) {
            // Only reopen if clicking on the minimized widget itself, not on child elements
            if (e.target === chatWidget || e.target.closest('.chat-header')) {
                chatWidget.classList.remove('minimized');
            }
        }
    });

    // Send message function
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';

            // Show typing indicator
            showTypingIndicator();

            try {
                console.log('🚀 Starting API call for message:', message);
                // Try real API call first
                const response = await callChatGPT(message);
                console.log('✅ API call successful, response:', response);
                hideTypingIndicator();
                addMessage(response, 'bot');
            } catch (error) {
                console.error('❌ API call failed with error:', error);
                console.error('❌ Error message:', error.message);
                console.error('❌ Error stack:', error.stack);
                hideTypingIndicator();
                // Fallback to local responses
                console.log('🔄 Using fallback response...');
                const fallbackResponse = generateFallbackResponse(message);
                console.log('📝 Fallback response:', fallbackResponse);
                addMessage(fallbackResponse, 'bot');
            }
        }
    }

    // Real ChatGPT API call
    async function callChatGPT(userMessage) {
        console.log('🤖 Attempting ChatGPT API call...');
        console.log('📋 API Config:', {
            hasApiKey: API_CONFIG.OPENAI_API_KEY !== 'your-openai-api-key-here',
            apiKeyLength: API_CONFIG.OPENAI_API_KEY.length,
            model: API_CONFIG.MODEL,
            maxTokens: API_CONFIG.MAX_TOKENS,
            temperature: API_CONFIG.TEMPERATURE
        });
        
        // Try multiple approaches to handle CORS issues
        if (API_CONFIG.OPENAI_API_KEY !== 'your-openai-api-key-here') {
            try {
                console.log('🔑 Using direct API call...');
                
                const requestBody = {
                    model: API_CONFIG.MODEL,
                    messages: [
                        { 
                            role: 'system', 
                            content: 'You are a helpful AI assistant for Timothy\'s portfolio website. You help visitors learn about Timothy\'s skills, experience, and projects. Keep responses concise, friendly, and professional. Focus on data analysis, portfolio information, and Timothy\'s background.' 
                        },
                        { role: 'user', content: userMessage }
                    ],
                    max_tokens: API_CONFIG.MAX_TOKENS,
                    temperature: API_CONFIG.TEMPERATURE
                };
                
                // Try direct API call first
                try {
                    console.log('📤 Attempting direct API call...');
                    const response = await fetch('https://api.openai.com/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`
                        },
                        body: JSON.stringify(requestBody)
                    });

                    console.log('📥 Response status:', response.status);

                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error('❌ Direct API call failed:', response.status, errorText);
                        throw new Error(`Direct API failed: ${response.status}`);
                    }

                    const data = await response.json();
                    console.log('✅ Direct API call successful!');
                    return data.choices[0].message.content;
                    
                } catch (directError) {
                    console.log('🔄 Direct API failed, trying proxy...');
                    
                    // Try multiple proxy services as fallback
                    const proxyUrls = [
                        'https://api.allorigins.win/raw?url=https://api.openai.com/v1/chat/completions',
                        'https://thingproxy.freeboard.io/fetch/https://api.openai.com/v1/chat/completions',
                        'https://cors-anywhere.herokuapp.com/https://api.openai.com/v1/chat/completions',
                        'https://api.codetabs.com/v1/proxy?quest=https://api.openai.com/v1/chat/completions'
                    ];
                    
                    for (let i = 0; i < proxyUrls.length; i++) {
                        try {
                            console.log(`🔄 Trying proxy ${i + 1}: ${proxyUrls[i]}`);
                            
                            const proxyResponse = await fetch(proxyUrls[i], {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
                                    'Origin': window.location.origin
                                },
                                body: JSON.stringify(requestBody)
                            });

                            console.log('📥 Proxy response status:', proxyResponse.status);

                            if (!proxyResponse.ok) {
                                const errorText = await proxyResponse.text();
                                console.error(`❌ Proxy ${i + 1} failed:`, proxyResponse.status, errorText);
                                continue; // Try next proxy
                            }

                            const proxyData = await proxyResponse.json();
                            console.log(`✅ Proxy ${i + 1} successful!`);
                            return proxyData.choices[0].message.content;
                            
                        } catch (proxyError) {
                            console.error(`❌ Proxy ${i + 1} error:`, proxyError.message);
                            if (i === proxyUrls.length - 1) {
                                throw new Error('All proxies failed');
                            }
                        }
                    }
                    
                    throw new Error('All proxy attempts failed');
                }
                
            } catch (error) {
                console.error('❌ All API attempts failed:', error);
                throw error;
            }
        } else {
            console.log('❌ No API key configured');
            throw new Error('API key not configured. Please add your OpenAI API key.');
        }
    }

    // Fallback response generator
    function generateFallbackResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        for (const [key, response] of Object.entries(API_CONFIG.FALLBACK_RESPONSES)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        return 'Thanks for your message! I\'m here to help with any questions about this portfolio.';
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <span class="typing-dots">
                    <span></span><span></span><span></span>
                </span>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Missing ping effect for non-interactive clicks
function createMissingPing(x, y) {
    // Create ping element with GIF
    const ping = document.createElement('img');
    ping.className = 'missing-ping';
    ping.src = 'Gifs/MISSING.gif'; // Use the GIF from your folder
    ping.style.left = x + 'px';
    ping.style.top = y + 'px';
    document.body.appendChild(ping);
    
    // Remove ping after animation
    setTimeout(() => {
        if (ping.parentNode) {
            ping.parentNode.removeChild(ping);
        }
    }, 1000);
}

// Global click listener for missing ping
document.addEventListener('click', function(e) {
    // Check if clicked element is interactive
    const isInteractive = e.target.closest('a, button, input, textarea, select, [tabindex], .nav-link, .service-card, .project-card, .contact-item, .chat-widget, .chat-toggle, .chat-minimize, .chat-input, .chat-send');
    
    // If not interactive, create missing ping
    if (!isInteractive) {
        createMissingPing(e.clientX, e.clientY);
    }
});

console.log('🎮 League of Legends Portfolio loaded successfully!');

