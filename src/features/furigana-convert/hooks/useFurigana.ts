import { useState } from 'react'
import useSWR from 'swr'
import { API } from '@/shared/api'

export const useFurigana = (input: string) => {
  return useSWR(!!input?.length && `api/furigana-converter/${input}`, async () => {
    const response = await API.convertFurigana({ text: input })
    return response?.data
  })
}
