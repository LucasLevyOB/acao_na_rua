const privateRoutes = [
    {
        path: "/",
        name: "Home",
        component: import("../pages/Home.vue"),
    },
    {
        path: "/pagina-privada",
        name: "PaginaPrivada",
        component: () => import("../pages/PaginaPrivada.vue"),
    },
];

export default privateRoutes;