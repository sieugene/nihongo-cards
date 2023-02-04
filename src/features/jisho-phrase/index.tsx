import { ChangeEvent, useMemo, useState } from 'react'

import { useJishoPhrase } from './hooks/useJishoPhrase'
import { useDebounce } from '@/shared/hooks/useDebounce'

const JishoPhrase = () => {
  const [input, setInput] = useState('')
  const { data, isLoading } = useJishoPhrase(input)
  const handleChange = useDebounce((event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }, 500)
  const meanings = useMemo(() => {
    if (data?.meanings?.length) {
      return data?.meanings.map((meaning) => meaning.definition)
    }
  }, [data?.meanings])

  return (
    <div>
      <h2>Jisho search</h2>
      <input type='text' onChange={handleChange} />
      <h2> {isLoading && 'loading...'}</h2>
      <ul>
        {meanings &&
          meanings.map((meaning, index) => {
            return <li key={index}>{meaning}</li>
          })}
      </ul>
    </div>
  )
}

export default JishoPhrase
