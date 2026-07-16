<script setup>
import { useViewDocumentModal } from "../../composables/useViewDocumentModal";

const modal = useViewDocumentModal();
</script>

<template>
  <div v-if="modal.visible.value" class="lib-modal" @click.self="modal.close()">
    <div class="lib-modal__panel">
      <header class="lib-modal__header">
        <h3>{{ modal.documentContent.value?.title }}</h3>
        <button type="button" @click="modal.close()">
          ×
        </button>
      </header>
      <p class="lib-modal__body">
        {{ modal.documentContent.value?.content }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.lib-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.lib-modal__panel {
  width: min(640px, 100%);
  max-height: 80vh;
  overflow: auto;
  background: #191d23;
  color: #e3e3e3;
  border-radius: 8px;
  padding: 24px;
}

.lib-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.lib-modal__header button {
  color: #e3e3e3;
  font-size: 24px;
}

.lib-modal__body {
  line-height: 1.5;
}
</style>
