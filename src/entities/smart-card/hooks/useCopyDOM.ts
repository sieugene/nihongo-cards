import { useCallback } from 'react'

export const useCopyDOM = () => {
  return useCallback((id: string) => {
    return document.getElementById(id)?.outerHTML || ''
  }, [])
}
