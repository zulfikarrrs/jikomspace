tailwind.config = {
      theme: {
        extend: {
          colors: { primary: "#ff7a00" },
          fontFamily: { sans: ["Inter", "ui-sans-serif"] },
        },
      },
    };

// Floating buttons
    const btnAspirasi = document.getElementById('aspirasi-btn');
    const btnWA = document.getElementById('wa-btn');
    const handleExpand = (btn) => btn.classList.remove('collapsed');
    const handleCollapse = (btn) => btn.classList.add('collapsed');
    btnAspirasi.addEventListener('click', (e) => { if (btnAspirasi.classList.contains('collapsed')) { e.preventDefault(); handleExpand(btnAspirasi); } });
    btnWA.addEventListener('click', (e) => { if (btnWA.classList.contains('collapsed')) { e.preventDefault(); handleExpand(btnWA); } });
    btnAspirasi.addEventListener('mouseenter', () => handleExpand(btnAspirasi));
    btnAspirasi.addEventListener('mouseleave', () => setTimeout(() => handleCollapse(btnAspirasi), 1500));
    btnWA.addEventListener('mouseenter', () => handleExpand(btnWA));
    btnWA.addEventListener('mouseleave', () => setTimeout(() => handleCollapse(btnWA), 1500));

    // Mobile menu
    document.getElementById("menuBtn").addEventListener("click", () => {
      const m = document.getElementById("mobileMenu");
      m.style.display = m.style.display === "none" ? "block" : "none";
    });
    document.querySelectorAll(".mobile-link").forEach(l => l.addEventListener("click", () => {
      document.getElementById("mobileMenu").style.display = "none";
    }));

    // ── DATA ───────────────────────────────────────────────────────────────────
    const konsenData = {
      jurnalistik: {
        label: "Jurnalistik",
        icon: `<svg class="ktab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6z"/></svg>`,
        desc: "Mendalami seni bercerita melalui berita yang akurat, objektif, dan berdampak sosial.",
        benefits: [
          "Mengembangkan kemampuan investigasi dan riset mendalam",
          "Melatih penulisan yang clear, concise, dan compelling",
          "Memahami etika jurnalisme dan tanggung jawab sosial media",
          "Belajar storytelling yang menarik dan berpengaruh",
        ],
        careers: [
          "Reporter di media massa (cetak, digital, broadcast)",
          "Editor dan redaktur berita",
          "Jurnalis investigatif independen",
          "Content creator dan media strategist",
          "Dokumenter filmmaker",
        ],
        slides: [
          "File konsentrasi/foto konsentrasi/jurnalistik-1.jpg",
          "File konsentrasi/foto konsentrasi/jurnalistik-1.jpg",
          "File konsentrasi/foto konsentrasi/jurnalistik-1.jpg",
          "File konsentrasi/foto konsentrasi/jurnalistik-1.jpg",
        ],
      },
      pr: {
        label: "Public Relations",
        icon: `<svg class="ktab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        desc: "Membangun dan mengelola reputasi organisasi melalui komunikasi strategis dan hubungan publik yang efektif.",
        benefits: [
          "Merancang strategi komunikasi korporat yang terstruktur",
          "Mengelola krisis komunikasi dan reputasi lembaga",
          "Membangun relasi media dan jaringan profesional",
          "Menguasai komunikasi publik dan presentasi strategis",
        ],
        careers: [
          "Public Relations Officer di perusahaan swasta",
          "Humas lembaga pemerintah dan instansi publik",
          "Brand & reputation manager",
          "Event organizer dan corporate communication",
          "Marketing communication specialist",
        ],
        slides: [
          "File konsentrasi/foto konsentrasi/public relation-1.jpg",
          "File konsentrasi/foto konsentrasi/public relation-1.jpg",
          "File konsentrasi/foto konsentrasi/public relation-1.jpg",
          "File konsentrasi/foto konsentrasi/public relation-1.jpg",
        ],
      },
      mdc: {
        label: "Media Desain Komunikasi",
        tabLabel: "MDC",
        icon: `<svg class="ktab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
        desc: "Menciptakan pesan visual yang powerful melalui desain grafis, multimedia, dan teknologi kreatif.",
        benefits: [
          "Menguasai teknik fotografi, videografi, dan desain grafis",
          "Menyampaikan pesan kuat melalui visual storytelling",
          "Siap berkarir di industri periklanan, film, dan media digital",
          "Menghasilkan portofolio karya nyata siap industri",
        ],
        careers: [
          "Videografer dan sinematografer profesional",
          "Fotografer komersial dan editorial",
          "Desainer grafis dan motion graphic designer",
          "Creative director di agensi kreatif",
          "Content producer dan art director",
        ],
        slides: [
          "File konsentrasi/foto konsentrasi/mdc-1.jpg",
          "File konsentrasi/foto konsentrasi/mdc-1.jpg",
          "File konsentrasi/foto konsentrasi/mdc-1.jpg",
          "File konsentrasi/foto konsentrasi/mdc-1.jpg",
        ],
      },
      kab: {
        label: "Komunikasi Antarbudaya",
        tabLabel: "Antarbudaya",
        icon: `<svg class="ktab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
        desc: "Mengeksplorasi dinamika komunikasi lintas budaya untuk membangun pemahaman global dan dialog yang inklusif.",
        benefits: [
          "Sensitif terhadap keberagaman budaya dan komunikasi inklusif",
          "Siap bekerja di lingkungan multikultural dan internasional",
          "Terampil riset etnografi dan analisis komunikasi budaya",
          "Mampu menjadi mediator dalam konflik berbasis perbedaan budaya",
        ],
        careers: [
          "Diplomat dan staf kedutaan besar",
          "Konsultan komunikasi budaya internasional",
          "Peneliti sosial dan budaya",
          "Koordinator program NGO dan LSM internasional",
          "Akademisi dan pengajar komunikasi",
        ],
        slides: [
          "File konsentrasi/foto konsentrasi/komunikasi antarbudaya-1.jpg",
          "File konsentrasi/foto konsentrasi/komunikasi antarbudaya-1.jpg",
          "File konsentrasi/foto konsentrasi/komunikasi antarbudaya-1.jpg",
          "File konsentrasi/foto konsentrasi/komunikasi antarbudaya-1.jpg",
        ],
      },
    };

    const konsenKeys = ["jurnalistik", "pr", "mdc", "kab"];
    let currentKey = "jurnalistik";
    let currentSlide = 0;

    // ── TABS ───────────────────────────────────────────────────────────────────
    function buildTabs() {
      const container = document.getElementById("konsenTabs");
      container.innerHTML = konsenKeys.map(key => {
        const d = konsenData[key];
        const isActive = key === currentKey;
        const displayLabel = d.tabLabel || d.label;
        return `<button class="ktab ${isActive ? 'active' : ''}" data-key="${key}">
          ${d.icon}
          ${displayLabel}
        </button>`;
      }).join("");
      container.querySelectorAll(".ktab").forEach(btn => {
        btn.addEventListener("click", () => switchKonsen(btn.dataset.key));
      });
    }

    // ── SLIDER ────────────────────────────────────────────────────────────────
    function buildSlider(key) {
      const track = document.getElementById("sliderTrack");
      const dots = document.getElementById("sliderDots");
      const slides = konsenData[key].slides;
      currentSlide = 0;

      track.innerHTML = slides.map(src => `
        <div class="slide">
          <img src="${src}" alt="${konsenData[key].label}" style="width:100%;height:100%;object-fit:cover;" />
        </div>`).join("");

      dots.innerHTML = slides.map((_, i) =>
        `<button class="dot ${i === 0 ? 'active' : ''}" data-i="${i}"></button>`
      ).join("");

      dots.querySelectorAll(".dot").forEach(d =>
        d.addEventListener("click", () => goTo(parseInt(d.dataset.i)))
      );
      track.style.transform = "translateX(0)";
    }

    function goTo(i) {
      const total = konsenData[currentKey].slides.length;
      currentSlide = (i + total) % total;
      document.getElementById("sliderTrack").style.transform = `translateX(-${currentSlide * 100}%)`;
      document.querySelectorAll(".dot").forEach((d, idx) =>
        d.classList.toggle("active", idx === currentSlide)
      );
    }

    document.getElementById("prevBtn").addEventListener("click", () => goTo(currentSlide - 1));
    document.getElementById("nextBtn").addEventListener("click", () => goTo(currentSlide + 1));

    // ── INFO PANEL ────────────────────────────────────────────────────────────
    function buildInfo(key) {
      const d = konsenData[key];
      const benefitsHTML = d.benefits.map(b => `
        <li style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;background:#fff;border:1px solid #fed7aa;border-radius:10px;font-size:13.5px;color:#374151;line-height:1.5;">
          <svg style="flex-shrink:0;margin-top:2px;" width="16" height="16" fill="none" stroke="#ea580c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          ${b}
        </li>`).join("");
      const careersHTML = d.careers.map(c => `
        <li style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;background:#fff;border:1px solid #bbf7d0;border-radius:10px;font-size:13.5px;color:#374151;line-height:1.5;">
          <svg style="flex-shrink:0;margin-top:2px;" width="16" height="16" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
          ${c}
        </li>`).join("");

      document.getElementById("infoPanel").innerHTML = `
        <div class="fade-in">
          <!-- Label + deskripsi -->
          <div class="mb-6 pb-6 border-b border-slate-100">
            <span class="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-2">${d.label}</span>
            <p class="text-slate-500 text-sm leading-relaxed">${d.desc}</p>
          </div>

          <!-- Grid info -->
          <div class="info-grid">
            <div>
              <h3 style="font-size:15px;font-weight:800;color:#ea580c;margin-bottom:14px;display:flex;align-items:center;gap:8px;">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Keuntungan Konsentrasi
              </h3>
              <ul class="space-y-3">${benefitsHTML}</ul>
            </div>
            <div class="mt-6 md:mt-0">
              <h3 style="font-size:15px;font-weight:800;color:#16a34a;margin-bottom:14px;display:flex;align-items:center;gap:8px;">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
                Peluang Karir
              </h3>
              <ul class="space-y-3">${careersHTML}</ul>
            </div>
          </div>
        </div>`;
    }

    // ── SWITCH ────────────────────────────────────────────────────────────────
    function switchKonsen(key) {
      currentKey = key;
      buildTabs();
      buildSlider(key);
      buildInfo(key);
      // scroll ke slider (smooth, khusus mobile)
      if (window.innerWidth < 768) {
        document.getElementById("sliderWrapper").scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }

    // ── INIT ──────────────────────────────────────────────────────────────────
    buildTabs();
    buildSlider("jurnalistik");
    buildInfo("jurnalistik");