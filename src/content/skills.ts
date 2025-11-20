import type { Skill } from './types';

export const skills: Skill[] = [
  // Languages
  { name: 'JavaScript', category: 'language', iconId: 'js' },
  { name: 'C#', category: 'language', iconId: 'cs' },
  { name: 'SQL', category: 'language', iconId: 'mysql' }, // Generic SQL often maps to a specific DB or just doesn't have one, using mysql/postgres usually works visually or omitting
  { name: 'HTML', category: 'language', iconId: 'html' },
  { name: 'CSS', category: 'language', iconId: 'css' },
  { name: 'TypeScript', category: 'language', iconId: 'ts' },
  
  // Frameworks & Libraries
  { name: 'React', category: 'framework', iconId: 'react' },
  { name: 'Node.js', category: 'framework', iconId: 'nodejs' },
  { name: 'ASP.NET', category: 'framework', iconId: 'dotnet' },
  
  // Tools & Platforms
  { name: 'Git', category: 'tool', iconId: 'git' },
  { name: 'GitHub', category: 'tool', iconId: 'github' },
  { name: 'Docker', category: 'tool', iconId: 'docker' },
  { name: 'Visual Studio Code', category: 'tool', iconId: 'vscode' },
  { name: 'Figma', category: 'tool', iconId: 'figma' },
  
  // Databases
  { name: 'MySQL', category: 'database', iconId: 'mysql' },
  { name: 'MongoDB', category: 'database', iconId: 'mongodb' },
  { name: 'SQL Server', category: 'database', iconId: 'azure' }, // SQL Server often associated with Azure or just use generic db icon if needed. Azure is close. Or we skip icon.
];
