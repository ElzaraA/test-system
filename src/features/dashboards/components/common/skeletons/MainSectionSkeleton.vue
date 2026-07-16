<script setup lang="ts">
</script>

<template>
  <div class="main-section-skeleton section-skeleton">
    <div class="main-section-skeleton__header section-skeleton__header">
      <div class="main-section-skeleton__line section-skeleton__line main-section-skeleton__line--title" />
    </div>

    <div class="main-section-skeleton__content">
      <!-- Контрольные точки из КСГ (span 6) -->
      <div class="main-section-skeleton__card" style="grid-column: span 6">
        <div class="main-section-skeleton__card-header">
          <div class="main-section-skeleton__line section-skeleton__line main-section-skeleton__line--small" />
        </div>
        <div class="main-section-skeleton__card-body">
          <div v-for="j in 8" :key="j" class="main-section-skeleton__line section-skeleton__line" />
        </div>
      </div>

      <!-- Ресурсы (span 6) -->
      <div class="main-section-skeleton__card" style="grid-column: span 6">
        <div class="main-section-skeleton__card-header">
          <div class="main-section-skeleton__line section-skeleton__line main-section-skeleton__line--small" />
        </div>
        <div class="main-section-skeleton__card-body">
          <div v-for="j in 6" :key="j" class="main-section-skeleton__line section-skeleton__line" />
        </div>
      </div>

      <!-- Экспертиза (span 6) -->
      <div class="main-section-skeleton__card" style="grid-column: span 6">
        <div class="main-section-skeleton__card-header">
          <div class="main-section-skeleton__line section-skeleton__line main-section-skeleton__line--small" />
        </div>
        <div class="main-section-skeleton__card-body">
          <div v-for="j in 4" :key="j" class="main-section-skeleton__line section-skeleton__line" />
        </div>
      </div>

      <!-- Строительство (span 4) -->
      <div class="main-section-skeleton__card" style="grid-column: span 4">
        <div class="main-section-skeleton__card-header">
          <div class="main-section-skeleton__line section-skeleton__line main-section-skeleton__line--small" />
        </div>
        <div class="main-section-skeleton__card-body">
          <div v-for="j in 5" :key="j" class="main-section-skeleton__line section-skeleton__line" />
        </div>
      </div>

      <!-- Земельные участки (span 2) -->
      <div class="main-section-skeleton__card" style="grid-column: span 2">
        <div class="main-section-skeleton__card-header">
          <div class="main-section-skeleton__line section-skeleton__line main-section-skeleton__line--small" />
        </div>
        <div class="main-section-skeleton__card-body">
          <div v-for="j in 3" :key="j" class="main-section-skeleton__line section-skeleton__line" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.main-section-skeleton {
  gap: 40px;

  @media (max-height: 1000px) {
    gap: 24px;
  }

  &__header {
    width: 100%;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 40px;
    flex: 1 1 auto;

    @include desktopHd {
      gap: 24px;
    }

    @media (max-height: 1000px) {
      gap: 24px;
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
    background-color: #262C36;
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

  &__line {
    height: 16px;
    width: 100%;

    &--title {
      height: 32px;
      width: 300px;
      border-radius: 8px;
    }

    &--small {
      height: 20px;
      width: 60%;
      margin: 0 auto;
    }
  }
}
</style>
