<template>
  <div class="lib-spinner" aria-hidden="true" />
</template>

<style scoped>
.lib-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(116, 117, 204, 0.25);
  border-top-color: #7475cc;
  border-radius: 50%;
  animation: lib-spin 0.8s linear infinite;
}

@keyframes lib-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
