import { Typography, List, ListItem, ListItemText } from '@mui/material'
import { JishoPhraseHookData } from '@/features/jisho-search/hooks/useJishoPhrase'

export const SmartMeanings = ({ meanings }: Pick<JishoPhraseHookData, 'meanings'>) => {
  return (
    <>
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
    </>
  )
}
