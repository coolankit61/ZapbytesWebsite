import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCall = () => {
    window.location.href = 'tel:+919716321656';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919716321656', '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 right-4 z-50"
        >
          {/* Main Toggle Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-14 h-14 rounded-full bg-[#0d6efd] shadow-lg shadow-[#0d6efd]/30 flex items-center justify-center relative z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open contact options"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          </motion.button>

          {/* Action Buttons */}
          <AnimatePresence>
            {isExpanded && (
              <>
                {/* Call Button */}
                <motion.button
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ scale: 1, x: -60, y: -20 }}
                  exit={{ scale: 0, x: 0, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCall}
                  className="absolute top-0 left-0 w-12 h-12 rounded-full bg-[#0d6efd] shadow-lg shadow-[#0d6efd]/30 flex items-center justify-center"
                  title="Call Us"
                >
                  <FaPhoneAlt className="w-5 h-5 text-white" />
                </motion.button>

                {/* WhatsApp Button */}
                <motion.button
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ scale: 1, x: -20, y: -60 }}
                  exit={{ scale: 0, x: 0, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWhatsApp}
                  className="absolute top-0 left-0 w-12 h-12 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 flex items-center justify-center"
                  title="Chat on WhatsApp"
                >
                  <FaWhatsapp className="w-6 h-6 text-white" />
                </motion.button>
              </>
            )}
          </AnimatePresence>

          {/* Pulse Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[#0d6efd]/30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingButtons;
