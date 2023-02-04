import axios from 'axios'
import { FuriganaConvertArgs, FuriganaConvertResponse } from '@/pages/api/furigana'

export const API = {
  baseEndpoint: '/api/',
  convertFurigana: (args: FuriganaConvertArgs) =>
    axios.post<FuriganaConvertResponse>(`${API.baseEndpoint}/furigana`, {
      ...args,
    }),
}
