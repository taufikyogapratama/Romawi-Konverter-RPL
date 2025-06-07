-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 07 Jun 2025 pada 17.51
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `romawi_konverter`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `aturan_romawi`
--

CREATE TABLE `aturan_romawi` (
  `id` int(11) NOT NULL,
  `simbol` varchar(5) NOT NULL,
  `nilai` int(11) NOT NULL,
  `urutan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `aturan_romawi`
--

INSERT INTO `aturan_romawi` (`id`, `simbol`, `nilai`, `urutan`) VALUES
(1, 'M', 1000, 1),
(2, 'CM', 900, 2),
(3, 'D', 500, 3),
(4, 'CD', 400, 4),
(5, 'C', 100, 5),
(6, 'XC', 90, 6),
(7, 'L', 50, 7),
(8, 'XL', 40, 8),
(9, 'X', 10, 9),
(10, 'IX', 9, 10),
(11, 'V', 5, 11),
(12, 'IV', 4, 12),
(13, 'I', 1, 13);

-- --------------------------------------------------------

--
-- Struktur dari tabel `riwayat`
--

CREATE TABLE `riwayat` (
  `riwayat_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `input_value` varchar(100) DEFAULT NULL,
  `input_type` varchar(10) DEFAULT NULL,
  `output` varchar(100) DEFAULT NULL,
  `tgl` datetime DEFAULT current_timestamp(),
  `aturan_id` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `riwayat`
--

INSERT INTO `riwayat` (`riwayat_id`, `user_id`, `input_value`, `input_type`, `output`, `tgl`, `aturan_id`) VALUES
(57, 7, '20', 'angka', 'XX', '2025-06-01 20:31:28', 1),
(58, 7, 'XIX', 'romawi', '19', '2025-06-01 20:31:49', 1),
(61, 9, '5', 'angka', 'V', '2025-06-01 20:33:52', 1),
(62, 9, 'XXX', 'romawi', '30', '2025-06-01 20:34:07', 1),
(63, 10, '22', 'angka', 'XXII', '2025-06-01 20:34:50', 1),
(64, 10, 'VIII', 'romawi', '8', '2025-06-01 20:34:57', 1),
(65, 8, '7', 'angka', 'VII', '2025-06-07 22:29:14', 1),
(66, 8, '2025', 'angka', 'MMXXV', '2025-06-07 22:31:27', 1),
(67, 8, 'MMM', 'romawi', '3000', '2025-06-07 22:32:57', 1),
(70, 8, '3666', 'angka', 'MMMDCLXVI', '2025-06-07 22:45:49', 1),
(71, 8, 'MMMDCLXVI', 'romawi', '3666', '2025-06-07 22:46:16', 1),
(72, 8, '5', 'angka', 'V', '2025-06-07 22:46:58', 1),
(73, 9, '3999', 'angka', 'MMMCMXCIX', '2025-06-07 22:47:45', 1),
(74, 8, '93', 'angka', 'XCIII', '2025-06-07 22:49:49', 1),
(75, 8, 'XLVI', 'romawi', '46', '2025-06-07 22:50:22', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`) VALUES
(7, 'alwisahri', 'Alwisahri123.'),
(8, 'rizkidimas', 'Rizkidimas123.'),
(9, 'taufikyoga', 'Taufikyoga123.'),
(10, 'ragilputra', 'Ragilputra123.');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `aturan_romawi`
--
ALTER TABLE `aturan_romawi`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `riwayat`
--
ALTER TABLE `riwayat`
  ADD PRIMARY KEY (`riwayat_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_aturan` (`aturan_id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `aturan_romawi`
--
ALTER TABLE `aturan_romawi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `riwayat`
--
ALTER TABLE `riwayat`
  MODIFY `riwayat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `riwayat`
--
ALTER TABLE `riwayat`
  ADD CONSTRAINT `fk_aturan` FOREIGN KEY (`aturan_id`) REFERENCES `aturan_romawi` (`id`),
  ADD CONSTRAINT `riwayat_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
