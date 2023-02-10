import styled from '@emotion/styled'
import { Typography, ListItem, ListItemText } from '@mui/material'
import { JishoPhraseHookData } from '@/features/jisho-search/hooks/useJishoPhrase'

type Props = Pick<JishoPhraseHookData, 'slugs'> & {
  onSelect: (slug: string) => void
}
export const SmartSlugs = ({ slugs, onSelect }: Props) => {
  return (
    <>
      <Typography variant='h5'>Meaning not found, try this variants: </Typography>
      {slugs!.map(({ slug, sense }, index) => {
        return (
          <ListItem disablePadding key={index}>
            <div>
              <SmartSlugs.Item
                primary={`${slug} (${sense || ''})`}
                onDoubleClick={() => onSelect(slug)}
              />
            </div>
          </ListItem>
        )
      })}
    </>
  )
}

SmartSlugs.Item = styled(ListItemText)`
  cursor: pointer;
  transition: 0.7s all ease;
  opacity: 1;
  &:hover {
    opacity: 0.3;
  }
`
