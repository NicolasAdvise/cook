<template>
    <div class="bg-black bg-opacity-30 w-full h-full inset-0 absolute flex flex-col items-center justify-center">
        <div class="bg-admin-150 w-2/3 h-2/3 mx-auto flex flex-col items-center justify-center rounded p-10">
            <h2 class="text-bold text-lg mb-5">{{ meal.name }}</h2>
            <p>{{ meal.description }}</p>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue } from "../vue-typescript";
import { Component, Prop } from "@banquette/vue-typescript";

@Component({
    'name': 'modal',
})
export default class Modal extends Vue {
    @Prop() public meal
}
</script>