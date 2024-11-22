import { VueBuilder } from "@banquette/vue-typescript";
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from "vue-router";
import App from './app.vue';
import { Routes } from "./routes";

import './themes';
import './entity';
import './styles/main.css';
import './hooks/before-request.http-hook';
import './model/recipe.entity'

const router = createRouter({
    history: createWebHashHistory(),
    routes: Routes
});

const app = createApp(App);
VueBuilder.ApplyToExistingApp(app);

app.use(router);
app.mount('#app');
