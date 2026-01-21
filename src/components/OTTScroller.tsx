import { motion } from 'framer-motion';

import hungama from '@/assets/hungama.png';
import stage from '@/assets/stage.png';
import Chaupal from '@/assets/Chaupal.png';
import discovery from '@/assets/discovery.webp';
import eros_now from '@/assets/eros_now_icon.png';
import Fancode from '@/assets/Fancode.png';
import jio_hotstar from '@/assets/jio_hotstar_icon.webp';
import jio_savan from '@/assets/jio_savan_icon.webp';
import prime from '@/assets/prime_icon.png';
import shemaro from '@/assets/shemaro_icon.png';
import zee from '@/assets/zee5_icon.jpeg';
import sony from '@/assets/sony_liv_icon.png';

const logos = [
  hungama,
  stage,
  Chaupal,
  discovery,
  eros_now,
  Fancode,
  jio_hotstar,
  jio_savan,
  prime,
  shemaro,
  zee,
  sony,
];

const OTTScroller = () => {
  return (
    <div className="relative overflow-hidden py-12 bg-[#040f1a]">
      {/* Soft fade edges (same tone as section) */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#040f1a] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#040f1a] to-transparent z-10" />

      <motion.div
        className="flex items-center gap-14 w-max"
        animate={{ x: [0, -2000] }}
        transition={{
          repeat: Infinity,
          duration: 35,
          ease: 'linear',
        }}
      >
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="
              flex items-center justify-center
              px-6 py-4
              rounded-xl
              bg-white/5
              border border-white/10
              backdrop-blur-sm
              hover:bg-white/10
              transition
            "
          >
            <img
              src={logo}
              alt="OTT Platform"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default OTTScroller;
