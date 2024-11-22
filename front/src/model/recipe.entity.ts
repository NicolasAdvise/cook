import { Endpoint, Api } from '@banquette/api';
import {Form, FormArray, FormObject} from "@banquette/model-form";
import { Alias } from "@banquette/model";
import { Assert } from '@banquette/model-validation';
import { NotEmpty, And, Max } from '@banquette/validation'

@Alias('Recipe')
@Endpoint('get_recipes', '/api/recipes', 'GET')
@Endpoint('post_recipes','/api/recipes', 'POST')
export class Recipe {
    public id: number;

    @Assert(And(NotEmpty(), Max(100)))
    @Form()
    public title!: string;

    @Assert(NotEmpty())
    @Form()
    public description!: string;

    @Form()
    public preparationTime: number;

    @Form()
    public ingredients: string;

    @Form()
    public steps: string[];

}