<script setup>
defineProps({
  buttonText: { type: String, default: "OK" },
});

const emit = defineEmits(["confirm"]);
</script>

<template>
  <div class="lib-toast">
    <div class="lib-toast__content">
      <slot />
    </div>
    <button type="button" class="button button-s button-primary" @click="emit('confirm')">
      {{ buttonText }}
    </button>
  </div>
</template>

<style scoped>
.lib-toast {
  position: fixed;
  left: 24px;
  bottom: 24px;
  z-index: 900;
  max-width: 480px;
  background: #262c36;
  color: #e3e3e3;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

.lib-toast__content :deep(a) {
  color: #7475cc;
}
</style>
