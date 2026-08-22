import { gsap } from "gsap";

const BASE = 89990;

const cpuCost = { amd: 0, intel: 5000 };
const gpuCost = { 5060: 0, 5070: 40000, "5070ti": 65000, 5080: 95000, 5090: 145000 };
const ramCost = { 16: 0, 32: 15000, 64: 35000, 128: 75000 };
const ssdCost = { 1: 0, 2: 12000, 4: 28000 };

const gpuScore = { 5060: 52, 5070: 70, "5070ti": 78, 5080: 86, 5090: 94 };
const ramScore = { 16: 0, 32: 4, 64: 6, 128: 7 };
const ssdScore = { 1: 0, 2: 2, 4: 3 };
const cpuScore = { amd: 2, intel: 2 };

const fpsMap = {
  5060: { cp: 75, cs: 180, tk: 70, rdr: 72 },
  5070: { cp: 110, cs: 240, tk: 95, rdr: 100 },
  "5070ti": { cp: 125, cs: 270, tk: 108, rdr: 115 },
  5080: { cp: 145, cs: 320, tk: 130, rdr: 135 },
  5090: { cp: 180, cs: 400, tk: 155, rdr: 165 },
};

const state = {
  cpu: "amd",
  gpu: "5060",
  ram: "16",
  ssd: "1",
};

function formatPrice(n) {
  return `${Math.round(n).toLocaleString("ru-RU")} ₽`;
}

function calc() {
  const price =
    BASE + cpuCost[state.cpu] + gpuCost[state.gpu] + ramCost[state.ram] + ssdCost[state.ssd];
  const score = Math.min(
    100,
    gpuScore[state.gpu] + ramScore[state.ram] + ssdScore[state.ssd] + cpuScore[state.cpu]
  );
  const fps = { ...fpsMap[state.gpu] };
  const ramBonus = state.ram === "64" || state.ram === "128" ? 6 : state.ram === "32" ? 3 : 0;
  Object.keys(fps).forEach((k) => {
    fps[k] += ramBonus;
  });
  return { price, score, fps };
}

let currentPrice = BASE;

export function getConfigLabel() {
  const cpu = state.cpu === "amd" ? "AMD" : "INTEL";
  return `${cpu} / RTX ${state.gpu.toUpperCase()} / ${state.ram}GB / ${state.ssd}TB`;
}

export function getConfigPrice() {
  return calc().price;
}

export function initConfigurator() {
  const root = document.querySelector("#config");
  if (!root) return;

  const priceEl = root.querySelector("[data-price]");
  const scoreEl = root.querySelector("[data-score]");
  const scoreBar = root.querySelector("[data-score-bar]");

  const render = () => {
    const { price, score, fps } = calc();
    const obj = { n: currentPrice };
    gsap.to(obj, {
      n: price,
      duration: 0.55,
      ease: "power2.out",
      onUpdate: () => {
        priceEl.textContent = formatPrice(obj.n);
      },
    });
    currentPrice = price;
    scoreEl.textContent = score;
    scoreBar.style.setProperty("--v", `${score}%`);

    const maxFps = 420;
    Object.entries(fps).forEach(([key, val]) => {
      const bar = root.querySelector(`[data-fps="${key}"]`);
      const label = root.querySelector(`[data-fps-val="${key}"]`);
      if (bar) bar.style.width = `${Math.min(100, (val / maxFps) * 100)}%`;
      if (label) label.textContent = val;
    });
  };

  const bind = (attr, key) => {
    root.querySelectorAll(`[${attr}]`).forEach((btn) => {
      btn.addEventListener("click", () => {
        state[key] = btn.getAttribute(attr);
        btn.parentElement.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
        btn.classList.add("is-active");
        render();
      });
    });
  };

  bind("data-cpu", "cpu");
  bind("data-gpu", "gpu");
  bind("data-ram", "ram");
  bind("data-ssd", "ssd");
  render();
}
