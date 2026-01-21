import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, MonitorPlay, Wifi } from 'lucide-react';
import bundlesData from '@/data/bundles.json';
import OTTScroller from '@/components/OTTScroller';

interface BundlePackagesProps {
  onLeadClick: () => void;
}

const BundlePackages = ({ onLeadClick }: BundlePackagesProps) => {
  const [activeTab, setActiveTab] = useState<'ott' | 'dish'>('ott');

  const bundles =
    activeTab === 'ott'
      ? bundlesData.internetOTT
      : bundlesData.dishTVBundles;

  const tabs = [
    { id: 'ott', label: 'Internet + OTT', icon: MonitorPlay },
    { id: 'dish', label: 'Internet + IPTV + OTT', icon: Wifi },
  ];

  return (
    <section
      id="bundles"
      className="py-20 lg:py-32 bg-[#040f1a] relative overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#0d6efd"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-[#0d6efd] bg-[#0d6efd]/10 rounded-full">
            Bundle Offers
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Complete Entertainment{' '}
            <span className="text-gradient">Packages</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Get the best of both worlds with our bundled plans. High-speed
            internet plus unlimited entertainment.
          </p>

          {/* Tabs */}
          <div className="flex justify-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'ott' | 'dish')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition ${
                  activeTab === tab.id
                    ? 'bg-[#0d6efd] text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {bundles.map((bundle, index) => (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${
                  bundle.popular ? 'lg:-mt-4' : ''
                }`}
              >
                {bundle.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#0d6efd] text-white">
                      {bundle.badge}
                    </Badge>
                  </div>
                )}

                <div
                  className={`h-full p-6 rounded-2xl border transition ${
                    bundle.popular
                      ? 'border-[#0d6efd] bg-[#0d6efd]/10'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  {/* Plan Name */}
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {bundle.name}
                  </h3>

                  {/* Speed */}
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold text-gradient">
                      {bundle.speed}
                    </span>
                    <span className="text-gray-400">
                      {bundle.speedUnit}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-white">
                      ₹{bundle.price}
                    </span>
                    <span className="text-gray-400 text-sm">
                      /{bundle.period}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {bundle.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#28a745]/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#28a745]" />
                        </div>
                        <span className="text-sm text-gray-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={onLeadClick}
                    className={`w-full py-6 font-semibold ${
                      bundle.popular
                        ? 'bg-[#0d6efd] hover:bg-[#0056e9]'
                        : 'bg-white/10 hover:bg-[#0d6efd]'
                    }`}
                  >
                    Get This Plan
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 🔥 OTT ICON SCROLLER (BLACK AREA BELOW CARDS) */}
        
          <div className="mt-20">
            <OTTScroller />
          </div>
        
      </div>
    </section>
  );
};

export default BundlePackages;
