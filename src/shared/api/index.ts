import axios from 'axios'
import { FuriganaConvertArgs, FuriganaConvertResponse } from '@/pages/api/furigana'
import { ApiJishoArgs, ApiJishoResponse } from '@/pages/api/jisho'
import { ApiTranslateArgs, ApiTranslateResponse } from '@/pages/api/translate'

export const API = {
  baseEndpoint: '/api/',
  convertFurigana: (args: FuriganaConvertArgs) =>
    axios.post<FuriganaConvertResponse>(`${API.baseEndpoint}/furigana`, {
      ...args,
    }),
  jishoPhrase: (args: ApiJishoArgs) =>
    axios.post<ApiJishoResponse>(`${API.baseEndpoint}/jisho`, {
      ...args,
    }),
  translate: (args: ApiTranslateArgs) =>
    axios.post<ApiTranslateResponse>(`${API.baseEndpoint}/translate`, {
      ...args,
    }),
}
