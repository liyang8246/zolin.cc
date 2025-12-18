<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('posts').all()
})
page.value?.forEach((p) => {
  console.log(p.title)
})
</script>

<template>
  <!-- <NuxtPage /> -->
</template>
