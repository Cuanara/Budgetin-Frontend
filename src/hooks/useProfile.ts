import { useCallback, useEffect } from 'react'
import { getMe } from '../services/authService'
import { useAuthStore } from '../stores/authStore'
import { useProfilePhotoStore } from '../stores/profilePhotoStore'
import { useBudgetStore } from '../stores/useBudgetStore'
import type { NotificationSettingsState } from '../types/profile'
import { resizeImage } from '../utils/image'

export const useProfile = () => {
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  const setUser = useAuthStore((s) => s.setUser)

  const photoUrl = useProfilePhotoStore((s) =>
    user ? (s.photos[user.email] ?? null) : null,
  )
  const setPhoto = useProfilePhotoStore((s) => s.setPhoto)

  // TODO: tanggal bergabung belum ada di data user dari BE, sementara dari mock
  const joinedDate = useBudgetStore((s) => s.profile.joinedDate)
  const notifications = useBudgetStore((s) => s.notifications)
  const toggleNotification = useBudgetStore((s) => s.toggleNotification)

  // setelah refresh halaman, user di store kosong; ambil ulang dari /me
  useEffect(() => {
    if (token && !user) {
      getMe()
        .then(setUser)
        .catch(() => {})
    }
  }, [token, user, setUser])

  const handleToggle = useCallback(
    (key: keyof NotificationSettingsState) => {
      toggleNotification(key)
    },
    [toggleNotification],
  )

  // TODO: kirim ke BE; sementara hanya mengubah data di store
  const handleNameChange = useCallback(
    (name: string) => {
      if (user) setUser({ ...user, name })
    },
    [user, setUser],
  )

  // TODO: upload ke BE; sementara disimpan di browser
  const handlePhotoChange = useCallback(
    async (file: File) => {
      if (!user) return
      try {
        setPhoto(user.email, await resizeImage(file))
      } catch {
        alert('Foto gagal diproses, coba pilih foto lain')
      }
    },
    [user, setPhoto],
  )

  return {
    name: user?.name ?? '',
    email: user?.email ?? '',
    joinedDate,
    notifications,
    photoUrl,
    handleToggle,
    handleNameChange,
    handlePhotoChange,
  }
}