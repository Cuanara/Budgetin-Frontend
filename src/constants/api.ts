export const API_PATHS = {
  login: '/login',
  loginGoogle: '/login-google',
  register: '/register',
  refresh: '/refresh',
  logout: '/logout',
  me: '/me',
} as const

// endpoint yang tidak boleh memicu auto-refresh saat 401
export const NO_REFRESH_PATHS: string[] = [
  API_PATHS.login,
  API_PATHS.loginGoogle,
  API_PATHS.register,
  API_PATHS.refresh,
  API_PATHS.logout,
]
