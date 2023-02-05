import { Alert, CircularProgress, Link } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { ChangeEvent, useMemo, useState } from 'react'

import { useCopyDOM } from './hooks/useCopyDOM'
import { SmartActions } from './ui/SmartActions'
import { SmartError } from './ui/SmartError'
import FuriganaConvert from '@/features/furigana-convert'
import { useJishoPhrase } from '@/features/jisho-search/hooks/useJishoPhrase'
import Translate from '@/features/translate'
import { useDebounce } from '@/shared/hooks/useDebounce'

export const SmartCard = () => {
  const [input, setInput] = useState('')
  const { isLoading, data, error } = useJishoPhrase(input)

  const emptyData = useMemo(() => !data?.meanings?.length, [data?.meanings])
  const showSlugs = useMemo(
    () => !data?.meanings?.length && data?.slugs?.length,
    [data?.meanings?.length, data?.slugs?.length],
  )

  const onCopyDom = useCopyDOM()
  const handleChange = useDebounce((event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }, 500)

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
            {error && (
              <SmartError>
                <Link href={`https://jisho.org/search/${input}`} target='_blank'>
                  Try search in Jisho
                </Link>
              </SmartError>
            )}
            {showSlugs && (
              <>
                <Typography variant='h5'>Meaning not found, try this variants: </Typography>
                {data?.slugs!.map((slug, index) => {
                  return (
                    <ListItem disablePadding key={index}>
                      <ListItemText primary={slug} />
                    </ListItem>
                  )
                })}
              </>
            )}
            <div id={SmartCard.copyId}>
              {isLoading ? (
                <CircularProgress />
              ) : !emptyData ? (
                <>
                  <Typography variant='h5'>Furigana</Typography>

                  <FuriganaConvert text={input} />
                  <Typography variant='h5'>Meanings</Typography>
                  <List about='meanings'>
                    {data?.meanings!.map((meaning, index) => {
                      return (
                        <ListItem disablePadding key={index}>
                          <ListItemText primary={meaning} />
                        </ListItem>
                      )
                    })}
                  </List>
                  <Typography variant='h5'>Translate</Typography>
                  <Translate
                    meaning={data?.meanings?.[0] || ''}
                    sourceLang='en'
                    targetLang='ru'
                    original={input}
                  />
                  <Typography variant='h5'>Links</Typography>
                  <Link href={`https://jisho.org/search/${input}`} target='_blank'>
                    Jisho
                  </Link>
                </>
              ) : (
                <>
                  <Alert severity='info' style={{ marginBottom: 10 }}>
                    Start searching by typing kanji. Example - 学校
                  </Alert>
                  <Alert severity='warning'>
                    If not work - try use small combinations kanjis or delete space in start.
                  </Alert>
                </>
              )}
            </div>
          </CardContent>

          {!emptyData && <SmartActions onCopy={() => onCopyDom(SmartCard.copyId)} />}
        </Card>
      </Box>
    </div>
  )
}

SmartCard.copyId = "copy-area-content'"

const Input = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`
