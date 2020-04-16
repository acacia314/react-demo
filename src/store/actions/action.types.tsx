import { GFStore } from "store/store.types";
import { CreateClonesAction } from "./create-clones";
import { CreatePlantsAction } from "./create-plants";
import { ShowModalAction } from "./show-modal";
import { HideModalAction } from "./hide-modal";

export type GFReducer<T> = (store: GFStore, action: T) => GFStore

export type AvailableActions = 
    CreateClonesAction 
    | CreatePlantsAction
    | ShowModalAction
    | HideModalAction

export interface ActionReducerDefinition {
    type:string,
    reducer: GFReducer<any>
}