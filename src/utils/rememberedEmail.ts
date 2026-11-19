const KEY = 'remembered_email'

export function saveRememberedEmail(email: string) {
  localStorage.setItem(KEY, email)
}

export function getRememberedEmail(): string {
  return localStorage.getItem(KEY) ?? ''
}

export function clearRememberedEmail() {
  localStorage.removeItem(KEY)
}