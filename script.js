// Galeri kartu dengan filter kategori dan jendela detail (modal).
// Data kartu disimpan dalam array, lalu ditampilkan oleh fungsi render.
const data = [
  { judul: 'Pagi di Pantai', kategori: 'Alam', warna: ['#2f8f6b', '#1b3a6b'], deskripsi: 'Gradien hijau ke biru, terinspirasi suasana pantai saat pagi.' },
  { judul: 'Hutan Hujan', kategori: 'Alam', warna: ['#27795a', '#0f2140'], deskripsi: 'Warna hijau pekat untuk kesan rimbun dan teduh.' },
  { judul: 'Senja Kota', kategori: 'Kota', warna: ['#d9a441', '#6a3d7c'], deskripsi: 'Perpaduan emas dan ungu seperti langit kota saat senja.' },
  { judul: 'Lampu Malam', kategori: 'Kota', warna: ['#1a63d8', '#0b1220'], deskripsi: 'Biru terang di atas latar gelap, kesan jalan raya malam hari.' },
  { judul: 'Kopi Susu', kategori: 'Makanan', warna: ['#b9852a', '#4a2c17'], deskripsi: 'Cokelat hangat yang menggambarkan secangkir kopi susu.' },
  { judul: 'Sambal Merah', kategori: 'Makanan', warna: ['#e5533d', '#7a1f14'], deskripsi: 'Merah menyala untuk kesan pedas dan segar.' },
  { judul: 'Embun Pagi', kategori: 'Alam', warna: ['#9ad1c1', '#2a6f8f'], deskripsi: 'Warna sejuk lembut seperti embun di daun.' },
  { judul: 'Jalan Layang', kategori: 'Kota', warna: ['#7f8fa9', '#12233f'], deskripsi: 'Abu kebiruan yang mewakili beton dan baja kota.' },
];

const grid = document.getElementById('grid');
const filter = document.getElementById('filter');
const modal = document.getElementById('modal');
const modalGambar = document.getElementById('modal-gambar');
const modalJudul = document.getElementById('modal-judul');
const modalKategori = document.getElementById('modal-kategori');
const modalDeskripsi = document.getElementById('modal-deskripsi');
const modalTutup = document.getElementById('modal-tutup');

let kategoriAktif = 'Semua';
let terakhirDifokus = null;

function gradien(warna) {
  return 'linear-gradient(135deg, ' + warna[0] + ', ' + warna[1] + ')';
}

function buatFilter() {
  const kategori = ['Semua', ...new Set(data.map((d) => d.kategori))];
  kategori.forEach((nama) => {
    const tombol = document.createElement('button');
    tombol.type = 'button';
    tombol.textContent = nama;
    tombol.className = nama === kategoriAktif ? 'aktif' : '';
    tombol.addEventListener('click', () => {
      kategoriAktif = nama;
      filter.querySelectorAll('button').forEach((b) => b.classList.toggle('aktif', b === tombol));
      render();
    });
    filter.appendChild(tombol);
  });
}

function render() {
  grid.innerHTML = '';
  data
    .filter((d) => kategoriAktif === 'Semua' || d.kategori === kategoriAktif)
    .forEach((d) => {
      const li = document.createElement('li');
      const kartu = document.createElement('button');
      kartu.type = 'button';
      kartu.className = 'kartu';

      const gambar = document.createElement('div');
      gambar.className = 'gambar';
      gambar.style.background = gradien(d.warna);

      const teks = document.createElement('div');
      teks.className = 'teks';
      const judul = document.createElement('strong');
      judul.textContent = d.judul;
      const kat = document.createElement('span');
      kat.textContent = d.kategori;
      teks.append(judul, kat);

      kartu.append(gambar, teks);
      kartu.addEventListener('click', () => buka(d, kartu));
      li.appendChild(kartu);
      grid.appendChild(li);
    });
}

function buka(d, pemicu) {
  terakhirDifokus = pemicu;
  modalGambar.style.background = gradien(d.warna);
  modalJudul.textContent = d.judul;
  modalKategori.textContent = d.kategori;
  modalDeskripsi.textContent = d.deskripsi;
  modal.hidden = false;
  modalTutup.focus();
}

function tutup() {
  modal.hidden = true;
  if (terakhirDifokus) terakhirDifokus.focus();
}

modalTutup.addEventListener('click', tutup);
modal.addEventListener('click', (e) => {
  if (e.target === modal) tutup(); // klik area gelap menutup modal
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) tutup();
});

buatFilter();
render();
