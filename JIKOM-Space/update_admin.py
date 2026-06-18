import re
import textwrap

with open(r'e:\JIKOM-Space\admin.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace Font
content = content.replace("family=Poppins", "family=Inter")
content = content.replace("'Poppins'", "'Inter'")

# 2. Add Lucide Icons script
lucide_script = '<script src="https://unpkg.com/lucide@latest"></script>\n<script>\n  lucide.createIcons();\n</script>\n</body>'
content = content.replace('</body>', lucide_script)

# 3. Replace Emojis with Lucide Icons
content = content.replace('🔐', '<i data-lucide="lock" class="w-6 h-6"></i>')
content = content.replace('<span class="icon">🎨</span>', '<i data-lucide="palette" class="w-5 h-5 mr-2" style="display:inline-block"></i>')
content = content.replace('<span class="icon">📰</span>', '<i data-lucide="newspaper" class="w-5 h-5 mr-2" style="display:inline-block"></i>')
content = content.replace('<span class="icon">⚙️</span>', '<i data-lucide="settings" class="w-5 h-5 mr-2" style="display:inline-block"></i>')
content = content.replace('<span class="icon">📖</span>', '<i data-lucide="book-open" class="w-5 h-5 mr-2" style="display:inline-block"></i>')
content = content.replace('＋ Tambah Karya', '<i data-lucide="plus" style="width:16px;height:16px;margin-right:4px;display:inline-block"></i> Tambah Karya')
content = content.replace('＋ Tambah Artikel', '<i data-lucide="plus" style="width:16px;height:16px;margin-right:4px;display:inline-block"></i> Tambah Artikel')
content = content.replace('⟳ Refresh Kode', '<i data-lucide="refresh-cw" style="width:16px;height:16px;margin-right:4px;display:inline-block"></i> Refresh Kode')
content = content.replace('💡', '<i data-lucide="lightbulb" style="width:20px;height:20px;display:inline-block;color:#f97316;margin-right:4px"></i>')
content = content.replace('🖼️', '<i data-lucide="image" style="width:20px;height:20px;display:inline-block;color:#334155;margin-right:4px"></i>')
content = content.replace('✍️', '<i data-lucide="pen-tool" style="width:20px;height:20px;display:inline-block;color:#334155;margin-right:4px"></i>')
content = content.replace('🚀', '<i data-lucide="rocket" style="width:20px;height:20px;display:inline-block;color:#334155;margin-right:4px"></i>')
content = content.replace('⚠️', '<i data-lucide="alert-triangle" style="width:20px;height:20px;display:inline-block;color:#334155;margin-right:4px"></i>')

content = content.replace('<div class="item-thumb-placeholder">🎨</div>', '<div class="item-thumb-placeholder"><i data-lucide="palette"></i></div>')
content = content.replace('<div class="item-thumb-placeholder">📰</div>', '<div class="item-thumb-placeholder"><i data-lucide="newspaper"></i></div>')

content = content.replace('✕', '<i data-lucide="x" style="width:20px;height:20px;display:inline-block"></i>')
content = content.replace('🖼 Sisipkan Gambar', '<i data-lucide="image" style="width:16px;height:16px;margin-right:4px;display:inline-block"></i> Sisipkan Gambar')

content = content.replace('<span class="align-icon">⬅️</span>', '<i data-lucide="align-left" style="width:20px;height:20px;margin-bottom:4px;display:inline-block"></i>')
content = content.replace('<span class="align-icon">➡️</span>', '<i data-lucide="align-right" style="width:20px;height:20px;margin-bottom:4px;display:inline-block"></i>')
content = content.replace('<span class="align-icon">↔️</span>', '<i data-lucide="align-center" style="width:20px;height:20px;margin-bottom:4px;display:inline-block"></i>')
content = content.replace('<span class="align-icon">⬛</span>', '<i data-lucide="maximize" style="width:20px;height:20px;margin-bottom:4px;display:inline-block"></i>')

# Remove any remaining emojis
content = re.sub(r'[⚙️📖🎨📰🔐＋⟳💡🖼️✍️🚀⚠️⬅️➡️↔️⬛]', '', content)

# 4. Remove HTML parts
html_tipe_karya = """        <!-- Tipe Karya -->
        <div class="form-group" id="tipeKaryaWrap">
          <label class="form-label">Tipe Karya</label>
          <select class="form-select" id="fTipeKarya">
            <option value="VIDEO">VIDEO</option>
            <option value="DESAIN">DESAIN</option>
            <option value="ARTIKEL">ARTIKEL</option>
            <option value="PODCAST">PODCAST</option>
            <option value="FOTO">FOTO</option>
            <option value="LAINNYA">LAINNYA</option>
          </select>
        </div>"""

html_tipe_publish = """        <!-- Tipe Publish -->
        <div class="form-group" id="tipePublishWrap" style="display:none">
          <label class="form-label">Label Tipe</label>
          <select class="form-select" id="fTipePublish">
            <option value="BERITA">BERITA</option>
            <option value="OPINI">OPINI</option>
            <option value="LIPUTAN">LIPUTAN</option>
          </select>
        </div>"""

html_link = """        <div class="form-group full">
          <label class="form-label">Link Karya / Artikel (opsional)</label>
          <input class="form-input" type="text" id="fLink" placeholder="https://..." />
        </div>"""

content = content.replace(html_tipe_karya, "")
content = content.replace(html_tipe_publish, "")
content = content.replace(html_link, "")

# 5. Remove JS parts
content = content.replace("document.getElementById('tipeKaryaWrap').style.display = type === 'karya' ? 'block' : 'none';", "")
content = content.replace("document.getElementById('tipePublishWrap').style.display = type === 'publish' ? 'block' : 'none';", "")

content = content.replace("document.getElementById('fLink').value = '';", "")
content = content.replace("document.getElementById('fLink').value = item.link || '';", "")

content = content.replace("document.getElementById('fTipeKarya').value = item.tipe || 'VIDEO';", "")
content = content.replace("document.getElementById('fTipePublish').value = item.tipe || 'BERITA';", "")

content = content.replace("const link = document.getElementById('fLink').value.trim();", "")

content = content.replace("const tipe = document.getElementById('fTipeKarya').value;", "")
content = content.replace("const newItem = { id: id || 'k-' + Date.now(), kategori, tipe, judul, penulis, tanggal, deskripsi, kontenLengkap, gambar, link };", "const newItem = { id: id || 'k-' + Date.now(), kategori, judul, penulis, tanggal, deskripsi, kontenLengkap, gambar };")

content = content.replace("const tipe = document.getElementById('fTipePublish').value;", "")
content = content.replace("const newItem = { id: id || 'p-' + Date.now(), kategori, tipe, judul, penulis, tanggal, deskripsi, kontenLengkap, gambar, link };", "const newItem = { id: id || 'p-' + Date.now(), kategori, judul, penulis, tanggal, deskripsi, kontenLengkap, gambar };")

# Generate Code parts
content = re.sub(r'\s*tipe: "\$\{k\.tipe\}",', '', content)
content = re.sub(r'\s*link: "\$\{escStr\(k\.link\)\}"', '', content)
content = content.replace('gambar: "${escStr(k.gambar)}",\n  }', 'gambar: "${escStr(k.gambar)}"\n  }')

content = re.sub(r'\s*tipe: "\$\{p\.tipe\}",', '', content)
content = re.sub(r'\s*link: "\$\{escStr\(p\.link\)\}"', '', content)
content = content.replace('gambar: "${escStr(p.gambar)}",\n  }', 'gambar: "${escStr(p.gambar)}"\n  }')

# Render list parts
content = re.sub(r'<span class="badge-type">\$\{k\.tipe\}</span>', '', content)
content = re.sub(r'<span class="badge-type">\$\{p\.tipe\}</span>', '', content)

# Fix Default DATA to remove tipe and link
content = re.sub(r'tipe:"[^"]+",\s*', '', content)
content = re.sub(r'tipe:\s*"[^"]+",\s*', '', content)
content = re.sub(r',\s*link:"[^"]+"', '', content)
content = re.sub(r',\s*link:\s*"[^"]+"', '', content)

# 6. Re-inject lucide createIcons to run on any list render
content = content.replace("renderKaryaList();\n  renderPublishList();", "renderKaryaList();\n  renderPublishList();\n  if (window.lucide) window.lucide.createIcons();")
content = content.replace("}).join('');\n}", "}).join('');\n  setTimeout(() => { if(window.lucide) window.lucide.createIcons(); }, 50);\n}")

# Update CSS Design
css_updates = """
    :root {
      --primary: #ff7a00;
      --primary-dark: #e56a00;
      --bg: #f8fafc;
      --surface: #ffffff;
      --border: #e2e8f0;
      --text: #0f172a;
      --muted: #64748b;
      --danger: #ef4444;
      --success: #22c55e;
    }
"""
content = re.sub(r':root\s*\{[^}]+\}', css_updates, content)

content = content.replace('background: #0b0f19;', 'background: #0d1b2f; background-image: radial-gradient(circle at 14% 18%, rgba(255, 122, 0, 0.1) 0 140px, transparent 280px);')
content = content.replace('background: #111827;', 'background: #ffffff; border: 1px solid #e2e8f0; box-shadow: 0 20px 40px rgba(0,0,0,0.1);')
content = content.replace('color: #fff;', 'color: #0f172a;')

# Fix the login btn and error text color to remain white/red respectively
content = content.replace('color: #0f172a;\n      border: none;\n      border-radius: 10px;\n      padding: 13px;\n      font-family: \'Inter\', sans-serif;\n      font-size: 14px;\n      font-weight: 600;\n      cursor: pointer;\n      transition: background 0.2s;\n      margin-top: 4px;\n    }', 'color: #fff;\n      border: none;\n      border-radius: 10px;\n      padding: 13px;\n      font-family: \'Inter\', sans-serif;\n      font-size: 14px;\n      font-weight: 600;\n      cursor: pointer;\n      transition: background 0.2s;\n      margin-top: 4px;\n    }')
content = content.replace('.login-logo {\n      width: 52px;\n      height: 52px;\n      background: var(--primary);', '.login-logo {\n      width: 52px;\n      height: 52px;\n      background: rgba(255,122,0,0.1);\n      color: var(--primary);')
content = content.replace('.login-input {\n      width: 100%;\n      background: #1e293b;\n      border: 1px solid #334155;\n      border-radius: 10px;\n      padding: 12px 16px;\n      color: #0f172a;', '.login-input {\n      width: 100%;\n      background: #f8fafc;\n      border: 1px solid #cbd5e1;\n      border-radius: 10px;\n      padding: 12px 16px;\n      color: #0f172a;')

content = content.replace('.item-card {\n      background: var(--surface);\n      border: 1px solid var(--border);\n      border-radius: 12px;\n      padding: 16px 20px;\n      display: flex;\n      align-items: center;\n      gap: 16px;\n      transition: border-color 0.2s;\n    }', '.item-card {\n      background: var(--surface);\n      border: 1px solid var(--border);\n      border-radius: 16px;\n      padding: 16px 20px;\n      display: flex;\n      align-items: center;\n      gap: 16px;\n      transition: all 0.2s;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.02);\n    }\n    .item-card:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }')

content = content.replace('.sidebar-item {\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      padding: 9px 10px;', '.sidebar-item {\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      padding: 12px 14px;')

content = content.replace('.btn-primary {\n      background: var(--primary);\n      color: #0f172a;', '.btn-primary {\n      background: var(--primary);\n      color: #ffffff;')

with open(r'e:\JIKOM-Space\admin.html', 'w', encoding='utf-8') as f:
    f.write(content)
