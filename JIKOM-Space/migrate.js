const fs = require('fs');
const path = require('path');
const db = require('./database');

const dataJsPath = path.resolve(__dirname, 'File admin', 'data.js');
let fileContent = fs.readFileSync(dataJsPath, 'utf8');

// Replace const to var to allow eval in local scope
fileContent = fileContent.replace(/const daftarKarya/g, 'var daftarKarya');
fileContent = fileContent.replace(/const daftarPublish/g, 'var daftarPublish');

// Evaluate the content to get the variables
eval(fileContent);

if (typeof daftarKarya === 'undefined' || typeof daftarPublish === 'undefined') {
    console.error("Failed to parse data.js");
    process.exit(1);
}

setTimeout(() => {
    db.serialize(() => {
        db.run('BEGIN TRANSACTION');

        const stmtKarya = db.prepare(`INSERT OR IGNORE INTO karya (id, kategori, judul, penulis, tanggal, deskripsi, kontenLengkap, gambar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
        for (const item of daftarKarya) {
            stmtKarya.run(item.id, JSON.stringify(item.kategori), item.judul, item.penulis, item.tanggal, item.deskripsi, item.kontenLengkap, item.gambar);
        }
        stmtKarya.finalize();

        const stmtPublish = db.prepare(`INSERT OR IGNORE INTO publish (id, kategori, tanggal, penulis, judul, deskripsi, kontenLengkap, gambar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
        for (const item of daftarPublish) {
            stmtPublish.run(item.id, JSON.stringify(item.kategori), item.tanggal, item.penulis, item.judul, item.deskripsi, item.kontenLengkap, item.gambar);
        }
        stmtPublish.finalize();

        db.run('COMMIT', (err) => {
            if (err) console.error("Migration error:", err);
            else console.log("Migration successful!");
            db.close();
        });
    });
}, 1000);
