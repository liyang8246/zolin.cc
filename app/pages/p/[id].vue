<script lang="ts" setup>
const route = useRoute()
const { data } = await useAsyncData(async () => {
  const post = await queryCollection('posts').where('hash', '=', route.params.id).first()
  const jot = await queryCollection('jots').where('hash', '=', route.params.id).first()
  return jot ?? post
}, { default: () => null })

if (!data.value) {
  throw createError({ status: 404, statusText: 'Page Not Found' })
}

useHead({
  title: data.value?.title ? `Zolin | ${data.value.title}` : 'Zolin',
})
</script>

<template>
  <div class="w-full md:max-w-2xl lg:max-w-3xl mx-auto flex flex-col gap-6">
    <div>
      <h1 class="text-2xl font-bold mb-1 mt-8 brightness-110">
        {{ data?.title }}
      </h1>
      <div class="flex items-center gap-2 text-secondary-content">
        <Icon name="tabler:calendar-week" />
        <span class="font-mono text-sm">{{ data?.date.slice(0, 10) }}</span>
        <Icon name="tabler:clock" />
        <span class="text-sm">{{ `${data?.body.value.length} mins read` }}</span>
        <Icon
          v-if="data?.tags"
          name="tabler:tag"
        />
        <span
          v-for="tag in data?.tags"
          :key="tag"
          class="text-sm"
        > {{ tag }} </span>
      </div>
    </div>
    <ContentRenderer
      v-if="data"
      class="flex flex-col gap-4"
      :value="data"
    />
    <p class="mb-4">
      --- 评论区施工中🚧 ---
    </p>
  </div>
</template>
