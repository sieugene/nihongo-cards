// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import JishoAPI from 'unofficial-jisho-api'

export type ApiJishoArgs = { phrase: string }
export type ApiJishoResponse = {
  scrape: Awaited<ReturnType<JishoAPI['scrapeForPhrase']>>
  search: Awaited<ReturnType<JishoAPI['searchForPhrase']>>
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiJishoResponse>) {
  try {
    const params = req.body as ApiJishoArgs
    const api = new JishoAPI()
    const scrape = await api.scrapeForPhrase(params.phrase)
    const search = await api.searchForPhrase(params.phrase)
    const data = { scrape, search }
    if (!scrape.found && !search.data?.length) {
      throw new Error(data as any)
    }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error as any)
  }
}
