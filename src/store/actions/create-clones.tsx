import update from 'immutability-helper';
import { GFReducer } from './action.types';
import stages from 'const/stages';
import { NormalizedPlant, NormalizedCloneGroup } from 'store/store.types';
import id from '../../helpers/sequential-id'
const CREATE_CLONES = "CREATE_CLONES"


export interface CreateClonesAction {
    type: typeof CREATE_CLONES,
    createClonesRequests: CreateClonesRequest[]
}

interface CreateClonesRequest {
    sourcePlantId: string, quantity: number, targetRoomId: string
}


function createClones(createClonesRequests: CreateClonesRequest[]): CreateClonesAction {
    return {
        type: CREATE_CLONES,
        createClonesRequests
    }
}

const createClonesReducer: GFReducer<CreateClonesAction> = (state, action) => {
    let newClones: { [key: string]: NormalizedPlant } = {}
    let cloneGroups: Record<string, NormalizedCloneGroup> = {}

    for (let createCloneRequest of action.createClonesRequests) {
        let cloneGroupId = id.next()
        let sourcePlant = state.entities.plants[createCloneRequest.sourcePlantId];
        cloneGroups[cloneGroupId] = {
            id: cloneGroupId,
            sourcePlant: sourcePlant.id,
            dateCloned: new Date()
        }
        for (let i = 0; i < createCloneRequest.quantity; i++) {
            let newPlantId = id.next()
            newClones[newPlantId] = {
                id: newPlantId,
                room: createCloneRequest.targetRoomId,
                strain: sourcePlant.strain,
                stage: stages.Inventory,
                cloneGroup: cloneGroupId
            }
        }
    }

    return update(state, { entities: { plants: { $merge: newClones }, cloneGroups: { $merge: cloneGroups } } });
}

export default {
    type: CREATE_CLONES,
    createAction: createClones,
    reducer: createClonesReducer
};