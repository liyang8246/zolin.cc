<script setup lang="ts">
const { href } = defineProps<{
  href?: string
}>()

const isPost = href ? /^\/p\/[a-f0-9]{8}$/.test(href) : false
</script>

<template>
  <NuxtLink
    :to="href"
    :target="isPost ? undefined : '_blank'"
    class="inline border-b hover:brightness-125"
  >
    <Icon
      :name="isPost ? 'tabler:book-2' : 'tabler:link'"
      class="align-middle"
    />
    <slot />
  </NuxtLink>
</template>
