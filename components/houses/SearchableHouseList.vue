<script setup lang="ts">
import type { House } from "~/types/house";

const props = defineProps<{ houses: House[] }>();
const query = ref("");
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const filteredHouses = computed(() => {
  const normalizedQuery = normalize(query.value.trim());
  if (!normalizedQuery) return props.houses;
  return props.houses.filter(({ name, city }) => normalize(`${name} ${city}`).includes(normalizedQuery));
});
</script>

<template>
  <div class="search">
    <AppIcon name="search" aria-hidden="true" />
    <label class="sr-only" for="house-search">Buscar por nombre o ubicación</label>
    <input id="house-search" v-model="query" type="search" placeholder="Busca por nombre o destino">
    <span class="count">{{ filteredHouses.length }} alojamientos</span>
  </div>

  <div v-if="filteredHouses.length" class="grid">
    <article v-for="(house, index) in filteredHouses" :key="house.id" class="card">
      <NuxtLink :to="`/houses/${house.id}`" :aria-label="`Ver ${house.name}`">
        <div class="image">
          <NuxtImg
            :src="house.image"
            :alt="`Exterior de ${house.name}`"
            width="760"
            height="440"
            :loading="index < 3 ? 'eager' : 'lazy'"
          />
          <span class="rating"><AppIcon name="star" aria-hidden="true" /> {{ getHouseRating(house).toFixed(1) }}</span>
        </div>
        <div class="content">
          <p class="location">{{ house.city }}, {{ house.country }}</p>
          <h2>{{ house.name }}</h2>
          <p class="meta">{{ house.bedrooms }} habitaciones · {{ house.beds }} camas · {{ house.bathrooms }} baños</p>
          <div class="card-footer">
            <span>{{ house.amenities[0] }}</span>
            <p><strong>{{ formatCurrency(house.price) }}</strong> / noche</p>
          </div>
        </div>
      </NuxtLink>
    </article>
  </div>
  <div v-else class="empty-state">
    <AppIcon name="search" aria-hidden="true" />
    <h2>No encontramos ese rincón</h2>
    <p>Prueba con otro nombre o destino.</p>
    <button type="button" @click="query = ''">Limpiar búsqueda</button>
  </div>
</template>

<style scoped src="./SearchableHouseList.css"></style>
