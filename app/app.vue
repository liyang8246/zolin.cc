<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(() => {
  return queryCollection('posts').where('__hash__', '=', 123).all()
})
page.value?.forEach((p) => {
  console.log(p)
})
</script>

<template>
  <div class="bg-stone-950 text-gray-300 relative -z-20">
    <div class="absolute h-screen w-full bg-linear-to-b from-slate-900 from-10% to-stone-950 -z-10" />
    <NuxtPage/>
  </div>
</template>
