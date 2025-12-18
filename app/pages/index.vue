<script lang="ts" setup>

</script>

<template>
  <div class="flex items-center justify-center pt-32">
    <div class="flex flex-col gap-4 w-fit">
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
            <Icon name="i-tabler-tools" />
            <span> Full Stack / Electronics </span>
          </div>
          <div class="flex items-center gap-1">
            <Icon name="i-tabler-map-pin" />
            <span> China / GuangDong </span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <p class="font-bold w-24">
          Languages
        </p>
        <IconBadge
          icon="material-icon-theme:rust"
          label="Rust"
        />
        <IconBadge
          icon="material-icon-theme:python"
          label="Python"
        />
        <IconBadge
          icon="material-icon-theme:typescript"
          label="TypeScript"
        />
      </div>
      <div class="flex items-center gap-2">
        <p class="font-bold w-24">
          Tech Stack
        </p>
        <IconBadge
          icon="material-icon-theme:tauri"
          label="Tauri"
        />
        <IconBadge
          icon="material-icon-theme:vue"
          label="Vue"
        />
        <IconBadge
          icon="material-icon-theme:nuxt"
          label="Nuxt"
        />
        <IconBadge
          icon="material-icon-theme:svelte"
          label="Svelte"
        />
      </div>
      <div class="flex items-center gap-2">
        <p class="font-bold w-24">
          Dev Tools
        </p>
        <IconBadge
          icon="material-icon-theme:vscode"
          label="VS Code"
        />
        <IconBadge
          icon="logos:obsidian-icon"
          label="Obsidian"
        />
        <IconBadge
          icon="material-icon-theme:docker"
          label="Docker"
        />
        <IconBadge
          icon="material-icon-theme:git"
          label="Git"
        />
      </div>
    </div>
    <div class="h-80 w-0.5 bg-slate-600 shadow-[-2px_0px_8px_2px] shadow-slate-600/50 rounded origin-center -rotate-30" />
    <div class="text-3xl">
      <p>给岁月以文明</p>
      <div class="h-8" />
      <p class="ml-8">
        我们都是阴沟里的虫子
      </p>
      <div class="h-8" />
      <p class="ml-16">
        但总还是得有人仰望星空
      </p>
    </div>
  </div>
</template>
