import { GFReducer, ActionReducerDefinition } from "./action.types";
import showModal from './show-modal'
import hideModal from './hide-modal'
import createClones from './create-clones'
import createPlants  from './create-plants'

const actionReducerDefinitions: ActionReducerDefinition[] =  [
    showModal,
    hideModal,
    createClones,
    createPlants
]

const actionReducerMapping = actionReducerDefinitions.reduce<Record<string,GFReducer<any>>> ((p, c) => {p[c.type] = c.reducer; return p;}, {})

export default actionReducerMapping
