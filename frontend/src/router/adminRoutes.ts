const adminRoutes = [
    {
        path: "/ongs",
        name: "Ongs",
        component: () => import("../pages/Ong.vue"),
    },
    {
        path: "/voluntarios",
        name: "Voluntarios",
        component: () => import("../pages/Voluntario.vue"),
    },
];

export default adminRoutes;