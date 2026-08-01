const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = process.env.DB_PATH || path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // Create Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            current_token TEXT
        )`);

        // Create Karya Table
        db.run(`CREATE TABLE IF NOT EXISTS karya (
            id TEXT PRIMARY KEY,
            kategori TEXT, -- JSON array string
            judul TEXT,
            penulis TEXT,
            tanggal TEXT,
            deskripsi TEXT,
            kontenLengkap TEXT,
            gambar TEXT
        )`);

        // Create Publish Table
        db.run(`CREATE TABLE IF NOT EXISTS publish (
            id TEXT PRIMARY KEY,
            kategori TEXT, -- JSON array string
            tanggal TEXT,
            penulis TEXT,
            judul TEXT,
            deskripsi TEXT,
            kontenLengkap TEXT,
            gambar TEXT
        )`);

        // Create Audit Logs Table
        db.run(`CREATE TABLE IF NOT EXISTS audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            action TEXT,
            item_type TEXT,
            item_id TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Create default admins if empty
        db.get('SELECT COUNT(*) as count FROM users', async (err, row) => {
            if (!err && row.count === 0) {
                const salt = await bcrypt.genSalt(10);
                const hashedPwd1 = await bcrypt.hash('admin123', salt);
                const hashedPwd2 = await bcrypt.hash('himapro123', salt);
                
                db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['admin', hashedPwd1]);
                db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['himapro', hashedPwd2]);
                console.log('Default users created (admin/admin123, himapro/himapro123).');
            }
        });
    });
}

module.exports = db;
