<script lang="ts" setup>
const { icon, label } = defineProps<{
  icon: string,
  label: string,
}>()
</script>

<template>
  <div class="flex items-center gap-1 bg-gray-800 rounded-xl outline outline-gray-500 py-1 px-2 w-fit">
    <Icon :name="icon" class="text-xl"/>
    <span class="text-sm">{{ label }}</span>
  </div>
</template>
