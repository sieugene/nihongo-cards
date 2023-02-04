import { FC } from 'react'
import { useTranslate } from './hooks/useTranslate'
import { ApiTranslateArgs } from '@/pages/api/translate'

const Translate: FC<ApiTranslateArgs> = (props) => {
  const { data } = useTranslate(props)
  return (
    <div>
      <h1>
        <p>
          [{props.sourceLang} {'->'} {props.targetLang}]
        </p>
      </h1>

      <a
        href={`https://www.deepl.com/translator#${props?.sourceLang}/${props?.targetLang}/${props?.text}`}
        target='_blank'
        rel='noreferrer'
      >
        Deepl translate
      </a>
      <h3>Translated:not support</h3>
      <a
        target='_blank'
        rel='noreferrer'
        href={`https://translate.google.com/?hl=ja&sl=${props?.sourceLang}&tl=${props?.targetLang}&text=${props?.text}&op=translate`}
      >
        Google translate
      </a>
      <h3>Translated: {data}</h3>
    </div>
  )
}
export default Translate
