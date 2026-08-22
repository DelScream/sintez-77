import { getConfigLabel, getConfigPrice } from "./configurator.js";

const catalog = {
  street: { name: "STREET", price: "от 89 990 ₽", tag: "ENTRY SYSTEM" },
  merc: { name: "MERC", price: "от 159 990 ₽", tag: "PERFORMANCE SYSTEM" },
  legend: { name: "LEGEND", price: "от 299 990 ₽", tag: "ULTIMATE SYSTEM" },
};

const hw = {
  gpu: {
    src: new URL("../assets/gpu-core.webp", import.meta.url).href,
    code: "GPU // CORE",
    title: "ВИДЕОКАРТА",
    text: "Трассировка лучей, нейроапскейл и запас FPS для AAA. Без офисных компромиссов.",
  },
  cpu: {
    src: new URL("../assets/hw-cpu.webp", import.meta.url).href,
    code: "CPU // CORE",
    title: "ПРОЦЕССОР",
    text: "Многопоток под стрим, монтаж и локальные модели. Платформа без узких мест.",
  },
  ram: {
    src: new URL("../assets/hw-ram.webp", import.meta.url).href,
    code: "RAM // DDR5",
    title: "ПАМЯТЬ",
    text: "DDR5 с запасом под текстуры, браузер из 40 вкладок и нейросети одновременно.",
  },
  ssd: {
    src: new URL("../assets/hw-ssd.webp", import.meta.url).href,
    code: "SSD // NVME",
    title: "НАКОПИТЕЛЬ",
    text: "NVMe, чтобы карты, проекты и шейдеры открывались без очереди.",
  },
  psu: {
    src: new URL("../assets/hw-psu.webp", import.meta.url).href,
    code: "PSU // POWER",
    title: "БЛОК ПИТАНИЯ",
    text: "Запас по ваттам и чистые линии. Система не должна проседать на бусте.",
  },
  cooling: {
    src: new URL("../assets/hw-cooling.webp", import.meta.url).href,
    code: "COOLING // LOOP",
    title: "ОХЛАЖДЕНИЕ",
    text: "Воздух или контур — главное стабильная температура, а не картинка для сторис.",
  },
  case: {
    src: new URL("../assets/hw-case.webp", import.meta.url).href,
    code: "CASE // FRAME",
    title: "КОРПУС",
    text: "Стекло, давление воздуха и место под кастом. Машина должна выглядеть как терминал.",
  },
};

const cart = [];

function renderCart() {
  const box = document.querySelector("[data-cart-items]");
  const badge = document.querySelector("[data-cart-count]");
  if (!box) return;
  if (!cart.length) {
    box.innerHTML = `<p class="disclaimer">Корзина пуста. Выбери уровень или конфигурацию.</p>`;
  } else {
    box.innerHTML = cart
      .map(
        (item) =>
          `<article class="term"><header>${item.name}</header><p>${item.meta}</p><footer>${item.price}</footer></article>`
      )
      .join("");
  }
  if (badge) {
    badge.hidden = cart.length === 0;
    badge.textContent = String(cart.length);
  }
}

function addToCart(item) {
  cart.push(item);
  renderCart();
}

function closeOverlays() {
  document.querySelectorAll(".overlay, .cart-panel, .mobile-nav").forEach((el) => {
    el.classList.remove("is-open");
  });
  window.__lenis?.start();
}

function openOverlay(name) {
  const el = document.querySelector(`[data-overlay="${name}"]`);
  if (!el) return;
  if (name !== "cart") closeOverlays();
  el.classList.add("is-open");
  window.__lenis?.stop();
}

export function initUI() {
  document.querySelector("[data-burger]")?.addEventListener("click", () => {
    document.querySelector("[data-mobile-nav]")?.classList.toggle("is-open");
  });
  document.querySelector("[data-mobile-nav]")?.addEventListener("click", (e) => {
    if (e.target.tagName === "A") e.currentTarget.classList.remove("is-open");
  });

  document.querySelectorAll("[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => openOverlay(btn.dataset.open));
  });

  document.querySelectorAll(".overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.remove("is-open");
    });
  });

  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => closeOverlays());
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeOverlays();
  });

  document.querySelectorAll("[data-order]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.order;
      if (key === "config") {
        addToCart({
          name: "CUSTOM BUILD",
          meta: getConfigLabel(),
          price: `${getConfigPrice().toLocaleString("ru-RU")} ₽`,
        });
      } else if (catalog[key]) {
        addToCart({
          name: catalog[key].name,
          meta: catalog[key].tag,
          price: catalog[key].price,
        });
      }
      openOverlay("order");
      const kindBtn = document.querySelector(`[data-kind-val="${key === "config" ? "config" : "ready"}"]`);
      kindBtn?.click();
    });
  });

  document.querySelectorAll("[data-kind] button").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });

  document.querySelectorAll("[data-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.hidden = true;
      form.parentElement.querySelector("[data-success]")?.classList.add("is-visible");
    });
  });

  const search = document.querySelector("[data-search]");
  const results = document.querySelector("[data-search-results]");
  search?.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    const hits = Object.values(catalog).filter(
      (item) => item.name.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q)
    );
    results.innerHTML = hits
      .map((item) => `<a href="#units">${item.name} — ${item.price}</a>`)
      .join("") || `<p class="disclaimer">NODE_NOT_FOUND</p>`;
  });

  document.querySelectorAll(".unit-card").forEach((card) => {
    const status = card.querySelector(".scan-status");
    card.addEventListener("mouseenter", () => {
      if (status) status.textContent = "SCANNING...";
      window.setTimeout(() => {
        if (status) status.textContent = "SYSTEM READY";
      }, 420);
    });
  });

  document.querySelectorAll("[data-hw]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-hw]").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const data = hw[btn.dataset.hw];
      const img = document.querySelector("[data-hw-img]");
      if (data && img) {
        img.src = data.src;
        img.alt = data.title;
        document.querySelector("[data-hw-code]").textContent = data.code;
        document.querySelector("[data-hw-title]").textContent = data.title;
        document.querySelector("[data-hw-text]").textContent = data.text;
      }
    });
  });

  document.querySelectorAll("[data-faq]").forEach((item) => {
    item.querySelector(".faq__q")?.addEventListener("click", () => {
      const wasOpen = item.classList.contains("is-open");
      document.querySelectorAll("[data-faq]").forEach((el) => el.classList.remove("is-open"));
      if (!wasOpen) item.classList.add("is-open");
    });
  });

  document.querySelectorAll("[data-step]").forEach((step) => {
    step.querySelector("button")?.addEventListener("click", () => {
      document.querySelectorAll("[data-step]").forEach((s) => s.classList.remove("is-open"));
      step.classList.add("is-open");
    });
  });

  const core = document.querySelector("[data-core]");
  document.querySelectorAll("[data-node]").forEach((node) => {
    node.addEventListener("mouseenter", () => {
      core?.classList.add("is-lit");
      node.classList.add("is-on");
    });
    node.addEventListener("mouseleave", () => {
      core?.classList.remove("is-lit");
      node.classList.remove("is-on");
    });
  });

  const logo = document.querySelector("[data-logo]");
  let clicks = 0;
  logo?.addEventListener("click", (e) => {
    if (logo.getAttribute("href") === "#top") {
      clicks += 1;
      if (clicks >= 5) {
        e.preventDefault();
        document.body.classList.toggle("is-deep");
        clicks = 0;
      }
    }
  });

  renderCart();
}

export function showCredit() {
  document.querySelector('[data-overlay="credit"]')?.classList.add("is-open");
  window.__lenis?.stop();
}
