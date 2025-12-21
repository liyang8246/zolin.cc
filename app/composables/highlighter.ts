import type { BundledLanguage, BundledTheme, HighlighterGeneric } from 'shiki'
import { createHighlighter } from 'shiki'

let highlighterPromise: Promise<HighlighterGeneric<BundledLanguage, BundledTheme>> | null = null

export const useHighlighter = async (lang: string) => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      langs: [lang],
      themes: ['one-dark-pro'],
    })
  }
  const highlighter = await highlighterPromise
  await highlighter.loadLanguage(lang as any)
  return highlighter
}
