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
    <div
      v-for="p in data.posts"
      :key="p.hash"
      class="flex flex-col gap-2 w-full border border-gray-600 rounded-xl bg-primary p-4"
    >
      <h1>{{ p.title }}</h1>
      <div class="flex gap-2 text-sm text-secondary-content">
        <span>{{ p.date.slice(0, 10) }}</span>
        <span> | </span>
        <span v-if="p.tags"> # </span>
        <span
          v-for="tag in p.tags"
          :key="tag"
        > {{ tag }} </span>
      </div>
    </div>
  </div>
</template>
