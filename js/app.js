// Utility to generate bottom navigation
function renderBottomNav(activePage) {
    const navHTML = `
    <nav class="fixed bottom-0 w-full glass-nav px-6 py-3 flex justify-between items-center z-50">
        <a href="index.html" class="flex flex-col items-center p-2 text-xs font-medium transition-colors ${activePage === 'home' ? 'text-fuchsia-600' : 'text-slate-400 hover:text-slate-600'}">
            <i class="ph ${activePage === 'home' ? 'ph-house-fill' : 'ph-house'} text-2xl mb-1"></i>
            <span data-i18n="nav_home">Home</span>
        </a>
        <a href="events.html" class="flex flex-col items-center p-2 text-xs font-medium transition-colors ${activePage === 'events' ? 'text-fuchsia-600' : 'text-slate-400 hover:text-slate-600'}">
            <i class="ph ${activePage === 'events' ? 'ph-calendar-blank-fill' : 'ph-calendar-blank'} text-2xl mb-1"></i>
            <span data-i18n="nav_events">Events</span>
        </a>
        <a href="michango.html" class="flex flex-col items-center p-2 text-xs font-medium transition-colors ${activePage === 'michango' ? 'text-fuchsia-600' : 'text-slate-400 hover:text-slate-600'}">
            <i class="ph ${activePage === 'michango' ? 'ph-wallet-fill' : 'ph-wallet'} text-2xl mb-1"></i>
            <span data-i18n="nav_michango">Michango</span>
        </a>
        <a href="#" class="flex flex-col items-center p-2 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors">
            <i class="ph ph-user text-2xl mb-1"></i>
            <span data-i18n="nav_profile">Profile</span>
        </a>
    </nav>
    `;

    // Inject the nav right before the closing body tag
    document.body.insertAdjacentHTML('beforeend', navHTML);
}

// Initialize i18n
let currentLang = localStorage.getItem('appLang') || 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'sw' : 'en';
    localStorage.setItem('appLang', currentLang);
    applyTranslations();
    renderBottomNav(window.activePage || 'home'); // Re-render nav with new lang

    // Re-render events if on events page
    if (typeof renderEventsList === 'function' && document.getElementById('events-container')) {
        renderEventsList();
        applyTranslations(); // Apply to newly rendered elements
    }
}

function applyTranslations() {
    if (typeof translations === 'undefined') return;

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            // Check if it's a placeholder attribute
            if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                el.setAttribute('placeholder', translations[currentLang][key]);
            } else {
                el.innerText = translations[currentLang][key];
            }
        }
    });
}

// Add page enter animation class & init translations
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-enter");
    if (typeof applyTranslations === 'function') {
        applyTranslations();
    }
});

// Format currency helper
function formatTZS(amount) {
    return new Intl.NumberFormat('en-TZ', {
        style: 'currency',
        currency: 'TZS',
        minimumFractionDigits: 0
    }).format(amount);
}
