// ===== AUTH =====
const API_URL = '/api';

function getToken() {
  return localStorage.getItem('jikom_token');
}

function authHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': 'Bearer ' + token } : {})
  };
}

async function doLogin() {
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value;
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: u, password: p })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('jikom_token', data.token);
      localStorage.setItem('jikom_auth', data.username);
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('appScreen').style.display = 'block';
      document.getElementById('welcomeName').textContent = data.username;
      loadAll();
    } else {
      document.getElementById('loginError').textContent = data.error || 'Username atau password salah.';
      document.getElementById('loginError').style.display = 'block';
    }
  } catch (err) {
    console.error(err);
    document.getElementById('loginError').textContent = 'Koneksi ke server gagal.';
    document.getElementById('loginError').style.display = 'block';
  }
}

async function doLogout() {
  try {
    await fetch(`${API_URL}/logout`, { method: 'POST', headers: authHeaders() });
  } catch (err) { }
  localStorage.removeItem('jikom_token');
  localStorage.removeItem('jikom_auth');
  location.reload();
}

function checkSessionError(res, data) {
  if (res.status === 401 || res.status === 403) {
    alert(data.error || 'Sesi berakhir.');
    doLogout();
    return true;
  }
  return false;
}

window.addEventListener('load', () => {
  document.getElementById('loginPass').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

  const token = getToken();
  const u = localStorage.getItem('jikom_auth');
  if (token && u) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appScreen').style.display = 'block';
    document.getElementById('welcomeName').textContent = u;
    loadAll();
  }
});

// ===== DATA STORAGE =====
let karyaData = [];
let publishData = [];

async function loadAll() {
  try {
    const resK = await fetch(`${API_URL}/karya`);
    karyaData = await resK.json();
    karyaData.reverse(); // Show newest first
    
    const resP = await fetch(`${API_URL}/publish`);
    publishData = await resP.json();
    publishData.reverse();
    
    renderKaryaList();
    renderPublishList();
    if (window.lucide) window.lucide.createIcons();
  } catch (err) {
    console.error('Failed to load data', err);
    toast('Gagal memuat data dari server');
  }
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
  ${k.gambar
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
  if (window.lucide) window.lucide.createIcons();
}

function renderPublishList() {
  const el = document.getElementById('publishList');
  if (!publishData.length) { el.innerHTML = '<p style="color:var(--muted);font-size:13px;padding:16px 0">Belum ada artikel. Klik "+ Tambah Artikel".</p>'; return; }
  el.innerHTML = publishData.map(p => `
<div class="item-card">
  ${p.gambar
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
  if (window.lucide) window.lucide.createIcons();
}

async function loadAuditLogs() {
  const el = document.getElementById('auditList');
  el.innerHTML = '<p>Loading...</p>';
  try {
    const res = await fetch(`${API_URL}/audit`, { headers: authHeaders() });
    const data = await res.json();
    if (checkSessionError(res, data)) return;
    
    if (!data.length) { el.innerHTML = '<p style="color:var(--muted);font-size:13px;">Belum ada log aktivitas.</p>'; return; }
    
    el.innerHTML = data.map(log => `
      <div style="background:var(--card-bg); padding:12px; border-radius:8px; border:1px solid var(--border); font-size:14px;">
        <div style="font-weight:600; color:var(--text); margin-bottom:4px;">
          ${log.username} <span style="color:var(--primary)">${log.action}</span> ${log.item_type}
        </div>
        <div style="font-size:12px; color:var(--muted)">ID: ${log.item_id} • Waktu: ${new Date(log.timestamp).toLocaleString()}</div>
      </div>
    `).join('');
  } catch (err) {
    el.innerHTML = '<p style="color:red">Gagal memuat log.</p>';
  }
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

  document.getElementById('kategoriKaryaWrap').style.display = type === 'karya' ? 'block' : 'none';
  document.getElementById('kategoriPublishWrap').style.display = type === 'publish' ? 'block' : 'none';

  document.getElementById('fJudul').value = '';
  document.getElementById('fPenulis').value = '';
  document.getElementById('fTanggal').value = '';
  document.getElementById('fGambar').value = '';
  document.getElementById('fDeskripsi').value = '';
  document.getElementById('richEditor').innerHTML = '';
  document.getElementById('thumbPreview').style.display = 'none';
  document.querySelectorAll('[name="kKat"]').forEach(cb => cb.checked = false);
  document.querySelectorAll('[name="pKat"]').forEach(cb => cb.checked = false);

  if (id) {
    const item = type === 'karya' ? karyaData.find(k => k.id === id) : publishData.find(p => p.id === id);
    if (item) {
      document.getElementById('fJudul').value = item.judul || '';
      document.getElementById('fPenulis').value = item.penulis || '';
      document.getElementById('fTanggal').value = item.tanggal || '';
      document.getElementById('fGambar').value = item.gambar || '';
      document.getElementById('fDeskripsi').value = item.deskripsi || '';
      document.getElementById('richEditor').innerHTML = item.kontenLengkap || '';
      if (item.gambar) {
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

async function saveItem() {
  const type = document.getElementById('editType').value;
  const id = document.getElementById('editId').value;
  const judul = document.getElementById('fJudul').value.trim();
  const penulis = document.getElementById('fPenulis').value.trim();
  const tanggal = document.getElementById('fTanggal').value.trim();
  const gambar = document.getElementById('fGambar').value.trim();
  const deskripsi = document.getElementById('fDeskripsi').value.trim();
  const kontenLengkap = document.getElementById('richEditor').innerHTML;

  if (!judul || !penulis || !tanggal) { toast('Judul, penulis, dan tanggal wajib diisi.'); return; }

  const kategori = Array.from(document.querySelectorAll(type === 'karya' ? '[name="kKat"]:checked' : '[name="pKat"]:checked')).map(cb => cb.value);
  const newItem = { id: id || (type === 'karya' ? 'k-' : 'p-') + Date.now(), kategori, judul, penulis, tanggal, deskripsi, kontenLengkap, gambar };

  const endpoint = `${API_URL}/${type}${id ? '/' + id : ''}`;
  const method = id ? 'PUT' : 'POST';

  try {
    const res = await fetch(endpoint, {
      method,
      headers: authHeaders(),
      body: JSON.stringify(newItem)
    });
    const data = await res.json();
    if (checkSessionError(res, data)) return;
    
    if (res.ok) {
      closeModal();
      toast('Berhasil disimpan!');
      loadAll(); // reload list
    } else {
      toast('Gagal: ' + (data.error || 'Unknown error'));
    }
  } catch (err) {
    toast('Terjadi kesalahan jaringan.');
  }
}

async function deleteItem() {
  const type = document.getElementById('editType').value;
  const id = document.getElementById('editId').value;
  if (!id) return;
  if (!confirm('Hapus item ini? Tidak bisa dibatalkan.')) return;
  
  try {
    const res = await fetch(`${API_URL}/${type}/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    const data = await res.json();
    if (checkSessionError(res, data)) return;
    
    if (res.ok) {
      closeModal();
      toast('Item dihapus.');
      loadAll();
    } else {
      toast('Gagal menghapus: ' + (data.error || 'Unknown error'));
    }
  } catch(err) {
    toast('Kesalahan jaringan.');
  }
}

// ===== THUMBNAIL PREVIEW =====
function previewThumb() {
  const url = document.getElementById('fGambar').value.trim();
  const prev = document.getElementById('thumbPreview');
  if (url) { prev.src = url; prev.style.display = 'block'; }
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

function previewInsertImg() {
  const u = document.getElementById('imgUrl').value.trim();
  const p = document.getElementById('insertImgPreview');
  if (u) { p.src = u; p.style.display = 'block'; }
  else { p.style.display = 'none'; }
}

function updateImgSize() {
  const v = document.getElementById('imgSizeSlider').value;
  document.getElementById('imgSizeVal').textContent = v + '%';
}

function selectAlign(el) {
  document.querySelectorAll('.align-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  selectedAlign = el.getAttribute('data-align');
}

function insertImg() {
  const u = document.getElementById('imgUrl').value.trim();
  const s = document.getElementById('imgSizeSlider').value;
  if (!u) { alert('URL kosong'); return; }
  restoreSelection(savedRange);
  document.getElementById('richEditor').focus();
  let floatStyle = ''; let margin = '';
  if (selectedAlign === 'align-left') { floatStyle = 'float:left;'; margin = 'margin:0 15px 10px 0;'; }
  if (selectedAlign === 'align-right') { floatStyle = 'float:right;'; margin = 'margin:0 0 10px 15px;'; }
  if (selectedAlign === 'align-center') { floatStyle = 'display:block;'; margin = 'margin:10px auto;'; }
  const html = `<img src="${u}" style="width:${s}%; ${floatStyle} ${margin} border-radius:8px;" alt="Image" />`;
  document.execCommand('insertHTML', false, html);
  closeImgPicker();
}

function saveSelection() {
  if (window.getSelection) {
    const sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) return sel.getRangeAt(0);
  } else if (document.selection && document.selection.createRange) {
    return document.selection.createRange();
  }
  return null;
}
function restoreSelection(range) {
  if (range) {
    if (window.getSelection) {
      const sel = window.getSelection();
      sel.removeAllRanges(); sel.addRange(range);
    } else if (document.selection && range.select) {
      range.select();
    }
  }
}

// ===== TOAST =====
function toast(msg) {
  const t = document.getElementById('toastMsg');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}