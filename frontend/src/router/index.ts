import { createRouter, createWebHistory } from "vue-router";
import isAuthenticate from "../modules/auth/guards/isAuthenticate";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: import("../pages/Home.vue"),
        },
        {
            path: "/login",
            name: "Login",
            component: () => import("../pages/Login.vue"),
        },
        {
            path: "/pagina-privada",
            name: "PaginaPrivada",
            component: () => import("../pages/PaginaPrivada.vue"),
        },
    ],
});

router.beforeEach(isAuthenticate);

export default router;