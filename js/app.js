// Utility to generate bottom navigation
function renderBottomNav(activePage) {
    const navHTML = `
    <nav class="fixed bottom-0 w-full glass-nav px-6 py-3 flex justify-between items-center z-50">
        <a href="index.html" class="flex flex-col items-center p-2 text-xs font-medium transition-colors ${activePage === 'home' ? 'text-fuchsia-600' : 'text-slate-400 hover:text-slate-600'}">
            <i class="ph ${activePage === 'home' ? 'ph-house-fill' : 'ph-house'} text-2xl mb-1"></i>
            Home
        </a>
        <a href="events.html" class="flex flex-col items-center p-2 text-xs font-medium transition-colors ${activePage === 'events' ? 'text-fuchsia-600' : 'text-slate-400 hover:text-slate-600'}">
            <i class="ph ${activePage === 'events' ? 'ph-calendar-blank-fill' : 'ph-calendar-blank'} text-2xl mb-1"></i>
            Events
        </a>
        <a href="michango.html" class="flex flex-col items-center p-2 text-xs font-medium transition-colors ${activePage === 'michango' ? 'text-fuchsia-600' : 'text-slate-400 hover:text-slate-600'}">
            <i class="ph ${activePage === 'michango' ? 'ph-wallet-fill' : 'ph-wallet'} text-2xl mb-1"></i>
            Michango
        </a>
        <a href="#" class="flex flex-col items-center p-2 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors">
            <i class="ph ph-user text-2xl mb-1"></i>
            Profile
        </a>
    </nav>
    `;

    // Inject the nav right before the closing body tag
    document.body.insertAdjacentHTML('beforeend', navHTML);
}

// Add page enter animation class
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-enter");
});

// Format currency helper
function formatTZS(amount) {
    return new Intl.NumberFormat('en-TZ', {
        style: 'currency',
        currency: 'TZS',
        minimumFractionDigits: 0
    }).format(amount);
}
