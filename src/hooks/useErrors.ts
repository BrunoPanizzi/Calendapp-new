import { useState } from 'react'

export type error = {
  field: string
  message: string
}

export default function useErrors() {
  const [errors, setErrors] = useState<error[]>([])

  const addError = ({ field, message }: error) => {
    const errorExists = errors.find((error) => error.field === field)

    if (errorExists) return

    setErrors((prevErrors) => [...prevErrors, { field, message }])
  }

  const removeError = (field: error['field']) =>
    setErrors((prevErrors) =>
      prevErrors.filter((error) => error.field !== field)
    )

  const getErrorMessageByField = (field: error['field']) =>
    errors.find((error) => error.field === field)?.message

  return {
    addError,
    removeError,
    getErrorMessageByField,
  }
}
