window.daftarKarya = [];
window.daftarPublish = [];

async function loadPublicData() {
  try {
    const resK = await fetch('/api/karya');
    const karya = await resK.json();
    window.daftarKarya = karya.reverse(); // Show newest first
    
    const resP = await fetch('/api/publish');
    const publish = await resP.json();
    window.daftarPublish = publish.reverse();
    
  } catch (e) {
    console.error("Gagal mengambil data dari API", e);
  } finally {
    // Beri tahu script lain bahwa data sudah siap
    document.dispatchEvent(new Event('dataReady'));
  }
}
loadPublicData();
