// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.style.display = mobileMenu.style.display === "none" ? "block" : "none";
  });
}

// ===== AUTH =====
    const USERS = { "fikar": "jikomspace1", "admin": "jikomspace2", "himapro": "jikomspace3" };

    function doLogin() {
      const u = document.getElementById('loginUser').value.trim();
      const p = document.getElementById('loginPass').value;
      if (USERS[u] && USERS[u] === p) {
        localStorage.setItem('jikom_auth', u);
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appScreen').style.display = 'block';
        document.getElementById('welcomeName').textContent = u;
        loadAll();
      } else {
        document.getElementById('loginError').style.display = 'block';
      }
    }

    function doLogout() {
      localStorage.removeItem('jikom_auth');
      location.reload();
    }

    document.getElementById('loginPass').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

    // Check session on load
    window.addEventListener('load', () => {
      const u = localStorage.getItem('jikom_auth');
      if (u && USERS[u]) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appScreen').style.display = 'block';
        document.getElementById('welcomeName').textContent = u;
        loadAll();
      }
    });

    // ===== DATA STORAGE =====
    let karyaData = [];
    let publishData = [];

    const DEFAULT_KARYA = [
      { id: "k-1", kategori: ["trending", "angkatan"], judul: "Dokumenter: Kehidupan Nelayan Kupang", penulis: "Maria Fernanda", tanggal: "28 August 2025", deskripsi: "Sebuah dokumenter mendalam tentang kehidupan nelayan pesisir Kupang dalam menghadapi perubahan iklim dan tantangan ekonomi modern.", kontenLengkap: "<p>Kupang, 28 Agustus 2025 – Perubahan iklim bukan lagi sekadar isu global yang dibahas di konferensi tingkat tinggi. Di pesisir Kupang, dampaknya telah menjadi kenyataan sehari-hari bagi komunitas nelayan tradisional.</p><p>Melalui dokumenter ini, kami menelusuri kehidupan keluarga nelayan yang harus beradaptasi dengan cuaca ekstrem dan pola musim tangkapan ikan yang semakin tidak menentu.</p>", gambar: "File karya/file karya/karya-1.jpg" },
      { id: "k-2", kategori: ["trending"], judul: "Poster Kampanye Literasi Digital", penulis: "Christina Lopo", tanggal: "15 August 2025", deskripsi: "Karya desain poster pemenang lomba kampanye literasi digital tingkat mahasiswa se-Provinsi NTT.", kontenLengkap: "<p>Desain poster kampanye literasi digital ini dibuat untuk mengikuti ajang kompetisi desain se-Nusa Tenggara Timur.</p>", gambar: "File karya/file karya/karya-3.jpg" },
      { id: "k-3", kategori: ["trending"], judul: "Infografis: Statistik Medsos Gen-Z NTT", penulis: "Agustina Kale", tanggal: "10 July 2025", deskripsi: "Visualisasi data komprehensif mengenai pola konsumsi media sosial di kalangan mahasiswa dan remaja Nusa Tenggara Timur.", kontenLengkap: "<p>Menganalisis dan memahami pola konsumsi konten sangatlah penting bagi pemasar digital dan edukator.</p>", gambar: "File karya/file karya/karya-5.jpg" },
      { id: "k-4", kategori: ["pilihan", "angkatan"], judul: "Opini: Transformasi Digital di NTT", penulis: "Yohanes Bere", tanggal: "02 June 2025", deskripsi: "Artikel opini yang mengkritisi sekaligus memberi solusi atas lambatnya pemerataan akses internet di daerah pelosok.", kontenLengkap: "<p>Kesenjangan digital masih menjadi PR besar di wilayah Indonesia Timur.</p>", gambar: "File karya/file karya/karya-2.jpg" },
      { id: "k-5", kategori: ["pilihan"], judul: "Suara Mahasiswa JIKOM Episode 5", penulis: "Rafael Taneo", tanggal: "18 May 2025", deskripsi: "Bincang santai bersama dosen tamu mengenai peluang karir mahasiswa Ilmu Komunikasi di era AI dan otomasi.", kontenLengkap: "<p>Episode ke-5 dari podcast Suara Mahasiswa JIKOM mengangkat fenomena AI yang mendisrupsi dunia kerja.</p>", gambar: "File karya/file karya/karya-4.jpg" },
      { id: "k-6", kategori: ["pilihan", "angkatan"], judul: "Video Essay: Budaya Ikat Timor", penulis: "Dominikus Luan", tanggal: "21 April 2025", deskripsi: "Esai visual yang menceritakan makna filosofis di balik setiap motif tenun ikat dari berbagai daerah di pulau Timor.", kontenLengkap: "<p>Tenun ikat lebih dari sekadar helaian kain; ini adalah identitas dan buku harian dari sebuah peradaban kuno.</p>", gambar: "File karya/file karya/karya-6.jpg" }
    ];

    const DEFAULT_PUBLISH = [
      { id: "p-1", kategori: ["berita"], tanggal: "28 November 2025", penulis: "Mey Oktaviany & Titin Mastri", judul: "Praktik Jurnalisme Online di KupangNews", deskripsi: "Mahasiswa JIKOM Undana belajar produksi berita online, penulisan cepat, dan etika jurnalistik langsung di redaksi.", kontenLengkap: "<p>Kupang – Pada pertengahan November lalu, sekelompok mahasiswa JIKOM Undana berkesempatan melakukan praktik kerja lapangan langsung di ruang redaksi KupangNews.</p>", gambar: "File publish/foto publish/publish-1.jpg" },
      { id: "p-2", kategori: ["opini"], tanggal: "12 April 2026", penulis: "Yohanes Bere", judul: "Mengapa Literasi Media Penting untuk Gen-Z?", deskripsi: "Kritik dan pandangan mahasiswa tentang pentingnya membaca berita dengan cermat dan bijak menanggapi disinformasi.", kontenLengkap: "<p>Generasi Z tumbuh di tengah era informasi yang melimpah ruah, sering kali informasi tersebut tidak melalui proses penyaringan jurnalistik yang ketat.</p>", gambar: "File publish/foto publish/publish-2.jpg" },
      { id: "p-3", kategori: ["liputan"], tanggal: "10 April 2026", penulis: "Rafael Taneo", judul: "Potret Aksi Mahasiswa dalam Kampanye Literasi", deskripsi: "Liputan lengkap kegiatan literasi digital yang digelar oleh JIKOM di berbagai titik kumpul komunitas Kupang.", kontenLengkap: "<p>Aksi nyata ditunjukkan oleh komunitas mahasiswa JIKOM Undana pada hari Minggu kemarin di Taman Nostalgia, Kupang.</p>", gambar: "File publish/foto publish/publish-3.jpg" },
      { id: "p-4", kategori: ["berita"], tanggal: "5 April 2026", penulis: "Agustina Kale", judul: "Mahasiswa JIKOM Raih Penghargaan Jurnalistik", deskripsi: "Cerita prestasi mahasiswa dalam lomba jurnalistik tingkat provinsi, mengangkat isu lingkungan pesisir.", kontenLengkap: "<p>Kabar gembira datang dari delegasi JIKOM Undana yang baru saja menjuarai kompetisi penulisan artikel jurnalistik tingkat provinsi.</p>", gambar: "File publish/foto publish/publish-4.jpg" },
      { id: "p-5", kategori: ["opini"], tanggal: "1 April 2026", penulis: "Dominikus Luan", judul: "AI dalam Jurnalistik: Ancaman atau Peluang?", deskripsi: "Refleksi mendalam mahasiswa mengenai peran kecerdasan buatan di meja redaksi media masa kini.", kontenLengkap: "<p>Sejak kemunculan model kecerdasan buatan generatif, industri media mulai bereksperimen dengan penulisan artikel otomatis.</p>", gambar: "File publish/foto publish/publish-5.jpg" }
    ];

    function loadAll() {
      const sk = localStorage.getItem('jikom_karya');
      const sp = localStorage.getItem('jikom_publish');
      karyaData = sk ? JSON.parse(sk) : JSON.parse(JSON.stringify(DEFAULT_KARYA));
      publishData = sp ? JSON.parse(sp) : JSON.parse(JSON.stringify(DEFAULT_PUBLISH));
      renderKaryaList();
      renderPublishList();
      if (window.lucide) window.lucide.createIcons();
    }

    function save() {
      localStorage.setItem('jikom_karya', JSON.stringify(karyaData));
      localStorage.setItem('jikom_publish', JSON.stringify(publishData));
    }

    // ===== TAB SWITCHING =====
    function switchTab(name, el) {
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
      document.getElementById('tab-' + name).classList.add('active');
      el.classList.add('active');
    }

    // ===== RENDER LISTS =====
    function renderKaryaList() {
      const el = document.getElementById('karyaList');
      if (!karyaData.length) { el.innerHTML = '<p style="color:var(--muted);font-size:13px;padding:16px 0">Belum ada karya. Klik "+ Tambah Karya".</p>'; return; }
      el.innerHTML = karyaData.map(k => `
    <div class="item-card">
      ${k.gambar && k.gambar.startsWith('http')
          ? `<img class="item-thumb" src="${k.gambar}" onerror="this.style.display='none'" />`
          : `<div class="item-thumb-placeholder"><i data-lucide="palette"></i></div>`}
      <div class="item-info">
        <div class="item-title">${k.judul}</div>
        <div class="item-meta">
          
          <span>${k.penulis}</span>
          <span>${k.tanggal}</span>
        </div>
      </div>
      <div class="item-actions">
        <button class="btn-edit" onclick="openModal('karya','${k.id}')">Edit</button>
      </div>
    </div>
  `).join('');
    }

    function renderPublishList() {
      const el = document.getElementById('publishList');
      if (!publishData.length) { el.innerHTML = '<p style="color:var(--muted);font-size:13px;padding:16px 0">Belum ada artikel. Klik "+ Tambah Artikel".</p>'; return; }
      el.innerHTML = publishData.map(p => `
    <div class="item-card">
      ${p.gambar && p.gambar.startsWith('http')
          ? `<img class="item-thumb" src="${p.gambar}" onerror="this.style.display='none'" />`
          : `<div class="item-thumb-placeholder"><i data-lucide="newspaper"></i></div>`}
      <div class="item-info">
        <div class="item-title">${p.judul}</div>
        <div class="item-meta">
          
          <span>${p.penulis}</span>
          <span>${p.tanggal}</span>
        </div>
      </div>
      <div class="item-actions">
        <button class="btn-edit" onclick="openModal('publish','${p.id}')">Edit</button>
      </div>
    </div>
  `).join('');
    }

    // ===== MODAL =====
    let currentType = 'karya';
    let savedRange = null;

    function openModal(type, id = null) {
      currentType = type;
      document.getElementById('editType').value = type;
      document.getElementById('editId').value = id || '';
      document.getElementById('modalTitle').textContent = id ? 'Edit ' + (type === 'karya' ? 'Karya' : 'Artikel') : 'Tambah ' + (type === 'karya' ? 'Karya' : 'Artikel');
      document.getElementById('deleteBtn').style.display = id ? 'block' : 'none';

      // Show/hide fields
      document.getElementById('kategoriKaryaWrap').style.display = type === 'karya' ? 'block' : 'none';

      document.getElementById('kategoriPublishWrap').style.display = type === 'publish' ? 'block' : 'none';


      // Reset
      document.getElementById('fJudul').value = '';
      document.getElementById('fPenulis').value = '';
      document.getElementById('fTanggal').value = '';
      document.getElementById('fGambar').value = '';

      document.getElementById('fDeskripsi').value = '';
      document.getElementById('richEditor').innerHTML = '';
      document.getElementById('thumbPreview').style.display = 'none';
      document.querySelectorAll('[name="kKat"]').forEach(cb => cb.checked = false);
      document.querySelectorAll('[name="pKat"]').forEach(cb => cb.checked = false);

      // Fill if editing
      if (id) {
        const item = type === 'karya' ? karyaData.find(k => k.id === id) : publishData.find(p => p.id === id);
        if (item) {
          document.getElementById('fJudul').value = item.judul || '';
          document.getElementById('fPenulis').value = item.penulis || '';
          document.getElementById('fTanggal').value = item.tanggal || '';
          document.getElementById('fGambar').value = item.gambar || '';

          document.getElementById('fDeskripsi').value = item.deskripsi || '';
          document.getElementById('richEditor').innerHTML = item.kontenLengkap || '';
          if (item.gambar && item.gambar.startsWith('http')) {
            const prev = document.getElementById('thumbPreview');
            prev.src = item.gambar;
            prev.style.display = 'block';
          }
          if (type === 'karya') {
            (item.kategori || []).forEach(k => {
              const cb = document.querySelector(`[name="kKat"][value="${k}"]`);
              if (cb) cb.checked = true;
            });

          } else {
            (item.kategori || []).forEach(k => {
              const cb = document.querySelector(`[name="pKat"][value="${k}"]`);
              if (cb) cb.checked = true;
            });

          }
        }
      }

      document.getElementById('modalOverlay').classList.add('open');
    }

    function closeModal() {
      document.getElementById('modalOverlay').classList.remove('open');
    }

    function saveItem() {
      const type = document.getElementById('editType').value;
      const id = document.getElementById('editId').value;
      const judul = document.getElementById('fJudul').value.trim();
      const penulis = document.getElementById('fPenulis').value.trim();
      const tanggal = document.getElementById('fTanggal').value.trim();
      const gambar = document.getElementById('fGambar').value.trim();

      const deskripsi = document.getElementById('fDeskripsi').value.trim();
      const kontenLengkap = document.getElementById('richEditor').innerHTML;

      if (!judul || !penulis || !tanggal) { toast('Judul, penulis, dan tanggal wajib diisi.'); return; }

      if (type === 'karya') {
        const kategori = Array.from(document.querySelectorAll('[name="kKat"]:checked')).map(cb => cb.value);

        const newItem = { id: id || 'k-' + Date.now(), kategori, judul, penulis, tanggal, deskripsi, kontenLengkap, gambar };
        if (id) { const i = karyaData.findIndex(k => k.id === id); if (i > -1) karyaData[i] = newItem; }
        else karyaData.unshift(newItem);
        save(); renderKaryaList();
      } else {
        const kategori = Array.from(document.querySelectorAll('[name="pKat"]:checked')).map(cb => cb.value);

        const newItem = { id: id || 'p-' + Date.now(), kategori, judul, penulis, tanggal, deskripsi, kontenLengkap, gambar };
        if (id) { const i = publishData.findIndex(p => p.id === id); if (i > -1) publishData[i] = newItem; }
        else publishData.unshift(newItem);
        save(); renderPublishList();
      }

      closeModal();
      toast('Tersimpan! Jangan lupa Generate data.js.');
    }

    function deleteItem() {
      const type = document.getElementById('editType').value;
      const id = document.getElementById('editId').value;
      if (!id) return;
      if (!confirm('Hapus item ini? Tidak bisa dibatalkan.')) return;
      if (type === 'karya') karyaData = karyaData.filter(k => k.id !== id);
      else publishData = publishData.filter(p => p.id !== id);
      save();
      if (type === 'karya') renderKaryaList(); else renderPublishList();
      closeModal();
      toast('Item dihapus.');
    }

    // ===== THUMBNAIL PREVIEW =====
    function previewThumb() {
      const url = document.getElementById('fGambar').value.trim();
      const prev = document.getElementById('thumbPreview');
      if (url.startsWith('http')) { prev.src = url; prev.style.display = 'block'; }
      else { prev.style.display = 'none'; }
    }

    // ===== RICH EDITOR =====
    function fmt(cmd) { document.execCommand(cmd, false, null); document.getElementById('richEditor').focus(); }

    function fmtBlock(tag) {
      document.getElementById('richEditor').focus();
      document.execCommand('formatBlock', false, tag);
    }

    // ===== IMAGE PICKER =====
    let selectedAlign = 'align-left';

    function openImgPicker() {
      savedRange = saveSelection();
      document.getElementById('imgUrl').value = '';
      document.getElementById('insertImgPreview').style.display = 'none';
      document.getElementById('imgSizeSlider').value = 50;
      document.getElementById('imgSizeVal').textContent = '50%';
      selectedAlign = 'align-left';
      document.querySelectorAll('.align-opt').forEach(o => o.classList.remove('selected'));
      document.querySelector('[data-align="align-left"]').classList.add('selected');
      document.getElementById('imgPickerOverlay').classList.add('open');
    }

    function closeImgPicker() {
      document.getElementById('imgPickerOverlay').classList.remove('open');
    }

    function switchImgTab(name, el) {
      document.querySelectorAll('.img-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.img-tab-panel').forEach(p => p.classList.remove('active'));
      el.classList.add('active');
      document.getElementById('imgTab-' + name).classList.add('active');
    }

    function selectAlign(el) {
      document.querySelectorAll('.align-opt').forEach(o => o.classList.remove('selected'));
      el.classList.add('selected');
      selectedAlign = el.dataset.align;
    }

    function previewInsertImg() {
      const url = document.getElementById('imgUrl').value.trim();
      const prev = document.getElementById('insertImgPreview');
      if (url.startsWith('http')) { prev.src = url; prev.style.display = 'block'; }
      else { prev.style.display = 'none'; }
    }

    function saveSelection() {
      const sel = window.getSelection();
      if (sel.rangeCount > 0) return sel.getRangeAt(0).cloneRange();
      return null;
    }

    function restoreSelection(range) {
      if (!range) return;
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }

    function insertImage() {
      const url = document.getElementById('imgUrl').value.trim();
      if (!url) { toast('Masukkan URL gambar dulu.'); return; }
      const size = document.getElementById('imgSizeSlider').value;

      closeImgPicker();

      const editor = document.getElementById('richEditor');
      editor.focus();
      if (savedRange) restoreSelection(savedRange);

      const img = document.createElement('img');
      img.src = url;
      img.className = selectedAlign;
      img.style.width = size + '%';
      img.onclick = function () { editImg(this); };

      // Wrap in clearfix div if float
      if (selectedAlign === 'align-left' || selectedAlign === 'align-right') {
        const wrap = document.createElement('div');
        wrap.className = 'clearfix';
        wrap.appendChild(img);
        document.execCommand('insertHTML', false, wrap.outerHTML);
      } else {
        document.execCommand('insertHTML', false, img.outerHTML);
      }

      // Re-bind click events on all images
      setTimeout(() => {
        editor.querySelectorAll('img').forEach(i => { i.onclick = function () { editImg(this); }; });
      }, 50);
    }

    function editImg(imgEl) {
      // Re-open picker with current values pre-filled
      savedRange = null;
      document.getElementById('imgUrl').value = imgEl.src;
      document.getElementById('insertImgPreview').src = imgEl.src;
      document.getElementById('insertImgPreview').style.display = 'block';

      const sizeVal = parseInt(imgEl.style.width) || 50;
      document.getElementById('imgSizeSlider').value = sizeVal;
      document.getElementById('imgSizeVal').textContent = sizeVal + '%';

      const alignClass = ['align-left', 'align-right', 'align-center', 'align-full'].find(c => imgEl.classList.contains(c)) || 'align-left';
      selectedAlign = alignClass;
      document.querySelectorAll('.align-opt').forEach(o => o.classList.remove('selected'));
      const matchOpt = document.querySelector(`[data-align="${alignClass}"]`);
      if (matchOpt) matchOpt.classList.add('selected');

      // Override insertImage to edit in-place
      const originalInsert = window.insertImage;
      window.insertImage = function () {
        const newUrl = document.getElementById('imgUrl').value.trim();
        const newSize = document.getElementById('imgSizeSlider').value;
        imgEl.src = newUrl;
        imgEl.style.width = newSize + '%';
        ['align-left', 'align-right', 'align-center', 'align-full'].forEach(c => imgEl.classList.remove(c));
        imgEl.className = selectedAlign;
        closeImgPicker();
        window.insertImage = originalInsert;
        toast('Gambar diperbarui.');
      };

      document.getElementById('imgPickerOverlay').classList.add('open');
    }

    // ===== GENERATE CODE =====
    function generateCode() {
      const escStr = s => (s || '').replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${');

      const kStr = karyaData.map(k => `  {
    id: "${k.id}",
    kategori: [${(k.kategori || []).map(c => `"${c}"`).join(', ')}],
    judul: "${escStr(k.judul)}",
    penulis: "${escStr(k.penulis)}",
    tanggal: "${escStr(k.tanggal)}",
    deskripsi: "${escStr(k.deskripsi)}",
    kontenLengkap: \`${escStr(k.kontenLengkap)}\`,
    gambar: "${escStr(k.gambar)}"
  }`).join(',\n');

      const pStr = publishData.map(p => `  {
    id: "${p.id}",
    kategori: [${(p.kategori || []).map(c => `"${c}"`).join(', ')}],
    tanggal: "${escStr(p.tanggal)}",
    penulis: "${escStr(p.penulis)}",
    judul: "${escStr(p.judul)}",
    deskripsi: "${escStr(p.deskripsi)}",
    kontenLengkap: \`${escStr(p.kontenLengkap)}\`,
    gambar: "${escStr(p.gambar)}"
  }`).join(',\n');

      const code = `// DATA KARYA\nconst daftarKarya = [\n${kStr}\n];\n\n// DATA PUBLISH\nconst daftarPublish = [\n${pStr}\n];`;
      document.getElementById('generatedCode').textContent = code;
      toast('Kode siap! Salin dan paste ke data.js di GitHub.');
    }

    function copyCode() {
      const text = document.getElementById('generatedCode').textContent;
      navigator.clipboard.writeText(text).then(() => toast('Kode berhasil disalin!'));
    }

    // ===== GDRIVE LINK GENERATOR =====
    function generateGdriveLink() {
      const input = document.getElementById('gdriveInput').value.trim();
      if (!input) {
        toast('Masukkan link Google Drive terlebih dahulu!');
        return;
      }

      let fileId = null;

      // Match /d/FILE_ID/
      const match1 = input.match(/\/d\/([a-zA-Z0-9_-]+)/);
      // Match id=FILE_ID
      const match2 = input.match(/id=([a-zA-Z0-9_-]+)/);

      if (match1 && match1[1]) {
        fileId = match1[1];
      } else if (match2 && match2[1]) {
        fileId = match2[1];
      }

      if (fileId) {
        const directLink = `https://lh3.googleusercontent.com/d/${fileId}`;
        document.getElementById('gdriveOutput').value = directLink;
        document.getElementById('gdrivePreview').src = directLink;
        document.getElementById('gdriveResultWrap').style.display = 'block';
        toast('Link berhasil digenerate!');
      } else {
        toast('Format link Google Drive tidak valid.');
        document.getElementById('gdriveResultWrap').style.display = 'none';
      }
    }

    function copyGdriveLink() {
      const output = document.getElementById('gdriveOutput');
      if (output.value) {
        output.select();
        navigator.clipboard.writeText(output.value).then(() => toast('Link gambar disalin!'));
      }
    }

    // ===== TOAST =====
    function toast(msg) {
      const el = document.getElementById('toast');
      el.textContent = msg;
      el.classList.add('show');
      setTimeout(() => el.classList.remove('show'), 3000);
    }

    // Close modals on overlay click
    document.getElementById('modalOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
    document.getElementById('imgPickerOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeImgPicker(); });

lucide.createIcons();