const privateRoutes = [
    {
        path: "/",
        name: "Home",
        component: import("../pages/Home.vue"),
    },
    {
        path: "/item-doacao",
        name: "ItemDoacao",
        component: import("../pages/ItemDoacao.vue"),
    },
    {
        path: "/doacao-ong",
        name: "DoacaoONG",
        component: import("../pages/DoacaoONG.vue"),
    },
    {
        path: "/doacao-psr",
        name: "DoacaoPSR",
        component: import("../pages/DoacaoPSR.vue"),
    },
    {
        path: "/pessoa-situacao-rua",
        name: "PessoaSituacaoRua",
        component: import("../pages/PessoaSituacaoRua.vue"),
    },
];

export default privateRoutes;