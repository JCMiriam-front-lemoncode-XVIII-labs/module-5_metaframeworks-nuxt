<script setup lang="ts">
const { getHouses } = useHousesApi();
const { data: houses, error } = await useAsyncData("houses", getHouses);
if (error.value) throw error.value;

useSeoMeta({
  title: "Ruralia | Casas rurales con alma",
  description: "Casas rurales singulares para desconectar y volver a lo esencial.",
});
</script>

<template>
  <main>
    <section class="hero">
      <div class="hero-content">
        <h1>Casas rurales</h1>
        <p>Encuentra un alojamiento para tu próxima escapada.</p>
        <a class="hero-link" href="#alojamientos">Ver alojamientos</a>
      </div>
    </section>
    <section id="alojamientos" class="catalog">
      <div class="section-heading">
        <div><h2>Alojamientos disponibles</h2></div>
        <p>Explora nuestra selección de casas rurales.</p>
      </div>
      <HousesSearchableHouseList :houses="houses ?? []" />
    </section>
  </main>
</template>

<style scoped src="./index.css"></style>
