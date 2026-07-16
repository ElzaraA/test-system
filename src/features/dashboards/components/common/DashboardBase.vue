<script setup>
import { Icon } from "@/lib";

defineProps({
  title: String,
  isLink: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div v-if="!isLink" class="dashboards-main-section__dashboard-wrapper">
    <div class="dashboards-main-section__title-bar">
      <div class="dashboards-main-section__title-bar-side">
        <slot name="title-before" />
      </div>
      <h4>{{ title }}</h4>
      <div class="dashboards-main-section__title-bar-side">
        <slot name="title-after" />
      </div>
    </div>
    <div>
      <slot />
    </div>
  </div>
  <div v-else class="dashboards-main-section__dashboard-wrapper">
    <button class="dashboards-main-section__dashboard-wrapper--link">
      <h4>{{ title }}</h4>
      <Icon name="arrow-up-right" color-name="dark-color-text-secondary" class="dashboards-main-section__icon--link" />
    </button>
    <div @click.stop>
      <slot />
    </div>
  </div>
</template>
