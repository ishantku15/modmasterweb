// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.data = {};
        this.currentEditingItem = null;
        this.currentEditingType = null;
        this.isLoggedIn = false;
        
        this.init();
    }

    async init() {
        this.bindEvents();
        await this.loadData();
        this.checkAuth();
    }

    checkAuth() {
        const isLoggedIn = localStorage.getItem('modmaster_admin_logged_in');
        if (isLoggedIn === 'true') {
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    showLogin() {
        document.getElementById('login-screen').classList.remove('hidden');
        document.getElementById('admin-dashboard').classList.add('hidden');
    }

    showDashboard() {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('admin-dashboard').classList.remove('hidden');
        this.isLoggedIn = true;
        this.updateDashboard();
    }

    async loadData() {
        try {
            const response = await fetch('../data/data.json');
            this.data = await response.json();
        } catch (error) {
            console.warn('Could not load data.json, using default data');
            this.data = this.getDefaultData();
        }
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
                { name: "Home", href: "#home", icon: "🏠" },
                { name: "APKs", href: "#apks", icon: "📱" },
                { name: "Courses", href: "#courses", icon: "📚" },
                { name: "Request", href: "#request", icon: "💌" },
                { name: "About", href: "#about", icon: "ℹ️" }
            ],
            apks: [],
            courses: [],
            stats: {
                apks: 500,
                courses: 100,
                users: 10000,
                downloads: 150000
            }
        };
    }

    bindEvents() {
        // Login form
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.handleLogout();
        });

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.dataset.section;
                this.switchSection(section);
            });
        });

        // Save data
        document.getElementById('save-data').addEventListener('click', () => {
            this.saveData();
        });

        // APK management
        document.getElementById('add-apk').addEventListener('click', () => {
            this.showAPKForm();
        });

        document.getElementById('apk-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveAPK();
        });

        document.getElementById('cancel-apk').addEventListener('click', () => {
            this.cancelAPKEdit();
        });

        // Course management
        document.getElementById('add-course').addEventListener('click', () => {
            this.showCourseForm();
        });

        document.getElementById('course-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveCourse();
        });

        document.getElementById('cancel-course').addEventListener('click', () => {
            this.cancelCourseEdit();
        });

        // Navigation management
        document.getElementById('add-nav-item').addEventListener('click', () => {
            this.showNavForm();
        });

        document.getElementById('nav-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveNavItem();
        });

        document.getElementById('cancel-nav').addEventListener('click', () => {
            this.cancelNavEdit();
        });

        // Settings
        document.getElementById('settings-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSettings();
        });

        // Export/Import
        document.getElementById('export-data').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('import-file').addEventListener('change', (e) => {
            this.handleFileSelect(e);
        });

        document.getElementById('import-data').addEventListener('click', () => {
            this.importData();
        });
    }

    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple authentication (in production, use proper authentication)
        if (username === 'admin' && password === 'modmaster123') {
            localStorage.setItem('modmaster_admin_logged_in', 'true');
            this.showDashboard();
            this.showNotification('Login successful!', 'success');
        } else {
            this.showNotification('Invalid credentials!', 'error');
        }
    }

    handleLogout() {
        localStorage.removeItem('modmaster_admin_logged_in');
        this.isLoggedIn = false;
        this.showLogin();
        this.showNotification('Logged out successfully!', 'success');
    }

    switchSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(`${section}-section`).classList.add('active');

        // Update page title
        const titles = {
            dashboard: 'Dashboard',
            apks: 'Manage APKs',
            courses: 'Manage Courses',
            navigation: 'Site Navigation',
            settings: 'Site Settings',
            export: 'Data Management'
        };
        document.getElementById('page-title').textContent = titles[section] || section;

        // Load section-specific data
        if (section === 'apks') {
            this.renderAPKsList();
        } else if (section === 'courses') {
            this.renderCoursesList();
        } else if (section === 'navigation') {
            this.renderNavigationList();
        } else if (section === 'settings') {
            this.loadSettings();
        } else if (section === 'export') {
            this.updateDataPreview();
        }
    }

    updateDashboard() {
        if (!this.data.stats) return;

        document.getElementById('total-apks').textContent = this.data.apks?.length || 0;
        document.getElementById('total-courses').textContent = this.data.courses?.length || 0;
        document.getElementById('total-users').textContent = this.data.stats.users?.toLocaleString() || '0';
        document.getElementById('total-downloads').textContent = this.data.stats.downloads?.toLocaleString() || '0';
    }

    // APK Management
    showAPKForm(apk = null) {
        this.currentEditingItem = apk;
        this.currentEditingType = 'apk';

        const form = document.getElementById('apk-form');
        const title = document.getElementById('apk-form-title');

        if (apk) {
            title.textContent = 'Edit APK';
            this.populateAPKForm(apk);
        } else {
            title.textContent = 'Add New APK';
            form.reset();
            document.getElementById('apk-id').value = '';
        }
    }

    populateAPKForm(apk) {
        document.getElementById('apk-id').value = apk.id || '';
        document.getElementById('apk-title').value = apk.title || '';
        document.getElementById('apk-description').value = apk.description || '';
        document.getElementById('apk-category').value = apk.category || '';
        document.getElementById('apk-version').value = apk.version || '';
        document.getElementById('apk-size').value = apk.size || '';
        document.getElementById('apk-rating').value = apk.rating || '';
        document.getElementById('apk-image').value = apk.image || '';
        document.getElementById('apk-download').value = apk.downloadUrl || '';
        document.getElementById('apk-requirements').value = apk.requirements || '';
        document.getElementById('apk-featured').value = apk.featured ? 'true' : 'false';
        document.getElementById('apk-downloads').value = apk.downloads || 0;
    }

    saveAPK() {
        const formData = new FormData(document.getElementById('apk-form'));
        const apkData = {
            id: formData.get('id') || Date.now(),
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            version: formData.get('version'),
            size: formData.get('size'),
            rating: parseFloat(formData.get('rating')),
            image: formData.get('image'),
            downloadUrl: formData.get('downloadUrl'),
            requirements: formData.get('requirements'),
            featured: formData.get('featured') === 'true',
            downloads: parseInt(formData.get('downloads')) || 0,
            lastUpdated: new Date().toISOString().split('T')[0],
            tags: [formData.get('category')]
        };

        if (!this.data.apks) {
            this.data.apks = [];
        }

        if (this.currentEditingItem) {
            // Update existing
            const index = this.data.apks.findIndex(apk => apk.id == apkData.id);
            if (index !== -1) {
                this.data.apks[index] = apkData;
            }
        } else {
            // Add new
            this.data.apks.push(apkData);
        }

        this.renderAPKsList();
        this.cancelAPKEdit();
        this.showNotification('APK saved successfully!', 'success');
    }

    cancelAPKEdit() {
        document.getElementById('apk-form').reset();
        document.getElementById('apk-form-title').textContent = 'Add New APK';
        this.currentEditingItem = null;
        this.currentEditingType = null;
    }

    renderAPKsList() {
        const container = document.getElementById('apks-list');
        if (!this.data.apks || this.data.apks.length === 0) {
            container.innerHTML = '<p>No APKs found. Add your first APK!</p>';
            return;
        }

        container.innerHTML = this.data.apks.map(apk => `
            <div class="item-card">
                <div class="item-header">
                    <div>
                        <div class="item-title">${apk.title}</div>
                        <div class="item-meta">${apk.category} • ${apk.version} • ${apk.size}</div>
                    </div>
                    <div class="item-actions">
                        <button class="btn btn-small btn-secondary" onclick="adminPanel.editAPK(${apk.id})">Edit</button>
                        <button class="btn btn-small btn-danger" onclick="adminPanel.deleteAPK(${apk.id})">Delete</button>
                    </div>
                </div>
                <div class="item-description">${apk.description}</div>
            </div>
        `).join('');
    }

    editAPK(id) {
        const apk = this.data.apks.find(a => a.id == id);
        if (apk) {
            this.showAPKForm(apk);
        }
    }

    deleteAPK(id) {
        if (confirm('Are you sure you want to delete this APK?')) {
            this.data.apks = this.data.apks.filter(a => a.id != id);
            this.renderAPKsList();
            this.showNotification('APK deleted successfully!', 'success');
        }
    }

    // Course Management
    showCourseForm(course = null) {
        this.currentEditingItem = course;
        this.currentEditingType = 'course';

        const form = document.getElementById('course-form');
        const title = document.getElementById('course-form-title');

        if (course) {
            title.textContent = 'Edit Course';
            this.populateCourseForm(course);
        } else {
            title.textContent = 'Add New Course';
            form.reset();
            document.getElementById('course-id').value = '';
        }
    }

    populateCourseForm(course) {
        document.getElementById('course-id').value = course.id || '';
        document.getElementById('course-title').value = course.title || '';
        document.getElementById('course-description').value = course.description || '';
        document.getElementById('course-category').value = course.category || '';
        document.getElementById('course-duration').value = course.duration || '';
        document.getElementById('course-level').value = course.level || '';
        document.getElementById('course-rating').value = course.rating || '';
        document.getElementById('course-image').value = course.image || '';
        document.getElementById('course-download').value = course.downloadUrl || '';
        document.getElementById('course-instructor').value = course.instructor || '';
        document.getElementById('course-students').value = course.students || 0;
        document.getElementById('course-modules').value = course.modules || 1;
        document.getElementById('course-projects').value = course.projects || 1;
        document.getElementById('course-featured').value = course.featured ? 'true' : 'false';
    }

    saveCourse() {
        const formData = new FormData(document.getElementById('course-form'));
        const courseData = {
            id: formData.get('id') || Date.now(),
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            duration: formData.get('duration'),
            level: formData.get('level'),
            rating: parseFloat(formData.get('rating')),
            image: formData.get('image'),
            downloadUrl: formData.get('downloadUrl'),
            instructor: formData.get('instructor'),
            students: parseInt(formData.get('students')) || 0,
            modules: parseInt(formData.get('modules')) || 1,
            projects: parseInt(formData.get('projects')) || 1,
            featured: formData.get('featured') === 'true',
            lastUpdated: new Date().toISOString().split('T')[0],
            language: 'English',
            subtitles: ['English']
        };

        if (!this.data.courses) {
            this.data.courses = [];
        }

        if (this.currentEditingItem) {
            // Update existing
            const index = this.data.courses.findIndex(course => course.id == courseData.id);
            if (index !== -1) {
                this.data.courses[index] = courseData;
            }
        } else {
            // Add new
            this.data.courses.push(courseData);
        }

        this.renderCoursesList();
        this.cancelCourseEdit();
        this.showNotification('Course saved successfully!', 'success');
    }

    cancelCourseEdit() {
        document.getElementById('course-form').reset();
        document.getElementById('course-form-title').textContent = 'Add New Course';
        this.currentEditingItem = null;
        this.currentEditingType = null;
    }

    renderCoursesList() {
        const container = document.getElementById('courses-list');
        if (!this.data.courses || this.data.courses.length === 0) {
            container.innerHTML = '<p>No courses found. Add your first course!</p>';
            return;
        }

        container.innerHTML = this.data.courses.map(course => `
            <div class="item-card">
                <div class="item-header">
                    <div>
                        <div class="item-title">${course.title}</div>
                        <div class="item-meta">${course.category} • ${course.duration} • ${course.level}</div>
                    </div>
                    <div class="item-actions">
                        <button class="btn btn-small btn-secondary" onclick="adminPanel.editCourse(${course.id})">Edit</button>
                        <button class="btn btn-small btn-danger" onclick="adminPanel.deleteCourse(${course.id})">Delete</button>
                    </div>
                </div>
                <div class="item-description">${course.description}</div>
            </div>
        `).join('');
    }

    editCourse(id) {
        const course = this.data.courses.find(c => c.id == id);
        if (course) {
            this.showCourseForm(course);
        }
    }

    deleteCourse(id) {
        if (confirm('Are you sure you want to delete this course?')) {
            this.data.courses = this.data.courses.filter(c => c.id != id);
            this.renderCoursesList();
            this.showNotification('Course deleted successfully!', 'success');
        }
    }

    // Navigation Management
    showNavForm(navItem = null, index = null) {
        this.currentEditingItem = navItem;
        this.currentEditingIndex = index;

        const form = document.getElementById('nav-form');
        const title = document.getElementById('nav-form-title');

        if (navItem) {
            title.textContent = 'Edit Navigation Item';
            document.getElementById('nav-index').value = index;
            document.getElementById('nav-name').value = navItem.name || '';
            document.getElementById('nav-href').value = navItem.href || '';
            document.getElementById('nav-icon').value = navItem.icon || '';
        } else {
            title.textContent = 'Add Navigation Item';
            form.reset();
            document.getElementById('nav-index').value = '';
        }
    }

    saveNavItem() {
        const formData = new FormData(document.getElementById('nav-form'));
        const navData = {
            name: formData.get('name'),
            href: formData.get('href'),
            icon: formData.get('icon') || '🔗'
        };

        if (!this.data.navigation) {
            this.data.navigation = [];
        }

        const index = formData.get('index');
        if (index !== '' && this.currentEditingItem) {
            // Update existing
            this.data.navigation[parseInt(index)] = navData;
        } else {
            // Add new
            this.data.navigation.push(navData);
        }

        this.renderNavigationList();
        this.cancelNavEdit();
        this.showNotification('Navigation item saved successfully!', 'success');
    }

    cancelNavEdit() {
        document.getElementById('nav-form').reset();
        document.getElementById('nav-form-title').textContent = 'Add Navigation Item';
        this.currentEditingItem = null;
        this.currentEditingIndex = null;
    }

    renderNavigationList() {
        const container = document.getElementById('nav-list');
        if (!this.data.navigation || this.data.navigation.length === 0) {
            container.innerHTML = '<p>No navigation items found.</p>';
            return;
        }

        container.innerHTML = this.data.navigation.map((item, index) => `
            <div class="nav-item">
                <div class="nav-item-info">
                    <div class="nav-item-icon">${item.icon}</div>
                    <div class="nav-item-text">
                        <div class="nav-item-name">${item.name}</div>
                        <div class="nav-item-href">${item.href}</div>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-small btn-secondary" onclick="adminPanel.editNavItem(${index})">Edit</button>
                    <button class="btn btn-small btn-danger" onclick="adminPanel.deleteNavItem(${index})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    editNavItem(index) {
        const navItem = this.data.navigation[index];
        if (navItem) {
            this.showNavForm(navItem, index);
        }
    }

    deleteNavItem(index) {
        if (confirm('Are you sure you want to delete this navigation item?')) {
            this.data.navigation.splice(index, 1);
            this.renderNavigationList();
            this.showNotification('Navigation item deleted successfully!', 'success');
        }
    }

    // Settings Management
    loadSettings() {
        if (!this.data.site) return;

        document.getElementById('site-name').value = this.data.site.name || '';
        document.getElementById('site-description').value = this.data.site.description || '';
        document.getElementById('site-keywords').value = Array.isArray(this.data.site.keywords) ? this.data.site.keywords.join(', ') : '';
        document.getElementById('site-author').value = this.data.site.author || '';
        document.getElementById('site-email').value = this.data.site.email || '';
        document.getElementById('site-website').value = this.data.site.website || '';
        document.getElementById('site-blog').value = this.data.site.blog || '';

        if (this.data.stats) {
            document.getElementById('stats-apks').value = this.data.stats.apks || 0;
            document.getElementById('stats-courses').value = this.data.stats.courses || 0;
            document.getElementById('stats-users').value = this.data.stats.users || 0;
            document.getElementById('stats-downloads').value = this.data.stats.downloads || 0;
        }
    }

    saveSettings() {
        const formData = new FormData(document.getElementById('settings-form'));
        
        if (!this.data.site) {
            this.data.site = {};
        }
        if (!this.data.stats) {
            this.data.stats = {};
        }

        this.data.site.name = formData.get('name');
        this.data.site.description = formData.get('description');
        this.data.site.keywords = formData.get('keywords').split(',').map(k => k.trim()).filter(k => k);
        this.data.site.author = formData.get('author');
        this.data.site.email = formData.get('email');
        this.data.site.website = formData.get('website');
        this.data.site.blog = formData.get('blog');

        this.data.stats.apks = parseInt(formData.get('apks')) || 0;
        this.data.stats.courses = parseInt(formData.get('courses')) || 0;
        this.data.stats.users = parseInt(formData.get('users')) || 0;
        this.data.stats.downloads = parseInt(formData.get('downloads')) || 0;

        this.updateDashboard();
        this.showNotification('Settings saved successfully!', 'success');
    }

    // Data Export/Import
    exportData() {
        const exportOptions = {
            apks: document.getElementById('export-apks').checked,
            courses: document.getElementById('export-courses').checked,
            settings: document.getElementById('export-settings').checked,
            navigation: document.getElementById('export-navigation').checked
        };

        let exportData = {};

        if (exportOptions.settings && this.data.site) {
            exportData.site = this.data.site;
            exportData.stats = this.data.stats;
        }

        if (exportOptions.navigation && this.data.navigation) {
            exportData.navigation = this.data.navigation;
        }

        if (exportOptions.apks && this.data.apks) {
            exportData.apks = this.data.apks;
        }

        if (exportOptions.courses && this.data.courses) {
            exportData.courses = this.data.courses;
        }

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `modmaster-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showNotification('Data exported successfully!', 'success');
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        const fileName = document.getElementById('file-name');
        const importBtn = document.getElementById('import-data');

        if (file) {
            fileName.textContent = file.name;
            importBtn.disabled = false;
        } else {
            fileName.textContent = 'No file chosen';
            importBtn.disabled = true;
        }
    }

    importData() {
        const fileInput = document.getElementById('import-file');
        const file = fileInput.files[0];

        if (!file) {
            this.showNotification('Please select a file first!', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                
                // Validate the imported data structure
                if (this.validateImportData(importedData)) {
                    // Merge imported data with existing data
                    this.data = { ...this.data, ...importedData };
                    
                    // Update all displays
                    this.updateDashboard();
                    this.renderAPKsList();
                    this.renderCoursesList();
                    this.renderNavigationList();
                    this.loadSettings();
                    this.updateDataPreview();
                    
                    this.showNotification('Data imported successfully!', 'success');
                } else {
                    this.showNotification('Invalid data format!', 'error');
                }
            } catch (error) {
                this.showNotification('Error parsing JSON file!', 'error');
                console.error('Import error:', error);
            }
        };

        reader.readAsText(file);
    }

    validateImportData(data) {
        // Basic validation - check if it's an object and has expected properties
        if (typeof data !== 'object' || data === null) {
            return false;
        }

        // Check if at least one expected property exists
        const expectedProps = ['site', 'navigation', 'apks', 'courses', 'stats'];
        return expectedProps.some(prop => data.hasOwnProperty(prop));
    }

    updateDataPreview() {
        const preview = document.getElementById('data-preview');
        if (preview) {
            preview.textContent = JSON.stringify(this.data, null, 2);
        }
    }

    // Data Persistence
    saveData() {
        // In a real application, this would send data to a server
        // For this demo, we'll save to localStorage and show instructions
        localStorage.setItem('modmaster_data', JSON.stringify(this.data));
        
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showNotification('Data saved! Replace the data.json file in your project with the downloaded file.', 'success');
    }

    // Utility Functions
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type} show`;

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Global functions for onclick handlers
function switchSection(section) {
    if (window.adminPanel) {
        window.adminPanel.switchSection(section);
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminPanel = new AdminPanel();
});