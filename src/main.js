import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuth, useAgreementModal } from "@/lib";
import { AGREEMENT_KEY, AGREEMENTS } from "./features/auth/constants/agreementConstants";

import App from "./App.vue";
import { router } from "@/router";

const auth = useAuth();
const agreementModal = useAgreementModal();

async function setAgreement(isAgreementAccepted) {
  try {
    await auth.applyUserAgreement();
    localStorage.setItem(AGREEMENT_KEY, isAgreementAccepted);
  } catch {
    localStorage.setItem(AGREEMENT_KEY, false);
  }
}

async function handleBasicAgreements() {
  let isAgreementAccepted;

  if (!auth.hasAgreement()) {
    isAgreementAccepted = await agreementModal.open(
      AGREEMENTS.USER,
      AGREEMENTS.CONFIDENCE,
      AGREEMENTS.PRIVACY,
    );
  }

  if (isAgreementAccepted) await setAgreement(isAgreementAccepted);

  if (auth.hasAgreement() || isAgreementAccepted) {
    router.push({ name: "dashboards-status" });
  }
}

auth.afterLogin.value = () => {
  auth.isInfiniteUser()
    ? router.push({ name: "dashboards-status" })
    : handleBasicAgreements();
};

auth.afterRegister.value = () => {
  router.push({ name: "login" });
};

auth.afterLogout.value = () => {
  location.replace(location.origin + "/login");
};

const pinia = createPinia();
createApp(App).use(router).use(pinia).mount("#app");
