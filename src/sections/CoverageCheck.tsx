import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Wifi, Globe } from 'lucide-react';

interface CoverageCheckProps {
  onLeadClick: () => void;
}

const CoverageCheck = ({ onLeadClick }: CoverageCheckProps) => {
  return (
    <section
      id="coverage"
      className="min-h-[80vh] flex items-center justify-center py-24 lg:py-32 relative"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0d6efd]/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center px-4 relative"
      >
        {/* Badge */}
        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-[#0d6efd] bg-[#0d6efd]/10 rounded-full">
          Coverage Area
        </span>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Check <span className="text-gradient">Coverage</span>
          <br /> in Your Area
        </h2>

        {/* Description */}
        <p className="text-muted-foreground mb-10 leading-relaxed">
          We are rapidly expanding our fiber network across India.
          Click below to check availability and book your connection.
        </p>

        {/* SINGLE CTA BUTTON */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex justify-center"
        >
          <Button
            onClick={onLeadClick}
            className="bg-[#0d6efd] hover:bg-[#0056e9] text-white font-semibold px-10 py-6 text-lg"
          >
            Check Availability
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-xl bg-card border border-border text-center"
          >
            <Globe className="w-8 h-8 text-[#0d6efd] mx-auto mb-2" />
            <div className="text-2xl font-bold text-gradient">400+</div>
            <div className="text-sm text-muted-foreground">
              Regional Partners 
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-4 rounded-xl bg-card border border-border text-center"
          >
            <Wifi className="w-8 h-8 text-[#0d6efd] mx-auto mb-2" />
            <div className="text-2xl font-bold text-gradient">50K+</div>
            <div className="text-sm text-muted-foreground">
              Active Connections
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CoverageCheck;
