import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type RecipesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Recipes {
  readonly id: string;
  readonly Name: string;
  readonly Description?: string | null;
  readonly Duration: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Recipes, RecipesMetaData>);
  static copyOf(source: Recipes, mutator: (draft: MutableModel<Recipes, RecipesMetaData>) => MutableModel<Recipes, RecipesMetaData> | void): Recipes;
}