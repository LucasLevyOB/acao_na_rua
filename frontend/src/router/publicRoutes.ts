const publicRoutes = [
    {
        path: "/boas-vindas",
        name: "BoasVindas",
        component: import("../pages/BoasVindas.vue"),
    },
    {
        path: '/login',
        name: 'Login',
        component: import("../pages/Login.vue"),
    },
    {
        path: '/cadastrar',
        name: 'Cadastrar',
        component: import("../pages/Cadastrar.vue"),
    },
    {
        path: '/sobre',
        name: 'Sobre',
        component: import("../pages/Sobre.vue"),
    },
    {
        path: '/visitante',
        name: 'Visitante',
        component: import("../pages/Visitante.vue"),
    },
];

export default publicRoutes;