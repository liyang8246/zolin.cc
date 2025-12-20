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
</script>

<template>
  <div class="flex flex-col items-center gap-4 max-w-2xl mx-auto pt-8 md:pt-32">
    <!-- <div class="flex gap-2 w-full">
      <Badge
        v-for="t in data.tags.keys()"
        :key="t"
        :label="t"
      />
    </div> -->
    <div
      v-for="p in data?.posts"
      :key="p.hash"
      class="flex justify-between gap-0 w-full hover:brightness-130 cursor-pointer"
    >
      <h1 class="text-sm md:text-xl">
        {{ p.title }}
      </h1>
      <div class="hidden lg:flex gap-2 text-sm text-secondary-content">
        <span v-if="p.tags"> # </span>
        <span
          v-for="tag in p.tags"
          :key="tag"
        > {{ tag }} </span>
        <span> | </span>
        <span class="font-mono">{{ p.date.slice(0, 10) }}</span>
      </div>
    </div>
  </div>
</template>
