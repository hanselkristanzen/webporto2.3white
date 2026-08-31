export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  year?: string;
  role: string;
  category: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  featured: boolean;
  tags: string[];
  metrics?: ProjectMetric[];
  /** Path (under /public) to a real screenshot of the shipped product. */
  screenshot?: string;
  screenshotAlt?: string;
}

export interface ModelResult {
  id: string;
  name: string;
  shortName: string;
  methodology: string;
  accuracy: number | null;
  latencyMs: number | null;
  robustnessDropPp: number | null;
  note?: string;
}

export interface ResearchAuthor {
  name: string;
  isMe?: boolean;
}

export interface ResearchProject {
  slug: string;
  title: string;
  venue: string;
  status: string;
  year: string;
  summary: string;
  authors: ResearchAuthor[];
  dataset: {
    size: number;
    intentCategories: number;
    language: string;
    domains: string[];
    characteristics: string[];
  };
  models: ModelResult[];
  limitation: string;
}

export type WorkMode = "On-site" | "Remote" | "Hybrid";

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  start: string;
  end: string;
  location: string;
  mode: WorkMode;
  sortKey: string; // YYYY-MM, used for chronological ordering
  description?: string;
  /** Path (under /public) to a photo from this role, if available. */
  image?: string;
  imageAlt?: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  program: string;
  focus?: string;
  start: string;
  end: string;
  location: string;
  distinction?: string;
}

export interface OrgRole {
  id: string;
  title: string;
  start: string;
  end: string;
}

export interface OrganizationEntry {
  id: string;
  name: string;
  fullName?: string;
  roles: OrgRole[];
}

export interface VolunteerEntry {
  id: string;
  role: string;
  organization: string;
  date: string;
  location: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  skills: string[];
}

export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}
