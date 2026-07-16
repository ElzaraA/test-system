<script setup>
const visible = defineModel("visible", { type: Boolean, default: false });

const close = () => {
  visible.value = false;
};
</script>

<template>
  <div v-if="visible" class="lib-modal" @click.self="close">
    <div class="lib-modal__panel lib-modal__panel_wide" @click.stop>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.lib-modal__panel_wide {
  width: min(960px, 96vw);
  max-height: 90vh;
  overflow: auto;
}
</style>
