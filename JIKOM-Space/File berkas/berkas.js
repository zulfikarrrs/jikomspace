tailwind.config = {
      theme: {
        extend: {
          colors: { primary: "#ff7a00" },
          fontFamily: { sans: ["Inter", "ui-sans-serif"] },
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

const SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbyvdtFCYlrfy0nvNO44PVwLBsCUQTqjRHfjvkFBY695sCRvB45pFFlddcZVrDwqKk1-Lg/exec";

    // Mobile menu
    document.getElementById("menuBtn").addEventListener("click", () => {
      const m = document.getElementById("mobileMenu");
      m.style.display = m.style.display === "none" ? "block" : "none";
    });

    // Surat buttons
    const suratBtns = document.querySelectorAll(".surat-btn");
    const jenisSelect = document.querySelector('select[name="jenis"]');
    suratBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        suratBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        jenisSelect.value = btn.dataset.surat;
      });
    });

    // File upload
    const dropZone = document.getElementById("fileDropZone");
    dropZone.addEventListener("mouseover", () => {
      dropZone.style.borderColor = "#ff7a00";
      dropZone.style.background = "#fff7f0";
    });
    dropZone.addEventListener("mouseout", () => {
      dropZone.style.borderColor = "#e2e8f0";
      dropZone.style.background = "";
    });

    // Toggle visibilitas Kode Akses
    function toggleKodeAksesVisibility() {
      const input = document.getElementById("kodeAksesInput");
      const icon = document.getElementById("eyeIcon");
      if (input.type === "password") {
        input.type = "text";
        // Ikon mata dicoret (hidden)
        icon.innerHTML = `
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>`;
      } else {
        input.type = "password";
        // Ikon mata terbuka
        icon.innerHTML = `
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>`;
      }
    }

    function handleFileChange(input) {
      const file = input.files[0];
      if (!file) {
        clearFile();
        return;
      }
      const allowed = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowed.includes(file.type)) {
        alert("File harus PDF, JPG, atau PNG.");
        input.value = "";
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file maksimal 5MB.");
        input.value = "";
        return;
      }
      document.getElementById("fileName").textContent = file.name;
      document.getElementById("filePreview").style.display = "flex";
      document.getElementById("fileLabel").textContent =
        "File terpilih — klik untuk ganti";
    }
    function clearFile() {
      document.getElementById("fileBukti").value = "";
      document.getElementById("filePreview").style.display = "none";
      document.getElementById("fileLabel").textContent =
        "Klik untuk pilih file atau drag & drop";
    }
    function fileToBase64(file) {
      return new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(",")[1]);
        r.onerror = rej;
        r.readAsDataURL(file);
      });
    }

    function setProgressStep(step) {
      const steps = [1, 2, 3];
      steps.forEach((i) => {
        const circle = document.getElementById("stepCircle" + i);
        const label = document.getElementById("stepLabel" + i);
        if (!circle || !label) return;
        if (i <= step) {
          circle.classList.add("active");
          label.classList.add("active");
        } else {
          circle.classList.remove("active");
          label.classList.remove("active");
        }
      });
      document
        .getElementById("stepLine1")
        .classList.toggle("active", step > 1);
      document
        .getElementById("stepLine2")
        .classList.toggle("active", step > 2);
    }

    // Dynamic Validation / Input Filtering for Nama Lengkap and NIM
    const namaInput = document.querySelector('input[name="nama"]');
    const nimInput = document.querySelector('input[name="nim"]');
    const namaError = document.getElementById("nama-error");
    const nimError = document.getElementById("nim-error");
    let namaTimeout = null;
    let nimTimeout = null;

    if (namaInput) {
      namaInput.addEventListener("input", function () {
        const originalVal = this.value;
        const cleanedVal = originalVal.replace(/[^a-zA-Z\s]/g, "");
        if (originalVal !== cleanedVal) {
          this.value = cleanedVal;
          if (namaError) {
            namaError.classList.remove("hidden");
            if (namaTimeout) clearTimeout(namaTimeout);
            namaTimeout = setTimeout(() => {
              namaError.classList.add("hidden");
            }, 3000);
          }
        }
      });
    }

    if (nimInput) {
      nimInput.addEventListener("input", function () {
        const originalVal = this.value;
        const cleanedVal = originalVal.replace(/[^0-9]/g, "");
        if (originalVal !== cleanedVal) {
          this.value = cleanedVal;
          if (nimError) {
            nimError.classList.remove("hidden");
            if (nimTimeout) clearTimeout(nimTimeout);
            nimTimeout = setTimeout(() => {
              nimError.classList.add("hidden");
            }, 3000);
          }
        }
      });
    }

    // Validasi real-time email @gmail.com
    const emailInput = document.querySelector('input[name="email"]');
    const emailError = document.getElementById("email-error");
    let emailTimeout = null;
    if (emailInput) {
      emailInput.addEventListener("blur", function () {
        const val = this.value.trim();
        if (val && !val.endsWith("@gmail.com")) {
          if (emailError) {
            emailError.classList.remove("hidden");
            if (emailTimeout) clearTimeout(emailTimeout);
            emailTimeout = setTimeout(() => emailError.classList.add("hidden"), 4000);
          }
        } else {
          if (emailError) emailError.classList.add("hidden");
        }
      });
    }

    document
      .getElementById("berkasForm")
      .addEventListener("submit", async function (e) {
        e.preventDefault();
        const nama = this.querySelector('[name="nama"]').value.trim();
        const nim = this.querySelector('[name="nim"]').value.trim();
        const email = this.querySelector('[name="email"]').value.trim();
        const jenis = this.querySelector('[name="jenis"]').value;
        const keterangan = this.querySelector(
          '[name="keterangan"]',
        ).value.trim();
        const fileInput = document.getElementById("fileBukti");
        const file = fileInput.files[0] || null;
        if (!nama || !nim || !email || !jenis) {
          alert("Mohon lengkapi semua field wajib (*).");
          return;
        }

        // Additional validation checks
        if (/[^a-zA-Z\s]/.test(nama)) {
          alert("Nama lengkap hanya boleh berisi huruf.");
          return;
        }
        if (/[^0-9]/.test(nim)) {
          alert("NIM hanya boleh berisi angka.");
          return;
        }
        if (!email.endsWith("@gmail.com")) {
          document.getElementById("email-error").classList.remove("hidden");
          document.querySelector('[name="email"]').focus();
          setTimeout(() => document.getElementById("email-error").classList.add("hidden"), 4000);
          return;
        }

        // Validasi template prefix NIM (sama dengan verifikasi di info.html)
        const ALLOWED_NIM_TEMPLATES = [
          "210306", // Template 1
          "210301", // Template 2
          "210302", // Template 3
          "210303", // Template 4
          "210304", // Template 5
          "210305", // Template 6
          "210307"  // Template 7
        ];
        const nimTemplateError = document.getElementById("nim-template-error");
        if (!ALLOWED_NIM_TEMPLATES.some(t => nim.startsWith(t))) {
          nimTemplateError.classList.remove("hidden");
          document.querySelector('[name="nim"]').focus();
          setTimeout(() => nimTemplateError.classList.add("hidden"), 4000);
          return;
        }
        nimTemplateError.classList.add("hidden");

        // Validasi Kode Akses (tidak dikirim ke spreadsheet)
        const kodeAkses = document.getElementById("kodeAksesInput").value;
        const VALID_KODE = "Fikar4J";
        const kodeError = document.getElementById("kode-error");
        if (kodeAkses !== VALID_KODE) {
          kodeError.classList.remove("hidden");
          document.getElementById("kodeAksesInput").focus();
          setTimeout(() => kodeError.classList.add("hidden"), 4000);
          return;
        }
        kodeError.classList.add("hidden");

        const btn = document.getElementById("kirimBtn");
        const btnText = document.getElementById("btnText");
        const btnProgress = document.getElementById("btnProgress");

        // UI Reset
        btn.disabled = true;
        btnText.textContent = "Mengirim...";
        btnProgress.style.width = "0%";
        document.getElementById("successMsg").style.display = "none";
        document.getElementById("errorMsg").style.display = "none";

        try {
          // Trigger progress bar animation (1s)
          setTimeout(() => {
            btnProgress.style.width = "100%";
          }, 50);

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

          // Use Promise.all to wait for both the fetch and at least 1 second of animation
          await Promise.all([
            fetch(SCRIPT_URL, {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "text/plain" },
              body: JSON.stringify(payload),
            }),
            new Promise((resolve) => setTimeout(resolve, 1100)), // slightly more than 1s to ensure visual completion
          ]);

          this.reset();
          clearFile();
          suratBtns.forEach((b, i) => b.classList.toggle("active", i === 0));
          jenisSelect.value = "";
          document.getElementById("successMsg").style.display = "block";
          setProgressStep(2);
          setTimeout(
            () =>
              (document.getElementById("successMsg").style.display = "none"),
            6000,
          );
        } catch (err) {
          console.error(err);
          document.getElementById("errorMsg").style.display = "block";
          setTimeout(
            () =>
              (document.getElementById("errorMsg").style.display = "none"),
            5000,
          );
        } finally {
          btn.disabled = false;
          btnText.textContent = "Kirim Pengajuan";
          btnProgress.style.width = "0";
        }
      });

    setProgressStep(1);