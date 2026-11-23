export interface UserProfile {
  name: string;
  email: string;
  joinedDate: string;
  avatarLetter: string;
}

export interface NotificationSettingsState {
  delayEnded: boolean;        // Masa tunda berakhir: Tanya jadi dibeli atau tidak
  dayBeforeReminder: boolean; // Pengingat sehari sebelumnya: Satu pengingat sebelum masa tunda habis
  balanceSufficient: boolean; // Saldo sudah cukup: Kabari saat saldo mencukupi
  transactionSuccess: boolean;// Transaksi berhasil: Notifikasi setelah menyimpan transaksi
}
