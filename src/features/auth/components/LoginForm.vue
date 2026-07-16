<script setup>
import { Input, Button, useAuth } from "@/lib";
import { ref } from "vue";
import { defaultFormState } from "../constants/loginFormConstants";
import { validateLoginForm } from "../util/loginFormValidation";

const auth = useAuth();

const formState = ref(defaultFormState);
const errorText = ref(null);
const buttonDisabled = ref(false);

const handleInput = () => {
  errorText.value = null;

  Object.values(formState.value).forEach((input) => {
    input.state = "default";
    input.text = null;
  });
};

const handleClick = async (event) => {
  event?.preventDefault();
  errorText.value = null;
  buttonDisabled.value = true;
  handleInput();
  await tryLogin();
  buttonDisabled.value = false;
};

const tryLogin = async () => {
  if (!validateLoginForm(formState)) {
    buttonDisabled.value = false;
    return;
  }
  
  const error = await auth.logIn(formState.value.email.value, formState.value.password.value);
  if (error) errorText.value = error;
};
</script>

<template>
  <form class="login-form" @submit.prevent="handleClick">
    <div class="login-form__inputs-wrapper">
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
      <p v-if="errorText">
        {{ errorText }}
      </p>
    </div>
    <div class="login-form__button-wrapper">
      <Button type="primary" size="l" :disabled="buttonDisabled" @click="handleClick">
        Войти
      </Button>
      <p>Не можете войти? Обратитесь к администраторам системы.</p>
    </div>
  </form>
</template>
