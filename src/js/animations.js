import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAnimations(reduced) {
  if (reduced) return;

  gsap.utils.toArray(".section h2, .kicker, .lead").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 24, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      }
    );
  });

  gsap.utils.toArray(".unit-card, .term, .uses__grid article").forEach((el, i) => {
    gsap.from(el, {
      y: 36,
      autoAlpha: 0,
      duration: 0.7,
      delay: (i % 3) * 0.08,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  const fill = document.querySelector("[data-tl-fill]");
  if (fill) {
    gsap.to(fill, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "[data-timeline]",
        start: "top 70%",
        end: "bottom 55%",
        scrub: true,
      },
    });
  }

  const hero = document.querySelector("[data-hero]");
  if (hero) {
    gsap.to(".hero__city", {
      yPercent: 18,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(".hero__fog", {
      yPercent: 28,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(".hero__object", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
    });
  }

  const gpuImg = document.querySelector(".gpu-block__art img");
  if (gpuImg) {
    gsap.to(gpuImg, {
      rotate: 8,
      y: -20,
      ease: "none",
      scrollTrigger: {
        trigger: ".gpu-block",
        start: "top 80%",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  document.querySelectorAll(".v-text").forEach((el) => {
    gsap.to(el, {
      y: 80,
      ease: "none",
      scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  ScrollTrigger.refresh();
}
