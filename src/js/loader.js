import { gsap } from "gsap";

const skipKey = "sintez77-booted";

export function initLoader() {
  const loader = document.querySelector("#loader");
  if (!loader) return Promise.resolve();

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const seen = sessionStorage.getItem(skipKey);

  if (reduced || seen) {
    loader.remove();
    document.body.classList.add("is-ready");
    return Promise.resolve();
  }

  const fill = loader.querySelector(".loader__fill");
  const log = loader.querySelector(".loader__log");
  const status = loader.querySelector(".loader__status");
  const lines = [
    "CHECKING NODE RU-MSK...",
    "LOADING HARDWARE MAP...",
    "HARDWARE ONLINE",
    "ACCESS GRANTED",
  ];

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(skipKey, "1");
        gsap.to(loader, {
          yPercent: -100,
          duration: 0.55,
          ease: "power4.in",
          onComplete: () => {
            loader.remove();
            document.body.classList.add("is-ready");
            resolve();
          },
        });
      },
    });

    tl.to(fill, { width: "100%", duration: 1.05, ease: "power2.inOut" });
    lines.forEach((line, i) => {
      tl.call(
        () => {
          log.textContent = line;
          if (i === lines.length - 2) status.textContent = "HARDWARE ONLINE";
          if (i === lines.length - 1) status.textContent = "ACCESS GRANTED";
        },
        null,
        i * 0.22
      );
    });
  });
}
