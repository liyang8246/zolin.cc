<script lang="ts" setup>
const friends = [
  { favicon: 'https://blog.halfsweet.cn/img/Headshot.jpg', name: 'HalfSweet\'s Blog', url: 'https://blog.halfsweet.cn', on: '2025-12-22' },
  { favicon: 'https://jelasin.github.io/images/touxiang.jpg', name: 'Jelasin\'s Blog', url: 'https://jelasin.github.io', on: '2025-12-22' },
  { favicon: 'https://kevinguo.ink/favicon/favicon-32x32.png', name: 'KevinGuo ink', url: 'https://kevinguo.ink', on: '2025-12-23' },
  { favicon: 'https://book.paperee.guru/ebcat.jpg', name: '纸片君ee的博客', url: 'https://paperee.guru', on: '2025-12-23' },
  { favicon: 'https://juan131ng.zeroarea.top/img/favicon.jpg', name: 'Juan131ng', url: 'https://juan131ng.zeroarea.top', on: '2026-01-03' },
]

useSeoMeta({
  title: 'Zolin | Friends',
  description: '友情链接和博客推荐.',
})
</script>

<template>
  <div class="pt-8 md:pt-32">
    <h1 class="hidden">
      友情链接
    </h1>
    <div class="flex flex-col gap-4 max-w-2xl mx-auto">
      <NuxtLink
        v-for="f in friends"
        :key="f.url"
        target="_blank"
        :to="f.url"
        class="w-full flex items-center gap-4 hover:brightness-130 cursor-pointer"
      >
        <NuxtImg
          :src="f.favicon"
          :alt="`Favicon of ${f.name}`"
          class="size-8 rounded opacity-75"
        />
        <div class="text-xl">{{ f.name }}</div>
        <div class="mx-auto" />
        <div class="flex gap-2 text-sm text-secondary-content">
          <span>Joined on</span>
          <span class="font-mono">{{ f.on }}</span>
        </div>
      </NuxtLink>
      <p class="text-secondary-content text-sm mt-4">
        欢迎大家
        <a
          href="https://github.com/liyang8246/zolin.cc/issues/new"
          class="underline"
          target="_blank"
        >留言</a>
        添加自己的友链 :)
      </p>
    </div>
  </div>
</template>
