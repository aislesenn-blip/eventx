// Utility to generate bottom navigation
function renderBottomNav(activePage) {
    const navHTML = `
    <div class="fixed bottom-0 w-full z-50 flex justify-center">
        <nav class="w-full max-w-2xl glass-nav px-6 py-3 flex justify-between items-center md:rounded-t-3xl md:border-x">
            <a href="index.html" class="flex flex-col items-center p-2 text-xs font-medium transition-colors ${activePage === 'home' ? 'text-fuchsia-600' : 'text-slate-400 hover:text-slate-600'} hover-lift">
                <i class="ph ${activePage === 'home' ? 'ph-house-fill' : 'ph-house'} text-2xl mb-1"></i>
                <span data-i18n="nav_home">Home</span>
            </a>
            <a href="events.html" class="flex flex-col items-center p-2 text-xs font-medium transition-colors ${activePage === 'events' ? 'text-fuchsia-600' : 'text-slate-400 hover:text-slate-600'} hover-lift">
                <i class="ph ${activePage === 'events' ? 'ph-calendar-blank-fill' : 'ph-calendar-blank'} text-2xl mb-1"></i>
                <span data-i18n="nav_events">Events</span>
            </a>
            <a href="marketplace.html" class="flex flex-col items-center p-2 text-xs font-medium transition-colors ${activePage === 'marketplace' ? 'text-fuchsia-600' : 'text-slate-400 hover:text-slate-600'} hover-lift">
                <i class="ph ${activePage === 'marketplace' ? 'ph-storefront-fill' : 'ph-storefront'} text-2xl mb-1"></i>
                <span data-i18n="nav_vendors">Vendors</span>
            </a>
            <a href="michango.html" class="flex flex-col items-center p-2 text-xs font-medium transition-colors ${activePage === 'michango' ? 'text-fuchsia-600' : 'text-slate-400 hover:text-slate-600'} hover-lift">
                <i class="ph ${activePage === 'michango' ? 'ph-wallet-fill' : 'ph-wallet'} text-2xl mb-1"></i>
                <span data-i18n="nav_michango">Michango</span>
            </a>
            <a href="#" class="flex flex-col items-center p-2 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors hover-lift">
                <i class="ph ph-user text-2xl mb-1"></i>
                <span data-i18n="nav_profile">Profile</span>
            </a>
        </nav>
    </div>
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

// Global utility for page-specific tours
function initPageTour(pageId, steps) {
    setTimeout(() => {
        const tourKey = `hasSeenTour_${pageId}`;
        const hasSeenTour = localStorage.getItem(tourKey);

        if (!hasSeenTour && window.driver) {
            const driverObj = window.driver.js.driver({
                showProgress: true,
                steps: steps,
                onDestroyStarted: () => {
                    if (!driverObj.hasNextStep() || confirm("Skip the rest of this tour?")) {
                        localStorage.setItem(tourKey, 'true');
                        driverObj.destroy();
                    }
                },
            });
            driverObj.drive();
        }
    }, 1000);
}
