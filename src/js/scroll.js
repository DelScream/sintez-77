import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initScroll() {
  const lenis = new Lenis({
    anchors: { offset: 84 },
    autoRaf: false,
    respectReducedMotion: true,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  const bar = document.querySelector(".scroll-meter__bar");
  const label = document.querySelector(".scroll-meter__label");

  lenis.on("scroll", ({ scroll, limit }) => {
    const p = limit > 0 ? Math.min(100, Math.round((scroll / limit) * 100)) : 0;
    if (bar) bar.style.height = `${p}%`;
    if (label) label.textContent = `SCROLL // ${String(p).padStart(2, "0")}%`;
  });

  window.__lenis = lenis;
  return lenis;
}
