import "lenis/dist/lenis.css";
import "./styles/main.scss";
import { initCursor } from "./js/cursor.js";
import { initUI } from "./js/ui.js";

document.querySelector("[data-header]")?.classList.add("is-scrolled");
initCursor();
initUI();
