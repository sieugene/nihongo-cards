import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

import { useCopyDOM } from './hooks/useCopyDOM'
import { SmartActions } from './ui/SmartActions'
import { SmartError } from './ui/SmartError'
import { SmartFurigana } from './ui/SmartFurigana'
import { SmartGuide } from './ui/SmartGuide'
import { SmartLinks } from './ui/SmartLinks'
import { SmartMeanings } from './ui/SmartMeanings'
import { SmartSlugs } from './ui/SmartSlugs'
import { SmartTranslate } from './ui/SmartTranslate'
import { useJishoPhrase } from '@/features/jisho-search/hooks/useJishoPhrase'
import { useDebounce } from '@/shared/hooks/useDebounce'

export const SmartCard = () => {
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const { isLoading, data, error } = useJishoPhrase(search)

  const inputFilled = useMemo(() => search?.length > 1, [search?.length])
  const meaningsEmpty = useMemo(() => !data?.meanings?.length, [data?.meanings])
  const slugsEmpty = useMemo(() => !data?.slugs?.length, [data?.slugs])
  const showSlugs = useMemo(() => meaningsEmpty && !slugsEmpty, [meaningsEmpty, slugsEmpty])
  const showGuide = useMemo(
    () => !error && !isLoading && meaningsEmpty && slugsEmpty,
    [error, isLoading, meaningsEmpty, slugsEmpty],
  )

  const onCopyDom = useCopyDOM()
  const onSearch = useDebounce((value: string) => {
    setSearch(value)
  }, 500)
  const handleChange = useCallback(
    (value: string) => {
      onSearch(value)
      setInput(value)
    },
    [onSearch],
  )

  const tools = useMemo<{ component: React.ReactNode; show: boolean }[]>(() => {
    if (isLoading) return []
    return [
      {
        component: <SmartSlugs slugs={data?.slugs} onSelect={(meaning) => handleChange(meaning)} />,
        show: showSlugs,
      },
      {
        component: <SmartFurigana input={search} />,
        show: inputFilled,
      },
      {
        component: <SmartMeanings meanings={data?.meanings} />,
        show: !meaningsEmpty,
      },
      {
        component: <SmartTranslate meaning={data?.meanings?.[0] || ''} input={search} />,
        show: !meaningsEmpty,
      },
      {
        component: <SmartLinks input={search} />,
        show: inputFilled,
      },
    ].filter((tool) => tool.show)
  }, [
    isLoading,
    data?.slugs,
    data?.meanings,
    showSlugs,
    search,
    inputFilled,
    meaningsEmpty,
    handleChange,
  ])

  return (
    <div>
      <Box sx={{ minWidth: 275 }}>
        <Card variant='outlined'>
          <CardContent>
            <SmartCard.Input
              type='text'
              onChange={({ target }) => handleChange(target.value)}
              label='Search kanji meaning'
              variant='outlined'
              value={input}
            />

            <div id={SmartCard.copyId}>
              {showGuide && <SmartGuide />}
              {error && (
                <SmartCard.Item>
                  <SmartError />
                </SmartCard.Item>
              )}
              {isLoading && (
                <SmartCard.Item style={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </SmartCard.Item>
              )}
              <>{tools.map((tool) => tool?.component || '')}</>
            </div>
          </CardContent>

          {!meaningsEmpty && <SmartActions onCopy={() => onCopyDom(SmartCard.copyId)} />}
        </Card>
      </Box>
    </div>
  )
}

SmartCard.Item = styled('div')`
  margin-top: 10px;
`

SmartCard.Input = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`

SmartCard.copyId = 'copy-area-content'
