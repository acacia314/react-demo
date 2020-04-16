import update from 'immutability-helper';
import { GFReducer } from './action.types';
const HIDE_MODAL = "HIDE_MODAL"

export interface HideModalAction {
    type: typeof HIDE_MODAL
}

function hideModal () : HideModalAction {
    return {
        type: HIDE_MODAL
    }
}

const hideModalReducer : GFReducer<HideModalAction> = (state, action) => {
    return update(state, { ui: { $set : { modal: undefined}}})
}

export default {
    type: HIDE_MODAL,
    createAction: hideModal,
    reducer: hideModalReducer
};