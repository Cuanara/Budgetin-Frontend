import { useState, type FormEvent } from 'react'
import { useSavingsStore } from '../../../stores/savingsStore'
import { addTargetSchema } from '../schemas'

export const useAddTargetForm = (onClose: () => void) => {
  const addGoal = useSavingsStore((s) => s.addGoal)
  const [name, setName] = useState('')
  const [digits, setDigits] = useState('')
  const [error, setError] = useState('')

  const close = () => {
    setName('')
    setDigits('')
    setError('')
    onClose()
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const result = addTargetSchema.safeParse({ name, target: Number(digits) })
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }
    addGoal(result.data.name, result.data.target)
    close()
  }

  return {
    name,
    setName,
    targetText: digits ? Number(digits).toLocaleString('id-ID') : '',
    setTarget: (value: string) => setDigits(value.replace(/\D/g, '')),
    error,
    submit,
    close,
  }
}