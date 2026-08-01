const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const JWT_SECRET = 'jikom-space-secret-key';

// Helper: Audit Log
function addAuditLog(username, action, itemType, itemId) {
    db.run('INSERT INTO audit_logs (username, action, item_type, item_id) VALUES (?, ?, ?, ?)', [username, action, itemType, itemId]);
}

// Middleware: Authenticate & Single Device Check
function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });

        db.get('SELECT current_token, username FROM users WHERE id = ?', [decoded.id], (err, row) => {
            if (err || !row) return res.status(500).json({ error: 'Database error' });
            if (row.current_token !== token) {
                return res.status(403).json({ error: 'Sesi berakhir: Akun ini baru saja login di perangkat lain.' });
            }
            req.user = { id: decoded.id, username: row.username };
            next();
        });
    });
}

// --- AUTH API ---
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err || !user) return res.status(401).json({ error: 'Username atau password salah' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Username atau password salah' });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
        
        db.run('UPDATE users SET current_token = ? WHERE id = ?', [token, user.id], (err) => {
            if (err) return res.status(500).json({ error: 'Gagal update token' });
            res.json({ token, username: user.username });
        });
    });
});

app.post('/api/logout', authenticate, (req, res) => {
    db.run('UPDATE users SET current_token = NULL WHERE id = ?', [req.user.id], (err) => {
        res.json({ message: 'Logout berhasil' });
    });
});

// --- PUBLIC DATA API ---
app.get('/api/karya', (req, res) => {
    db.all('SELECT * FROM karya', (err, rows) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        rows.forEach(r => r.kategori = JSON.parse(r.kategori));
        res.json(rows);
    });
});

app.get('/api/publish', (req, res) => {
    db.all('SELECT * FROM publish', (err, rows) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        rows.forEach(r => r.kategori = JSON.parse(r.kategori));
        res.json(rows);
    });
});

// --- PROTECTED ADMIN API ---
// KARYA
app.post('/api/karya', authenticate, (req, res) => {
    const { id, kategori, judul, penulis, tanggal, deskripsi, kontenLengkap, gambar } = req.body;
    db.run('INSERT INTO karya (id, kategori, judul, penulis, tanggal, deskripsi, kontenLengkap, gambar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id, JSON.stringify(kategori), judul, penulis, tanggal, deskripsi, kontenLengkap, gambar], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            addAuditLog(req.user.username, 'Upload', 'Karya', id);
            res.json({ message: 'Berhasil tambah karya' });
        });
});

app.put('/api/karya/:id', authenticate, (req, res) => {
    const { kategori, judul, penulis, tanggal, deskripsi, kontenLengkap, gambar } = req.body;
    db.run('UPDATE karya SET kategori=?, judul=?, penulis=?, tanggal=?, deskripsi=?, kontenLengkap=?, gambar=? WHERE id=?',
        [JSON.stringify(kategori), judul, penulis, tanggal, deskripsi, kontenLengkap, gambar, req.params.id], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            addAuditLog(req.user.username, 'Edit', 'Karya', req.params.id);
            res.json({ message: 'Berhasil edit karya' });
        });
});

app.delete('/api/karya/:id', authenticate, (req, res) => {
    db.run('DELETE FROM karya WHERE id=?', [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        addAuditLog(req.user.username, 'Delete', 'Karya', req.params.id);
        res.json({ message: 'Berhasil hapus karya' });
    });
});

// PUBLISH
app.post('/api/publish', authenticate, (req, res) => {
    const { id, kategori, tanggal, penulis, judul, deskripsi, kontenLengkap, gambar } = req.body;
    db.run('INSERT INTO publish (id, kategori, tanggal, penulis, judul, deskripsi, kontenLengkap, gambar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id, JSON.stringify(kategori), tanggal, penulis, judul, deskripsi, kontenLengkap, gambar], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            addAuditLog(req.user.username, 'Upload', 'Publish', id);
            res.json({ message: 'Berhasil tambah artikel' });
        });
});

app.put('/api/publish/:id', authenticate, (req, res) => {
    const { kategori, tanggal, penulis, judul, deskripsi, kontenLengkap, gambar } = req.body;
    db.run('UPDATE publish SET kategori=?, tanggal=?, penulis=?, judul=?, deskripsi=?, kontenLengkap=?, gambar=? WHERE id=?',
        [JSON.stringify(kategori), tanggal, penulis, judul, deskripsi, kontenLengkap, gambar, req.params.id], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            addAuditLog(req.user.username, 'Edit', 'Publish', req.params.id);
            res.json({ message: 'Berhasil edit artikel' });
        });
});

app.delete('/api/publish/:id', authenticate, (req, res) => {
    db.run('DELETE FROM publish WHERE id=?', [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        addAuditLog(req.user.username, 'Delete', 'Publish', req.params.id);
        res.json({ message: 'Berhasil hapus artikel' });
    });
});

// AUDIT LOGS
app.get('/api/audit', authenticate, (req, res) => {
    db.all('SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 100', (err, rows) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(rows);
    });
});

// Fallback to index.html for unknown routes (SPA like behavior)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
