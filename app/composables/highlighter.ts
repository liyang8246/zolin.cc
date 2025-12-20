import type { BundledLanguage, BundledTheme, HighlighterGeneric } from 'shiki'
import { createHighlighter } from 'shiki'

let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme> | null = null

export const useHighlighter = async (lang: string) => {
  if (!highlighter) {
    highlighter = await createHighlighter({
      langs: [lang],
      themes: ['one-dark-pro'],
    })
  }
  await highlighter.loadLanguage(lang as any)
  return highlighter
}
