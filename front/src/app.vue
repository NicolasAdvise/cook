<script lang="ts">
import {Component} from "@banquette/vue-typescript";
import Layout from "./layout/layout.vue";


@Component({
    name: 'app',
    components: [Layout]
})
export default class App {

}
</script>

<template>
    <layout></layout>
</template>
