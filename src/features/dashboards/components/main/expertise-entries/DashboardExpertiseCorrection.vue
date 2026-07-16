<script setup lang="ts">
import type { ExpertiseActual } from '../../../types/expertise/Api';

const props = defineProps<ExpertiseActual>();
</script>
<template>
  <div class="main-expertise-dashboard__table-cell">
    {{ parseInt(name) }}
  </div>

  <div class="main-expertise-dashboard__table-cell">
    {{ remarks?.total }}
  </div>

  <div class="main-expertise-dashboard__table-cell main-expertise-dashboard__table-cell--green">
    {{ remarks?.resolved }}
  </div>

  <div class="main-expertise-dashboard__table-cell main-expertise-dashboard__table-cell--red">
    {{ remarks?.pending }}
  </div>

  <div
    class="main-expertise-dashboard__table-cell main-expertise-dashboard__table-cell--purple"
    :style="{ '--fill-percent': `${Math.min(100, Math.max(0, remarks?.percentage ?? 0))}%` }"
  >
    <span class="main-expertise-dashboard__table-cell-fill" aria-hidden="true" />
    <span class="main-expertise-dashboard__table-cell-value">
      {{ (remarks?.percentage || 0).toFixed(1) }}%
    </span>
  </div>
  <div
    class="main-expertise-dashboard__table-cell"
    :class="{
      'main-expertise-dashboard__table-cell--red': props.expertiseOverdue
    }"
    style="grid-column: span 1"
  >
    {{ ends || "–" }}
  </div>
</template>
