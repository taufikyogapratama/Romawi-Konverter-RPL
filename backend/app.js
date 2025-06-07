const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const ambilAturanRomawi = (callback) => {
    const sql = "SELECT simbol, nilai FROM aturan_romawi ORDER BY urutan ASC";
    db.query(sql, (err, results) => {
        if (err) return callback(err);
        const aturan = results.map(row => [row.simbol, row.nilai]);
        callback(null, aturan);
    });
};

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error("Error saat login:", err);
            return res.status(500).json({ message: "Terjadi kesalahan server" });
        }

        if (results.length > 0) {
            const userId = results[0].user_id;
            res.send({ pesan: "ada", user_id: userId });
        } else {
            res.send({ pesan: "tidak ada" });
        }
    });
});


app.post("/registrasi", (req, res) => {
    const { username, password } = req.body;
    const sqlCek = "SELECT * FROM user WHERE username = ? AND password = ?";
    const sqlInsert = "INSERT INTO user (username, password) VALUES (?,?)";

    db.query(sqlCek, [username, password], (err, results) => {
        if (err) {
            console.error("Error saat registrasi:", err);
            return res.status(500).json({ message: "Terjadi kesalahan server" });
        }

        if (results.length > 0) {
            res.send({ pesan: "sudah ada" });
        } else {
            db.query(sqlInsert, [username, password], (errInsert) => {
                if (errInsert) {
                    console.error("Error saat insert:", errInsert);
                    return res.status(500).json({ message: "Gagal menambahkan user" });
                }

                res.send({ pesan: "berhasil daftar" });
            });
        }
    });
});


app.post("/convert", (req, res) => {
    const { input, typeInput, userId } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Belum login" });
    }

    ambilAturanRomawi((err, aturan) => {
        if (err) {
            console.error("Gagal ambil aturan:", err);
            return res.status(500).json({ message: "Gagal ambil aturan konversi" });
        }

        let output;

        const toRoman = (num) => {
            let result = "";
            for (let [r, v] of aturan) {
                while (num >= v) {
                    result += r;
                    num -= v;
                }
            }
            return result;
        };

        const fromRoman = (roman) => {
            const map = Object.fromEntries(aturan.map(([simbol, nilai]) => [simbol, nilai]));
            let result = 0;
            let i = 0;
            while (i < roman.length) {
                let twoChar = roman.substring(i, i + 2).toUpperCase();
                let oneChar = roman.substring(i, i + 1).toUpperCase();
                if (map[twoChar]) {
                    result += map[twoChar];
                    i += 2;
                } else if (map[oneChar]) {
                    result += map[oneChar];
                    i += 1;
                } else {
                    return NaN;
                }
            }
            return result;
        };

        if (typeInput === "angka") {
            const angka = parseInt(input);
            if (angka > 3999) {
                return res.send({ message: "Angka melebihi batas maksimal (3999)" });
            }
            output = toRoman(angka);
        } else if (typeInput === "romawi") {
            const hasil = fromRoman(input);
            if (isNaN(hasil) || hasil > 3999) {
                return res.send({ message: "Angka hasil konversi tidak valid atau melebihi batas maksimal (3999)" });
            }
            output = hasil.toString();
        } else {
            return res.status(400).json({ message: "Tipe input tidak valid (angka/romawi)" });
        }

        const sqlInsert = `
            INSERT INTO riwayat (user_id, input_value, input_type, output)
            VALUES (?, ?, ?, ?)
        `;
        db.query(sqlInsert, [userId, input, typeInput, output], (errInsert) => {
            if (errInsert) {
                console.error("Gagal menyimpan riwayat:", errInsert);
                return res.status(500).json({ message: "Gagal menyimpan riwayat" });
            }

            res.send({
                input,
                output,
                message: "Konversi berhasil dan riwayat disimpan"
            });
        });
    });
});

app.post("/riwayat", (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: "User ID diperlukan" });
    }

    const sql = "SELECT * FROM riwayat WHERE user_id = ? ORDER BY tgl DESC";
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Gagal mengambil riwayat:", err);
            return res.status(500).json({ message: "Terjadi kesalahan saat mengambil riwayat" });
        }

        res.send({ riwayat: results });
    });
});


app.post("/clear_riwayat", (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: "User ID diperlukan" });
    }

    const sql = "DELETE FROM riwayat WHERE user_id = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Gagal menghapus riwayat:", err);
            return res.status(500).json({ message: "Terjadi kesalahan saat menghapus riwayat" });
        }

        res.send({
            message: "Semua riwayat berhasil dihapus",
            affectedRows: result.affectedRows
        });
    });
});

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});
