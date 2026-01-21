export interface Plan {
  id: string;
  name: string;
  speed: number;
  speedUnit: string;
  price: number;
  originalPrice?: number;
  period: string;
  features: string[];
  popular?: boolean;
  badge?: string;
}

export interface BundlePackage {
  id: string;
  name: string;
  speed: number;
  speedUnit: string;
  price: number;
  period: string;
  features: string[];
  ottCount?: number;
  channels?: number;
  image?: string;
  badge?: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface LeadFormData {
  name: string;
  phone: string;
  pincode: string;
  email: string;
  consent: boolean;
}
