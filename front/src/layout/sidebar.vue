<script lang="ts">
import {Injector} from "@banquette/dependency-injection";
import {ensureString, isArray, isUndefined} from "@banquette/utils-type";
import {IMaterialLogout, IMaterialSettings} from "@banquette/vue-material-icons";
import { Component, Computed, Expose } from "@banquette/vue-typescript";
import {BtProgressCircular} from "@banquette/vue-ui";
import {RouteLocationNormalized} from "vue-router";
import Link from "../components/link.component.vue";
import {Vue} from "../vue-typescript";
import {SidebarItemInterface} from "./sidebar-item.interface";
import {SidebarItems} from "./sidebar-items";
import SidebarItem from "./sidebar-item.vue";

@Component({
    name: 'sidebar',
    components: [Link, SidebarItem, BtProgressCircular, IMaterialLogout, IMaterialSettings]
})
export default class Sidebar extends Vue {
    @Expose() public items: SidebarItemInterface[]|null = null;
    @Expose() public currentRoute!: string;

    public beforeMount() {
        this.currentRoute = ensureString(this.$router.currentRoute.value.name);
        this.$router.beforeEach((route: RouteLocationNormalized) => {
            this.currentRoute = ensureString(route.name);
        });
        this.items = this.filterItems(SidebarItems);
    }

    private filterItems(candidates: SidebarItemInterface[]): SidebarItemInterface[] {
        const items: SidebarItemInterface[] = [];
        for (const candidate of candidates) {
            let newItem: SidebarItemInterface;
            if ('route' in candidate) {
                newItem = {
                    title: candidate.title,
                    route: candidate.route,
                    children: []
                };
            } else if ('url' in candidate) {
                newItem = {
                    title: candidate.title,
                    url: candidate.url,
                    children: []
                };
            } else {
                newItem = {
                    title: candidate.title,
                    children: []
                };
            }
            if (isArray(candidate.children)) {
                const children = this.filterItems(candidate.children);
                if (children.length > 0) {
                    newItem.children = children;
                }
            }
            const isAllowed = !('roles' in candidate);
            const isNotEmpty = 'route' in newItem || 'url' in newItem || newItem.children?.length;
            if (isAllowed && isNotEmpty) {
                items.push(newItem);
            }
        }
        return items;
    }
}
</script>

<template>
    <div class="flex flex-col justify-between flex-shrink-0 w-64 min-h-screen" :class="`bg-primary-500`">
        <div class="flex flex-col justify-between fixed top-0 min-h-screen w-64" v-if="items !== null">
            <div>
                <div class="flex items-center justify-between h-[80px] px-4 text-xl text-white font-medium" :class="`bg-primary-650`">
                    <a href="#" class="ml-2 font-bold">Sandbox</a>
                </div>
                <div class="px-6 py-6 text-white" v-for="item in items" v-if="items.length > 0">
                    <sidebar-item :item="item" root></sidebar-item>
                </div>
                <div class="px-6 py-6 text-white" v-else>
                    Aucun module disponible pour cette application.
                </div>
            </div>
            <div class="flex items-center justify-between px-6 py-6 text-white">

            </div>
        </div>
        <div class="flex justify-center p-8" v-else>
            <bt-progress-circular></bt-progress-circular>
        </div>
    </div>

    <!-- So the JIT compiler includes those classes -->
    <span class="hidden bg-admin-50 bg-admin-100 bg-admin-150 bg-admin-200 bg-admin-250 bg-admin-300 bg-admin-350 bg-admin-400 bg-admin-450 bg-admin-500 bg-admin-550 bg-admin-600 bg-admin-650 bg-admin-700 bg-admin-750 bg-admin-800 bg-admin-850 bg-admin-900 bg-ireseau-50 bg-ireseau-100 bg-ireseau-150 bg-ireseau-200 bg-ireseau-250 bg-ireseau-300 bg-ireseau-350 bg-ireseau-400 bg-ireseau-450 bg-ireseau-500 bg-ireseau-550 bg-ireseau-600 bg-ireseau-650 bg-ireseau-700 bg-ireseau-750 bg-ireseau-800 bg-ireseau-850 bg-ireseau-900 bg-portal-50 bg-portal-100 bg-portal-150 bg-portal-200 bg-portal-250 bg-portal-300 bg-portal-350 bg-portal-400 bg-portal-450 bg-portal-500 bg-portal-550 bg-portal-600 bg-portal-650 bg-portal-700 bg-portal-750 bg-portal-800 bg-portal-850 bg-portal-900 bg-sso-50 bg-sso-100 bg-sso-150 bg-sso-200 bg-sso-250 bg-sso-300 bg-sso-350 bg-sso-400 bg-sso-450 bg-sso-500 bg-sso-550 bg-sso-600 bg-sso-650 bg-sso-700 bg-sso-750 bg-sso-800 bg-sso-850 bg-sso-900"></span>
</template>
