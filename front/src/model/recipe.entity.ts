import { Endpoint, Api } from '@banquette/api';
import {Form, FormArray, FormObject} from "@banquette/model-form";
import { Alias } from "@banquette/model";
import { Assert } from '@banquette/model-validation';
import { NotEmpty, And, Max } from '@banquette/validation'
import {Pojo} from "@banquette/model";

@Alias('Recipe')
@Endpoint('get_all', '/api/recipes', 'GET')
@Endpoint('get_recipe', '/api/recipe/{id}', 'GET')
@Endpoint('delete_recipe', '/api/delete/{id}', 'DELETE')
@Endpoint('post_recipes','/api/recipes', 'POST')
@Endpoint('put_recipe','/api/recipe/{id}', 'PUT')
export class Recipe {
    @Pojo()
    @Api()
    public id: number;

    @Pojo()
    @Api()
    @Form()
    public ref: string;

    @Assert(And(NotEmpty(), Max(100)))
    @Form()
    @Api()
    @Pojo()
    public title!: string;

    @Assert(NotEmpty())
    @Form()
    @Api()
    @Pojo()
    public description!: string;

    @Form()
    @Api()
    @Pojo()
    public preparationTime: number;

    @Form(FormArray())
    @Api()
    @Pojo()
    public ingredients: string[] = [];

    @Form(FormArray())
    @Api()
    @Pojo()
    public steps: string[] = [];
}


