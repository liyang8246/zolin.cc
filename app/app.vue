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
  <div class="bg-linear-to-b from-slate-900 from-[128px] to-stone-950 to-[768px] text-gray-300 p-4">
        <Header />
        <NuxtPage/>
  </div>
</template>
