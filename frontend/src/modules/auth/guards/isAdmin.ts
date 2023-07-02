import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

import adminRoutes from "../../../router/adminRoutes";
import { useAuthStore } from "../stores/authStore";

const isAdmin = async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore();

    if (authStore.isAdmin) {
        next();
    } else {
        adminRoutes.findIndex(route => route.name !== to.name as string) !== -1 ? next() : next({ name: "Home" });
    }
    next();
};

export default isAdmin;