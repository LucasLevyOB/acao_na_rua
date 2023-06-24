const publicRoutes = [
    {
        path: "/",
        name: "Home",
        component: import("../pages/Home.vue"),
    },
    {
        path: '/login',
        name: 'Login',
        component: import("../pages/Login.vue"),
    }
];

export default publicRoutes;