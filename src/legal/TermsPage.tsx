import { LegalDocument, type LegalSection } from "./LegalDocument";

const sections: LegalSection[] = [
  {
    title: "Penggunaan akun",
    body: "Anda bertanggung jawab menjaga kata sandi dan semua aktivitas di akunmu. Satu akun untuk satu orang, dan tidak boleh dipakai untuk menyalahgunakan layanan.",
  },
  {
    title: "Catatan keuangan dan budget",
    body: "Pemasukan, pengeluaran, dan budget per kategori berasal dari data yang anda masukkan sendiri. Budgetin membantu mencatat dan menghitung, bukan memberi nasihat keuangan.",
  },
  {
    title: "Wishlist dan masa tunda",
    body: "Barang di wishlist bisa ditunda 7 atau 14 hari. Saat masa berakhir, kami kirim notifikasi dan keputusan beli tetap ada di tanganmu.",
  },
  {
    title: "Arsip dan penghapusan",
    body: "Barang yang tidak jadi dibeli masuk ke arsip. Anda bisa mengembalikannya ke wishlist atau menghapusnya permanen kapan saja.",
  },
  {
    title: "Perubahan ketentuan",
    body: "Kami bisa memperbarui ketentuan ini. Perubahan penting akan diberitahukan lewat email atau notifikasi sebelum berlaku.",
  },
];

export const TermsPage = () => {
  return (
    <LegalDocument
      id="syarat"
      title="Syarat dan Ketentuan"
      updatedAt="18 November 2026"
      description="Dengan bikin akun dan pakai Budgetin, anda setuju dengan aturan di bawah. Singkat kok, baca dulu ya."
      sections={sections}
    />
  );
};