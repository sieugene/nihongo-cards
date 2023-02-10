import { Alert, Link } from '@mui/material'
import { FC } from 'react'

export const SmartError: FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <Alert severity='error' style={{ marginBottom: 10 }}>
        Has error when fetching data, try again or change search query.
      </Alert>
      {children || ''}
    </div>
  )
}
