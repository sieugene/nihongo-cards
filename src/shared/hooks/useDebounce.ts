import debounce from 'lodash.debounce'
import { useEffect, useMemo } from 'react'

export const useDebounce = <A>(fn: (args: A) => void, interval = 500) => {
  const dbFn = useMemo(() => debounce(fn, interval), [])
  useEffect(() => {
    return () => {
      dbFn.cancel()
    }
  }, [])
  return dbFn
}
