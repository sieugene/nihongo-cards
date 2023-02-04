// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'
import type { NextApiRequest, NextApiResponse } from 'next'

export type FuriganaConvertArgs = { text: string }
export type FuriganaConvertResponse = string

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FuriganaConvertResponse>,
) {
  try {
    const params = req.body as FuriganaConvertArgs
    const kuroshiro = new Kuroshiro()
    await kuroshiro.init(new KuromojiAnalyzer())
    const result = await kuroshiro.convert(params?.text, { to: 'hiragana', mode: 'furigana' })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error as any)
  }
}
