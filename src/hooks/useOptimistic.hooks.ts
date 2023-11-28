import { useCallback, useState } from 'react'

const useOptimistic = <T>(
  initialState: T
): [T, (updateFn: (state: T) => T) => void, () => void] => {
  const [state, setState] = useState<T>(initialState)
  const [tempState, setTempState] = useState<T>(initialState)

  const setOptimistic = useCallback(
    (updateFn: (state: T) => T) => {
      setTempState(state) // Save the current state
      setState(updateFn(state)) // Set the new state optimistically
    },
    [state]
  )

  const rollback = useCallback(() => {
    setState(tempState) // Revert to the saved state
  }, [tempState])

  return [state, setOptimistic, rollback]
}

export default useOptimistic
