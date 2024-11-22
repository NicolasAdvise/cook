<template>
        <bt-form model="Recipe" persist-endpoint="post_recipes" v-slot="{v, model, submit}">
            <bt-form-text control="title">Titre</bt-form-text>
            <bt-form-text control="description">Description</bt-form-text>
            <bt-form-text control="preparationTime">Temps de préparation</bt-form-text>
            <bt-form-text control="ingredients">Ingrédients</bt-form-text>
            <bt-form-array control="steps">Etapes
                <bt-form-text></bt-form-text>
            </bt-form-array>

            <!--<bt-form-text control="steps">Etapes</bt-form-text>


            <div class="flex items-center justify-between pb-2">
                <span class="font-bold">Ingrédients:</span>
                <bt-button @click.prevent="addTag(model, 'ingredients')" variant="xs success"><i-material-add crop height=".8em"></i-material-add></bt-button>
            </div>
            <hr class="mt-0"/>
        <div v-for="(ingredient, index) in model.ingredients" class="flex gap-4 items-center" v-if="model.ingredients.length">
            <bt-form-text :control="'ingredients/'+index+'/name'" :key="ingredient.id">Nom</bt-form-text>
            <bt-button variant="link danger" @click.prevent="removeTag(model, index, 'ingredients')">
                <i-material-delete crop></i-material-delete>
            </bt-button>
        </div>
            <div v-else class="text-center italic">Pas d'ingrédients encore.</div>
        <div class="flex items-center justify-between pb-2">
            <span class="font-bold">Etapes:</span>
            <bt-button @click.prevent="addTag(model, 'steps')" variant="xs success"><i-material-add crop height=".8em"></i-material-add></bt-button>
        </div>
        <hr class="mt-0"/>
        <div v-for="(step, index) in model.steps" class="flex gap-4 items-center" v-if="model.steps.length">
            <bt-form-text :control="'steps/'+index+'/description'" :key="step.id">Etape</bt-form-text>
            <bt-button variant="link danger" @click.prevent="removeTag(model, index, 'steps')">
                <i-material-delete crop></i-material-delete>
            </bt-button>
        </div>
        <div v-else class="text-center italic">Pas d'étapes encore.</div>
            <bt-form-text control="steps">Etapes</bt-form-text>-->
            <bt-button @click="submit()">Sauvegarder</bt-button>
        </bt-form>
</template>
<script lang="ts">
import {Vue} from "../vue-typescript";
import {Component, Expose} from "@banquette/vue-typescript";
import {FormControl, FormObject} from "@banquette/model-form";
import {BtFormText} from "@banquette/vue-ui";
import {Recipe} from "../model/recipe.entity";
import { ApiEndpointStorageService, ApiEndpoint } from "@banquette/api";
import { Injector } from "@banquette/dependency-injection";
import { HttpMethod } from "@banquette/http";
import { ApiService, ApiRequest } from "@banquette/api";


@Component({
    name: 'recipe-form',
    components: [
        FormObject, FormControl, BtFormText
    ]
})
export default class RecipeForm extends Vue{

    @Expose() public result!: Recipe;

    @Expose() public addTag(model: Recipe, element: string): void {
        model.element.push(new Tag());
    }

    @Expose() public removeTag(model: Recipe, index: number, element:string): void {
        if (model.element.length > index) {
            model.element.splice(index, 1);
        }
    }
}
</script>