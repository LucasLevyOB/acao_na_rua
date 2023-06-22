const privateRoutes = [
    {
        path: "/pagina-privada",
        name: "PaginaPrivada",
        component: () => import("../pages/PaginaPrivada.vue"),
    },
];

export default privateRoutes;