import { Doctor, MedicalService, ClinicLocation, SymptomGuide, FaqItem, BlogPost } from '../types';

export const CLINIC_DATA = {
  name: 'Dantora Health Australia',
  tagline: 'Healthcare that starts with understanding you',
  subheading: 'Clear check-ups, modern scans, and helpful doctors all in one friendly place — with results explained in plain words.',
  established: 2011,
  totalPatients: '40,000+',
  clinicArea: '4,000 m²',
  turnaroundAvg: 'Same day',
  satisfactionRate: '99%',
  doctorsCount: '15+',
  imagingWings: '4',
  triageEmail: 'care@dantorahealth.com.au',
  admissionsEmail: 'admissions@dantorahealth.com.au',
  feedbackEmail: 'feedback@dantorahealth.com.au',
  headquarters: '187 Macquarie Street, Sydney NSW 2000, Australia',
  country: 'Australia',
};

export const DOCTORS: Doctor[] = [
  {
    id: 'carter-boeckh',
    name: 'Dr. Carter Boeckh',
    role: 'Lead Doctor, Genetics & Wellness',
    department: 'Genetics & DNA',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    experience: '16+ years',
    education: 'MBBS, PhD - University of Sydney Medical School',
    bio: 'Helps Australians identify hereditary health risks and adopt targeted, proactive nutritional and lifestyle habits.',
    availability: 'Mon - Thu (8:30 AM - 4:30 PM)',
    specialties: ['Family DNA Health', 'Food & Body Health', 'Preventive Care'],
    social: {
      email: 'c.boeckh@dantorahealth.com.au',
    },
  },
  {
    id: 'elena-marsh',
    name: 'Dr. Elena Marsh',
    role: 'Chief Radiologist (Body Scans)',
    department: 'Body Scans & Imaging',
    image: 'https://images.unsplash.com/photo-1594824813620-460d1da5d134?auto=format&fit=crop&w=800&q=80',
    experience: '14+ years',
    education: 'MBBS, FRANZCR - University of Melbourne',
    bio: 'Expert at reading ultra-precise MRI and CT scans to detect pain causes and structural concerns quickly and gently.',
    availability: 'Mon - Fri (8:00 AM - 6:00 PM)',
    specialties: ['Quiet MRI Scans', 'Low-Dose CT', 'Gentle Ultrasounds'],
    social: {
      email: 'e.marsh@dantorahealth.com.au',
    },
  },
  {
    id: 'adrian-kohl',
    name: 'Dr. Adrian Kohl',
    role: 'Head Doctor, Brain & Nerves',
    department: 'Brain & Nerve Health',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    experience: '18+ years',
    education: 'MBBS, FRACP - Monash University',
    bio: 'Assists patients with migraine alleviation, neurological evaluations, restorative sleep health, and mental sharpness.',
    availability: 'Tue - Sat (9:00 AM - 5:00 PM)',
    specialties: ['Headaches & Migraines', 'Memory & Focus', 'Good Sleep Health'],
    social: {
      email: 'a.kohl@dantorahealth.com.au',
    },
  },
  {
    id: 'sarah-chen',
    name: 'Dr. Sarah Chen',
    role: 'Lead Doctor, Heart Health',
    department: 'Heart Health',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    experience: '12+ years',
    education: 'MBBS, FRACP (Cardiology) - UNSW Sydney',
    bio: 'Specialises in cardiovascular diagnostics, blood vessel health, and sustained longevity for heart wellness.',
    availability: 'Mon - Wed, Fri (8:30 AM - 4:00 PM)',
    specialties: ['Heart Scans', 'Healthy Blood Pressure', 'Energy & Fitness'],
    social: {
      email: 's.chen@dantorahealth.com.au',
    },
  },
];

export const SERVICES: MedicalService[] = [
  {
    id: 'diagnostic-imaging',
    code: '01',
    title: 'Body Scans & Imaging',
    shortDesc: 'Quiet MRI and gentle CT scans that show your bones, brain, and muscles in sharp, clear detail.',
    fullDesc: 'Our quiet MRI and low-dose CT scanners give clear pictures fast. Our scan doctors review them right away so you get answers in hours, not weeks.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    category: 'imaging',
    features: ['Quiet MRI Scanner', 'Low Radiation CT', 'Gentle Ultrasound', 'Same-day doctor report'],
    turnaroundTime: 'Ready in 2-4 hours',
    preparation: ['Wear soft clothes without metal', 'Drink plain water', 'Relax — headphones provided'],
    recommendedFor: ['Headaches or back pain', 'Sports injury', 'Check body parts clearly'],
  },
  {
    id: 'health-checkups',
    code: '02',
    title: 'Full Body Check-ups',
    shortDesc: 'A complete look at your heart, blood, vitamins, and energy in one easy morning visit.',
    fullDesc: 'Get a clear full-body check with easy tests and a friendly doctor who sits with you to explain every number in simple words.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    category: 'checkups',
    features: ['Complete blood & vitamin check', 'Heart check (ECG)', 'Body energy review', 'Personal 1-on-1 doctor visit'],
    turnaroundTime: 'Ready next day',
    preparation: ['No food for 8 hours before', 'Drink water to stay hydrated', 'Takes about 1 hour'],
    recommendedFor: ['Yearly wellness check', 'Feeling tired or low energy', 'Peace of mind'],
  },
  {
    id: 'genetic-testing',
    code: '03',
    title: 'DNA & Genetics',
    shortDesc: 'A simple, painless cheek swab that helps you know your family health and choose what works for you.',
    fullDesc: 'Learn how your body is built using a quick swab. Discover what foods, sports, and medicines fit you best.',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    category: 'genetics',
    features: ['Simple painless cheek swab', 'Medicines match guide', 'Family health map', 'Clear talk with our DNA doctor'],
    turnaroundTime: 'Ready in 7-10 days',
    preparation: ['No food or drink 30 mins before swab', 'Takes 2 minutes', 'Completely painless'],
    recommendedFor: ['Family health history', 'Better medicine choices', 'Long healthy life plan'],
  },
  {
    id: 'laboratory',
    code: '04',
    title: 'Fast Blood & Lab Tests',
    shortDesc: 'Clean on-site lab tests for vitamins, sugar, cholesterol, and hormones with same-day answers.',
    fullDesc: 'Our fast on-site lab machines give accurate blood test results in just a few hours so you never have to wait anxiously.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    category: 'laboratory',
    features: ['Gentle butterfly needles', 'Vitamins & minerals check', 'Sugar & cholesterol levels', 'Results delivered securely to your email'],
    turnaroundTime: 'Ready in 2-4 hours',
    preparation: ['Morning fasting for sugar/fat tests', 'Drink plenty of water', 'Takes 5 minutes'],
    recommendedFor: ['Routine blood check', 'Checking energy levels', 'Vitamin D / Iron check'],
  },
  {
    id: 'specialist-care',
    code: '05',
    title: 'Friendly Doctor Visits',
    shortDesc: 'Unhurried visits with heart, brain, and wellness doctors who listen to you with care.',
    fullDesc: 'Talk directly to top doctors who take their time, answer every question you have, and help you feel better.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    category: 'specialist',
    features: ['Long, unhurried 45-minute visits', 'Zero waiting room delays', 'All tests under one roof', 'Direct doctor email follow-up'],
    turnaroundTime: 'Visits open this week',
    preparation: ['Write down your questions', 'Bring current medicine list', 'Feel free to bring a family member'],
    recommendedFor: ['Second opinion', 'Unexplained symptoms', 'Personal health plan'],
  },
];

export const CLINIC_LOCATIONS: ClinicLocation[] = [
  {
    id: 'sydney-central',
    name: 'Dantora Sydney Central Medical Campus',
    address: '187 Macquarie Street, Specialist Medical Precinct',
    city: 'Sydney NSW 2000, Australia',
    phone: '',
    whatsapp: '',
    email: 'sydney@dantorahealth.com.au',
    coordinates: {
      lat: -33.8688,
      lng: 151.2131,
    },
    hours: {
      weekdays: '07:30 - 19:30',
      saturday: '08:30 - 17:00',
      sunday: '09:00 - 15:00',
      emergency: 'Same-day urgent diagnostic reporting',
    },
    amenities: ['Underground Secure Parking', 'Private Quiet Recovery Suites', 'Botanical Wellness Lounge', 'Wheelchair Accessible Transit Ramp'],
    imagingWings: ['Suite 1 (3.0T Wide-Bore MRI)', 'Suite 2 (Spectral Low-Dose CT)', 'Suite 3 (High-Res Ultrasound)', 'Wing 4 (Genomic Sequencing Lab)'],
  },
  {
    id: 'melbourne-pavilion',
    name: 'Dantora Melbourne Health & Research Pavilion',
    address: '310 St Kilda Road, Biomedical Boulevard',
    city: 'Melbourne VIC 3004, Australia',
    phone: '',
    whatsapp: '',
    email: 'melbourne@dantorahealth.com.au',
    coordinates: {
      lat: -37.8228,
      lng: 144.9701,
    },
    hours: {
      weekdays: '08:00 - 19:00',
      saturday: '09:00 - 16:30',
      sunday: 'Closed',
      emergency: 'Priority Physician Consultation',
    },
    amenities: ['Genetics Consultation Suites', 'Pediatric Blood Draw Lounge', 'Direct Tram Stop Access (St Kilda Rd)', 'Herb Garden Atrium'],
    imagingWings: ['Next-Gen DNA Analysis Center', 'Biomarker Telemetry', 'Cardiac Echo Suite'],
  },
  {
    id: 'brisbane-diagnostic',
    name: 'Dantora Brisbane Diagnostic Centre',
    address: '55 Little Edward Street, Spring Hill Medical Quarter',
    city: 'Brisbane QLD 4000, Australia',
    phone: '',
    whatsapp: '',
    email: 'brisbane@dantorahealth.com.au',
    coordinates: {
      lat: -27.4616,
      lng: 153.0234,
    },
    hours: {
      weekdays: '07:30 - 18:30',
      saturday: '08:30 - 15:30',
      sunday: 'Closed',
      emergency: 'Rapid Triage Scan Service',
    },
    amenities: ['Ground Floor Step-Free Patient Access', 'Dedicated Specimen Drop-Off', 'Reserved Patient Car Bays', 'Quiet Herbal Tea Bar'],
    imagingWings: ['Quiet Open MRI Wing', 'Digital Low-Dose Radiography', 'Bone Density DEXA Suite'],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'plain-english-diagnostics',
    title: 'Rebuilding Trust: Why Plain-English Diagnostics Must Replace Medical Jargon',
    category: 'Healthcare Sector & Policy',
    author: {
      name: 'Dr. Elena Marsh',
      role: 'Chief Radiologist & Health Communication Advocate',
      avatar: 'https://images.unsplash.com/photo-1594824813620-460d1da5d134?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'September 2, 2026',
    readTime: '4 min read',
    excerpt: 'Over 68% of hospital patients leave radiology appointments unable to understand their report. Here is how translating medical terminology into human language reduces patient anxiety and improves clinical compliance.',
    content: [
      'In traditional hospital systems across Australia and globally, radiology reports are written for billing algorithms and other doctors—rarely for the human whose body was just scanned. Phrases like "mild hyperintensity" or "incidental unspecific attenuation" sound terrifying to patients who then spend hours spiraling on online search engines.',
      'At Dantora Health, our radiologist team instituted a radical change: every scan produces a two-part report. Part one is a comprehensive technical document for referring specialists, and part two is an illustrated, plain-English summary addressing three direct questions: "What was seen?", "What does this mean for your daily health?", and "What are the recommended next steps?".',
      'The results have been transformative. Our post-scan follow-up data shows a 42% decrease in unnecessary emergency room visits caused by health anxiety, and a 38% increase in proactive lifestyle interventions. When patients understand their health, they become empowered partners in their healing rather than passive, anxious bystanders.'
    ],
    keySectorTakeaways: [
      'Standardize patient-friendly executive summaries on every diagnostic scan and blood panel.',
      'Train medical students in empathetic, jargon-free health communication alongside clinical diagnosis.',
      'Eliminate the anxiety gap: patients should receive clear explanations within hours, not weeks of waiting.'
    ],
    tags: ['Patient Literacy', 'Radiology Reform', 'Empathetic Care', 'Healthcare Policy']
  },
  {
    id: 'ending-six-week-wait',
    title: 'Ending the 6-Week Wait: Why Australia Needs Integrated Scan-and-Consult Clinics',
    category: 'Healthcare Sector & Policy',
    author: {
      name: 'Dr. Adrian Kohl',
      role: 'Neurologist & Health Systems Strategist',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'August 24, 2026',
    readTime: '5 min read',
    excerpt: 'The fragmented referral chain between GP, imaging facility, and specialist clinic wastes valuable months. How single-roof clinical hubs can relieve pressure on public hospitals and accelerate diagnoses.',
    content: [
      'Consider the typical journey of an Australian with persistent migraines or joint swelling: Week 1 brings a GP consultation, followed by a 2-week wait for an MRI booking across town. Then another 2 weeks wait for the report to reach the GP, followed by a referral to an external neurologist who might not have an opening for 2 months.',
      'This fragmented conveyor belt is not just frustrating; for progressive conditions, neurological disorders, and cardiovascular issues, delayed diagnosis can irreversibly impact quality of life.',
      'By co-locating high-throughput imaging (3.0T MRI, low-dose spectral CT) with sub-specialist consult suites under one unified roof, we eliminate weeks of administrative friction. A patient walks in at 9:00 AM for their scan, relaxes in a peaceful recovery lounge with herbal tea, and reviews their reconstructed scans directly with a specialist neurologist by 11:30 AM.',
      'Modernizing our healthcare sectors requires breaking down bureaucratic silos between diagnostic radiology and frontline clinical consulting.'
    ],
    keySectorTakeaways: [
      'Co-locate primary diagnostics and specialist consultations to compress care cycles from months to single days.',
      'Incentivize regional diagnostic hubs to alleviate pressure on tertiary public hospital emergency wards.',
      'Adopt digital, asynchronous clinician collaboration where radiologists and attending doctors review live imaging together.'
    ],
    tags: ['Hospital Efficiency', 'Systemic Reform', 'Integrated Care', 'Neurology']
  },
  {
    id: 'preventive-genomics-australia',
    title: 'Preventive Genomics in Australia: Moving From Crisis Care to Proactive Longevity',
    category: 'Preventive Medicine',
    author: {
      name: 'Dr. Carter Boeckh',
      role: 'Lead Doctor, Genetics & Wellness',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'August 11, 2026',
    readTime: '6 min read',
    excerpt: 'Australia spends over 90% of its healthcare budget treating acute diseases once symptoms appear, and less than 3% preventing them. How genetic medicine can reshape long-term public health.',
    content: [
      'Healthcare has historically functioned as a repair shop: you wait until something breaks down, then rush in for emergency intervention. But our genes hold vital maps of vulnerability that reveal cardiovascular risks, pharmacogenomic drug responses, and metabolic tendencies decades before symptoms manifest.',
      'A simple, non-invasive cheek swab can tell us whether a common blood pressure drug or cholesterol statin will metabolize properly in your system, or if an alternative medication is required to avoid adverse reactions. Pharmacogenomics alone could prevent tens of thousands of adverse drug reactions across Australian hospitals each year.',
      'Investing in routine genomic health checks empowers citizens to make proactive dietary, fitness, and lifestyle adjustments that keep them out of chronic disease wards in their 60s and 70s. Bettering the healthcare sector means financing early prevention rather than solely subsidizing late-stage disease management.'
    ],
    keySectorTakeaways: [
      'Incorporate pharmacogenomic profiling into standard prescription protocols to reduce medication complications.',
      'Rebalance national health expenditure towards preventative genetic diagnostics and lifestyle interventions.',
      'Ensure strict patient ownership and cryptographic privacy protections over all personal genomic health data.'
    ],
    tags: ['Genomics', 'Pharmacogenomics', 'Preventative Care', 'Longevity']
  },
  {
    id: 'human-first-hospital-design',
    title: 'The Human-First Hospital: What Patient Experiences Teach Us About Healing Environments',
    category: 'Patient Experience',
    author: {
      name: 'Dr. Sarah Chen',
      role: 'Lead Cardiologist & Clinical Environment Director',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'July 29, 2026',
    readTime: '4 min read',
    excerpt: 'Harsh fluorescent lighting, cold stainless steel, and labyrinthine corridors heighten cortisol and blood pressure. Why thoughtful biophilic architecture is a medical necessity, not a luxury.',
    content: [
      'When patients enter a clinic with heart palpitations or shortness of breath, the very environment they step into can either calm their nervous system or spike their sympathetic stress response. Traditional hospital architecture was designed around janitorial maintenance rather than human biology.',
      'Scientific studies on healing environments demonstrate that natural circadian lighting, acoustic baffling, living indoor foliage, and private check-in spaces measurably lower systolic blood pressure and heart rate variability within minutes of patient arrival.',
      'At our Macquarie Street and St Kilda Road facilities, we replaced harsh intercom buzzers with ambient acoustic soundscapes, installed natural timber surfaces, and built open-air garden corridors. Bettering the health sector begins with recognizing that architecture itself is medicine.'
    ],
    keySectorTakeaways: [
      'Design clinical waiting areas as tranquil, biophilic spaces that actively reduce patient sympathetic arousal.',
      'Replace acoustic alarms and loud intercom announcements with discrete, secure digital notifications.',
      'Prioritize patient privacy, natural daylighting, and unhurried consultation acoustics.'
    ],
    tags: ['Biophilic Design', 'Patient Wellbeing', 'Hospital Architecture', 'Cardiology']
  },
  {
    id: 'bridging-regional-healthcare-gaps',
    title: 'Bridging Regional Healthcare Gaps: Email-First Triage and Rapid Diagnostic Telemetry',
    category: 'Medical Innovation',
    author: {
      name: 'Dr. Carter Boeckh',
      role: 'Lead Doctor, Genetics & Wellness',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'July 14, 2026',
    readTime: '5 min read',
    excerpt: 'Rural and regional Australians often travel hundreds of kilometers for a 15-minute consultation. How secure, email-driven clinical intake and remote digital triage are closing the urban-regional health divide.',
    content: [
      'In a country as geographically vast as Australia, healthcare equity remains one of our most urgent systemic challenges. Regional and remote communities face severe shortages of sub-specialists in neurology, medical genetics, and advanced radiology.',
      'Rather than requiring regional patients to make exhausting 6-hour drives merely to ask preliminary questions or check eligibility for advanced scans, a structured email-first triage system allows patients to securely submit their symptoms, medical history, and prior lab notes directly to our senior medical team.',
      'Our clinical team reviews these inquiries with a 24-hour turnaround, providing clear written advice, ordering preparatory blood work at local regional labs, and scheduling visits so that when patients do travel to the city, their tests, imaging, and specialist consultations occur in a single coordinated morning.',
      'Digital communication isn\'t about replacing doctors—it\'s about extending expert clinical care to every corner of our nation.'
    ],
    keySectorTakeaways: [
      'Adopt structured email-first clinical triage to give regional patients direct access to specialist guidance.',
      'Pre-coordinate diagnostics before patient travel to eliminate multiple costly interstate or inter-regional trips.',
      'Foster open digital dialogue between metropolitan specialists and regional general practitioners.'
    ],
    tags: ['Regional Health', 'Telehealth', 'Healthcare Equity', 'Digital Triage']
  }
];

export const SYMPTOM_GUIDES: SymptomGuide[] = [
  {
    symptom: 'Feeling Tired or Low Energy',
    description: 'Feeling run down, brain fog, or not sleeping well at night.',
    suggestedDepartment: 'Lab Tests & Wellness',
    suggestedDoctorId: 'carter-boeckh',
    urgency: 'routine',
  },
  {
    symptom: 'Chest Flutter or Fast Heartbeat',
    description: 'Heart beating fast, shortness of breath, or family heart worries.',
    suggestedDepartment: 'Heart Health',
    suggestedDoctorId: 'sarah-chen',
    urgency: 'priority',
  },
  {
    symptom: 'Bad Headaches or Dizziness',
    description: 'Frequent headaches, neck tension, or feeling dizzy during the day.',
    suggestedDepartment: 'Brain & Nerve Health',
    suggestedDoctorId: 'adrian-kohl',
    urgency: 'priority',
  },
  {
    symptom: 'Back, Knee, or Muscle Pain',
    description: 'Aching back, sore joints, sports bump, or stiff muscles.',
    suggestedDepartment: 'Body Scans & Imaging',
    suggestedDoctorId: 'elena-marsh',
    urgency: 'routine',
  },
  {
    symptom: 'Family Health & DNA Check',
    description: 'Learn what health patterns run in your family so you can stay healthy.',
    suggestedDepartment: 'Genetics & DNA',
    suggestedDoctorId: 'carter-boeckh',
    urgency: 'routine',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Test Results',
    question: 'How quickly do I get my test results?',
    answer: 'Most blood tests are ready in 2 to 4 hours on the same day. Body scans like MRI and CT are read by our Australian board-certified radiologists within 4 hours, and we deliver a plain-English summary securely to your verified email.',
  },
  {
    category: 'DNA & Swabs',
    question: 'Does the DNA cheek swab hurt?',
    answer: 'Not at all! It is a soft cotton swab rubbed gently inside your cheek for 10 seconds. It is completely painless and safe for all ages.',
  },
  {
    category: 'Booking & Medical Referrals',
    question: 'Do I need a GP referral to request an appointment?',
    answer: 'You do not need a formal referral to initiate an email inquiry or schedule our wellness check-ups. For specialized diagnostic scans, you can submit your details by email and our clinical team will guide you on clinical referral requirements.',
  },
  {
    category: 'Comfort & Scanners',
    question: 'What if I feel nervous inside an MRI scanner?',
    answer: 'Our wide-bore MRI suite is quiet, open, and relaxing. We give you comfortable headphones to play your preferred music, and you can communicate with the technician and doctor throughout your scan.',
  },
  {
    category: 'Strictly Email Contact',
    question: 'Why does Dantora Health prioritize strictly email communication?',
    answer: 'Email ensures that every patient inquiry is documented accurately, reviewed by licensed clinical staff, and handled with meticulous medical privacy without phone wait times or missed calls.',
  },
];

