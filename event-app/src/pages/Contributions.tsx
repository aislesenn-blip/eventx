import { motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, Search, Filter } from 'lucide-react';

const MOCK_CONTRIBUTIONS = [
  { id: 1, name: "Aisha Juma", type: "paid", amount: 500000, date: "Today, 10:23 AM" },
  { id: 2, name: "John Doe", type: "pledge", amount: 200000, date: "Yesterday" },
  { id: 3, name: "Zainab Ali", type: "paid", amount: 1000000, date: "Oct 12, 2024" },
  { id: 4, name: "Hamisi Musa", type: "pledge", amount: 150000, date: "Oct 10, 2024" },
];

const Contributions = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-primary-600 pt-12 pb-24 px-6 rounded-b-[40px] relative">
        <h1 className="text-2xl font-bold text-white mb-6">Michango</h1>

        <div className="text-center">
          <p className="text-primary-100 text-sm mb-1">Total Collected</p>
          <h2 className="text-4xl font-bold text-white mb-4">TZS 4,500,000</h2>

          <div className="bg-white/20 rounded-full p-1 max-w-xs mx-auto backdrop-blur-sm">
            <div className="h-2 bg-white rounded-full w-[45%]"></div>
          </div>
          <p className="text-xs text-primary-100 mt-2">Target: TZS 10,000,000 (45%)</p>
        </div>
      </header>

      <main className="px-6 -mt-16 space-y-6 relative z-10">
        {/* Summary Cards */}
        <div className="flex gap-4">
          <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
             <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-2">
                <ArrowDownLeft className="w-4 h-4" />
             </div>
             <p className="text-xs text-gray-500 mb-1">Paid</p>
             <p className="text-sm font-bold text-gray-900">4.5M</p>
          </div>
          <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
             <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-2">
                <ArrowUpRight className="w-4 h-4" />
             </div>
             <p className="text-xs text-gray-500 mb-1">Pledges</p>
             <p className="text-sm font-bold text-gray-900">1.2M</p>
          </div>
        </div>

        {/* List Header */}
        <div className="flex justify-between items-center pt-2">
          <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
          <button className="p-2 bg-gray-100 rounded-full">
            <Filter className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search contributor..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 shadow-sm rounded-xl text-sm focus:border-primary-500 focus:ring-0 transition-all"
          />
        </div>

        {/* List */}
        <div className="space-y-3">
          {MOCK_CONTRIBUTIONS.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                  ${tx.type === 'paid' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}
                `}>
                  {tx.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{tx.name}</p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 text-sm">TZS {tx.amount.toLocaleString()}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  tx.type === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {tx.type.toUpperCase()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Contributions;
