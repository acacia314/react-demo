import React, { useContext } from 'react';
import Column from '../../components/board/column'
import { store } from '../../store/store';
import { ColumnData } from '../../components/board/column.types'
import { denormPlantsForColumn } from 'helpers/denormalize-plants'
import { GrowColumnProp } from './grow-types';

const GrowColumn: React.FunctionComponent<GrowColumnProp> = (props) => {
    var { state } = useContext(store);
    let plantGroups = denormPlantsForColumn(state, props.stageFilter)
    plantGroups.forEach(p => p.topButton = props.groupButton)
    const column: ColumnData = {
        name: props.title,
        groups: plantGroups,
        topButton: props.topButton
    }
    return (
        <>
            <Column {...column} />
        </>
    )
}

export default GrowColumn