export interface ColumnGroupItemProps {
    name: string,
    quantity: number
}

export interface ColumnGroupProps {
    name: string,
    id: string,
    items: ColumnGroupItemProps[],
    topButton?: ColumnButton
}

export interface ColumnButton {
    text: string,
    onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>, payload?: any) => void
}

export interface ColumnData {
    name: string,
    topButton?: ColumnButton,
    groups: ColumnGroupProps[]
}
