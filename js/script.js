/* =========================================================
   Tukang AC - script.js
   ========================================================= */

// Ganti nomor ini dengan nomor WhatsApp kamu
// (format 62..., tanpa tanda + dan tanpa 0 di depan)
var NOMOR_WA = '6285891489611';

// ---------- Link WhatsApp ----------
document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = 'https://wa.me/' + NOMOR_WA + '?text=' + encodeURIComponent(a.dataset.wa);
});

// ---------- Menu navigasi ----------
var drawer = document.getElementById('navbarDrawer');

// Jaring pengaman: lepas kunci scroll yang tertinggal
function lepasKunciScroll() {
    ['overflow', 'padding-right'].forEach(function (p) {
        document.documentElement.style.removeProperty(p);
        document.body.style.removeProperty(p);
    });
}

// Scroll ke section + ulangi animasi
function keSection(id) {
    if (id === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    var target = document.querySelector(id);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', id);

    target.classList.remove('sorot');
    void target.offsetWidth;
    target.classList.add('sorot');
}

document.querySelectorAll('a.nav-link[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (id !== '#' && !document.querySelector(id)) return;

        e.preventDefault();

        // Drawer ditutup oleh Bootstrap (data-bs-dismiss), bukan oleh script ini.
        // Kita tunggu sampai benar-benar tertutup, baru lepas lock dan scroll.
        if (drawer && drawer.open) {
            var sudah = false;
            var lanjut = function () {
                if (sudah) return;
                sudah = true;
                lepasKunciScroll();
                keSection(id);
            };
            drawer.addEventListener('close', function () { setTimeout(lanjut, 0); }, { once: true });
            setTimeout(lanjut, 500); // cadangan kalau event close tidak muncul
        } else {
            keSection(id);
        }
    });
});

// ---------- Menu navigasi ----------
var drawer = document.getElementById('navbarDrawer');

// Jaring pengaman: lepas kunci scroll yang tertinggal
function lepasKunciScroll() {
    ['overflow', 'padding-right'].forEach(function (p) {
        document.documentElement.style.removeProperty(p);
        document.body.style.removeProperty(p);
    });
}

// Scroll ke section + ulangi animasi
function keSection(id) {
    if (id === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    var target = document.querySelector(id);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', id);

    target.classList.remove('sorot');
    void target.offsetWidth;
    target.classList.add('sorot');
}

document.querySelectorAll('a.nav-link[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (id !== '#' && !document.querySelector(id)) return;

        e.preventDefault();

        // Tutup drawer langsung (native <dialog>)
        if (drawer && drawer.open) drawer.close();
        lepasKunciScroll();

        // Beri jeda singkat supaya lock scroll benar-benar lepas sebelum scroll
        setTimeout(function () { keSection(id); }, 50);
    });
});

// Drawer ditutup dengan cara lain (tombol X, Esc, klik luar)
if (drawer) {
    drawer.addEventListener('close', function () { setTimeout(lepasKunciScroll, 0); });
}

// ---------- Zoom gambar portofolio ----------
var lightbox = document.getElementById('lightbox');
var lbGambar = document.getElementById('lightboxGambar');
var lbKet = document.getElementById('lightboxKeterangan');

document.querySelectorAll('.galeri-tombol').forEach(function (tombol) {
    tombol.addEventListener('click', function () {
        var img = tombol.querySelector('img');
        var cap = tombol.parentElement.querySelector('figcaption');

        lbGambar.src = img.dataset.besar || img.currentSrc || img.src;
        lbGambar.alt = img.alt;
        lbKet.textContent = cap ? cap.textContent : img.alt;
        lightbox.showModal();
    });
});

// Klik di mana saja untuk menutup; Esc juga bisa
lightbox.addEventListener('click', function () { lightbox.close(); });

// ---------- Tahun copyright otomatis ----------
document.getElementById('tahun').textContent = new Date().getFullYear();
