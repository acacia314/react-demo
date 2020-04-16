
import { useContext } from 'react'
import showModalAction from '../../store/actions/show-modal'
import hideModalAction from '../../store/actions/hide-modal'
import { store } from '../../store/store';

function useModal() {
    const { dispatch } = useContext(store)
    function showModal(modalId: string, props?: any) {
        dispatch(showModalAction.createAction(modalId, props))
    }
    function hideModal() {
        dispatch(hideModalAction.createAction())
    }
    return {
        showModal,
        hideModal
    }
}

export default useModal;