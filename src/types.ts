export interface Doctor {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  experience: string;
  education: string;
  bio: string;
  availability: string;
  specialties: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface MedicalService {
  id: string;
  code: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  category: 'imaging' | 'genetics' | 'laboratory' | 'checkups' | 'specialist';
  features: string[];
  turnaroundTime: string;
  preparation: string[];
  priceRange?: string;
  recommendedFor: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Healthcare Sector & Policy' | 'Preventive Medicine' | 'Patient Experience' | 'Medical Innovation';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  excerpt: string;
  content: string[];
  keySectorTakeaways: string[];
  tags: string[];
}

export interface ClinicLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    emergency: string;
  };
  amenities: string[];
  imagingWings: string[];
}

export interface SymptomGuide {
  symptom: string;
  description: string;
  suggestedDepartment: string;
  suggestedDoctorId: string;
  urgency: 'routine' | 'priority' | 'urgent';
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
