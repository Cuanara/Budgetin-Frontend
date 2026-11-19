import { LegalDocument, type LegalSection } from "./LegalDocument";

const sections: LegalSection[] = [
  {
    title: "Data yang kami kumpulkan",
    body: "Nama, email, catatan pemasukan dan pengeluaran, budget bulanan, serta daftar wishlist beserta harga dan alasan yang anda tulis.",
  },
  {
    title: "Cara data dipakai",
    body: "Untuk menampilkan saldo dan riwayat, menghitung progress tabungan, dan mengirim pengingat masa tunda. Data tidak dipakai untuk iklan.",
  },
  {
    title: "Penyimpanan dan keamanan",
    body: "Data disimpan terenkripsi. Opsi Tetap masuk hanya menyimpan sesi login di perangkat yang anda pakai.",
  },
  {
    title: "Hakmu atas data",
    body: "Anda bisa melihat, mengubah, atau menghapus datamu, termasuk menghapus akun, kapan saja lewat pengaturan.",
  },
  {
    title: "Kontak kami",
    body: "Pertanyaan soal privasi bisa dikirim ke [EMAIL KONTAK] dan akan dibalas dalam beberapa hari kerja.",
  },
];

export const PrivacyPage = () => {
  return (
    <LegalDocument
      id="privasi"
      title="Kebijakan Privasi"
      updatedAt="18 November 2026"
      description="Kami hanya mengumpulkan data yang dibutuhkan supaya pencatatan, budget, dan wishlist anda berjalan lancar."
      sections={sections}
    />
  );
};