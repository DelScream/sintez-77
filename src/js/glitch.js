export function initGlitch(reduced) {
  if (reduced) return;

  const title = document.querySelector(".hero-title");
  const image = document.querySelector("[data-glitch-img]");
  const flash = document.querySelector(".glitch-flash");

  const run = () => {
    title?.classList.add("is-glitching");
    image?.classList.add("is-glitching");
    window.setTimeout(() => {
      title?.classList.remove("is-glitching");
      image?.classList.remove("is-glitching");
    }, 220);

    if (flash && Math.random() > 0.82) {
      flash.textContent = "CONNECTION LOST";
      flash.style.opacity = "1";
      window.setTimeout(() => {
        flash.textContent = "CONNECTION RESTORED";
      }, 120);
      window.setTimeout(() => {
        flash.style.opacity = "0";
      }, 280);
    }
  };

  const loop = () => {
    const wait = 8000 + Math.random() * 7000;
    window.setTimeout(() => {
      run();
      loop();
    }, wait);
  };

  loop();
}
