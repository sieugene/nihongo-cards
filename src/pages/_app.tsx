import '@/styles/globals.css'

import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import { createEmotionCache, EmotionCache, theme } from '@/shared/lib/mui'

// クライアント側のキャッシュ。ブラウザでのユーザーのセッション全体で共有されます。
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <SWRConfig value={{ provider: () => new Map(), revalidateOnFocus: false }}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SWRConfig>
  )
}
