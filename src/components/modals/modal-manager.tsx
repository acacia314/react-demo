import React, { useContext } from 'react'
import NewInventoryModal from './new-inventory-modal'
import NewPlantModal from './new-plants-modal'
import modals from './modal-const'
import { store } from '../../store/store';
import hideModal from 'store/actions/hide-modal';
interface ModalProps { show: boolean, onClose: Function }

export default function () {
    var {state, dispatch} = useContext(store);
    const modalsById: Record<string, React.FunctionComponent<ModalProps>> = {
        [modals.NewPlants]: NewPlantModal,
        [modals.NewInventory]: NewInventoryModal,
    }

    if (state.ui.modal === undefined) {
        return null
    }
    const CurrentModal = modalsById[state.ui.modal?.id]
    if (!CurrentModal) {
        throw new Error("Invalid Modal id")
    }
    const handleClose = () => {
        dispatch(hideModal.createAction())
    }
    return (
        <>
            <CurrentModal show={true} onClose={handleClose}/>
        </>
    )
}