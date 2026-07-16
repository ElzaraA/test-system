<script setup>
const {
  variant = "primary",
  type: typeProp,
  size = "m",
  disabled,
} = defineProps(["variant", "type", "size", "iconLeft", "iconRight", "disabled"]);

const resolvedVariant = typeProp ?? variant;

const getVariantClass = () => {
  switch (resolvedVariant) {
    case "gray":
      return "button-gray";
    case "outline":
      return "button-outline";
    case "text":
      return "button-text";
    default:
      return "button-primary";
  }
};

const getSizeClass = () => {
  switch (size) {
    case "xl":
      return "button-xl";
    case "l":
      return "button-l";
    case "s":
      return "button-s";
    case "m":
    default:
      return "button-m";
  }
};
</script>

<template>
  <button
    v-bind="$attrs"
    :disabled="disabled"
    :class="['button', getSizeClass(), getVariantClass()]"
  >
    <slot />
  </button>
</template>
