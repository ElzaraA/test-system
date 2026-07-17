тут убери все что связано с бургер меню и сайдбаром
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { VerticalMenu, VerticalMenuItem, useAuth } from "@/lib";
import { Legend, CamerasModal } from "@/features/dashboards";
import { tabKeyToRoute } from "@/features/dashboards/model/useDashboardsNavigation";

const sidebarTab = ref(tabKeyToRoute.status);
const auth = useAuth();

// Состояние бургер-меню
const isMenuOpen = ref(false);
const isMobile = ref(false);

const canAccessDashboards = computed(() => auth.canAccessMethod("mediaAgenda"));

const legend = [
  { color: "#2AB4AE", text: "Выполнение в срок" },
  { color: "#FF4D4D", text: "Отставание от графика" },
  { color: "#FF8A00", text: "Выполнение с опозданием" },
  { color: "#FFF", text: "План" },
  { color: "#497FAE", text: "Завершено" },
];

// Проверяю ширину экрана
function checkMobile() {
  if (!isMobile.value) {
    isMenuOpen.value = false; 
  }
}

// Закрываем меню при клике вне его
function closeMenuOnClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (
    isMenuOpen.value &&
    !target.closest(".dashboards-page__sidebar") &&
    !target.closest(".dashboards-page__burger")
  ) {
    isMenuOpen.value = false;
  }
}

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
  document.addEventListener("click", closeMenuOnClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
  document.removeEventListener("click", closeMenuOnClickOutside);
});

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
  <div class="dashboards-page">
    <!--Бургер-кнопка -->
    <button
      class="dashboards-page__burger"
      :class="{ 'dashboards-page__burger--active': isMenuOpen }"
      aria-label="Открыть меню"
      @click="toggleMenu"
    >
      <span class="dashboards-page__burger-line" />
      <span class="dashboards-page__burger-line" />
      <span class="dashboards-page__burger-line" />
    </button>

    <!-- Затемнение фона при открытом меню -->
    <div
      v-if="isMenuOpen"
      class="dashboards-page__overlay"
      @click="isMenuOpen = false"
    />

    <div
      class="dashboards-page__sidebar"
      :class="{ 'dashboards-page__sidebar--open': isMenuOpen }"
    >
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