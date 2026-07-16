<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Icon } from "@/lib";
import { STAGE_DISPLAY_INFO } from "@/features/common/constants";
import { useBuildingDashboardStore } from "../../model/useBuildingStore.js";
import DashboardDate from "../common/DashboardDate.vue";
import type { WorkStageData, WorkBuildingData, WorkStageDescription } from "../../types/construction/Api.js";
import type { LoaderFn } from "../../types/main/Api.js";

const props = defineProps<{ loadWatcher: LoaderFn}>();

const ICONS: Record<string, string> = {
  Isso: "artificial-structure",
  Zp: "roadbed",
  Vsp: "upper-structure",
  Ks: "electricity",
};

const STAGES_ORDERED = [
  "ENTRANCE_TO_PETERSBURG",
  "STAGE1",
  "STAGE2",
  "STAGE3",
  "STAGE4",
  "STAGE5",
  "STAGE6",
  "STAGE7",
  "ENTRANCE_TO_MOSCOW",
  "STAGE8",
  "STAGE9",
  "COMMON",
];

const numberIntl = Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 });
const buildingStore = useBuildingDashboardStore();
const buildingData = ref<WorkBuildingData | null>(null);
const stageIndex = ref(0);
const date = ref<Date | null>(null);

const stageData = computed(() => {
  if (!buildingData.value || !buildingData.value.works || buildingData.value.works.length === 0) {
    return null;
  }

  const stages: WorkStageData[] = [];

  STAGES_ORDERED.forEach((stageName) => {
    const stage = buildingData.value?.works.find((s) => s.stage === stageName);
    if (!stage) return;

    stage.title = (STAGE_DISPLAY_INFO as Record<string, WorkStageDescription>)[stageName].shortTitle;
    stages.push(stage);
  });

  if (stages.length === 0 || !stages[stageIndex.value]) {
    return null;
  }

  return {
    ...stages[stageIndex.value],
    workElements: stages[stageIndex.value].workElements
      .toSorted((w0, w1) => w0.order - w1.order)
      .map((s) => ({
        ...s,
        icon: ICONS[s.workElementNameId],
        link: s.workElementNameId === "Isso" && s.unit === "шт",
      })),
  };
});

const canMoveToPrev = computed(() => stageIndex.value !== 0);
const canMoveToNext = computed(() => {
  if (!buildingData.value || !buildingData.value.works) return false;
  return stageIndex.value !== buildingData.value.works.length - 1;
});

const moveToPrev = () => {
  if (stageIndex.value > 0) {
    stageIndex.value -= 1;
  }
};
const moveToNext = () => {
  if (buildingData.value && buildingData.value.works && stageIndex.value < buildingData.value.works.length - 1) {
    stageIndex.value += 1;
  }
};

const formatNumber = (number: number | null) => {
  if (number === null) return null;
  return numberIntl.format(number);
};

onMounted(async () => {
  const data = await buildingStore.getBuildingDataForMainPage();
  props.loadWatcher?.("buildings");
  if (data) {
    buildingData.value = data;
    stageIndex.value = data.works ? data.works.length - 1 : 0;
    date.value = data.actualDate ? new Date(data.actualDate) : null;
  }
});
</script>

<template>
  <div v-if="buildingData && stageData" class="main-building-dashboard">
    <DashboardDate :date="(date as Date)" />

    <div class="main-building-dashboard__content">
      <div class="main-building-dashboard__header">
        <button class="main-building-dashboard__header-button" :disabled="!canMoveToPrev" @click="moveToPrev">
          <Icon name="arrow-up" color-name="dark-color-text-secondary" :style="{ transform: 'rotate(-90deg)' }" />
        </button>

        <p>{{ stageData.title }}</p>

        <button class="main-building-dashboard__header-button" :disabled="!canMoveToNext" @click="moveToNext">
          <Icon name="arrow-up" color-name="dark-color-text-secondary" :style="{ transform: 'rotate(90deg)' }" />
        </button>
      </div>

      <div class="main-building-dashboard__items">
        <template v-for="item of stageData.workElements" :key="item.order">
          <div class="main-building-dashboard__item-icon">
            <Icon :name="item.icon" color-name="dark-color-text-secondary" />
          </div>

          <div class="main-building-dashboard__item-heading">
            <div
              v-if="item.link"
              class="main-building-dashboard__item-heading-link"
              role="presentation"
            >
              <div class="main-building-dashboard__item-heading-content">
                <div class="main-building-dashboard__item-title-row">
                  <p style="text-decoration: underline">
                    {{ item.workElementName }}
                  </p>
                  <Icon
                    name="arrow-up-right"
                    color-name="dark-color-text-secondary"
                    class="main-building-dashboard__item-link-icon"
                  />
                </div>
                <small>{{ item.unit }}</small>
              </div>
            </div>
            <div v-else class="main-building-dashboard__item-heading-content">
              <div class="main-building-dashboard__item-title-row">
                <p>{{ item.workElementName }}</p>
              </div>
              <small>{{ item.unit }}</small>
            </div>
          </div>

          <div class="main-building-dashboard__item-percent">
            {{ `${item.percent !== null ? formatNumber(item.percent) + "%" : ""}` }}
          </div>

          <div class="main-building-dashboard__item-bar">
            <div
              v-if="item.fact"
              class="main-building-dashboard__item-bar--green"
              :style="{ width: `${(item.fact / item.plan) * 100}%` }"
            >
              <p>{{ formatNumber(item.fact) }}</p>
            </div>

            <div
              v-if="item.expired"
              class="main-building-dashboard__item-bar--red"
              :style="{ width: `${(item.expired / item.plan) * 100}%` }"
            >
              <p>{{ item.expired !== 0 ? formatNumber(item.expired) : "" }}</p>
            </div>

            <p v-if="!item.plan">
              {{ formatNumber(item.plan) }}
            </p>
          </div>

          <div class="main-building-dashboard__item-total">
            {{ formatNumber(item.plan) }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
