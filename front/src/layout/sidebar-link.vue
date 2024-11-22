<script lang="ts">
import {Component, Computed, Expose, Prop} from "@banquette/vue-typescript";
import Link from "../components/link.component.vue";
import {Vue} from "../vue-typescript";
import {SidebarItemInterface} from "./sidebar-item.interface";
import {ensureString, isArray} from "@banquette/utils-type";
import {RouteLocationNormalized} from "vue-router";

@Component({
    name: 'sidebar-link',
    components: [Link]
})
export default class SidebarLink extends Vue {
    @Prop({type: Object, required: true}) public item!: SidebarItemInterface;
    @Prop({type: Boolean, default: false}) public root!: boolean;

    @Computed() public get route(): string|undefined {
        return 'route' in this.item ? this.item.route : undefined;
    }

    @Computed() public get url(): string|undefined {
        return 'url' in this.item ? this.item.url : undefined;
    }

    @Computed() public get hasChildren(): boolean {
        return 'children' in this.item && isArray(this.item.children) && this.item.children.length > 0;
    }

    @Expose() public currentRoute!: string;

    public beforeMount() {
        this.currentRoute = ensureString(this.$router.currentRoute.value.name);
        this.$router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
            this.currentRoute = ensureString(to.name);
            document.title = to.meta.title as string;
            next();
        });
    }
}
</script>

<template>
    <bt-link :route="route" :href="url" :current="currentRoute === route" v-if="route || url" class="w-full block py-1 -ml-3 rounded block" :class="`hover:bg-primary-650`">
        <span class="pl-3">{{ item.title }}</span>
    </bt-link>
    <span class="py-1 block" v-else>{{ item.title }}</span>
    <span class="hidden hover:bg-primary-700 hover:bg-ireseau-700 hover:bg-portal-700 hover:bg-sso-700"></span>
</template>
