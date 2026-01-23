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
     📍 LOCATION PERMISSION (STORE LOCALLY ONLY)
     ===================================================== */
  useEffect(() => {
    const stored = localStorage.getItem('user_location');
    if (stored) return;

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const geoData = await geoRes.json();

          const locationData = {
            latitude,
            longitude,
            city:
              geoData.address?.city ||
              geoData.address?.town ||
              geoData.address?.village ||
              '',
            state: geoData.address?.state || '',
            country: geoData.address?.country || '',
            capturedAt: Date.now(),
          };

          localStorage.setItem(
            'user_location',
            JSON.stringify(locationData)
          );

          console.log('📍 Location captured locally', locationData);
        } catch (err) {
          console.error('Reverse geocoding failed', err);
        }
      },
      () => {
        console.log('User denied location permission');
      }
    );
  }, []);

  /* =====================================================
     🧹 LOCATION-ONLY FALLBACK
     If user leaves without submitting any form
     ===================================================== */
  useEffect(() => {
    const handleUnload = async () => {
      const location = localStorage.getItem('user_location');
      const leadSubmitted = localStorage.getItem('lead_submitted');
      const contactSubmitted = localStorage.getItem('contact_submitted');

      if (location && !leadSubmitted && !contactSubmitted) {
        try {
          await fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            body: JSON.stringify({
              ...JSON.parse(location),
              source: 'Location Permission',
            }),
          });
          console.log('📍 Location-only saved to Sheet 3');
        } catch (err) {
          console.error('Location-only submit failed', err);
        }
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar onLeadClick={openLeadForm} />

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

        <Footer />

        <LeadFormPopup isOpen={isLeadFormOpen} onClose={closeLeadForm} />
        <StickyCTABar onLeadClick={openLeadForm} />
        <FloatingButtons />
      </div>
    </ThemeProvider>
  );
}

export default App;
