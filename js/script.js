// ===== LEAGUE OF LEGENDS THEMED PORTFOLIO JAVASCRIPT =====

// ===== COMPREHENSIVE SCROLL TO TOP FUNCTION =====
function forceScrollToTopComprehensive() {
    // Method 1: Direct property setting (most reliable)
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Method 2: window.scrollTo with different approaches
    window.scrollTo(0, 0);
    
    // Method 3: Try with options (mobile-friendly)
    try {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    } catch (e) {
        // Fallback for older browsers
        window.scrollTo(0, 0);
    }
    
    // Method 4: Force with requestAnimationFrame
    requestAnimationFrame(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo(0, 0);
    });
    
    // Method 5: Also scroll any potential scrollable containers
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.scrollTop = 0;
    }
    
    const containers = document.querySelectorAll('.section, .container');
    containers.forEach(container => {
        if (container.scrollTop !== undefined) {
            container.scrollTop = 0;
        }
    });
    
    // Method 6: Mobile-specific scrolling (iOS Safari)
    if ('scrollTo' in window) {
        try {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'auto'
            });
        } catch (e) {
            // Silent fallback
        }
    }
    
    // Method 7: Force scroll after a brief delay for mobile
    setTimeout(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, 50);
}



document.addEventListener('DOMContentLoaded', function() {
    // Ensure page starts at top immediately using comprehensive method
    forceScrollToTopComprehensive();
    
    // Force scroll to top after a brief delay to ensure it takes effect
    setTimeout(() => {
        forceScrollToTopComprehensive();
    }, 100);
    
    // Additional safeguard
    setTimeout(() => {
        forceScrollToTopComprehensive();
    }, 300);
    
    // Initialize homepage-active class on page load for desktop
    if (window.innerWidth > 768) {
        const homeSection = document.getElementById('home');
        if (homeSection && homeSection.classList.contains('active')) {
            document.body.classList.add('homepage-active');
        }
    }
    
    // Ensure mobile scroll restoration on page load
    ensureMobileScrollRestoration();
    
    // Initialize all functionality
    initNavigation();
    initMobileNavigation();
    
    // Add resize listener for mobile scroll restoration
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            // Small delay to ensure resize is complete
            setTimeout(() => {
                ensureMobileScrollRestoration();
            }, 100);
        }
    });
    initScrollEffects();
    initAnimations();
    initContactForm();
    initScrollToTop();
    initCounterAnimation();
    initChatWidget(); // Initialize chat widget
    initAboutInteractions(); // Initialize About section interactions
    initContactAnimations(); // Initialize Contact section animations
    initAudioPlayer(); // Initialize audio player for artists
    initExperienceSection(); // Initialize experience section interactions
    initDynamicHeading(); // Initialize dynamic heading functionality
    initContactModal(); // Initialize contact modal functionality
    initResumeModal(); // Initialize resume modal functionality
});

// ===== ABOUT SECTION INTERACTIONS =====
function initAboutInteractions() {
    initHobbiesHub();
    initInterestSections();
}

// Function to reset hub state to closed position
function resetHubState() {
    const interestsOrbit = document.querySelector('.interests-orbit');
    const hubCenter = document.querySelector('.hub-center');
    const hobbiesHub = document.querySelector('.hobbies-hub');
    
    if (interestsOrbit) {
        interestsOrbit.classList.remove('expanded');
    }
    if (hubCenter) {
        hubCenter.classList.remove('expanded');
    }
    if (hobbiesHub) {
        hobbiesHub.classList.remove('expanded');
    }
}

// Function to reset satellite sections to closed position
function resetSatelliteSections() {
    const sections = document.querySelectorAll('.interest-section');
    sections.forEach(section => {
        section.classList.remove('active');
        
        // Reset animation states for content cards
        const contentCards = section.querySelectorAll('.content-card');
        contentCards.forEach(card => {
            card.style.opacity = '';
            card.style.transform = '';
            card.style.transition = '';
        });
        
        section.style.transform = '';
        section.style.transition = '';
    });
    
    // Hide scroll-to-top button when sections are closed
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        scrollTopBtn.classList.remove('visible');
    }
}

function initHobbiesHub() {
    const interestSatellites = document.querySelectorAll('.interest-satellite');
    const hubCenter = document.querySelector('.hub-center');
    const interestsOrbit = document.querySelector('.interests-orbit');
    
    // Ensure hub starts in closed position
    resetHubState();
    resetSatelliteSections(); // Reset satellite sections to closed position
    
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
            
            // Add shake animation (moves right and back to center)
            console.log('🎯 Satellite clicked:', category, 'Starting shake animation');
            
            // Check satellite position more reliably
            const satelliteRect = this.getBoundingClientRect();
            const orbitRect = this.parentElement.getBoundingClientRect();
            const isRightSide = satelliteRect.left > orbitRect.left + (orbitRect.width / 2);
            
            console.log('📍 Satellite position:', {
                category,
                isRightSide,
                satelliteLeft: satelliteRect.left,
                orbitCenter: orbitRect.left + (orbitRect.width / 2)
            });
            
            // Force the correct base transform
            const baseTransform = isRightSide ? 'translateX(50%)' : 'translateX(-50%)';
            const shakeOffset = isRightSide ? '50% - 10px' : '-50% + 10px';
            
            // Shake animation: scale down, move right, then back to center
            this.style.transition = 'transform 0.15s ease-out';
            this.style.transform = `scale(0.9) translateX(calc(${shakeOffset}))`;
            
            setTimeout(() => {
                this.style.transform = `scale(1) ${baseTransform}`;
                console.log('✨ Satellite shake complete for:', category);
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

function showSection(category, moveToTop = true) {
    // Hide all sections first
    hideAllSections();
    
    // Show the selected section
    const targetSection = document.querySelector(`.interest-section[data-category="${category}"]`);
    if (targetSection) {
        if (moveToTop) {
            // Move the selected section to the top position (where TV shows section is)
            moveSelectedSectionToTop(targetSection);
        }
        
        // Hide ONLY the tiles immediately (keep header visible)
        const contentCards = targetSection.querySelectorAll('.content-card');
        
        // Force hide only the content cards immediately
        contentCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(60px) scale(0.7) rotate(3deg)';
            card.style.transition = 'none'; // No transition yet
        });
        
        // Force a repaint to ensure hidden state takes effect
        targetSection.offsetHeight;
        
        // NOW add the active class (header will be visible immediately)
        targetSection.classList.add('active');
        
        // Show scroll-to-top button when content is expanded in About section
        const scrollTopBtn = document.getElementById('scrollTop');
        if (scrollTopBtn) {
            scrollTopBtn.classList.add('visible');
            console.log('🔼 Scroll-to-top button shown due to content expansion in About section');
        }
        
        // Start the bouncy animations for tiles only
        setTimeout(() => {
            animateSectionContent(targetSection);
        }, 50);
        
        // Scroll to the section header with extra space above
        setTimeout(() => {
            const sectionHeader = targetSection.querySelector('.section-header');
            console.log('🔍 Section header found:', !!sectionHeader);
            
            if (sectionHeader) {
                // Use manual scroll calculation for better control
                const rect = sectionHeader.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetY = Math.max(0, rect.top + scrollTop - 100); // Ensure not negative
                
                console.log('📊 Scroll calculation:', {
                    rectTop: rect.top,
                    scrollTop: scrollTop,
                    targetY: targetY,
                    currentY: window.pageYOffset
                });
                
                // Try multiple scroll methods - faster scrolling
                window.scrollTo({
                    top: targetY,
                    behavior: 'auto'
                });
                
                // Fallback after a delay if first doesn't work
                setTimeout(() => {
                    if (Math.abs(window.pageYOffset - targetY) > 50) {
                        console.log('🔄 First scroll failed, trying fallback');
                        sectionHeader.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 1000);
                
                console.log('🎯 Scrolling to header with 100px space above');
            } else {
                console.log('⚠️ No header found, using section fallback');
                // Fallback to section scroll
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 50);
    }
}

function moveSelectedSectionToTop(selectedSection) {
    const interestsContent = document.querySelector('.interests-content');
    if (!interestsContent || !selectedSection) return;
    
    // Remove the selected section from its current position
    selectedSection.remove();
    
    // Insert it as the first child (top position)
    interestsContent.insertBefore(selectedSection, interestsContent.firstChild);
}

function hideAllSections() {
    const sections = document.querySelectorAll('.interest-section');
    sections.forEach(section => {
        section.classList.remove('active');
        
        // Reset only animation states for content cards (keep headers normal)
        const contentCards = section.querySelectorAll('.content-card');
        contentCards.forEach(card => {
            card.style.opacity = '';
            card.style.transform = '';
            card.style.transition = '';
        });
        
        section.style.transform = '';
        section.style.transition = '';
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
        // Show All action - open all sections in their original order
        console.log('✅ Opening all sections');
        
        // First, restore original order of sections
        restoreOriginalSectionOrder();
        
        // Show scroll-to-top button when showing all sections
        const scrollTopBtn = document.getElementById('scrollTop');
        if (scrollTopBtn) {
            scrollTopBtn.classList.add('visible');
            console.log('🔼 Scroll-to-top button shown due to Show All expansion in About section');
        }
        
        sections.forEach((section, index) => {
            const category = section.getAttribute('data-category');
            section.classList.add('active');
            // Force opacity and transform changes immediately
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            
            // Add bouncy animations to Show All sections too
            setTimeout(() => {
                animateSectionContent(section);
            }, index * 300); // Stagger each section
            
            console.log(`✅ Opened section ${index + 1}: ${category}`);
        });
        
        // Scroll to the first section header with extra space above
        setTimeout(() => {
            const firstSection = document.querySelector('.interest-section');
            if (firstSection) {
                const sectionHeader = firstSection.querySelector('.section-header');
                console.log('🔍 Show All - Section header found:', !!sectionHeader);
                
                if (sectionHeader) {
                    // Use manual scroll calculation for better control
                    const rect = sectionHeader.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const targetY = Math.max(0, rect.top + scrollTop - 100); // Ensure not negative
                    
                    console.log('📊 Show All - Scroll calculation:', {
                        rectTop: rect.top,
                        scrollTop: scrollTop,
                        targetY: targetY,
                        currentY: window.pageYOffset
                    });
                    
                    console.log('🔥 Show All - Scrolling to position:', targetY);
                    
                    window.scrollTo({
                        top: targetY,
                        behavior: 'auto'
                    });
                    
                    // Fallback after a delay if first doesn't work
                    setTimeout(() => {
                        if (Math.abs(window.pageYOffset - targetY) > 50) {
                            console.log('🔄 Show All - First scroll failed, trying fallback');
                            sectionHeader.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }, 1000);
                    
                    console.log('🎯 Show All: Scrolling to first header with 100px space above');
                } else {
                    console.log('⚠️ Show All - No header found, using section fallback');
                    // Fallback to section scroll
                    firstSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        }, 50);
        
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

function animateSectionContent(section) {
    const category = section.getAttribute('data-category');
    console.log('🎬 Starting SMOOTH tile animations for:', category);
    
    // Get the content cards (header is already visible)
    const contentCards = section.querySelectorAll('.content-card');
    
    console.log('📊 Found elements:', {
        category,
        cardCount: contentCards.length
    });
    
    // Enable transitions for cards and animate them in
    contentCards.forEach((card, index) => {
        card.style.transition = 'all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            console.log(`🎾 Card ${index + 1} BOUNCED in for:`, category);
        }, 200 + (index * 200)); // 200ms delay between each card
    });
    
    // Add final dramatic bounce to the whole section
    setTimeout(() => {
        console.log('🎪 Starting FINAL section bounce for:', category);
        section.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        // Big bounce up
        section.style.transform = 'translateY(-15px) scale(1.03)';
        
        setTimeout(() => {
            // Bounce down past normal
            section.style.transform = 'translateY(5px) scale(0.99)';
            
            setTimeout(() => {
                // Small bounce up
                section.style.transform = 'translateY(-2px) scale(1.01)';
                
                setTimeout(() => {
                    // Final settle
                    section.style.transform = 'translateY(0) scale(1)';
                    console.log('🎉 FINAL bounce complete for:', category);
                }, 200);
            }, 250);
        }, 400);
    }, 400 + (contentCards.length * 200)); // Wait for all cards + extra time
}

function restoreOriginalSectionOrder() {
    const interestsContent = document.querySelector('.interests-content');
    if (!interestsContent) return;
    
    // Define the original order of sections
    const originalOrder = ['tv', 'travel', 'games', 'sports', 'anime', 'music'];
    
    // Get all sections
    const sections = Array.from(document.querySelectorAll('.interest-section'));
    
    // Sort sections according to original order
    sections.sort((a, b) => {
        const categoryA = a.getAttribute('data-category');
        const categoryB = b.getAttribute('data-category');
        const indexA = originalOrder.indexOf(categoryA);
        const indexB = originalOrder.indexOf(categoryB);
        return indexA - indexB;
    });
    
    // Clear the container and re-append sections in correct order
    interestsContent.innerHTML = '';
    sections.forEach(section => {
        interestsContent.appendChild(section);
    });
}



// ===== NAVIGATION =====
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navContact = document.querySelector('.nav-contact');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (navContact) {
                navContact.classList.toggle('active');
            }
        });
    }

    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Skip navigation handling for contact link - let modal handle it
            if (this.getAttribute('data-section') === 'contact') {
                return;
            }
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            // Special handling for Timothy Hwangbo logo - reset to headshot prompt
            if (this.classList.contains('logo-link')) {
                // Reset dynamic content to headshot's prompt
                const dynamicHeading = document.getElementById('dynamic-heading');
                const dynamicDescription = document.getElementById('dynamic-description');
                const clickableElements = document.querySelectorAll('.clickable-profile');
                const skillItems = document.querySelectorAll('.skill-item');
                
                if (dynamicHeading && dynamicDescription && clickableElements.length > 0) {
                            // Set content to "Hey, I'm Tim!" (first variation)
        dynamicHeading.textContent = "Hey, I'm Tim!";
                    dynamicDescription.textContent = "A data janitor turning dirty data into clean dashboards, one sheet at a time.";
                    
                    // Remove glow from all clickable elements and skill items
                    clickableElements.forEach(element => {
                        element.classList.remove('selected-glow');
                    });
                    skillItems.forEach(element => {
                        element.classList.remove('selected-glow');
                    });
                    
                    // Apply glow to the headshot (first clickable profile element)
                    if (clickableElements[0]) {
                        clickableElements[0].classList.add('selected-glow');
                    }
                }
            }
            
            // Special handling for Home tab - apply glow to headshot
            if (targetId === 'home') {
                const clickableElements = document.querySelectorAll('.clickable-profile');
                const skillItems = document.querySelectorAll('.skill-item');
                const dynamicHeading = document.getElementById('dynamic-heading');
                const dynamicDescription = document.getElementById('dynamic-description');
                
                if (clickableElements.length > 0 && dynamicHeading && dynamicDescription) {
                    // Remove glow from all clickable elements and skill items
                    clickableElements.forEach(element => {
                        element.classList.remove('selected-glow');
                    });
                    skillItems.forEach(element => {
                        element.classList.remove('selected-glow');
                    });
                    
                    // Apply glow to the headshot (first clickable profile element)
                    if (clickableElements[0]) {
                        clickableElements[0].classList.add('selected-glow');
                    }
                    
                            // Reset content to "Hey, I'm Tim!" if not already set
        if (dynamicHeading.textContent !== "Hey, I'm Tim!") {
            dynamicHeading.textContent = "Hey, I'm Tim!";
                        dynamicDescription.textContent = "A data janitor turning dirty data into clean dashboards, one sheet at a time.";
                    }
                }
            }
            
            // Hide all sections and reset contact animations if leaving contact
            const currentActiveSection = document.querySelector('.section.active');
            if (currentActiveSection && currentActiveSection.id === 'contact' && targetId !== 'contact') {
                resetContactAnimations();
                console.log('🔄 Leaving contact section, resetting animations');
            }
            
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section first
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Desktop homepage scroll prevention
                if (targetId === 'home' && window.innerWidth > 768) {
                    document.body.classList.add('homepage-active');
                } else {
                    document.body.classList.remove('homepage-active');
                }
                
                // Re-apply music player padding if active
                if (typeof musicPlayer !== 'undefined' && musicPlayer.classList.contains('active')) {
                    showMusicPlayer();
                }
                // Trigger specific animations for contact section
                if (targetId === 'contact') {
                    triggerContactAnimations();
                }
                
                // Reset hub state when About section becomes active
                if (targetId === 'about') {
                    resetHubState();
                    resetSatelliteSections(); // Reset satellite sections to closed position
                }
            }
            
            // AGGRESSIVE scroll to top - override any other scroll behavior
            console.log('🔄 Tab navigation clicked, forcing scroll to top');
            
            // Method 1: Direct property setting
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            
            // Method 2: Window scroll
            window.scrollTo(0, 0);
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant'
            });
            
            // Method 3: Force with timing to override any other scrolls
            setTimeout(() => {
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                window.scrollTo(0, 0);
                console.log('🔄 Tab navigation: Force scroll attempt 1');
            }, 10);
            
            setTimeout(() => {
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                window.scrollTo(0, 0);
                console.log('🔄 Tab navigation: Force scroll attempt 2');
            }, 50);
            
            setTimeout(() => {
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                window.scrollTo(0, 0);
                console.log('🔄 Tab navigation: Force scroll attempt 3');
            }, 100);
            
            setTimeout(() => {
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                window.scrollTo(0, 0);
                console.log('🔄 Tab navigation: Final force scroll');
            }, 200);
            
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

// ===== MOBILE NAVIGATION =====
function initMobileNavigation() {
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    // Mobile menu toggle
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            mobileNavToggle.classList.toggle('active');
            mobileNavOverlay.classList.toggle('active');
            document.body.classList.toggle('mobile-nav-open');
        });
    }

    // Mobile menu close button
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', function() {
            mobileNavToggle.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.classList.remove('mobile-nav-open');
        });
    }

    // Close mobile menu when clicking on navigation items
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Handle contact link - open modal and close mobile menu
            if (this.getAttribute('data-section') === 'contact') {
                e.preventDefault();
                
                // Close mobile menu
                mobileNavToggle.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                document.body.classList.remove('mobile-nav-open');
                
                // Open contact modal
                const contactModal = document.getElementById('contact-modal');
                if (contactModal) {
                    contactModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
                return;
            }
            
            // Close mobile menu
            mobileNavToggle.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.classList.remove('mobile-nav-open');
            
            // Handle navigation (similar to desktop navigation)
            e.preventDefault();
            
            // Get target section
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            // Special handling for Home tab - apply glow to headshot
            if (targetId === 'home') {
                const clickableElements = document.querySelectorAll('.clickable-profile');
                const skillItems = document.querySelectorAll('.skill-item');
                const dynamicHeading = document.getElementById('dynamic-heading');
                const dynamicDescription = document.getElementById('dynamic-description');
                const mobileHeading = document.querySelector('.mobile-heading');
                const mobileDescription = document.querySelector('.mobile-description');
                
                if (clickableElements.length > 0) {
                    // Remove glow from all clickable elements and skill items
                    clickableElements.forEach(element => {
                        element.classList.remove('selected-glow');
                    });
                    skillItems.forEach(element => {
                        element.classList.remove('selected-glow');
                    });
                    
                    // Apply glow to the headshot (first clickable profile element)
                    if (clickableElements[0]) {
                        clickableElements[0].classList.add('selected-glow');
                    }
                    
                                    // Always reset content to "Hey, I'm Tim!" for desktop
                if (dynamicHeading && dynamicDescription) {
                    dynamicHeading.textContent = "Hey, I'm Tim!";
                    dynamicDescription.textContent = "A data janitor turning dirty data into clean dashboards, one sheet at a time.";
                }
                
                // Always reset content to "Hey, I'm Tim!" for mobile
                if (mobileHeading && mobileDescription) {
                    mobileHeading.textContent = "Hey, I'm Tim!";
                    mobileDescription.textContent = "A data janitor turning dirty data into clean dashboards, one sheet at a time.";
                }
                }
            }
            
            // Hide all sections and show target section
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Desktop homepage scroll prevention (also applies to mobile for consistency)
                if (targetId === 'home' && window.innerWidth > 768) {
                    document.body.classList.add('homepage-active');
                } else {
                    document.body.classList.remove('homepage-active');
                }
                
                // Reset hub state when About section becomes active
                if (targetId === 'about') {
                    resetHubState();
                    resetSatelliteSections(); // Reset satellite sections to closed position
                }
                
                // AGGRESSIVE scroll to top for mobile - override any other scroll behavior
                console.log('🔄 Mobile tab navigation clicked, forcing scroll to top');
                
                // Ensure mobile scroll restoration
                ensureMobileScrollRestoration();
                
                // Method 1: Direct property setting
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                
                // Method 2: Window scroll
                window.scrollTo(0, 0);
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'instant'
                });
                
                // Method 3: Force with timing to override any other scrolls
                setTimeout(() => {
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    window.scrollTo(0, 0);
                    console.log('🔄 Mobile tab navigation: Force scroll attempt 1');
                }, 10);
                
                setTimeout(() => {
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    window.scrollTo(0, 0);
                    console.log('🔄 Mobile tab navigation: Force scroll attempt 2');
                }, 50);
                
                setTimeout(() => {
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    window.scrollTo(0, 0);
                    console.log('🔄 Mobile tab navigation: Force scroll attempt 3');
                }, 100);
                
                setTimeout(() => {
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    window.scrollTo(0, 0);
                    console.log('🔄 Mobile tab navigation: Final force scroll');
                }, 200);
            }
        });
    });

    // Handle mobile logo link click (same functionality as Home navigation)
    const mobileLogoLink = document.querySelector('.mobile-logo-link');
    if (mobileLogoLink) {
        mobileLogoLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            mobileNavToggle.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.classList.remove('mobile-nav-open');
            
            // Apply glow to headshot (same as Home tab)
            const clickableElements = document.querySelectorAll('.clickable-profile');
            const skillItems = document.querySelectorAll('.skill-item');
            const dynamicHeading = document.getElementById('dynamic-heading');
            const dynamicDescription = document.getElementById('dynamic-description');
            const mobileHeading = document.querySelector('.mobile-heading');
            const mobileDescription = document.querySelector('.mobile-description');
            
            if (clickableElements.length > 0) {
                // Remove glow from all clickable elements and skill items
                clickableElements.forEach(element => {
                    element.classList.remove('selected-glow');
                });
                skillItems.forEach(element => {
                    element.classList.remove('selected-glow');
                });
                
                // Apply glow to the headshot (first clickable profile element)
                if (clickableElements[0]) {
                    clickableElements[0].classList.add('selected-glow');
                }
                
                // Always reset content to "Hey, I'm Tim!" for desktop
                if (dynamicHeading && dynamicDescription) {
                    dynamicHeading.textContent = "Hey, I'm Tim!";
                    dynamicDescription.textContent = "A data janitor turning dirty data into clean dashboards, one sheet at a time.";
                }
                
                // Always reset content to "Hey, I'm Tim!" for mobile
                if (mobileHeading && mobileDescription) {
                    mobileHeading.textContent = "Hey, I'm Tim!";
                    mobileDescription.textContent = "A data janitor turning dirty data into clean dashboards, one sheet at a time.";
                }
            }
            
            // Hide all sections and show home section
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            const homeSection = document.getElementById('home');
            if (homeSection) {
                homeSection.classList.add('active');
                
                // Desktop homepage scroll prevention (also applies to mobile for consistency)
                if (window.innerWidth > 768) {
                    document.body.classList.add('homepage-active');
                } else {
                    document.body.classList.remove('homepage-active');
                }
                
                                    // AGGRESSIVE scroll to top for mobile - override any other scroll behavior
                    console.log('🔄 Mobile logo link clicked, forcing scroll to top');
                    
                    // Ensure mobile scroll restoration
                    ensureMobileScrollRestoration();
                    
                    // Method 1: Direct property setting
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    
                    // Method 2: Window scroll
                    window.scrollTo(0, 0);
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'instant'
                    });
                
                // Method 3: Force with timing to override any other scrolls
                setTimeout(() => {
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    window.scrollTo(0, 0);
                    console.log('🔄 Mobile logo link: Force scroll attempt 1');
                }, 10);
                
                setTimeout(() => {
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    window.scrollTo(0, 0);
                    console.log('🔄 Mobile logo link: Force scroll attempt 2');
                }, 50);
                
                setTimeout(() => {
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    window.scrollTo(0, 0);
                    console.log('🔄 Mobile logo link: Force scroll attempt 3');
                }, 100);
                
                setTimeout(() => {
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    window.scrollTo(0, 0);
                    console.log('🔄 Mobile logo link: Final force scroll');
                }, 200);
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileNavOverlay && mobileNavOverlay.classList.contains('active')) {
            if (!mobileNavOverlay.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                mobileNavToggle.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                document.body.classList.remove('mobile-nav-open');
            }
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavOverlay && mobileNavOverlay.classList.contains('active')) {
            mobileNavToggle.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.classList.remove('mobile-nav-open');
        }
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

    // Observe elements for animation (excluding contact items - they have their own system)
    document.querySelectorAll('.service-card, .project-card, .stat-card, .education-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        
        // Add staggered delay for education items
        if (el.classList.contains('education-item')) {
            const educationItems = document.querySelectorAll('.education-item');
            const educationIndex = Array.from(educationItems).indexOf(el);
            el.style.transitionDelay = `${educationIndex * 0.2}s`;
            console.log(`🎓 Education item ${educationIndex + 1} will animate with ${educationIndex * 0.2}s delay`);
        }
        
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

    // Hover animations for cards (contact items have their own hover effects in CSS)
    document.querySelectorAll('.service-card, .project-card, .stat-card, .education-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== CONTACT ANIMATIONS =====
function initContactAnimations() {
    console.log('📧 Initializing contact animations');
    
    // Check if we're already on contact page
    const contactSection = document.getElementById('contact');
    if (contactSection && contactSection.classList.contains('active')) {
        console.log('🚨 Contact section is already active, triggering animations immediately');
        setTimeout(() => {
            triggerContactAnimations();
        }, 500);
    } else {
        // Reset all contact elements to initial state only if not active
        resetContactAnimations();
    }
}

function resetContactAnimations() {
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    const contactItems = document.querySelectorAll('.contact-item');
    const formGroups = document.querySelectorAll('#contact .form-group');
    const submitButton = document.querySelector('#contact .btn');
    
    // Remove all animation classes and clear inline styles
    if (contactInfo) {
        contactInfo.classList.remove('animated', 'preparing-animation');
        contactInfo.style.opacity = '';
        contactInfo.style.transform = '';
    }
    
    if (contactForm) {
        contactForm.classList.remove('animated', 'preparing-animation');
        contactForm.style.opacity = '';
        contactForm.style.transform = '';
    }
    
    contactItems.forEach(item => {
        item.classList.remove('animated', 'preparing-animation');
        item.style.opacity = '';
        item.style.transform = '';
        item.style.transitionDelay = '';
    });
    
    formGroups.forEach(group => {
        group.classList.remove('animated', 'preparing-animation');
        group.style.opacity = '';
        group.style.transform = '';
        group.style.transitionDelay = '';
    });
    
    if (submitButton) {
        submitButton.classList.remove('animated', 'preparing-animation');
        submitButton.style.opacity = '';
        submitButton.style.transform = '';
    }
    
    console.log('🔄 Contact animations reset - elements now visible by default');
}

function triggerContactAnimations() {
    console.log('🎬 Triggering contact section animations');
    
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    const contactItems = document.querySelectorAll('.contact-item');
    const formGroups = document.querySelectorAll('#contact .form-group');
    const submitButton = document.querySelector('#contact .btn');
    
    // First, prepare all elements for animation (hide them)
    if (contactInfo) contactInfo.classList.add('preparing-animation');
    if (contactForm) contactForm.classList.add('preparing-animation');
    contactItems.forEach(item => item.classList.add('preparing-animation'));
    formGroups.forEach(group => group.classList.add('preparing-animation'));
    if (submitButton) submitButton.classList.add('preparing-animation');
    
    // Small delay to ensure the prepare state takes effect
    setTimeout(() => {
        // Animate main containers (similar to home page)
        setTimeout(() => {
            if (contactInfo) {
                contactInfo.classList.remove('preparing-animation');
                contactInfo.classList.add('animated');
                console.log('📧 Contact info sliding in from left');
            }
        }, 200);
        
        setTimeout(() => {
            if (contactForm) {
                contactForm.classList.remove('preparing-animation');
                contactForm.classList.add('animated');
                console.log('📝 Contact form sliding in from right');
            }
        }, 400);
        
        // Staggered animation for contact items
        contactItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('preparing-animation');
                item.classList.add('animated');
                item.style.transitionDelay = `${index * 0.1}s`;
                console.log(`📞 Contact item ${index + 1} animating in`);
            }, 600 + (index * 100));
        });
        
        // Staggered animation for form groups
        formGroups.forEach((group, index) => {
            setTimeout(() => {
                group.classList.remove('preparing-animation');
                group.classList.add('animated');
                group.style.transitionDelay = `${index * 0.1}s`;
                console.log(`📝 Form group ${index + 1} animating in`);
            }, 800 + (index * 100));
        });
        
        // Animate submit button last
        if (submitButton) {
            setTimeout(() => {
                submitButton.classList.remove('preparing-animation');
                submitButton.classList.add('animated');
                console.log('📤 Submit button animating in');
            }, 1200 + (formGroups.length * 100));
        }
    }, 50); // Small delay to ensure prepare state renders
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
        console.log('✅ Scroll-to-top button found and initialized');
        console.log('📍 Button position:', {
            bottom: getComputedStyle(scrollTopBtn).bottom,
            left: getComputedStyle(scrollTopBtn).left,  // Changed from right to left
            zIndex: getComputedStyle(scrollTopBtn).zIndex
        });
        
        // Enhanced scroll handler that works on all tabs
        let scrollTimeout;
        function updateScrollButton() {
            const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
            const activeSection = document.querySelector('.section.active');
            const sectionId = activeSection ? activeSection.id : 'none';
            
            // Universal logic for all tabs - show button with very low threshold
            const shouldShowButton = scrollPos > 20 || // Very low threshold for all tabs
                                   (activeSection && activeSection.scrollHeight > window.innerHeight * 1.2) || // Show if section is tall
                                   document.querySelectorAll('.interest-section.active').length > 0; // Show if About has active content
            
            if (shouldShowButton) {
                if (!scrollTopBtn.classList.contains('visible')) {
                    scrollTopBtn.classList.add('visible');
                    console.log(`🔼 Scroll-to-top button shown (Section: ${sectionId}, ScrollPos: ${scrollPos})`);
                }
            } else {
                if (scrollTopBtn.classList.contains('visible')) {
                    scrollTopBtn.classList.remove('visible');
                    console.log(`🔽 Scroll-to-top button hidden (Section: ${sectionId}, ScrollPos: ${scrollPos})`);
                }
            }
        }
        
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(updateScrollButton, 10);
        });
        
        // Also update when sections change (for tab navigation)
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    if (target.classList.contains('section') && target.classList.contains('active')) {
                        console.log(`📊 Section changed to: ${target.id}`);
                        
                        // Show scroll button immediately for tabs with substantial content
                        const contentRichTabs = ['about', 'education', 'experience', 'projects', 'contact'];
                        if (contentRichTabs.includes(target.id)) {
                            setTimeout(() => {
                                scrollTopBtn.classList.add('visible');
                                console.log(`🔼 Scroll-to-top button shown immediately for content-rich tab: ${target.id}`);
                            }, 200); // Small delay to let tab animation complete
                        }
                        
                        // Also run the normal check
                        setTimeout(updateScrollButton, 300);
                    }
                }
            });
        });
        
        // Observe all sections for class changes
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section, { attributes: true, attributeFilter: ['class'] });
        });
        
        // Enhanced event handling for both desktop and mobile
        function handleScrollToTop(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔼 Scroll-to-top button activated');
            
            // Enhanced scroll to top with multiple fallback methods
            forceScrollToTopComprehensive();
            
            // Add visual feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
        
        // Add multiple event listeners for better mobile compatibility
        scrollTopBtn.addEventListener('click', handleScrollToTop);
        scrollTopBtn.addEventListener('touchend', handleScrollToTop);
        scrollTopBtn.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Prevent default touch behavior
        });
        
        // Test button visibility on page load
        setTimeout(() => {
            const rect = scrollTopBtn.getBoundingClientRect();
            console.log('🔍 Button visibility test:', {
                visible: rect.width > 0 && rect.height > 0,
                position: `${rect.left}px from left, ${window.innerHeight - rect.bottom}px from bottom`,
                hasVisibleClass: scrollTopBtn.classList.contains('visible'),
                computedOpacity: getComputedStyle(scrollTopBtn).opacity
            });
            
            // Temporary test: Force show the button for 5 seconds so user can see it on all tabs
            console.log('🧪 TEMPORARY TEST: Showing scroll button for 5 seconds on all tabs');
            scrollTopBtn.classList.add('visible');
            setTimeout(() => {
                console.log('🧪 TEMPORARY TEST: Test complete - button will now show based on normal rules');
                // Don't hide it automatically, let the normal logic take over
                updateScrollButton();
            }, 5000);
        }, 1000);
        
    } else {
        console.log('❌ Scroll-to-top button not found!');
        console.log('🔍 Available elements with scroll-related IDs:', 
            Array.from(document.querySelectorAll('[id*="scroll"], [class*="scroll"]'))
                .map(el => ({ id: el.id, class: el.className }))
        );
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
    const isInteractive = e.target.closest('a, button, input, textarea, select, [tabindex], .nav-link, .service-card, .project-card, .contact-item, .chat-widget, .chat-toggle, .chat-minimize, .chat-input, .chat-send, .clickable-profile, .skill-item, .player-card, .player-avatar, .player-info, .player-name, .player-skills, .interest-satellite, .hub-center, .mobile-nav-close');
    
    // If not interactive, create missing ping
    if (!isInteractive) {
        createMissingPing(e.clientX, e.clientY);
    }
});

// ===== ADDITIONAL SCROLL-TO-TOP EVENT LISTENERS =====
// Force scroll to top on page load
window.addEventListener('load', function() {
    forceScrollToTopComprehensive();
    setTimeout(() => {
        forceScrollToTopComprehensive();
    }, 100);
});

// Force scroll to top on page refresh
window.addEventListener('beforeunload', function() {
    forceScrollToTopComprehensive();
});

// Force scroll to top when navigating back/forward
window.addEventListener('popstate', function() {
    forceScrollToTopComprehensive();
    setTimeout(() => {
        forceScrollToTopComprehensive();
    }, 50);
});

// Force scroll to top when page becomes visible again (tab switching)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        forceScrollToTopComprehensive();
    }
});

// Force scroll to top when window gets focus
window.addEventListener('focus', function() {
    forceScrollToTopComprehensive();
});

// ===== AUDIO PLAYER =====
function initAudioPlayer() {
    console.log('🎵 Initializing audio player for artists');
    
    let currentAudio = null;
    let currentPlayingCard = null;
    let currentVolume = 0.10; // Store current volume (default 10%)
    
    // Get all artist cards with audio
    const artistCards = document.querySelectorAll('.artist-card[data-audio]');
    
    // Get master volume controls (legacy)
    const musicSection = document.querySelector('.interest-section[data-category="music"]');
    const volumeSlider = document.querySelector('.volume-slider');
    const volumePercentage = document.querySelector('.volume-percentage');
    const volumeIcon = document.querySelector('.volume-icon');
    
    // Get music player interface elements
    const musicPlayer = document.getElementById('musicPlayer');
    const albumArt = document.querySelector('.album-art');
    const trackTitle = document.querySelector('.track-title');
    const trackArtist = document.querySelector('.track-artist');
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.querySelector('.progress-fill');
    const timeCurrent = document.querySelector('.time-current');
    const timeTotal = document.querySelector('.time-total');
    const volumeSliderPlayer = document.querySelector('.volume-slider-player');
    const volumePercentagePlayer = document.querySelector('.volume-percentage-player');
    const volumeIconPlayer = document.querySelector('.volume-icon-player');
    const closePlayerBtn = document.querySelector('.close-player-btn');
    
    // Artist data for navigation
    const artistsData = [
        { name: 'FKJ', audioSrc: 'Music/FKJ.mp3', imageSrc: 'images/Artists/fkj.jpg' },
        { name: 'HYBS', audioSrc: 'Music/HYBS.mp3', imageSrc: 'images/Artists/hybs.jpg' },
        { name: 'SZA', audioSrc: 'Music/SZA.mp3', imageSrc: 'images/Artists/sza.jpg' },
        { name: 'Kyle Dion', audioSrc: 'Music/Kyle Dion.mp3', imageSrc: 'images/Artists/kyle dion.jpg' },
        { name: 'BiBi', audioSrc: 'Music/BIBI.mp3', imageSrc: 'images/Artists/bibi.jpg' },
        { name: 'bbno$', audioSrc: 'Music/bbno$.mp3', imageSrc: 'images/Artists/bbno$.jpg' }
    ];
    
    let currentArtistIndex = -1;
    
    // Music Player Interface Functions
    function showMusicPlayer() {
        musicPlayer.classList.add('active');
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            const musicPlayerHeight = 90; // Height of music player
            const extraSpacing = window.innerWidth <= 480 ? 40 : window.innerWidth <= 768 ? 30 : 20;
            const totalPadding = musicPlayerHeight + extraSpacing;
            mainContent.style.paddingBottom = `${totalPadding}px`;
        }
    }
    
    function hideMusicPlayer() {
        musicPlayer.classList.remove('active');
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.paddingBottom = '';
        }
    }
    
    function updatePlayerInfo(artistName, imageSrc) {
        trackTitle.textContent = artistName;
        trackArtist.textContent = 'Now Playing';
        albumArt.src = imageSrc;
        albumArt.alt = `${artistName} album art`;
    }
    
    function updateProgressBar() {
        if (currentAudio) {
            const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
            progressFill.style.width = progress + '%';
            
            timeCurrent.textContent = formatTime(currentAudio.currentTime);
            timeTotal.textContent = formatTime(currentAudio.duration || 0);
        }
    }
    
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    function updateVolumeIcon(volume) {
        const icons = [volumeIcon, volumeIconPlayer];
        icons.forEach(icon => {
            if (icon) {
                if (volume === 0) {
                    icon.className = icon.className.replace(/fa-volume-[a-z]+/, 'fa-volume-mute');
                } else if (volume < 0.5) {
                    icon.className = icon.className.replace(/fa-volume-[a-z]+/, 'fa-volume-down');
                } else {
                    icon.className = icon.className.replace(/fa-volume-[a-z]+/, 'fa-volume-up');
                }
            }
        });
    }
    
    // Music Player Controls
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (currentAudio) {
                if (currentAudio.paused) {
                    currentAudio.play();
                } else {
                    currentAudio.pause();
                }
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentArtistIndex > 0) {
                currentArtistIndex--;
                const prevArtist = artistsData[currentArtistIndex];
                loadNewTrack(prevArtist.audioSrc, prevArtist.name, prevArtist.imageSrc);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentArtistIndex < artistsData.length - 1) {
                currentArtistIndex++;
                const nextArtist = artistsData[currentArtistIndex];
                loadNewTrack(nextArtist.audioSrc, nextArtist.name, nextArtist.imageSrc);
            }
        });
    }
    
    if (progressBar) {
        progressBar.addEventListener('click', function(e) {
            if (currentAudio) {
                const rect = this.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = clickX / rect.width;
                currentAudio.currentTime = percentage * currentAudio.duration;
            }
        });
    }
    
    if (volumeSliderPlayer) {
        volumeSliderPlayer.addEventListener('input', function() {
            const volume = this.value / 100;
            currentVolume = volume; // Store the volume preference
            if (currentAudio) {
                currentAudio.volume = volume;
                volumePercentagePlayer.textContent = this.value + '%';
                if (volumePercentage) volumePercentage.textContent = this.value + '%';
                if (volumeSlider) volumeSlider.value = this.value;
                updateVolumeIcon(volume);
                console.log(`🎛️ Volume set to ${this.value}% (stored for future tracks)`);
            }
        });
    }
    
    if (closePlayerBtn) {
        closePlayerBtn.addEventListener('click', function() {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                resetAllCards();
                hideMusicPlayer();
                currentAudio = null;
                currentPlayingCard = null;
                currentArtistIndex = -1;
            }
        });
    }
    
    function loadNewTrack(audioSrc, artistName, imageSrc) {
        if (currentAudio) {
            currentAudio.pause();
            resetAllCards();
        }
        
        currentAudio = new Audio(audioSrc);
        currentAudio.volume = currentVolume; // Apply stored volume to new track
        setupAudioEvents();
        updatePlayerInfo(artistName, imageSrc);
        
        // Update volume displays to show current volume
        if (volumeSliderPlayer) {
            volumeSliderPlayer.value = Math.round(currentVolume * 100);
            volumePercentagePlayer.textContent = Math.round(currentVolume * 100) + '%';
        }
        if (volumeSlider) {
            volumeSlider.value = Math.round(currentVolume * 100);
            if (volumePercentage) volumePercentage.textContent = Math.round(currentVolume * 100) + '%';
        }
        updateVolumeIcon(currentVolume);
        
        currentAudio.play().catch(error => {
            console.log(`❌ Playback failed for ${artistName}:`, error);
        });
        
        console.log(`🎵 New track loaded with volume: ${Math.round(currentVolume * 100)}%`);
    }
    
    function resetAllCards() {
        artistCards.forEach(card => {
            const icon = card.querySelector('.artist-overlay i');
            const overlay = card.querySelector('.artist-overlay');
            if (icon) icon.className = 'fas fa-play';
            if (overlay) overlay.classList.remove('playing');
            card.classList.remove('playing');
        });
    }
    
    // Master volume control event listener (legacy)
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            const volume = this.value / 100;
            currentVolume = volume; // Store the volume preference
            if (currentAudio) {
                currentAudio.volume = volume;
                volumePercentage.textContent = this.value + '%';
                if (volumeSliderPlayer) volumeSliderPlayer.value = this.value;
                if (volumePercentagePlayer) volumePercentagePlayer.textContent = this.value + '%';
                updateVolumeIcon(volume);
                console.log(`🎛️ Master volume set to ${this.value}% (stored for future tracks)`);
            }
        });
    }
    
    artistCards.forEach(card => {
        const audioSrc = card.getAttribute('data-audio');
        const overlay = card.querySelector('.artist-overlay');
        const playIcon = overlay.querySelector('i');
        const artistName = card.querySelector('h5').textContent;
        


        // Find current artist index
        const currentArtist = artistsData.find(artist => artist.audioSrc === audioSrc);
        if (currentArtist) {
            currentArtistIndex = artistsData.indexOf(currentArtist);
        }

        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            // If there's currently playing audio and it's not this card
            if (currentAudio && currentPlayingCard !== card) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                
                // Reset previous card's visual state
                const prevIcon = currentPlayingCard.querySelector('.artist-overlay i');
                const prevOverlay = currentPlayingCard.querySelector('.artist-overlay');
                prevIcon.className = 'fas fa-play';
                prevOverlay.classList.remove('playing');
                currentPlayingCard.classList.remove('playing');
            }
            
            // If clicking the same card that's playing
            if (currentPlayingCard === card && currentAudio && !currentAudio.paused) {
                currentAudio.pause();
                playIcon.className = 'fas fa-play';
                overlay.classList.remove('playing');
                card.classList.remove('playing');
                
                // Hide master volume control when paused
                musicSection.classList.remove('has-playing');
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                
                console.log(`⏸️ Paused: ${artistName}`);
                return;
            }
            
            // Create new audio or resume existing
            if (!currentAudio || currentPlayingCard !== card) {
                currentAudio = new Audio(audioSrc);
                currentAudio.volume = currentVolume; // Apply stored volume to new track
                currentPlayingCard = card;
                
                // Update player info
                updatePlayerInfo(artistName, card.querySelector('.artist-image').src);
                
                setupAudioEvents();
                
                console.log(`🎵 New track created with volume: ${Math.round(currentVolume * 100)}%`);
            }
            
            // Play the audio
            currentAudio.play().catch(error => {
                console.log(`❌ Playback failed for ${artistName}:`, error);
                playIcon.className = 'fas fa-exclamation-triangle';
                setTimeout(() => {
                    playIcon.className = 'fas fa-play';
                }, 2000);
            });
        });
    });
    
    function setupAudioEvents() {
        // Audio event listeners
        currentAudio.addEventListener('loadstart', () => {
            const artistName = currentPlayingCard ? currentPlayingCard.querySelector('h5').textContent : 'Unknown';
            console.log(`📻 Loading: ${artistName}`);
        });
        
        currentAudio.addEventListener('canplay', () => {
            const artistName = currentPlayingCard ? currentPlayingCard.querySelector('h5').textContent : 'Unknown';
            console.log(`🎵 Ready to play: ${artistName}`);
        });
        
        currentAudio.addEventListener('play', () => {
            if (currentPlayingCard) {
                const playIcon = currentPlayingCard.querySelector('.artist-overlay i');
                const overlay = currentPlayingCard.querySelector('.artist-overlay');
                const artistName = currentPlayingCard.querySelector('h5').textContent;
                
                playIcon.className = 'fas fa-pause';
                overlay.classList.add('playing');
                currentPlayingCard.classList.add('playing');
                
                // Show music player interface
                showMusicPlayer();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                
                // Show master volume control and sync with audio
                musicSection.classList.add('has-playing');
                if (volumeSlider) {
                    volumeSlider.value = Math.round(currentVolume * 100);
                    volumePercentage.textContent = Math.round(currentVolume * 100) + '%';
                }
                if (volumeSliderPlayer) {
                    volumeSliderPlayer.value = Math.round(currentVolume * 100);
                    volumePercentagePlayer.textContent = Math.round(currentVolume * 100) + '%';
                }
                
                updateVolumeIcon(currentVolume);
                console.log(`▶️ Playing: ${artistName}`);
            }
        });
        
        currentAudio.addEventListener('pause', () => {
            if (currentPlayingCard) {
                const playIcon = currentPlayingCard.querySelector('.artist-overlay i');
                const overlay = currentPlayingCard.querySelector('.artist-overlay');
                
                playIcon.className = 'fas fa-play';
                overlay.classList.remove('playing');
                currentPlayingCard.classList.remove('playing');
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        currentAudio.addEventListener('ended', () => {
            if (currentPlayingCard) {
                const playIcon = currentPlayingCard.querySelector('.artist-overlay i');
                const overlay = currentPlayingCard.querySelector('.artist-overlay');
                const artistName = currentPlayingCard.querySelector('h5').textContent;
                
                playIcon.className = 'fas fa-play';
                overlay.classList.remove('playing');
                currentPlayingCard.classList.remove('playing');
                
                // Auto-play next song if available
                if (currentArtistIndex < artistsData.length - 1) {
                    currentArtistIndex++;
                    const nextArtist = artistsData[currentArtistIndex];
                    setTimeout(() => {
                        loadNewTrack(nextArtist.audioSrc, nextArtist.name, nextArtist.imageSrc);
                    }, 1000);
                } else {
                    // Hide interfaces when playlist ends
                    musicSection.classList.remove('has-playing');
                    hideMusicPlayer();
                    currentAudio = null;
                    currentPlayingCard = null;
                    currentArtistIndex = -1;
                }
                
                console.log(`🏁 Finished: ${artistName}`);
            }
        });
        
        currentAudio.addEventListener('timeupdate', updateProgressBar);
        
        currentAudio.addEventListener('error', (e) => {
            if (currentPlayingCard) {
                const playIcon = currentPlayingCard.querySelector('.artist-overlay i');
                const artistName = currentPlayingCard.querySelector('h5').textContent;
                
                console.log(`❌ Audio error for ${artistName}:`, e);
                playIcon.className = 'fas fa-exclamation-triangle';
                setTimeout(() => {
                    playIcon.className = 'fas fa-play';
                }, 2000);
            }
        });
    }
    
    console.log(`🎶 Audio player initialized for ${artistCards.length} artists`);
}

// ===== EXPERIENCE SECTION FUNCTIONALITY =====
function initExperienceSection() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const headerButtons = document.querySelectorAll('.header-btn');
    const experienceContainer = document.querySelector('.experience-container');
    const experienceHeader = document.getElementById('experience-header');
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    if (!experienceContainer) {
        console.log('ℹ️ Experience section not found on this page');
        return;
    }
    
    // Initialize condensed view - hide all details by default
    experienceContainer.classList.add('condensed');
    
    // Check if expanded view is active and show all content accordingly
    const activeViewBtn = document.querySelector('.view-btn.active');
    if (activeViewBtn && activeViewBtn.getAttribute('data-view') === 'expanded') {
        experienceContainer.classList.remove('condensed');
        // Show all additional content and hide read more buttons in expanded view
        readMoreButtons.forEach(btn => {
            const additionalContent = btn.nextElementSibling;
            if (additionalContent && additionalContent.classList.contains('additional-content')) {
                additionalContent.classList.add('expanded');
                btn.style.display = 'none'; // Hide read more buttons in expanded view
            }
        });
        
        // Force all additional content to be visible in expanded view
        const allAdditionalContent = document.querySelectorAll('.additional-content');
        allAdditionalContent.forEach(content => {
            content.classList.add('expanded');
        });
    }
    
    // Handle toggle between Expanded and Condensed views
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const view = button.getAttribute('data-view');
            
            if (view === 'condensed') {
                experienceContainer.classList.add('condensed');
                // Reset all read more states when switching to condensed
                readMoreButtons.forEach(btn => {
                    const additionalContent = btn.nextElementSibling;
                    if (additionalContent && additionalContent.classList.contains('additional-content')) {
                        additionalContent.classList.remove('expanded');
                        btn.textContent = 'Read more ↓';
                        btn.style.display = 'block'; // Show read more buttons in condensed view
                    }
                });
            } else {
                experienceContainer.classList.remove('condensed');
                // In expanded view, show all additional content and hide read more buttons
                readMoreButtons.forEach(btn => {
                    const additionalContent = btn.nextElementSibling;
                    if (additionalContent && additionalContent.classList.contains('additional-content')) {
                        additionalContent.classList.add('expanded');
                        btn.style.display = 'none'; // Hide read more buttons in expanded view
                    }
                });
                
                // Force all additional content to be visible in expanded view
                const allAdditionalContent = document.querySelectorAll('.additional-content');
                allAdditionalContent.forEach(content => {
                    content.classList.add('expanded');
                });
            }
            
            console.log(`📋 Experience view changed to: ${view}`);
        });
    });
    
    // Handle header toggle buttons
    headerButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all header buttons
            headerButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const headerType = button.getAttribute('data-header');
            
            // Update the header text
            if (headerType === 'experience') {
                experienceHeader.textContent = 'Experience';
                experienceContainer.classList.remove('show-work', 'show-education');
                experienceContainer.classList.add('show-experience');
            } else if (headerType === 'work') {
                experienceHeader.textContent = 'Work';
                experienceContainer.classList.remove('show-experience', 'show-education');
                experienceContainer.classList.add('show-work');
            } else if (headerType === 'education') {
                experienceHeader.textContent = 'Education';
                experienceContainer.classList.remove('show-experience', 'show-work');
                experienceContainer.classList.add('show-education');
            }
            
            console.log(`📋 Header changed to: ${headerType}`);
        });
    });
    
    // Handle read more buttons (only in condensed view)
    readMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Only allow read more functionality in condensed view
            if (experienceContainer.classList.contains('condensed')) {
                const additionalContent = button.nextElementSibling;
                if (additionalContent && additionalContent.classList.contains('additional-content')) {
                    const isExpanded = additionalContent.classList.contains('expanded');
                    
                    if (isExpanded) {
                        additionalContent.classList.remove('expanded');
                        button.textContent = 'Read more ↓';
                    } else {
                        additionalContent.classList.add('expanded');
                        button.textContent = 'Read less ↑';
                    }
                    
                    console.log(`📖 Read more toggled: ${isExpanded ? 'collapsed' : 'expanded'}`);
                }
            }
        });
    });
    
    console.log(`💼 Experience section initialized with ${viewButtons.length} view buttons, ${headerButtons.length} header buttons, and ${readMoreButtons.length} read more buttons`);
}


console.log('🎮 League of Legends Portfolio loaded successfully!');
console.log('✨ Comprehensive scroll-to-top system activated!');
console.log('🔄 Page will always start at top when switching tabs!');

// ===== DYNAMIC HEADING FUNCTIONALITY =====
function initDynamicHeading() {
    const clickableElements = document.querySelectorAll('.clickable-profile');
    const skillItems = document.querySelectorAll('.skill-item');
    const dynamicHeading = document.getElementById('dynamic-heading');
    const dynamicDescription = document.getElementById('dynamic-description');
    const mobileHeading = document.querySelector('.mobile-heading');
    const mobileDescription = document.querySelector('.mobile-description');
    
    // Array of different heading and description combinations
    const contentVariations = [
        {
            heading: "Hey, I'm Tim!",
            description: "A data janitor turning dirty data into clean dashboards, one sheet at a time."
        },
        {
            heading: "Data-Driven Decision Maker",
            description: "Leveraging analytics and insights to guide strategic business decisions. Turning complex data into actionable intelligence."
        },
        {
            heading: "Business Intelligence Specialist",
            description: "Creating powerful dashboards and reports that illuminate key business metrics. Making data accessible and actionable for stakeholders."
        },
        {
            heading: "Automation & Efficiency Expert",
            description: "Streamlining processes through intelligent automation. Building systems that work smarter, not harder."
        },
        {
            heading: "Strategic Data Analyst",
            description: "Connecting the dots between data and business outcomes. Helping organizations make informed, data-backed decisions."
        },
        {
            heading: "People-First Data Professional",
            description: "Understanding that behind every dataset are real people and real business challenges. Bridging technical expertise with human insight."
        }
    ];
    
    // Skill-specific content variations
    const skillContentVariations = {
                                'Python': [
                            {
                                heading: "Automation & Scripts",
                                description: "Automating the mundane so you can focus on the meaningful."
                            },
            {
                heading: "Data Science Specialist",
                description: "Leveraging Python for advanced analytics, machine learning, and data processing workflows."
            },
            {
                heading: "Automation Engineer",
                description: "Creating intelligent automation solutions with Python to streamline business processes and workflows."
            }
        ],
                                'SQL': [
                            {
                                heading: "Database Management",
                                description: "Extracting facts, transforming logic, loading impact."
                            },
            {
                heading: "Data Architecture Specialist",
                description: "Building robust data foundations and complex queries that support scalable business intelligence."
            },
            {
                heading: "Database Management Professional",
                description: "Transforming complex business requirements into efficient database designs and SQL solutions."
            }
        ],
        'BI': [
                                    {
                                                    heading: "Data Visualization",
                        description: "Making your data look good and your insights even better."
                        },
            {
                heading: "Data Visualization Expert",
                description: "Designing interactive dashboards and visualizations that make complex data accessible to all stakeholders."
            },
            {
                heading: "Analytics Professional",
                description: "Transforming raw data into actionable insights through compelling business intelligence solutions."
            }
        ]
    };
    
    let currentIndex = 0; // For profile clicks
    
    // New state variables to track what's currently displayed
    let activeContentType = 'profile'; // Can be 'profile' or 'skill'
    let activeSkillDisplayed = null; // Stores the name of the skill whose content is currently displayed
    let currentlySelectedElement = null; // Track the currently selected element
    
    // Debouncing mechanism to prevent rapid clicking
    let isUpdating = false;
    let updateTimeout = null;
    
    // Function to remove glow from all elements
    function removeGlowFromAll() {
        // Remove glow from all profile elements
        clickableElements.forEach(element => {
            element.classList.remove('selected-glow');
        });
        
        // Remove glow from all skill elements
        skillItems.forEach(element => {
            element.classList.remove('selected-glow');
        });
    }
    
    // Function to apply glow to a specific element
    function applyGlowToElement(element) {
        removeGlowFromAll();
        element.classList.add('selected-glow');
        currentlySelectedElement = element;
    }
    
    function updateContent() { // For profile clicks
        // Prevent multiple rapid updates
        if (isUpdating) {
            return;
        }
        
        // If profile content is already active, do nothing
        if (activeContentType === 'profile') {
            return;
        }
        
        // If we are currently displaying skill content, switch to profile content
        if (activeContentType === 'skill') {
            activeContentType = 'profile';
            activeSkillDisplayed = null; // Clear active skill
        }
        
        isUpdating = true;
        
        // Always show the first variation for profile clicks
        const variation = contentVariations[0]; // Always pick the first one
        
        // Clear any existing timeout
        if (updateTimeout) {
            clearTimeout(updateTimeout);
        }
        
        // Start typography animation for desktop
        if (dynamicHeading && dynamicDescription) {
            typographyAnimation(dynamicHeading, variation.heading, () => {
                // Heading animation complete
            });
            
            typographyAnimation(dynamicDescription, variation.description, () => {
                // Description animation complete
            });
        }
        
        // Start typography animation for mobile
        if (mobileHeading && mobileDescription) {
            typographyAnimation(mobileHeading, variation.heading, () => {
                // Mobile heading animation complete
            });
            
            typographyAnimation(mobileDescription, variation.description, () => {
                // Mobile description animation complete
                // Set profile as active content type
                activeContentType = 'profile';
                
                // Allow updates again after animation completes
                setTimeout(() => {
                    isUpdating = false;
                }, 200);
            });
        } else {
            // If no mobile elements, use desktop elements for completion
            if (dynamicHeading && dynamicDescription) {
                typographyAnimation(dynamicDescription, variation.description, () => {
                    // Set profile as active content type
                    activeContentType = 'profile';
                    
                    // Allow updates again after animation completes
                    setTimeout(() => {
                        isUpdating = false;
                    }, 200);
                });
            }
        }
    }
    
    // Typography animation function
    function typographyAnimation(element, finalText, onComplete) {
        const originalText = element.textContent;
        const originalOpacity = element.style.opacity || '1';
        
        // Store original dimensions
        const originalHeight = element.offsetHeight;
        
        // Fade out current text
        element.style.transition = 'opacity 0.3s ease-out';
        element.style.opacity = '0';
        
        setTimeout(() => {
            // Change text content
            element.textContent = finalText;
            
            // Get the new content's natural height
            const newHeight = element.scrollHeight;
            
            // Set up smooth height transition
            element.style.transition = 'opacity 0.4s ease-in, height 0.5s ease-out';
            element.style.height = originalHeight + 'px';
            element.style.overflow = 'hidden';
            
            // Force a reflow to ensure the height is applied
            element.offsetHeight;
            
            // Fade in new text and transition height
            element.style.opacity = '1';
            element.style.height = newHeight + 'px';
            
            // Add a subtle scale effect
            element.style.transform = 'scale(1.01)';
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                
                // Clean up after transition completes
                setTimeout(() => {
                    element.style.height = '';
                    element.style.overflow = '';
                    element.style.transition = '';
                    element.style.opacity = originalOpacity;
                    element.style.transform = '';
                    
                    if (onComplete) onComplete();
                }, 100);
            }, 250);
        }, 300);
    }

    function updateSkillContent(skillName) { // For skill tag clicks
        // Prevent multiple rapid updates
        if (isUpdating) {
            return;
        }
        
        // If this skill's content is already active, do nothing
        if (activeContentType === 'skill' && activeSkillDisplayed === skillName) {
            return;
        }
        
        const variations = skillContentVariations[skillName];
        
        if (!variations || variations.length === 0) return; // Ensure variations exist
        
        // Set this skill as the active content source
        activeContentType = 'skill';
        activeSkillDisplayed = skillName;
        
        isUpdating = true;
        
        // Always show the first variation for the clicked skill
        const variation = variations[0]; // This is the key change: always pick the first one
        
        // Clear any existing timeout
        if (updateTimeout) {
            clearTimeout(updateTimeout);
        }
        
        // Start typography animation for desktop
        if (dynamicHeading && dynamicDescription) {
            typographyAnimation(dynamicHeading, variation.heading, () => {
                // Heading animation complete
            });
            
            typographyAnimation(dynamicDescription, variation.description, () => {
                // Description animation complete
            });
        }
        
        // Start typography animation for mobile
        if (mobileHeading && mobileDescription) {
            typographyAnimation(mobileHeading, variation.heading, () => {
                // Mobile heading animation complete
            });
            
            typographyAnimation(mobileDescription, variation.description, () => {
                // Mobile description animation complete
                // Allow updates again after animation completes
                setTimeout(() => {
                    isUpdating = false;
                }, 200);
            });
        } else {
            // If no mobile elements, use desktop elements for completion
            if (dynamicHeading && dynamicDescription) {
                typographyAnimation(dynamicDescription, variation.description, () => {
                    // Allow updates again after animation completes
                    setTimeout(() => {
                        isUpdating = false;
                    }, 200);
                });
            }
        }
    }
    
    // Add click event listeners to all clickable profile elements
    clickableElements.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            updateContent();
            
            // Apply glow to this element
            applyGlowToElement(element);
            
            // Add a subtle animation effect
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add click event listeners to skill items
    skillItems.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the skill name from the span element
            const skillSpan = element.querySelector('span');
            const skillName = skillSpan ? skillSpan.textContent : '';
            
            if (skillName && skillContentVariations[skillName]) {
                updateSkillContent(skillName);
                
                // Apply glow to this element
                applyGlowToElement(element);
                
                // Add a subtle animation effect
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
    
    // Add smooth transition styles
    dynamicHeading.style.transition = 'opacity 0.2s ease-in-out';
    dynamicDescription.style.transition = 'opacity 0.2s ease-in-out';
    
            // Set "Hey, I'm Tim!" as the default content immediately
    if (clickableElements.length > 0) {
        // Set the default content for desktop
        if (dynamicHeading && dynamicDescription) {
            dynamicHeading.textContent = contentVariations[0].heading;
            dynamicDescription.textContent = contentVariations[0].description;
        }
        
        // Set the default content for mobile
        if (mobileHeading && mobileDescription) {
            mobileHeading.textContent = contentVariations[0].heading;
            mobileDescription.textContent = contentVariations[0].description;
        }
        
        // Apply glow to the first profile element (headshot)
        const firstProfileElement = clickableElements[0];
        applyGlowToElement(firstProfileElement);
        
        // Set profile as the active content type
        activeContentType = 'profile';
    }
}

// ===== CONTACT MODAL FUNCTIONALITY =====
function initContactModal() {
    const contactModal = document.getElementById('contact-modal');
    const contactModalClose = document.getElementById('contact-modal-close');
    const contactNavLink = document.querySelector('a[href="#contact"]');
    
    if (!contactModal || !contactModalClose || !contactNavLink) {
        console.warn('Contact modal elements not found');
        return;
    }
    
    // Open modal when Contact nav link is clicked
    contactNavLink.addEventListener('click', (e) => {
        e.preventDefault();
        openContactModal();
    });
    
    // Close modal when X button is clicked
    contactModalClose.addEventListener('click', () => {
        closeContactModal();
    });
    
    // Close modal when clicking outside the modal content
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal.classList.contains('active')) {
            closeContactModal();
        }
    });
    
    function openContactModal() {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    function closeContactModal() {
        contactModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// ===== RESUME MODAL FUNCTIONALITY =====
function initResumeModal() {
    const resumeModal = document.getElementById('resume-modal');
    const resumeModalClose = document.getElementById('resume-modal-close');
    const resumeBtn = document.getElementById('resume-btn');
    const mobileResumeBtn = document.getElementById('mobile-resume-btn');
    
    if (!resumeModal || !resumeModalClose || !resumeBtn) {
        console.warn('Resume modal elements not found');
        return;
    }
    
    // Open modal when Resume button is clicked (desktop)
    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openResumeModal();
    });
    
    // Open modal when Mobile Resume button is clicked
    if (mobileResumeBtn) {
        mobileResumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openResumeModal();
        });
    }
    
    // Close modal when X button is clicked
    resumeModalClose.addEventListener('click', () => {
        closeResumeModal();
    });
    
    // Close modal when clicking outside the modal content
    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            closeResumeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
            closeResumeModal();
        }
    });
    
    function openResumeModal() {
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    function closeResumeModal() {
        resumeModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// ===== MOBILE SCROLL RESTORATION =====
function ensureMobileScrollRestoration() {
    // Only apply on mobile devices
    if (window.innerWidth <= 768) {
        // Remove any problematic classes that might prevent scrolling
        document.body.classList.remove('mobile-nav-open');
        document.body.classList.remove('homepage-active');
        
        // Ensure body overflow is restored
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
        
        // Force a reflow to ensure changes take effect
        document.body.offsetHeight;
        
        console.log('🔄 Mobile scroll restoration applied');
    }
}

// ===== MOBILE NAVIGATION FUNCTIONALITY =====