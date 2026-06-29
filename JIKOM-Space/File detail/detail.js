// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.style.display = mobileMenu.style.display === "none" ? "block" : "none";
  });
}

document.getElementById("menuBtn").addEventListener("click", () => {
      const m = document.getElementById("mobileMenu");
      m.style.display = m.style.display === "none" ? "block" : "none";
    });

    // Parse URL parameters
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type"); // "karya" or "publish"
    const id = params.get("id");

    // Find the data
    let item = null;
    let sourceList = [];
    let backHref = "karya.html";

    if (type === "karya") {
      sourceList = daftarKarya;
      backHref = "karya.html";
      item = daftarKarya.find(k => k.id === id);
    } else if (type === "publish") {
      sourceList = daftarPublish;
      backHref = "publish.html";
      item = daftarPublish.find(p => p.id === id);
    }

    if (item) {
      // Update page title
      document.title = item.judul + " — JIKOM Space";

      // Hero
      document.getElementById("heroImage").src = item.gambar;
      document.getElementById("heroImage").alt = item.judul;
      document.getElementById("heroDate").textContent = item.tanggal;
      document.getElementById("heroTitle").textContent = item.judul;

      // Meta
      document.getElementById("authorName").textContent = item.penulis;
      document.getElementById("dateFull").textContent = item.tanggal;

      // Content
      const contentEl = document.getElementById("articleContent");
      if (item.kontenLengkap) {
        contentEl.innerHTML = item.kontenLengkap;
      } else {
        contentEl.innerHTML = `<p>${item.deskripsi}</p>`;
      }

      // Back link
      document.getElementById("backLink").href = backHref;

      // Share button
      document.getElementById("shareBtn").addEventListener("click", () => {
        if (navigator.share) {
          navigator.share({ title: item.judul, url: window.location.href });
        } else {
          navigator.clipboard.writeText(window.location.href);
          alert("Link berhasil disalin!");
        }
      });

      // Sidebar: Kategori
      const kategoriContainer = document.getElementById("kategoriSidebar");
      const categories = type === "karya"
        ? ["Semua Karya", "Trending", "Pilihan Editor", "Per Angkatan"]
        : ["Semua Berita", "Berita", "Opini", "Liputan"];

      categories.forEach(cat => {
        const a = document.createElement("a");
        a.href = backHref;
        a.className = "sidebar-cat text-[15px] text-slate-600 hover:text-primary transition-colors";
        a.textContent = cat;
        kategoriContainer.appendChild(a);
      });

      // Sidebar: Related articles (4 items, excluding current)
      const relatedContainer = document.getElementById("relatedSidebar");
      const related = sourceList.filter(x => x.id !== id).slice(0, 4);
      related.forEach(r => {
        relatedContainer.innerHTML += `
        <a href="detail.html?type=${type}&id=${r.id}" class="flex gap-4 group items-start">
          <div class="w-[100px] h-[70px] rounded overflow-hidden shrink-0">
            <img src="${r.gambar}" alt="" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div class="flex-1">
            <h4 class="text-[14px] font-semibold text-[#1e293b] group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1.5">${r.judul}</h4>
            <div class="text-[12px] text-slate-400 font-medium">${r.tanggal}</div>
          </div>
        </a>`;
      });

    } else {
      // Item not found
      document.getElementById("heroSection").innerHTML = `
        <div class="flex items-center justify-center h-full">
          <div class="text-center text-white">
            <h1 class="text-3xl font-bold mb-4">Konten Tidak Ditemukan</h1>
            <p class="text-white/70 mb-6">Artikel yang Anda cari tidak tersedia.</p>
            <a href="index.html" class="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">Kembali ke Beranda</a>
          </div>
        </div>`;
    }