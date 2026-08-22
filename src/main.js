import "lenis/dist/lenis.css";
import "./styles/main.scss";
import { initLoader } from "./js/loader.js";
import { initScroll } from "./js/scroll.js";
import { initCursor } from "./js/cursor.js";
import { initHero } from "./js/hero.js";
import { initGlitch } from "./js/glitch.js";
import { initConfigurator } from "./js/configurator.js";
import { initAnimations } from "./js/animations.js";
import { initUI, showCredit } from "./js/ui.js";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

initCursor();
initUI();
initConfigurator();

initLoader().then(() => {
  initScroll();
  initHero();
  initGlitch(reduced);
  initAnimations(reduced);
  showCredit();
});
