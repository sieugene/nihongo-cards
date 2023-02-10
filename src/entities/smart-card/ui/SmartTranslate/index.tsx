import { Typography } from '@mui/material'
import Translate from '@/features/translate'

export const SmartTranslate = ({ meaning, input }: { meaning: string; input: string }) => {
  return (
    <>
      <Typography variant='h5'>Translate</Typography>
      <Translate meaning={meaning} sourceLang='en' targetLang='ru' original={input} />
    </>
  )
}
