import { Alert, CircularProgress, Link } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { ChangeEvent, useMemo, useState } from 'react'
import { useFurigana } from '../furigana-convert/hooks/useFurigana'
import Translate from '../translate'
import { useJishoPhrase } from './hooks/useJishoPhrase'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { CopyToClipboard } from '@/shared/ui/CopyToClipboard'

const CONSTANT_COPY_AREA = 'copy-area-content'

const JishoPhrase = () => {
  const [input, setInput] = useState('')
  const { data, isLoading: jishoLoading, error: jishoError } = useJishoPhrase(input)
  const {
    data: furiganaData,
    isLoading: furiganaLoading,
    error: furiganaError,
  } = useFurigana(input)
  const loading = useMemo(() => jishoLoading || furiganaLoading, [furiganaLoading, jishoLoading])
  const error = useMemo(() => !!jishoError || !!furiganaError, [furiganaError, jishoError])
  const meanings = useMemo(() => {
    if (data?.meanings?.length) {
      return data?.meanings.map((meaning) => meaning.definition)
    }
  }, [data?.meanings])
  const emptyData = useMemo(() => !meanings?.length, [meanings])

  const copyDOMContent = () => {
    // React useRef not work correctly
    return document.getElementById(CONSTANT_COPY_AREA)?.outerHTML || ''
  }
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
              <div style={{ marginBottom: 10 }}>
                <Alert severity='error' style={{ marginBottom: 10 }}>
                  Has error when fetching data, try again or change search query.
                </Alert>
                <Link href={`https://jisho.org/search/${input}`} target='_blank'>
                  Try search in Jisho
                </Link>
              </div>
            )}
            <div id={CONSTANT_COPY_AREA}>
              {loading ? (
                <CircularProgress />
              ) : !emptyData ? (
                <>
                  <Typography variant='h5'>Furigana</Typography>
                  {furiganaData && <div dangerouslySetInnerHTML={{ __html: furiganaData }} />}
                  <Typography variant='h5'>Meanings</Typography>
                  <List about='meanings'>
                    {meanings!.map((meaning, index) => {
                      return (
                        <ListItem disablePadding key={index}>
                          <ListItemText primary={meaning} />
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
                </>
              ) : (
                <>
                  <Alert severity='info' style={{ marginBottom: 10 }}>
                    Start searching by typing kanji. Example - 学校
                  </Alert>
                  <Alert severity='warning'>If not work - try use small combinations kanjis.</Alert>
                </>
              )}
            </div>
          </CardContent>

          {!emptyData && (
            <CardActions>
              <CopyToClipboard onClick={() => furiganaData || ''}>
                <Typography>Front Side</Typography>
              </CopyToClipboard>
              <CopyToClipboard onClick={copyDOMContent}>
                <Typography>Back Side</Typography>
              </CopyToClipboard>
            </CardActions>
          )}
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
