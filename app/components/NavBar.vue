<script lang="ts" setup>

</script>

<template>
  <div class="flex h-12 items-center">
    <div class="text-xl font-bold">
      ZolinLee Blog
    </div>
    <div class="mx-auto" />
    <div class="flex gap-4">
      <NuxtLink
        to="/posts"
        class="hover:text-white hover:cursor-pointer"
      >
        Posts
      </NuxtLink>
      <NuxtLink
        to="/jots"
        class="hover:text-white hover:cursor-pointer"
      >
        Jots
      </NuxtLink>
      <NuxtLink
        to="/friends"
        class="hover:text-white hover:cursor-pointer"
      >
        Friends
      </NuxtLink>
    </div>
  </div>
</template>
