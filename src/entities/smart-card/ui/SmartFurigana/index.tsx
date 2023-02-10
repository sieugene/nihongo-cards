import { Typography } from '@mui/material'
import FuriganaConvert from '@/features/furigana-convert'

export const SmartFurigana = ({ input }: { input: string }) => {
  return (
    <>
      <Typography variant='h5'>Furigana</Typography>
      <FuriganaConvert text={input} />
    </>
  )
}
