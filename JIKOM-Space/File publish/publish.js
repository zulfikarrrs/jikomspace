tailwind.config = {
      theme: {
        extend: {
          colors: { primary: "#ff7a00" },
          fontFamily: { sans: ["Poppins", "ui-sans-serif"] },
        },
      },
    };

// Expand saat klik atau hover
    const btnAspirasi = document.getElementById('aspirasi-btn');
    const btnWA = document.getElementById('wa-btn');

    const handleExpand = (btn) => {
      if (btn.classList.contains('collapsed')) {
        btn.classList.remove('collapsed');
      }
    };

    const handleCollapse = (btn) => {
      if (!btn.classList.contains('collapsed')) {
        btn.classList.add('collapsed');
      }
    };

    // Click behavior (terutama untuk mobile)
    btnAspirasi.addEventListener('click', (e) => {
      if (btnAspirasi.classList.contains('collapsed')) {
        e.preventDefault();
        handleExpand(btnAspirasi);
      }
    });

    btnWA.addEventListener('click', (e) => {
      if (btnWA.classList.contains('collapsed')) {
        e.preventDefault();
        handleExpand(btnWA);
      }
    });

    // Desktop hover behavior
    btnAspirasi.addEventListener('mouseenter', () => handleExpand(btnAspirasi));
    btnAspirasi.addEventListener('mouseleave', () => {
      setTimeout(() => handleCollapse(btnAspirasi), 1500);
    });

    btnWA.addEventListener('mouseenter', () => handleExpand(btnWA));
    btnWA.addEventListener('mouseleave', () => {
      setTimeout(() => handleCollapse(btnWA), 1500);
    });

document.getElementById("menuBtn").addEventListener("click", () => {
      const m = document.getElementById("mobileMenu");
      m.style.display = m.style.display === "none" ? "block" : "none";
    });
    const filterBtns = document.querySelectorAll(".sidebar-link");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        
        const grid = document.getElementById("publishGrid");
        const pagination = document.getElementById("paginationContainer");
        if(grid) grid.style.opacity = "0";
        if(pagination) pagination.style.opacity = "0";
        
        setTimeout(() => {
          renderPublish(f, 1);
          if(grid) grid.style.opacity = "1";
          if(pagination) pagination.style.opacity = "1";
        }, 180);
      });
    });

    // DATA PUBLISH dipindahkan ke data.js

    function parseDateToParts(dateString) {
      // Mengharapkan format "DD Month YYYY", contoh: "28 November 2025"
      const parts = dateString.split(" ");
      if(parts.length >= 2) {
        return { day: parts[0], month: parts[1].substring(0,3) };
      }
      return { day: "01", month: "Jan" };
    }

    function renderSidebarPublish() {
      const recentSidebar = document.getElementById("recentSidebar");
      let recentHtml = "";
      daftarPublish.slice(0, 4).forEach(publish => {
        recentHtml += `
        <a href="../File detail/detail.html?type=publish&id=${publish.id}" class="flex gap-4 group items-start mb-2">
          <div class="w-[100px] h-[70px] rounded overflow-hidden shrink-0">
            <img src="${publish.gambar}" alt="" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div class="flex-1">
            <h4 class="text-[14px] font-semibold text-[#1e293b] group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1.5">${publish.judul}</h4>
            <div class="text-[12px] text-slate-400 font-medium">${publish.tanggal}</div>
          </div>
        </a>
        `;
      });
      recentSidebar.innerHTML = recentHtml;
    }

    function renderPublish(filter = "all", page = 1) {
      const grid = document.getElementById("publishGrid");
      const itemsPerPage = 3;
      
      const filtered = daftarPublish.filter(publish => {
        if (filter === "all") return true;
        return Array.isArray(publish.kategori) ? publish.kategori.includes(filter) : publish.kategori === filter;
      });
      
      const totalPages = Math.ceil(filtered.length / itemsPerPage);
      const start = (page - 1) * itemsPerPage;
      const paginatedItems = filtered.slice(start, start + itemsPerPage);

      let htmlContent = "";
      paginatedItems.forEach(publish => {
        const dateParts = parseDateToParts(publish.tanggal);

        htmlContent += `
        <article class="article-item block" data-kind="${Array.isArray(publish.kategori) ? publish.kategori.join(' ') : publish.kategori}">
          <div class="relative rounded-xl overflow-hidden mb-5 group">
            <a href="../File detail/detail.html?type=publish&id=${publish.id}" class="block w-full">
              <img src="${publish.gambar}" alt="${publish.judul}" class="w-full h-[320px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-500" />
            </a>
            <div class="absolute top-4 left-4 bg-primary text-white text-center rounded px-3 py-2 shadow-sm min-w-[55px]">
              <div class="font-bold text-lg leading-none mb-1">${dateParts.day}</div>
              <hr class="border-white/50 my-1.5" />
              <div class="text-[12px] font-medium leading-none uppercase tracking-wide">${dateParts.month}</div>
            </div>
          </div>
          
          <a href="../File detail/detail.html?type=publish&id=${publish.id}" class="block">
            <h2 class="text-[22px] md:text-[24px] font-bold text-[#1e293b] mb-3 hover:text-primary transition-colors leading-snug">${publish.judul}</h2>
          </a>
          
          <div class="flex items-center gap-2 text-[13px] text-slate-500 mb-4 font-medium">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
            <span>${publish.tanggal}</span>
            <span class="mx-1 text-slate-300">|</span>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            <span>${publish.penulis}</span>
          </div>
          
          <p class="text-slate-500 mb-5 leading-[1.8] text-[15px]">
            ${publish.deskripsi}
          </p>
          
          <a href="../File detail/detail.html?type=publish&id=${publish.id}" class="text-primary font-medium text-[14px] hover:text-orange-600 transition-colors inline-flex items-center gap-1.5">
            Read More &rarr;
          </a>
        </article>
        `;
      });
      grid.innerHTML = htmlContent;

      renderPaginationPublish(totalPages, page, filter);
    }

    function renderPaginationPublish(totalPages, currentPage, currentFilter) {
      let container = document.getElementById("paginationContainer");
      if (!container) {
        container = document.createElement("div");
        container.id = "paginationContainer";
        container.className = "flex justify-start items-center gap-2 mt-8 mb-4 transition-opacity duration-200";
        document.getElementById("publishGrid").parentElement.appendChild(container);
      }
      
      if (totalPages <= 1) {
        container.innerHTML = "";
        return;
      }
      
      let html = "";
      for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage;
        const activeClass = isActive ? "bg-primary text-white border-primary" : "bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary";
        html += `<button onclick="changePagePublish('${currentFilter}', ${i})" class="w-10 h-10 rounded-full border flex items-center justify-center text-[15px] font-medium transition-colors ${activeClass}">${i}</button>`;
      }
      
      if (currentPage < totalPages) {
        html += `<button onclick="changePagePublish('${currentFilter}', ${currentPage + 1})" class="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary flex items-center justify-center transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>`;
      }
      
      container.innerHTML = html;
    }

    window.changePagePublish = function(filter, page) {
      const grid = document.getElementById("publishGrid");
      const pagination = document.getElementById("paginationContainer");
      if(grid) grid.style.opacity = "0";
      if(pagination) pagination.style.opacity = "0";
      setTimeout(() => {
        renderPublish(filter, page);
        if(grid) grid.style.opacity = "1";
        if(pagination) pagination.style.opacity = "1";
        
        const y = grid.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 180);
    };

    // Jalankan render awal
    renderSidebarPublish();
    renderPublish("all", 1);