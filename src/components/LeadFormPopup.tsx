import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, User, Mail, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

/* ✅ GOOGLE SHEET WEB APP URL */
const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

/* ✅ COMPANY FEASIBLE PINCODES */
const FEASIBLE_PINCODES = [
  '110012',
  '110015',
  '110028',
  '110032',
  '110035',
  '110039',
  '110040',
  '110042',
  '110045',
  '110046',
  '110052',
  '110053',
  '110054',
  '110063',
  '110083',
  '110084',
  '110085',
  '110086',
  '110089',
  '110093',
  '110094',
  '110095',
];


interface LeadFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadFormPopup = ({ isOpen, onClose }: LeadFormPopupProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: '',
    email: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFeasible, setIsFeasible] = useState<boolean | null>(null);

  /* ✅ FORM SUBMIT HANDLER */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;

    setIsSubmitting(true);

    // ✅ Auto add 91 prefix
    const formattedPhone = `91${formData.phone}`;

    // ✅ Feasibility check (AFTER submit)
    const feasible = FEASIBLE_PINCODES.includes(formData.pincode);
    setIsFeasible(feasible);

    // 📍 Get location saved earlier (from App.tsx)
    const location = JSON.parse(
      localStorage.getItem('user_location') || '{}'
    );

    const payload = {
      eventType: 'lead_submit', // 🔥 VERY IMPORTANT (backend routing)
      name: formData.name,
      phone: formattedPhone,
      pincode: formData.pincode,
      email: formData.email,

      // ✅ Attach location ONLY if available
      latitude: location.latitude || '',
      longitude: location.longitude || '',
      city: location.city || '',
      state: location.state || '',
      country: location.country || '',

      source: 'Get Started Popup',
    };

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        body: JSON.stringify(payload), // ⚠️ no headers
      });

      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setIsFeasible(null);
        setFormData({
          name: '',
          phone: '',
          pincode: '',
          email: '',
          consent: false,
        });
        onClose();
      }, 3500);
    } catch (error) {
      console.error('Lead submit error:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Get Your Connection
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12"
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${isFeasible ? 'bg-green-100' : 'bg-red-100'
                  }`}
              >
                {isFeasible ? (
                  <Check className="w-10 h-10 text-green-600" />
                ) : (
                  <X className="w-10 h-10 text-red-600" />
                )}
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {isFeasible ? 'Thank You!' : 'Sorry 😔'}
              </h3>

              <p className="text-muted-foreground">
                {isFeasible
                  ? 'Our team will contact you within 24 hours.'
                  : 'Currently, our network is not available in your area. We will reach out once services are launched.'}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Full Name */}
              <div>
                <label className="text-sm font-medium">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    required
                    placeholder="Enter your full name"
                    className="pl-10 py-5"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    required
                    type="tel"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    placeholder="10-digit phone number"
                    className="pl-10 py-5"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value.replace(/\D/g, ''),
                      })
                    }
                  />
                </div>
              </div>

              {/* Pincode */}
              <div>
                <label className="text-sm font-medium">Pincode *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    required
                    maxLength={6}
                    pattern="[0-9]{6}"
                    placeholder="Area pincode"
                    className="pl-10 py-5"
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pincode: e.target.value.replace(/\D/g, ''),
                      })
                    }
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email address"
                    className="pl-10 py-5"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Consent */}
              <label className="flex gap-3 text-sm text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      consent: e.target.checked,
                    })
                  }
                />
                I agree to receive WhatsApp notifications
              </label>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !formData.consent}
                className="w-full py-6 bg-[#0d6efd] hover:bg-[#0056e9]"
              >
                {isSubmitting ? 'Submitting...' : 'Get Callback'}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormPopup;
