import useSWR from 'swr'
import { API } from '@/shared/api'

export type JishoPhraseHookData = {
  meanings?: string[]
  slugs?: {
    slug: string
    sense: string
  }[]
}

export const useJishoPhrase = (input: string) => {
  return useSWR(!!input?.length && input, async () => {
    const response = await API.jishoPhrase({ phrase: input })
    const data: JishoPhraseHookData = {
      meanings: response?.data?.scrape?.meanings?.map((meaning) => meaning?.definition),
      slugs: response?.data?.search?.data?.map((search) => {
        const slug = search.slug || ''
        const sense = search?.senses?.[0]?.english_definitions?.[0] || ''
        return { slug, sense }
      }),
    }
    return data
  })
}
