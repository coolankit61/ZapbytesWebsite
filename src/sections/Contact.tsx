import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

/* ✅ GOOGLE SHEET WEB APP URL */
const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    content: '204A, Amba Tower DC Chowk, Rohini Sector 9',
    subContent: 'New Delhi 110085',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+91 9716321656',
    subContent: '',
  },
  {
    icon: Mail,
    title: 'Email Us',
    content: 'support@zapbytes.in',
    subContent: 'We reply within 24 hours',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    content: '24/7 Support',
    subContent: 'Always here to help',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* ✅ REAL SUBMIT HANDLER → SAVE TO GOOGLE SHEET (SHEET 2) */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ✅ clean phone & auto add 91
    const cleanPhone = formData.phone.replace(/\D/g, '');
    const formattedPhone =
      cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formattedPhone,
      message: formData.message,
      source: 'Contact Us Form', // 🔥 used to route to Sheet 2
    };

    try {
      console.log('Submitting contact query:', payload);

      const response = await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        body: JSON.stringify(payload), // ⚠️ NO headers
      });

      await response.text();

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });

      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Contact form submit error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0d6efd]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0d6efd]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-[#0d6efd] bg-[#0d6efd]/10 rounded-full">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Contact <span className="text-gradient">Us</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0d6efd]/10 flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-[#0d6efd]" />
                </div>
                <h3 className="font-semibold mb-1">{info.title}</h3>
                <p>{info.content}</p>
                <p className="text-sm text-muted-foreground">
                  {info.subContent}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-2xl bg-card border border-border">
            <h3 className="text-2xl font-semibold mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <Input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <Input
                type="tel"
                placeholder="10 digit phone number"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value.replace(/\D/g, ''),
                  })
                }
              />

              <Textarea
                placeholder="Your message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0d6efd] hover:bg-[#0056e9] py-6"
              >
                {isSubmitting
                  ? 'Submitting...'
                  : isSubmitted
                  ? 'Message Sent!'
                  : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
