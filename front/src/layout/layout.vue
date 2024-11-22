<script lang="ts">
import {Component, Expose} from "@banquette/vue-typescript";
import Sidebar from "./sidebar.vue";
import Dialogs from "./dialogs.vue";
@Component({
    name: 'layout',
    components: [Sidebar, Dialogs]
})
export default class Layout {
    @Expose() public currentContext: string = 'admin';
}
</script>

<template>
    <div class="font-sans text-gray-900 antialiased">
        <div class="min-h-screen flex bg-gray-200">
            <sidebar></sidebar>
            <div class="flex-grow flex flex-col min-w-0">
                <router-view></router-view>
            </div>
        </div>
    </div>
    <dialogs></dialogs>
</template>
