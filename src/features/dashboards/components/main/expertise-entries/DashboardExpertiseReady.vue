<script setup lang="ts">
import { computed } from "vue";
import type { ExpertiseActual } from '../../../types/expertise/Api';

const expertNumber = computed(() => (props.description || "").match(/№[0-9-_]+$/)?.[0]);
/** возможно, потребуется выдать номер с визуальной пометкой */
const props = defineProps<ExpertiseActual>();
</script>
<template>
  <div class="main-expertise-dashboard__table-cell">
    {{ parseInt(name) }}
  </div>
  <div
    v-if="props.description"
    class="main-expertise-dashboard__table-cell main-expertise-dashboard__table-cell--green"
    style="grid-column: span 4"
  >
    <span class="main-expertise-dashboard__table-cell-status" />
    <span>{{ expertNumber }}</span>
  </div>
  <div class="main-expertise-dashboard__table-cell main-expertise-dashboard__table-cell--green">
    {{ props.ends || "–" }}
  </div>
</template>
