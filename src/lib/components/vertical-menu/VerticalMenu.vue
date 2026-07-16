<script setup>
import Icon from "../icon/Icon.vue";
import { provide, ref } from "vue";

const {
  clearable = true,
  expandable = true,
  expandedOnStart = false,
  shrinkOnSelect = true,
} = defineProps([
  "clearable",
  "expandable",
  "expandedOnStart",
  "shrinkOnSelect",
]);
const currentTabkey = defineModel("tabkey");
const expanded = ref(expandedOnStart);

const shrink = () => {
  expanded.value = false;
};

const toggleExpand = () => {
  expanded.value = !expanded.value;
};

const setCurrentTabkey = (tabkey) => {
  if (clearable) {
    currentTabkey.value = currentTabkey.value == tabkey ? null : tabkey;
  } else {
    currentTabkey.value = tabkey;
  }
};

provide("currentTabkey", currentTabkey);
provide("setCurrentTabkey", setCurrentTabkey);
provide("shrink", shrink);
provide("shrinkOnSelect", shrinkOnSelect);
provide("expanded", expanded)
</script>

<template>
  <div
    v-bind="$attrs"
    class="vertical-menu"
    :class="{ 'vertical-menu_expanded': expanded }"
  >
    <div class="vertical-menu__content">
      <div class="vertical-menu__content-wrapper">
        <div class="vertical-menu__items">
          <slot />
        </div>
        <div class="vertical-menu__additional-info">
          <slot name="additional-info" />
        </div>
      </div>
    </div>
    <button v-if="expandable" @click="toggleExpand">
      <Icon name="chevron-left" color-name="color-text-secondary-darkmode" />
      <p class="vertical-menu__button-text">
        Свернуть
      </p>
    </button>
  </div>
</template>
