import { VueBuilder } from "@banquette/vue-typescript";
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from "vue-router";
import App from './app.vue';
import { Routes } from "./routes";

import './themes';
import './entity';
import './styles/main.css';
import './hooks/before-request.http-hook';
import './entity/recipe.entity'
import {useDialogGlobals} from "@banquette/vue-ui";
import {useAlertGlobals} from "@banquette/vue-ui";

useDialogGlobals();
useAlertGlobals();

const router = createRouter({
    history: createWebHashHistory(),
    routes: Routes
});

const app = createApp(App);
VueBuilder.ApplyToExistingApp(app);

app.use(router);
app.mount('#app');
