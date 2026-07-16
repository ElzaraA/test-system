import { emptyInputErrorText, invalidEmailErrorText, passwordErrorText } from "../constants/registerFormConstants";

export const validateRegisterForm = (formState) => {
  let isValid = true;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.value.email.value.trim())) {
    formState.value.email.text = invalidEmailErrorText;
    formState.value.email.state = "error";
    isValid = false;
  }

  if (formState.value.password.value.trim() != formState.value.passwordAgain.value.trim()) {
    formState.value.password.text = passwordErrorText;
    formState.value.password.state = "error";
    formState.value.passwordAgain.text = passwordErrorText;
    formState.value.passwordAgain.state = "error";
    isValid = false;
  }

  if (!formState.value.promo.value.trim()) {
    formState.value.promo.text = emptyInputErrorText;
    formState.value.promo.state = "error";
    isValid = false;
  }

  if (!formState.value.name.value.trim()) {
    formState.value.name.text = emptyInputErrorText;
    formState.value.name.state = "error";
    isValid = false;
  }

  if (!formState.value.surname.value.trim()) {
    formState.value.surname.text = emptyInputErrorText;
    formState.value.surname.state = "error";
    isValid = false;
  }

  if (!formState.value.email.value.trim()) {
    formState.value.email.text = emptyInputErrorText;
    formState.value.email.state = "error";
    isValid = false;
  }

  if (!formState.value.password.value.trim()) {
    formState.value.password.text = emptyInputErrorText;
    formState.value.password.state = "error";
    isValid = false;
  }

  return isValid;
};
