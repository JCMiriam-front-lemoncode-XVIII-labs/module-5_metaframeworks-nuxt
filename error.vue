<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();
const isNotFound = computed(() => props.error.statusCode === 404);
const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <NuxtLayout>
    <main v-if="isNotFound" class="error-page">
      <p class="eyebrow">Error 404</p>
      <h1>Este camino no lleva a ninguna casa.</h1>
      <p>Quizá el alojamiento ya no esté disponible o la dirección no sea correcta.</p>
      <button type="button" @click="handleError">Volver al catálogo</button>
    </main>
    <main v-else class="error-page">
      <AppIcon name="error" aria-hidden="true" />
      <h1>No hemos podido cargar los alojamientos</h1>
      <p>Comprueba que el servidor de datos está disponible y vuelve a intentarlo.</p>
      <button type="button" @click="handleError">Reintentar</button>
    </main>
  </NuxtLayout>
</template>

<style scoped src="./error.css"></style>
