import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Contributions from './pages/Contributions';
import ECard from './pages/ECard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:id" element={<EventDetails />} />
          <Route path="contributions" element={<Contributions />} />
          <Route path="profile" element={<div className="p-6 text-center mt-12">Profile Page (Coming Soon)</div>} />
        </Route>
        {/* Full screen E-Card route outside of Layout */}
        <Route path="/ecard/:id" element={<ECard />} />
      </Routes>
    </Router>
  );
}

export default App;
