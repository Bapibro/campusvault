export type Resource = {
  id: string;
  title: string;
  subject: string;
  semester: string;
  price: string;
  badge: string;
  preview: string;
};

export const subjectCategories = [
  'Engineering Chemistry',
  'Engineering Physics',
  'Engineering Mathematics 1',
  'Engineering Mathematics 2',
  'Engineering Graphics',
  'Communication and Management Skills',
  'Basic Civil and Mechanical Engineering',
  'Data Structures',
  'Environmental Engineering',
];

export const resources: Resource[] = [
  {
    id: 'r1',
    title: 'Engineering Chemistry Unit 1 Notes',
    subject: 'Engineering Chemistry',
    semester: 'Sem 1',
    price: '₹149',
    badge: 'Handwritten',
    preview: 'Clear unit-wise theory notes, formulas, and solved examples for Sem 1.',
  },
  {
    id: 'r2',
    title: 'Physics PYQ Bundle',
    subject: 'Engineering Physics',
    semester: 'Sem 1',
    price: '₹179',
    badge: 'PYQ',
    preview: 'Past year physics questions curated with answer hints and exam focus.',
  },
  {
    id: 'r3',
    title: 'Engg Maths 1 Important Questions',
    subject: 'Engineering Mathematics 1',
    semester: 'Sem 1',
    price: '₹129',
    badge: 'Important',
    preview: 'Unit-wise question bank for limits, derivatives, and matrix fundamentals.',
  },
  {
    id: 'r4',
    title: 'Engg Maths 2 Crash Notes',
    subject: 'Engineering Mathematics 2',
    semester: 'Sem 2',
    price: '₹139',
    badge: 'Crash Notes',
    preview: 'Fast revision notes for integrals, series, and differential equations.',
  },
  {
    id: 'r5',
    title: 'Engineering Graphics Important Drawings',
    subject: 'Engineering Graphics',
    semester: 'Sem 1',
    price: '₹169',
    badge: 'Premium',
    preview: 'High-quality drawing notes, projection examples, and practice sketches.',
  },
  {
    id: 'r6',
    title: 'CMS Question Bank',
    subject: 'Communication and Management Skills',
    semester: 'Sem 1',
    price: '₹119',
    badge: 'Question Bank',
    preview: 'Communication practice questions, report writing, and soft skills examples.',
  },
  {
    id: 'r7',
    title: 'BCME Crash Notes',
    subject: 'Basic Civil and Mechanical Engineering',
    semester: 'Sem 2',
    price: '₹159',
    badge: 'Crash Notes',
    preview: 'Straight-to-the-point notes for statics, materials, and construction basics.',
  },
  {
    id: 'r8',
    title: 'Data Structures Important Programs',
    subject: 'Data Structures',
    semester: 'Sem 2',
    price: '₹189',
    badge: 'Code Pack',
    preview: 'Handpicked program examples with explanations for stacks, queues, and trees.',
  },
  {
    id: 'r9',
    title: 'Environmental Engineering Practical Files',
    subject: 'Environmental Engineering',
    semester: 'Sem 2',
    price: '₹199',
    badge: 'Practical',
    preview: 'Complete practical file set with experiment details and sample observations.',
  },
  {
    id: 'r10',
    title: 'Chemistry Lab Manual + Record',
    subject: 'Engineering Chemistry',
    semester: 'Sem 1',
    price: '₹239',
    badge: 'Lab Manual',
    preview: 'Formatted lab report with observations, calculations, and conclusion sections.',
  },
];

export const pricingPlans = [
  {
    title: 'Semester Starter',
    price: '₹249/mo',
    description: 'Essential notes and PYQ bundles for first-year engineering students.',
    features: ['Engineering Chemistry notes', 'Physics PYQ pack', 'Maths quick review'],
  },
  {
    title: 'Semester Pro',
    price: '₹399/mo',
    description: 'Best for first-year students preparing for exams and lab sessions.',
    features: ['Full semester resources', 'Handwritten notes', 'Practical file support'],
    featured: true,
  },
  {
    title: 'Campus Elite',
    price: '₹549/mo',
    description: 'Premium college pack with custom manual requests and placement prep.',
    features: ['Custom lab records', 'CMS question bank', 'Fast admin support'],
  },
];
