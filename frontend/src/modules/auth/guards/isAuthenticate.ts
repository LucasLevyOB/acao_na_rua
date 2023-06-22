import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

import AuthService from "../services/AuthService";
import publicRoutes from "../../../router/publicRoutes";

const isAuthenticate = async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authService = new AuthService();

    const response = await authService.isValidtoken();

    if (response.success) {
        next();
    } else {
        publicRoutes.findIndex(route => route.name === to.name as string) !== -1 ? next() : next({ name: "Home" });
    }
    next();
};

export default isAuthenticate;