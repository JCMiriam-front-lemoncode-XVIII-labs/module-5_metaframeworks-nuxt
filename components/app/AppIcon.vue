<script setup lang="ts">
defineProps<{ name: "cottage" | "search" | "star" | "back" | "check" | "error" }>();
</script>

<template>
  <svg v-if="name === 'cottage'" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12h-1V7l-2-1.5V3h-2v1l-4-3-9 6v5H2v10h19V12ZM5 8.1l7-4.67 6 4.5V20h-4v-6H9v6H5V8.1Z" /></svg>
  <svg v-else-if="name === 'search'" viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 3a6.5 6.5 0 1 0 3.98 11.64L19.85 21 21 19.85l-6.36-6.37A6.5 6.5 0 0 0 9.5 3Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" /></svg>
  <svg v-else-if="name === 'star'" viewBox="0 0 24 24" fill="currentColor"><path d="m12 17.27 5.18 3.13-1.64-5.89 4.57-3.96-6.02-.52L12 4.4l-2.09 5.63-6.02.52 4.57 3.96-1.64 5.89L12 17.27Z" /></svg>
  <svg v-else-if="name === 'back'" viewBox="0 0 24 24" fill="currentColor"><path d="m20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.42-1.41L7.83 13H20v-2Z" /></svg>
  <svg v-else-if="name === 'check'" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-1.4-4.2-3.4-3.4 1.4-1.4 2 2 4.8-4.8 1.4 1.4-6.2 6.2Z" /></svg>
  <svg v-else viewBox="0 0 24 24" fill="currentColor"><path d="M11 15h2v2h-2v-2Zm0-8h2v6h-2V7Zm1-5a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" /></svg>
</template>

<style scoped src="./AppIcon.css"></style>
