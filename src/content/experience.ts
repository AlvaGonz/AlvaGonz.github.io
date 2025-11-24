export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string | string[];
  skills?: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: 'qudif',
    role: 'IT Support',
    company: 'QUDIF',
    period: 'Jan 2022 - Apr 2024',
    description: [
      'Provided technical support, diagnostics, and incident resolution related to hardware, software, and networks for users.',
      'Trained users on the proper use of the software.',
      'Assisted with database tasks as required.',
    ],
    skills: ['Technical Support', 'Network Administration', 'Database Management', 'User Training'],
  },
  {
    id: 'gritvap',
    role: 'QA Analyst',
    company: 'Gritvap',
    period: 'May 2021 - Jan 2022',
    description: [
      'Collaborated with the development team to resolve issues and improve product quality.',
      'Identified, documented, and reported errors and defects found during testing.',
      'Contributed to database troubleshooting and resolution.',
    ],
    skills: ['Quality Assurance', 'Bug Tracking', 'Database Testing', 'Agile Collaboration'],
  },
];
