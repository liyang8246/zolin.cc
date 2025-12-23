<script lang="ts" setup>
const { avatar, name, content } = defineProps<{
  avatar: string
  name: string
  content: string
  link?: string
}>()
</script>

<template>
  <div class="flex gap-1 items-center">
    <NuxtLink
      :to="link"
      target="_blank"
      class="flex items-center gap-0.5 border-b opacity-75 hover:opacity-100 cursor-pointer"
    >
      <NuxtImg
        :src="avatar"
        class="size-4 rounded"
      />
      <div>
        {{ name + ':' }}
      </div>
    </NuxtLink>
    <p> {{ content }} </p>
  </div>
</template>
