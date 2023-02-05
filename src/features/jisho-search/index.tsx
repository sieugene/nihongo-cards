import { Alert, CircularProgress } from '@mui/material'
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
import { useJishoPhrase } from './hooks/useJishoPhrase'
import { useDebounce } from '@/shared/hooks/useDebounce'

const JishoSearch = () => {
  const [input, setInput] = useState('')
  const { data, isLoading: jishoLoading } = useJishoPhrase(input)
  const loading = useMemo(() => jishoLoading, [jishoLoading])

  const emptyData = useMemo(() => !data?.meanings?.length, [data?.meanings])

  const handleChange = useDebounce((event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }, 500)

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant='outlined'>
        <CardContent>
          <Input type='text' onChange={handleChange} label='Search meanings' variant='outlined' />

          {loading ? (
            <CircularProgress />
          ) : !emptyData ? (
            <>
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
            </>
          ) : (
            <>
              <Alert severity='info' style={{ marginBottom: 10 }}>
                Start searching by typing kanji.
              </Alert>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

const Input = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`

export default JishoSearch
