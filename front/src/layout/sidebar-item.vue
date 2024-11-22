<script lang="ts">
import {Component, Computed, Expose, Prop} from "@banquette/vue-typescript";
import Link from "../components/link.component.vue";
import {Vue} from "../vue-typescript";
import {SidebarItemInterface} from "./sidebar-item.interface";
import SidebarLink from "./sidebar-link.vue";
import {isArray} from "@banquette/utils-type";
import {IMaterialArrowDropDown, IMaterialArrowRight} from "@banquette/vue-material-icons";

@Component({
    name: 'sidebar-item',
    components: [Link, SidebarLink, IMaterialArrowDropDown, IMaterialArrowRight]
})
export default class SidebarItem extends Vue {
    @Prop({type: Object, required: true}) public item!: SidebarItemInterface;
    @Prop({type: Boolean, default: false}) public root!: boolean;

    @Computed() public get children(): SidebarItemInterface[] {
        return 'children' in this.item && isArray(this.item.children) ? this.item.children : [];
    }

    @Expose() public opened: boolean = false;

    public beforeMount(): void {
        this.opened = this.root;
    }

    @Expose() public toggle(): void {
        this.opened = !this.opened;
    }
}
</script>

<template>
    <h4 class="text-sm text-white uppercase font-bold tracking-widest mb-3" v-if="root">
        <sidebar-link :item="item"></sidebar-link>
    </h4>
    <div class="flex items-center justify-between cursor-pointer" @click="toggle()" v-else>
        <sidebar-link :item="item"></sidebar-link>
        <a href="" v-if="children.length > 0">
            <i-material-arrow-drop-down width="0.8rem" crop v-if="opened"></i-material-arrow-drop-down>
            <i-material-arrow-right height="0.8rem" crop v-else></i-material-arrow-right>
        </a>
    </div>
    <ul :class="!root ? 'pl-6' : ''" v-if="children.length > 0 && opened">
        <li v-for="child in children">
            <sidebar-item :item="child"></sidebar-item>
        </li>
    </ul>
</template>
