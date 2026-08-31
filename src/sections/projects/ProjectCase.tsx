import type { Project } from "../../types/content";
import { Reveal } from "../../components/ui/Reveal";
import { Tag } from "../../components/ui/Tag";
import { MagneticButton } from "../../components/ui/MagneticButton";
import { useTilt } from "../../hooks/useTilt";
import styles from "./Projects.module.css";

interface ProjectCaseProps {
  project: Project;
  index: number;
}

function bareUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function ProjectCase({ project, index }: ProjectCaseProps) {
  const tiltRef = useTilt<HTMLDivElement>(5);

  return (
    <article className={styles.case} aria-labelledby={`project-${project.slug}`}>
      <div className={styles.caseInfo}>
        <Reveal variant="fade">
          <span className={styles.caseIndex}>{String(index + 1).padStart(2, "0")}</span>
        </Reveal>
        <Reveal delay={60}>
          <h3 id={`project-${project.slug}`} className={styles.caseTitle}>
            {project.title}
          </h3>
        </Reveal>
        <Reveal delay={100}>
          <div className={styles.tagRow}>
            {project.tags.map((tag) =>
              tag === "LIVE PROJECT" && project.link ? (
                <Tag key={tag} tone="accent" href={project.link} target="_blank" rel="noreferrer noopener" showArrow>
                  {tag}
                </Tag>
              ) : (
                <Tag key={tag} tone={tag === "LIVE PROJECT" ? "accent" : "default"}>
                  {tag}
                </Tag>
              )
            )}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className={styles.narrativeGrid}>
            <div className={styles.narrativeBlock}>
              <span className={styles.narrativeLabel}>What it is</span>
              <p className={styles.narrativeValue}>{project.description}</p>
            </div>
            <div className={styles.narrativeBlock}>
              <span className={styles.narrativeLabel}>Why it matters</span>
              <p className={styles.narrativeValue}>
                It gives students a real channel to apply their skills professionally,
                while giving small businesses a practical way to access digital services.
              </p>
            </div>
            <div className={styles.narrativeBlock}>
              <span className={styles.narrativeLabel}>What Hansel did</span>
              <p className={styles.narrativeValue}>{project.role}</p>
            </div>
            <div className={styles.narrativeBlock}>
              <span className={styles.narrativeLabel}>Technically interesting</span>
              <p className={styles.narrativeValue}>
                Built with React and TypeScript as a two-sided marketplace interface —
                balancing discovery for business clients with a usable listing flow for
                student freelancers.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={170}>
          <div>
            <span className={styles.narrativeLabel}>Stack</span>
            <div className={styles.techRow}>
              {project.technologies.map((tech) => (
                <span key={tech} className={styles.tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {project.link ? (
          <Reveal delay={180}>
            <div className={styles.ctaRow}>
              <MagneticButton
                className="cursor-target"
                href={project.link}
                target="_blank"
                rel="noreferrer noopener"
              >
                Visit Live Site
              </MagneticButton>
            </div>
          </Reveal>
        ) : null}
      </div>

      <Reveal variant="scale" delay={80} as="div" className={styles.visualSlot}>
        {project.screenshot ? (
          <a
            className={`${styles.mockup} cursor-target`}
            href={project.link ?? project.screenshot}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Open ${project.title} in a new tab`}
          >
            <div ref={tiltRef} className={styles.visualTilt}>
              <div className={styles.mockupChrome} aria-hidden="true">
                <span className={styles.mockupDots}>
                  <span />
                  <span />
                  <span />
                </span>
                {project.link ? (
                  <span className={styles.mockupAddress}>{bareUrl(project.link)}</span>
                ) : null}
              </div>
              <div className={styles.mockupScreen}>
                <img
                  className={styles.mockupImage}
                  src={project.screenshot}
                  alt={project.screenshotAlt ?? `Screenshot of ${project.title}`}
                  loading="lazy"
                />
              </div>
            </div>
          </a>
        ) : (
          <div ref={tiltRef} className={styles.visualTilt}>
            <span className={styles.visualLabel}>Preview coming soon</span>
          </div>
        )}
      </Reveal>
    </article>
  );
}
