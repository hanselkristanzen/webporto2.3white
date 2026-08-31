import { lazy, Suspense, useRef } from "react";
import { contactChannels } from "../../data/contact";
import { Reveal } from "../../components/ui/Reveal";
import { MagneticButton } from "../../components/ui/MagneticButton";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useInView } from "../../hooks/useInView";
import styles from "./Contact.module.css";

const Aurora = lazy(() => import("../../components/effects/Aurora"));
const VariableProximity = lazy(() => import("../../components/effects/VariableProximity"));

const CONTACT_HEADLINE = "LET'S BUILD SOMETHING";

export function Contact() {
  const email = contactChannels.find((c) => c.id === "email");
  const reducedMotion = useReducedMotion();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  // Reused as the section's own visibility gate so Aurora's WebGL context
  // isn't created until Contact is actually near the viewport.
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.05, rootMargin: "200px 0px" });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={styles.contact}
      data-dark
      aria-labelledby="contact-heading"
    >
      <div className={styles.glow} aria-hidden="true" />
      {!reducedMotion && inView ? (
        <div className={styles.auroraLayer} aria-hidden="true">
          <Suspense fallback={null}>
            <Aurora colorStops={["#7cff67", "#EAB308", "#5227FF"]} blend={0.55} amplitude={0.9} speed={0.5} />
          </Suspense>
        </div>
      ) : null}
      <div className={`container ${styles.container}`}>
        <Reveal variant="fade">
          <div className={styles.eyebrowRow}>
            <span className={styles.index}>09</span>
            <span className="eyebrow eyebrow--on-dark">Contact</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          {/*
            Single "LET'S BUILD SOMETHING" heading, rendered entirely by
            VariableProximity — there is no separate static copy underneath
            it. VariableProximity's own sr-only span (not aria-hidden) is
            what the h2's accessible name resolves from; every visible
            per-letter span is aria-hidden, so nothing is announced twice.
          */}
          <h2 id="contact-heading" className={styles.headline} ref={headlineRef}>
            <Suspense fallback={<span>{CONTACT_HEADLINE}</span>}>
              <VariableProximity
                label={CONTACT_HEADLINE}
                containerRef={headlineRef}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                radius={100}
                falloff="linear"
              />
            </Suspense>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className={styles.sub}>Have an idea, project, or problem worth solving?</p>
        </Reveal>

        <Reveal delay={200}>
          <div className={styles.ctaRow}>
            {email ? (
              <MagneticButton className="cursor-target" href={email.href} variant="solid">
                Say Hello
              </MagneticButton>
            ) : null}
            <MagneticButton
              className="cursor-target"
              href="/Hansel-Kristanzen-CV.pdf"
              download="Hansel-Kristanzen-CV.pdf"
              variant="outline"
              showArrow={false}
            >
              View CV
            </MagneticButton>
          </div>
        </Reveal>

        <div className={styles.channels}>
          {contactChannels.map((channel, i) => (
            <Reveal key={channel.id} delay={260 + i * 50}>
              <a
                href={channel.href}
                className={`${styles.channel} cursor-target`}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noreferrer noopener" : undefined}
              >
                <span className={styles.channelLabel}>{channel.label}</span>
                <span className={styles.channelValue}>{channel.value}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
