<script setup lang="ts">
import type { ExpertiseActual } from '../../../types/expertise/Api';

const props = defineProps<ExpertiseActual>();
</script>
<template>
  <div class="main-expertise-dashboard__table-cell">
    {{ parseInt(name) }}
  </div>

  <div
    class="main-expertise-dashboard__table-cell"
    :class="{
      'main-expertise-dashboard__table-cell--red': props.expertiseOverdue
    }"
    style="grid-column: span 5"
  >
    {{ ends || "–" }}
  </div>
</template>
