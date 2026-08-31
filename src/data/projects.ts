import type { Project } from "../types/content";

export const projects: Project[] = [
  {
    slug: "stairslife",
    title: "StairsLife",
    role: "Frontend Development",
    category: "Product Engineering",
    description:
      "A freelancer marketplace platform that connects university students with UMKM clients seeking digital services.",
    technologies: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Git"],
    link: "https://stairslife-frontend.vercel.app/",
    featured: true,
    tags: ["CASE STUDY", "LIVE PROJECT", "FRONTEND"],
    screenshot: "/images/projects/stairslife-app.webp",
    screenshotAlt: "StairsLife landing page — \"Kerjakan Project Nyata. Bangun Portofoliomu.\"",
  },
];

/**
 * Future projects can be appended here without touching any presentation
 * code — the Projects section renders directly from this array.
 */
export const projectsComingSoon = true;
