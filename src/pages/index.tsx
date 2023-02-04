import Container from '@mui/material/Container'
import FuriganaConvert from '@/features/furigana-convert'
import JishoPhrase from '@/features/jisho-phrase'

export default function Home() {
  return (
    <>
      <Container maxWidth='lg' style={{ marginTop: 15 }}>
        {/* <FuriganaConvert /> */}
        <JishoPhrase />
      </Container>
    </>
  )
}
