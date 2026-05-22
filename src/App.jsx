import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import CoffeeMockup3D from './components/CoffeeMockup3D';
import Contact from './components/Contact';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Hero />
      <Menu />
      <CoffeeMockup3D />
      <Contact />
      <CartDrawer />
      <WhatsAppButton />
      <Footer />
    </CartProvider>
  );
}

export default App;
