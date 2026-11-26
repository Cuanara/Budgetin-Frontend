import { useState, type FormEvent } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  autoFocus?: boolean
}

const PasswordField = ({ id, label, value, onChange, autoFocus }: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="mb-3">
      <label htmlFor={id} className="mb-1.5 block text-[11px] text-gray-600">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl bg-[#F3F8F4] px-4 py-3 pr-10 text-xs text-gray-900 outline-none focus:ring-1 focus:ring-[#0B3B24]"
        />
        <button
          type="button"
          aria-label={visible ? 'Sembunyikan password' : 'Lihat password'}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
        >
          {visible ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </div>
    </div>
  )
}

export const ChangePasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!oldPassword || !newPassword || !confirmPassword)
      return setMessage('Semua kolom wajib diisi')
    if (newPassword.length < 8) return setMessage('Password baru minimal 8 karakter')
    if (newPassword === oldPassword)
      return setMessage('Password baru harus berbeda dari password lama')
    if (newPassword !== confirmPassword)
      return setMessage('Konfirmasi password tidak sama')

    // TODO: panggil endpoint ubah password, lalu onClose() jika berhasil
    setMessage('Data valid, tapi password belum diubah karena API belum tersambung')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-password-title"
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-lg"
      >
        <h2 id="change-password-title" className="mb-4 text-base font-medium">
          Ubah Password
        </h2>

        <PasswordField id="old-password" label="Password lama" value={oldPassword} onChange={setOldPassword} autoFocus />
        <PasswordField id="new-password" label="Password baru" value={newPassword} onChange={setNewPassword} />
        <PasswordField id="confirm-password" label="Konfirmasi password baru" value={confirmPassword} onChange={setConfirmPassword} />

        {message && <p role="alert" className="text-[11px] text-red-600">{message}</p>}

        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="cursor-pointer rounded-full px-5 py-2.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
            Batal
          </button>
          <button type="submit" className="cursor-pointer rounded-full bg-[#0B3B24] px-5 py-2.5 text-xs font-medium text-white">
            Simpan
          </button>
        </div>
      </form>
    </div>
  )
}