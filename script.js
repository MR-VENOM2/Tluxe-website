// ===== CONFIG: edit this area to re-skin the site =====
const CONFIG = {
  brandName: "T-Luxe Hair",
  tagline: "...crowning you in confidence",
  whatsappNumber: "2349156048873", // DEMO number for testing
  instagram: "https://instagram.com/tluxe_hair_",
  location: "Abuja, Nigeria",
  colors: {
    black: "#000000",
    gold: "#C9A24B",
    cream: "#F6EFE6",
    wine: "#6B1E2E"
  },
  fonts: { heading: "Playfair Display", body: "DM Sans" },
  heroVideo: "videos/hero.mp4",
  heroPoster: "images/hero-poster.jpeg",
  lemonVideo: "videos/lemon.mp4",
  lemonPoster: "images/lemon.jpeg"
};

// ===== FILTER BUTTONS =====
const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "straight", label: "Straight" },
  { id: "curly", label: "Wavy & curly" },
  { id: "fashion", label: "Fashion colours" }
];

// ===== PRODUCTS: one line per product, edit prices here =====
const PRODUCTS = [
  { name: "Auburn Loose Curl", spec: `26" · 400g · 5x5`, price: 880000, length: 26, category: "curly", image: "images/auburn-loose-curl.jpeg" },
  { name: "Lemon", spec: `26" · 400g · 5x5`, price: 890000, length: 26, category: "fashion", image: "images/lemon.jpeg" },
  { name: "Onion Lilac", spec: `26" · 400g · 5x5`, price: 890000, length: 26, category: "fashion", image: "images/onion-lilac.jpeg" },
  { name: "Burgundy SDD Straight", spec: `24" · 300g · 5x5`, price: 550000, length: 24, category: "fashion", image: "images/burgundy-sdd-straight.jpeg" },
  { name: "Black Bounce", spec: `26" · 400g · 5x5`, price: 630000, length: 26, category: "curly", image: "images/black-bounce.jpeg" },
  { name: "Brown Highlight Closure", spec: `16" · 200g · Closure`, price: 260000, length: 16, category: "fashion", image: "images/brown-highlight-closure.jpeg" },
  { name: "Vietnamese Bone Straight", spec: `24" · 300g · 2x6`, price: 420000, length: 24, category: "straight", image: "images/vietnamese-bone-straight.jpeg" },
  { name: "Bone Straight", spec: `40" · 400g · 13x6 Swiss`, price: 1170000, length: 40, category: "straight", image: "images/bone-straight-40.jpeg" },
  { name: "SDD Pixie Curl", spec: `12" · 200g · 13x4 Full Frontal`, price: 215000, length: 12, category: "curly", image: "images/sdd-pixie-curl.jpeg" }
];

const PRICE_RANGES = [
  { id: "all", label: "Any price" },
  { id: "under300", label: "Under ₦300k", test: function (p) { return p < 300000; } },
  { id: "300to600", label: "₦300k – ₦600k", test: function (p) { return p >= 300000 && p <= 600000; } },
  { id: "600to900", label: "₦600k – ₦900k", test: function (p) { return p > 600000 && p <= 900000; } },
  { id: "above900", label: "Above ₦900k", test: function (p) { return p > 900000; } }
];

const LENGTH_RANGES = [
  { id: "all", label: "Any length" },
  { id: "under20", label: `Under 20"`, test: function (l) { return l < 20; } },
  { id: "20to30", label: `20" – 30"`, test: function (l) { return l >= 20 && l <= 30; } },
  { id: "over30", label: `Over 30"`, test: function (l) { return l > 30; } }
];// ===== APPLY CONFIG TO THE PAGE =====
function whatsappLink(message) {
  return "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message);
}

function applyConfig() {
  const root = document.documentElement.style;
  root.setProperty("--black", CONFIG.colors.black);
  root.setProperty("--gold", CONFIG.colors.gold);
  root.setProperty("--cream", CONFIG.colors.cream);
  root.setProperty("--wine", CONFIG.colors.wine);

  document.title = CONFIG.brandName + " | Luxury Human Hair, " + CONFIG.location;

  const hello = "Hello " + CONFIG.brandName + ", I'd like to place an order.";
    document.getElementById("hero-tagline").textContent = CONFIG.tagline;
  document.getElementById("hero-whatsapp").href = whatsappLink(hello);

}

applyConfig();
// ===== CATALOG =====
function formatPrice(n) {
  return "₦" + n.toLocaleString("en-NG");
}const activeFilters = { category: "all", price: "all", length: "all" };

function buildSelect(id, labelText, options) {
  const wrap = document.createElement("label");
  wrap.className = "filter-field";
  wrap.innerHTML = `<span>${labelText}</span>`;
  const select = document.createElement("select");
  select.id = id;
  options.forEach(function (opt) {
    const o = document.createElement("option");
    o.value = opt.id;
    o.textContent = opt.label;
    select.appendChild(o);
  });
  wrap.appendChild(select);
  return wrap;
}

function setupFilterPanel() {
  const toggle = document.getElementById("filter-toggle-btn");
  const inline = document.getElementById("filter-inline");
  const fields = document.getElementById("filter-fields");

  const typeOptions = [{ id: "all", label: "All types" }].concat(
    CATEGORIES.filter(function (c) { return c.id !== "all"; })
  );
  fields.appendChild(buildSelect("filter-type", "Type", typeOptions));
  fields.appendChild(buildSelect("filter-price", "Price", PRICE_RANGES));
  fields.appendChild(buildSelect("filter-length", "Length", LENGTH_RANGES));

  const actions = document.createElement("div");
  actions.className = "filter-actions";
  actions.innerHTML = `<button type="button" class="btn-text" id="filter-clear">Clear</button>
    <button type="button" class="btn btn-gold btn-small" id="filter-apply">Apply</button>`;
  fields.appendChild(actions);

    toggle.addEventListener("click", function () {
    inline.classList.toggle("open");
    toggle.classList.toggle("active");
  });

  document.getElementById("filter-apply").addEventListener("click", function () {
    activeFilters.category = document.getElementById("filter-type").value;
    activeFilters.price = document.getElementById("filter-price").value;
    activeFilters.length = document.getElementById("filter-length").value;
    inline.classList.remove("open");
       renderProducts();
    if (currentView === "carousel") { carouselIndex = 0; renderCarousel(); }
  });

  document.getElementById("filter-clear").addEventListener("click", function () {
    activeFilters.category = "all"; activeFilters.price = "all"; activeFilters.length = "all";
    document.getElementById("filter-type").value = "all";
    document.getElementById("filter-price").value = "all";
    document.getElementById("filter-length").value = "all";
    inline.classList.remove("open");
       renderProducts();
    if (currentView === "carousel") { carouselIndex = 0; renderCarousel(); }
  });
}

function renderProducts() {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";
  const priceTest = PRICE_RANGES.find(function (r) { return r.id === activeFilters.price; });
  const lengthTest = LENGTH_RANGES.find(function (r) { return r.id === activeFilters.length; });

  PRODUCTS
    .filter(function (p) { return activeFilters.category === "all" || p.category === activeFilters.category; })
    .filter(function (p) { return activeFilters.price === "all" || priceTest.test(p.price); })
    .filter(function (p) { return activeFilters.length === "all" || lengthTest.test(p.length); })
    .forEach(function (p) {
      const msg = "Hello " + CONFIG.brandName + ", I'd like to order: " + p.name +
        " (" + p.spec + ") - " + formatPrice(p.price) + ".";
      const card = document.createElement("article");
            card.className = "card reveal";
      card.innerHTML = `
        <div class="card-media"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
        <div class="card-info">
          <h3 class="card-name">${p.name}</h3>
          <p class="card-spec">${p.spec}</p>
          <div class="card-row">
            <span class="card-price">${formatPrice(p.price)}</span>
            <a class="card-order" href="${whatsappLink(msg)}" target="_blank" rel="noopener">Order</a>
          </div>
        </div>`;
      grid.appendChild(card);
    });

}
function buildSelect(id, labelText, options) {
  const wrap = document.createElement("label");
  wrap.className = "filter-field";
  wrap.innerHTML = `<span>${labelText}</span>`;
  const select = document.createElement("select");
  select.id = id;
  options.forEach(function (opt) {
    const o = document.createElement("option");
    o.value = opt.id;
    o.textContent = opt.label;
    select.appendChild(o);
  });
  wrap.appendChild(select);
  return wrap;
}const REVIEWS = [
  { text: "I love it.", name: "Customer feedback, via WhatsApp", placeholder: false },
  { text: "I was scared to order online, but the wig looks exactly like the video. Same bounce, same shine.", name: "Rita, Abuja · via WhatsApp", placeholder: false },
  { text: "feels even better in person. Everyone asked where I got it.", name: "Debby", placeholder: false },
  { text: "Delivered to Enugu without any wahala. It arrived neat, and the hair is soft.", name: "Customer, via WhatsApp", placeholder: false },
  { text: "Sample review text. Replace with a real customer review.", name: "Customer name", placeholder: true }
];

function renderReviews() {
  const box = document.getElementById("reviews");
  REVIEWS.forEach(function (r) {
    const card = document.createElement("div");
    card.className = "review";
    card.innerHTML =
      (r.placeholder ? '<span class="review-tag">PLACEHOLDER</span>' : "") +
      "<p>" + r.text + "</p>" +
      '<p class="review-name">' + r.name + "</p>";
    box.appendChild(card);
  });
}


// ===== FOOTER =====
function setupFooter() {
  document.getElementById("footer-brand").textContent = CONFIG.brandName;
  document.getElementById("footer-location").textContent = CONFIG.location;
  document.getElementById("footer-instagram").href = CONFIG.instagram;
  document.getElementById("footer-whatsapp").href =
    whatsappLink("Hello " + CONFIG.brandName + ", I have a question.");
  document.getElementById("footer-copy").textContent =
    "© " + new Date().getFullYear() + " " + CONFIG.brandName;
}

function setupMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  const backdrop = document.getElementById("mobile-menu-backdrop");
  function openMenu() { menu.classList.add("open"); backdrop.classList.add("open"); }
  function closeMenu() { menu.classList.remove("open"); backdrop.classList.remove("open"); }
  btn.addEventListener("click", openMenu);
  backdrop.addEventListener("click", closeMenu);
  menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
}
renderReviews();
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function observeReveals() {
  document.querySelectorAll(".reveal:not(.revealed)").forEach(function (el) {
    revealObserver.observe(el);
  });
}
// ===== CAROUSEL (horizontal / "discover" view) =====
let carouselIndex = 0;
let carouselTimer = null;

function currentCarouselProducts() {
  const priceTest = PRICE_RANGES.find(function (r) { return r.id === activeFilters.price; });
  const lengthTest = LENGTH_RANGES.find(function (r) { return r.id === activeFilters.length; });
  return PRODUCTS
    .filter(function (p) { return activeFilters.category === "all" || p.category === activeFilters.category; })
    .filter(function (p) { return activeFilters.price === "all" || priceTest.test(p.price); })
    .filter(function (p) { return activeFilters.length === "all" || lengthTest.test(p.length); });
}

function renderCarousel() {
  const track = document.getElementById("carousel-track");
  track.innerHTML = "";
  const list = currentCarouselProducts();
  if (carouselIndex >= list.length) carouselIndex = 0;

  list.forEach(function (p) {
    const msg = "Hello " + CONFIG.brandName + ", I'd like to order: " + p.name +
      " (" + p.spec + ") - " + formatPrice(p.price) + ".";
    const card = document.createElement("div");
    card.className = "carousel-card card";
    card.innerHTML = `
      <div class="card-media"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
      <div class="card-info">
        <h3 class="card-name">${p.name}</h3>
        <p class="card-spec">${p.spec}</p>
        <div class="card-row">
          <span class="card-price">${formatPrice(p.price)}</span>
          <a class="card-order" href="${whatsappLink(msg)}" target="_blank" rel="noopener">Order</a>
        </div>
      </div>`;
    track.appendChild(card);
  });
  positionCarouselCards();
}

function positionCarouselCards() {
  const cards = document.querySelectorAll(".carousel-card");
  const total = cards.length;
  cards.forEach(function (card, i) {
    let diff = i - carouselIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    const abs = Math.abs(diff);
    const scale = abs === 0 ? 1 : abs === 1 ? 0.78 : 0.6;
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.7 : abs === 2 ? 0.35 : 0;
    card.style.transform = "translate(calc(-50% + " + (diff * 105) + "%), -50%) scale(" + scale + ")";
    card.style.opacity = opacity;
    card.style.zIndex = String(10 - abs);
    card.style.pointerEvents = abs === 0 ? "auto" : "none";
  });
}

function carouselStep(direction) {
  const total = currentCarouselProducts().length;
  if (total === 0) return;
  carouselIndex = (carouselIndex + direction + total) % total;
  positionCarouselCards();
  restartCarouselAutoplay();
}

function restartCarouselAutoplay() {
  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = setInterval(function () { carouselStep(1); }, 4500);
}

function setupCarousel() {
  document.getElementById("carousel-prev").addEventListener("click", function () { carouselStep(-1); });
  document.getElementById("carousel-next").addEventListener("click", function () { carouselStep(1); });
  renderCarousel();
  restartCarouselAutoplay();
}

// ===== VIEW TOGGLE (carousel <-> grid) =====
let currentView = "carousel";

function setupViewToggle() {
  document.getElementById("view-toggle-btn").addEventListener("click", function () {
    const carouselEl = document.getElementById("carousel-view");
    const gridEl = document.getElementById("product-grid");
    if (currentView === "carousel") {
      currentView = "grid";
      carouselEl.hidden = true;
      gridEl.hidden = false;
      if (carouselTimer) clearInterval(carouselTimer);
    } else {
      currentView = "carousel";
      gridEl.hidden = true;
      carouselEl.hidden = false;
      renderCarousel();
      restartCarouselAutoplay();
    }
  });
}
setupFilterPanel();
renderProducts();
observeReveals();
setupCarousel();
setupViewToggle();
setupMobileMenu();
setupFooter();