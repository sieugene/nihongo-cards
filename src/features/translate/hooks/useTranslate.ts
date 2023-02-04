import { useState } from 'react'
import useSWR from 'swr'
import { ApiTranslateArgs } from '@/pages/api/translate'
import { API } from '@/shared/api'

export const useTranslate = (args: ApiTranslateArgs) => {
  return useSWR(
    !!args?.text && `api/translate/${args?.sourceLang}/${args?.targetLang}/${args?.text}`,
    async () => {
      const response = await API.translate(args)
      return response?.data
    },
  )
}
