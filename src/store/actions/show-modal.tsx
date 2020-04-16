import update from 'immutability-helper';
import { GFReducer } from './action.types';
const SHOW_MODAL = "SHOW_MODAL"

export interface ShowModalAction {
    type: typeof SHOW_MODAL,
    modalId: string,
    props: any
}

function showModal (modalId: string, props: any) : ShowModalAction {
    return {
        type: SHOW_MODAL,
        modalId,
        props
    }
}

const showModalReducer : GFReducer<ShowModalAction> = (state, action) => {
    return update(state, { ui: { $merge : { modal: {id : action.modalId, props: action.props}}}})
}

export default {
    type: SHOW_MODAL,
    createAction: showModal,
    reducer: showModalReducer
};