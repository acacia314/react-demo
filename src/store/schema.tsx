import { schema } from "normalizr";

const room = new schema.Entity('rooms');
const strain = new schema.Entity('strains');
const cloneGroup = new schema.Entity('cloneGroups');
const plant = new schema.Entity('plants')

cloneGroup.define({
    sourcePlant: plant
})

plant.define({
    strain,
    room,
    cloneGroup
})

export {
    room,
    strain,
    cloneGroup,
    plant
}