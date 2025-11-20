export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  skills?: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: 'qudif',
    role: 'QA Analyst',
    company: 'Q.U.D.I.F',
    period: 'Jan 2022 - Present',
    description: 'Leading quality assurance initiatives for enterprise software development. Responsible for designing comprehensive test plans, executing manual and automated test cases, and ensuring bug-free releases. Collaborating closely with developers to resolve critical issues and improve overall system stability.',
    skills: ['Quality Assurance', 'Manual Testing', 'Bug Tracking', 'SQL', 'Agile Methodologies'],
  },
  {
    id: 'gritvap',
    role: 'QA Analyst',
    company: 'Gritvap',
    period: 'Feb 2021 - Jan 2022',
    description: 'Conducted rigorous testing of new software features, identifying and documenting defects to ensure product quality. Participated in the full software development lifecycle (SDLC), from requirement analysis to deployment, ensuring compliance with functional specifications.',
    skills: ['Functional Testing', 'Regression Testing', 'Team Collaboration', 'Documentation'],
  },
];
