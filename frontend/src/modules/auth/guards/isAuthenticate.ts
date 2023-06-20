import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import AuthService from "../services/AuthService";

const isAuthenticate = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // const authService = new AuthService();

    // console.log("isAuthenticate");

    // const response = await authService.isValidtoken();

    // console.log('isAuthenticate response');

    // console.log(response);

    // if (response.success) {
    //     next();
    // } else {
    //     to.name === "Login" ? next() : next({ name: "Login" });
    // }
    next();
};

export default isAuthenticate;