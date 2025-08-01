/* ===== LEAGUE OF LEGENDS THEMED PORTFOLIO - JAVASCRIPT ===== */

// ===== GLOBAL VARIABLES =====
let currentSection = 'home';
const scrollPositions = {};
const originalOrder = ['sports', 'tv', 'anime', 'music', 'games', 'travel'];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing portfolio...');
    
    // Initialize all systems
    initNavigation();
    initCounters();
    initScrollToTop();
    initScrollAnimations();
    initContactAnimations();
    initChatWidget();
    initAudioPlayer();
    
    // Force scroll to top on page load
    forceScrollToTopComprehensive();
    
    console.log('✅ Portfolio initialization complete');
});

// ===== NAVIGATION SYSTEM =====
function initNavigation() {
    console.log('🧭 Initializing navigation system...');
    
    const navLinks = document.querySelectorAll('.nav-item[data-section]');
    const sections = document.querySelectorAll('.main-section');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log(`📍 Found ${navLinks.length} nav links and ${sections.length} sections`);
    
    // Navigation click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.dataset.section;
            console.log(`🔄 Tab navigation clicked, forcing scroll to top`);
            
            // Save current scroll position
            if (currentSection && currentSection !== 'home') {
                const currentSectionElement = document.getElementById(currentSection);
                if (currentSectionElement) {
                    scrollPositions[currentSection] = currentSectionElement.scrollTop;
                }
            }
            
            // Switch sections
            switchToSection(targetSection);
            
            // Force scroll to top with multiple attempts for reliability
            forceScrollToTopComprehensive();
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Set initial active state
    switchToSection('home');
    
    console.log('✅ Navigation system initialized');
}

function switchToSection(sectionName) {
    console.log(`🔄 Switching to section: ${sectionName}`);
    
    // Update nav active states
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`.nav-item[data-section="${sectionName}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    // Update section visibility
    document.querySelectorAll('.main-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Restore scroll position for content sections
        if (sectionName !== 'home' && scrollPositions[sectionName] !== undefined) {
            setTimeout(() => {
                targetSection.scrollTop = scrollPositions[sectionName];
            }, 100);
        }
        
        // Trigger animations for specific sections
        setTimeout(() => {
            if (sectionName === 'about') {
                const aboutSection = document.getElementById('about');
                if (aboutSection && aboutSection.classList.contains('active')) {
                    triggerAboutAnimations();
                }
            } else if (sectionName === 'contact') {
                triggerContactAnimations();
            } else {
                resetContactAnimations();
            }
        }, 100);
    }
    
    currentSection = sectionName;
    console.log(`✅ Section switched to: ${sectionName}`);
}

// ===== SCROLL TO TOP FUNCTIONALITY =====
function initScrollToTop() {
    console.log('⬆️ Initializing scroll-to-top system...');
    
    const scrollButton = document.getElementById('scrollTop');
    if (!scrollButton) {
        console.warn('❌ Scroll-to-top button not found');
        return;
    }
    
    console.log('✅ Scroll-to-top button found and initialized');
    
    // Show button on all content-rich tabs
    const contentRichTabs = ['experience', 'projects', 'about', 'contact'];
    
    // Create mutation observer to watch for section changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('main-section') && target.classList.contains('active')) {
                    const sectionId = target.id;
                    if (contentRichTabs.includes(sectionId)) {
                        scrollButton.style.opacity = '1';
                        scrollButton.style.visibility = 'visible';
                        scrollButton.style.pointerEvents = 'auto';
                    } else {
                        scrollButton.style.opacity = '0';
                        scrollButton.style.visibility = 'hidden';
                        scrollButton.style.pointerEvents = 'none';
                    }
                }
            }
        });
    });
    
    // Observe all main sections
    document.querySelectorAll('.main-section').forEach(section => {
        observer.observe(section, { attributes: true });
    });
    
    // Button click handler
    scrollButton.addEventListener('click', function() {
        console.log('⬆️ Scroll-to-top button clicked');
        forceScrollToTopComprehensive();
    });
    
    // Initial state check
    setTimeout(() => {
        const activeSection = document.querySelector('.main-section.active');
        if (activeSection && contentRichTabs.includes(activeSection.id)) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
            scrollButton.style.pointerEvents = 'auto';
        }
    }, 100);
    
    console.log('✅ Scroll-to-top system activated!');
}

function forceScrollToTopComprehensive() {
    console.log('🔄 Executing comprehensive scroll-to-top...');
    
    // Method 1: Immediate window scroll
    window.scrollTo(0, 0);
    
    // Method 2: Set document scroll
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Method 3: Reset active section scroll
    const activeSection = document.querySelector('.main-section.active');
    if (activeSection) {
        activeSection.scrollTop = 0;
    }
    
    // Method 4: Multiple attempts with delays
    const attempts = [50, 100, 150, 200];
    attempts.forEach((delay, index) => {
        setTimeout(() => {
            console.log(`🔄 Tab navigation: Force scroll attempt ${index + 1}`);
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            
            const currentActiveSection = document.querySelector('.main-section.active');
            if (currentActiveSection) {
                currentActiveSection.scrollTop = 0;
            }
            
            if (index === attempts.length - 1) {
                console.log('🔄 Tab navigation: Final force scroll');
            }
        }, delay);
    });
    
    console.log('🔄 Page will always start at top when switching tabs!');
}

// ===== COUNTER ANIMATIONS =====
function initCounters() {
    console.log('🔢 Initializing counter animations...');
    
    const counters = document.querySelectorAll('.counter');
    console.log(`🔢 Found counters: ${counters.length}`);
    
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                console.log(`👀 Observing counter: ${counter.textContent} ${counters.length}`);
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach((counter, index) => {
        console.log(`👁️ Counter visible, starting animation`);
        observer.observe(counter);
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const prefix = counter.getAttribute('data-prefix') || '';
    const suffix = counter.getAttribute('data-suffix') || '';
    
    console.log(`🎯 Animating counter to: ${target} ${suffix} with ${prefix}`);
    
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = prefix + target + suffix;
            clearInterval(timer);
        } else {
            counter.textContent = prefix + Math.floor(current) + suffix;
        }
    }, 30);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    console.log('🎬 Initializing scroll animations...');
    
    const animatedElements = document.querySelectorAll(
        '.experience-item, .project-card, .education-item'
    );
    
    console.log(`🎬 Found ${animatedElements.length} elements to animate`);
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach((element, index) => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(element);
    });
    
    console.log('✅ Scroll animations initialized');
}

// ===== ABOUT SECTION ANIMATIONS =====
function triggerAboutAnimations() {
    console.log('🎬 Triggering About section animations...');
    
    // Animate interest sections
    const interestSections = document.querySelectorAll('.interest-section');
    interestSections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Animate hub
    const hub = document.querySelector('.interests-hub');
    if (hub) {
        setTimeout(() => {
            hub.style.opacity = '1';
            hub.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Animate satellites
    const satellites = document.querySelectorAll('.interest-satellite');
    satellites.forEach((satellite, index) => {
        setTimeout(() => {
            satellite.style.opacity = '1';
            satellite.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 500 + (index * 100));
    });
}

// ===== CONTACT SECTION ANIMATIONS =====
function initContactAnimations() {
    console.log('📧 Initializing contact animations...');
    
    const contactElements = document.querySelectorAll('.contact-info, .contact-form, .social-links');
    
    // Set default visible state
    contactElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Check if contact section is active on load
    const contactSection = document.getElementById('contact');
    if (contactSection && contactSection.classList.contains('active')) {
        setTimeout(() => {
            triggerContactAnimations();
        }, 100);
    }
}

function resetContactAnimations() {
    const contactElements = document.querySelectorAll('.contact-info, .contact-form, .social-links');
    
    contactElements.forEach(element => {
        element.classList.remove('animated');
        element.classList.add('preparing-animation');
    });
    
    setTimeout(() => {
        contactElements.forEach(element => {
            element.classList.remove('preparing-animation');
        });
    }, 50);
}

function triggerContactAnimations() {
    console.log('📧 Triggering contact animations...');
    
    const contactElements = document.querySelectorAll('.contact-info, .contact-form, .social-links');
    
    // First hide elements
    contactElements.forEach(element => {
        element.classList.add('preparing-animation');
    });
    
    // Then animate them in with stagger
    setTimeout(() => {
        contactElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.remove('preparing-animation');
                element.classList.add('animated');
            }, index * 200);
        });
    }, 100);
}

// ===== CHAT WIDGET =====
function initChatWidget() {
    console.log('🤖 Initializing GPT-powered chat widget...');
    
    const chatWidget = document.getElementById('chatWidget');
    const chatMinimize = document.getElementById('chatMinimize');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');
    
    const elements = {
        chatWidget: !!chatWidget,
        chatMinimize: !!chatMinimize,
        chatInput: !!chatInput,
        sendButton: !!sendButton,
        chatMessages: !!chatMessages
    };
    
    console.log('📋 Chat widget elements found:', elements);
    
    if (!chatWidget || !chatMinimize || !chatInput || !sendButton || !chatMessages) {
        console.warn('⚠️ Some chat widget elements not found, skipping initialization');
        return;
    }
    
    console.log('✅ Chat widget initialized successfully');
    
    // Load environment configuration
    loadEnvironmentConfig();
}

function loadEnvironmentConfig() {
    console.log('🔍 Starting to load environment config...');
    
    try {
        const configData = localStorage.getItem('portfolioConfig');
        console.log('📦 Raw localStorage data:', configData || 'Not found');
        
        if (configData) {
            const config = JSON.parse(configData);
            window.portfolioConfig = config;
            console.log('✅ Environment config loaded from localStorage');
        } else {
            console.log('❌ No environment config found in localStorage');
            window.portfolioConfig = null;
            console.log('💡 Please go to setup-env.html and save your configuration');
        }
    } catch (error) {
        console.error('❌ Error loading environment config:', error);
        window.portfolioConfig = null;
    }
    
    // Debug output
    const debugConfig = {
        hasApiKey: !!(window.portfolioConfig && window.portfolioConfig.openaiApiKey),
        apiKeyLength: window.portfolioConfig && window.portfolioConfig.openaiApiKey ? 
            window.portfolioConfig.openaiApiKey.length : 24,
        model: window.portfolioConfig ? window.portfolioConfig.model : 'gpt-3.5-turbo',
        maxTokens: window.portfolioConfig ? window.portfolioConfig.maxTokens : 200,
        temperature: window.portfolioConfig ? window.portfolioConfig.temperature : 0.7
    };
    
    console.log('⚙️ API Configuration loaded:', debugConfig);
}

// ===== SHOW ALL FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const showAllBtn = document.getElementById('showAllBtn');
    console.log('🔍 Show All button found:', !!showAllBtn);
    
    if (showAllBtn) {
        showAllBtn.addEventListener('click', function() {
            console.log('👁️ Show All button clicked');
            
            // Get the about section
            const aboutSection = document.getElementById('about');
            if (!aboutSection) {
                console.warn('⚠️ About section not found');
                return;
            }
            
            // Show all interest sections
            const hiddenSections = aboutSection.querySelectorAll('.interest-section.hidden');
            hiddenSections.forEach(section => {
                section.classList.remove('hidden');
                section.style.display = 'block';
            });
            
            // Hide the show all button
            this.style.display = 'none';
            
            // Trigger layout recalculation
            setTimeout(() => {
                const interestSections = aboutSection.querySelectorAll('.interest-section');
                console.log(`📊 Total sections now visible: ${interestSections.length}`);
            }, 100);
        });
    }
});

// ===== AUDIO PLAYER =====
function initAudioPlayer() {
    console.log('🎵 Initializing audio player for artists');
    
    let currentAudio = null;
    let currentPlayingCard = null;
    let currentVolume = 0.15; // Store current volume (default 15%)
    
    // Get all artist cards with audio
    const artistCards = document.querySelectorAll('.artist-card[data-audio]');
    
    // Get master volume controls (legacy)
    const masterVolumeSlider = document.querySelector('.volume-slider');
    const masterVolumePercentage = document.querySelector('.volume-percentage');
    const masterVolumeIcon = document.querySelector('.volume-icon');
    
    // Get music player elements
    const musicPlayer = document.getElementById('musicPlayer');
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.querySelector('.progress-fill');
    const currentTimeSpan = document.querySelector('.time-current');
    const totalTimeSpan = document.querySelector('.time-total');
    const volumeSliderPlayer = document.querySelector('.volume-slider-player');
    const volumePercentagePlayer = document.querySelector('.volume-percentage-player');
    const volumeIconPlayer = document.querySelector('.volume-icon-player');
    const closePlayerBtn = document.querySelector('.close-player-btn');
    const trackTitle = document.querySelector('.track-title');
    const trackArtist = document.querySelector('.track-artist');
    const albumArt = document.querySelector('.album-art');
    
    // Get music section
    const musicSection = document.querySelector('.interest-section[data-category="music"]');
    
    // Artists data for navigation
    const artistsData = [
        { name: 'FKJ', audio: 'Music/FKJ.mp3', image: 'images/Artists/fkj.jpg' },
        { name: 'bbno$', audio: 'Music/bbno$.mp3', image: 'images/Artists/bbno$.jpg' },
        { name: 'BIBI', audio: 'Music/BIBI.mp3', image: 'images/Artists/bibi.jpg' },
        { name: 'HYBS', audio: 'Music/HYBS.mp3', image: 'images/Artists/hybs.jpg' },
        { name: 'Kyle Dion', audio: 'Music/Kyle Dion.mp3', image: 'images/Artists/kyle dion.jpg' },
        { name: 'SZA', audio: 'Music/SZA.mp3', image: 'images/Artists/sza.jpg' }
    ];
    
    let currentArtistIndex = 0;
    
    if (artistCards.length === 0) {
        console.warn('⚠️ No artist cards with audio found');
        return;
    }
    
    console.log(`🎵 Found ${artistCards.length} artist cards with audio`);
    
    // Functions
    function showMusicPlayer() {
        if (musicPlayer) {
            musicPlayer.classList.add('active');
        }
        if (musicSection) {
            musicSection.classList.add('has-playing');
        }
    }
    
    function hideMusicPlayer() {
        if (musicPlayer) {
            musicPlayer.classList.remove('active');
        }
        if (musicSection) {
            musicSection.classList.remove('has-playing');
        }
    }
    
    function updatePlayerInfo(artistName, imageSrc) {
        if (trackTitle) trackTitle.textContent = artistName;
        if (trackArtist) trackArtist.textContent = 'Artist';
        if (albumArt) {
            albumArt.src = imageSrc;
            albumArt.alt = `${artistName} Album Art`;
        }
    }
    
    function updateProgressBar() {
        if (currentAudio && progressFill && currentTimeSpan && totalTimeSpan) {
            const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
            progressFill.style.width = `${progress}%`;
            
            currentTimeSpan.textContent = formatTime(currentAudio.currentTime);
            totalTimeSpan.textContent = formatTime(currentAudio.duration);
        }
    }
    
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    function updateVolumeIcon(volume, iconElement) {
        if (!iconElement) return;
        
        iconElement.className = iconElement.className.replace(/fa-volume-\w+/, '');
        
        if (volume === 0) {
            iconElement.classList.add('fa-volume-mute');
        } else if (volume < 0.3) {
            iconElement.classList.add('fa-volume-down');
        } else if (volume < 0.7) {
            iconElement.classList.add('fa-volume-up');
        } else {
            iconElement.classList.add('fa-volume-up');
        }
    }
    
    function loadNewTrack(index) {
        if (index < 0 || index >= artistsData.length) return;
        
        const artist = artistsData[index];
        currentArtistIndex = index;
        
        // Stop current audio
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        
        // Reset all cards
        resetAllCards();
        
        // Find and activate the corresponding card
        const targetCard = document.querySelector(`.artist-card[data-audio="${artist.audio}"]`);
        if (targetCard) {
            targetCard.classList.add('playing');
            currentPlayingCard = targetCard;
        }
        
        // Create new audio
        currentAudio = new Audio(artist.audio);
        currentAudio.volume = currentVolume;
        
        // Setup audio events
        setupAudioEvents();
        
        // Update player info
        updatePlayerInfo(artist.name, artist.image);
        
        // Play the audio
        currentAudio.play().catch(error => {
            console.error('Error playing audio:', error);
        });
        
        // Show player
        showMusicPlayer();
        
        // Update play button
        if (playPauseBtn) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }
    
    function resetAllCards() {
        artistCards.forEach(card => {
            card.classList.remove('playing');
        });
    }
    
    function setupAudioEvents() {
        if (!currentAudio) return;
        
        currentAudio.addEventListener('timeupdate', updateProgressBar);
        
        currentAudio.addEventListener('ended', () => {
            console.log('🎵 Song ended, playing next...');
            
            // Play next song automatically
            const nextIndex = (currentArtistIndex + 1) % artistsData.length;
            loadNewTrack(nextIndex);
        });
        
        currentAudio.addEventListener('loadedmetadata', () => {
            updateProgressBar();
        });
    }
    
    // Artist card click handlers
    artistCards.forEach((card, index) => {
        const artistImage = card.querySelector('.artist-image');
        
        if (artistImage) {
            artistImage.addEventListener('click', function() {
                const audioSrc = card.dataset.audio;
                console.log(`🎵 Playing: ${audioSrc}`);
                
                // Find artist index
                const artistIndex = artistsData.findIndex(artist => artist.audio === audioSrc);
                if (artistIndex !== -1) {
                    loadNewTrack(artistIndex);
                }
            });
        }
    });
    
    // Music player controls
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (currentAudio) {
                if (currentAudio.paused) {
                    currentAudio.play();
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    currentAudio.pause();
                    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const prevIndex = currentArtistIndex > 0 ? currentArtistIndex - 1 : artistsData.length - 1;
            loadNewTrack(prevIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const nextIndex = (currentArtistIndex + 1) % artistsData.length;
            loadNewTrack(nextIndex);
        });
    }
    
    // Progress bar click to seek
    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            if (currentAudio) {
                const rect = progressBar.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const barWidth = rect.width;
                const clickRatio = clickX / barWidth;
                
                currentAudio.currentTime = clickRatio * currentAudio.duration;
            }
        });
    }
    
    // Volume controls - Header slider
    if (masterVolumeSlider) {
        masterVolumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            currentVolume = volume;
            
            if (currentAudio) {
                currentAudio.volume = volume;
            }
            
            // Update percentage display
            if (masterVolumePercentage) {
                masterVolumePercentage.textContent = `${e.target.value}%`;
            }
            
            // Update icon
            updateVolumeIcon(volume, masterVolumeIcon);
            
            // Sync with player volume slider
            if (volumeSliderPlayer) {
                volumeSliderPlayer.value = e.target.value;
            }
            if (volumePercentagePlayer) {
                volumePercentagePlayer.textContent = `${e.target.value}%`;
            }
            updateVolumeIcon(volume, volumeIconPlayer);
        });
    }
    
    // Volume controls - Player slider
    if (volumeSliderPlayer) {
        volumeSliderPlayer.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            currentVolume = volume;
            
            if (currentAudio) {
                currentAudio.volume = volume;
            }
            
            // Update percentage display
            if (volumePercentagePlayer) {
                volumePercentagePlayer.textContent = `${e.target.value}%`;
            }
            
            // Update icon
            updateVolumeIcon(volume, volumeIconPlayer);
            
            // Sync with header volume slider
            if (masterVolumeSlider) {
                masterVolumeSlider.value = e.target.value;
            }
            if (masterVolumePercentage) {
                masterVolumePercentage.textContent = `${e.target.value}%`;
            }
            updateVolumeIcon(volume, masterVolumeIcon);
        });
    }
    
    // Close player
    if (closePlayerBtn) {
        closePlayerBtn.addEventListener('click', () => {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            
            resetAllCards();
            hideMusicPlayer();
            
            if (playPauseBtn) {
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
            
            currentAudio = null;
            currentPlayingCard = null;
        });
    }
    
    // Initialize volume icons
    updateVolumeIcon(currentVolume, masterVolumeIcon);
    updateVolumeIcon(currentVolume, volumeIconPlayer);
    
    console.log('✅ Audio player initialized successfully');
}

console.log('📜 Script file loaded successfully');