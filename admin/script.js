// ============================================
// ZSMP Website - Main JavaScript
// ============================================

// Configuration
const CONFIG = {
    serverIP: 'zsmp.eagler.host',
    discordURL: 'https://discord.gg/zsmp',
    countdownTarget: new Date('2025-02-01').getTime(),
    STORAGE_KEYS: {
        settings: 'zsmp_settings',
        suggestions: 'zsmp_suggestions',
        changelog: 'zsmp_changelog',
        announcements: 'zsmp_announcements',
        links: 'zsmp_links'
    }
};

// Initialize Everything on Load
document.addEventListener('DOMContentLoaded', () => {
    initializeWebsite();
});

function initializeWebsite() {
    // Hide loading screen after 2.5s
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.animation = 'fadeOut 0.5s ease-out forwards';
        }
    }, 2500);

    // Initialize features
    generateParticles();
    updateCountdown();
    updatePlayerCount();
    setupCursorGlow();
    setupNavigation();
    displayLatestAnnouncement();
    initializeScrollAnimations();

    // Update countdown every second
    setInterval(updateCountdown, 1000);

    // Update player count every 30 seconds
    setInterval(updatePlayerCount, 30000);
}

// ============================================
// PARTICLES SYSTEM
// ============================================

function generateParticles() {
    const container = document.getElementById('particleContainer');
    if (!container) return;

    const particleCount = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 50 + 30;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = left + '%';
        particle.style.bottom = '-100px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        container.appendChild(particle);
    }
}

// ============================================
// CURSOR GLOW EFFECT
// ============================================

function setupCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow) return;

    document.addEventListener('mousemove', (e) => {
        cursorGlow.classList.add('active');
        cursorGlow.style.left = (e.clientX - 15) + 'px';
        cursorGlow.style.top = (e.clientY - 15) + 'px';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('active');
    });
}

// ============================================
// COPY IP FUNCTIONALITY
// ============================================

function copyIP() {
    const ip = CONFIG.serverIP;
    navigator.clipboard.writeText(ip).then(() => {
        showToast('✓ Server IP copied to clipboard!', 'success');
    }).catch(() => {
        showToast('✗ Failed to copy IP', 'error');
    });
}

// ============================================
// COUNTDOWN TIMER
// ============================================

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = CONFIG.countdownTarget - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('countdownDays');
        const hoursEl = document.getElementById('countdownHours');
        const minutesEl = document.getElementById('countdownMinutes');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    }
}

// ============================================
// PLAYER COUNT
// ============================================

function updatePlayerCount() {
    const onlinePlayers = Math.floor(Math.random() * 50) + 5;
    const totalPlayers = Math.floor(Math.random() * 100) + 40;

    const onlineEl = document.getElementById('onlinePlayers');
    const totalEl = document.getElementById('totalPlayers');

    if (onlineEl) {
        onlineEl.textContent = onlinePlayers;
    }
    if (totalEl) {
        totalEl.textContent = totalPlayers;
    }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// NAVIGATION
// ============================================

function setupNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Update active link based on current page
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes(currentPage) || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================
// ANNOUNCEMENTS
// ============================================

function displayLatestAnnouncement() {
    const announcements = getStoredData(CONFIG.STORAGE_KEYS.announcements);
    if (announcements.length === 0) return;

    const latest = announcements[0];
    displayAnnouncement(latest);

    // Auto-hide after 8 seconds
    setTimeout(() => closeAnnouncement(), 8000);
}

function displayAnnouncement(announcement) {
    const banner = document.getElementById('announcementBanner');
    const title = document.getElementById('announcementTitle');
    const content = document.getElementById('announcementContent');

    if (banner && title && content) {
        title.textContent = announcement.title;
        content.textContent = announcement.content;
        banner.classList.add('active');
    }
}

function closeAnnouncement() {
    const banner = document.getElementById('announcementBanner');
    if (banner) {
        banner.classList.remove('active');
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.stat-card, .activity-item, .highlight-card, .countdown-box').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

function getStoredData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Error reading storage:', e);
        return [];
    }
}

function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Error saving storage:', e);
        return false;
    }
}

// ============================================
// SUGGESTION SYSTEM
// ============================================

function submitSuggestion(event) {
    event.preventDefault();

    const input = document.getElementById('suggestionInput');
    if (!input) return;

    const content = input.value.trim();
    if (!content) {
        showToast('Please enter a suggestion', 'error');
        return;
    }

    const suggestion = {
        id: Date.now(),
        content: content,
        author: 'Friend #' + Math.floor(Math.random() * 10000),
        timestamp: new Date().toLocaleString(),
        status: 'pending'
    };

    let suggestions = getStoredData(CONFIG.STORAGE_KEYS.suggestions);
    suggestions.unshift(suggestion);
    saveData(CONFIG.STORAGE_KEYS.suggestions, suggestions);

    input.value = '';
    showToast('✓ Thanks for your suggestion!', 'success');
    displaySuggestions();
}

function displaySuggestions() {
    const container = document.getElementById('suggestionsContainer');
    if (!container) return;

    const suggestions = getStoredData(CONFIG.STORAGE_KEYS.suggestions);

    if (suggestions.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Be the first to submit a suggestion!</p>';
        return;
    }

    const filterType = document.getElementById('suggestionFilter')?.value || 'all';
    const filtered = filterType === 'all' ? suggestions : suggestions.filter(s => s.status === filterType);

    container.innerHTML = filtered.map((sugg, index) => `
        <div class="suggestion-item" style="animation-delay: ${index * 0.05}s;">
            <div class="suggestion-header">
                <div>
                    <div class="suggestion-author">${escapeHtml(sugg.author)}</div>
                    <div class="suggestion-text">${escapeHtml(sugg.content)}</div>
                </div>
                <span style="color: var(--text-muted); font-size: 0.8rem; white-space: nowrap;">${sugg.timestamp}</span>
            </div>
            <span class="suggestion-status ${sugg.status}">
                ${sugg.status.charAt(0).toUpperCase() + sugg.status.slice(1)}
            </span>
        </div>
    `).join('');
}

// ============================================
// CHANGELOG SYSTEM
// ============================================

function addChangelogEntry(event) {
    event.preventDefault();

    const title = document.getElementById('changelogTitle')?.value;
    const content = document.getElementById('changelogContent')?.value;
    const tag = document.getElementById('changelogTag')?.value;

    if (!title || !content) {
        showToast('Please fill all fields', 'error');
        return;
    }

    const entry = {
        id: Date.now(),
        title: title,
        content: content,
        tag: tag,
        date: new Date().toLocaleDateString(),
        version: getNextVersion()
    };

    let changelog = getStoredData(CONFIG.STORAGE_KEYS.changelog);
    changelog.unshift(entry);
    saveData(CONFIG.STORAGE_KEYS.changelog, changelog);

    // Clear form
    if (document.getElementById('changelogTitle')) {
        document.getElementById('changelogTitle').value = '';
        document.getElementById('changelogContent').value = '';
    }

    showToast('✓ Changelog entry added!', 'success');
    displayChangelog();
}

function getNextVersion() {
    const changelog = getStoredData(CONFIG.STORAGE_KEYS.changelog);
    if (changelog.length === 0) return '1.0';

    const last = changelog[0].version;
    const parts = last.split('.');
    parts[1] = String(parseInt(parts[1]) + 1);
    return parts.join('.');
}

function displayChangelog() {
    const container = document.getElementById('changelogContainer');
    if (!container) return;

    const changelog = getStoredData(CONFIG.STORAGE_KEYS.changelog);

    if (changelog.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No updates yet</p>';
        return;
    }

    container.innerHTML = changelog.map((entry, index) => `
        <div class="changelog-item" style="animation-delay: ${index * 0.05}s;">
            <div class="changelog-header">
                <div>
                    <h3 class="changelog-version">${entry.version} - ${escapeHtml(entry.title)}</h3>
                    <p class="changelog-date">${entry.date}</p>
                </div>
                <span class="changelog-tag tag-${entry.tag}">${entry.tag}</span>
            </div>
            <p class="changelog-content">${escapeHtml(entry.content)}</p>
        </div>
    `).join('');
}

// ============================================
// ADMIN FUNCTIONALITY
// ============================================

function postAnnouncement(event) {
    event.preventDefault();

    const title = document.getElementById('announcementTitleInput')?.value;
    const content = document.getElementById('announcementContentInput')?.value;

    if (!title || !content) {
        showToast('Please fill all fields', 'error');
        return;
    }

    const announcement = {
        id: Date.now(),
        title: title,
        content: content,
        timestamp: new Date().toLocaleString()
    };

    let announcements = getStoredData(CONFIG.STORAGE_KEYS.announcements);
    announcements.unshift(announcement);
    saveData(CONFIG.STORAGE_KEYS.announcements, announcements);

    displayAnnouncement(announcement);

    if (document.getElementById('announcementTitleInput')) {
        document.getElementById('announcementTitleInput').value = '';
        document.getElementById('announcementContentInput').value = '';
    }

    showToast('✓ Announcement posted!', 'success');
}

function updateSuggestionStatus(id, newStatus) {
    let suggestions = getStoredData(CONFIG.STORAGE_KEYS.suggestions);
    suggestions = suggestions.map(s => s.id === id ? { ...s, status: newStatus } : s);
    saveData(CONFIG.STORAGE_KEYS.suggestions, suggestions);
    displaySuggestions();

    if (document.getElementById('suggestionsList')) {
        loadSuggestionsForAdmin();
    }
}

function loadSuggestionsForAdmin() {
    const container = document.getElementById('suggestionsList');
    if (!container) return;

    const suggestions = getStoredData(CONFIG.STORAGE_KEYS.suggestions);

    if (suggestions.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No suggestions yet</p>';
        return;
    }

    container.innerHTML = suggestions.map(s => `
        <div class="suggestion-item">
            <div class="suggestion-header">
                <div style="flex: 1;">
                    <div class="suggestion-author">${escapeHtml(s.author)}</div>
                    <div class="suggestion-text">${escapeHtml(s.content)}</div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="updateSuggestionStatus(${s.id}, 'approved')" class="admin-btn admin-btn-approve">✓</button>
                    <button onclick="updateSuggestionStatus(${s.id}, 'rejected')" class="admin-btn admin-btn-reject">✕</button>
                </div>
            </div>
            <span class="suggestion-status ${s.status}">${s.status.charAt(0).toUpperCase() + s.status.slice(1)}</span>
        </div>
    `).join('');
}

// ============================================
// SETTINGS/LINKS MANAGEMENT
// ============================================

function saveSettings(settingsObj) {
    saveData(CONFIG.STORAGE_KEYS.settings, settingsObj);
    showToast('✓ Settings saved!', 'success');
}

function getSettings() {
    const defaults = {
        serverIP: CONFIG.serverIP,
        discordURL: CONFIG.discordURL,
        heroTitle: 'ZSMP',
        heroSubtitle: 'Season 4 Coming Soon',
        heroDescription: 'Season 3 has officially ended. Get ready for a brand new start with your friends.'
    };

    const stored = getStoredData(CONFIG.STORAGE_KEYS.settings);
    return { ...defaults, ...stored };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// ============================================
// WINDOW RESIZE - REGENERATE PARTICLES
// ============================================

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const container = document.getElementById('particleContainer');
        if (container) {
            container.innerHTML = '';
            generateParticles();
        }
    }, 250);
});

// ============================================
// ADMIN PANEL FUNCTIONS (admin.html)
// ============================================

function openAdminPanel() {
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.classList.add('active');
        loadSuggestionsForAdmin();
    }
}

function closeAdminPanel() {
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function switchAdminTab(tabName) {
    document.querySelectorAll('.admin-form').forEach(form => {
        form.classList.remove('active');
    });

    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    const form = document.getElementById(`${tabName}Form`);
    const tab = document.querySelector(`[onclick="switchAdminTab('${tabName}')"]`);

    if (form) form.classList.add('active');
    if (tab) tab.classList.add('active');

    if (tabName === 'manage-suggestions') {
        loadSuggestionsForAdmin();
    }
}

// Close admin modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const adminModal = document.getElementById('adminModal');
    if (adminModal) {
        adminModal.addEventListener('click', (e) => {
            if (e.target === adminModal) {
                closeAdminPanel();
            }
        });
    }
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+A for admin panel
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        openAdminPanel();
    }

    // Escape to close modals
    if (e.key === 'Escape') {
        closeAdminPanel();
    }
});

// ============================================
// LOG INITIALIZATION
// ============================================

console.log('%cZSMP Website', 'font-size: 20px; color: #ff1744; font-weight: bold;');
console.log('%cWelcome to the admin console!', 'color: #ff1744;');
console.log('%cType: displaySuggestions() to see all suggestions', 'color: #ffb74d;');
console.log('%cType: displayChangelog() to see all updates', 'color: #ffb74d;');
