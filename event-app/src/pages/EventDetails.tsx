import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Clock, Share2, QrCode } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'committee', label: 'Committee' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <div className="relative h-72">
        <img
          src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nfGVufDB8MHx8fDE3NzUzNzAwNTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Event Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent"></div>

        {/* Top actions */}
        <div className="absolute top-12 left-0 right-0 px-6 flex justify-between items-center z-10">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex space-x-3">
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate(`/ecard/${id}`)}
              className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30"
            >
              <QrCode className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title area */}
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <span className="px-3 py-1 bg-primary-600/90 rounded-full text-xs font-semibold backdrop-blur-sm mb-3 inline-block">Wedding</span>
          <h1 className="text-3xl font-bold mb-2">Aisha & Ali Wedding</h1>
          <p className="text-gray-200 text-sm flex items-center"><MapPin className="w-4 h-4 mr-1"/> Mlimani City Hall, Dar es Salaam</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 -mt-6 rounded-t-3xl relative z-10">
        {/* Info Cards */}
        <div className="flex px-6 py-6 gap-4">
          <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-sm font-semibold text-gray-900">Oct 24, 2024</p>
            </div>
          </div>
          <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-secondary-50 flex items-center justify-center text-secondary-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Time</p>
              <p className="text-sm font-semibold text-gray-900">14:00 PM</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-gray-200 flex space-x-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-medium relative transition-colors ${
                activeTab === tab.id ? 'text-primary-600' : 'text-gray-500'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">About the Event</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Join us as we celebrate the union of Aisha and Ali. The ceremony will be followed by a grand reception. Dress code is elegant evening wear.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Location</h3>
                  <div className="h-40 bg-gray-200 rounded-2xl overflow-hidden relative">
                    {/* Placeholder for Map */}
                    <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-500">Map View</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'schedule' && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                 <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
                    {[
                      { time: "14:00 PM", title: "Arrival of Guests", desc: "Red carpet and welcome drinks." },
                      { time: "15:30 PM", title: "Entrance of the Couple", desc: "Main hall entrance with music." },
                      { time: "16:00 PM", title: "Dinner Served", desc: "Buffet opens for all guests." }
                    ].map((item, i) => (
                      <div key={i} className="relative pl-6">
                        <div className="absolute w-4 h-4 bg-primary-500 rounded-full -left-[9px] top-1 border-4 border-white"></div>
                        <p className="text-sm font-bold text-primary-600 mb-1">{item.time}</p>
                        <h4 className="text-base font-bold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    ))}
                 </div>
              </motion.div>
            )}

            {activeTab === 'committee' && (
              <motion.div
                key="committee"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {[
                  { role: "Chairman", name: "Mr. Hamisi" },
                  { role: "Treasurer", name: "Asha Juma" },
                  { role: "Secretary", name: "John Doe" }
                ].map((member, i) => (
                  <div key={i} className="flex items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt={member.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <p className="font-bold text-gray-900">{member.name}</p>
                      <p className="text-xs text-primary-600 font-medium">{member.role}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
