<script setup lang="ts">
const { code, language } = defineProps<{
  code: string
  language?: string
}>()
</script>

<template>
  <CodeEditor
    :model-value="code"
    :language="language || 'text'"
    :readonly="true"
    theme="one-dark-pro"
  />
</template>
