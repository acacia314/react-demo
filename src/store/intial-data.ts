import stages from '../const/stages'
import {GFStore, CloneGroup, Plant, Strain, Room, GFEntities} from './store.types'
import id from '../helpers/sequential-id'
import { normalize, schema } from 'normalizr';
import { plant } from './schema';

// Export these room ids since the demo doesn't support creating rooms
export const CLONE_ROOM_1 = id.next()
export const CLONE_ROOM_2 = id.next()
export const VEG_ROOM_1 = id.next()

const rooms:Room[] = [
    { id: CLONE_ROOM_1, name: "Clone Room 1"},
    { id: CLONE_ROOM_2, name: "Clone Room 2"},
    { id: VEG_ROOM_1, name: "Veg Room 1"},
]


const strains:Strain[] = [
    { id: id.next(), name: "Oregano"},
    { id: id.next(), name: "Tomato"},
]

const plants: Plant[] = [
    { id: id.next(), strain: strains[1], stage: stages.Inventory, room: rooms[0]},
    { id: id.next(), strain: strains[1], stage: stages.Inventory, room: rooms[0]},
    { id: id.next(), strain: strains[1], stage: stages.Inventory, room: rooms[1]},
    { id: id.next(), strain: strains[0], stage: stages.Vegitation, room: rooms[2]},
    { id: id.next(), strain: strains[1], stage: stages.Vegitation, room: rooms[2]}
]

const cloneGroups: CloneGroup[] = [
    { id: id.next(), sourcePlant: plants[4], dateCloned: new Date() }
]

plants.filter(p => p.stage === stages.Inventory).forEach(p => p.cloneGroup = cloneGroups[0])

const normalizedData = normalize<any, GFEntities>({plants}, new schema.Object({plants: [plant]}));

const state : GFStore = {
    ui: {
    },
    entities: normalizedData.entities
}

export default state;