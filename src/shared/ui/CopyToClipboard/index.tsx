import styled from '@emotion/styled'
import MuiAlert from '@mui/material/Alert'

import Snackbar from '@mui/material/Snackbar'
import React, { ComponentType, FC, forwardRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: React.ReactNode
  onClick: () => string
  wrapper?: ComponentType
  onContainerClick?: boolean
}
const Alert = forwardRef<HTMLDivElement, any>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const CopyToClipboard: FC<Props> = ({
  children,
  onClick,
  wrapper,
  onContainerClick = false,
}) => {
  const [open, setOpen] = useState(false)

  const handleCopy = () => {
    const data = onClick()
    if (!data) return
    navigator.clipboard.writeText(data)
    setOpen(true)
    onClick?.()
  }
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const Wrapper = wrapper || Div
  return (
    <Wrapper onClick={() => onContainerClick && handleCopy()}>
      <Notification open={open} handleClose={handleClose} />
      <CopyBtn onDoubleClick={handleCopy}>{children}</CopyBtn>
    </Wrapper>
  )
}

const Notification = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
  return createPortal(
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={1500}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
        Text was copied!
      </Alert>
    </Snackbar>,
    document.body,
  )
}

const Div = styled.div``

const CopyBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 5px;
`
