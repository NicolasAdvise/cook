<template>
    <div class="bg-black bg-opacity-30 w-full h-full inset-0 fixed flex justify-center items-center">
        <div  class="relative bg-admin-150 w-2/3 h-2/3 mx-auto flex flex-col items-center justify-center rounded p-10">
            <button class="btn-primary mt-5 text-bold absolute top-[3%] right-[3%]" @click="close()">X</button>
            <recipe-form v-if="isForm" :edit="true" :meal="meal" @close="close()" @reload="reload()"></recipe-form>
            <!-- On pourrait envisager de faire un composant pour ce bloc -->
            <div v-else>
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
        </div>
    </div>
</template>
<script lang="ts">
import {Vue} from "../vue-typescript";
import {Expose, Component, Prop} from "@banquette/vue-typescript";
import RecipeForm from "./RecipeForm.vue";

@Component({
    'name': 'modal',
    components: {RecipeForm},
})
export default class Modal extends Vue {
    @Prop() public meal

    @Prop({default: false}) public isForm

    @Expose()
    public close() {
        this.$emit('close');
    }

    @Expose()
    public reload() {
        this.$emit('reload');
    }
}
</script>