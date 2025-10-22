export enum SectionId {
  About = 'about',
  Projects = 'projects',
  Skills = 'skills',
  Contact = 'contact',
  // FIX: Add 'Experience' to SectionId enum.
  Experience = 'experience',
}

export interface SectionTheme {
  blobClass: string;
  glowColor: string;
}

export interface Section {
  id: SectionId;
  name: string;
  theme: SectionTheme;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  url: string;
  icon: string;
  tags: string[];
}