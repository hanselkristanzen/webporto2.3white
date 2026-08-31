import { useEffect, useMemo, useRef, useState } from "react";
import Galaxy from "./Galaxy";
import { LatticeFallback } from "./LatticeFallback";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useTheme } from "../../lib/ThemeContext";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [webglOk] = useState<boolean>(() => detectWebGL());
  const { theme } = useTheme();

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "35% 0px 35% 0px", threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Tuple props must stay referentially stable across renders — Galaxy
  // tears down and recreates its whole WebGL context whenever any prop
  // reference changes (see Galaxy.tsx), so an inline `[0.5, 0.45]` literal
  // here would otherwise re-init the scene on every parent render.
  const focal = useMemo<[number, number]>(() => [0.5, 0.45], []);
  const rotation = useMemo<[number, number]>(() => [1.0, 0.0], []);

  // The hero is always a dark, cinematic section by design (matches the
  // reference screenshots) — the global light/dark toggle intentionally
  // doesn't invert it. It still participates subtly in the theme system
  // (TASK 27) via a small hue/glow shift rather than a full repaint.
  const hueShift = theme === "dark" ? 39 : 42;
  const glowIntensity = theme === "dark" ? 0.5 : 0.45;
  const density = isMobile ? 0.75 : isTablet ? 0.95 : 1.15;

  const shouldRenderGalaxy = !reducedMotion && webglOk;

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      {shouldRenderGalaxy ? (
        <CanvasErrorBoundary fallback={<LatticeFallback />}>
          {visible ? (
            <Galaxy
              focal={focal}
              rotation={rotation}
              starSpeed={0.35}
              density={density}
              hueShift={hueShift}
              speed={0.8}
              mouseInteraction
              mouseRepulsion
              glowIntensity={glowIntensity}
              saturation={0.25}
              twinkleIntensity={0.35}
              rotationSpeed={0.06}
              repulsionStrength={1.5}
              transparent
            />
          ) : (
            <LatticeFallback />
          )}
        </CanvasErrorBoundary>
      ) : (
        <LatticeFallback />
      )}
    </div>
  );
}
