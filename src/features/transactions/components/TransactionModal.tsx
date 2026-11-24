import React from 'react';
import {
  CloseIcon,
  ChevronDownIcon,
  CalendarIcon,
  CheckIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '../../../components/icons';
import { useTransactionModal } from '../../../hooks/useTransactionModal';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    txType,
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
    expenseSources,
    savingsCategories,
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
  } = useTransactionModal();

  if (!isOpen) return null;

  const handleModalClose = () => {
    resetForm();
    onClose();
  };

  const isIncome = txType === 'income';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#0C2B1E] rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-[#1B4A34] max-h-[92vh] overflow-y-auto transform animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#143D2A]">
          <div className="w-6" />
          <h3 className="text-base font-bold text-white text-center">
            Catatan Transaksi
          </h3>
          <button
            type="button"
            onClick={handleModalClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#7FA392] hover:text-white hover:bg-[#133D29] transition-colors cursor-pointer"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={submitTransaction} className="mt-4 space-y-4">
          {/* Tabs: Pemasukkan / Pengeluaran */}
          <div className="grid grid-cols-2 gap-3 p-1 bg-[#071C13] rounded-full border border-[#16432F]">
            <button
              type="button"
              onClick={() => selectType('income')}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isIncome
                  ? 'bg-[#1E5E3E] text-white border border-[#22C55E] shadow-sm'
                  : 'text-[#7FA392] hover:text-white'
              }`}
            >
              <ArrowDownIcon className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Pemasukkan</span>
            </button>

            <button
              type="button"
              onClick={() => selectType('expense')}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
                !isIncome
                  ? 'bg-[#4A2018] text-white border border-[#F87171] shadow-sm'
                  : 'text-[#7FA392] hover:text-white'
              }`}
            >
              <ArrowUpIcon className="w-3.5 h-3.5 text-[#F87171]" />
              <span>Pengeluaran</span>
            </button>
          </div>

          {/* Nominal Transaksi */}
          <div>
            <label className="block text-xs font-semibold text-[#8FAEA0] mb-1">
              Nominal Transaksi<span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative flex items-center rounded-2xl border border-[#1B4E37] bg-[#103827] px-4 py-3 focus-within:border-[#22C55E] transition-all">
              <span className="text-base font-extrabold text-white mr-2">Rp.</span>
              <input
                type="text"
                value={nominalDisplay}
                onChange={(e) => handleAmountInput(e.target.value)}
                placeholder="0"
                className="w-full text-xl sm:text-2xl font-extrabold text-white bg-transparent outline-hidden"
              />
            </div>

            {/* Quick preset chips */}
            <div className="flex flex-wrap gap-2 mt-2">
              {[10000, 20000, 50000, 100000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => addPreset(val)}
                  className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#144A32] hover:bg-[#1A5E40] text-[#34D399] border border-[#1C5D3E] transition-colors cursor-pointer"
                >
                  +{val.toLocaleString('id-ID')}
                </button>
              ))}
            </div>
          </div>

          {/* Pemasukan / Pengeluaran Title Input */}
          <div>
            <label className="block text-xs font-semibold text-[#8FAEA0] mb-1">
              {isIncome ? 'Pemasukan' : 'Pengeluaran'}<span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={isIncome ? 'Bonus Januari' : 'Makan'}
              className="w-full rounded-2xl border border-[#1B4E37] bg-[#103827] px-4 py-2.5 text-xs text-white focus:border-[#22C55E] outline-hidden transition-all"
            />
          </div>

          {/* Dropdown 1: Sumber Pengeluaran (if expense) OR Kategori (if income) */}
          {!isIncome ? (
            <div className="relative">
              <label className="block text-xs font-semibold text-[#8FAEA0] mb-1">
                Sumber Pengeluaran<span className="text-[#EF4444]">*</span>
              </label>
              <button
                type="button"
                onClick={toggleSource}
                className="w-full flex items-center justify-between rounded-2xl border border-[#1B4E37] bg-[#103827] px-4 py-2.5 text-xs text-white focus:border-[#22C55E] transition-all cursor-pointer"
              >
                <span>{source}</span>
                <ChevronDownIcon className="w-4 h-4 text-[#8FAEA0]" />
              </button>

              {sourceDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#0C2B1E] rounded-2xl shadow-xl border border-[#1C543B] py-1.5 z-20">
                  {expenseSources.map((src) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => chooseSource(src)}
                      className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                        source === src
                          ? 'bg-[#154E34] text-white font-bold'
                          : 'text-[#8FAEA0] hover:bg-[#113827] hover:text-white'
                      }`}
                    >
                      {src}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <label className="block text-xs font-semibold text-[#8FAEA0] mb-1">
                Kategori<span className="text-[#EF4444]">*</span>
              </label>
              <button
                type="button"
                onClick={toggleCategory}
                className="w-full flex items-center justify-between rounded-2xl border border-[#1B4E37] bg-[#103827] px-4 py-2.5 text-xs text-white focus:border-[#22C55E] transition-all cursor-pointer"
              >
                <span>{category}</span>
                <ChevronDownIcon className="w-4 h-4 text-[#8FAEA0]" />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#0C2B1E] rounded-2xl shadow-xl border border-[#1C543B] py-1.5 z-20">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => chooseCategory(cat)}
                      className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                        category === cat
                          ? 'bg-[#154E34] text-white font-bold'
                          : 'text-[#8FAEA0] hover:bg-[#113827] hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Dropdown 2: Kategori (if expense) OR Kategori Tabungan (if income) */}
          {!isIncome ? (
            <div className="relative">
              <label className="block text-xs font-semibold text-[#8FAEA0] mb-1">
                Kategori<span className="text-[#EF4444]">*</span>
              </label>
              <button
                type="button"
                onClick={toggleCategory}
                className="w-full flex items-center justify-between rounded-2xl border border-[#1B4E37] bg-[#103827] px-4 py-2.5 text-xs text-white focus:border-[#22C55E] transition-all cursor-pointer"
              >
                <span>{category}</span>
                <ChevronDownIcon className="w-4 h-4 text-[#8FAEA0]" />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#0C2B1E] rounded-2xl shadow-xl border border-[#1C543B] py-1.5 z-20 max-h-48 overflow-y-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => chooseCategory(cat)}
                      className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                        category === cat
                          ? 'bg-[#154E34] text-white font-bold'
                          : 'text-[#8FAEA0] hover:bg-[#113827] hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <label className="block text-xs font-semibold text-[#8FAEA0] mb-1">
                Kategori Tabungan<span className="text-[#EF4444]">*</span>
              </label>
              <button
                type="button"
                onClick={toggleSubCategory}
                className="w-full flex items-center justify-between rounded-2xl border border-[#1B4E37] bg-[#103827] px-4 py-2.5 text-xs text-white focus:border-[#22C55E] transition-all cursor-pointer"
              >
                <span>{subCategory}</span>
                <ChevronDownIcon className="w-4 h-4 text-[#8FAEA0]" />
              </button>

              {subCategoryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#0C2B1E] rounded-2xl shadow-xl border border-[#1C543B] py-1.5 z-20">
                  {savingsCategories.map((sav) => (
                    <button
                      key={sav}
                      type="button"
                      onClick={() => chooseSubCategory(sav)}
                      className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                        subCategory === sav
                          ? 'bg-[#154E34] text-white font-bold'
                          : 'text-[#8FAEA0] hover:bg-[#113827] hover:text-white'
                      }`}
                    >
                      {sav}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tanggal Transaksi */}
          <div>
            <label className="block text-xs font-semibold text-[#8FAEA0] mb-1">
              Tanggal Transaksi<span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative flex items-center">
              <input
                type="date"
                value={txDate}
                onChange={(e) => setTxDate(e.target.value)}
                className="w-full rounded-2xl border border-[#1B4E37] bg-[#103827] px-4 py-2.5 text-xs text-white focus:border-[#22C55E] outline-hidden transition-all"
              />
              <div className="absolute right-4 pointer-events-none text-[#8FAEA0]">
                <CalendarIcon className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Tambah Catatan ( Opsional ) */}
          <div>
            <label className="block text-xs font-semibold text-[#8FAEA0] mb-1">
              Tambah Catatan ( Opsional )
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ketik Catatan disini"
              className="w-full rounded-2xl border border-[#1B4E37] bg-[#103827] px-4 py-2.5 text-xs text-white focus:border-[#22C55E] outline-hidden resize-none transition-all"
            />
          </div>

          {/* Form validation hint */}
          {validationHint && (
            <p className="text-xs font-medium text-[#F87171] bg-[#381616] px-3 py-2 rounded-xl border border-[#521C1C]">
              {validationHint}
            </p>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-[#062015] text-xs font-bold tracking-wide shadow-lg shadow-[#22C55E]/20 transition-all transform active:scale-98 cursor-pointer"
            >
              <CheckIcon className="w-4 h-4 text-[#062015]" />
              <span>Simpan Data Transaksi</span>
            </button>
            <p className="text-[11px] text-[#7FA392] text-center mt-2.5">
              Data otomatis mensinkronisasi saldo tabungan & persentase budget kamu.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
