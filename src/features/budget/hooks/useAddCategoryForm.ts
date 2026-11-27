import { useMemo, useState, type FormEvent } from 'react'
import type {
  AddCategoryFormErrors,
  AddCategoryFormValues,
  AddCategoryInput,
  BudgetCategory,
} from '../../../types/budget'
import {
  amountFromPercent,
  buildTakeFromOptions,
  getTotalPercent,
} from '../../../utils/budget'
import { validateAddCategory } from '../schemas/category.schema'

interface Params {
  categories: BudgetCategory[]
  income: number
  onSubmit: (input: AddCategoryInput) => boolean | Promise<boolean>
  onClose: () => void
}

const INITIAL_VALUES: AddCategoryFormValues = {
  name: '',
  percent: '',
  takeFromId: '',
}

export const useAddCategoryForm = ({
  categories,
  income,
  onSubmit,
  onClose,
}: Params) => {
  const [values, setValues] = useState<AddCategoryFormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<AddCategoryFormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  const percentValue = Number(values.percent) || 0

  const options = useMemo(
    () => buildTakeFromOptions(categories, percentValue, income),
    [categories, percentValue, income],
  )

  const donor = options.find((o) => o.id === values.takeFromId)

  const preview = {
    donor,
    donorAmountBefore: donor
      ? amountFromPercent(income, donor.currentPercent)
      : 0,
    amount: amountFromPercent(income, percentValue),
    total: getTotalPercent(categories),
    canPreview: Boolean(donor?.isEnabled) && percentValue > 0,
  }

  const setName = (name: string) => {
    setValues((v) => ({ ...v, name }))
    setErrors((e) => ({ ...e, name: undefined }))
  }

  const setPercent = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 3)
    const clamped = digits && Number(digits) > 100 ? '100' : digits
    setValues((v) => ({ ...v, percent: clamped }))
    setErrors((e) => ({ ...e, percent: undefined, takeFromId: undefined }))
  }

  const setTakeFromId = (takeFromId: string) => {
    setValues((v) => ({ ...v, takeFromId }))
    setErrors((e) => ({ ...e, takeFromId: undefined }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (submitting) return // cegah klik ganda -> POST dobel

    const nextErrors = validateAddCategory(values, categories)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      const saved = await onSubmit({
        name: values.name,
        percent: Number(values.percent),
        takeFromId: values.takeFromId,
      })
      if (saved) onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return {
    values,
    errors,
    options,
    percentValue,
    preview,
    submitting,
    setName,
    setPercent,
    setTakeFromId,
    handleSubmit,
  }
}
