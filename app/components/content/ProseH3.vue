<script lang="ts" setup>
const { id } = defineProps<{ id?: string }>()
</script>

<template>
  <h3
    :id="id"
    class="text-2xl font-bold relative"
  >
    <a :href="`#${id}`"><slot /></a>
  </h3>
</template>

<style scoped>
h3::before {
  content: "###";
  position: absolute;
  left: -3.5rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}

h3:hover::before {
  opacity: 0.6;
}
</style>
