export function initCursor() {
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (isTouch) {
    document.body.classList.add("is-touch", "has-native-cursor");
    return;
  }

  const ring = document.querySelector(".cursor");
  const dot = document.querySelector(".cursor-dot");
  const chip = document.querySelector(".access-chip");
  if (!ring || !dot) {
    document.body.classList.add("has-native-cursor");
    return;
  }

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let tx = x;
  let ty = y;

  window.addEventListener("mousemove", (e) => {
    tx = e.clientX;
    ty = e.clientY;
    dot.style.left = `${tx}px`;
    dot.style.top = `${ty}px`;
    if (chip) {
      chip.style.left = `${tx}px`;
      chip.style.top = `${ty}px`;
    }
  });

  const tick = () => {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    requestAnimationFrame(tick);
  };
  tick();

  const hoverables = "a, button, summary, input, [data-cursor], .chip, .unit-card";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverables)) ring.classList.add("is-hover");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverables)) ring.classList.remove("is-hover");
  });

  document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("mouseenter", () => {
      if (!chip) return;
      chip.textContent = "// ACCESS_GRANTED";
      chip.style.opacity = "1";
      window.setTimeout(() => {
        chip.style.opacity = "0";
      }, 260);
    });
  });
}
