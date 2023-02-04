import axios from 'axios'
import * as cheerio from 'cheerio'
import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleTranslateParser } from '@/backend/shared/parsers'

export type ApiTranslateArgs = { sourceLang?: string; targetLang?: string; text: string }
export type ApiTranslateResponse = string

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiTranslateResponse>,
) {
  try {
    const params = req.body as ApiTranslateArgs
    const translate = await new GoogleTranslateParser(
      params.sourceLang || 'en',
      params.targetLang || 'ja',
    ).translate(params.text)

    res.status(200).json(translate)
  } catch (error) {
    res.status(500).json(error as any)
  }
}
