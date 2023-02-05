import styled from '@emotion/styled'
import { Skeleton } from '@mui/material'
import TextField from '@mui/material/TextField'
import { ChangeEvent, FC, useState } from 'react'
import { useFurigana } from './hooks/useFurigana'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { CopyToClipboard } from '@/shared/ui/CopyToClipboard'

const skeletonItems = Array.from(Array(3).keys())

type Props = {
  text: string
}
const FuriganaConvert = ({ text }: Props) => {
  const { data, isLoading } = useFurigana(text)

  if (isLoading) {
    return (
      <div>
        {skeletonItems.map((_, index) => (
          <Skeleton height={20} width={150} key={index} />
        ))}
      </div>
    )
  }
  return (
    <div>
      {data && (
        <>
          <FuriganaConvert.Item>
            <CopyToClipboard onClick={() => data?.furigana || ''}>
              <div dangerouslySetInnerHTML={{ __html: data?.furigana }} />
            </CopyToClipboard>
          </FuriganaConvert.Item>
          <FuriganaConvert.Item>
            <CopyToClipboard onClick={() => data?.onlyHiragana || ''}>
              {data?.onlyHiragana}
            </CopyToClipboard>
          </FuriganaConvert.Item>
          <FuriganaConvert.Item>
            <CopyToClipboard onClick={() => data?.okurigana || ''}>
              {data?.okurigana}
            </CopyToClipboard>
          </FuriganaConvert.Item>
        </>
      )}
    </div>
  )
}

FuriganaConvert.Item = styled('div')`
  margin-bottom: 10px;
`

export default FuriganaConvert
