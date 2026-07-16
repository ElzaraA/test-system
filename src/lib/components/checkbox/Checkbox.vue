<script setup>
const model = defineModel({ type: Boolean, default: false });
</script>

<template>
  <label class="lib-checkbox">
    <input v-model="model" type="checkbox" v-bind="$attrs">
    <span class="lib-checkbox__box" />
  </label>
</template>

<style scoped>
.lib-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.lib-checkbox input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.lib-checkbox__box {
  width: 18px;
  height: 18px;
  border: 1px solid #4547bb;
  border-radius: 4px;
  background: #191d23;
}

.lib-checkbox input:checked + .lib-checkbox__box {
  background: #4547bb;
}
</style>
