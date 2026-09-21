import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Mouhassib from './pages/Mouhassib';
import Manzeel from './pages/Manzeel';
import GestCommerce from './pages/GestCommerce';
import Software from './pages/Software';
import Services from './pages/Services';
import EnterpriseSolutions from './pages/EnterpriseSolutions';
import Raqib from './pages/Raqib';
import Waqood from './pages/Waqood';
import Contact from './pages/Contact';
import Thanks from './pages/Thanks';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logiciels" element={<Software />} />
          <Route path="/logiciels/raqib" element={<Raqib />} />
          <Route path="/logiciels/waqood" element={<Waqood />} />
          <Route path="/mouhassib" element={<Mouhassib />} />
          <Route path="/manzeel" element={<Manzeel />} />
          <Route path="/gestcommerce" element={<GestCommerce />} />
          <Route path="/services" element={<Services />} />
          <Route path="/solutions-entreprises" element={<EnterpriseSolutions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/merci" element={<Thanks />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
