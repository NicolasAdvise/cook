<template>
    <bt-table :items="meals" pagination-position="bottom">
        <template v-slot="{item}">
            <bt-table-column title="Nom">
                <span class="text-bold text-lg">{{ item.title }}</span><br>
                <span>{{ item.description }}</span>
            </bt-table-column>
            <bt-table-column title="Durée">
                {{ getDuration(item.preparationTime)}}
            </bt-table-column>
            <bt-table-column width="150px" title="actions">
            <span class="flex items-center justify-end gap-1 -mr-1">
                <bt-button variant="sm link" @click="edit(item)">
                    <bt-button @click="btShowDialog('recipe-details', {meal: item})">Détails</bt-button>
                    <bt-button @click="btShowDialog('recipe-edit',{meal: item})"> Modifier</bt-button>
                    <bt-button @click="dialog.show('agreement',{id: item.id})">Supprimer</bt-button>
                </bt-button>
            </span>
            </bt-table-column>
        </template>
    </bt-table>

    <bt-dialog id="agreement" :close-by-mask="false" :close-on-escape="false" :show-close="false" v-slot="{bag}">
        <p>Confirmer la suppression</p>
        <div class="flex flex-row gap-2 items-center">
            <bt-button variant="light link" @click="deleteRecipe(bag.id)">Oui</bt-button>
            <bt-button @click="dialog.hide('agreement')">Non</bt-button>
        </div>
    </bt-dialog>

    <bt-dialog id="recipe-edit" v-slot="{bag}">
        <!-- Just for work -->
        <recipe-form :edit="true" :meal="bag.meal" @close="dialog.hide('recipe-edit')" @reload="getMeals()"></recipe-form>
    </bt-dialog>

    <bt-dialog id="recipe-details" v-slot="{bag}">
        <recipe-details :meal="bag.meal" ></recipe-details>
    </bt-dialog>

</template>
<script lang="ts">
import { Vue } from "../vue-typescript";
import {Component, Expose, Lifecycle} from "@banquette/vue-typescript";
import { Injector } from "@banquette/dependency-injection";
import { HttpService, HttpResponse } from "@banquette/http";
import {ApiService} from "@banquette/api";
import {Recipe} from "../entity/recipe.entity";
import {reactive, ref} from "vue";
import {BtDialog, useAlertGlobals, BtTable} from "@banquette/vue-ui";
import {useDialog} from "@banquette/vue-ui";
import {BtAlert} from "@banquette/vue-ui";
import {AlertService} from "@banquette/vue-ui";
import RecipeForm from "./RecipeForm.vue";
import RecipeDetails from "./RecipeDetails.vue";


@Component({
    name: 'recipe-list',
    components: {
        RecipeForm,
        Injector,
        HttpResponse,
        HttpService,
        ApiService,
        reactive,
        BtDialog,
        BtAlert,
        AlertService,
        RecipeDetails,
        BtTable
    }
})
export default class RecipeList extends Vue {

    @Expose() public meals = reactive([]);

    @Expose() public allMeals;

    @Expose() public nothingFound = ref(true);

    @Expose() public alert = Injector.Get(AlertService)

    @Expose() public dialog = useDialog();

    @Expose() public form: boolean = false;

    @Expose() public modalState: boolean = false;

    @Expose() public selectedMeal

    @Expose() public filterText: string;

    @Lifecycle('mounted')
    public async initializeMeals() {
        await this.getMeals();
    }

    @Expose() public async getMeals() {
        try {
            const api = Injector.Get(ApiService);
            const response = await api.get('get_all', Recipe).promise;
            this.meals = response.result;
            this.allMeals = response.result
        } catch (error) {
            console.log('erreur dans getMeals :', error)
        }
    }

    @Expose public created(){
        this.alert.hideAll();
    }

    @Expose() public async deleteRecipe(id: number) {
        try {
            const api = Injector.Get(ApiService);
            const response = await api.delete('delete_recipe', Recipe,{ id });
            await this.getMeals()
            this.dialog.hide('agreement')
            this.alert.show('La recette a bien été suprimée', 'success', 3000);
        } catch (error) {
            console.log('erreur lors de la suppression : ', error);
            this.alert.show('Un problème est survenu', 'danger', 3000);
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

    @Expose() filterMeal(filter: string){
        this.nothingFound = true;
        this.filterText = filter.toLowerCase();
        this.meals = this.allMeals.filter(meal => meal.title.toLowerCase().includes(this.filterText))
        if (this.meals.length === 0){
            this.nothingFound = false;
        }
    }
}
</script>