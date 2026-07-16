<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Icon } from "@/lib";
import { tabKeyToRoute, useDashboardsNavigation } from "../../model/useDashboardsNavigation.js";
import DashboardBase from "../common/DashboardBase.vue";
import DashboardExpertise from "./DashboardExpertise.vue";
import DashboardQuestions from "./DashboardQuestions.vue";
import DashboardResources from "./DashboardResources.vue";
import DashboardBuilding from "./DashboardBuilding.vue";
import DashboardLand from './DashboardLand.vue';
import DashboardLayout from "../common/DashboardLayout.vue";
import MainSectionSkeleton from "../common/skeletons/MainSectionSkeleton.vue";
import type { LoaderFn } from '../../types/main/Api.js';

const rootLoading = ref(true);
const resourcesSectionTitle = ref("Ресурсы (Этап 6)");
const dashboardResourcesRef = ref<{ shiftStage: (delta: -1 | 1) => void } | null>(null);

const { setDashboardPage } = useDashboardsNavigation();

function onResourcesStageNav(delta: -1 | 1) {
  dashboardResourcesRef.value?.shiftStage(delta);
}

const init = async () => Promise.resolve();

const resolvers: Record<string, LoaderFn> = {
  questions: null,
  resources: null,
  expertise: null,
  buildings: null,
  land: null,
};

const loaders = Object
  .keys(resolvers)
  .map((key) => new Promise(resolve => resolvers[key] = resolve));

onMounted(async () => {
  await Promise.all(loaders);
  rootLoading.value = false;
});
</script>

<template>
  <div class="dashboards-page__content-section dashboards-main-section">
    <header class="dashboards-main-section__header">
      <h2>Статус реализации проекта ВСМ-1</h2>
    </header>
    <DashboardLayout
      v-if="!!rootLoading"
      :init="init"
      :skeleton="MainSectionSkeleton"
      :root-loading="rootLoading"
    />

    <section v-show="!rootLoading" class="dashboards-main-section__content">
      <DashboardBase title="Контрольные точки из КСГ" :style="{ gridColumn: 'span 6' }">
        <DashboardQuestions :load-watcher="resolvers.questions" />
      </DashboardBase>

      <DashboardBase
        :title="resourcesSectionTitle"
        style="grid-column: span 6"
      >
        <template #title-before>
          <button
            type="button"
            class="dashboards-main-section__title-nav-btn"
            aria-label="Предыдущий этап ресурсов"
            @click="onResourcesStageNav(-1)"
          >
            <Icon name="chevron-left" color-name="dark-color-text-primary" />
          </button>
        </template>
        <template #title-after>
          <button
            type="button"
            class="dashboards-main-section__title-nav-btn"
            aria-label="Следующий этап ресурсов"
            @click="onResourcesStageNav(1)"
          >
            <Icon name="chevron-right" color-name="dark-color-text-primary" />
          </button>
        </template>
        <DashboardResources
          ref="dashboardResourcesRef"
          :load-watcher="resolvers.resources"
          @update:section-title="resourcesSectionTitle = $event"
        />
      </DashboardBase>

      <DashboardBase
        title="Экспертиза"
        :is-link="true"
        style="grid-column: span 6"
        @click="setDashboardPage(tabKeyToRoute.expertise)"
      >
        <DashboardExpertise :load-watcher="resolvers.expertise" />
      </DashboardBase>

      <DashboardBase
        title="Строительство"
        :is-link="true"
        :style="{ gridColumn: 'span 4' }"
        @click="setDashboardPage(tabKeyToRoute.building)"
      >
        <DashboardBuilding :load-watcher="resolvers.buildings" />
      </DashboardBase>


      <DashboardBase
        title="Земельные участки"
        :is-link="true"
        style="grid-column: span 2"
        @click="setDashboardPage(tabKeyToRoute.land)"
      >
        <DashboardLand :load-watcher="resolvers.land" />
      </DashboardBase>
    </section>
  </div>
</template>
