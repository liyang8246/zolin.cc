<script setup lang="ts">
import { EditorState } from '@codemirror/state'
import { lineNumbers, EditorView } from '@codemirror/view'
import { createHighlighter } from 'shiki'
import shiki from 'codemirror-shiki'

const props = defineProps({
  code: String,
  language: String,
})

const container = ref<HTMLElement>()

const highlighterPromise = createHighlighter({
  langs: [],
  themes: ['one-dark-pro'],
})

onMounted(async () => {
  if (!container.value) return

  const lang = props.language || 'text'
  const highlighter = await highlighterPromise

  await highlighter.loadLanguage(lang as any)

  const state = EditorState.create({
    doc: props.code || '',
    extensions: [
      lineNumbers(),
      shiki({
        highlighter: highlighterPromise,
        language: lang,
        theme: 'one-dark-pro',
      }),
    ],
  })

  new EditorView({ state, parent: container.value })
})
</script>

<template>
  <div ref="container" />
</template>
