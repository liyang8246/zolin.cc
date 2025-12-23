<script lang="ts" setup>
const { data: quote } = await useAsyncData('quote', () => Promise.resolve(randQuote()))

const { data: recentPosts } = await useAsyncData('recent-posts', () =>
  queryCollection('posts')
    .select('title', 'date', 'tags', 'hash')
    .order('date', 'DESC')
    .limit(2)
    .all(),
)
</script>

<template>
  <div>
    <div class="flex items-center justify-center pt-8 md:pt-32">
      <div class="flex flex-col gap-4 w-fit scale-[70%] sm:scale-100">
        <div class="flex gap-4">
          <NuxtImg
            src="/profile.jpg"
            class="size-32 rounded-xl"
          />
          <div class="flex flex-col justify-center gap-1.5">
            <h1 class="text-2xl font-bold">
              Zolin Lee
            </h1>
            <div class="flex items-center gap-1">
              <Icon name="i-tabler-cake" />
              <span> 2004 / 07 / 09 </span>
            </div>
            <div class="flex items-center gap-1">
              <Icon name="i-tabler-map-pin" />
              <span> China / GuangDong </span>
            </div>
            <div class="flex items-center gap-1">
              <Icon name="i-tabler-tools" />
              <span> Full Stack / Electronics </span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <p class="font-bold w-20">
            Languages
          </p>
          <Badge
            icon="material-icon-theme:rust"
            label="Rust"
          />
          <Badge
            icon="material-icon-theme:python"
            label="Python"
          />
          <Badge
            icon="material-icon-theme:typescript"
            label="TypeScript"
          />
        </div>
        <div class="flex items-center gap-2">
          <p class="font-bold w-20">
            Tech Stack
          </p>
          <Badge
            icon="material-icon-theme:tauri"
            label="Tauri"
          />
          <Badge
            icon="material-icon-theme:vue"
            label="Vue"
          />
          <Badge
            icon="material-icon-theme:nuxt"
            label="Nuxt"
          />
          <Badge
            icon="material-icon-theme:svelte"
            label="Svelte"
          />
        </div>
        <div class="flex items-center gap-2">
          <p class="font-bold w-20">
            Dev Tools
          </p>
          <Badge
            icon="material-icon-theme:vscode"
            label="VSCode"
          />
          <Badge
            icon="logos:obsidian-icon"
            label="Obsidian"
          />
          <Badge
            icon="material-icon-theme:docker"
            label="Docker"
          />
          <Badge
            icon="material-icon-theme:git"
            label="Git"
          />
        </div>
      </div>
      <div class="hidden lg:block h-80 w-0.5 bg-slate-500 shadow-[-2px_0px_8px_2px] shadow-slate-500/50 rounded origin-center -rotate-30" />
      <div class="hidden lg:flex text-3xl flex-col gap-8 mb-8">
        <p
          v-for="(line, index) in quote"
          :key="line"
          :style="{
            marginLeft: `${index * 3 + 2}rem`,
          }"
        >
          {{ line }}
        </p>
      </div>
    </div>

    <div class="mx-auto my-4 h-px md:max-w-5xl bg-linear-to-r from-transparent via-slate-800 to-transparent" />

    <div class="flex flex-col items-center md:flex-row gap-4 justify-center">
      <div class="flex flex-col items-center w-full md:w-fit justify-center gap-4">
        <NuxtLink
          v-for="post in recentPosts"
          :key="post.hash"
          :to="`/p/${post.hash}`"
          class="flex flex-col gap-2 w-full h-40 max-w-md lg:w-xs bg-zinc-950 transition-all p-4 rounded-xl cursor-pointer hover:brightness-130 hover:scale-105"
        >
          <h1 class="text-lg mb-auto">
            {{ post.title }}
          </h1>
          <div class="flex items-center gap-1">
            <Icon name="tabler:calendar-week" />
            <span class="text-sm">
              {{ post.date.slice(0, 10) }}
            </span>
          </div>
          <div class="flex items-center gap-1">
            <Icon name="tabler:tag" />
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="text-sm"
            >
              {{ tag }}
            </span>
          </div>
        </NuxtLink>
      </div>
      <MSGBoard />
    </div>
  </div>
</template>
