export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  period: string;
  skills?: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills?: string[];
  url: string;
}

export interface OrganizationItem {
  id: string;
  name: string;
  role?: string; // LinkedIn text doesn't specify role explicitly, just dates, but implies membership/service
  period: string;
}

export const education: EducationItem[] = [
  {
    id: 'uce',
    school: 'Universidad Central del Este - UCE',
    degree: "Engineer's degree, Computer Software Engineering",
    period: '2020 - 2026',
    skills: ['React.js', 'Software Development'],
  },
  {
    id: 'santa-rosa',
    school: 'Santa Rosa de Lima',
    degree: "Bachelor's degree, General Studies",
    period: 'Sep 2009 - Oct 2020',
    skills: ['Trabajo en equipo', 'Aprendizaje Adaptativo'],
  },
];

export const certifications: CertificationItem[] = [
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    issuer: 'Google',
    date: 'Issued Nov 2025', //DUMMY DATA
    skills: ['Google Analytics', 'Data Analysis'],//DUMMY DATA
    url: 'https://skillshop.credential.net/ac112d6e-7fe9-412c-9878-c10538e5f9fd?record_view=true',
  },
  {
    id: 'csharp-inter',
    name: 'C# Intermediate',
    issuer: 'Sololearn',
    date: 'Issued Nov 2025',
    skills: ['C#', 'OOP', 'Data Structures', 'Programming', 'Problem Solving', 'Problem Analysis'],
    url: 'https://www.sololearn.com/certificates/CC-PXX51NLR',
  },
  {
    id: 'qa-fcc',
    name: 'Quality Assurance',
    issuer: 'freeCodeCamp',
    date: 'Issued Oct 2025',
    credentialId: 'alvagonz-qa',
    skills: [
      'Software Testing',
      'HTML5',
      'Automated Software Testing',
      'Manual Testing',
      'GitHub',
      'Functional Testing',
      'JS',
      'QA',
      'CSS',
    ],
    url: 'https://freecodecamp.org/certification/alvagonz/quality-assurance-v7',
  },
  {
    id: 'js-inter',
    name: 'JavaScript Intermediate',
    issuer: 'Sololearn',
    date: 'Issued Mar 2023',
    skills: ['JavaScript'],
    url: 'https://www.sololearn.com/certificates/CC-3MPZ0IMT',
  },
  {
    id: 'html',
    name: 'HTML',
    issuer: 'Sololearn',
    date: 'Issued Feb 2023',
    skills: ['HTML5'],
    url: 'https://www.sololearn.com/certificates/CT-EBLXYRE7',
  },
  {
    id: 'css',
    name: 'Introduction to CSS',
    issuer: 'Sololearn',
    date: 'Issued Feb 2023',
    skills: ['Cascading Style Sheets (CSS)'],
    url: 'https://www.sololearn.com/certificates/CC-J2BB43FF',
  },
  {
    id: 'remote-work',
    name: 'Remote Work and Virtual Collaboration Professional Certificate - RWVCPC',
    issuer: 'Certiprof',
    date: 'Issued Jul 2021 · Expired Jul 2023',
    credentialId: '66326051',
    url: 'https://www.credly.com/badges/dbdc9b12-6c74-4e9d-acc9-6c1ae0b0461c?source=linked_in_profile',
  },
];

export const organizations: OrganizationItem[] = [
  {
    id: 'asamblea',
    name: 'Asamblea de Dios Central La Romana',
    period: 'Jan 2011 - Present',
  },
];
