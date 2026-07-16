<script lang="ts" setup>
import { computed,onMounted, ref, toRaw, toValue } from "vue";
import type { Ref } from 'vue';
import { useRouter } from "vue-router";
import { Icon, useAuth, useConfirmModal, useMessageManager } from "@/lib";
import { ksgTableKey, useKsgStore } from "../../model/useKsgStore";
import DashboardDate from "../common/DashboardDate.vue";
import { AdminPageMode } from "../../types";
import { KsgModel, LoaderFn } from "../../types/main/Api";

const date = ref<Date | null>(null);
const viewModel = ref<KsgModel | null>(null);
const props = defineProps<{ loadWatcher: LoaderFn }>();

const auth = useAuth();
const router = useRouter();
const ksgStore = useKsgStore();
const confirmModal = useConfirmModal();
const messageManager = useMessageManager();

const canAccessCreate = computed(
  () => auth.canAccessMethod("controlPointsKsgPage") && auth.canAccessMethod("createControlPointKsg"),
);
const canAccessUpdate = computed(() =>
  auth.canAccessMethod("controlPointsKsgPage") &&
  auth.canAccessMethod("updateControlPointKsg") &&
  ksgStore.availableDates.length > 0
);
const canAccessRemove = computed(() =>
  auth.canAccessMethod("controlPointsKsgPage") &&
  auth.canAccessMethod("deleteControlPointKsg") &&
  ksgStore.availableDates.length > 0
);

const navigateToAdminPage = (mode = AdminPageMode.CREATE) => {
  router.push({ name: "dashboards-ksg-points", query: { mode: mode, d: date.value?.toISOString?.() } });
};

const removeOnDate = async () => {
  const answer = await confirmModal.ask(
    `Удалить данные за ${(date.value as Date).toLocaleDateString("ru-RU")}?`,
    "Данные будут удалены безвозвратно.",
    "Удалить",
    "Отмена",
  );
  if (!answer) return;

  const result = await ksgStore.deletePage(date.value);

  if (!result.ok) {
    messageManager.addMessage(result.error, "error");
    return;
  }

  ksgStore.clearCached();
  viewModel.value = null;
  await init();

  messageManager.addMessage("Дашборд успешно удален");
};

async function init () {
  try {
    if (ksgStore.availableDates.length === 0) {
      const result = await ksgStore.loadAvailableDates();

      if (!result.ok) {
        messageManager.addMessage(result.error, "error");
        return;
      }

      if (ksgStore.availableDates.length === 0) {
        return;
      }
    }

    const newestDate = ksgStore.availableDates[0];
    const key: string = ksgTableKey(newestDate);

    if ((ksgStore.ksgTables as Record<string, KsgModel>)[key] === undefined) {
      const result = await ksgStore.loadKsgTable(newestDate);
      
      if (!result.ok) {
        messageManager.addMessage(result.error, "error");
        return;
      }
    }

    date.value = newestDate;
    viewModel.value = (ksgStore.ksgTables as Record<string, KsgModel>)[key];
    viewModel.value.ksgRecords = toRaw(toValue(viewModel as Ref<KsgModel>)).ksgRecords.toSorted((r0, r1) => r0.number - r1.number);
  } finally {
    props.loadWatcher?.("questions");
  }
}

onMounted(() => init());
</script>

<template>
  <div class="main-questions-dashboard">
    <DashboardDate v-if="viewModel !== null" :date="(date as Date)" />

    <div v-if="canAccessCreate" class="main-questions-dashboard__admin-buttons">
      <button @click.stop="navigateToAdminPage(AdminPageMode.CREATE)">
        <Icon name="plus" color-name="dark-color-text-primary" />
      </button>

      <button v-if="canAccessUpdate" @click.stop="navigateToAdminPage(AdminPageMode.EDIT)">
        <Icon name="edit-2" color-name="dark-color-text-primary" />
      </button>

      <button v-if="canAccessRemove" @click.stop="removeOnDate">
        <Icon name="trash" color-name="dark-color-text-primary" />
      </button>
    </div>

    <div v-if="viewModel !== null" class="main-questions-dashboard__table">
      <div class="main-questions-dashboard__table-head" :style="{ gridRow: 'span 2' }">
        Раздел КСГ
      </div>
      <div class="main-questions-dashboard__table-head" :style="{ gridRow: 'span 2' }">
        Просрочка к текущему дню
      </div>
      <div class="main-questions-dashboard__table-head" :style="{ gridColumn: 'span 2' }">
        Кол-во точек на критическом пути
      </div>
      <div class="main-questions-dashboard__table-head">
        С мин. резервом
      </div>
      <div class="main-questions-dashboard__table-head">
        Всего
      </div>

      <template v-for="item of viewModel.ksgRecords">
        <div class="main-questions-dashboard__table-item main-questions-dashboard__table-item--title">
          <div class="main-questions-dashboard__table-item--number">
            {{ item.number }}
          </div>
          <p>{{ item.name }}</p>
        </div>

        <div
          class="main-questions-dashboard__table-item main-questions-dashboard__table-item--qty"
          :class="{ 'main-questions-dashboard__table-item--outline-red': item.overdueByCurrentDay !== 0 }"
        >
          {{ item.overdueByCurrentDay }}
        </div>

        <div
          class="main-questions-dashboard__table-item main-questions-dashboard__table-item--qty"
          :class="{ 'main-questions-dashboard__table-item--outline-yellow': item.minimalReserve !== 0 }"
        >
          {{ item.minimalReserve }}
        </div>

        <div class="main-questions-dashboard__table-item">
          {{ item.totalPoints }}
        </div>
      </template>

      <div class="main-questions-dashboard__table-item main-questions-dashboard__table-item--title">
        <p>Итого</p>
      </div>

      <div
        class="main-questions-dashboard__table-item"
        :class="{ 'main-questions-dashboard__table-item--fill-red': viewModel.totalOverdueByCurrentDay !== 0 }"
      >
        {{ viewModel.totalOverdueByCurrentDay }}
      </div>

      <div
        class="main-questions-dashboard__table-item"
        :class="{ 'main-questions-dashboard__table-item--fill-yellow': viewModel.totalMinimalReserve !== 0 }"
      >
        {{ viewModel.totalMinimalReserve }}
      </div>

      <div
        class="main-questions-dashboard__table-item"
        :class="{ 'main-questions-dashboard__table-item': viewModel.totalPoints !== 0 }"
      >
        {{ viewModel.totalPoints }}
      </div>
    </div>
  </div>
</template>
