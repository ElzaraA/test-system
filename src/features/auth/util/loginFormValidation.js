import { emptyInputErrorText, invalidEmailErrorText } from "../constants/loginFormConstants";

export const validateLoginForm = (formState) => {
  let isValid = true;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.value.email.value.trim())) {
    formState.value.email.text = invalidEmailErrorText;
    formState.value.email.state = "error";
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
