<script setup lang="ts">
type SkeletonType = "dashboard" | "page" | "list" | "table";

interface Props {
  type?: SkeletonType;
  showHeader?: boolean;
  showSearch?: boolean;
  cardCount?: number;
  gridColumns?: number[];
  listItemCount?: number;
  tableRowCount?: number;
  tableColumnCount?: number;
}

withDefaults(defineProps<Props>(), {
  type: "list",
  showHeader: true,
  showSearch: false,
  cardCount: 3,
  gridColumns: () => [6, 6, 6, 4, 2],
  listItemCount: 3,
  tableRowCount: 5,
  tableColumnCount: 4,
});
</script>

<template>
  <div class="page-skeleton" :class="`page-skeleton--${type}`">
    <!-- Header -->
    <div v-if="showHeader" class="page-skeleton__header">
      <div class="page-skeleton__line page-skeleton__line--title" />
      <div v-if="type === 'page'" class="page-skeleton__line page-skeleton__line--date" />
    </div>

    <!-- Search block -->
    <div v-if="showSearch" class="page-skeleton__search">
      <div class="page-skeleton__line page-skeleton__line--search" />
    </div>

    <!-- Dashboard grid layout -->
    <div v-if="type === 'dashboard'" class="page-skeleton__content page-skeleton__content--grid">
      <div
        v-for="(colSpan, i) in gridColumns"
        :key="i"
        class="page-skeleton__card"
        :style="{ gridColumn: `span ${colSpan}` }"
      >
        <div class="page-skeleton__card-header">
          <div class="page-skeleton__line page-skeleton__line--small" />
        </div>
        <div class="page-skeleton__card-body">
          <div v-for="j in 3" :key="j" class="page-skeleton__line" />
          <div v-for="j in 2" :key="'short-' + j" class="page-skeleton__line page-skeleton__line--short" />
        </div>
      </div>
    </div>

    <!-- Page layout with cards -->
    <div v-else-if="type === 'page'" class="page-skeleton__content page-skeleton__content--cards">
      <div v-for="i in cardCount" :key="i" class="page-skeleton__card">
        <div class="page-skeleton__card-header">
          <div class="page-skeleton__line page-skeleton__line--small" />
        </div>
        <div class="page-skeleton__card-body">
          <div v-for="j in 3" :key="j" class="page-skeleton__line" />
          <div v-for="j in 2" :key="'short-' + j" class="page-skeleton__line page-skeleton__line--short" />
        </div>
      </div>
    </div>

    <!-- List layout -->
    <div v-else-if="type === 'list'" class="page-skeleton__content page-skeleton__content--list">
      <div v-for="i in listItemCount" :key="i" class="page-skeleton__list-item">
        <div class="page-skeleton__list-item-content">
          <div class="page-skeleton__line" />
          <div class="page-skeleton__line page-skeleton__line--short" />
        </div>
      </div>
    </div>

    <!-- Table layout -->
    <div v-else-if="type === 'table'" class="page-skeleton__content page-skeleton__content--table">
      <div class="page-skeleton__table-header" :style="{ gridTemplateColumns: `repeat(${tableColumnCount}, 1fr)` }">
        <div
          v-for="i in tableColumnCount"
          :key="i"
          class="page-skeleton__line page-skeleton__line--table-header"
        />
      </div>
      <div
        v-for="i in tableRowCount"
        :key="i"
        class="page-skeleton__table-row"
        :style="{ gridTemplateColumns: `repeat(${tableColumnCount}, 1fr)` }"
      >
        <div v-for="j in tableColumnCount" :key="j" class="page-skeleton__line page-skeleton__line--table-cell" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.page-skeleton {
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
  height: 100%;
  width: 100%;

  @media (max-height: 1000px) {
    gap: 24px;
    padding: 32px 0;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 20px;
  }

  &__search {
    width: 100%;
    padding: 16px 0;
  }

  &__content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;

    &--grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 40px;

      @include desktopHd {
        gap: 24px;
      }

      @media (max-height: 1000px) {
        gap: 24px;
      }
    }

    &--cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }

    &--list {
      gap: 16px;
    }

    &--table {
      gap: 0;
      overflow-x: auto;
    }
  }

  &__card {
    display: flex;
    flex-direction: column;
    background-color: transparent;
    border-radius: 8px;
    overflow: hidden;
  }

  &__card-header {
    background-color: $dark-color-background-headlines;
    padding: 10px;
    border-radius: 8px 8px 0 0;
    margin-bottom: 20px;
  }

  &__card-body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    background-color: rgba(38, 44, 54, 0.3);
    border-radius: 0 0 8px 8px;
    flex: 1 1 auto;
  }

  &__list-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background-color: rgba(38, 44, 54, 0.3);
    border-radius: 8px;
  }

  &__list-item-content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__table-header {
    display: grid;
    gap: 16px;
    padding: 12px 16px;
    background-color: $dark-color-background-headlines;
    border-radius: 8px 8px 0 0;
  }

  &__table-row {
    display: grid;
    gap: 16px;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-bottom: none;
    }
  }

  &__line {
    height: 16px;
    border-radius: 4px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.1) 100%
    );
    background-size: 1000px 100%;
    animation: shimmer 2s infinite;
    width: 100%;

    &--title {
      height: 32px;
      width: 300px;
      border-radius: 8px;
    }

    &--date {
      height: 40px;
      width: 200px;
      border-radius: 8px;
    }

    &--search {
      height: 48px;
      width: 100%;
      border-radius: 8px;
    }

    &--small {
      height: 20px;
      width: 60%;
      margin: 0 auto;
    }

    &--short {
      width: 70%;
    }

    &--avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    &--table-header {
      height: 20px;
    }

    &--table-cell {
      height: 16px;
    }
  }
}
</style>