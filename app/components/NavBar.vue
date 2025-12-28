<script lang="ts" setup>

</script>

<template>
  <div class="flex items-end gap-2 sm:gap-4">
    <NuxtLink
      to="/"
      class="text-lg sm:text-xl font-bold shrink-0"
    >
      ZolinLee
    </NuxtLink>
    <div class="mx-auto" />
    <div class="flex gap-2 sm:gap-4 h-full items-end">
      <NuxtLink
        to="/posts"
        class="hover:text-white hover:cursor-pointer text-sm sm:text-base"
      >
        Posts
      </NuxtLink>
      <NuxtLink
        to="/jots"
        class="hover:text-white hover:cursor-pointer text-sm sm:text-base"
      >
        Jots
      </NuxtLink>
      <NuxtLink
        to="/friends"
        class="hover:text-white hover:cursor-pointer text-sm sm:text-base"
      >
        Friends
      </NuxtLink>
      <NuxtLink
        to="mailto:liyang8246@outlook.com?subject=Hey%20there!%20Let's%20chat!"
        class="flex hover:text-white"
      >
        <Icon
          name="tabler:mail"
          class="text-lg sm:text-xl"
        /></NuxtLink>
      <NuxtLink
        to="https://github.com/liyang8246"
        target="_blank"
        class="flex"
      ><Icon
        name="tabler:brand-github"
        class="text-lg sm:text-xl hover:text-white"
      /></NuxtLink>
      <NuxtLink
        to="https://space.bilibili.com/25629234"
        target="_blank"
        class="flex"
      ><Icon
        name="tabler:brand-bilibili"
        class="text-lg sm:text-xl hover:text-white"
      /></NuxtLink>
    </div>
  </div>
</template>
