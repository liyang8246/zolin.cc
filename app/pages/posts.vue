<script lang="ts" setup>
const { data } = await useAsyncData(async () => {
  const posts = await queryCollection('posts').select('title', 'tags', 'hash', 'date').order('date', 'DESC').all()
  posts.map(post => post.tags = post.tags || [])
  const tags = new Map<string, number>()
  posts.forEach((post) => {
    post.tags!.forEach((tag) => {
      tags.set(tag, (tags.get(tag) || 0) + 1)
    })
  })
  return { tags, posts }
})
console.log(data.value?.posts)
</script>

<template>
  <div class="flex flex-col items-center gap-4 max-w-2xl mx-auto">
    <div class="flex gap-2 w-full">
      <Badge
        v-for="t in data.tags.keys()"
        :key="t"
        :label="t"
      />
    </div>
    <div class="w-full border border-gray-600 rounded-xl bg-stone-950">
      123
    </div>
  </div>
</template>
