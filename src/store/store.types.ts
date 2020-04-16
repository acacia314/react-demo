export interface NormalizedStrain {
    id: string,
    name: string
}
export interface Strain extends NormalizedStrain {}

export interface NormalizedPlant {
    id: string,
    strain: string,
    stage: string,
    room: string
    cloneGroup?: string
}

export interface Plant {
    id: string,
    strain: Strain,
    stage: string,
    room?: Room,
    cloneGroup?: CloneGroup
}
export interface NormalizedRoom {
    id: string,
    name: string
}
export interface Room extends NormalizedRoom {}

export interface NormalizedCloneGroup {
    id: string,
    sourcePlant: string,
    dateCloned: Date
}
export interface CloneGroup {
    id: string,
    sourcePlant: Plant,
    dateCloned: Date
}

export interface UIModal {
    id: string,
    props?: any
}
export interface GFUI {
    modal? : UIModal
}

export interface GFEntities {
    strains : Record<string, NormalizedStrain>,
    plants : Record<string, NormalizedPlant>,
    rooms : Record<string, NormalizedRoom>,
    cloneGroups: Record<string, NormalizedCloneGroup>
}
export interface GFStore {
    entities : GFEntities,
    ui: GFUI
}
