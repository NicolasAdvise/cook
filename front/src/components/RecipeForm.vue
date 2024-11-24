<template>
        <bt-form model="Recipe" persist-endpoint="post_recipes" v-slot="{v, model, submit}">
            <bt-form-hidden control="ref" :value="generateRef()"></bt-form-hidden>
            <bt-form-text control="title">Titre</bt-form-text>
            <bt-form-text control="description">Description</bt-form-text>
            <bt-form-text control="preparationTime">Temps de préparation</bt-form-text>
            <div>
                <div>
                    <span>Ingrédients</span>
                    <bt-button @click.prevent="addIngredient(model)">+</bt-button>
                </div>
            </div>
            <div v-for="(ingredient, index) in model.ingredients" :key="index" v-if="model.ingredients">
                <bt-form-text :control="'ingredients/'+index">Ingrédient</bt-form-text>
                <bt-button @click.prevent="removeIngredient(model, index)">Supprimer</bt-button>
            </div>
            <div v-else>Pas encore d'ingrédients</div>
            <div>
                <div>
                    <span> Etapes</span>
                    <bt-button @click.prevent="addStep(model)">+</bt-button>
                </div>
            </div>
            <div v-for="(step, index) in model.steps" :key="index" v-if="model.steps">
                <bt-form-text :control="'steps/'+index">Etape</bt-form-text>
                <bt-button @click.prevent="removeStep(model, index)">Supprimer</bt-button>
            </div>
            <div v-else>Pas encore d'étapes</div>
            <bt-button @click="submit()">Sauvegarder</bt-button>
        </bt-form>
</template>
<script lang="ts">
import {Vue} from "../vue-typescript";
import {Component, Expose} from "@banquette/vue-typescript";
import {FormControl, FormObject} from "@banquette/model-form";
import {BtFormText} from "@banquette/vue-ui";
import {Recipe} from "../model/recipe.entity";


@Component({
    name: 'recipe-form',
    components: [
        FormObject, FormControl, BtFormText
    ]
})
export default class RecipeForm extends Vue{

    @Expose() public result!: Recipe;

    //Fonction add et remove à dynamiser pour les rendre unvierselles
    @Expose() public addStep(model: Recipe): void {
        if (!model.steps){
            model.steps = []
        }
        model.steps.push('');
    }

    @Expose() public removeStep(model: Recipe, index: number): void {
        if (model.steps.length > index) {
            model.steps.splice(index, 1);
        }
    }

    @Expose() public addIngredient(model: Recipe): void {
        if (!model.ingredients){
            model.ingredients = []
        }
        model.ingredients.push('');
    }

    @Expose() public removeIngredient(model: Recipe, index: number): void {
        if (model.ingredients.length > index) {
            model.ingredients.splice(index, 1);
        }
    }

    @Expose() public generateRef(): string {
        const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = '';
        for (let i = 0; i < 6; i++ ){
            result+= char.charAt(Math.floor(Math.random() * char.length));
        }
        console.log(result)
        return result
    }
}
</script>