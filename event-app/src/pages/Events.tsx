import { motion } from 'framer-motion';
import { Calendar, MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_EVENTS = [
  {
    id: 1,
    title: "Aisha & Ali Wedding",
    type: "Wedding",
    date: "Oct 24, 2024",
    location: "Mlimani City Hall, Dar es Salaam",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
    status: "Upcoming"
  },
  {
    id: 2,
    title: "John Send-off",
    type: "Send-off",
    date: "Nov 15, 2024",
    location: "Kibo Hall, Moshi",
    image: "https://images.unsplash.com/photo-1530103862676-de8892b07f87?q=80&w=2070&auto=format&fit=crop",
    status: "Planning"
  },
  {
    id: 3,
    title: "Sarah's 30th Birthday",
    type: "Birthday",
    date: "Dec 05, 2024",
    location: "Sea Cliff Resort, Zanzibar",
    image: "https://images.unsplash.com/photo-1530103862676-de8892b07f87?q=80&w=2070&auto=format&fit=crop",
    status: "Upcoming"
  }
];

const Events = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white pt-12 pb-4 px-6 shadow-sm sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">My Events</h1>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-transparent rounded-xl text-sm focus:border-primary-500 focus:bg-white focus:ring-0 transition-all"
          />
        </div>

        <div className="flex overflow-x-auto gap-2 mt-4 pb-2 scrollbar-hide">
          {['All', 'Weddings', 'Send-offs', 'Birthdays'].map((filter, i) => (
            <button
              key={filter}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                i === 0
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      <main className="px-6 py-6 space-y-6">
        {MOCK_EVENTS.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => navigate(`/events/${event.id}`)}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="h-48 relative overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 shadow-sm">
                  {event.type}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                  event.status === 'Upcoming' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {event.status}
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-primary-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-primary-500" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </main>
    </div>
  );
};

export default Events;
