/* =========================================================
   Tukang AC - script.js
   ========================================================= */

// Ganti nomor ini dengan nomor WhatsApp kamu
// (format 62..., tanpa tanda + dan tanpa 0 di depan)
var NOMOR_WA = '6285156513305';

// ---------- Link WhatsApp ----------
// Semua elemen dengan atribut data-wa otomatis diisi link WhatsApp + pesan awal
document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = 'https://wa.me/' + NOMOR_WA + '?text=' + encodeURIComponent(a.dataset.wa);
});

// ---------- Menu navigasi ----------
// Klik link menu -> tutup drawer (jika terbuka), scroll halus, lalu jalankan animasi
document.querySelectorAll('a.nav-link[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        var drawer = document.getElementById('navbarDrawer');

        // Link Home: kembali ke atas halaman
        if (id === '#') {
            e.preventDefault();
            if (drawer && drawer.open) drawer.close();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        var target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        if (drawer && drawer.open) drawer.close();

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', id);

        // Ulangi animasi setiap kali link diklik
        target.classList.remove('sorot');
        void target.offsetWidth;
        target.classList.add('sorot');
    });
});

// ---------- Zoom gambar portofolio ----------
var lightbox = document.getElementById('lightbox');
var lbGambar = document.getElementById('lightboxGambar');
var lbKet = document.getElementById('lightboxKeterangan');

document.querySelectorAll('.galeri-tombol').forEach(function (tombol) {
    tombol.addEventListener('click', function () {
        var img = tombol.querySelector('img');
        lbGambar.src = img.dataset.besar || img.currentSrc || img.src;
        lbGambar.alt = img.alt;
        lbKet.textContent = tombol.parentElement.querySelector('figcaption').textContent;
        lightbox.showModal();
    });
});

// Klik di mana saja (gambar, area gelap, tombol X) untuk menutup; Esc juga bisa
lightbox.addEventListener('click', function () { lightbox.close(); });

// ---------- Tahun copyright otomatis ----------
document.getElementById('tahun').textContent = new Date().getFullYear();
