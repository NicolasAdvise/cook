<template>
    <div class="p-8 flex flex-col">
        <h2 class="text-xl text-bold text-center mb-3">Liste des recettes</h2>
        <ul v-if="meals">
            <li v-for="(meal, index) in meals" :key="index" class="flex flex-row justify-between my-2 p-3 border-2 border-solid rounded-md border-primary-500">
                <div class="flex flex-col">
                    <span class="text-bold text-lg">{{meal.title}}</span>
                    <span>{{ meal.description }}</span>
                </div>
                <div class="flex flex-row gap-2 items-center">
                    <span>{{ getDuration(meal.preparationTime)}}</span>
                    <bt-button @click.prevent="triggerModal(meal, false)">Détails</bt-button>
                    <bt-button @click.prevent="triggerModal(meal, true)">Modifier</bt-button>
                    <bt-button @click="dialog.show('agreement',{id: meal.id})">Supprimer</bt-button>
                </div>
            </li>
        </ul>
        <p v-else-if="!meals">Pas de menus disponibles</p>
    </div>
    <bt-dialog id="agreement" :close-by-mask="false" :close-on-escape="false" :show-close="false" v-slot="{bag}">
        <p>Confirmer la suppression</p>
        <div class="flex flex-row gap-2 items-center">
            <bt-button variant="light link" @click="deleteRecipe(bag.id)">Oui</bt-button>
            <bt-button @click="dialog.hide('agreement')">Non</bt-button>
        </div>
    </bt-dialog>

    <modal v-if="modalState" @close="closeModal()" :meal="selectedMeal" :is-form="form"/>

</template>
<script lang="ts">
import { Vue } from "../vue-typescript";
import {Component, Expose, Lifecycle} from "@banquette/vue-typescript";
import Modal from "../components/Modal.vue";
import { Injector } from "@banquette/dependency-injection";
import { HttpService, HttpResponse } from "@banquette/http";
import {ApiService} from "@banquette/api";
import {Recipe} from "../entity/recipe.entity";
import {reactive} from "vue";
import {BtDialog, useAlertGlobals} from "@banquette/vue-ui";
import {useDialog} from "@banquette/vue-ui";
import {BtAlert} from "@banquette/vue-ui";
import {AlertService} from "@banquette/vue-ui";

@Component({
    name: 'recipe-list',
    components: {
        Modal,
        Injector,
        HttpResponse,
        HttpService,
        ApiService,
        reactive,
        BtDialog,
        BtAlert,
        AlertService
    }
})
export default class RecipeList extends Vue {

    @Expose() public meals = reactive([]);

    @Expose() public alert = Injector.Get(AlertService)

    @Expose() public dialog = useDialog();

    @Expose() public form: boolean = false;

    @Expose() public modalState: boolean = false;

    @Expose() public selectedMeal

    @Lifecycle('mounted')
    public async getMeals() {
        try {
            const api = Injector.Get(ApiService);
            const response = await api.get('get_all', Recipe).promise;
            console.log(response.result)
            this.meals = response.result;
        } catch (error) {
            console.log('erreur dans getMeals :', error)
        }
    }

    @Expose public created(){
        this.alert.hideAll();
    }

    @Expose() public async deleteRecipe(id: number) {
        console.log('id = ', id)
        try {
            const api = Injector.Get(ApiService);
            const response = await api.delete('delete_recipe', Recipe,{ id });
            console.log(response);
            console.log("Suppresion de la recette : ", id)
            await this.getMeals()
            this.dialog.hide('agreement')
            this.alert.show('La recette a bien été suprimée', 'success', 3000);
            await this.getMeals()
        } catch (error) {
            console.log('erreur lors de la suppression : ', error)
        }
    }

    @Expose() public triggerModal(meal, form?: boolean = false) {
        if (!this.modalState) {
            this.selectedMeal = meal
            if (form){
                this.form = true
            }
            this.modalState = true
        }
    }

    @Expose() public closeModal() {
        this.modalState = false;
        this.form = false;
    }


    // For Test purpose
    @Expose() async getMealsRaw() {
        console.log('function getMeals')
        try {
            const http = Injector.Get(HttpService);
            const response = http.get('/api/recipes')
            await response.promise;
            console.log(response.result)
        } catch (error) {
            console.log('erreur dans getMeals')
        }
    }

    @Expose() getDuration(time: number): string {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        if (hours === 0) {
            return `${minutes} min.`;
        }
        if (minutes === 0) {
            return `${hours}h`;
        }
        return `${hours}h ${minutes} min.`;
    }

}
</script>