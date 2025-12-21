<script setup lang="ts">
const { code, language, filename } = defineProps<{
  code: string
  language?: string
  filename?: string
}>()

const langIcon = {
  bash: 'material-icon-theme:console',
  javascript: 'material-icon-theme:javascript',
  powershell: 'material-icon-theme:powershell',
  python: 'material-icon-theme:python',
  rust: 'material-icon-theme:rust',
  typescript: 'material-icon-theme:typescript',
}[language || 'plaintext']!

const cmRef = ref<HTMLElement>()
const loadRef = ref<HTMLElement>()
const { height: cmHeight } = useElementSize(cmRef)
const containerHeight = computed(() => Math.max(cmHeight.value, 24))
// debugger
</script>

<template>
  <div class="bg-gray-950 p-2 pb-0 rounded-xl">
    <div class="flex items-center gap-2 border-b border-gray-800 pb-1">
      <Icon
        :name="langIcon"
        mode="svg"
      />
      <span v-if="filename"> {{ filename }} </span>
      <span v-if="filename"> | </span>
      <span>{{ language || 'plaintext' }}</span>
    </div>
    <div
      :style="{ height: containerHeight + 'px' }"
      class="overflow-hidden transition-[height] duration-500 ease-in-out"
    >
      <p
        v-show="!cmHeight"
        ref="loadRef"
        class="text-center"
      >
        loading...
      </p>
      <div ref="cmRef">
        <ClientOnly>
          <CodeEditor
            :model-value="code"
            :language="language || 'text'"
            :readonly="true"
            theme="one-dark-pro"
          />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
