<script lang="ts" setup>
const { data: posts } = await useAsyncData(async () => {
  const items = await queryCollection('posts')
    .select('title', 'tags', 'hash', 'date')
    .order('date', 'DESC')
    .all()
  items.forEach((item) => {
    item.tags = item.tags || []
  })
  return items
}, { default: () => [] })

const postsByYear = computed(() => {
  const grouped = new Map<string, any[]>()
  posts.value.forEach((post) => {
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
        class="flex justify-between w-full hover:brightness-130 cursor-pointer"
      >
        <h1 class="text-sm md:text-xl">
          {{ p.title }}
        </h1>
        <div class="hidden lg:flex items-center gap-2 text-sm text-secondary-content">
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
