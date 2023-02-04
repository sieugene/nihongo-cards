// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import JishoAPI from 'unofficial-jisho-api'

export type ApiJishoArgs = { phrase: string }
export type ApiJishoResponse = Awaited<ReturnType<JishoAPI['scrapeForPhrase']>>

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiJishoResponse>) {
  const params = req.body as ApiJishoArgs

  const result = await new JishoAPI().scrapeForPhrase(params.phrase)
  res.status(200).json(result)
}
