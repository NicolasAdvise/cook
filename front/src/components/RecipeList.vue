<template>
    <div class="p-8 flex flex-col">
        <button @click="getMeals">Menus dans la console</button>

        <ul>
            <li v-for="(meal, index) in meals.meal" :key="index" @click="triggerModal(meal)">{{meal.name}}</li>
        </ul>
    </div>
    <modal v-if="modalState" @click="triggerModal" :meal="selectedMeal"/>
</template>
<script lang="ts">
import { Vue } from "../vue-typescript";
import {Component, Expose} from "@banquette/vue-typescript";
import Modal from "../components/Modal.vue";
import { Injector } from "@banquette/dependency-injection";
import { HttpService, HttpResponse } from "@banquette/http";
import {ApiService} from "@banquette/api";
import {Recipe} from "../model/recipe.entity";

@Component({
    name: 'recipe-list',
    components: {
        Modal,
        Injector,
        HttpResponse,
        HttpService,
        ApiService
    }
})
export default class RecipeList extends Vue {

    @Expose() public modalState: boolean = false;

    @Expose() public selectedMeal
    @Expose() public triggerModal(meal) {
        if (this.modalState) {
            this.modalState = false
        } else {
            console.log('meal = '+meal)
            this.selectedMeal = meal
            console.log('selectedMeal ='+ this.selectedMeal)
            this.modalState = true
        }
    }

    //@Expose() async getMeals() {
    //    console.log('function getMeals')
    //    try {
    //        const http = Injector.Get(HttpService);
    //        const response = http.get('/api/recipes')
    //        await response.promise;
    //        console.log(response.result)
    //    } catch (error) {
    //        console.log('erreur dans getMeals')
    //    }
    //}

    @Expose() public async getMeals() {
        console.log('function getMeals')
        try {
            const api = Injector.Get(ApiService);
            const response = await api.get('get_recipes', Recipe).promise;
            console.log(response)
            console.log(response.result)
        } catch (error) {
            console.log('erreur dans getMeals :', error)
        }
    }


    @Expose() public meals = {
        meal: [
            {
                name: "Boeuf Bourguignon",
                description: "Un ragoût de boeuf mijoté dans du vin rouge, souvent accompagné de légumes comme des carottes et des oignons.",
            },
            {
                name: "Coq au Vin",
                description: "Poulet mijoté dans du vin rouge, avec des champignons, des oignons et du lard.",
            },
            {
                name: "Ratatouille",
                description: "Un mélange de légumes méditerranéens (courgettes, aubergines, tomates, poivrons) mijotés dans de l'huile d'olive.",
            },
            {
                name: "Quiche Lorraine",
                description: "Une pâte brisée garnie d'un mélange d'œufs, de crème fraîche, de lardons et de fromage.",
            }
        ]
    }

}
</script>