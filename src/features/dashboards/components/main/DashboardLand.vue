<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import DashboardDate from "../common/DashboardDate.vue";
import Legend from "../common/Legend.vue";
import { useLandStore } from "../../model/useLandStore";
import type { LandStatus, LandAllocationInfo } from "../../types/land_allocation/Api";
import type { LoaderFn } from "../../types/main/Api";

const props = defineProps<{ loadWatcher: LoaderFn }>();
const numberIntl = Intl.NumberFormat("ru-RU");

const landStore = useLandStore();


const data = ref<LandAllocationInfo[] | null>(null);

const currentDateObj = computed(() => {
  if (!landStore.currentDate) return new Date();
  const [day, month, year] = landStore.currentDate.split(".");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 12, 0, 0, 0);
});

const legendLand = [
  {
    color: "#2AB4AE",
    text: "Выполнено на текущую дату",
  },
  {
    color: "#414247",
    text: "План",
  },
];

// Функция для вычисления процента выполнения
const getProgressPercentage = (completed: number, plan: number) => {
  return (completed / (plan + completed)) * 100;
};

// Функция для получения читаемого названия условия
const getConditionTitle = (condition: LandStatus) => {
  const titles: Record<LandStatus, string> = {
    UNENCUMBERED_BY_THIRD_PEOPLE: "Необременённые третьими лицами",
    TAKING_FROM_THIRD_PEOPLE: "Изъятие у третьих лиц",
    SETTING_EASEMENT: "Установление сервитутов",
  };
  return titles[condition] || condition;
};

const formatNumber = (number: number) => {
  return numberIntl.format(number);
};

onMounted(async () => {
  try {
    await landStore.loadDateTimes();
    if (!landStore.currentDate || !landStore.currentTime) {
      const [defaultDate, defaultTime] = landStore.getNewestDateTime();
      landStore.currentDate = defaultDate;
      landStore.currentTime = defaultTime;
    }
    data.value = await landStore.getLandDataForMain(landStore.currentDate, landStore.currentTime);
  } finally {
    props.loadWatcher?.("lands");
  }
});
</script>

<template>
  <div v-if="data !== null" class="land-dashboard">
    <DashboardDate :date="currentDateObj" />
    <div class="land-dashboard__header">
      <p>1-7 этапы</p>
    </div>
    <div v-if="!!data?.length" class="land-dashboard__sections">
      <div v-for="(item, index) in data" :key="index" class="land-dashboard__section">
        <h3 class="land-dashboard__section-title">
          {{ getConditionTitle(item.newLandPlotCondition) }}
        </h3>
        <div class="land-dashboard__progress-bar">
          <!-- Выполнено -->
          <div
            v-if="item.completeValue > 0"
            class="land-dashboard__progress-completed"
            :style="{
              width: getProgressPercentage(item.completeValue, item.planValue) + '%',
            }"
          >
            <span class="land-dashboard__progress-value">{{ formatNumber(item.completeValue) }}</span>
          </div>
          <!-- План -->
          <div
            class="land-dashboard__progress-plan"
            :style="{
              width: 100 - getProgressPercentage(item.completeValue, item.planValue) + '%',
            }"
          >
            <span class="land-dashboard__progress-value">{{ formatNumber(item.planValue) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="!data" class="land-dashboard__no-data">
      <p>Данные отсутствуют для даты {{ landStore.currentDate }}</p>
    </div>
    <Legend
      v-if="!!data?.length"
      :data="legendLand"
      direction="horizontal"
      class="land-dashboard__legend"
    />
  </div>
</template>
