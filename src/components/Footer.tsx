import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import logo2 from '@/assets/logo2.png';

const footerLinks = {
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Our Team', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
  ],
  services: [
    { name: 'Internet Plans', href: '#plans' },
    { name: 'Bundle Packages', href: '#bundles' },
    { name: 'Coverage Area', href: '#coverage' },
    { name: 'Business Solutions', href: '#' },
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'FAQs', href: '#faq' },
    { name: 'Status', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Refund Policy', href: '#' },
    { name: 'Cancellation', href: '#' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/zapbytes', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/zapbytes', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/zapbytes', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/zapbytes', label: 'LinkedIn' },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040f1a] text-white relative overflow-hidden">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0d6efd]/30 to-transparent" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.a
              href="#home"
              whileHover={{ scale: 1.03 }}
              className="inline-block mb-6"
            >
              <img
  src={logo2}
  alt="Zapbytes"
  className="h-14 md:h-16 w-auto object-contain"
/>

            </motion.a>

            <p className="text-gray-400 mb-6 max-w-sm">
              Experience the future of internet with Zapbytes. Fast, reliable,
              and unlimited fiber broadband for your home and business.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#0d6efd] flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4 text-white capitalize">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold mb-1">Subscribe to our newsletter</h4>
              <p className="text-gray-400 text-sm">
                Get the latest updates and offers directly to your inbox.
              </p>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#0d6efd]"
              />
              <button className="px-6 py-3 bg-[#0d6efd] hover:bg-[#0056e9] rounded-lg font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Zapbytes. All rights reserved.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <span className="text-sm">Back to top</span>
            <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#0d6efd] flex items-center justify-center">
              <ArrowUp className="w-4 h-4" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
