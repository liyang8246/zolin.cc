<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('posts').where('__hash__', '=', 123).all()
})
page.value?.forEach((p) => {
  console.log(p)
})
</script>

<template>
  <!-- <NuxtPage /> -->
</template>
