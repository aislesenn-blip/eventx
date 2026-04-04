import { Outlet, NavLink } from 'react-router-dom';
import { Home, Calendar, CreditCard, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe z-50">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          {[
            { to: "/", icon: Home, label: "Home" },
            { to: "/events", icon: Calendar, label: "Events" },
            { to: "/contributions", icon: CreditCard, label: "Michango" },
            { to: "/profile", icon: User, label: "Profile" }
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 relative ${
                  isActive ? "text-primary-600" : "text-gray-400 hover:text-gray-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary-50 rounded-lg scale-75"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className="w-6 h-6 z-10" />
                  <span className="text-[10px] font-medium z-10">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
