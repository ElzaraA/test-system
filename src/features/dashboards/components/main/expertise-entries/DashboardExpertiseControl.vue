<script setup lang="ts">
import type { ExpertiseActual } from '../../../types/expertise/Api';
import { ControlColorMap } from '../../../constants/service/expertiseService';

const props = defineProps<ExpertiseActual>();
</script>
<template>
  <div class="main-expertise-dashboard__table-cell">
    {{ parseInt(name) }}
  </div>

  <div
    class="main-expertise-dashboard__table-cell"
    :class="`main-expertise-dashboard__table-cell--${ControlColorMap.get(props.substatus)}`"
    style="grid-column: span 4"
  >
    {{ props?.description }}
  </div>

  <div
    class="main-expertise-dashboard__table-cell"
    :class="{
      'main-expertise-dashboard__table-cell--red': !!props.expertiseOverdue
    }"
    style="grid-column: span 1"
  >
    {{ ends || "–" }}
  </div>
</template>
