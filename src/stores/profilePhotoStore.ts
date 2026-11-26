import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProfilePhotoState {
  photos: Record<string, string> // kunci: email user
  setPhoto: (email: string, photo: string) => void
}

export const useProfilePhotoStore = create<ProfilePhotoState>()(
  persist(
    (set) => ({
      photos: {},
      setPhoto: (email, photo) =>
        set((s) => ({ photos: { ...s.photos, [email]: photo } })),
    }),
    { name: 'budgetin-profile-photo' },
  ),
)