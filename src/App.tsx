import { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeadFormPopup from '@/components/LeadFormPopup';
import StickyCTABar from '@/components/StickyCTABar';
import FloatingButtons from '@/components/FloatingButtons';
import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import About from '@/sections/About';
import Plans from '@/sections/Plans';
import BundlePackages from '@/sections/BundlePackages';
import CoverageCheck from '@/sections/CoverageCheck';
import Testimonials from '@/sections/Testimonials';
import FAQ from '@/sections/FAQ';
import CTA from '@/sections/CTA';
import Contact from '@/sections/Contact';
import './App.css';

function App() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  const openLeadForm = () => setIsLeadFormOpen(true);
  const closeLeadForm = () => setIsLeadFormOpen(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <Navbar onLeadClick={openLeadForm} />

        {/* Main Content */}
        <main>
          <Hero onLeadClick={openLeadForm} />
          <Features />
          <About />
          <Plans onLeadClick={openLeadForm} />
          <BundlePackages onLeadClick={openLeadForm} />
          <CoverageCheck onLeadClick={openLeadForm} />
          <Testimonials />
          <FAQ />
          <CTA onLeadClick={openLeadForm} />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Conversion Components */}
        <LeadFormPopup isOpen={isLeadFormOpen} onClose={closeLeadForm} />
        <StickyCTABar onLeadClick={openLeadForm} />
        <FloatingButtons />
      </div>
    </ThemeProvider>
  );
}

export default App;
