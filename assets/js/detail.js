// Detail Page JavaScript
class DetailPage {
    constructor() {
        this.data = {};
        this.currentItem = null;
        this.currentType = null;
        this.init();
    }

    async init() {
        await this.loadData();
        this.parseURL();
        this.bindEvents();
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
    }

    getDefaultData() {
        return {
            apks: [],
            courses: [],
            site: {
                name: "MODMASTER",
                description: "Premium APK & Course Platform"
            }
        };
    }

    parseURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get('type');
        const id = urlParams.get('id');

        if (!type || !id) {
            this.showError('Invalid URL parameters');
            return;
        }

        this.currentType = type;
        const items = this.data[type];
        
        if (!items) {
            this.showError('Invalid content type');
            return;
        }

        this.currentItem = items.find(item => item.id == id);
        
        if (!this.currentItem) {
            this.showError('Content not found');
            return;
        }

        this.renderDetail();
        this.updateSEO();
        this.loadRelatedItems();
    }

    renderDetail() {
        const main = document.getElementById('detail-main');
        const item = this.currentItem;
        const type = this.currentType;

        // Update breadcrumb
        document.getElementById('breadcrumb-category').innerHTML = `<a href="index.html#${type}">${type.toUpperCase()}</a>`;
        document.getElementById('breadcrumb-title').textContent = item.title;

        // Render content based on type
        if (type === 'apks') {
            main.innerHTML = this.renderAPKDetail(item);
        } else if (type === 'courses') {
            main.innerHTML = this.renderCourseDetail(item);
        }

        // Initialize interactions
        this.initDetailInteractions();
    }

    renderAPKDetail(apk) {
        const stars = this.generateStars(apk.rating);
        
        return `
            <section class="detail-hero">
                <div class="detail-container">
                    <div class="detail-content">
                        <div class="detail-image-container">
                            <img src="${apk.image}" alt="${apk.title}" class="detail-image" loading="lazy">
                        </div>
                        
                        <div class="detail-info">
                            <h1>${apk.title}</h1>
                            
                            <div class="rating-stars">
                                ${stars}
                                <span class="rating-text">${apk.rating} (${apk.downloads || 0} downloads)</span>
                            </div>
                            
                            <div class="detail-meta">
                                <span class="meta-item">📱 ${apk.category}</span>
                                <span class="meta-item">📦 ${apk.version}</span>
                                <span class="meta-item">💾 ${apk.size}</span>
                                <span class="meta-item">🤖 ${apk.requirements || 'Android 6.0+'}</span>
                            </div>
                            
                            <p class="detail-description">${apk.description}</p>
                            
                            <div class="detail-actions">
                                <a href="${apk.downloadUrl}" class="btn btn-primary" target="_blank" rel="noopener">
                                    <span>📥 Download APK</span>
                                    <div class="btn-overlay"></div>
                                </a>
                                <button class="btn btn-secondary" onclick="shareContent('${apk.title}', '${apk.description}')">
                                    <span>🔗 Share</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detail-specs">
                        <h3>📋 Specifications</h3>
                        <div class="specs-grid">
                            <div class="spec-item">
                                <span class="spec-label">Version</span>
                                <span class="spec-value">${apk.version}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Size</span>
                                <span class="spec-value">${apk.size}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Category</span>
                                <span class="spec-value">${apk.category}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Rating</span>
                                <span class="spec-value">${apk.rating}/5</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Downloads</span>
                                <span class="spec-value">${(apk.downloads || 0).toLocaleString()}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Requirements</span>
                                <span class="spec-value">${apk.requirements || 'Android 6.0+'}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Last Updated</span>
                                <span class="spec-value">${apk.lastUpdated || 'Recently'}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Featured</span>
                                <span class="spec-value">${apk.featured ? 'Yes' : 'No'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderCourseDetail(course) {
        const stars = this.generateStars(course.rating);
        
        return `
            <section class="detail-hero">
                <div class="detail-container">
                    <div class="detail-content">
                        <div class="detail-image-container">
                            <img src="${course.image}" alt="${course.title}" class="detail-image" loading="lazy">
                        </div>
                        
                        <div class="detail-info">
                            <h1>${course.title}</h1>
                            
                            <div class="rating-stars">
                                ${stars}
                                <span class="rating-text">${course.rating} (${course.students || 0} students)</span>
                            </div>
                            
                            <div class="detail-meta">
                                <span class="meta-item">📚 ${course.category}</span>
                                <span class="meta-item">⏱️ ${course.duration}</span>
                                <span class="meta-item">📊 ${course.level}</span>
                                <span class="meta-item">👨‍🏫 ${course.instructor || 'Expert Instructor'}</span>
                            </div>
                            
                            <p class="detail-description">${course.description}</p>
                            
                            <div class="detail-actions">
                                <a href="${course.downloadUrl}" class="btn btn-primary" target="_blank" rel="noopener">
                                    <span>📥 Download Course</span>
                                    <div class="btn-overlay"></div>
                                </a>
                                <button class="btn btn-secondary" onclick="shareContent('${course.title}', '${course.description}')">
                                    <span>🔗 Share</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detail-specs">
                        <h3>📋 Course Details</h3>
                        <div class="specs-grid">
                            <div class="spec-item">
                                <span class="spec-label">Duration</span>
                                <span class="spec-value">${course.duration}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Level</span>
                                <span class="spec-value">${course.level}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Category</span>
                                <span class="spec-value">${course.category}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Rating</span>
                                <span class="spec-value">${course.rating}/5</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Students</span>
                                <span class="spec-value">${(course.students || 0).toLocaleString()}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Instructor</span>
                                <span class="spec-value">${course.instructor || 'Expert'}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Language</span>
                                <span class="spec-value">${course.language || 'English'}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Modules</span>
                                <span class="spec-value">${course.modules || 'Multiple'}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Projects</span>
                                <span class="spec-value">${course.projects || 'Included'}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Last Updated</span>
                                <span class="spec-value">${course.lastUpdated || 'Recently'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="star">★</span>';
        }
        
        // Half star
        if (hasHalfStar) {
            stars += '<span class="star">☆</span>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars += '<span class="star" style="color: #d1d5db;">☆</span>';
        }
        
        return stars;
    }

    loadRelatedItems() {
        const relatedItems = this.getRelatedItems();
        if (relatedItems.length === 0) return;

        const relatedSection = document.createElement('section');
        relatedSection.className = 'related-section';
        relatedSection.innerHTML = `
            <div class="detail-container">
                <h2 class="section-title">Related <span class="gradient-text">${this.currentType.toUpperCase()}</span></h2>
                <div class="related-grid">
                    ${relatedItems.map(item => this.renderRelatedCard(item)).join('')}
                </div>
            </div>
        `;

        document.getElementById('detail-main').appendChild(relatedSection);
    }

    getRelatedItems() {
        const items = this.data[this.currentType];
        const currentCategory = this.currentItem.category;
        
        return items
            .filter(item => item.id !== this.currentItem.id && item.category === currentCategory)
            .slice(0, 3);
    }

    renderRelatedCard(item) {
        return `
            <div class="card">
                <img src="${item.image}" alt="${item.title}" class="card-image" loading="lazy">
                <div class="card-category">${item.category}</div>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-description">${item.description.substring(0, 100)}...</p>
                <div class="card-meta">
                    <span>${this.currentType === 'apks' ? item.version : item.duration}</span>
                    <span>⭐ ${item.rating}</span>
                </div>
                <div class="card-actions">
                    <a href="detail.html?type=${this.currentType}&id=${item.id}" class="btn btn-primary btn-small">
                        View Details
                    </a>
                    <a href="${item.downloadUrl}" class="btn btn-secondary btn-small" target="_blank" rel="noopener">
                        Download
                    </a>
                </div>
            </div>
        `;
    }

    updateSEO() {
        const item = this.currentItem;
        const type = this.currentType;
        const siteName = this.data.site?.name || 'MODMASTER';
        
        // Update title
        document.title = `${item.title} - ${siteName}`;
        document.getElementById('page-title').content = `${item.title} - ${siteName}`;
        
        // Update meta description
        const description = `${item.description} Download from ${siteName} - Premium ${type} platform.`;
        document.getElementById('page-description').content = description;
        
        // Update keywords
        const keywords = [item.title, item.category, type, 'download', 'premium', 'modmaster'];
        if (item.tags) keywords.push(...item.tags);
        document.getElementById('page-keywords').content = keywords.join(', ');
        
        // Update Open Graph tags
        document.getElementById('og-title').content = item.title;
        document.getElementById('og-description').content = description;
        document.getElementById('og-image').content = item.image;
        document.getElementById('og-url').content = window.location.href;
        
        // Update Twitter Card tags
        document.getElementById('twitter-title').content = item.title;
        document.getElementById('twitter-description').content = description;
        document.getElementById('twitter-image').content = item.image;
        
        // Update canonical URL
        document.getElementById('canonical-url').href = window.location.href;
        
        // Add structured data
        this.addStructuredData();
    }

    addStructuredData() {
        const item = this.currentItem;
        const type = this.currentType;
        
        const structuredData = {
            "@context": "https://schema.org",
            "@type": type === 'apks' ? "SoftwareApplication" : "Course",
            "name": item.title,
            "description": item.description,
            "image": item.image,
            "url": window.location.href,
            "author": {
                "@type": "Organization",
                "name": "MODMASTER",
                "url": "https://modmaster.github.io"
            }
        };
        
        if (type === 'apks') {
            structuredData.applicationCategory = item.category;
            structuredData.operatingSystem = "Android";
            structuredData.softwareVersion = item.version;
            structuredData.fileSize = item.size;
            structuredData.aggregateRating = {
                "@type": "AggregateRating",
                "ratingValue": item.rating,
                "ratingCount": item.downloads || 100
            };
        } else if (type === 'courses') {
            structuredData.provider = {
                "@type": "Organization",
                "name": "MODMASTER"
            };
            structuredData.instructor = {
                "@type": "Person",
                "name": item.instructor || "Expert Instructor"
            };
            structuredData.courseMode = "online";
            structuredData.educationalLevel = item.level;
            structuredData.timeRequired = item.duration;
        }
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    showError(message) {
        const main = document.getElementById('detail-main');
        main.innerHTML = `
            <div class="error-page">
                <div class="error-content">
                    <h1>😕 Oops!</h1>
                    <p>${message}</p>
                    <div class="error-actions">
                        <a href="index.html" class="btn btn-primary">
                            <span>🏠 Go Home</span>
                            <div class="btn-overlay"></div>
                        </a>
                        <a href="index.html#apks" class="btn btn-secondary">Browse APKs</a>
                        <a href="index.html#courses" class="btn btn-secondary">View Courses</a>
                    </div>
                </div>
            </div>
        `;
        
        // Update page title for error
        document.title = `${message} - MODMASTER`;
        
        // Update breadcrumb for error
        document.getElementById('breadcrumb-category').textContent = 'Error';
        document.getElementById('breadcrumb-title').textContent = message;
    }

    initDetailInteractions() {
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

        // Mobile navigation
        this.initMobileNavigation();
    }

    initMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Close mobile menu when clicking on links
            navMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    bindEvents() {
        // Add any additional event listeners here
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

// Initialize detail page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DetailPage();
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Detail page error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});