import { TextField } from '@mui/material'
import Container from '@mui/material/Container'
import { ChangeEvent, useState } from 'react'
import { SmartCard } from '@/entities/smart-card'
import FuriganaConvert from '@/features/furigana-convert'
import { EditableFurigana } from '@/features/furigana-convert/ui/EditableFurigana'
import { useDebounce } from '@/shared/hooks/useDebounce'

export default function Home() {
  return (
    <>
      <Container maxWidth='lg' style={{ marginTop: 15 }}>
        <SmartCard />
      </Container>
    </>
  )
}
