export const CLINIC_INFO = {
  name: "Dr. Siulik's Dental Care",
  doctorName: "Dr. Siulik Bandyopadhyay",
  title: "Chief Dental Surgeon",
  tagline: "A Healthier Smile. A More Confident You.",
  subheadline: "Advanced, personalized dental care designed around your comfort, confidence, and long-term oral health.",
  address: "Near Chandaka Police Station, Bhubaneswar, Chandaka, Odisha 754012",
  phonePrimary: "+91 99386 74499",
  phoneClean: "+919938674499",
  email: "info@drsiulikdental.com",
  whatsappNumber: "919938674499",
  workingHours: [
    { days: "Monday – Sunday", time: "09:00 AM – 01:00 PM & 04:00 PM – 08:30 PM" }
  ],
  googleMapsUrl: "https://maps.google.com/?q=Dr+Siulik+Dental+Care+Near+Chandaka+Police+Station+Bhubaneswar+Odisha+754012",
};

export const CONSULTATION_TIME_SLOTS = [
  { id: 'slot-1', time: '09:00 AM – 10:20 AM', period: 'Morning' },
  { id: 'slot-2', time: '10:20 AM – 11:40 AM', period: 'Morning' },
  { id: 'slot-3', time: '11:40 AM – 01:00 PM', period: 'Morning' },
  { id: 'slot-4', time: '04:00 PM – 05:30 PM', period: 'Evening' },
  { id: 'slot-5', time: '05:30 PM – 07:00 PM', period: 'Evening' },
  { id: 'slot-6', time: '07:00 PM – 08:30 PM', period: 'Evening' },
];

export const SERVICES_DATA = [
  {
    id: "preventive",
    title: "Preventive Dentistry",
    tagline: "Protecting your natural teeth for a lifetime",
    description: "Proactive care aimed at early detection, oral disease prevention, and maintaining optimal gum and tooth health.",
    treatments: [
      { name: "Dental Check-ups", desc: "Comprehensive digital examination and diagnostic assessment." },
      { name: "Scaling & Polishing", desc: "Thorough removal of tartar and surface plaque." },
      { name: "Oral Hygiene Care", desc: "Personalized home maintenance instruction." },
      { name: "Fluoride Treatment", desc: "Targeted mineral application for enamel protection." },
    ],
  },
  {
    id: "restorative",
    title: "Restorative Dentistry",
    tagline: "Restoring strength, function and natural aesthetics",
    description: "Advanced restorative procedures to repair decayed, damaged, or fractured teeth seamlessly.",
    treatments: [
      { name: "Tooth-coloured Fillings", desc: "Shade-matched biocompatible composite resins." },
      { name: "Root Canal Treatment", desc: "Precision endodontic care preserving natural teeth." },
      { name: "Crowns & Bridges", desc: "Durable ceramic and zirconia restorations." },
      { name: "Dentures", desc: "Custom-fitted complete and partial appliances." },
    ],
  },
  {
    id: "surgical",
    title: "Surgical Dentistry",
    tagline: "Safe, precise surgical interventions with gentle care",
    description: "Specialized oral surgical procedures performed under meticulous clinical safety protocols.",
    treatments: [
      { name: "Simple Extractions", desc: "Gentle removal of non-restorable teeth." },
      { name: "Surgical Extractions", desc: "Careful removal of complex root structures." },
      { name: "Wisdom Tooth Treatment", desc: "Targeted management of impacted molars." },
      { name: "Gum Surgery", desc: "Periodontal pocket therapy and contouring." },
    ],
  },
  {
    id: "cosmetic",
    title: "Smile & Cosmetic Dentistry",
    tagline: "Enhancing the natural beauty of your smile",
    description: "Aesthetic dental solutions tailored to your unique facial features and smile goals.",
    treatments: [
      { name: "Smile Makeover", desc: "Harmonized aesthetic treatment planning." },
      { name: "Veneers / Laminates", desc: "Thin porcelain restorations for tooth shape and tone." },
      { name: "Teeth Whitening", desc: "Clinical shade lightening and stain removal." },
      { name: "Aesthetic Restorations", desc: "Direct composite contouring and bonding." },
    ],
  },
  {
    id: "orthodontics",
    title: "Orthodontics",
    tagline: "Aligning teeth for optimal function and confidence",
    description: "Modern orthodontic alignment solutions for patients of all ages.",
    treatments: [
      { name: "Braces", desc: "Ceramic and metallic orthodontic brackets." },
      { name: "Clear Aligners", desc: "Discreet transparent alignment trays." },
      { name: "Orthodontic Consultation", desc: "3D bite assessment and alignment planning." },
    ],
  },
  {
    id: "implants",
    title: "Implant Dentistry",
    tagline: "Permanent, natural-feeling tooth replacement",
    description: "State-of-the-art dental implant techniques replacing missing teeth from root to crown.",
    treatments: [
      { name: "Dental Implants", desc: "Biocompatible titanium implants integrating with bone." },
      { name: "Implant-supported Restorations", desc: "Implant-supported crowns, bridges, and arches." },
      { name: "Implant Treatment Planning", desc: "Digital 3D surgical planning for predictable results." },
    ],
  },
  {
    id: "child",
    title: "Child Dentistry",
    tagline: "Gentle dental care built on trust for young smiles",
    description: "Pediatric dental care focused on building positive early experiences and healthy habits.",
    treatments: [
      { name: "Dental Check-ups", desc: "Friendly oral health checks for growing children." },
      { name: "Preventive Care", desc: "Pit and fissure sealants and cavity defense." },
      { name: "Child-friendly Treatment", desc: "Patient, gentle care in a stress-free setting." },
    ],
  },
];

export const TECHNOLOGY_ITEMS = [
  {
    title: "Digital X-Rays & Imaging",
    tag: "Low Radiation Precision",
    description: "Instant high-definition diagnostic imaging with minimal radiation exposure.",
  },
  {
    title: "Digital Intraoral Scanning",
    tag: "Impression-Free Comfort",
    description: "Fast, accurate 3D digital impressions without uncomfortable trays.",
  },
  {
    title: "Advanced Endodontic Systems",
    tag: "Preservation Focus",
    description: "Precision rotary instrumentation and apex locators for predictable root canal care.",
  },
  {
    title: "Laser Dentistry Tools",
    tag: "Soft Tissue Precision",
    description: "Minimally invasive soft-tissue contouring with accelerated healing.",
  },
  {
    title: "Modern Implant Equipment",
    tag: "Surgical Accuracy",
    description: "Guided surgical instrumentation engineered for precision and longevity.",
  },
  {
    title: "Multi-Class Sterilization Protocols",
    tag: "Strict Infection Control",
    description: "Hospital-grade Class B autoclaves and multi-stage disinfection for patient safety.",
  },
];

export const BEFORE_AFTER_DATA = [
  {
    id: "smile-makeover",
    category: "Smile Makeover",
    tag: "Aesthetic Bonding",
    title: "Midline Diastema Closure",
    description: "Non-invasive direct composite bonding closing anterior midline gap with natural anatomical contours.",
    beforeLabel: "Diastema Gap (Pre-Op)",
    afterLabel: "Closed Diastema (Post-Op)",
    beforeImage: "/assets/before-after/diastema-before.webp",
    afterImage: "/assets/before-after/diastema-after.webp",
    isAuthentic: true,
  },
  {
    id: "restorative",
    category: "Restorative Dentistry",
    tag: "Composite Restoration",
    title: "Direct Composite Cavity Restoration",
    description: "Conservative removal of deep carious lesion and anatomical restoration of posterior tooth structure.",
    beforeLabel: "Active Caries (Pre-Op)",
    afterLabel: "Restored Tooth (Post-Op)",
    beforeImage: "/assets/before-after/restorative-before.webp",
    afterImage: "/assets/before-after/restorative-after.webp",
    isAuthentic: true,
  },
  {
    id: "aesthetic-restoration",
    category: "Aesthetic Restoration",
    tag: "Occlusal Reconstruction",
    title: "Occlusal Anatomy Reconstruction",
    description: "Conservative restoration of stained grooves and compromised fissure morphology with durable aesthetic resin.",
    beforeLabel: "Stained Fissures (Pre-Op)",
    afterLabel: "Sculpted Anatomy (Post-Op)",
    beforeImage: "/assets/before-after/occlusal-before.webp",
    afterImage: "/assets/before-after/occlusal-after.webp",
    isAuthentic: true,
  },
  {
    id: "prophylaxis",
    category: "Preventive Care",
    tag: "Ultrasonic Prophylaxis",
    title: "Deep Scaling & Stain Removal",
    description: "Ultrasonic prophylaxis removing heavy extrinsic stains, calculus, and promoting healthy gingiva.",
    beforeLabel: "Extrinsic Staining (Pre-Op)",
    afterLabel: "Polished Enamel (Post-Op)",
    beforeImage: "/assets/before-after/scaling-before.webp",
    afterImage: "/assets/before-after/scaling-after.webp",
    isAuthentic: true,
  },
];

export const GOOGLE_REVIEWS = [
  {
    id: "gr1",
    author: "Rohan Mukherjee",
    rating: 5,
    date: "2 months ago",
    text: "Dr. Siulik is an exceptional dental surgeon. She takes the time to explain every detail before starting treatment. Very hygienic clinic with state-of-the-art equipment.",
  },
  {
    id: "gr2",
    author: "Ananya Sen",
    rating: 5,
    date: "3 months ago",
    text: "Highly recommended for anyone who feels anxious about dental visits! The staff and doctor are extremely soft-spoken and professional.",
  },
  {
    id: "gr3",
    author: "Siddharth Banerjee",
    rating: 5,
    date: "1 month ago",
    text: "Got my crown done here. Perfectly fitted on the very first try. Pristine cleanliness and very reasonable clinical guidance.",
  },
];

export const CERTIFICATES_DATA = [
  {
    id: "c-implant",
    title: "Implant Dentistry — 6 Days 6 Implants Clinical Workshop",
    issuer: "International Academy of Excellence in Clinical Dentistry (IAECD)",
    year: "2025",
    image: "/assets/awards/certificates/implant-dentistry.webp",
  },
  {
    id: "c1",
    title: "Advanced Endodontics & Clinical Protocols",
    issuer: "Indian Dental Association (IDA) Odisha State Branch",
    year: "2024",
    image: "/assets/awards/certificates/image copy.webp",
  },
  {
    id: "c2",
    title: "Occlusion Driven Dentistry",
    issuer: "Indian Dental Association (IDA) Odisha State Branch",
    year: "2024",
    image: "/assets/awards/certificates/image copy 2.webp",
  },
  {
    id: "c3",
    title: "Fundamentals of Oral Surgery Course",
    issuer: "Odisha Dental Academy",
    year: "2023",
    image: "/assets/awards/certificates/image copy 3.webp",
  },
  {
    id: "c4",
    title: "Aesthetic & Cosmetic Dentistry",
    issuer: "Coltene Dental Education",
    year: "2023",
    image: "/assets/awards/certificates/image copy 4.webp",
  },
  {
    id: "c5",
    title: "Laser Dentistry: Principles, Protocols & Clinical Applications",
    issuer: "Continuing Dental Education",
    year: "2023",
    image: "/assets/awards/certificates/image copy 5.webp",
  },
  {
    id: "c6",
    title: "Mastering the Sinus — Clinical Hands-On",
    issuer: "Dentium Academy",
    year: "2022",
    image: "/assets/awards/certificates/image.webp",
  },
];

export const CLINIC_GALLERY = [
  {
    id: "g1",
    title: "Welcoming Reception & Patient Lounge",
    category: "Reception",
    image: "/assets/clinic/reception/image.webp",
    aspect: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    id: "g2",
    title: "Clinical Operatory Suite in Action",
    category: "Treatment",
    image: "/assets/clinic/treatment-rooms/image.webp",
    aspect: "col-span-1 row-span-1",
  },
  {
    id: "g3",
    title: "High-Precision Dental Operatory & Diagnostics",
    category: "Equipment",
    image: "/assets/clinic/equipment/image.webp",
    aspect: "col-span-1 row-span-1",
  },
  {
    id: "g4",
    title: "Clinical Consultation Suite",
    category: "Interior",
    image: "/assets/clinic/interior/image.webp",
    aspect: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    id: "g5",
    title: "Advanced Dental Treatment Procedure",
    category: "Treatment",
    image: "/assets/clinic/treatment-rooms/image copy.webp",
    aspect: "col-span-1 row-span-1",
  },
  {
    id: "g6",
    title: "Sterilized Operatory Chair Setup",
    category: "Equipment",
    image: "/assets/clinic/equipment/image copy.webp",
    aspect: "col-span-1 row-span-1",
  },
  {
    id: "g7",
    title: "Modern Dental Treatment Suite",
    category: "Treatment",
    image: "/assets/clinic/treatment-rooms/image2.webp",
    aspect: "col-span-1 row-span-1",
  },
];

export const FAQ_DATA = [
  {
    question: "How do I schedule an appointment at Dr. Siulik's Dental Care?",
    answer: "You can easily select your preferred date, time, and required treatment using our online consultation form, or connect directly on WhatsApp at +91 99386 74499.",
  },
  {
    question: "What safety and sterilization measures are followed at the clinic?",
    answer: "We strictly implement hospital-grade multi-stage sterilization using Class B autoclaves, disposable surgical consumables, and rigorous chemical disinfection for every patient interaction.",
  },
  {
    question: "Is dental treatment comfortable for patients who feel anxious?",
    answer: "Yes. Our team prioritizes patient comfort at every step. We maintain a calm atmosphere, communicate clearly before every step, and use gentle technique tailored to your comfort.",
  },
  {
    question: "What should I bring for my first consultation?",
    answer: "Please bring any previous dental X-rays, relevant medical history details, and a list of current medications if applicable.",
  },
  {
    question: "Do you offer emergency dental consultations?",
    answer: "Yes, we prioritize urgent dental issues such as severe tooth discomfort or dental trauma. Please contact our main phone line directly for prompt scheduling.",
  },
];
