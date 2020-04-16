import React from 'react';
import styles from './grow.module.css'
import GrowColumn from './grow-column'
import stages from 'const/stages';
import useModal from '../../components/modals/useModalHook'
import modals from '../../components/modals/modal-const'
import { GrowColumnProp } from './grow-types';

function Grow () {
    const { showModal} = useModal()
    const columns: GrowColumnProp []=[
            {
                title: 'Inv. Plants',
                stageFilter: stages.Inventory,
                topButton: {
                    text: '+ New',
                    onClick: () => showModal(modals.NewInventory),
                },
                groupButton: {
                    onClick: (e, props) => showModal(modals.NewPlants, {room: props.targetGroupId}),
                    text: '>'
                }
    
            },
            {
                title: 'Veg ',
                stageFilter: stages.Vegitation
            }
        ] 
    return (
        <div className={styles.board}>
            {
            columns.map(c => (
                <div className={styles.column} key={c.title}>
                    <GrowColumn {...c}/>
                </div>
            ))
            }
        </div>
    )
}

export default Grow