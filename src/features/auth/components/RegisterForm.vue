<script setup lang="ts">
import { Button, Checkbox, Input, useAuth, useViewDocumentModal } from "@/lib";
import { RouterLink, useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { defaultFormState } from "../constants/registerFormConstants";
import { validateRegisterForm } from "../util/registerFormValidation";
import { AGREEMENTS } from "../constants/agreementConstants";

const auth = useAuth();
const route = useRoute();

const formState = ref(defaultFormState);
const errorText = ref(null);
const buttonDisabled = ref(false);

const isAgreementAccepted = ref(false);
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

const handleInput = () => {
  errorText.value = null;

  Object.values(formState.value).forEach((input) => {
    input.state = "default";
    input.text = null;
  });
};

const handleClick = async () => {
  errorText.value = null;
  if (!isAgreementAccepted.value) return;
  buttonDisabled.value = true;
  handleInput();
  await tryRegister();
  buttonDisabled.value = false;
};

const tryRegister = async () => {
  if (!validateRegisterForm(formState)) return;
  const error = await auth.register({
    promo: formState.value.promo.value,
    name: formState.value.name.value,
    surname: formState.value.surname.value,
    patronymic: formState.value.patronymic.value,
    organization: formState.value.organization.value,
    email: formState.value.email.value,
    password: formState.value.password.value,
  });

  if (error) errorText.value = error;
};

onMounted(() => {
  formState.value.promo.value = route.params.promocode as string;
});
</script>

<template>
  <div class="register-form">
    <div class="register-form__inputs-wrapper">
      <Input
        v-model="formState.promo.value"
        type="text"
        label="Промокод"
        placeholder="Введите промокод"
        required
        :state="formState.promo.state"
        :helper-text="formState.promo.text"
        @input="handleInput"
      />
      <Input
        v-model="formState.surname.value"
        type="text"
        label="Фамилия"
        placeholder="Введите фамилию"
        required
        :state="formState.surname.state"
        :helper-text="formState.surname.text"
        @input="handleInput"
      />
      <div class="register-form__inputs-row">
        <Input
          v-model="formState.name.value"
          type="text"
          label="Имя"
          placeholder="Введите имя"
          required
          :state="formState.name.state"
          :helper-text="formState.name.text"
          @input="handleInput"
        />
        <Input
          v-model="formState.patronymic.value"
          type="text"
          label="Отчество"
          placeholder="Введите отчество"
          :state="formState.patronymic.state"
          :helper-text="formState.patronymic.text"
          @input="handleInput"
        />
      </div>      
      <Input
        v-model="formState.organization.value"
        type="text"
        label="Организация"
        placeholder="Введите организацию"
        :state="formState.organization.state"
        :helper-text="formState.organization.text"
        @input="handleInput"
      />
      <Input
        v-model="formState.email.value"
        type="text"
        label="E-mail"
        placeholder="Введите e-mail"
        required
        :state="formState.email.state"
        :helper-text="formState.email.text"
        @input="handleInput"
      />
      <div class="register-form__inputs-row">
        <Input
          v-model="formState.password.value"
          type="password"
          label="Пароль"
          placeholder="Введите пароль"
          required
          :state="formState.password.state"
          :helper-text="formState.password.text"
          @input="handleInput"
        />
        <Input
          v-model="formState.passwordAgain.value"
          type="password"
          label="Пароль"
          placeholder="Повторите пароль"
          required
          :state="formState.passwordAgain.state"
          :helper-text="formState.passwordAgain.text"
          @input="handleInput"
        />
      </div>
      <p v-if="errorText">
        {{ errorText }}
      </p>
    </div>
    <div class="register-form__button-wrapper">
      <div class="register-form__agreement">
        <Checkbox v-model="isAgreementAccepted" />
        <div class="register-form__agreement-text">
          Согласен с условиями
          <a href="#" class="register-form__agreement-link" @click.prevent="openUserAgreement">Пользовательского соглашения</a>, 
          <a href="#" class="register-form__agreement-link" @click.prevent="openPrivacyPolicy">Политикой конфиденциальности</a>
          и <a href="#" class="register-form__agreement-link" @click.prevent="openPersonalDataProcessing">Согласием на обработку персональных данных</a>
        </div>
      </div>
      <Button tyle="primary" size="l" :disabled="buttonDisabled || !isAgreementAccepted" @click="handleClick">
        Зарегистрироваться
      </Button>
      <p>
        Уже есть аккаунт? <RouterLink class="register-form__login-link" to="/login">
          Войдите
        </RouterLink>.
      </p>
    </div>
  </div>
</template>
