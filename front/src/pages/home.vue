<template>
    <recipe-list ref="list"/>
    <div class="mb-8">
        <recipe-form @reload-recipe="triggerGetMeals"/>
    </div>
</template>


<script lang="ts">
import {Component, Expose} from "@banquette/vue-typescript";
import RecipeList from "../components/RecipeList.vue";
import RecipeForm from "../components/RecipeForm.vue";
@Component({
    name: 'home-page',
    components: {RecipeList, RecipeForm}
})
export default class HomePage {

    @Expose() public initializeSearchBar() {

    }

    @Expose() public async triggerGetMeals() {
        const child = this.$refs.list as RecipeList;
        console.log(child);
        await child.getMeals();
    }
}
</script>

