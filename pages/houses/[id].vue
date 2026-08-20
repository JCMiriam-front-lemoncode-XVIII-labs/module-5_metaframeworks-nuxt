<script setup lang="ts">
const route = useRoute();
const id = computed(() => String(route.params.id));
const { getHouse } = useHousesApi();
const { data: house, error } = await useAsyncData(`house-${id.value}`, () => getHouse(id.value));

if (error.value) throw error.value;
if (!house.value) throw createError({ statusCode: 404, statusMessage: "Casa no encontrada" });

const rating = computed(() => getHouseRating(house.value!));
useSeoMeta({
  title: () => `${house.value!.name} | Ruralia`,
  description: () => house.value!.description,
});
</script>

<template>
  <main v-if="house" class="page">
    <NuxtLink class="back-link" to="/"><AppIcon name="back" aria-hidden="true" /> Volver a todos los alojamientos</NuxtLink>
    <section class="hero">
      <div>
        <p class="eyebrow">{{ house.city }}, {{ house.country }}</p>
        <h1>{{ house.name }}</h1>
      </div>
      <p class="hero-rating"><AppIcon name="star" aria-hidden="true" /> {{ rating.toFixed(1) }} <span>· {{ house.reviews.length }} reseñas</span></p>
    </section>

    <div class="image">
      <NuxtImg :src="house.image" :alt="`Vista principal de ${house.name}`" width="2360" height="1120" loading="eager" />
      <span>{{ house.amenities[0] }}</span>
    </div>

    <div class="layout">
      <article class="content">
        <section class="intro">
          <h2>Sobre el alojamiento</h2>
          <p>{{ house.description }}</p>
        </section>
        <section class="facts" aria-label="Características del alojamiento">
          <div><strong>{{ house.bedrooms }}</strong><span>Habitaciones</span></div>
          <div><strong>{{ house.beds }}</strong><span>Camas</span></div>
          <div><strong>{{ house.bathrooms }}</strong><span>Baños</span></div>
        </section>
        <section class="place">
          <h2>Ubicación y servicios</h2>
          <p>{{ house.address }}, {{ house.city }}, {{ house.country }}</p>
          <div class="amenities">
            <span v-for="amenity in house.amenities" :key="amenity"><AppIcon name="check" aria-hidden="true" /> {{ amenity }}</span>
          </div>
        </section>
      </article>
      <HousesBookingCard :house-name="house.name" :price="house.price" :rating="rating" />
    </div>

    <section class="reviews">
      <h2>Reseñas</h2>
      <div class="reviews-grid">
        <article v-for="review in house.reviews" :key="review.id">
          <span class="review-stars" :aria-label="`${review.rating} de 5 estrellas`">
            <AppIcon v-for="index in review.rating" :key="index" name="star" aria-hidden="true" />
          </span>
          <blockquote>“{{ review.comment }}”</blockquote>
          <p><strong>{{ review.author }}</strong><small>{{ formatDate(review.date) }}</small></p>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped src="./house-detail.css"></style>
