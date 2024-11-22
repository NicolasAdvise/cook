import { Endpoint, Api } from '@banquette/api';
import {Form, FormArray, FormObject} from "@banquette/model-form";
import { Alias } from "@banquette/model";
import { Assert } from '@banquette/model-validation';
import { NotEmpty, And, Max } from '@banquette/validation'
import {Pojo} from "@banquette/model";

@Alias('Recipe')
@Endpoint('get_recipes', '/api/recipes', 'GET')
@Endpoint('post_recipes','/api/recipes', 'POST')
export class Recipe {
    @Pojo()
    public id: number;

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

    @Form()
    @Api()
    @Pojo()
    public ingredients: string[];

    @Form()
    @Api()
    @Pojo()
    public steps: string[];
}

