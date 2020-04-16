import React from 'react';
import { ColumnGroupItemProps } from './column.types'
import styles from './column-group-item.module.css'

class ColumnGroupItem extends React.Component<{item: ColumnGroupItemProps}, {}> {
    render() {
        return (
            <div className="row">
                <span className="col">{this.props.item.name}</span>
                <span className={[styles.quantity, "col"].join(" ")}>({this.props.item.quantity})</span>
            </div>
        )
    }
}
export default ColumnGroupItem