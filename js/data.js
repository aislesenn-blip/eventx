const mockEvents = [
    {
        id: 1,
        title: "Aisha & Ali Wedding",
        type: "Wedding",
        typeId: "weddings",
        date: "24 Oct, 2024",
        location: "Mlimani City Hall, Dar",
        image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800",
        status: "Upcoming",
        statusId: "event_upcoming"
    },
    {
        id: 2,
        title: "John's Send-off",
        type: "Send-off",
        typeId: "sendoffs",
        date: "15 Nov, 2024",
        location: "Kibo Hall, Moshi",
        image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800",
        status: "Planning",
        statusId: "event_planning"
    },
    {
        id: 3,
        title: "Mama's 60th Birthday",
        type: "Birthday",
        typeId: "birthdays",
        date: "05 Dec, 2024",
        location: "Sea Cliff Resort, Zanzibar",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800",
        status: "Planning",
        statusId: "event_planning"
    },
    {
        id: 4,
        title: "Sarah & Peter Wedding",
        type: "Wedding",
        typeId: "weddings",
        date: "12 Jan, 2025",
        location: "Arusha International Conference Centre",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
        status: "Planning",
        statusId: "event_planning"
    },
    {
        id: 5,
        title: "David's Graduation Bash",
        type: "Send-off",
        typeId: "sendoffs",
        date: "20 Jan, 2025",
        location: "UDSM Yombo Hall, Dar",
        image: "https://images.unsplash.com/photo-1523580494112-071dcb84968c?auto=format&fit=crop&q=80&w=800",
        status: "Upcoming",
        statusId: "event_upcoming"
    },
    {
        id: 6,
        title: "Grace & Michael Wedding",
        type: "Wedding",
        typeId: "weddings",
        date: "14 Feb, 2025",
        location: "Johari Rotana, Dar",
        image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800",
        status: "Planning",
        statusId: "event_planning"
    },
    {
        id: 7,
        title: "Little Timmy's 1st Birthday",
        type: "Birthday",
        typeId: "birthdays",
        date: "03 Mar, 2025",
        location: "Fun City, Kigamboni",
        image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800",
        status: "Planning",
        statusId: "event_planning"
    },
    {
        id: 8,
        title: "Jane's Farewell Party",
        type: "Send-off",
        typeId: "sendoffs",
        date: "15 Apr, 2025",
        location: "Lush Garden, Arusha",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
        status: "Planning",
        statusId: "event_planning"
    },
    {
        id: 9,
        title: "Esther & Paul Wedding",
        type: "Wedding",
        typeId: "weddings",
        date: "25 May, 2025",
        location: "Rock City Mall Gardens, Mwanza",
        image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
        status: "Planning",
        statusId: "event_planning"
    },
    {
        id: 10,
        title: "Mzee Juma's 80th",
        type: "Birthday",
        typeId: "birthdays",
        date: "10 Jun, 2025",
        location: "Dodoma Hotel, Dodoma",
        image: "https://images.unsplash.com/photo-1533147670608-2a2f9776d3ac?auto=format&fit=crop&q=80&w=800",
        status: "Planning",
        statusId: "event_planning"
    },
    {
        id: 11,
        title: "Tech Conference Gala",
        type: "Send-off",
        typeId: "sendoffs",
        date: "01 Jul, 2025",
        location: "JNICC, Dar es Salaam",
        image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=800",
        status: "Planning",
        statusId: "event_planning"
    },
    {
        id: 12,
        title: "Rose & Kelvin Wedding",
        type: "Wedding",
        typeId: "weddings",
        date: "15 Aug, 2025",
        location: "Mbeya Peak Hotel, Mbeya",
        image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800",
        status: "Planning",
        statusId: "event_planning"
    }
];

function renderEventsList() {
    const container = document.getElementById('events-container');
    if (!container) return;

    container.innerHTML = '';

    mockEvents.forEach(event => {
        const statusColorClass = event.status === 'Upcoming' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700';

        const cardHTML = `
        <a href="event-details.html?id=${event.id}" class="block">
            <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover-lift">
                <div class="h-32 w-full relative">
                    <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover">
                    <div class="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-[10px] font-bold text-slate-800 shadow-sm" data-i18n="filter_${event.typeId}">
                        ${event.type}
                    </div>
                    <div class="absolute top-3 right-3 ${statusColorClass} px-2 py-1 rounded-full text-[10px] font-bold shadow-sm" data-i18n="${event.statusId}">
                        ${event.status}
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="text-base font-bold text-slate-800 mb-2">${event.title}</h3>
                    <div class="space-y-1.5">
                        <div class="flex items-center text-xs text-slate-500">
                            <i class="ph ph-calendar-blank mr-2 text-fuchsia-500 text-sm"></i>
                            ${event.date}
                        </div>
                        <div class="flex items-center text-xs text-slate-500">
                            <i class="ph ph-map-pin mr-2 text-fuchsia-500 text-sm"></i>
                            ${event.location}
                        </div>
                    </div>
                </div>
            </div>
        </a>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}
