<script lang="ts" setup>
async function handleCap() {
  const result = await useCap()
  console.log('CAP result:', result)
}
</script>

<template>
  <button @click="handleCap">
    Solve CAP
  </button>
</template>
