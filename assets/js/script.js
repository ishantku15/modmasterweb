// Website Data Management
class WebsiteData {
    constructor() {
        this.data = {};
        this.searchResults = [];
        this.init();
    }

    async init() {
        // Hide loading screen immediately if it exists
        this.hideLoadingScreen();
        
        await this.loadData();
        this.bindEvents();
        this.initComponents();
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            // Hide loading screen after a short delay
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        }
    }

    async loadData() {
        try {
            const response = await fetch('data/data.json');
            if (response.ok) {
                this.data = await response.json();
            } else {
                throw new Error('Data file not found');
            }
        } catch (error) {
            console.warn('Data file not found, using default data');
            this.data = this.getDefaultData();
        }
        
        // Render content after data is loaded
        this.renderContent();
    }

    getDefaultData() {
        return {
            site: {
                name: "MODMASTER",
                description: "Premium APK & Course Platform",
                keywords: ["mod apk", "premium apps", "courses", "android"],
                author: "Ishant Webworks",
                email: "ishant150407@gmail.com",
                website: "https://ishant.shop",
                blog: "https://blogs.ishant.shop"
            },
            navigation: [
                { name: "Home", href: "#home" },
                { name: "APKs", href: "#apks" },
                { name: "Courses", href: "#courses" },
                { name: "Request", href: "#request" },
                { name: "About", href: "#about" }
            ],
            apks: [
                {
                    id: 1,
                    title: "Adobe Photoshop Premium",
                    description: "Professional photo editing with all premium features unlocked.",
                    category: "productivity",
                    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400",
                    downloadUrl: "https://drive.google.com/file/d/example1",
                    version: "2024.1.0",
                    size: "125 MB",
                    rating: 4.8,
                    featured: true
                },
                {
                    id: 2,
                    title: "Spotify Premium",
                    description: "Stream unlimited music without ads and offline downloads.",
                    category: "media",
                    image: "https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg?auto=compress&cs=tinysrgb&w=400",
                    downloadUrl: "https://drive.google.com/file/d/example2",
                    version: "8.8.0",
                    size: "45 MB",
                    rating: 4.9,
                    featured: true
                },
                {
                    id: 3,
                    title: "PUBG Mobile Hack",
                    description: "Battle royale game with unlimited UC and enhanced features.",
                    category: "games",
                    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
                    downloadUrl: "https://drive.google.com/file/d/example3",
                    version: "2.9.0",
                    size: "2.1 GB",
                    rating: 4.7,
                    featured: false
                },
                {
                    id: 4,
                    title: "Instagram Pro",
                    description: "Enhanced Instagram with additional privacy and download features.",
                    category: "social",
                    image: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=400",
                    downloadUrl: "https://drive.google.com/file/d/example4",
                    version: "272.0",
                    size: "85 MB",
                    rating: 4.6,
                    featured: false
                }
            ],
            courses: [
                {
                    id: 1,
                    title: "Complete Web Development Bootcamp",
                    description: "Master HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course.",
                    category: "programming",
                    image: "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=400",
                    downloadUrl: "https://drive.google.com/file/d/course1",
                    duration: "40 hours",
                    level: "Beginner to Advanced",
                    rating: 4.9,
                    featured: true
                },
                {
                    id: 2,
                    title: "Digital Marketing Mastery",
                    description: "Learn SEO, social media marketing, email marketing and analytics.",
                    category: "marketing",
                    image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400",
                    downloadUrl: "https://drive.google.com/file/d/course2",
                    duration: "25 hours",
                    level: "Intermediate",
                    rating: 4.8,
                    featured: true
                },
                {
                    id: 3,
                    title: "UI/UX Design Complete Course",
                    description: "Create stunning user interfaces and experiences with modern design principles.",
                    category: "design",
                    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400",
                    downloadUrl: "https://drive.google.com/file/d/course3",
                    duration: "30 hours",
                    level: "Beginner",
                    rating: 4.7,
                    featured: false
                },
                {
                    id: 4,
                    title: "Business Strategy & Management",
                    description: "Learn essential business skills including strategy, leadership and management.",
                    category: "business",
                    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400",
                    downloadUrl: "https://drive.google.com/file/d/course4",
                    duration: "20 hours",
                    level: "Advanced",
                    rating: 4.6,
                    featured: false
                }
            ],
            stats: {
                apks: 500,
                courses: 100,
                users: 10000
            }
        };
    }

    renderContent() {
        this.renderAPKs();
        this.renderCourses();
        this.updateStats();
        this.updateNavigation();
        this.initSearch();
    }

    renderAPKs() {
        const grid = document.getElementById('apks-grid');
        if (!grid || !this.data.apks) return;

        grid.innerHTML = this.data.apks.map(apk => `
            <div class="card fade-in" data-category="${apk.category}">
                <img src="${apk.image}" alt="${apk.title}" class="card-image" loading="lazy">
                <div class="card-category">${apk.category}</div>
                <h3 class="card-title">${apk.title}</h3>
                <p class="card-description">${apk.description}</p>
                <div class="card-meta">
                    <span>Version: ${apk.version}</span>
                    <span>Size: ${apk.size}</span>
                    <span>⭐ ${apk.rating}</span>
                </div>
                <div class="card-actions">
                    <a href="detail.html?type=apks&id=${apk.id}" class="btn btn-secondary btn-small">
                        View Details
                    </a>
                    <a href="${apk.downloadUrl}" class="btn btn-primary btn-small" target="_blank" rel="noopener">
                        Download
                    </a>
                </div>
            </div>
        `).join('');
    }

    renderCourses() {
        const grid = document.getElementById('courses-grid');
        if (!grid || !this.data.courses) return;

        grid.innerHTML = this.data.courses.map(course => `
            <div class="card fade-in" data-category="${course.category}">
                <img src="${course.image}" alt="${course.title}" class="card-image" loading="lazy">
                <div class="card-category">${course.category}</div>
                <h3 class="card-title">${course.title}</h3>
                <p class="card-description">${course.description}</p>
                <div class="card-meta">
                    <span>Duration: ${course.duration}</span>
                    <span>Level: ${course.level}</span>
                    <span>⭐ ${course.rating}</span>
                </div>
                <div class="card-actions">
                    <a href="detail.html?type=courses&id=${course.id}" class="btn btn-secondary btn-small">
                        View Details
                    </a>
                    <a href="${course.downloadUrl}" class="btn btn-primary btn-small" target="_blank" rel="noopener">
                        Download
                    </a>
                </div>
            </div>
        `).join('');
    }

    updateStats() {
        const stats = this.data.stats;
        if (!stats) return;
        
        this.animateCounter('.stat-number[data-count="500"]', stats.apks || 500);
        this.animateCounter('.stat-number[data-count="100"]', stats.courses || 100);
        this.animateCounter('.stat-number[data-count="10000"]', stats.users || 10000);
    }

    updateNavigation() {
        const navList = document.getElementById('nav-list');
        if (!navList || !this.data.navigation) return;

        navList.innerHTML = this.data.navigation.map(item => `
            <li><a href="${item.href}" class="nav-link">${item.name}</a></li>
        `).join('');
    }

    animateCounter(selector, target) {
        const element = document.querySelector(selector);
        if (!element) return;

        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 20);
    }

    // NEW: Search functionality
    initSearch() {
        this.createSearchInterface();
        this.bindSearchEvents();
    }

    createSearchInterface() {
        // Add search bar to navigation
        const navContainer = document.querySelector('.nav-container');
        if (!navContainer) return;

        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <input type="text" id="search-input" placeholder="Search APKs and Courses..." autocomplete="off">
                <button id="search-btn" aria-label="Search">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                </button>
            </div>
            <div id="search-results" class="search-results hidden"></div>
        `;

        // Insert search before nav toggle
        const navToggle = document.getElementById('nav-toggle');
        navContainer.insertBefore(searchContainer, navToggle);

        // Add search styles
        this.addSearchStyles();
    }

    addSearchStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .search-container {
                position: relative;
                margin-left: auto;
                margin-right: var(--space-4);
            }

            .search-box {
                position: relative;
                display: flex;
                align-items: center;
                background: var(--white);
                border: 2px solid var(--gray-300);
                border-radius: var(--radius-full);
                overflow: hidden;
                transition: all var(--transition-fast);
                width: 300px;
            }

            .search-box:focus-within {
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(0, 255, 255, 0.1);
            }

            #search-input {
                flex: 1;
                padding: var(--space-3) var(--space-4);
                border: none;
                outline: none;
                font-size: var(--text-sm);
                background: transparent;
            }

            #search-btn {
                padding: var(--space-3);
                background: var(--primary-color);
                border: none;
                color: var(--white);
                cursor: pointer;
                transition: background var(--transition-fast);
            }

            #search-btn:hover {
                background: var(--secondary-color);
            }

            .search-results {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--white);
                border: 1px solid var(--gray-200);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-xl);
                max-height: 400px;
                overflow-y: auto;
                z-index: var(--z-dropdown);
                margin-top: var(--space-2);
            }

            .search-results.hidden {
                display: none;
            }

            .search-result-item {
                padding: var(--space-4);
                border-bottom: 1px solid var(--gray-100);
                cursor: pointer;
                transition: background var(--transition-fast);
                display: flex;
                align-items: center;
                gap: var(--space-3);
            }

            .search-result-item:hover {
                background: var(--gray-50);
            }

            .search-result-item:last-child {
                border-bottom: none;
            }

            .search-result-image {
                width: 50px;
                height: 50px;
                object-fit: cover;
                border-radius: var(--radius-md);
            }

            .search-result-content {
                flex: 1;
            }

            .search-result-title {
                font-weight: 600;
                color: var(--gray-900);
                margin-bottom: var(--space-1);
            }

            .search-result-meta {
                font-size: var(--text-sm);
                color: var(--gray-600);
            }

            .search-result-type {
                background: var(--primary-color);
                color: var(--white);
                padding: var(--space-1) var(--space-2);
                border-radius: var(--radius-sm);
                font-size: var(--text-xs);
                font-weight: 500;
            }

            .search-no-results {
                padding: var(--space-6);
                text-align: center;
                color: var(--gray-600);
            }

            @media (max-width: 768px) {
                .search-container {
                    display: none;
                }
            }

            @media (max-width: 1024px) {
                .search-box {
                    width: 250px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    bindSearchEvents() {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const searchResults = document.getElementById('search-results');

        if (!searchInput || !searchBtn || !searchResults) return;

        let searchTimeout;

        // Search on input
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();

            if (query.length < 2) {
                this.hideSearchResults();
                return;
            }

            searchTimeout = setTimeout(() => {
                this.performSearch(query);
            }, 300);
        });

        // Search on button click
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query.length >= 2) {
                this.performSearch(query);
            }
        });

        // Search on Enter key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = searchInput.value.trim();
                if (query.length >= 2) {
                    this.performSearch(query);
                }
            }
        });

        // Hide results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideSearchResults();
            }
        });

        // Show results when focusing input
        searchInput.addEventListener('focus', () => {
            if (this.searchResults.length > 0) {
                this.showSearchResults();
            }
        });
    }

    performSearch(query) {
        const results = [];
        const searchQuery = query.toLowerCase();

        // Search APKs
        if (this.data.apks) {
            this.data.apks.forEach(apk => {
                if (this.matchesSearch(apk, searchQuery)) {
                    results.push({ ...apk, type: 'apks' });
                }
            });
        }

        // Search Courses
        if (this.data.courses) {
            this.data.courses.forEach(course => {
                if (this.matchesSearch(course, searchQuery)) {
                    results.push({ ...course, type: 'courses' });
                }
            });
        }

        // Sort results by relevance
        results.sort((a, b) => {
            const aScore = this.calculateRelevanceScore(a, searchQuery);
            const bScore = this.calculateRelevanceScore(b, searchQuery);
            return bScore - aScore;
        });

        this.searchResults = results.slice(0, 10); // Limit to 10 results
        this.displaySearchResults();
    }

    matchesSearch(item, query) {
        const searchFields = [
            item.title,
            item.description,
            item.category,
            ...(item.tags || [])
        ].join(' ').toLowerCase();

        return searchFields.includes(query);
    }

    calculateRelevanceScore(item, query) {
        let score = 0;
        const title = item.title.toLowerCase();
        const description = item.description.toLowerCase();

        // Title matches get higher score
        if (title.includes(query)) {
            score += title.startsWith(query) ? 10 : 5;
        }

        // Description matches
        if (description.includes(query)) {
            score += 2;
        }

        // Category matches
        if (item.category.toLowerCase().includes(query)) {
            score += 3;
        }

        // Featured items get bonus
        if (item.featured) {
            score += 1;
        }

        // Higher rated items get bonus
        score += (item.rating || 0) * 0.5;

        return score;
    }

    displaySearchResults() {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) return;

        if (this.searchResults.length === 0) {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    <p>No results found. Try different keywords.</p>
                </div>
            `;
        } else {
            searchResults.innerHTML = this.searchResults.map(item => `
                <div class="search-result-item" onclick="window.location.href='detail.html?type=${item.type}&id=${item.id}'">
                    <img src="${item.image}" alt="${item.title}" class="search-result-image" loading="lazy">
                    <div class="search-result-content">
                        <div class="search-result-title">${item.title}</div>
                        <div class="search-result-meta">
                            ${item.type === 'apks' ? `${item.category} • ${item.version}` : `${item.category} • ${item.duration}`}
                            • ⭐ ${item.rating}
                        </div>
                    </div>
                    <div class="search-result-type">${item.type.toUpperCase()}</div>
                </div>
            `).join('');
        }

        this.showSearchResults();
    }

    showSearchResults() {
        const searchResults = document.getElementById('search-results');
        if (searchResults) {
            searchResults.classList.remove('hidden');
        }
    }

    hideSearchResults() {
        const searchResults = document.getElementById('search-results');
        if (searchResults) {
            searchResults.classList.add('hidden');
        }
    }

    bindEvents() {
        // Mobile navigation toggle - FIXED VERSION
        this.initMobileNavigation();

        // Filter functionality
        this.initFilters();

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

        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });

            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Form enhancements
        this.enhanceForms();

        // Intersection Observer for animations
        this.initAnimations();
    }

    // NEW: Dedicated mobile navigation method
    initMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        console.log('Mobile nav elements:', { navToggle, navMenu }); // Debug log

        if (navToggle && navMenu) {
            // Remove any existing event listeners
            navToggle.replaceWith(navToggle.cloneNode(true));
            const newNavToggle = document.getElementById('nav-toggle');

            // Add click event listener
            newNavToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Mobile menu button clicked!'); // Debug log
                
                // Toggle active states
                newNavToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Toggle body scroll
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Close mobile menu when clicking on links
            navMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    newNavToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !newNavToggle.contains(e.target)) {
                    newNavToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            // Close mobile menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    newNavToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        } else {
            console.error('Mobile navigation elements not found!');
        }
    }

    initFilters() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                const section = e.target.closest('.section');
                const cards = section.querySelectorAll('.card');
                const buttons = section.querySelectorAll('.filter-btn');

                // Update active button
                buttons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // Filter cards
                cards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                        card.classList.add('fade-in');
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    enhanceForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.innerHTML = '<span>Sending...</span>';
                    submitBtn.disabled = true;
                }
            });

            // Form validation
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', this.validateField);
                input.addEventListener('input', this.clearValidation);
            });
        });
    }

    validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Remove existing validation
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Validate based on field type
        if (field.required && !value) {
            isValid = false;
            message = 'This field is required';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }

        // Show validation result
        if (!isValid) {
            field.classList.add('error');
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            errorElement.style.cssText = 'color: var(--error-color); font-size: var(--text-sm); margin-top: var(--space-1);';
            field.parentNode.appendChild(errorElement);
        }
    }

    clearValidation(e) {
        const field = e.target;
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        document.querySelectorAll('.card, .stat-card, .about-content').forEach(el => {
            observer.observe(el);
        });
    }

    initComponents() {
        // Initialize any additional components here
        this.initStats();
    }

    initStats() {
        const statElements = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.count);
                    this.animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        });

        statElements.forEach(el => observer.observe(el));
    }
}

// Utility Functions
function shareContent(title, description) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: description,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback to clipboard
        const text = `${title}\n${description}\n${window.location.href}`;
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Link copied to clipboard!');
        }).catch(() => {
            showNotification('Unable to copy link');
        });
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--${type === 'success' ? 'success' : 'error'}-color);
        color: white;
        padding: var(--space-4) var(--space-6);
        border-radius: var(--radius-lg);
        z-index: var(--z-toast);
        animation: slideInRight 0.3s ease-out;
        box-shadow: var(--shadow-lg);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// SEO and Performance Optimizations
function optimizeSEO() {
    // Update meta description if data is available
    const website = new WebsiteData();
    if (website.data.site) {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.content = website.data.site.description;
        }

        // Update title if needed
        if (website.data.site.name) {
            document.title = `${website.data.site.name} - ${website.data.site.description}`;
        }
    }

    // Add structured data for better SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "MODMASTER",
        "description": "Premium APK & Course Platform",
        "url": window.location.href,
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web",
        "author": {
            "@type": "Organization",
            "name": "Ishant Webworks",
            "url": "https://ishant.shop"
        }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                
                // Log performance metrics (could be sent to analytics)
                console.log('Page Load Time:', loadTime + 'ms');
                
                // Optimize images based on connection
                if ('connection' in navigator) {
                    const connection = navigator.connection;
                    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                        // Load lower quality images for slow connections
                        document.querySelectorAll('img').forEach(img => {
                            if (img.src.includes('pexels.com')) {
                                img.src = img.src.replace('w=400', 'w=200');
                            }
                        });
                    }
                }
            }, 0);
        });
    }
}

// Service Worker Registration for PWA capabilities
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the website immediately
    new WebsiteData();
    
    // Run other optimizations
    setTimeout(() => {
        optimizeSEO();
        trackPerformance();
        registerServiceWorker();
    }, 100);
});

// Fallback: Hide loading screen after maximum time
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
        }
    }, 1000);
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Hide loading screen on error
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
    // Hide loading screen on error
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
});