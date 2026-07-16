<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ date: Date | [Date, Date]; showTime?: boolean }>();

const dateIntl = Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
const timeIntl = Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit" });

const isDateRange = computed(() => Array.isArray(props.date));

const formattedDate = computed(() => {
  if (isDateRange.value) {
    const [startDate, endDate] = props.date as [Date, Date];
    return `${dateIntl.format(startDate)} – ${dateIntl.format(endDate)}`;
  }
  return dateIntl.format(props.date as Date);
});

const formattedTime = computed(() => {
  if (isDateRange.value) {
    return null;
  }
  return timeIntl.format(props.date as Date);
});
</script>

<template>
  <div class="dashboard-date-label">
    <div class="dashboard-date-label__line" />

    <div class="dashboard-date-label__value">
      {{ formattedDate }}
    </div>

    <div v-if="showTime && formattedTime" class="dashboard-date-label__value">
      {{ formattedTime }}
    </div>

    <div class="dashboard-date-label__line" />
  </div>
</template>
