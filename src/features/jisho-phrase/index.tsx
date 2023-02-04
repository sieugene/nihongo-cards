import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { ChangeEvent, forwardRef, useMemo, useState } from 'react'
import { useFurigana } from '../furigana-convert/hooks/useFurigana'
import Translate from '../translate'
import { useJishoPhrase } from './hooks/useJishoPhrase'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { CopyToClipboard } from '@/shared/ui/CopyToClipboard'

const JishoPhrase = () => {
  const [input, setInput] = useState('')
  const { data, isLoading } = useJishoPhrase(input)
  const { data: furiganaData } = useFurigana(input)
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
      <Box sx={{ minWidth: 275 }}>
        <Card variant='outlined'>
          <CardContent>
            <Input
              type='text'
              onChange={handleChange}
              label='Search kanji meaning'
              variant='outlined'
            />
            <Typography variant='h5'>Meanings</Typography>
            {meanings ? (
              <>
                <List about='meanings'>
                  {meanings.map((meaning, index) => {
                    return (
                      <ListItem disablePadding key={index}>
                        <ListItemButton>
                          <ListItemText primary={meaning} />
                        </ListItemButton>
                      </ListItem>
                    )
                  })}
                </List>
                <Typography variant='h5'>Translate</Typography>
                <Translate
                  meaning={meanings?.[0] || ''}
                  sourceLang='en'
                  targetLang='ru'
                  original={input}
                />
                <Typography variant='h5'>Furigana</Typography>
                {furiganaData && (
                  <div>
                    <CopyToClipboard data={furiganaData}>
                      <div dangerouslySetInnerHTML={{ __html: furiganaData }} />
                    </CopyToClipboard>
                  </div>
                )}
              </>
            ) : (
              <Typography>Start search</Typography>
            )}
          </CardContent>
          <CardActions>
            <Button size='small'>Learn More</Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  )
}

const Input = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`

export default JishoPhrase
