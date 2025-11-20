export interface Project {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: {
    name: string;
    color: string;
  } | null;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email?: string;
  linkedin: string;
  github: string;
  avatar: string;
}

export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'database';
  iconId?: string; // ID for skillicons.dev
}
