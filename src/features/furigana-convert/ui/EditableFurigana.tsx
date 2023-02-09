import { TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import FuriganaConvert from '..'
import { useDebounce } from '@/shared/hooks/useDebounce'

export const EditableFurigana = () => {
  const [input, setInput] = useState('')
  const handleChange = useDebounce((event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }, 500)
  return (
    <div style={{ marginTop: 30 }}>
      <TextField
        onChange={handleChange}
        style={{ height: 50, marginBottom: 20, width: 350 }}
        variant='outlined'
        label='Furigana convert'
      />
      <FuriganaConvert text={input} />
    </div>
  )
}
