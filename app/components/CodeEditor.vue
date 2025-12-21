<script setup lang="ts">
import { EditorState } from '@codemirror/state'
import { lineNumbers, EditorView } from '@codemirror/view'
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
const highlighter = await useHighlighter(language)

const transTheme = EditorView.theme({
  '.cm-gutters': {
    backgroundColor: 'oklch(13% 0.028 261.692)',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'oklch(13% 0.028 261.692)',
  },
  '.cm-content': {
    backgroundColor: 'oklch(13% 0.028 261.692)',
  },
})

onMounted(async () => {
  if (!container.value) return

  const state = EditorState.create({
    doc: model.value.trimEnd(),
    extensions: [
      transTheme,
      lineNumbers(),
      shiki({
        highlighter: Promise.resolve(highlighter),
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
