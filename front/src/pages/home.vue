<template>
    <recipe-list />
    <recipe-form />
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

    @Expose() async addRecipe(): Promise<Response> {
        const data = {
            ref: 'abb',
            title: 'Jambon purée avec des brocolis',
            description: "c'est facile et les enfants aiment",
            preparationTime: 20,
            ingredients: ['purée', 'jambon', 'brocolis'],
            steps: [
                'dans une casserole mélanger les pommes de terre avec du lait, rajouter les brocolis',
                'bien mélanger',
                'servir dans une assiette avec le jambon',
                'bon appétit'
            ]
        }

        const url = 'http://cook.local/api/recipes';
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorBody = await response.text();
                console.error(`HTTP error! Status: ${response.status}`);
                console.error('Error response body:', errorBody);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('response is ok')
            return response;
        } catch (error) {
            console.error('Error while posting recipe:', error);
            throw error;
        }
    }
}
</script>

