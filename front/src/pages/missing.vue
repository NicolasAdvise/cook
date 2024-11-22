<script lang="ts">
import { Component, VueBuilder } from "@banquette/vue-typescript";
import { Routes } from "../routes";
import { SidebarItems } from "../layout/sidebar-items";
import { isArray } from "@banquette/utils-type";
import { SidebarItemInterface } from "../layout/sidebar-item.interface";

@Component({
    name: 'missing-page'
})
export default class MissingPage extends VueBuilder {

    public constructor() {
        super();
    }

    public beforeMount(): void {
        for (const candidate of Routes) {
            const route = this.getFirstAvailableRoute(SidebarItems);
            if (route !== null) {
                (this as any).$router.replace({name: route});
                return ;
            }
        }
    }

    private getFirstAvailableRoute(candidates: SidebarItemInterface[]): string|null
    {
        for (const candidate of candidates) {
            if ('route' in candidate) {
                const isAllowed = !('roles' in candidate);
                if (isAllowed) {
                    return candidate.route;
                }
                continue ;
            }
            if (isArray(candidate.children)) {
                const route = this.getFirstAvailableRoute(candidate.children);
                if (route) {
                    return route;
                }
            }
        }
        return null;
    }
}
</script>

<template>
    <div class="flex-grow flex flex-col">
        <div class="flex-grow">
            <div class="px-12 py-8 mx-auto max-w-4xl">
                <div>
                    <div class="flex items-baseline justify-between">
                        <div>
                            <h2 class="text-4xl font-bold">Erreur 404 - Page non trouvée</h2>
                        </div>
                    </div>
                </div>
                <div class="mt-4">
                    <p>
                        Cela peut se produire si il y a une erreur dans l'url de la page ou si aucune page n'est disponible dans le contexte d'application courant.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
