<template>
  <div>
    <header class="header">
      <AppBrand />
      <nav aria-label="Navegación principal">
        <NuxtLink to="/#alojamientos">Alojamientos</NuxtLink>
      </nav>
    </header>
    <slot />
    <footer class="footer">
      <AppBrand />
      <p>Encuentra tu próxima escapada rural.</p>
      <small>© {{ new Date().getFullYear() }} Ruralia</small>
    </footer>
  </div>
</template>

<style scoped src="./default.css"></style>
