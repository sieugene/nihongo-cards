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
      <input type='text' onChange={handleChange} />
      <h2> {isLoading && 'loading...'}</h2>

      {data && <div dangerouslySetInnerHTML={{ __html: data }} />}
    </div>
  )
}

export default FuriganaConvert
