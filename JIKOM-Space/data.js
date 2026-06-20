// DATA KARYA
const daftarKarya = [
  {
    id: "k-1781963916304",
    kategori: [],
    judul: "test",
    penulis: "fikar",
    tanggal: "30 juni 2023",
    deskripsi: "test test 1 2 3",
    kontenLengkap: `g<div>h</div><div>k</div><div>j<img src="https://lh3.googleusercontent.com/d/1_2OGPAKLfIee1pHTT6as2i2WU4AukmPc" class="align-full" style="width: 50%;"></div>`,
    gambar: "https://lh3.googleusercontent.com/d/1_2OGPAKLfIee1pHTT6as2i2WU4AukmPc"
  },
  {
    id: "k-1",
    kategori: ["trending", "angkatan"],
    judul: "Dokumenter: Kehidupan Nelayan Kupang",
    penulis: "Maria Fernanda",
    tanggal: "28 August 2025",
    deskripsi: "Sebuah dokumenter mendalam tentang kehidupan nelayan pesisir Kupang dalam menghadapi perubahan iklim dan tantangan ekonomi modern.",
    kontenLengkap: `<p>Kupang, 28 Agustus 2025 – Perubahan iklim bukan lagi sekadar isu global yang dibahas di konferensi tingkat tinggi. Di pesisir Kupang, dampaknya telah menjadi kenyataan sehari-hari bagi komunitas nelayan tradisional.</p><p>Melalui dokumenter ini, kami menelusuri kehidupan keluarga nelayan yang harus beradaptasi dengan cuaca ekstrem dan pola musim tangkapan ikan yang semakin tidak menentu.</p>`,
    gambar: "file karya/karya-1.jpg"
  },
  {
    id: "k-2",
    kategori: ["trending"],
    judul: "Poster Kampanye Literasi Digital",
    penulis: "Christina Lopo",
    tanggal: "15 August 2025",
    deskripsi: "Karya desain poster pemenang lomba kampanye literasi digital tingkat mahasiswa se-Provinsi NTT.",
    kontenLengkap: `<p>Desain poster kampanye literasi digital ini dibuat untuk mengikuti ajang kompetisi desain se-Nusa Tenggara Timur.</p>`,
    gambar: "file karya/karya-3.jpg"
  },
  {
    id: "k-3",
    kategori: ["trending"],
    judul: "Infografis: Statistik Medsos Gen-Z NTT",
    penulis: "Agustina Kale",
    tanggal: "10 July 2025",
    deskripsi: "Visualisasi data komprehensif mengenai pola konsumsi media sosial di kalangan mahasiswa dan remaja Nusa Tenggara Timur.",
    kontenLengkap: `<p>Menganalisis dan memahami pola konsumsi konten sangatlah penting bagi pemasar digital dan edukator.</p>`,
    gambar: "file karya/karya-5.jpg"
  },
  {
    id: "k-4",
    kategori: ["pilihan", "angkatan"],
    judul: "Opini: Transformasi Digital di NTT",
    penulis: "Yohanes Bere",
    tanggal: "02 June 2025",
    deskripsi: "Artikel opini yang mengkritisi sekaligus memberi solusi atas lambatnya pemerataan akses internet di daerah pelosok.",
    kontenLengkap: `<p>Kesenjangan digital masih menjadi PR besar di wilayah Indonesia Timur.</p>`,
    gambar: "file karya/karya-2.jpg"
  },
  {
    id: "k-5",
    kategori: ["pilihan"],
    judul: "Suara Mahasiswa JIKOM Episode 5",
    penulis: "Rafael Taneo",
    tanggal: "18 May 2025",
    deskripsi: "Bincang santai bersama dosen tamu mengenai peluang karir mahasiswa Ilmu Komunikasi di era AI dan otomasi.",
    kontenLengkap: `<p>Episode ke-5 dari podcast Suara Mahasiswa JIKOM mengangkat fenomena AI yang mendisrupsi dunia kerja.</p>`,
    gambar: "file karya/karya-4.jpg"
  },
  {
    id: "k-6",
    kategori: ["pilihan", "angkatan"],
    judul: "Video Essay: Budaya Ikat Timor",
    penulis: "Dominikus Luan",
    tanggal: "21 April 2025",
    deskripsi: "Esai visual yang menceritakan makna filosofis di balik setiap motif tenun ikat dari berbagai daerah di pulau Timor.",
    kontenLengkap: `<p>Tenun ikat lebih dari sekadar helaian kain; ini adalah identitas dan buku harian dari sebuah peradaban kuno.</p>`,
    gambar: "file karya/karya-6.jpg"
  }
];

// DATA PUBLISH
const daftarPublish = [
  {
    id: "p-1",
    kategori: "berita",
    tanggal: "28 November 2025",
    penulis: "Mey Oktaviany & Titin Mastri",
    judul: "Praktik Jurnalisme Online di KupangNews",
    deskripsi: "Mahasiswa JIKOM Undana belajar produksi berita online, penulisan cepat, dan etika jurnalistik langsung di redaksi.",
    kontenLengkap: `<p>Kupang – Pada pertengahan November lalu, sekelompok mahasiswa JIKOM Undana berkesempatan melakukan praktik kerja lapangan langsung di ruang redaksi KupangNews.</p>`,
    gambar: "foto publish/publish-1.jpg"
  },
  {
    id: "p-2",
    kategori: "opini",
    tanggal: "12 April 2026",
    penulis: "Yohanes Bere",
    judul: "Mengapa Literasi Media Penting untuk Gen-Z?",
    deskripsi: "Kritik dan pandangan mahasiswa tentang pentingnya membaca berita dengan cermat dan bijak menanggapi disinformasi.",
    kontenLengkap: `<p>Generasi Z tumbuh di tengah era informasi yang melimpah ruah, sering kali informasi tersebut tidak melalui proses penyaringan jurnalistik yang ketat.</p>`,
    gambar: "foto publish/publish-2.jpg"
  },
  {
    id: "p-3",
    kategori: "liputan",
    tanggal: "10 April 2026",
    penulis: "Rafael Taneo",
    judul: "Potret Aksi Mahasiswa dalam Kampanye Literasi",
    deskripsi: "Liputan lengkap kegiatan literasi digital yang digelar oleh JIKOM di berbagai titik kumpul komunitas Kupang.",
    kontenLengkap: `<p>Aksi nyata ditunjukkan oleh komunitas mahasiswa JIKOM Undana pada hari Minggu kemarin di Taman Nostalgia, Kupang.</p>`,
    gambar: "foto publish/publish-3.jpg"
  },
  {
    id: "p-4",
    kategori: "berita",
    tanggal: "5 April 2026",
    penulis: "Agustina Kale",
    judul: "Mahasiswa JIKOM Raih Penghargaan Jurnalistik",
    deskripsi: "Cerita prestasi mahasiswa dalam lomba jurnalistik tingkat provinsi, mengangkat isu lingkungan pesisir.",
    kontenLengkap: `<p>Kabar gembira datang dari delegasi JIKOM Undana yang baru saja menjuarai kompetisi penulisan artikel jurnalistik tingkat provinsi.</p>`,
    gambar: "foto publish/publish-4.jpg"
  },
  {
    id: "p-5",
    kategori: "opini",
    tanggal: "1 April 2026",
    penulis: "Dominikus Luan",
    judul: "AI dalam Jurnalistik: Ancaman atau Peluang?",
    deskripsi: "Refleksi mendalam mahasiswa mengenai peran kecerdasan buatan di meja redaksi media masa kini.",
    kontenLengkap: `<p>Sejak kemunculan model kecerdasan buatan generatif, industri media mulai bereksperimen dengan penulisan artikel otomatis.</p>`,
    gambar: "foto publish/publish-5.jpg"
  }
];
