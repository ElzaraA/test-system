import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/lib";
import LoginPage from "@/pages/login/LoginPage.vue";
import RegisterPage from "@/pages/register/RegisterPage.vue";
import DashboardsPage from "@/features/dashboards/pages/DashboardsPage.vue";
import MainSection from "@/features/dashboards/components/main/MainSection.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: { public: true },
  },
  {
    path: "/register/:promocode",
    name: "register",
    component: RegisterPage,
    meta: { public: true },
  },
  {
    path: "/",
    redirect: { name: "dashboards-status" },
    meta: { public: false },
  },
  {
    path: "/dashboards",
    component: DashboardsPage,
    redirect: { name: "dashboards-status" },
    meta: { public: false },
    children: [
      {
        path: "status",
        name: "dashboards-status",
        component: MainSection,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const auth = useAuth();

  if (
    to.name === "dashboards-status" &&
    auth.isAuthenticated() &&
    !auth.hasAgreement() &&
    !auth.isInfiniteUser()
  ) {
    return { name: "login" };
  }

  if (to.name === "login" && auth.isAuthenticated()) {
    if (!auth.hasAgreement() && !auth.isInfiniteUser()) {
      return;
    }
    return { name: "dashboards-status" };
  }

  if (to.name === "register" && auth.isAuthenticated()) {
    return { name: "dashboards-status" };
  }

  if (!to.meta.public && !auth.isAuthenticated()) {
    return { name: "login" };
  }
});

export { router };
