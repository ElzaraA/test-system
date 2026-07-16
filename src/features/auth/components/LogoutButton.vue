<script setup>
import { Icon, useAuth } from "@/lib";

const auth = useAuth();

const handleClick = () => {
  auth.logOut();
}
</script>

<template>
  <button class="logout-button" @click="handleClick">
    <Icon name="log-out" color-name="color-text-secondary-darkmode" />
    <p class="logout-button__label">
      Выход
    </p>
  </button>
</template>
