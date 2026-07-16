<script setup lang="ts">
import { computed, onMounted, onActivated, ref } from "vue";
import type { Component } from "vue";
import { LoadingSpinner } from "@/lib";
import PageSkeleton from "./PageSkeleton.vue";
import { sleep } from "../../utils/preloadDelays";

const MIN_PRELOAD_DELAY = 250;

const props = withDefaults(
  defineProps<{
    init: () => Promise<void>;
    skeleton?: Component | null; // Компонент скелетона или null для использования дефолтног
    rootLoading?: boolean;
    isCached?: boolean;
    loadingMode?: "skeleton" | "loader" | "none";
  }>(),
  {
    skeleton: null,
    loadingMode: "skeleton",
  }
);

const emit = defineEmits<{
  'update:bootstrapping': [value: boolean];
}>();

const loading = ref(false);
const timeoutPassed = ref(false);
const isInitialized = ref(false);

const loadData = async () => {
  if (loading.value) return;
  try {
    loading.value = true;
    emit('update:bootstrapping', true);
    sleep(MIN_PRELOAD_DELAY, () => { timeoutPassed.value = true; });
    if (!props.isCached) await sleep(500);
    await props.init();
    isInitialized.value = true;
  } finally {
    loading.value = false;
    emit('update:bootstrapping', false);
  }
};

const showLoading = computed(() => timeoutPassed.value && (loading.value || !!props.rootLoading));

onMounted(async () => {
  await loadData();
});

onActivated(async () => {
  if (!isInitialized.value) return;
  // Перезагружаем данные при активации компонента в KeepAlive
  await loadData();
});
</script>

<template>
  <div v-if="showLoading && props.loadingMode === 'loader'" class="dashboard-layout__loading">
    <LoadingSpinner />
    <p>Загрузка данных...</p>
  </div>
  <component :is="skeleton" v-else-if="props.loadingMode === 'skeleton' && skeleton && showLoading" />
  <PageSkeleton v-else-if="props.loadingMode === 'skeleton' && !skeleton && showLoading" type="list" :card-count="3" />
  <slot v-else-if="props.loadingMode === 'none' || (!loading && !props.rootLoading)" />
</template>

<style scoped lang="postcss">
.dashboard-layout__loading {
  width: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 12px 0 20px;

  & > p {
    @include body-1;
    color: $dark-color-text-secondary;
  }
}
</style>
