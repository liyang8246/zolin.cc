<script lang="ts" setup>
const { id } = defineProps<{ id?: string }>()
</script>

<template>
  <h1
    :id="id"
    class="text-2xl font-bold relative"
  >
    <a :href="`#${id}`"><slot /></a>
  </h1>
</template>

<style scoped>
h1::before {
  content: "#";
  position: absolute;
  left: -1.5rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}

h1:hover::before {
  opacity: 0.6;
}
</style>
