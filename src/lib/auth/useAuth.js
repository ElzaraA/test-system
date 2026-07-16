import { ref } from "vue";
import { MOCK_PERMISSIONS, MOCK_USER } from "./mockData";

const afterLogin = ref(null);
const afterLogout = ref(null);
const afterRegister = ref(null);

const persistSession = ({ isInfinite = false, hasAgreement = true } = {}) => {
  if (isInfinite) {
    localStorage.setItem("isInfinite", "1");
  } else {
    localStorage.removeItem("isInfinite");
  }

  localStorage.setItem("authenticated", JSON.stringify(true));
  localStorage.setItem("user", JSON.stringify(MOCK_USER));
  localStorage.setItem("permissions", JSON.stringify(MOCK_PERMISSIONS));
  localStorage.setItem("agreement", JSON.stringify(hasAgreement));
};

export const useAuth = () => {
  const logIn = async (login, password) => {
    await delay(300);

    if (!login?.trim() || !password?.trim()) {
      return "Введите e-mail и пароль";
    }

    persistSession({ isInfinite: false, hasAgreement: true });
    afterLogin.value?.();
    return null;
  };

  const register = async () => {
    await delay(300);
    afterRegister.value?.();
    return null;
  };

  const updateAccess = async () => {
    await delay(100);
    localStorage.setItem("permissions", JSON.stringify(MOCK_PERMISSIONS));
    localStorage.setItem("user", JSON.stringify(MOCK_USER));
  };

  const logOut = () => {
    localStorage.setItem("authenticated", JSON.stringify(false));
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");
    localStorage.removeItem("isInfinite");
    localStorage.removeItem("agreement");
    afterLogout.value?.();
  };

  const getUserProfile = () => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  };

  const isInfiniteUser = () => localStorage.getItem("isInfinite") === "1";

  const isAuthenticated = () => JSON.parse(localStorage.getItem("authenticated") ?? "false");

  const canAccessMethod = (methodName) =>
    JSON.parse(localStorage.getItem("permissions") ?? "[]")?.includes(methodName) ?? false;

  const canAccessEditVideoTab = () =>
    (canAccessMethod("createVideo") && canAccessMethod("uploadFileToS3")) ||
    canAccessMethod("archiveVideo");

  const canAccessEditPhotoTab = () =>
    (canAccessMethod("createPhoto") && canAccessMethod("uploadFileToS3")) ||
    canAccessMethod("archivePhoto");

  const canAccessEditDzzTab = () =>
    (canAccessMethod("createOrthophoto") && canAccessMethod("uploadFileToS3")) ||
    canAccessMethod("archiveOrthophoto");

  const canAccessEditOrthophotoTab = () =>
    (canAccessMethod("createOrthophoto") && canAccessMethod("uploadFileToS3")) ||
    canAccessMethod("archiveOrthophoto");

  const canAccessEditCameraTab = () =>
    canAccessMethod("createIpCamera") || canAccessMethod("deleteIpCamera");

  const canAccessAdminTab = () =>
    canAccessEditVideoTab() ||
    canAccessEditPhotoTab() ||
    canAccessEditOrthophotoTab() ||
    canAccessEditDzzTab() ||
    canAccessEditCameraTab();

  const hasAgreement = () => JSON.parse(localStorage.getItem("agreement") ?? "false");

  const applyUserAgreement = async () => {
    await delay(150);
    localStorage.setItem("agreement", JSON.stringify(true));
  };

  return {
    logIn,
    register,
    updateAccess,
    logOut,
    isAuthenticated,
    canAccessMethod,
    canAccessAdminTab,
    canAccessEditVideoTab,
    canAccessEditPhotoTab,
    canAccessEditDzzTab,
    canAccessEditOrthophotoTab,
    canAccessEditCameraTab,
    getUserProfile,
    isInfiniteUser,
    hasAgreement,
    applyUserAgreement,
    afterLogin,
    afterLogout,
    afterRegister,
  };
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
