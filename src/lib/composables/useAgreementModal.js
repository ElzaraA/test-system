export const useAgreementModal = () => {
  const open = async () => {
    return window.confirm(
      "Демо-режим: принять пользовательское соглашение, политику конфиденциальности и согласие на обработку персональных данных?",
    );
  };

  return { open };
};
