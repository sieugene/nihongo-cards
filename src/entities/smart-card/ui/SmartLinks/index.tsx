import { Link, Typography } from '@mui/material'

export const SmartLinks = ({ input }: { input: string }) => {
  return (
    <>
      <Typography variant='h5'>Links</Typography>
      <Link href={`https://jisho.org/search/${input}`} target='_blank'>
        Jisho
      </Link>
    </>
  )
}
