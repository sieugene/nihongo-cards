import JishoAPI from 'unofficial-jisho-api'
import FuriganaConvert from '@/features/furigana-convert'
import JishoPhrase from '@/features/jisho-phrase'

export default function Home() {
  return (
    <>
      <h1>Furigana converter</h1>
      <FuriganaConvert />
      <JishoPhrase />
    </>
  )
}
