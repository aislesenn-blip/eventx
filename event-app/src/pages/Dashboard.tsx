import { motion } from 'framer-motion';
import { Bell, Plus, TrendingUp, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white pt-12 pb-6 px-6 rounded-b-3xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -mr-20 -mt-20 z-0"></div>
        <div className="relative z-10 flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-500 text-sm font-medium">Welcome back,</p>
            <h1 className="text-2xl font-bold text-gray-900">Juma </h1>
          </div>
          <button className="relative p-2 bg-white rounded-full shadow-sm border border-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </div>

        {/* Quick Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary-600 to-primary-900 rounded-2xl p-6 text-white shadow-lg shadow-primary-500/30"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-primary-100 text-sm font-medium mb-1">Total Contributions</p>
              <h2 className="text-3xl font-bold">TZS 4.5M</h2>
            </div>
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-primary-100">
            <span>Target: TZS 10M</span>
            <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full w-[45%]"></div>
            </div>
            <span>45%</span>
          </div>
        </motion.div>
      </header>

      <main className="px-6 mt-8 space-y-8">
        {/* Actions */}
        <section className="flex space-x-4">
          <button className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-2 active:scale-95 transition-transform">
            <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-gray-700">New Event</span>
          </button>
          <button className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-2 active:scale-95 transition-transform">
            <div className="w-12 h-12 bg-secondary-50 text-secondary-600 rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-gray-700">Add Pledge</span>
          </button>
        </section>

        {/* Active Events */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-bold text-gray-900">Upcoming Events</h3>
            <Link to="/events" className="text-sm font-medium text-primary-600">View All</Link>
          </div>

          <div className="space-y-4">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center space-x-4"
              >
                <img
                  src={i === 1 ? "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop" : "https://images.unsplash.com/photo-1530103862676-de8892b07f87?q=80&w=2070&auto=format&fit=crop"}
                  alt="Event"
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{i === 1 ? 'Aisha & Ali Wedding' : 'John Send-off'}</h4>
                  <p className="text-sm text-gray-500">Oct 24, 2024 • Mlimani City</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(j => (
                        <div key={j} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                           <img src={`https://i.pravatar.cc/100?img=${i*10+j}`} alt="avatar" />
                        </div>
                      ))}
                    </div>
                    <span className="text-xs font-medium text-gray-500">+42 guests</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
