import styled from '@emotion/styled'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import MuiAlert from '@mui/material/Alert'
import Button from '@mui/material/Button'

import Snackbar from '@mui/material/Snackbar'
import { FC, forwardRef, useState } from 'react'

type Props = {
  data: string
  children: React.ReactNode
}
const Alert = forwardRef<HTMLDivElement, any>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const CopyToClipboard: FC<Props> = ({ data, children }) => {
  const [open, setOpen] = useState(false)

  const handleCopy = () => {
    if (!data) return
    navigator.clipboard.writeText(data)
    setOpen(true)
  }
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Text was copied!
        </Alert>
      </Snackbar>
      <CopyBtn onClick={handleCopy} variant='outlined'>
        {children}
        <ContentCopyIcon />
      </CopyBtn>
    </>
  )
}

const CopyBtn = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 5px;
`
