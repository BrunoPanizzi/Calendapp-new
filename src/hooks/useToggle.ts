import { useState } from 'react'

export default function useToggle<I, N>(
  initialValue: I,
  nextValue: N
): [I | N, () => void] {
  const [currentValue, setCurrentValue] = useState<I | N>(initialValue)

  const toggle = () =>
    setCurrentValue((prevValue) =>
      prevValue === initialValue ? nextValue : initialValue
    )

  return [currentValue, toggle]
}
