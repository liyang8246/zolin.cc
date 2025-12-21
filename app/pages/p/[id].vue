<script lang="ts" setup>
const route = useRoute()
const { data } = await useAsyncData(async () => {
  return await queryCollection('posts').where('hash', '=', route.params.id).first()
})
</script>

<template>
  <div class="max-w-2xl mx-auto flex flex-col gap-6">
    <!-- <h1>{{ data }}</h1> -->
    <ContentRenderer
      v-if="data"
      class="flex flex-col gap-4"
      :value="data"
    />
  </div>
</template>
