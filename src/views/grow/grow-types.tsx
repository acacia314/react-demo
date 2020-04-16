export interface GrowColumnProp {
    title: string,
    stageFilter: string,
    topButton?: {
        text: string,
        onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    },
    groupButton?: {
        text: string,
        onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>, payload: any) => void
    }

}