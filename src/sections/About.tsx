import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, Award, Users, Globe, Shield } from 'lucide-react';

const highlights = [
  { icon: Award, label: '10+ Years Experience' },
  { icon: Users, label: '50K+ Happy Customers' },
  { icon: Globe, label: '400+ regional partners ' },
  { icon: Shield, label: '99.9% Uptime' },
];

const benefits = [
  'Fiber To The Home (FTTH) Technology',
  'Highly Secured Network Infrastructure',
  'Zero Installation Charges Offers',
  '24/7 Customer Support',
  '30-Day Money Back Guarantee',
  'Free Smart Router Included',
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);
  const imageBorderRadius = useTransform(scrollYProgress, [0, 0.5], ['40% 60%', '16px']);
  const textX = useTransform(scrollYProgress, [0.2, 0.5], [-50, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div
              style={{ scale: imageScale, borderRadius: imageBorderRadius }}
              className="relative overflow-hidden shadow-2xl"
            >
              <img
                src="/about-image.jpg"
                alt="zapbytes Experience"
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d6efd]/20 to-transparent" />
            </motion.div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8 glass-strong p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0d6efd] flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gradient">#1</div>
                  <div className="text-sm text-muted-foreground">ISP in Rohini</div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#0d6efd]/30 rounded-xl -z-10" />
            <div className="absolute -bottom-4 -left-8 w-32 h-32 bg-[#0d6efd]/10 rounded-full blur-2xl -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-[#0d6efd] bg-[#0d6efd]/10 dark:bg-[#0d6efd]/20 rounded-full">
              About zapbytes
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Why We Are{' '}
              <span className="text-gradient">The Best?</span>
            </h2>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              At zapbytes, we believe everyone deserves access to fast, reliable internet. 
              That's why we've built a state-of-the-art fiber network that delivers 
              exceptional speeds and unmatched reliability to homes and businesses across 
              the region. Our commitment to customer satisfaction drives everything we do.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0d6efd]/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#0d6efd]" />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Benefits List */}
            <motion.div
              style={{ x: textX, opacity: textOpacity }}
              className="space-y-3"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[#28a745]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#28a745]" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
