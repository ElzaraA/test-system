<script setup>
import { computed, ref } from 'vue';
import {
  ToastConfirm,
  useAuth,
  useViewDocumentModal,
} from '@/lib';
import {
  AGREEMENTS,
  AGREEMENT_KEY,
  INFINITE_AGREEMENT,
} from '../../features/auth/constants/agreementConstants';

const auth = useAuth();
const showConfirm = ref(false);
const viewDocumentModals = useViewDocumentModal();

const showAgreementToast = computed(() => {
  if (!auth.isAuthenticated()) return false;
  return auth.isInfiniteUser() && !auth.hasAgreement() && !showConfirm.value;
});

/**
 * Открыть модалку с просмотром документа
 * @param {string} docId - ID открытого документа
 */
function showAgreement(docId) {
  viewDocumentModals.open(docId);
}

/**
 * Получить согласие с политикой приватности от "бесконечного" пользователя
 * По итогам проверки изменить соответствующие значения в localStorage
 */
async function handleInfiniteAgreement() {
  try {
    await auth.applyUserAgreement();
    localStorage.setItem(AGREEMENT_KEY, 'true');
    showConfirm.value = true;
  } catch (error) {
    localStorage.removeItem(AGREEMENT_KEY);
    showConfirm.value = false;
    if (import.meta.env.MODE === 'development') {
      console.error('Failed to apply user agreement:', error);
    }
  }
}
</script>
<template>
  <ToastConfirm
    v-if="showAgreementToast"
    v-bind="INFINITE_AGREEMENT"
    @confirm="handleInfiniteAgreement"
  >
    <span>
      Используя Систему, вы принимаете <a href="#" class="register-form__agreement-link" @click.prevent="showAgreement(AGREEMENTS.USER)">Пользовательское соглашение</a>, <a href="#" class="register-form__agreement-link" @click.prevent="showAgreement(AGREEMENTS.CONFIDENCE)">Политику конфиденциальности</a> и даёте <a href="#" class="register-form__agreement-link" @click.prevent="showAgreement(AGREEMENTS.PRIVACY)">Согласие на обработку персональных данных</a>.
    </span>
  </ToastConfirm>
</template>
