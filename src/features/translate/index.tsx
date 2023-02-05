import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { FC } from 'react'
import { useTranslate } from './hooks/useTranslate'
import { ApiTranslateArgs } from '@/pages/api/translate'

type Props = Pick<ApiTranslateArgs, 'sourceLang' | 'targetLang'> & {
  meaning: string
  original: string
}

const Translate: FC<Props> = ({ sourceLang, targetLang, meaning, original }) => {
  const { data } = useTranslate({ sourceLang, targetLang, text: meaning })
  const items = [
    {
      link: `https://translate.google.com/?hl=ja&sl=${sourceLang}&tl=${targetLang}&text=${meaning}&op=translate`,
      caption: 'Google translate',
      translated: data,
    },
    {
      link: `https://www.deepl.com/translator#${sourceLang}/${targetLang}/${meaning}`,
      caption: 'Deepl translate',
    },
    {
      link: `https://context.reverso.net/translation/japanese-russian/${original}`,
      caption: 'Reverso context',
    },
  ]
  return (
    <div>
      <Typography variant='caption'>
        [{sourceLang} {'->'} {targetLang}]
      </Typography>
      {items?.map(({ link, caption, translated }, index) => {
        return (
          <ItemTranslate key={index}>
            <Link href={link} target='_blank' rel='noreferrer'>
              {caption}
            </Link>
            <TranslateResult variant='subtitle1'>
              <Bold>{translated || '-'}</Bold>
            </TranslateResult>
          </ItemTranslate>
        )
      })}
    </div>
  )
}

const ItemTranslate = styled(Typography)`
  border-top: 1px solid silver;
  padding: 5px;
`

const TranslateResult = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Bold = styled(Typography)`
  font-weight: 700;
`
export default Translate
