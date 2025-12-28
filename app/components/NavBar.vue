<script lang="ts" setup>

</script>

<template>
  <div class="flex items-end">
    <NuxtLink
      to="/"
      class="text-xl font-bold"
    >
      ZolinLee
    </NuxtLink>
    <div class="mx-auto" />
    <div class="flex gap-4 h-full items-end">
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
      <NuxtLink
        to="mailto:liyang8246@outlook.com?subject=Hey%20there!%20Let's%20chat!"
        class="flex hover:text-white"
      >
        <Icon
          name="tabler:mail"
          class="text-xl mb-1"
        /></NuxtLink>
      <NuxtLink
        to="https://github.com/liyang8246"
        target="_blank"
        class="flex"
      ><Icon
        name="tabler:brand-github"
        class="text-xl hover:text-white mb-1"
      /></NuxtLink>
      <NuxtLink
        to="https://space.bilibili.com/25629234"
        target="_blank"
        class="flex"
      ><Icon
        name="tabler:brand-bilibili"
        class="text-xl hover:text-white mb-1"
      /></NuxtLink>
    </div>
  </div>
</template>
