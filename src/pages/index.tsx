import Container from '@mui/material/Container'
import { SmartCard } from '@/entities/smart-card'
import FuriganaConvert from '@/features/furigana-convert'
import JishoSearch from '@/features/jisho-search'

export default function Home() {
  return (
    <>
      <Container maxWidth='lg' style={{ marginTop: 15 }}>
        {/* <FuriganaConvert text='学校側' />
        <JishoSearch /> */}
        <SmartCard />
      </Container>
    </>
  )
}
