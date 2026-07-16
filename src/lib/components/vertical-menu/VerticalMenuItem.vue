<script setup>
import { computed, inject, ref, useId } from "vue";
import Icon from "../icon/Icon.vue";

const { tabkey, icon, label } = defineProps(["tabkey", "icon", "label"]);
const currentTabkey = inject("currentTabkey");
const setCurrentTabkey = inject("setCurrentTabkey");
const shrink = inject("shrink");
const shrinkOnSelect = inject("shrinkOnSelect");
const expanded = inject("expanded");

const hide = ref(true);
const selected = computed(() => currentTabkey.value === tabkey);
const iconColor = computed(() => {
  if (selected.value && hide.value) {
    return "color-text-secondary-darkmode";
  } else if (hide.value) {
    return "dark-color-border-primary";
  } else if (selected.value) {
    return "color-icon-primary-inverse";
  } else {
    return "dark-color-icon-violet";
  }
});

const anchor = `--${useId()}`;

const mouseenter = () => (hide.value = false);
const mouseleave = () => (hide.value = true);

const handleClick = () => {
  mouseleave();
  if (shrinkOnSelect) shrink();
  setCurrentTabkey(tabkey);
};
</script>

<template>
  <button
    class="vertical-menu-item"
    :class="{ 'vertical-menu-item_active': selected }"
    @click="handleClick"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <div class="vertical-menu-item__icon" :style="{ anchorName: anchor }">
      <Icon :name="icon" :color-name="iconColor" />
    </div>
    <span
      v-show="!hide"
      :style="{ positionAnchor: anchor }"
      class="vertical-menu-item__tooltip"
      :class="{ 'vertical-menu-item__tooltip--invisible': expanded }"
    >
      {{ label }}
    </span>
    <p>{{ label }}</p>
  </button>
</template>

