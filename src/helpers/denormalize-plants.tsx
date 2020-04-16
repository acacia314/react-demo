import {GFStore, NormalizedPlant, Plant, NormalizedCloneGroup, CloneGroup} from '../store/store.types'
import { groupBy } from '../helpers/utilities'
import { ColumnGroupProps } from 'components/board/column.types'

export function denormPlantsForColumn(state: GFStore, stage: string) : ColumnGroupProps[] {
    const plants = Object.values(state.entities.plants).filter(p => p.stage === stage)
    const plantsByLocation = groupBy(plants, plant => plant.room)
    const groups = []
    for(let [loc, plantsInLocation] of Object.entries(plantsByLocation)) {
        var plantsByStrain = groupBy(plantsInLocation, p => p.strain);
        let group = {
            name: state.entities.rooms[loc].name,
            id: state.entities.rooms[loc].id,
            items: Object.entries(plantsByStrain).map(([k, v]) => ({name: state.entities.strains[k].name, quantity: v.length}))
        }
        groups.push(group)
    }
    return groups
}

// TODO: update this to use the normalize library, there is already a schema
export function denormPlant(state: GFStore, plant: NormalizedPlant, depth : number = 0) : Plant {
    if (depth > 5)
        throw new Error("Too much nesting")
    return {
        id: plant.id,
        room: state.entities.rooms[plant.room],
        stage: plant.stage,
        strain: state.entities.strains[plant.strain],
        cloneGroup: plant.cloneGroup ? denormCloneGroup(state, state.entities.cloneGroups[plant.cloneGroup], depth + 1) : undefined
    }
}

// TODO: update this to use the normalize library, there is already a schema
export function denormCloneGroup(state: GFStore, cloneGroup: NormalizedCloneGroup, depth : number = 0): CloneGroup {
    if (depth > 5)
        throw new Error("Too much nesting")
    return {
        id: cloneGroup.id,
        dateCloned: cloneGroup.dateCloned,
        sourcePlant: denormPlant(state, state.entities.plants[cloneGroup.sourcePlant], depth + 1)
    }
}

export function groupByStrain(plants: Plant[]) : { [key: string] : Plant[]} {
    return groupBy(plants, p => p.strain.id)
}


