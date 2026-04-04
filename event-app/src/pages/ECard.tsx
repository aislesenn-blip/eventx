import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const ECard = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden flex flex-col items-center justify-center py-12 px-6">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-600/30 rounded-full blur-3xl -ml-20 -mt-20"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary-600/30 rounded-full blur-3xl -mr-20 -mb-20"></div>

      <div className="absolute top-12 left-6 z-20">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary-500/50">
             <span className="text-3xl font-serif font-bold italic">A&A</span>
          </div>

          <p className="text-gray-300 text-sm tracking-widest uppercase mb-2">You are invited to</p>
          <h2 className="text-3xl font-bold mb-6 text-white font-serif">Aisha & Ali<br/>Wedding</h2>

          <div className="space-y-4 mb-8 w-full">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-xs text-gray-400 mb-1">Date & Time</p>
              <p className="font-semibold text-white">Oct 24, 2024 • 14:00 PM</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-xs text-gray-400 mb-1">Venue</p>
              <p className="font-semibold text-white">Mlimani City Hall<br/>Dar es Salaam</p>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="bg-white p-3 rounded-2xl mb-6">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=event_${id}_guest_123`}
              alt="QR Code"
              className="w-32 h-32 rounded-xl"
            />
          </div>

          <p className="text-xs text-gray-400">Scan at entrance for check-in</p>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 mt-8">
          <button className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center justify-center space-x-2 text-white active:scale-95 transition-transform">
            <Download className="w-5 h-5" />
            <span className="font-semibold text-sm">Save Card</span>
          </button>
          <button className="flex-1 bg-primary-600 p-4 rounded-2xl flex items-center justify-center space-x-2 text-white shadow-lg shadow-primary-500/30 active:scale-95 transition-transform">
            <Share2 className="w-5 h-5" />
            <span className="font-semibold text-sm">Share</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ECard;
