<script setup>
import { computed, onMounted, ref } from "vue";
import { useAuth } from "@/lib";
import { useRoute } from "vue-router";
import { LogoutButton } from "@/features/auth";

const route = useRoute();
const auth = useAuth();

const liteVersion = ref(false);

const accessToMonitoring = computed(() => auth.canAccessMethod("useSMRMonitoring"));

onMounted(() => {
  liteVersion.value = auth.isInfiniteUser();
});

const navItems = [
  { label: "Дашборды", active: () => route?.name?.startsWith("dashboards"), key: "dashboards" },
  { label: "Карта", active: () => route.name === "filters", key: "map" },
  { label: "Документация", active: () => route.name === "documentation", key: "docs" },
  {
    label: "Фоторепортажи",
    active: () => route?.name === "blog" || route?.name === "post",
    key: "blog",
  },
  { label: "Строительство объектов", active: () => route.name === "construction-isso", key: "construction" },
  { label: "Саблино – Тосно", active: () => route.name === "sablino-tosno", key: "sablino" },
  {
    label: "Мониторинг тех.эксперта",
    active: () => ["monitoring", "earthworks-scheme", "registry"].includes(route.name),
    key: "monitoring",
    visible: () => accessToMonitoring.value,
  },
];

const onNavClick = (event) => {
  event.preventDefault();
};
</script>

<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__item">
        <div class="navbar__logo logo">
          <div class="logo__img" />
        </div>
      </li>
      <li
        v-for="item in navItems"
        v-show="item.visible ? item.visible() : true"
        :key="item.key"
        class="navbar__item"
        :class="{ navbar__item_active: item.active() }"
      >
        <a
          href="#"
          class="navbar__label navbar__label_blocked"
          @click="onNavClick"
        >
          {{ item.label }}
        </a>
      </li>
    </ul>

    <div v-if="!liteVersion" class="navbar__tools">
      <LogoutButton />
    </div>
  </nav>
</template>
