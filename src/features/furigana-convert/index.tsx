import TextField from '@mui/material/TextField'
import { ChangeEvent, useState } from 'react'
import { useFurigana } from './hooks/useFurigana'
import { useDebounce } from '@/shared/hooks/useDebounce'

const FuriganaConvert = () => {
  const [input, setInput] = useState('')
  const { data, isLoading } = useFurigana(input)
  const handleChange = useDebounce((event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }, 500)

  return (
    <div>
      <TextField
        label='Furigana converter'
        variant='outlined'
        type='text'
        onChange={handleChange}
      />

      {data && <div dangerouslySetInnerHTML={{ __html: data }} />}
    </div>
  )
}

export default FuriganaConvert
