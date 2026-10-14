// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Reveal on Scroll =====
const revealElements = document.querySelectorAll(
  '.section-head, .about-lead, .about-body, .text-link, .stat-box, .skills-head, .work-card, .cert-card, .contact-title, .contact-desc, .email-cta, .social-chip, .hero-badge, .hero-title, .hero-role, .hero-desc, .hero-actions, .hero-socials, .photo-scene'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => observer.observe(el));

// ============================================
// ===== SKILLS — FILTER CARD SWITCH =====
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const skillGroups = document.querySelectorAll('.skill-card-group');
const statCategories = document.querySelectorAll('.stat-category');

function showSkillGroup(category) {
  skillGroups.forEach(group => {
    group.classList.remove('active');
    if (group.dataset.category === category) {
      void group.offsetWidth;
      group.classList.add('active');
    }
  });
}

// Filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    showSkillGroup(filter);
  });
});

// Klik kategori di Quick Stats
statCategories.forEach(cat => {
  cat.addEventListener('click', () => {
    const category = cat.dataset.cat;
    filterBtns.forEach(b => {
      b.classList.remove('active');
      if (b.dataset.filter === category) b.classList.add('active');
    });
    showSkillGroup(category);
  });
});

// ============================================
// ===== HERO TEXT ROTATION (PORTFOLIO ↔ YELI) =====
// ============================================
const heroTexts = document.querySelectorAll('.hero-text-item');
let currentTextIndex = 0;

function rotateHeroText() {
  if (heroTexts.length === 0) return;
  
  heroTexts[currentTextIndex].classList.remove('active');
  currentTextIndex = (currentTextIndex + 1) % heroTexts.length;
  
  const nextItem = heroTexts[currentTextIndex];
  const letters = nextItem.querySelectorAll('.hero-letter');
  
  letters.forEach(letter => {
    letter.style.animation = 'none';
    void letter.offsetWidth;
    letter.style.animation = '';
  });
  
  nextItem.classList.add('active');
}

if (heroTexts.length > 1) {
  setTimeout(() => {
    setInterval(rotateHeroText, 4000);
  }, 4000);
}

// ============================================
// ===== NAVBAR SCROLL EFFECT + ACTIVE LINK =====
// ============================================
const navbarEl = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbarEl.classList.add('scrolled');
  } else {
    navbarEl.classList.remove('scrolled');
  }
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ============================================
// ===== HIGHLIGHT TEXT ANIMATION (About) =====
// ============================================
const aboutLeft = document.querySelector('.about-left');

if (aboutLeft) {
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });
  
  aboutObserver.observe(aboutLeft);
}

// ===== Click Sparkle Effect =====
document.addEventListener('click', (e) => {
  const symbols = ['✦', '✧', '·', '◇', '✩'];
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  
  const sparkle = document.createElement('div');
  sparkle.textContent = symbol;
  sparkle.style.cssText = `
    position: fixed;
    left: ${e.clientX}px;
    top: ${e.clientY}px;
    font-size: 1.4rem;
    color: #8fa8d4;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%) scale(1);
    transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
  `;
  
  document.body.appendChild(sparkle);
  
  requestAnimationFrame(() => {
    const randomX = (Math.random() - 0.5) * 100;
    const randomY = -80 - Math.random() * 50;
    sparkle.style.transform = `translate(calc(-50% + ${randomX}px), calc(-50% + ${randomY}px)) scale(1.6) rotate(${(Math.random() - 0.5) * 180}deg)`;
    sparkle.style.opacity = '0';
  });
  
  setTimeout(() => sparkle.remove(), 1300);
});

// ===== Magnetic Button =====
const magneticBtns = document.querySelectorAll('.btn-primary, .email-cta');
magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ===== WORK: Horizontal Scroll Drag =====
const workScroll = document.getElementById('workScroll');

if (workScroll) {
  let isDown = false;
  let startX;
  let scrollLeft;

  workScroll.addEventListener('mousedown', (e) => {
    isDown = true;
    workScroll.classList.add('dragging');
    startX = e.pageX - workScroll.offsetLeft;
    scrollLeft = workScroll.scrollLeft;
  });

  workScroll.addEventListener('mouseleave', () => {
    isDown = false;
    workScroll.classList.remove('dragging');
  });

  workScroll.addEventListener('mouseup', () => {
    isDown = false;
    workScroll.classList.remove('dragging');
  });

  workScroll.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - workScroll.offsetLeft;
    const walk = (x - startX) * 1.5;
    workScroll.scrollLeft = scrollLeft - walk;
  });

  workScroll.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (isDown) e.preventDefault();
    });
  });
}

// ===== WORK: Navigation Buttons =====
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

if (scrollLeftBtn && scrollRightBtn && workScroll) {
  scrollLeftBtn.addEventListener('click', () => {
    workScroll.scrollBy({ left: -420, behavior: 'smooth' });
  });

  scrollRightBtn.addEventListener('click', () => {
    workScroll.scrollBy({ left: 420, behavior: 'smooth' });
  });

  const updateButtons = () => {
    const isAtStart = workScroll.scrollLeft <= 5;
    const isAtEnd = workScroll.scrollLeft >= workScroll.scrollWidth - workScroll.clientWidth - 5;
    
    scrollLeftBtn.style.opacity = isAtStart ? '0.4' : '1';
    scrollLeftBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
    scrollRightBtn.style.opacity = isAtEnd ? '0.4' : '1';
    scrollRightBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
  };

  workScroll.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);
  updateButtons();
}

// ===== Console Greeting =====
console.log(
  '%c✦ Hello, Yeli! ✦',
  'background: linear-gradient(135deg, #8fa8d4, #b8a8d4); color: #f8f9fc; padding: 14px 28px; border-radius: 100px; font-size: 15px; font-weight: 600;'
);
console.log(
  '%cPortfolio kamu berhasil dimuat dengan cantik ✨',
  'color: #8fa8d4; font-size: 13px; font-style: italic;'
);

// ============================================
// ===== PROJECT MODAL =====
// ============================================
const projectData = {
  securecrypt: {
    badge: '⭐ Featured Project',
    title: 'SecureCrypt',
    subtitle: 'Sistem Enkripsi Klasik & Modern Berbasis Web dengan RBAC',
    image: 'projects/securecrypt-1.png',
    description: 'SecureCrypt adalah aplikasi web pengamanan pesan teks dengan 15+ algoritma kriptografi klasik & modern. Dilengkapi Role-Based Access Control (RBAC), Two-Factor Authentication (2FA) berbasis OTP, dan pencatatan aktivitas pengguna melalui audit log. Dikembangkan sebagai project mata kuliah Kriptografi dengan tim beranggotakan 6 orang.',
    tags: ['Python', 'Flask', 'MySQL', 'Kriptografi', 'RBAC', '2FA', 'Bootstrap'],
    
    projects: [
      {
        title: '🏠 Halaman Login',
        subtitle: 'Autentikasi dengan username & password',
        image: 'projects/securecrypt-1.png',
        description: 'Halaman login dengan keamanan berlapis — password disimpan dengan hashing scrypt, username dienkripsi AES di database, dan validasi input untuk mencegah serangan.',
        features: [
          'Form login username & password',
          'Password hashing dengan scrypt',
          'Username terenkripsi AES di database',
          'Validasi input & flash message'
        ]
      },
      {
        title: '🔐 Verifikasi 2FA',
        subtitle: 'Kode OTP dari Google Authenticator',
        role: 'Pengguna',
        image: 'projects/securecrypt-2.png',
        description: 'Halaman verifikasi 2FA untuk role Pengguna — meminta kode OTP 6 digit dari Google Authenticator. Setiap user punya kode TOTP unik yang berubah tiap 30 detik.',
        features: [
          'Input OTP 6 digit',
          'Verifikasi TOTP berbasis waktu',
          'Kode berubah tiap 30 detik',
          'Validasi server-side dengan pyotp'
        ]
      },
      {
        title: '👤 Dashboard Pengguna',
        subtitle: 'Panel utama untuk user biasa',
        role: 'Pengguna',
        image: 'projects/securecrypt-3.png',
        description: 'Dashboard pengguna dengan welcome message personal dan akses ke 15+ algoritma kriptografi. User bisa memilih algoritma, memasukkan teks & kunci, lalu melakukan enkripsi/dekripsi.',
        features: [
          '15+ algoritma kriptografi',
          'Card algoritma dengan ikon & deskripsi',
          'Info format kunci per algoritma',
          'Welcome message personal user'
        ]
      },
      {
        title: '🔐 Algoritma Kriptografi',
        subtitle: 'Pilihan algoritma yang tersedia',
        role: 'Pengguna',
        image: 'projects/securecrypt-4.png',
        description: 'Bagian pilihan algoritma di dashboard pengguna — terbagi dalam kategori Kriptografi Klasik dan Modern. Setiap algoritma punya penjelasan singkat dan tag kategori.',
        features: [
          'Grid card algoritma kriptografi',
          'Kategori: Klasik, Modern, Hash, Encoding',
          'Ikon unik tiap algoritma',
          'Tag format kunci yang dibutuhkan'
        ]
      },
      {
        title: '🔐 Form Enkripsi',
        subtitle: 'Proses enkripsi & dekripsi teks',
        role: 'Pengguna',
        image: 'projects/securecrypt-5.png',
        description: 'Form enkripsi pengguna dengan input teks, kunci kriptografi, dan tombol Enkripsi/Dekripsi/Reset. Dilengkapi counter karakter real-time dan audit log otomatis.',
        features: [
          'Input teks plaintext/ciphertext',
          'Input kunci sesuai algoritma',
          'Tombol Enkripsi & Dekripsi',
          'Counter karakter real-time',
          'Audit log otomatis'
        ]
      },
      {
        title: '🔐 Verifikasi 2FA',
        subtitle: 'Kode OTP dari Google Authenticator',
        role: 'Admin',
        image: 'projects/securecrypt-6.png',
        description: 'Halaman verifikasi 2FA untuk role Admin. Sistem memisahkan role sehingga pengguna dan admin punya flow login yang berbeda sesuai konsep RBAC.',
        features: [
          'Verifikasi 2FA khusus role Admin',
          'Pemisahan role via RBAC',
          'Redirect otomatis ke admin panel',
          'Audit log setiap login admin'
        ]
      },
      {
        title: '👑 Dashboard Admin',
        subtitle: 'Panel admin + Quick Actions & Manajemen',
        role: 'Admin',
        image: 'projects/securecrypt-7.png',
        description: 'Dashboard admin dengan statistik sistem — total pengguna, log aktivitas, admin aktif, dan status sistem. Dilengkapi Quick Actions: Tambah Pengguna Baru, Cari Aktivitas, Enkripsi File, serta Menu Administrasi (Log Aktivitas Global, Manajemen Pengguna, Fitur Enkripsi).',
        features: [
          'Statistik total pengguna & log',
          'Quick Actions untuk admin',
          'Log Aktivitas Global',
          'Manajemen Pengguna (CRUD)',
          'Tambah Pengguna Baru',
          'Akses cepat ke Fitur Enkripsi'
        ]
      },
      {
        title: '🔧 Fitur Enkripsi Admin',
        subtitle: 'Akses algoritma & enkripsi dari panel admin',
        role: 'Admin',
        image: 'projects/securecrypt-8.png',
        description: 'Admin punya akses ke semua fitur enkripsi yang sama seperti pengguna — 15+ algoritma kriptografi, form enkripsi, dan dekripsi. Bedanya, admin juga bisa memantau aktivitas user via audit log.',
        features: [
          'Akses ke semua algoritma kriptografi',
          'Form enkripsi & dekripsi lengkap',
          'Monitoring penggunaan algoritma',
          'Bisa kelola user sambil enkripsi',
          'Akses ke audit log terkait'
        ]
      }
    ],
    
    demoLink: '#',
    githubLink: '#'
  },
    absensi: {
    badge: '🎓 Skripsi',
    title: 'Sistem Absensi QR Code',
    subtitle: 'Absensi Kehadiran dengan QR Code Real-time & Device Binding',
    image: 'projects/absensi-guru-2.png',
    description: 'Sistem absensi berbasis QR Code dengan <strong>device binding</strong> untuk keamanan — setiap siswa terikat ke satu device, sehingga tidak bisa titip absen. Aplikasi hadir dalam platform web & mobile dengan 3 role pengguna: <strong>Admin</strong>, <strong>Guru</strong>, dan <strong>Siswa</strong>. Dilengkapi notifikasi WhatsApp otomatis menggunakan Baileys (Node.js), jurnal mengajar terintegrasi, serta sistem presensi manual untuk siswa yang tidak memiliki HP.',
    tags: ['CodeIgniter 4', 'MySQL', 'QR Code', 'Node.js', 'Baileys', 'Bootstrap'],
    
    projects: [
      {
        title: '🔐 Halaman Login',
        subtitle: 'Autentikasi universal untuk semua role',
        image: 'projects/absensi-login.png',
        description: 'Halaman login dengan tampilan modern <em>Smart Presence</em> — antarmuka autentikasi universal yang digunakan oleh Admin, Guru, dan Siswa. Dilengkapi branding, ilustrasi, dan fitur keamanan.',
        features: [
          'Login universal (Admin, Guru, Siswa)',
          'Interface modern dengan ilustrasi',
          'Validasi input & pesan error',
          'Lupa password & registrasi',
          'Redirect otomatis sesuai role'
        ]
      },
      {
        title: '📊 Dashboard Guru — Sebelum Waktu Absen',
        subtitle: 'Menampilkan countdown sebelum QR Code aktif',
        image: 'projects/absensi-guru-1.png',
        description: 'Dashboard Guru saat <strong>belum memasuki waktu absensi</strong>. Sistem otomatis menampilkan countdown timer dan pesan bahwa QR Code belum bisa dibuka. <br><br><strong>⏰ Aturan Waktu QR:</strong><br>• QR Code aktif <strong>15 menit sebelum</strong> jam pelajaran dimulai<br>• QR Code tetap aktif sampai <strong>15 menit setelah</strong> jam pelajaran berakhir<br>• Contoh: pelajaran jam <strong>10.00</strong>, QR aktif dari <strong>09.45</strong> hingga <strong>11.15</strong>',
        features: [
          'Countdown timer otomatis',
          'Info jam pelajaran & kelas yang diajar',
          'Statistik kehadiran real-time (Hadir/Izin/Sakit/Alfa/Dispensasi)',
          'Jurnal mengajar terintegrasi',
          'QR Code terkunci sebelum waktunya'
        ]
      },
      {
        title: '📱 Dashboard Guru — QR Code Aktif',
        subtitle: 'QR Code aktif & daftar kehadiran real-time',
        image: 'projects/absensi-guru-2.png',
        description: 'Dashboard Guru saat <strong>QR Code sudah aktif</strong>. Siswa dapat scan QR untuk absen. Sistem menampilkan daftar kehadiran terbaru secara real-time, lengkap dengan status (Hadir/Izin/Sakit/Alfa/Dispensasi) dan info device binding.',
        features: [
          'QR Code aktif & auto-refresh',
          'Countdown 15 menit untuk QR',
          'Daftar kehadiran real-time',
          'Tombol Manual untuk presensi manual',
          'Device binding — 1 siswa = 1 device',
          'Jurnal mengajar untuk catat materi'
        ]
      },
      {
        title: '✋ Presensi Manual & Reset Device',
        subtitle: 'Untuk siswa tanpa HP & ganti device',
        image: 'projects/absensi-guru-3.png',
        description: 'Panel presensi manual oleh guru untuk mengakomodir siswa yang <strong>tidak memiliki HP</strong> atau siswa yang <strong>mengganti device baru</strong>. Karena sistem menggunakan <strong>device binding</strong>, siswa yang ganti HP perlu dilakukan reset device oleh guru mata pelajaran. Guru bisa langsung set status kehadiran: Hadir, Izin, Sakit, Alfa, atau Dispensasi.',
        features: [
          'Presensi manual untuk siswa tanpa HP',
          'Reset device untuk siswa ganti HP',
          'Pilih status: Hadir/Izin/Sakit/Alfa/Dispensasi',
          'Total siswa terdaftar (36 orang)',
          'Scroll daftar siswa lengkap',
          'Tombol "Selesaikan Presensi" untuk finalisasi'
        ]
      },
      {
        title: '🎒 Login Siswa',
        subtitle: 'Halaman login khusus siswa',
        image: 'projects/absensi-siswa-login.png',
        description: 'Halaman login khusus siswa dengan tampilan <em>SafeScan</em> dari SMAN 18 Garut. Siswa masuk menggunakan <strong>username/NIS</strong> dan password. Halaman ini <strong>berbeda</strong> dari login admin & guru — siswa langsung diarahkan ke halaman scan QR setelah login.',
        features: [
          'Login khusus siswa (NIS)',
          'Branding SMAN 18 Garut',
          'Tombol "Masuk & Absen" — langsung ke scan QR',
          'Toggle show/hide password',
          'Fitur lupa password & daftar'
        ]
      },
      {
        title: '📱 Scan QR — Siswa',
        subtitle: 'Halaman utama siswa untuk absensi harian',
        image: 'projects/absensi-siswa-scan.png',
        description: 'Halaman utama siswa untuk melakukan <strong>scan QR Code</strong> absensi. Siswa cukup mengarahkan kamera ke QR Code yang ditampilkan guru. Setelah scan berhasil, kehadiran langsung tercatat <strong>real-time</strong> dan muncul di dashboard guru. Dilengkapi <em>device binding</em> — 1 siswa hanya bisa absen dari 1 HP.',
        features: [
          'Scan QR Code langsung dari kamera HP',
          'Info siswa: Nama, NIS, status Online',
          'Riwayat absensi harian, bulanan, semester',
          'Real-time update ke dashboard guru',
          'Device binding — anti titip absen'
        ]
      },
      {
        title: '📝 Agenda Kelas (Sekretaris)',
        subtitle: 'Fitur eksklusif sekretaris kelas + Penilaian Guru',
        image: 'projects/absensi-siswa-agenda.png',
        description: 'Fitur <strong>eksklusif sekretaris kelas</strong> — siswa yang ditunjuk jadi sekretaris punya akses tambahan untuk mengisi <strong>Agenda Kelas</strong> harian. <br><br><strong>Fitur sekretaris:</strong><br>• Isi agenda kelas (mata pelajaran, guru pengajar, materi)<br>• Isi keterangan status guru<br>• <strong>Penilaian guru oleh siswa</strong> (rahasia — hanya admin & sekretaris yang tahu, <strong>guru tidak tahu</strong>)<br><br>Menu ini muncul sebagai tombol tambahan (warna orange) di halaman siswa, hanya muncul kalau siswa login sebagai <strong>sekretaris kelas</strong>.',
        features: [
          'Akses eksklusif: hanya sekretaris kelas',
          'Isi agenda harian: mata pelajaran, guru, materi',
          'Pilih keterangan status guru',
          'Penilaian guru oleh siswa (RAHASIA)',
          'Hasil penilaian cuma admin & sekretaris yang tahu',
          'Guru TIDAK bisa lihat penilaian dirinya',
          'Tombol orange khusus sekretaris di dashboard'
        ]
      }
    ],
    
    demoLink: '#',
    githubLink: '#'
  },
  
  cimol: {
    badge: '🛒 E-Commerce',
    title: 'Mamiyu — Penjualan Cimol',
    subtitle: 'Aplikasi Penjualan Cimol dengan Web Pembeli & Dashboard Admin',
    image: 'projects/cimol-1.png',
    description: 'Mamiyu adalah aplikasi penjualan cimol modern berbasis web dengan 3 tampilan utama — halaman pembeli untuk memesan cimol dengan pilihan rasa & level pedas, halaman menu untuk custom pesanan, dan dashboard admin untuk mengelola menu, memantau pesanan real-time, serta cetak struk. Dilengkapi sistem pembayaran COD & QRIS, upload bukti bayar, notifikasi WhatsApp otomatis, dan real-time update menggunakan Supabase.',
    tags: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind'],
    
    projects: [
      {
        title: '🏠 Halaman Pembeli (Welcome)',
        subtitle: 'Landing page dengan branding MAMIYU',
        image: 'projects/cimol-1.png',
        description: 'Halaman utama yang dilihat pembeli pertama kali — hero welcome dengan branding MAMIYU yang eye-catching, badge "Authentic Street Food", statistik (100+ pelanggan, ⭐ 5.0 rating, 10+ varian), info jam buka, dan tombol "MULAI ORDER" untuk masuk ke halaman pemesanan.',
        features: [
          'Hero welcome dengan branding MAMIYU',
          'Badge "Promo Hari Ini"',
          'Statistik pelanggan & rating',
          'Info jam buka',
          'Animasi smooth & floating emoji',
          'CTA button "MULAI ORDER"'
        ]
      },
      {
        title: '🍢 Halaman Menu & Custom Pesanan',
        subtitle: 'Katalog menu + form custom pesanan',
        image: 'projects/cimol-2.png',
        description: 'Halaman pemesanan dengan 2-step flow — pilih menu dari katalog, kemudian custom pesanan (nama pemesan, varian bumbu 6 pilihan, level kepedasan 1-5, metode bayar COD/QRIS, upload bukti bayar). Setelah konfirmasi, pesanan otomatis dikirim ke WhatsApp Mamiyu.',
        features: [
          'Katalog menu dengan foto & harga',
          'Badge "Ready" / "Kosong" otomatis',
          'Pilih varian bumbu (6 pilihan)',
          'Level kepedasan 1-5',
          'Metode bayar: COD atau QRIS',
          'Upload bukti transfer',
          'Auto-redirect ke WhatsApp',
          'Modal sukses setelah pesan'
        ]
      },
      {
        title: '⚙️ Dashboard Admin',
        subtitle: 'Panel admin untuk kelola penjualan',
        image: 'projects/cimol-3.png',
        description: 'Dashboard admin lengkap untuk mengelola toko cimol — mulai dari statistik omzet, memantau pesanan real-time, manajemen menu & stok, sampai cetak struk profesional. Dilengkapi fitur search, filter, dan real-time notification via Supabase.',
        features: [
          'Statistik omzet & pesanan real-time',
          'Kelola pesanan (proses/selesai/hapus)',
          'Tambah menu baru dengan foto',
          'Toggle stok (READY/HABIS)',
          'Search & filter pesanan',
          'Modal preview struk sebelum cetak',
          'Cetak struk/resi profesional',
          'Real-time notification',
          'Toast & modal konfirmasi cantik'
        ]
      }
    ],
    
    demoLink: '#',
    githubLink: '#'
  },
  
  landing: {
    badge: '🎨 UI Design',
    title: 'UI/UX Design Collection',
    subtitle: 'Koleksi Desain Website & Mobile App dengan Figma',
    image: 'projects/landing-1.png',
    description: 'Koleksi desain UI/UX yang saya kerjakan menggunakan Figma — mencakup landing page website dan mobile app design. Setiap project berfokus pada user experience yang baik, visual yang bersih, dan tipografi yang menarik, dirancang untuk berbagai jenis industri dengan pendekatan yang berbeda.',
    tags: ['Figma', 'UI Design', 'Prototyping', 'UX', 'Web Design', 'Mobile Design'],
    
    projects: [
      {
        title: 'Foodzone — Bakery Landing Page',
        subtitle: 'Desain website untuk brand bakery & food delivery',
        image: 'projects/landing-1.png',
        description: 'Landing page untuk brand bakery "Foodzone" dengan nuansa warm & mengundang. Menggunakan warna kuning cerah dan merah sebagai aksen utama, tipografi yang bold, dan layout yang menonjolkan produk roti sebagai bintang utama. Dilengkapi dengan section menu, services, recipe, testimonial, dan fitur booking table.',
        features: [
          'Hero section dengan produk unggulan',
          'Statistik brand (Food, Delivery, Customers)',
          'Section "Best food in town" dengan cerita brand',
          'Services — healthy food, super tea, fast service',
          'Hot selling recipe dengan 6 menu produk',
          'App download section (iOS & Android)',
          'Testimonial dari happy clients',
          'Advanced booking — reserved a table',
          'Footer lengkap dengan kontak & social media'
        ]
      },
      {
        title: 'Plants App — Mobile Design',
        subtitle: 'Desain aplikasi mobile untuk toko bunga online',
        image: 'projects/landing-2.png',
        description: 'Desain aplikasi mobile untuk toko bunga online bernama "Plants". Menggunakan pendekatan minimalis dengan warna kuning cerah sebagai aksen utama. Terdiri dari 2 screen utama — halaman katalog produk dan halaman detail produk dengan fitur add to cart.',
        features: [
          'Home screen dengan kategori (Top Pick, Popular, Indoor, Outdoor)',
          'Product listing dengan harga & preview',
          'Detail produk — Sunflower (Helianthus annuus L.)',
          'Rating bintang & deskripsi produk',
          'Quantity selector (+ / -)',
          'Add to cart button',
          'Bottom navigation bar',
          'Search & voice search icon'
        ]
      },
      {
        title: 'Farm After Work — Aquascape Website',
        subtitle: 'Desain website untuk komunitas aquascape',
        image: 'projects/landing-3.png',
        description: 'Desain website untuk brand aquascape "Farm After Work" dengan tema hijau natural & earthy. Menggunakan warna hijau gelap sebagai base dengan aksen hijau terang. Dilengkapi dengan section about, artikel, galeri, produk, testimoni, dan meet our team.',
        features: [
          'Hero section dengan visual aquascape',
          'About Us — Farm After Work Story',
          'Section Artikel edukasi aquascape',
          'FAQ Gallery dengan multiple images',
          'FAQ Product — best seller items',
          'FAQ Testimoni dari pelanggan',
          'Meet Our Team — profil tim',
          'Footer dengan informasi kontak lengkap'
        ]
      }
    ],
    
    demoLink: '#',
    githubLink: '#'
  }
};

// ===== Buka modal =====
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

function openProjectModal(projectId) {
  const project = projectData[projectId];
  if (!project || !modal || !modalBody) return;
  
  const tagsHTML = project.tags.map(t => 
    `<span>${t}</span>`
  ).join('');
  
  const featuresHTML = project.features ? project.features.map(f => 
    `<li>${f}</li>`
  ).join('') : '';
  
  let subProjectsHTML = '';
  if (project.projects && project.projects.length > 0) {
    subProjectsHTML = `
      <div class="modal-section">
        <h3 class="modal-section-title">Koleksi Desain</h3>
        ${project.projects.map((sub, i) => `
          <div class="modal-subproject">
            <div class="modal-subproject-header">
              <span class="modal-subproject-number">${String(i + 1).padStart(2, '0')}</span>
              <h4 class="modal-subproject-title">${sub.title}</h4>
              ${sub.role ? `<span class="modal-subproject-role role-${sub.role.toLowerCase()}">${sub.role}</span>` : ''}
            </div>
            <p class="modal-subproject-subtitle">${sub.subtitle}</p>
            
            <div class="modal-subproject-frame">
              <img src="${sub.image}" alt="${sub.title}" 
                   onclick="window.open('${sub.image}', '_blank')">
            </div>
            
            <p class="modal-subproject-desc">${sub.description}</p>
            
            ${sub.features ? `
              <ul class="modal-subproject-features">
                ${sub.features.map(f => `<li>${f}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }
  
  const galleryHTML = project.gallery && project.gallery.length > 1 
    ? `
      <div class="modal-section">
        <h3 class="modal-section-title">Galeri</h3>
        <div class="modal-gallery">
          ${project.gallery.map(img => 
            `<img src="${img}" alt="${project.title}" onclick="window.open('${img}', '_blank')">`
          ).join('')}
        </div>
      </div>
    ` : '';
  
  modalBody.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="modal-header-img">
    <div class="modal-content">
      <span class="modal-badge">${project.badge}</span>
      <h2 class="modal-title">${project.title}</h2>
      <p class="modal-subtitle">${project.subtitle}</p>
      
      <div class="modal-tags">${tagsHTML}</div>
      
      <p class="modal-desc">${project.description}</p>
      
      ${project.features && !project.projects ? `
        <div class="modal-section">
          <h3 class="modal-section-title">Fitur Utama</h3>
          <ul class="modal-features">${featuresHTML}</ul>
        </div>
      ` : ''}
      
      ${subProjectsHTML}
      ${galleryHTML}
      
      <div class="modal-actions">
        ${project.demoLink && project.demoLink !== '#' ? `
          <a href="${project.demoLink}" target="_blank" class="modal-btn modal-btn-primary">
            🌐 Lihat Demo
          </a>
        ` : ''}
        ${project.githubLink && project.githubLink !== '#' ? `
          <a href="${project.githubLink}" target="_blank" class="modal-btn modal-btn-secondary">
            📂 GitHub Repo
          </a>
        ` : ''}
        <button class="modal-btn modal-btn-secondary" onclick="document.getElementById('modalClose').click()">
          Tutup
        </button>
      </div>
    </div>
  `;
  
  modal.classList.add('active');
  document.body.classList.add('modal-open');
}

// ===== Tutup modal =====
function closeProjectModal() {
  if (!modal) return;
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
}

// ===== Event listeners =====
document.querySelectorAll('[data-project]').forEach(card => {
  card.addEventListener('click', () => {
    const projectId = card.dataset.project;
    openProjectModal(projectId);
  });
});

if (modalClose) modalClose.addEventListener('click', closeProjectModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeProjectModal);

// ESC untuk tutup
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeProjectModal();
  }
});

// ===== Prevent drag card click saat scroll =====
document.querySelectorAll('.work-card').forEach(card => {
  let startX = 0;
  let startY = 0;
  
  card.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
  });
  
  card.addEventListener('click', (e) => {
    const moveX = Math.abs(e.clientX - startX);
    const moveY = Math.abs(e.clientY - startY);
    if (moveX > 5 || moveY > 5) {
      e.stopPropagation();
      e.preventDefault();
    }
  });
});

// ============================================
// ===== AUDIO SAPAAN =====
// ============================================
const audioBtn = document.getElementById('play-audio');
const audio    = document.getElementById('my-audio');

if (audioBtn && audio) {
  audioBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      audioBtn.classList.add('playing');
      audioBtn.innerHTML = '<span class="audio-icon">⏸</span> Hentikan Suara';
    } else {
      audio.pause();
      audio.currentTime = 0;
      audioBtn.classList.remove('playing');
      audioBtn.innerHTML = '<span class="audio-icon">🔊</span> Dengarkan Sapaan';
    }
  });

  audio.addEventListener('ended', () => {
    audioBtn.classList.remove('playing');
    audioBtn.innerHTML = '<span class="audio-icon">🔊</span> Dengarkan Sapaan';
  });
  
  console.log('✅ Audio sapaan siap digunakan!');
} else {
  console.warn('⚠️ Tombol audio atau tag audio belum ada di HTML!');
}

// ============================================
// ===== CERTIFICATES MODAL =====
// ============================================
const certModal = document.getElementById('certModal');
const certModalBody = document.getElementById('certModalBody');
const certClose = document.getElementById('certClose');
const certOverlay = document.getElementById('certOverlay');

const certCards = document.querySelectorAll('.cert-card');

certCards.forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    const title = card.querySelector('.cert-title').textContent;
    const issuer = card.querySelector('.cert-issuer').textContent;
    
    if (!certModal || !certModalBody) return;
    
    certModalBody.innerHTML = `
      <img src="${img.src}" alt="${title}">
      <div class="cert-modal-caption">
        <h3>${title}</h3>
        <p>${issuer}</p>
      </div>
    `;
    
    certModal.classList.add('active');
    document.body.classList.add('modal-open');
  });
});

function closeCertModal() {
  if (!certModal) return;
  certModal.classList.remove('active');
  document.body.classList.remove('modal-open');
}

if (certClose) certClose.addEventListener('click', closeCertModal);
if (certOverlay) certOverlay.addEventListener('click', closeCertModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
    closeCertModal();
  }
});
// ============================================
// ===== CONTACT — AUTO COPY EMAIL + TOAST =====
// ============================================
const emailPill = document.getElementById('emailCopy');
const toastNotif = document.getElementById('toast');

if (emailPill && toastNotif) {
  emailPill.addEventListener('click', async () => {
    const email = emailPill.dataset.email;
    
    try {
      // Copy ke clipboard
      await navigator.clipboard.writeText(email);
      
      // Visual feedback
      emailPill.classList.add('copied');
      const actionEl = emailPill.querySelector('.email-pill-action');
      const originalText = actionEl.textContent;
      actionEl.textContent = '✓ Copied';
      
      // Show toast
      toastNotif.classList.add('show');
      
      // Reset setelah 2.5 detik
      setTimeout(() => {
        toastNotif.classList.remove('show');
        emailPill.classList.remove('copied');
        actionEl.textContent = originalText;
      }, 2500);
      
    } catch (err) {
      // Fallback kalau clipboard API nggak support
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      toastNotif.classList.add('show');
      setTimeout(() => toastNotif.classList.remove('show'), 2500);
    }
  });
}