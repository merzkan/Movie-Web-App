import { Routes, Route } from 'react-router-dom';
import ScrollToTop from "./utilities/ScrollToTop"

import Navbar from './components/Navbar';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Watched from './pages/Watched';
import Watching from './pages/Watching';
import Detail from "./components/Detail";
import Footer from './components/Footer';
import ActorDetail from './components/ActorDetail';
function App() {
  return(
    <div className="min-h-screen bg-[#F1F3E0] pt-16">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watching" element={<Watching />} />
        <Route path="/watched" element={<Watched />} />
        <Route path="/movie/:id" element={<Detail />} />
        <Route path="/person/:id" element={<ActorDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;