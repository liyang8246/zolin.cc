<script lang="ts" setup>
const { data: jots } = await useAsyncData(async () => {
  const items = await queryCollection('jots')
    .select('title', 'tags', 'hash', 'date')
    .order('date', 'DESC')
    .all()
  items.forEach((item) => {
    item.tags = item.tags || []
  })
  return items
}, { default: () => [] })

useHead({
  title: 'Zolin | Jots',
})
</script>

<template>
  <div class="pt-8 md:pt-32">
    <div class="flex flex-col items-center gap-4 max-w-2xl mx-auto">
      <NuxtLink
        v-for="j in jots"
        :key="j.hash"
        :to="`/p/${j.hash}`"
        class="flex justify-between w-full hover:brightness-130 cursor-pointer"
      >
        <span class="text-sm md:text-xl">
          {{ j.title }}
        </span>
        <div class="hidden lg:flex items-center gap-2 text-sm text-secondary-content">
          <span v-if="j.tags?.length"> # </span>
          <span
            v-for="tag in j.tags"
            :key="tag"
          > {{ tag }} </span>
          <span v-if="j.tags?.length"> | </span>
          <span class="font-mono">{{ j.date.slice(0, 10) }}</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
