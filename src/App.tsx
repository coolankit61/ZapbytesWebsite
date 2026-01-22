import { useState, useEffect } from 'react';
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

/* ✅ GOOGLE SHEET WEB APP URL */
const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

function App() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  const openLeadForm = () => setIsLeadFormOpen(true);
  const closeLeadForm = () => setIsLeadFormOpen(false);

  /* =====================================================
     📍 LOCATION PERMISSION → SAVE TO SHEET 3 (ONE TIME)
     ===================================================== */
  useEffect(() => {
    const alreadySaved = localStorage.getItem('location_saved');
    if (alreadySaved) return;

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          /* 🌍 Reverse Geocoding (Lat/Lng → City, State, Country) */
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const geoData = await geoRes.json();

          const payload = {
            latitude,
            longitude,
            city:
              geoData.address?.city ||
              geoData.address?.town ||
              geoData.address?.village ||
              '',
            state: geoData.address?.state || '',
            country: geoData.address?.country || '',
            source: 'Location Permission', // 📌 SHEET 3
          };

          await fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            body: JSON.stringify(payload), // ⚠️ no headers
          });

          localStorage.setItem('location_saved', 'true');
          console.log('📍 Location + Region saved to Sheet 3');
        } catch (err) {
          console.error('Location reverse lookup failed', err);
        }
      },
      () => {
        console.log('User denied location permission');
      }
    );
  }, []);

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
