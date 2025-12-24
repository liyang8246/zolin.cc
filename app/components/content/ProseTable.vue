<template>
  <div class="overflow-x-auto prose-table-wrapper rounded-xl">
    <table class="min-w-full">
      <slot />
    </table>
  </div>
</template>

<style>
.prose-table-wrapper::-webkit-scrollbar {
  height: 8px;
}
.prose-table-wrapper::-webkit-scrollbar-thumb {
  background-color: oklch(27.8% 0.033 256.848);
  border-radius: calc(infinity * 1px);
}
.prose-table-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: oklch(37.3% 0.034 259.733);
}
</style>
