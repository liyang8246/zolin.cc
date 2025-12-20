<script setup lang="ts">
import { EditorState } from '@codemirror/state'
import { lineNumbers, EditorView } from '@codemirror/view'
import { createHighlighter } from 'shiki'
import shiki from 'codemirror-shiki'

const model = defineModel<string>({ default: '' })

const {
  language = 'text',
  readonly = false,
  theme = 'one-dark-pro',
} = defineProps<{
  language?: string
  readonly?: boolean
  theme?: string
}>()

const container = ref<HTMLElement>()
let editorView: EditorView | null = null

const highlighterPromise = createHighlighter({
  langs: [],
  themes: [theme],
})

const createEditor = async () => {
  if (!container.value) return

  const highlighter = await highlighterPromise
  await highlighter.loadLanguage(language as any)

  const state = EditorState.create({
    doc: model.value.trimEnd(),
    extensions: [
      lineNumbers(),
      shiki({
        highlighter: highlighterPromise,
        language,
        theme,
      }),
      EditorView.editable.of(!readonly),
      EditorView.updateListener.of((update) => {
        if (update.docChanged && !readonly) {
          model.value = update.state.doc.toString()
        }
      }),
    ],
  })

  editorView = new EditorView({ state, parent: container.value })
}

onMounted(() => {
  createEditor()
})

onBeforeUnmount(() => {
  editorView?.destroy()
})

watch(model, (newValue) => {
  if (editorView && newValue !== editorView.state.doc.toString()) {
    editorView.dispatch({
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert: newValue,
      },
    })
  }
})
</script>

<template>
  <div ref="container" />
</template>
