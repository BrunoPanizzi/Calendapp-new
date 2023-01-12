import { useState } from 'react'

export default function useToggle<T>(
  initialValue: T,
  nextValue: T
): [T, () => void] {
  const [currentValue, setCurrentValue] = useState<T>(initialValue)

  const toggle = () =>
    setCurrentValue((prevValue) =>
      prevValue === initialValue ? nextValue : initialValue
    )

  return [currentValue, toggle]
}
