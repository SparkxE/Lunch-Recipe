import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

type RecipesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerRecipes = {
  readonly id: string;
  readonly Name: string;
  readonly Description?: string | null;
  readonly Duration: number;
  readonly Details: string[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRecipes = {
  readonly id: string;
  readonly Name: string;
  readonly Description?: string | null;
  readonly Duration: number;
  readonly Details: string[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Recipes = LazyLoading extends LazyLoadingDisabled ? EagerRecipes : LazyRecipes

export declare const Recipes: (new (init: ModelInit<Recipes, RecipesMetaData>) => Recipes) & {
  copyOf(source: Recipes, mutator: (draft: MutableModel<Recipes, RecipesMetaData>) => MutableModel<Recipes, RecipesMetaData> | void): Recipes;
}