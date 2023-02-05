import styled from '@emotion/styled'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { CardActions, Typography, Button } from '@mui/material'
import { FC } from 'react'
import { CopyToClipboard } from '@/shared/ui/CopyToClipboard'

type Props = {
  onCopy: () => string
}
export const SmartActions: FC<Props> = ({ onCopy }) => {
  return (
    <CardActions>
      <CopyToClipboard onClick={onCopy} wrapper={CopyButton} onContainerClick>
        <Typography>Copy card</Typography>
        <ContentCopyIcon />
      </CopyToClipboard>
    </CardActions>
  )
}

const CopyButton = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
CopyButton.defaultProps = {
  variant: 'outlined',
}
