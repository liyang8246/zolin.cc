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

const postsByYear = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const grouped = new Map<string, any[]>()
  data.value?.posts.forEach((post) => {
    const year = post.date.slice(0, 4)
    grouped.set(year, [...(grouped.get(year) || []), post])
  })
  return grouped
})
</script>

<template>
  <div class="pt-8 md:pt-32">
    <div
      v-for="y in postsByYear.keys()"
      :key="y"
      class="flex flex-col items-center gap-4 max-w-2xl mx-auto mb-16"
    >
      <p class="text-secondary-content mr-auto flex gap-2">
        <span>{{ y }}</span>
        <span> | </span>
        <span>{{ `${postsByYear.get(y)?.length} post${postsByYear.get(y)?.length === 1 ? '' : 's'}` }}</span>
      </p>
      <NuxtLink
        v-for="p in postsByYear.get(y)"
        :key="p.hash"
        :to="`/p/${p.hash}`"
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
      </NuxtLink>
    </div>
  </div>
</template>
