import { gsap } from "gsap";

export function initHero() {
  const clock = document.querySelector("[data-clock]");
  if (clock) {
    const tick = () => {
      clock.textContent = new Date().toLocaleTimeString("ru-RU", { hour12: false });
    };
    tick();
    window.setInterval(tick, 1000);
  }

  const hud = {
    cpu: { el: document.querySelector('[data-hud="cpu"]'), min: 86, max: 99, suffix: "%" },
    gpu: { el: document.querySelector('[data-hud="gpu"]'), min: 90, max: 99, suffix: "%" },
    ram: { el: document.querySelector('[data-hud="ram"]'), min: 52, max: 78, suffix: "%" },
    temp: { el: document.querySelector('[data-hud="temp"]'), min: 54, max: 68, suffix: "°C" },
    fps: { el: document.querySelector('[data-hud="fps"]'), min: 210, max: 280, suffix: "" },
  };

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced) {
    window.setInterval(() => {
      Object.values(hud).forEach((item) => {
        if (!item.el) return;
        const n = Math.round(item.min + Math.random() * (item.max - item.min));
        item.el.textContent = `${n}${item.suffix}`;
      });
    }, 1400);
  }

  const header = document.querySelector("[data-header]");
  const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (reduced) return;

  gsap.from(".hero-title__line span", {
    yPercent: 110,
    duration: 1.1,
    stagger: 0.12,
    ease: "power4.out",
    delay: 0.1,
  });
  gsap.from(".hero__sub, .hero__tag, .hero__cta, .hud, .hero__spec", {
    autoAlpha: 0,
    y: 18,
    duration: 0.8,
    stagger: 0.08,
    delay: 0.45,
    ease: "power2.out",
  });
}
