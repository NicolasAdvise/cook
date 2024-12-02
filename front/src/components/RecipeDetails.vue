<template>
    <div>
        <h2 class="text-bold text-xl mb-5">{{ meal.title }}</h2>
        <p class="mb-5">{{ meal.description }}</p>
        <span class="text-bold text-xl mb-5">Ingrédients</span>
        <ul class="mb-5">
            <li v-for="(ingredient, index) in meal.ingredients">
                {{ ingredient}}
            </li>
        </ul>
        <span class="text-bold text-xl mb-5">Etapes</span>
        <ul class="mb-5">
            <li v-for="(step, index) in meal.steps">
                {{ step }}
            </li>
        </ul>
    </div>

</template>
<script lang="ts">
import vue from "@vitejs/plugin-vue";
import {Vue} from "../vue-typescript";
import {Recipe} from "../entity/recipe.entity";
import {Component, Expose, Lifecycle, Prop} from "@banquette/vue-typescript";
import {ref} from "vue";

@Component({
    'name': 'recipe-details',
    components: {},
})
export default class RecipeDetails extends Vue {
    @Prop() public meal!: Recipe;
    }
</script>