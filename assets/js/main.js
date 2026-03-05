(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.getElementById("primary-nav");
  if (toggle && navList) {
    toggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (navList.classList.contains("is-open")) {
        navList.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // Gallery modal (lightbox)
  const modal = document.querySelector("[data-modal]");
  const modalImg = modal?.querySelector("[data-modal-img]");
  const modalTitle = modal?.querySelector("[data-modal-title]");
  const closeBtn = modal?.querySelector("[data-modal-close]");

  const openModal = (src, title, alt) => {
    if (!modal || !modalImg || !modalTitle) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    modalImg.src = src;
    modalImg.alt = alt || title || "Stained glass artwork";
    modalTitle.textContent = title || "Artwork";
    document.documentElement.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!modal || !modalImg) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
    modalImg.alt = "";
    document.documentElement.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lightbox]");
    if (btn) {
      const src = btn.getAttribute("data-large");
      const title = btn.getAttribute("data-title");
      const alt = btn.getAttribute("data-alt");
      if (src) openModal(src, title, alt);
      return;
    }
    if (modal?.classList.contains("is-open") && e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modal?.classList.contains("is-open")) closeModal();
    }
  });

  // Data-driven featured + gallery
  const featuredGrid = document.getElementById("featured-grid");
  const galleryGrid = document.getElementById("gallery-grid");

  if (!featuredGrid && !galleryGrid) return;

  const escapeHtml = (s) =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const renderFeatured = (pieces) => {
    if (!featuredGrid) return;

    const featured = pieces
      .filter((p) => p.featured)
      .sort((a, b) => (a.featuredOrder ?? 50) - (b.featuredOrder ?? 50))
      .slice(0, 3);

    featuredGrid.innerHTML = featured
      .map(
        (p) => `
        <article class="product-card" role="listitem">
          <img src="${escapeHtml(p.thumb)}" alt="${escapeHtml(p.alt || p.title)}" loading="lazy" decoding="async" />
          <div class="product-body">
            <h3 class="product-title">${escapeHtml(p.title)}</h3>
            <p class="product-meta">Featured piece</p>
            <a class="btn btn-primary btn-small"
               href="mailto:mkellercordes@gmail.com?subject=${encodeURIComponent("Enquiry - " + p.title + " piece")}">
              Enquire
            </a>
          </div>
        </article>
      `
      )
      .join("");
  };

  const renderGallery = (pieces) => {
    if (!galleryGrid) return;

    // Hide the featured-only items from the gallery if you want;
    // currently we include EVERYTHING except the banner. Easiest: include all pieces.
    galleryGrid.innerHTML = pieces
      .filter((p) => p.id !== "banner")
      .map(
        (p) => `
        <article class="gallery-item" role="listitem">
          <button class="gallery-btn" type="button"
            data-lightbox
            data-large="${escapeHtml(p.large)}"
            data-title="${escapeHtml(p.title)}"
            data-alt="${escapeHtml(p.alt || p.title)}">
            <img src="${escapeHtml(p.thumb)}" alt="${escapeHtml(p.alt || p.title)}" loading="lazy" decoding="async" />
          </button>
          <div class="gallery-caption">${escapeHtml(p.title)}</div>
        </article>
      `
      )
      .join("");
  };

  fetch("./data/pieces.json", { cache: "no-store" })
    .then((r) => r.json())
    .then((data) => {
      const pieces = Array.isArray(data.pieces) ? data.pieces : [];
      renderFeatured(pieces);
      renderGallery(pieces);
    })
    .catch((err) => {
      console.warn("Could not load pieces.json", err);
    });
})();