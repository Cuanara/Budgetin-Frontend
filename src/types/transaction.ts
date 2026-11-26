export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  title: string;
  category: string;
  source: string;
  subCategory?: string;
  date: string;
  notes?: string;
  icon?: string;
  createdAt?: string; // ISO, waktu transaksi dicatat
}

export interface CreateTransactionDto {
  type: TransactionType;
  amount: number;
  title: string;
  category: string;
  source: string;
  subCategory?: string;
  date: string;
  notes?: string;
}