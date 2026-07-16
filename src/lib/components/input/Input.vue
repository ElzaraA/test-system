<script setup>
const model = defineModel();
const {
  type = "text",
  label = "",
  helperText = "",
  state = "default",
  background = "secondary",
  disabled,
  required,
  placeholder,
} = defineProps([
  "type",
  "label",
  "helperText",
  "state",
  "background",
  "disabled",
  "required",
  "placeholder",
]);

const getStateClass = () => {
  switch (state) {
    case "error":
      return "text-input text-input-error";
    case "warning":
      return "text-input text-input-warning";
    case "success":
      return "text-input text-input-success";
    default:
      return "text-input";
  }
};
</script>

<template>
  <div :class="getStateClass()">
    <input
      v-bind="$attrs"
      v-model="model"
      :class="{
        'text-input--secondary': background === 'secondary',
        'text-input--primary': background === 'primary',
      }"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type"
    >
    <label
      v-if="label"
      :class="{
        'text-input__label--secondary': background === 'secondary',
        'text-input__label--primary': background === 'primary',
      }"
    >
      {{ label }}<span v-if="required !== undefined">*</span>
    </label>
    <p v-if="helperText" class="text-input__helper-text">
      <span>{{ helperText }}</span>
    </p>
  </div>
</template>
