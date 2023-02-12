import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'
import type { NextApiRequest, NextApiResponse } from 'next'

export type FuriganaConvertArgs = { text: string }
export type FuriganaConvertResponse = { furigana: string; onlyHiragana: string; okurigana: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FuriganaConvertResponse>,
) {
  try {
    const params = req.body as FuriganaConvertArgs
    const kuroshiro = new Kuroshiro()
    await kuroshiro.init(new KuromojiAnalyzer({ dictPath: 'public/dictionary' }))
    const furigana = await kuroshiro.convert(params?.text, { to: 'hiragana', mode: 'furigana' })
    const onlyHiragana = await kuroshiro.convert(params?.text, { to: 'hiragana', mode: 'normal' })
    const okurigana = await kuroshiro.convert(params?.text, { to: 'hiragana', mode: 'okurigana' })

    res.status(200).json({
      furigana,
      onlyHiragana,
      okurigana,
    })
  } catch (error) {
    res.status(500).json(error as any)
  }
}
