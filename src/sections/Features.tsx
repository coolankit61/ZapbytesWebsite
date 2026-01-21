import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, MonitorPlay, Infinity, ArrowUpDown, Wifi, Headphones } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-8 h-8" />,
  MonitorPlay: <MonitorPlay className="w-8 h-8" />,
  Infinity: <Infinity className="w-8 h-8" />,
  ArrowUpDown: <ArrowUpDown className="w-8 h-8" />,
  Wifi: <Wifi className="w-8 h-8" />,
  Headphones: <Headphones className="w-8 h-8" />,
};

const features = [
  {
    id: 'fiber-ftth',
    icon: 'Zap',
    title: 'Fiber To The Home',
    description: 'Experience blazing fast internet with our 100% fiber optic network directly to your home for unmatched speed and reliability.',
  },
  {
    id: 'ultra-hd',
    icon: 'MonitorPlay',
    title: '4K Viewing Experience',
    description: 'Stream your favorite content in stunning 4K Ultra HD quality without buffering or lag.',
  },
  {
    id: 'unlimited-data',
    icon: 'Infinity',
    title: 'Unlimited Data',
    description: 'No FUP limits or data caps. Browse, stream, and download as much as you want without worrying.',
  },
  {
    id: 'equal-speed',
    icon: 'ArrowUpDown',
    title: 'Equal Upload & Download',
    description: 'Get symmetrical speeds for seamless video calls, file uploads, and cloud storage access.',
  },
  {
    id: 'smart-router',
    icon: 'Wifi',
    title: 'Smart Router Included',
    description: 'Get a high-performance dual-band Wi-Fi router included with every plan for optimal coverage.',
  },
  {
    id: '24-7-support',
    icon: 'Headphones',
    title: '24/7 Support',
    description: 'Our dedicated support team is available round the clock to assist you with any issues.',
  },
];

interface FeatureCardProps {
  feature: typeof features[0];
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, rotateX: 90 }}
      whileInView={{ opacity: 1, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale(1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transformStyle: 'preserve-3d',
      }}
      className="group relative p-8 rounded-2xl bg-card border border-border hover:border-[#0d6efd]/50 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${50 + mousePosition.x * 5}% ${50 + mousePosition.y * 5}%, rgba(13, 110, 253, 0.15) 0%, transparent 50%)`
            : 'none',
        }}
      />

      {/* Icon */}
      <motion.div
        className="relative w-16 h-16 rounded-xl bg-[#0d6efd]/10 dark:bg-[#0d6efd]/20 flex items-center justify-center mb-6"
        animate={isHovered ? { scale: [1, 1.2, 1.1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-[#0d6efd]">{iconMap[feature.icon]}</div>
        <motion.div
          className="absolute inset-0 bg-[#0d6efd] rounded-xl blur-xl opacity-0 group-hover:opacity-30"
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Content */}
      <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-[#0d6efd] transition-colors">
        {feature.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {feature.description}
      </p>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
        <motion.div
          className="absolute top-0 right-0 w-40 h-10 bg-[#0d6efd]/10 transform rotate-45 translate-x-10 -translate-y-10"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        />
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[#0d6efd]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-[#0d6efd]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-[#0d6efd] bg-[#0d6efd]/10 dark:bg-[#0d6efd]/20 rounded-full">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Explore Our{' '}
            <span className="text-gradient">Exceptional Features</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide cutting-edge internet solutions designed to meet all your connectivity needs with unmatched reliability.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* Connection Lines (Desktop Only) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
          style={{ zIndex: -1 }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0d6efd" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#0d6efd" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0d6efd" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Features;
