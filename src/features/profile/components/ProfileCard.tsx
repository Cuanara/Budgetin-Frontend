import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Check, Pencil, X } from 'lucide-react'

interface ProfileCardProps {
  name: string
  joinedDate: string
  photoUrl: string | null
  onNameChange: (name: string) => void
  onPhotoChange: (file: File) => void
}

const MAX_SIZE = 2 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const ProfileCard = ({
  name,
  joinedDate,
  photoUrl,
  onNameChange,
  onPhotoChange,
}: ProfileCardProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const [photoError, setPhotoError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const startEdit = () => {
    setDraft(name)
    setIsEditing(true)
  }

  const saveName = (e: FormEvent) => {
    e.preventDefault()
    const value = draft.trim()
    if (!value) return
    onNameChange(value)
    setIsEditing(false)
  }

  const selectPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = '' // agar file yang sama bisa dipilih lagi
    if (!file) return
    if (!ALLOWED_TYPES.includes(file.type)) {
      setPhotoError('Format harus JPG, PNG, atau WEBP')
      return
    }
    if (file.size > MAX_SIZE) {
      setPhotoError('Ukuran foto maksimal 2 MB')
      return
    }
    setPhotoError('')
    onPhotoChange(file)
  }

  return (
    <section className="flex h-full flex-col items-center rounded-3xl bg-white p-6 text-center shadow-sm">
      <div className="flex size-[72px] items-center justify-center overflow-hidden rounded-full bg-emerald-100 text-3xl font-medium uppercase text-[#0B3B24]">
        {photoUrl ? (
          <img src={photoUrl} alt="Foto profil" className="size-full object-cover" />
        ) : (
          name.charAt(0)
        )}
      </div>

      {isEditing ? (
        <form onSubmit={saveName} className="mt-4 flex items-center gap-2">
          <input
            autoFocus
            aria-label="Nama"
            value={draft}
            maxLength={50}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setIsEditing(false)}
            className="w-48 rounded-xl bg-[#F3F8F4] px-3 py-1.5 text-center text-sm outline-none focus:ring-1 focus:ring-[#0B3B24]"
          />
          <button type="submit" aria-label="Simpan nama" className="cursor-pointer text-emerald-700">
            <Check size={16} />
          </button>
          <button
            type="button"
            aria-label="Batal"
            onClick={() => setIsEditing(false)}
            className="cursor-pointer text-gray-500"
          >
            <X size={16} />
          </button>
        </form>
      ) : (
        <div className="mt-4 flex items-center gap-2">
          <h2 className="text-lg font-semibold">{name}</h2>
          <button
            type="button"
            aria-label="Edit nama"
            onClick={startEdit}
            className="cursor-pointer text-gray-500 transition-colors hover:text-gray-900"
          >
            <Pencil size={14} />
          </button>
        </div>
      )}

      <p className="mt-1 text-[11px] text-gray-500">Bergabung {joinedDate}</p>

      <div className="mt-auto w-full pt-6">
        {photoError && <p className="mb-2 text-[11px] text-red-600">{photoError}</p>}
        <input
          ref={fileRef}
          type="file"
          accept={ALLOWED_TYPES.join(',')}
          onChange={selectPhoto}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-full cursor-pointer rounded-full bg-white py-3 text-xs font-medium text-gray-900 shadow-md ring-1 ring-gray-100 transition-colors hover:bg-gray-50"
        >
          {photoUrl ? 'Ganti Foto Profil' : 'Tambah Foto Profil'}
        </button>
      </div>
    </section>
  )
}