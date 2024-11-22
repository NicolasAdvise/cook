import { RouteRecordRaw } from "vue-router";
import HomePage from "./pages/home.vue";
import MissingPage from "./pages/missing.vue";

export let Routes: RouteRecordRaw[] = [
    { name: 'home', path: '/', component: HomePage, meta: {title: 'Paramètres'} },
];

Routes.push({ name: 'error404', path: '/:pathMatch(.*)*', component: MissingPage, meta: {title: 'Erreur 404'} });
