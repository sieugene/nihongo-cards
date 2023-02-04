// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import JishoAPI from 'unofficial-jisho-api'

export type ApiJishoArgs = { phrase: string }
export type ApiJishoResponse = Awaited<ReturnType<JishoAPI['scrapeForPhrase']>>

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiJishoResponse>) {
  try {
    const params = req.body as ApiJishoArgs

    const result = await new JishoAPI().scrapeForPhrase(params.phrase)
    if (!result.found) {
      return res.status(404).json('not found' as any)
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error as any)
  }
}
