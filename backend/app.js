/*
Login req => username, password
Login res => ada atau tidak

Register req => username, password
Register res => berhasil jika belum ada di db

Home:
riwayat res => data riwayat

convert req => type, input
convert res => output
*/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error("Error saat login:", err);
            return res.status(500).json({ message: "Terjadi kesalahan server" });
        }

        if (results.length > 0) {
            const userId = results[0].id;
            res.send({
                pesan: "ada",
                user_id: userId
            });
        } else {
            res.send({
                pesan: "tidak ada"
            });
        }
    });
});

app.post("/registrasi", (req, res) => {
    const { username, password } = req.body;
    const sqlCek = "SELECT * FROM user WHERE username = ? AND password = ?";
    const sqlInsert = "INSERT INTO user (username, password) VALUES (?,?)"
    db.query(sqlCek, [username, password], (err, results) => {
        if (err) {
            console.error("Error saat login:", err);
            return res.status(500).json({ message: "Terjadi kesalahan server" });
        }

        if (results.length > 0) {
            res.send({
                pesan: "sudah ada"
            });
        } else {
            db.query(sqlInsert, [username, password], (errInsert, resultInsert) => {
                if (errInsert) {
                    console.error("Error saat insert:", errInsert);
                    return res.status(500).json({ message: "Gagal menambahkan user" });
                }

                res.send({
                    pesan: "berhasil daftar"
                });
            });
        }
    });
})


app.post("/convert", (req, res) => {
    const { input, typeInput, userId } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Belum login" });
    }

    let output;

    const toRoman = (num) => {
        const roman = [
            ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
            ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
            ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]
        ];
        let result = "";
        for (let [r, v] of roman) {
            while (num >= v) {
                result += r;
                num -= v;
            }
        }
        return result;
    };

    const fromRoman = (roman) => {
        const map = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000};
        let result = 0;
        for (let i = 0; i < roman.length; i++) {
            let curr = map[roman[i]];
            let next = map[roman[i+1]];
            if (next > curr) {
                result += (next - curr);
                i++;
            } else {
                result += curr;
            }
        }
        return result;
    };

    if (typeInput === "angka") {
        const angka = parseInt(input);
        if (angka > 3999) {
            return res.status(400).json({ message: "Angka melebihi batas maksimal (3999)" });
        }
        output = toRoman(angka);
    } else if (typeInput === "romawi") {
        const hasil = fromRoman(input.toUpperCase());
        if (hasil > 3999) {
            return res.status(400).json({ message: "Angka hasil konversi melebihi batas maksimal (3999)" });
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

        res.send({
            riwayat: results
        });
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
})

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});