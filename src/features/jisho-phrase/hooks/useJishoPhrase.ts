import { useState } from 'react'
import useSWR from 'swr'
import { API } from '@/shared/api'

export const useJishoPhrase = (input: string) => {
  return useSWR(!!input?.length && `api/jisho-phrase/${input}`, async () => {
    const response = await API.jishoPhrase({ phrase: input })
    return response?.data
  })
}
