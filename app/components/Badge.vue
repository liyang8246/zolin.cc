<script lang="ts" setup>
const { icon, label, to } = defineProps<{
  icon?: string
  label: string
  to?: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="flex items-center gap-1 bg-secondary rounded-md border border-gray-600 hover:bg-gray-700 transition-all cursor-pointer py-1 px-2 w-fit"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="text-xl"
    />
    <span class="text-sm">{{ label }}</span>
  </NuxtLink>
</template>
