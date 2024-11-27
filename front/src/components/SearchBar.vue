<template>
<div class="my-2">
    <bt-form-text :control="controlBar" clearable @input="emitFilter" @keyup.delete="updateFilter">Rechercher</bt-form-text>

</div>
</template>
<script lang="ts">
import { Vue } from "../vue-typescript";
import {Component, Expose, Prop} from "@banquette/vue-typescript";
import {FormControl} from "@banquette/form";

@Component({
    name: "search-bar",
    components: {FormControl}
})
export default class SearchBar extends Vue {

    @Expose() public controlBar = new FormControl()
    @Expose() emitFilter() {
        console.log('fonction emitFilter')
        if (this.controlBar.value.length > 3) {
            console.log('+3')
            this.$emit('filter', this.controlBar.value);
        }
    }

    @Expose() updateFilter() {
        console.log('fonction updateFilter')
        this.$emit('filter', this.controlBar.value);
    }
}
</script>