export type ProjectCategory = 
  | 'All'
  | 'Embedded Systems'
  | 'FPGA / RTL'
  | 'Digital Design'
  | 'Robotics & Control'
  | 'IoT & Sensors';

export interface ProjectDetails {
  overview: string;
  problem: string;
  objective: string;
  architecture: string;
  hardware: string[];
  software: string[];
  workingPrinciple: string;
  implementation: string[];
  testingVerification: string;
  keyFeatures: string[];
  futureImprovements: string[];
  simulationHighlights?: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: ProjectCategory;
  featured: boolean;
  technologies: string[];
  description: string;
  features: string[];
  visualizerType: 'fifo' | 'async-fifo' | 'ram' | 'rom' | 'pid' | 'eating-assistant' | 'pothole' | 'alu';
  githubUrl?: string;
  liveDemoUrl?: string;
  details: ProjectDetails;
}

export interface SkillItem {
  name: string;
  tag?: string;
  badge?: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  duration?: string;
  type: 'Internship' | 'Coursework & Training';
  description: string;
  highlights: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  category: 'Exhibition' | 'Leadership' | 'Technical Milestone';
  description: string;
  metric?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  details: string;
}
