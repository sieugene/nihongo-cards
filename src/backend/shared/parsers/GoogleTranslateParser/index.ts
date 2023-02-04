import axios from 'axios'

type GoogleTranslateResponse = [[[string, string, null, null, number]]]

export class GoogleTranslateParser {
  constructor(private readonly sourceLang = 'en', private readonly targetLang = 'ja') {}
  async translate(text: string) {
    const { data } = await axios.get<GoogleTranslateResponse>(this.uri + text)
    return data?.[0]?.[0]?.[0]
  }
  get uri() {
    return `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${this.sourceLang}&tl=${this.targetLang}&dt=t&q=`
  }
}
