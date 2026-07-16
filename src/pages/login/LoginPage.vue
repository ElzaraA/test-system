<script setup>
import { LoginForm } from "@/features/auth"
import { useViewDocumentModal } from "@/lib";
import { AGREEMENTS } from "@/features/auth/constants/agreementConstants";
import { mainTitle } from "@/features/auth/constants/registerFormConstants";

const viewDocumentModal = useViewDocumentModal();

const openUserAgreement = () => {
  viewDocumentModal.open(AGREEMENTS.USER);
};

const openPrivacyPolicy = () => {
  viewDocumentModal.open(AGREEMENTS.CONFIDENCE);
};

const openPersonalDataProcessing = () => {
  viewDocumentModal.open(AGREEMENTS.PRIVACY);
};
</script>

<template>
  <div class="login-page">
    <aside>
      <h2>{{ mainTitle }}</h2>
      <div />
    </aside>
    <main>
      <div>
        <h1>Авторизация</h1>
        <LoginForm />
      </div>
      <div class="login-page__agreement">
        <a href="#" class="login-page__agreement-link" @click.prevent="openUserAgreement">Пользовательское соглашение</a>
        <a href="#" class="login-page__agreement-link" @click.prevent="openPrivacyPolicy">Политика конфиденциальности</a>
        <a href="#" class="login-page__agreement-link" @click.prevent="openPersonalDataProcessing">Согласие на обработку персональных данных</a>
      </div>
    </main>
  </div>
</template>
