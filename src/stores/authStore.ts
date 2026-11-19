import { create } from 'zustand'
import type { User } from '../types/auth'
import { clearToken, getToken } from '../utils/tokenStorage'

interface AuthState {
  token: string | null
  user: User | null
  setSession: (token: string, user: User) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getToken(),
  user: null,
  setSession: (token, user) => set({ token, user }),
  clearSession: () => {
    clearToken()
    set({ token: null, user: null })
  },
}))