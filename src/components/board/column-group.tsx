import React from 'react';
import { ColumnGroupProps } from './column.types'
import ColumnGroupItem from './column-group-item'
import styles from './column-group.module.css'

class ColumnGroup extends React.Component<{group: ColumnGroupProps}, {}> {
    render() {
        const group = this.props.group;
        const items = group.items.map(i => (
            <div className={styles.columnItem} key={i.name}>
                <ColumnGroupItem item={i} />
            </div>
        ))

        const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            group.topButton?.onClick(e, {targetGroupId: this.props.group.id })
        }

        return (
            <div className={styles.columnGroup}>
                {group.topButton && <div className={styles.topButton} onClick={handleClick}>{group.topButton.text}</div>}
                <div className={styles.name}>{group.name}</div>
                {items}
            </div>
        )
        
    }
}
export default ColumnGroup