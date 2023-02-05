import useSWR from 'swr'
import { API } from '@/shared/api'

export const useJishoPhrase = (input: string) => {
  return useSWR(!!input?.length && input, async () => {
    const response = await API.jishoPhrase({ phrase: input })

    return {
      meanings: response?.data?.scrape?.meanings?.map((meaning) => meaning?.definition),
      slugs: response?.data?.search?.data?.map((search) => search?.slug),
    }
  })
}
