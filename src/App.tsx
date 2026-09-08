import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Mouhassib from './pages/Mouhassib';
import GestCommerce from './pages/GestCommerce';
import Contact from './pages/Contact';
import Thanks from './pages/Thanks';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-marine-900">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mouhassib" element={<Mouhassib />} />
          <Route path="/gestcommerce" element={<GestCommerce />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/merci" element={<Thanks />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
