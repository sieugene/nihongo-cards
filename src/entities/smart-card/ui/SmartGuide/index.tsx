import { Alert, CircularProgress, Link } from '@mui/material'

export const SmartGuide = () => {
  return (
    <>
      <Alert severity='info'>Start searching by typing kanji. Example - 学校</Alert>
      <Alert severity='warning'>
        If not work - try use small combinations kanjis or delete space in start.
      </Alert>
    </>
  )
}
