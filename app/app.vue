<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
</script>

<template>
  <div class="bg-primary">
    <div class="flex flex-col bg-linear-to-b from-slate-900 from-[128px] to-transparent to-[768px] min-h-screen text-primary-content p-4 md:p-8 font-default">
      <NavBar />
      <NuxtPage />
      <div class="text-sm text-gray-500 mt-auto">
        CC BY-NC-SA 4.0
      </div>
    </div>
  </div>
  <Analytics />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
  transform: translateY(20px) scale(0.98);
}
</style>
