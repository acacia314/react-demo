import update from 'immutability-helper';
import { GFReducer } from './action.types';
import stages from 'const/stages';
import { NormalizedPlant } from 'store/store.types';
const CREATE_PLANTS = "CREATE_PLANTS"


export interface CreatePlantsAction {
    type: typeof CREATE_PLANTS,
    createPlantsRequests: CreatePlantsRequest[]
}

interface CreatePlantsRequest {
    sourceRoomId: string
    sourceCloneGroupId: string,
    quantity: number,
    targetRoomId: string,
    destroyLeftovers: boolean
}


function createPlants (createPlantsRequests: CreatePlantsRequest[]) : CreatePlantsAction {
    return {
        type: CREATE_PLANTS,
        createPlantsRequests
    }
}

const createPlantsReducer : GFReducer<CreatePlantsAction> = (state, action) => {
            let updatedPlants : Record<string, NormalizedPlant> = {}
            for (let createPlantsRequest of action.createPlantsRequests) {
                let plantsInCloneGroup = Object.values(state.entities.plants)
                    .filter(p => 
                        p.cloneGroup === createPlantsRequest.sourceCloneGroupId && 
                        p.stage === stages.Inventory &&
                        p.room === createPlantsRequest.sourceRoomId)

                for (let i = 0; i < createPlantsRequest.quantity; i++) {
                    let plant = plantsInCloneGroup[i];
                    updatedPlants[plant.id] = {...plant, ...{stage: stages.Vegitation, room: createPlantsRequest.targetRoomId} }
                }

                if (createPlantsRequest.destroyLeftovers) {
                    for(let i = createPlantsRequest.quantity; i < plantsInCloneGroup.length; i++) {
                        let plantToDestroy = plantsInCloneGroup[i]
                        let updatedPlant =  {...plantToDestroy, ...{stage: stages.Destroyed} }
                        delete updatedPlant.room
                        updatedPlants[plantToDestroy.id] = updatedPlant
                    }
                }
            }

            return update(state, {entities: { plants: { $merge: updatedPlants}}});
}

export default {
    type: CREATE_PLANTS,
    createAction: createPlants,
    reducer: createPlantsReducer
};