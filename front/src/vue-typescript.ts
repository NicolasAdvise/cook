import { Vue as VueBase } from '@banquette/vue-typescript';
import { RouteLocationNormalizedLoaded, Router } from "vue-router";

export class Vue extends VueBase {
    declare $route: RouteLocationNormalizedLoaded;
    declare $router: Router;
}
