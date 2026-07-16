<script setup>
import { RegisterForm } from "@/features/auth"
import { mainTitle } from "@/features/auth/constants/registerFormConstants";
</script>

<template>
  <div class="login-page">
    <aside>
      <h2>{{ mainTitle }}</h2>
      <div />
    </aside>
    <main>
      <div>
        <h1>Регистрация</h1>
        <RegisterForm />
      </div>
    </main>
  </div>
</template>
