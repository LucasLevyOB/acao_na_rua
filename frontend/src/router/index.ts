import { createRouter, createWebHistory } from "vue-router";
import isAuthenticate from "../modules/auth/guards/isAuthenticate";
import isAdmin from "../modules/auth/guards/isAdmin";
import publicRoutes from "./publicRoutes";
import privateRoutes from "./privateRoutes";
import adminRoutes from "./adminRoutes";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...publicRoutes,
        ...privateRoutes,
        ...adminRoutes,
    ]
});

router.beforeEach(isAuthenticate);
router.beforeEach(isAdmin);

export default router;