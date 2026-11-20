import { useEffect, useState } from 'react'

// Mulai dari `from`, lalu bergeser ke `to` supaya bar progres beranimasi
export const useAnimatedPercent = (from: number, to: number) => {
  const [value, setValue] = useState(from)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setValue(to))
    return () => cancelAnimationFrame(frame)
  }, [to])

  return value
}