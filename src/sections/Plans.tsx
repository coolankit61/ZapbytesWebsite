import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles } from 'lucide-react';
import plansData from '@/data/plans.json';

interface PlansProps {
  onLeadClick: () => void;
}

const Plans = ({ onLeadClick }: PlansProps) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = isAnnual ? plansData.annualPlans : plansData.internetPlans;

  return (
    <section id="plans" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0d6efd]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0d6efd]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-[#0d6efd] bg-[#0d6efd]/10 dark:bg-[#0d6efd]/20 rounded-full">
            Pricing Plans
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our Best{' '}
            <span className="text-gradient">Plans</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your needs. All plans include unlimited data and free installation.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <motion.button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 rounded-full bg-muted border border-border p-1"
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute top-1 w-6 h-6 rounded-full bg-[#0d6efd] shadow-md"
                animate={{ left: isAnnual ? 'calc(100% - 28px)' : '4px' }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            </motion.button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            <Badge className="bg-[#28a745]/10 text-[#28a745] hover:bg-[#28a745]/20">
              Save 2 Months
            </Badge>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <AnimatePresence mode="wait">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, rotateY: -15 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 15 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative group ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-[#0d6efd] text-white px-4 py-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className={`h-full p-6 rounded-2xl border-2 transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-b from-[#0d6efd]/5 to-transparent border-[#0d6efd] shadow-xl shadow-[#0d6efd]/10'
                      : 'bg-card border-border hover:border-[#0d6efd]/50'
                  }`}
                >
                  {/* Plan Name */}
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>

                  {/* Speed */}
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold text-gradient">{plan.speed}</span>
                    <span className="text-muted-foreground">{plan.speedUnit}</span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">₹{plan.price}</span>
                      {'originalPrice' in plan && plan.originalPrice !== undefined && (
                        <span className="text-muted-foreground line-through text-sm">
                          ₹{plan.originalPrice as number}
                        </span>
                      )}
                    </div>
                    <span className="text-muted-foreground text-sm">/{plan.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#28a745]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#28a745]" />
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    onClick={onLeadClick}
                    className={`w-full font-semibold py-6 transition-all duration-300 ${
                      plan.popular
                        ? 'bg-[#0d6efd] hover:bg-[#0056e9] text-white animate-pulse-glow'
                        : 'bg-muted hover:bg-[#0d6efd] hover:text-white'
                    }`}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Additional Info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          All prices are Exclusive of GST. Installation charges may apply based on location.
        </motion.p>
      </div>
    </section>
  );
};

export default Plans;
