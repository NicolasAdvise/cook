<template>
    <div class="w-2/3 mx-auto flex flex-col ">
        <h3 v-if="edit">Modifier une recette</h3>
        <h3 v-else>Ajouter une recette</h3>
        <bt-form model="Recipe" :persist-method="edit ? 'PUT' : 'POST'" :persist-endpoint="persistEndpoint()" v-model="currentMeal" v-slot="{v, model, submit}" @persist-success="handleSave()">
            <bt-form-hidden control="ref" :value="generateRef()"></bt-form-hidden>
            <bt-form-text control="title">Titre</bt-form-text>
            <bt-form-text control="description">Description</bt-form-text>
            <bt-form-text control="preparationTime">Temps de préparation</bt-form-text>
            <div>
                <div class="flex flex-row gap-4 items-center justify-center">
                    <span>Ingrédients</span>
                    <bt-button @click.prevent="addIngredient(model)">+</bt-button>
                </div>
            </div>
            <div v-for="(ingredient, index) in model.ingredients" :key="index" v-if="model.ingredients" class="flex flex-row">
                <bt-form-text :control="'ingredients/'+index"></bt-form-text>
                <bt-button @click.prevent="removeIngredient(model, index)">Supprimer</bt-button>
            </div>
            <div v-else>Pas encore d'ingrédients</div>
            <div>
                <div class="flex flex-row gap-4 items-center justify-center">
                    <span>Etapes</span>
                    <bt-button @click.prevent="addStep(model)">+</bt-button>
                </div>
            </div>
            <div v-for="(step, index) in model.steps" :key="index" v-if="model.steps"  class="flex flex-row">
                <bt-form-text :control="'steps/'+index"></bt-form-text>
                <bt-button @click.prevent="removeStep(model, index)">Supprimer</bt-button>
            </div>
            <div v-else>Pas encore d'étapes</div>
            <bt-button @click="submit();">Sauvegarder</bt-button>
        </bt-form>
    </div>
</template>
<script lang="ts">
import {Vue} from "../vue-typescript";
import {Component, Expose, Lifecycle, Prop} from "@banquette/vue-typescript";
import {FormControl, FormObject} from "@banquette/model-form";
import {BtFormText} from "@banquette/vue-ui";
import {Recipe} from "../entity/recipe.entity";
import {ref, toRaw} from "vue";


@Component({
    name: 'recipe-form',
    components: [
        FormObject, FormControl, BtFormText
    ]
})
export default class RecipeForm extends Vue{

    @Expose() public result!: Recipe;

    @Prop({default: false}) public edit!: boolean;

    @Prop({type: Recipe, default:null}) public meal!: Recipe;

    @Expose() public currentMeal!:Recipe = ref();

    @Expose()
    public created() {
        console.log('prop meal :', this.meal)
        if (this.meal){
            this.currentMeal = Object.assign(new Recipe(),this.meal)
            console.log('currentMeal : ', this.currentMeal)
        }
    }

    @Expose() public handleSave(){
        if (!this.edit){
            const ref = this.generateRef();
            Object.assign(this.currentMeal, new Recipe(), {ref: ref});
            console.log('Formulaire réinitialisé');
        }
        this.$emit('reload-recipe')
    }

    @Expose() public persistEndpoint(): string {
        if(this.edit){
            return 'put_recipe';
        }
        return 'post_recipes'
    }

    //Fonction add et remove à dynamiser pour les rendre universelles
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
        return result
    }
}
</script>