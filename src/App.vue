<script setup>
import "@/main.pcss";
import {
  useAuth,
  DeviceCheck,
  MessagesList,
  ConfirmModal,
  CameraModal,
  ViewDocumentModal,
  VideoModal,
  PhotoModal,
  AgreementModal,
} from "@/lib";
import { RouterView, useRouter } from "vue-router";
import { onMounted } from "vue";
import Navbar from "./components/navbar/Navbar.vue";
import ToastPrivacyAgreement from "./components/toast-elements/ToastPrivacyAgreement.vue";

const router = useRouter();
const auth = useAuth();

const navbarVisible = () => {
  return !["login", "register"].includes(router.currentRoute.value.name);
};

onMounted(async () => {
  if (auth.isAuthenticated()) {
    await auth.updateAccess();
  }
});
</script>

<template>
  <DeviceCheck />
  <Navbar v-if="navbarVisible()" />
  <MessagesList />
  <ConfirmModal />
  <CameraModal />
  <ViewDocumentModal />
  <VideoModal />
  <PhotoModal />
  <AgreementModal />
  <ToastPrivacyAgreement />

  <div
    class="content-wrapper"
    :class="{ 'content-wrapper_with-navbar': navbarVisible() }"
  >
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
