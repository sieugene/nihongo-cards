import createCache from '@emotion/cache'
export type EmotionCache = ReturnType<typeof createCache>

export const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true })
}
