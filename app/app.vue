<script setup lang="ts">
const { data: page } = await useAsyncData(() => {
  return queryCollection('posts').where('__hash__', '=', 123).all()
})
page.value?.forEach((p) => {
  console.log(p)
})
</script>

<template>
  <div class="bg-linear-to-b from-slate-900 from-[128px] to-primary to-[768px] min-h-screen text-primary-content p-4 md:p-8 font-default">
    <NavBar />
    <NuxtPage />
  </div>
</template>
