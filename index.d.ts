declare module 'kuroshiro' {
  export default class Kuroshiro {
    constructor() {}
    init: (KuromojiAnalyzer: any) => Promise<void>
    convert: (
      text: string,
      opts?: {
        to?: 'hiragana' | 'katakana' | 'romaji'
        mode?: 'normal' | 'spaced' | 'okurigana' | 'furigana'
      },
    ) => Promise<string>
  }
}

declare module 'kuroshiro-analyzer-kuromoji' {
  export default class KuromojiAnalyzer {
    constructor({}: { dictPath: string }) {}
  }
}
