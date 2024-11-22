<template>
    <div class="p-8 flex flex-col">
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

@Component({
    name: 'recipe-list',
    components: {
        Modal
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