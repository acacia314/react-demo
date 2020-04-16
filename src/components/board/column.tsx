import React from 'react';
import { ColumnData } from './column.types'
import ColumnGroup from './column-group'
import styles from './column.module.css'; // Import css modules stylesheet as styles

class Column extends React.Component<ColumnData> {

    render() {
        const groups = this.props.groups.map(g => (
            <ColumnGroup group={g} key={g.name}/>
        ))
        
        const totalQuantity = this.props.groups.reduce((prev, cur) => prev + cur.items.reduce((prev, cur) => prev + cur.quantity, 0) , 0)

        return (
            <div className={styles.column}>
                {this.props.topButton && 
                    <button className={[styles.newButton, "btn btn-primary"].join(" ")} onClick={this.props.topButton.onClick}>
                        {this.props.topButton.text}
                        </button>
                }
                <div className={styles.name}>{this.props.name}<span className={styles.quantity}>{totalQuantity}</span></div>
                {groups}
            </div>
        )    
    }
}
export default Column