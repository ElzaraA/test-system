<script setup lang="ts">
import { computed, ref } from "vue";
import { VerticalMenu, VerticalMenuItem, useAuth } from "@/lib";
import { Legend, CamerasModal } from "@/features/dashboards";
import { tabKeyToRoute } from "@/features/dashboards/model/useDashboardsNavigation";

const sidebarTab = ref(tabKeyToRoute.status);
const auth = useAuth();

const canAccessDashboards = computed(() => auth.canAccessMethod("mediaAgenda"));

const legend = [
  { color: "#2AB4AE", text: "Выполнение в срок" },
  { color: "#FF4D4D", text: "Отставание от графика" },
  { color: "#FF8A00", text: "Выполнение с опозданием" },
  { color: "#FFF", text: "План" },
  { color: "#497FAE", text: "Завершено" },
];
</script>

<template>
  <div class="dashboards-page">
    <div class="dashboards-page__sidebar">
      <VerticalMenu v-model:tabkey="sidebarTab" class="dashboards-page__menu" :clearable="false">
        <VerticalMenuItem :tabkey="tabKeyToRoute.status" icon="analytics" label="Основное" />
        <VerticalMenuItem :tabkey="tabKeyToRoute.expertise" icon="expertise" label="Экспертиза" />
        <VerticalMenuItem :tabkey="tabKeyToRoute.land" icon="land" label="Земельные участки" />
        <VerticalMenuItem :tabkey="tabKeyToRoute.building" icon="construction" label="Строительство" />
        <VerticalMenuItem :tabkey="tabKeyToRoute.quarries" icon="technic" label="Карьеры" />
        <VerticalMenuItem :tabkey="tabKeyToRoute.factories" icon="house" label="Заводы и полигоны" />
        <VerticalMenuItem :tabkey="tabKeyToRoute.scp" icon="gas-pipe" label="СКП" />
        <VerticalMenuItem :tabkey="tabKeyToRoute.schedule" icon="construction-time" label="График строительства" />
        <VerticalMenuItem :tabkey="tabKeyToRoute.pos" icon="pos" label="Сдвиг сроков относительно ПОС" />
        <VerticalMenuItem :tabkey="tabKeyToRoute['land-allocation']" icon="land-allocation" label="Землеотвод" />
        <VerticalMenuItem :tabkey="tabKeyToRoute.train" icon="train" label="Высокоскоростной подвижной состав" />
        <VerticalMenuItem :tabkey="tabKeyToRoute.money" icon="money" label="Финансирование" />
        <VerticalMenuItem :tabkey="tabKeyToRoute.construction" icon="project" label="Проектирование" />
        <VerticalMenuItem :tabkey="tabKeyToRoute.president" icon="president" label="Поручения" />
        <VerticalMenuItem
          v-if="canAccessDashboards"
          :tabkey="tabKeyToRoute.media"
          icon="tv"
          label="Публичное поле"
        />
        <VerticalMenuItem :tabkey="tabKeyToRoute.risks" icon="risks" label="Риски проекта" />
        <template #additional-info>
          <Legend class="dashboards-page__legend" :data="legend" direction="vertical" />
        </template>
      </VerticalMenu>
    </div>

    <div class="dashboards-page__content">
      <div class="dashboards-page__content-wrapper">
        <RouterView />
      </div>
    </div>

    <CamerasModal />
  </div>
</template>
