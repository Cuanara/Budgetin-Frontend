export const canNotify = () => 'Notification' in window

export const requestNotifyPermission = async () => {
  if (!canNotify()) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false
  return (await Notification.requestPermission()) === 'granted'
}

export const sendNotification = (title: string, body: string) => {
  if (!canNotify() || Notification.permission !== 'granted') return
  const notification = new Notification(title, {
    body,
    icon: '/images/logo.png',
  })
  notification.onclick = () => {
    window.focus()
    notification.close()
  }
}