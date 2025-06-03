# Roman Converter API Spec

## Login
Endpoint : POST /login

Request Body :
```json
{
    "username" : "rizkidimas",
    "password" : "Rizkidimas123."
}
```

Response Body Success :
```json
{
    "pesan" : "ada",
    "user_id" : 3
}
```

Response Body Error :
```json
{
    "pesan": "tidak ada"
}
```

## Registrasi
Endpoint : POST /registrasi

Request Body :
```json
{
    "username" : "rizkidimas",
    "password" : "Rizkidimas123."
}
```

Response Body Success :
```json
{
    "pesan" : "berhasil daftar"
}
```

Response Body Error :
```json
{
    "pesan" : "sudah ada"
}
```

## convert
Endpoint : POST /convert

Request Body :
```json
{
    "input" : 8,
    "typeInput" : "angka",
    "userId" : 3
}
```
Response Body Success :
```json
{
    "input" : 8,
    "output" : "VIII",
    "message" : "Konversi berhasil dan riwayat disimpan"
}
```

Response Body Error jika belum login :
```json
{
    "message" : "Belum login"
}
```

Response Body Error jika input tidak sesuai kriteria :
```json
{
    "message" : "Tipe input tidak valid (angka/romawi)"
}
```

## riwayat
Endpoint : POST /riwayat

Request Body :
```json
{
    "userId" : 3
}
```

Response Body Success :
```json
{
    "riwayat" : results
}
```

Response Body Error :
```json
{
    "message" : "User ID diperlukan"
}
```

## clear_riwayat
Endpoint : POST /clear_riwayat

Request Body :
```json
{
    "userId" : 3
}
```

Response Body Success :
```json
{
    "message" : "Semua riwayat berhasil dihapus",
    "affectedRows" : 2
}
```

Response Body Error :
```json
{
    "message" : "Terjadi kesalahan saat menghapus riwayat"
}
```