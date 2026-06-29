// ── URL APPS SCRIPT ──
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyvdtFCYlrfy0nvNO44PVwLBsCUQTqjRHfjvkFBY695sCRvB45pFFlddcZVrDwqKk1-Lg/exec";

// ── MOBILE MENU ──
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.style.display =
      mobileMenu.style.display === "none" ? "block" : "none";
    mobileMenu.classList.toggle("open");
  });
  document.querySelectorAll(".mobile-link").forEach((l) =>
    l.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      mobileMenu.style.display = "none";
    })
  );
}

// ── FLOATING BUTTONS ──
const btnAspirasi = document.getElementById("aspirasi-btn");
const btnWA = document.getElementById("wa-btn");

const handleExpand = (btn) => btn.classList.remove("collapsed");
const handleCollapse = (btn) => btn.classList.add("collapsed");

if (btnAspirasi) {
  btnAspirasi.addEventListener("click", (e) => {
    if (btnAspirasi.classList.contains("collapsed")) {
      e.preventDefault();
      handleExpand(btnAspirasi);
    }
  });
  btnAspirasi.addEventListener("mouseenter", () => handleExpand(btnAspirasi));
  btnAspirasi.addEventListener("mouseleave", () => {
    setTimeout(() => handleCollapse(btnAspirasi), 1500);
  });
}

if (btnWA) {
  btnWA.addEventListener("click", (e) => {
    if (btnWA.classList.contains("collapsed")) {
      e.preventDefault();
      handleExpand(btnWA);
    }
  });
  btnWA.addEventListener("mouseenter", () => handleExpand(btnWA));
  btnWA.addEventListener("mouseleave", () => {
    setTimeout(() => handleCollapse(btnWA), 1500);
  });
}

// ── COUNTER ANIMASI ──
document.addEventListener("DOMContentLoaded", () => {
  const animated = new WeakSet();

  const animateCounter = (el) => {
    if (animated.has(el)) return;
    animated.add(el);

    const rawTarget = (el.dataset.target || "0").toString();
    const match = rawTarget.match(/(\d+(?:\.\d+)?)(.*)/);
    const targetNum = match ? Number(match[1]) : 0;
    const suffix = match ? match[2] || "" : "";

    const duration = 1500;
    const steps = 60;
    const increment = targetNum / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        el.textContent = targetNum.toLocaleString("id-ID") + suffix;
        clearInterval(timer);
      } else {
        el.textContent =
          Math.floor(increment * step).toLocaleString("id-ID") + suffix;
      }
    }, duration / steps);
  };

  const allCounters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px -10px 0px" }
  );

  allCounters.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animateCounter(el);
    } else {
      observer.observe(el);
    }
  });
});

// ── TOMBOL JENIS SURAT ──
const suratBtns = document.querySelectorAll(".surat-btn");
const jenisSelect = document.querySelector('#berkasForm select[name="jenis"]');
suratBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    suratBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    if (jenisSelect) jenisSelect.value = btn.dataset.surat;
  });
});

// ── UPLOAD FILE ──
function handleFileChange(input) {
  const file = input.files[0];
  const preview = document.getElementById("filePreview");
  const fileName = document.getElementById("fileName");
  const fileLabel = document.getElementById("fileLabel");
  if (!file) {
    clearFile();
    return;
  }
  const allowed = ["application/pdf", "image/jpeg", "image/png"];
  if (!allowed.includes(file.type)) {
    alert("File harus berupa PDF, JPG, atau PNG.");
    input.value = "";
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    alert("Ukuran file maksimal 5MB.");
    input.value = "";
    return;
  }
  fileName.textContent = file.name;
  preview.classList.remove("hidden");
  fileLabel.textContent = "File terpilih — klik untuk ganti";
}

function clearFile() {
  const input = document.getElementById("fileBukti");
  if (input) input.value = "";
  const preview = document.getElementById("filePreview");
  const fileLabel = document.getElementById("fileLabel");
  if (preview) preview.classList.add("hidden");
  if (fileLabel) fileLabel.textContent = "Klik untuk pilih file atau drag & drop";
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── FORM SUBMIT ──
const berkasForm = document.getElementById("berkasForm");
if (berkasForm) {
  const successMsg = document.getElementById("berkasSuccessMsg");
  const errorMsg = document.getElementById("berkasErrorMsg");
  const kirimBtn = document.getElementById("kirimBtn");
  const btnText = document.getElementById("btnText");
  const spinner = document.getElementById("loadingSpinner");

  berkasForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nama = berkasForm.querySelector('[name="nama"]').value.trim();
    const nim = berkasForm.querySelector('[name="nim"]').value.trim();
    const email = berkasForm.querySelector('[name="email"]').value.trim();
    const jenis = berkasForm.querySelector('[name="jenis"]').value;
    const keterangan = berkasForm.querySelector('[name="keterangan"]').value.trim();
    const fileInput = document.getElementById("fileBukti");
    const file = fileInput && fileInput.files[0] ? fileInput.files[0] : null;

    if (!nama || !nim || !email || !jenis) {
      alert("Mohon lengkapi semua field yang wajib diisi (*).");
      return;
    }

    kirimBtn.disabled = true;
    btnText.textContent = "Mengirim...";
    spinner.classList.remove("hidden");
    successMsg.classList.add("hidden");
    errorMsg.classList.add("hidden");

    try {
      const payload = {
        nama,
        nim,
        email,
        jenis,
        keterangan,
        fileName: "",
        fileType: "",
        fileData: "",
      };

      if (file) {
        payload.fileName = file.name;
        payload.fileType = file.type;
        payload.fileData = await fileToBase64(file);
      }

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });

      berkasForm.reset();
      clearFile();
      suratBtns.forEach((b, i) => b.classList.toggle("active", i === 0));
      if (jenisSelect) jenisSelect.value = "";
      successMsg.classList.remove("hidden");
      setTimeout(() => successMsg.classList.add("hidden"), 6000);
    } catch (err) {
      console.error("Error:", err);
      errorMsg.classList.remove("hidden");
      setTimeout(() => errorMsg.classList.add("hidden"), 5000);
    } finally {
      kirimBtn.disabled = false;
      btnText.textContent = "Kirim Pengajuan";
      spinner.classList.add("hidden");
    }
  });
}

// ── FILTER KARYA ──
const karyaGrid = document.getElementById("karyaGrid");
const karyaItems = document.querySelectorAll(".showcase-item");
document.querySelectorAll("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    if (karyaGrid) {
      karyaGrid.classList.add("content-hidden");
      setTimeout(() => {
        const f = btn.dataset.filter;
        karyaItems.forEach((item) => {
          item.style.display = f === "all" || item.dataset.kind === f ? "" : "none";
        });
        karyaGrid.classList.remove("content-hidden");
      }, 160);
    }
  });
});

// ── BELAJAR TABS ──
const belajarData = {
  template: [
    { title: "Template CV Profesional", desc: "Desain CV modern untuk lamaran kerja", bg: "from-orange-200 to-orange-100" },
    { title: "Template Poster Seminar", desc: "Layout poster kegiatan akademik", bg: "from-orange-100 to-amber-100" },
    { title: "Template Instagram Feed", desc: "Format konten prodi yang konsisten", bg: "from-yellow-100 to-orange-100" },
    { title: "Template Presentasi Skripsi", desc: "Template sidang yang rapi dan jelas", bg: "from-orange-200 to-yellow-100" },
  ],
  modul: [
    { title: "Modul Dasar Jurnalistik", desc: "Konsep dasar liputan dan penulisan", bg: "from-green-200 to-green-100" },
    { title: "Modul Public Relations", desc: "Strategi komunikasi lembaga", bg: "from-green-100 to-emerald-100" },
    { title: "Modul Komunikasi Digital", desc: "Kampanye media sosial terukur", bg: "from-teal-100 to-green-100" },
    { title: "Modul Metode Riset", desc: "Teknik riset kuantitatif dan kualitatif", bg: "from-emerald-100 to-teal-100" },
  ],
  tutorial: [
    { title: "Tutorial Editing Video", desc: "Dasar editing untuk konten kampus", bg: "from-blue-200 to-blue-100" },
    { title: "Tutorial Canva Prodi", desc: "Desain konten visual yang seragam", bg: "from-blue-100 to-cyan-100" },
    { title: "Tutorial Podcast", desc: "Produksi audio untuk pamer karya", bg: "from-sky-100 to-blue-100" },
    { title: "Tutorial Presentasi", desc: "Teknik presentasi akademik efektif", bg: "from-cyan-100 to-sky-100" },
  ],
};

const belajarGrid = document.getElementById("belajarGrid");
const renderBelajar = (key) => {
  if (!belajarGrid) return;
  belajarGrid.classList.add("content-hidden");
  setTimeout(() => {
    belajarGrid.innerHTML = belajarData[key]
      .map(
        (item) => `
        <article class="card-lift bg-white rounded-2xl border p-5 min-h-[220px] flex flex-col">
          <div class="h-10 w-10 rounded-lg bg-gradient-to-br ${item.bg} mb-4"></div>
          <h3 class="font-semibold">${item.title}</h3>
          <p class="text-sm text-slate-500 mt-2 flex-1">${item.desc}</p>
          <button class="mt-4 w-full bg-primary text-white rounded-lg py-2 text-sm font-semibold clickable hover:bg-orange-600">Unduh</button>
        </article>`
      )
      .join("");
    belajarGrid.classList.remove("content-hidden");
  }, 160);
};

if (belajarGrid) {
  renderBelajar("template");
  document.querySelectorAll(".belajar-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".belajar-tab").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderBelajar(btn.dataset.belajar);
    });
  });
}

// ── KALENDER ──
const monthData = [
  {
    title: "April 2026",
    firstOffset: 3,
    days: 30,
    highlights: { 17: "bg-primary text-white", 20: "bg-yellow-100", 25: "bg-yellow-100" },
    events: [
      { title: "Seminar Nasional Komunikasi Digital", info: "20 Apr 2026 · Aula FISIP Undana", badge: "Seminar", badgeClass: "bg-red-100 text-red-600" },
      { title: "Deadline Proposal KKN", info: "25 Apr 2026 · Online via SIAKAD", badge: "Deadline", badgeClass: "bg-red-100 text-red-600" },
      { title: "Lomba Jurnalistik Mahasiswa", info: "27 Apr 2026 · Gedung Rektorat", badge: "Lomba", badgeClass: "bg-yellow-100 text-yellow-700" },
    ],
  },
  {
    title: "Mei 2026",
    firstOffset: 5,
    days: 31,
    highlights: { 5: "bg-primary text-white", 12: "bg-yellow-100", 28: "bg-yellow-100" },
    events: [
      { title: "Pelatihan Public Speaking", info: "5 Mei 2026 · Studio Komunikasi", badge: "Workshop", badgeClass: "bg-green-100 text-green-700" },
      { title: "Batas Revisi Skripsi", info: "12 Mei 2026 · Portal Akademik", badge: "Deadline", badgeClass: "bg-red-100 text-red-600" },
      { title: "Pameran Karya Mahasiswa", info: "28 Mei 2026 · Hall FISIP", badge: "Pameran", badgeClass: "bg-yellow-100 text-yellow-700" },
    ],
  },
];

let monthIndex = 0;
const weekday = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const renderCalendar = () => {
  const calendarTitle = document.getElementById("calendarTitle");
  const calendarDays = document.getElementById("calendarDays");
  const eventList = document.getElementById("eventList");
  if (!calendarTitle || !calendarDays || !eventList) return;

  const m = monthData[monthIndex];
  calendarTitle.textContent = m.title;

  const cells = [];
  weekday.forEach((d) => cells.push(`<span class="font-medium py-1">${d}</span>`));
  for (let i = 0; i < m.firstOffset; i++) cells.push("<span></span>");
  for (let d = 1; d <= m.days; d++) {
    const cls = m.highlights[d]
      ? `${m.highlights[d]} rounded-lg py-1 font-semibold`
      : "py-1";
    cells.push(`<span class="${cls}">${d}</span>`);
  }
  calendarDays.innerHTML = cells.join("");

  eventList.innerHTML = m.events
    .map(
      (ev) => `
      <div class="border rounded-xl p-3 flex items-center justify-between gap-3">
        <div><p class="font-semibold text-sm">${ev.title}</p><p class="text-xs text-slate-500 mt-0.5">${ev.info}</p></div>
        <span class="text-xs px-3 py-1 rounded-full whitespace-nowrap ${ev.badgeClass}">${ev.badge}</span>
      </div>`
    )
    .join("");
};

const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
if (prevMonth) {
  prevMonth.addEventListener("click", () => {
    monthIndex = (monthIndex - 1 + monthData.length) % monthData.length;
    renderCalendar();
  });
}
if (nextMonth) {
  nextMonth.addEventListener("click", () => {
    monthIndex = (monthIndex + 1) % monthData.length;
    renderCalendar();
  });
}
renderCalendar();

// ── CHECKLIST ──
const checkItems = Array.from(document.querySelectorAll(".check-item"));
const checkMarks = Array.from(document.querySelectorAll(".check-mark"));
const checkProgress = document.getElementById("checkProgress");
const nextCheckBtn = document.getElementById("nextCheckBtn");

if (nextCheckBtn && checkItems.length > 0) {
  let completedCount = 0;

  const renderChecklist = () => {
    checkProgress.textContent = `${completedCount}/${checkItems.length} selesai`;
    checkMarks.forEach((mark, i) => {
      const done = i < completedCount;
      mark.textContent = done ? "✓" : "";
      mark.className = done
        ? "check-mark w-5 h-5 rounded-full border border-primary bg-primary text-white flex items-center justify-center text-[11px]"
        : "check-mark w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[11px]";
    });
    checkItems.forEach((item, i) => {
      item.classList.toggle("text-slate-400", i < completedCount);
      item.classList.toggle("line-through", i < completedCount);
    });
    nextCheckBtn.textContent =
      completedCount >= checkItems.length
        ? "Semua Langkah Selesai ✓"
        : "Tandai Langkah Berikutnya";
    nextCheckBtn.disabled = completedCount >= checkItems.length;
    nextCheckBtn.classList.toggle("opacity-60", completedCount >= checkItems.length);
  };

  nextCheckBtn.addEventListener("click", () => {
    if (completedCount < checkItems.length) {
      completedCount++;
      renderChecklist();
    }
  });

  checkItems.forEach((item, idx) => {
    item.addEventListener("click", () => {
      if (idx === completedCount) completedCount++;
      else if (idx + 1 === completedCount) completedCount--;
      renderChecklist();
    });
  });

  renderChecklist();
}