import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { ChangePasswordModal } from './ChangePasswordModal'

interface ProfileFormProps {
  email: string
}

const fieldClass =
  'w-full rounded-xl bg-[#F3F8F4] px-4 py-3 text-xs text-gray-900 outline-none'

export const ProfileForm = ({ email }: ProfileFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-medium">Akun</h2>

      <label htmlFor="profile-email" className="mb-1.5 block text-[11px] text-gray-600">
        Email
      </label>
      <input
        id="profile-email"
        type="email"
        value={email}
        readOnly
        className={`${fieldClass} mb-4`}
      />

      <label htmlFor="profile-password" className="mb-1.5 block text-[11px] text-gray-600">
        Password
      </label>
      <div className="relative">
        <input
          id="profile-password"
          type="text"
          value={showPassword ? 'Tidak dapat ditampilkan' : '••••••••••'}
          readOnly
          className={`${fieldClass} pr-10`}
        />
        <button
          type="button"
          aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
        >
          {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer rounded-full bg-white px-5 py-2.5 text-xs font-medium text-gray-900 shadow-md ring-1 ring-gray-100 transition-colors hover:bg-gray-50"
        >
          Ubah Password
        </button>
      </div>

      {isModalOpen && <ChangePasswordModal onClose={() => setIsModalOpen(false)} />}
    </section>
  )
}