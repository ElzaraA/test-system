<script setup>
const { data, direction = "vertical" } = defineProps(["data", "direction"]);
</script>

<template>
  <ul v-bind="$attrs" class="dashboard-legend" :class="[`dashboard-legend__${direction}`]">
    <li v-for="item of data">
      <div class="dashboard-legend__particle">
        <div
          :style="{ background: item.color, border: item.borderColor ? `2px solid ${item.borderColor}` : 'none' }"
        />
      </div>
      <span>{{ item.text }}</span>
    </li>
  </ul>
</template>
