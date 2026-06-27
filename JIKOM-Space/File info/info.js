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

// Mobile menu
document.getElementById("menuBtn").addEventListener("click", () => {
  const m = document.getElementById("mobileMenu");
  m.style.display = m.style.display === "none" ? "block" : "none";
});

// Tab switcher
function switchTab(tab) {
  const btnK = document.getElementById("tabKemahasiswaan");
  const btnP = document.getElementById("tabPengajar");
  const pageK = document.getElementById("pageKemahasiswaan");
  const pageP = document.getElementById("pagePengajar");
  const pageV = document.getElementById("pageVerifikasi");

  if (tab === "kemahasiswaan") {
    btnK.classList.add("active");
    btnP.classList.remove("active");
    pageK.classList.remove("content-hidden");
    pageP.classList.add("content-hidden");
    if (pageV) pageV.classList.add("content-hidden");
  } else {
    btnP.classList.add("active");
    btnK.classList.remove("active");

    // Periksa status verifikasi NIM di sessionStorage
    const isVerified = sessionStorage.getItem("jikom_verified") === "true";
    if (isVerified) {
      pageP.classList.remove("content-hidden");
      if (pageV) pageV.classList.add("content-hidden");
    } else {
      if (pageV) pageV.classList.remove("content-hidden");
      pageP.classList.add("content-hidden");
    }
    pageK.classList.add("content-hidden");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// NIM Templates Whitelist (Bisa diisi manual, total 7 template)
const ALLOWED_NIM_TEMPLATES = [
  "210306", // Template 1 (aktif/berhasil sesuai contoh)
  "210301", // Template 2
  "210302", // Template 3
  "210303", // Template 4
  "210304", // Template 5
  "210305", // Template 6
  "210307"  // Template 7
];

// Hanya izinkan input berupa angka di input field NIM
const nimInputField = document.getElementById("nimInputField");
if (nimInputField) {
  nimInputField.addEventListener("input", function (e) {
    this.value = this.value.replace(/\D/g, "");
  });
}

// Event listener untuk form verifikasi NIM
const nimVerificationForm = document.getElementById("nimVerificationForm");
if (nimVerificationForm) {
  nimVerificationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const nimInput = document.getElementById("nimInputField").value.trim();
    const errorMsg = document.getElementById("nimVerificationError");

    // Validasi format: NIM harus tepat 10 digit
    const isTenDigits = /^\d{10}$/.test(nimInput);
    if (!isTenDigits) {
      errorMsg.textContent = "NIM harus terdiri dari 10 digit angka!";
      errorMsg.classList.remove("hidden");
      return;
    }

    // Validasi kecocokan dengan daftar template prefix
    const isAllowed = ALLOWED_NIM_TEMPLATES.some(template => nimInput.startsWith(template));

    if (isAllowed) {
      errorMsg.classList.add("hidden");
      sessionStorage.setItem("jikom_verified", "true");

      // Tampilkan halaman pengajar secara langsung
      const pageP = document.getElementById("pagePengajar");
      const pageV = document.getElementById("pageVerifikasi");
      pageV.classList.add("content-hidden");
      pageP.classList.remove("content-hidden");

      // Reset field input
      document.getElementById("nimInputField").value = "";
    } else {
      errorMsg.textContent = "NIM tidak terdaftar atau tidak memiliki akses!";
      errorMsg.classList.remove("hidden");
    }
  });
}

// Fungsi untuk memutar video dengan tombol Tutup (X)
function playFullScreenVideo(src) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    background: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
    background: rgba(255,255,255,0.2);
    color: #fff;
    border: none;
    border-radius: 50%;
    font-size: 32px;
    cursor: pointer;
    z-index: 10001;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  `;
  closeBtn.onmouseover = () => closeBtn.style.background = 'rgba(255,255,255,0.3)';
  closeBtn.onmouseout = () => closeBtn.style.background = 'rgba(255,255,255,0.2)';

  const video = document.createElement('video');
  video.src = src;
  video.controls = true;
  video.autoplay = true;
  video.style.maxWidth = '100%';
  video.style.maxHeight = '100%';

  const closeAction = () => {
    video.pause();
    overlay.remove();
    if (document.fullscreenElement) document.exitFullscreen();
  };

  closeBtn.onclick = closeAction;

  overlay.appendChild(closeBtn);
  overlay.appendChild(video);
  document.body.appendChild(overlay);

  // Minta Fullscreen jika didukung
  if (overlay.requestFullscreen) {
    overlay.requestFullscreen().catch(() => { });
  }
}


tailwind.config = {
      theme: {
        extend: {
          colors: { primary: "#ff7a00" },
          fontFamily: { sans: ["Inter", "ui-sans-serif"] },
        },
      },
    };