import { useState, useCallback } from 'react';
import { useBudgetStore } from '../stores/useBudgetStore';
import type { TransactionType } from '../types/transaction';

const EXPENSE_CATEGORIES = [
  'Makan',
  'Tempat Tinggal',
  'Transportasi',
  'Jajan',
  'Lainnya',
];

const INCOME_CATEGORIES = [
  'Tabungan',
  'Budget Bulanan',
];

const SAVINGS_CATEGORIES = [
  'Dana Darurat',
  'Tabungan Utama',
  'Wishlist',
  'Lainnya',
];

const EXPENSE_SOURCES = [
  'Budget Bulanan',
  'Tabungan',
  'Dana Darurat',
];

export const useTransactionModal = () => {
  const addTransaction = useBudgetStore((s) => s.addTransaction);
  const setTransactionModalOpen = useBudgetStore((s) => s.setTransactionModalOpen);

  const [txType, setTxType] = useState<TransactionType>('expense');
  const [nominal, setNominal] = useState<number>(100000);
  const [nominalDisplay, setNominalDisplay] = useState<string>('100.000');
  const [title, setTitle] = useState<string>('Makan');
  const [category, setCategory] = useState<string>('Makan');
  const [source, setSource] = useState<string>('Budget Bulanan');
  const [subCategory, setSubCategory] = useState<string>('Dana Darurat');
  const [txDate, setTxDate] = useState<string>('2026-11-12');
  const [notes, setNotes] = useState<string>('');

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState<boolean>(false);
  const [sourceDropdownOpen, setSourceDropdownOpen] = useState<boolean>(false);
  const [subCategoryDropdownOpen, setSubCategoryDropdownOpen] = useState<boolean>(false);
  const [validationHint, setValidationHint] = useState<string | null>(null);

  const formatNumber = (num: number): string => {
    return num.toLocaleString('id-ID');
  };

  const handleAmountInput = useCallback((val: string) => {
    const cleanNumbers = val.replace(/\D/g, '');
    const numeric = cleanNumbers ? parseInt(cleanNumbers, 10) : 0;
    setNominal(numeric);
    setNominalDisplay(formatNumber(numeric));
  }, []);

  const addPreset = useCallback((preset: number) => {
    setNominal((prev) => {
      const next = prev + preset;
      setNominalDisplay(formatNumber(next));
      return next;
    });
  }, []);

  const selectType = useCallback((type: TransactionType) => {
    setTxType(type);
    if (type === 'income') {
      setTitle('Bonus Januari');
      setCategory('Tabungan');
      setSubCategory('Dana Darurat');
    } else {
      setTitle('Makan');
      setCategory('Makan');
      setSource('Budget Bulanan');
    }
  }, []);

  const toggleCategory = useCallback(() => {
    setCategoryDropdownOpen((prev) => !prev);
    setSourceDropdownOpen(false);
    setSubCategoryDropdownOpen(false);
  }, []);

  const toggleSource = useCallback(() => {
    setSourceDropdownOpen((prev) => !prev);
    setCategoryDropdownOpen(false);
    setSubCategoryDropdownOpen(false);
  }, []);

  const toggleSubCategory = useCallback(() => {
    setSubCategoryDropdownOpen((prev) => !prev);
    setCategoryDropdownOpen(false);
    setSourceDropdownOpen(false);
  }, []);

  const chooseCategory = useCallback((cat: string) => {
    setCategory(cat);
    setCategoryDropdownOpen(false);
  }, []);

  const chooseSource = useCallback((src: string) => {
    setSource(src);
    setSourceDropdownOpen(false);
  }, []);

  const chooseSubCategory = useCallback((sub: string) => {
    setSubCategory(sub);
    setSubCategoryDropdownOpen(false);
  }, []);

  const resetForm = useCallback(() => {
    setNominal(100000);
    setNominalDisplay('100.000');
    setTitle(txType === 'income' ? 'Bonus Januari' : 'Makan');
    setCategory(txType === 'income' ? 'Tabungan' : 'Makan');
    setSource('Budget Bulanan');
    setSubCategory('Dana Darurat');
    setTxDate('2026-11-12');
    setNotes('');
    setCategoryDropdownOpen(false);
    setSourceDropdownOpen(false);
    setSubCategoryDropdownOpen(false);
    setValidationHint(null);
  }, [txType]);

  const submitTransaction = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const trimmedTitle = title.trim();
      const hasTitle = trimmedTitle.length > 0;
      const hasAmount = nominal > 0;

      if (!hasTitle) {
        setValidationHint('Silakan isi judul transaksi');
        return;
      }

      if (!hasAmount) {
        setValidationHint('Nominal transaksi harus lebih dari 0');
        return;
      }

      addTransaction({
        type: txType,
        amount: nominal,
        title: trimmedTitle,
        category,
        source: txType === 'expense' ? source : category,
        subCategory: txType === 'income' ? subCategory : undefined,
        date: txDate,
        notes: notes.trim(),
      });

      resetForm();
      setTransactionModalOpen(false);
    },
    [title, nominal, txType, category, source, subCategory, txDate, notes, addTransaction, resetForm, setTransactionModalOpen]
  );

  const categories = txType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return {
    txType,
    nominal,
    nominalDisplay,
    title,
    category,
    source,
    subCategory,
    txDate,
    notes,
    categoryDropdownOpen,
    sourceDropdownOpen,
    subCategoryDropdownOpen,
    validationHint,
    categories,
    expenseSources: EXPENSE_SOURCES,
    savingsCategories: SAVINGS_CATEGORIES,
    selectType,
    handleAmountInput,
    addPreset,
    setTitle,
    toggleCategory,
    toggleSource,
    toggleSubCategory,
    chooseCategory,
    chooseSource,
    chooseSubCategory,
    setTxDate,
    setNotes,
    submitTransaction,
    resetForm,
  };
};
