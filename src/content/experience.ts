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
    role: 'TI Support',
    company: 'QUDIF',
    period: 'Jan 2022 - Apr 2024',
    description: '-Brinde soporte técnico, diagnostico y resolución de incidentes relacionados con hardware, software y redes para usuarios.\n-Capacite a usuarios en el uso adecuado del programa.\n-Asistí en momentos requeridos dentro de la DB.',
    skills: ['Databases', 'Trabajo en equipo', 'Support', 'Hardware/Software'],
  },
  {
    id: 'gritvap',
    role: 'QA Analyst',
    company: 'Gritvap',
    period: 'May 2021 - Jan 2022',
    description: '-Colabore con el equipo de desarrollo para resolver problemas y mejorar la calidad del producto.\n-Identificar, documentar y reportar errores y defectos encontrados durante las pruebas.\n-Contribuí en la resolución de problemas en las DB.',
    skills: ['Databases', 'Trabajo en equipo', 'QA', 'Bug Tracking'],
  },
];
