import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Zap, ArrowRight } from 'lucide-react';

interface StickyCTABarProps {
  onLeadClick: () => void;
}

const StickyCTABar = ({ onLeadClick }: StickyCTABarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has previously dismissed the bar
    const dismissed = localStorage.getItem('zapbytes-cta-dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show bar after scrolling down 500px
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('zapbytes-cta-dismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50"
        >
          <div className="glass-strong rounded-2xl p-4 shadow-2xl border border-white/10">
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0d6efd] to-[#0056e9] flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground mb-1 truncate">
                  Get Blazing Fast Internet
                </h4>
                <p className="text-sm text-muted-foreground truncate">
                  Plans start at just ₹424/month
                </p>
              </div>

              {/* CTA Button */}
              <Button
                onClick={onLeadClick}
                size="sm"
                className="bg-[#0d6efd] hover:bg-[#0056e9] text-white font-semibold flex-shrink-0"
              >
                Get Now
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </div>

            {/* Progress Bar */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-[#0d6efd]/20 rounded-b-2xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-[#0d6efd]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
                onAnimationComplete={handleDismiss}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTABar;
