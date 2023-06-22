import { createRouter, createWebHistory } from "vue-router";
import isAuthenticate from "../modules/auth/guards/isAuthenticate";
import publicRoutes from "./publicRoutes";
import privateRoutes from "./privateRoutes";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...publicRoutes,
        ...privateRoutes
    ]
});

router.beforeEach(isAuthenticate);

export default router;