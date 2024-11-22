<template>
<div>
    <bt-form-text v-model="result" @input="filterRecipies"></bt-form-text>
</div>
</template>
<script lang="ts">
import {Vue} from "../vue-typescript";
import {Expose, Component, Prop} from "@banquette/vue-typescript";

@Component({
    name: "search-bar"
})
export public class SearchBar extends Vue{
    @Prop() meals;

    @Expose() public result
    @Expose() filterRecipies(event: Event) {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        if (value > 3) {

        }
    }
}
</script>