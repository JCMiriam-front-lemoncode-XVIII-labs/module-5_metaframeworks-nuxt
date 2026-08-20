<script setup lang="ts">
defineProps<{ houseName: string; price: number; rating: number }>();
const sent = ref(false);
</script>

<template>
  <aside class="card">
    <div class="heading">
      <p><strong>{{ formatCurrency(price) }}</strong> <span>/ noche</span></p>
      <span class="rating"><AppIcon name="star" aria-hidden="true" /> {{ rating.toFixed(1) }}</span>
    </div>
    <div class="dates">
      <div><small>LLEGADA</small><span>Elige una fecha</span></div>
      <div><small>SALIDA</small><span>Elige una fecha</span></div>
    </div>
    <button type="button" @click="sent = true">{{ sent ? "Solicitud enviada ✓" : "Solicitar reserva" }}</button>
    <small>{{ sent ? `Te contactaremos para confirmar ${houseName}.` : "No se realizará ningún cargo todavía." }}</small>
  </aside>
</template>

<style scoped src="./BookingCard.css"></style>
