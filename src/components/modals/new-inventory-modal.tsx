import { Modal, Button, Table } from 'react-bootstrap'
import React, { useState, useContext } from 'react'
import { store } from '../../store/store';
import stages from '../../const/stages';
import { denormPlant } from 'helpers/denormalize-plants'
import createClones from 'store/actions/create-clones';
import { CLONE_ROOM_1 } from 'store/intial-data';

function NewInventoryModal(props: { show: boolean, onClose: Function }) {
  
    const {state, dispatch}  = useContext(store);
    const clonablePlants = Object.values(state.entities.plants).filter(p => p.stage === stages.Vegitation)
    const [cloneRequest, setCloneRequests] = useState(clonablePlants.reduce<{[key:string]: number}>((p, c) => { p[c.id] =  0; return p}, {}))

    const handleClose = async () => {
      props.onClose();
      const createClonesRequests = Object.entries(cloneRequest).map(([k,v]) => ({
        sourcePlantId: k,
        quantity: v,
        targetRoomId: CLONE_ROOM_1}))
      dispatch(createClones.createAction(createClonesRequests))
    }

    const updateQuantity = (plantId: string, value: string) => {
      setCloneRequests({...cloneRequest, ...{ [plantId]: parseInt(value) }})
    }
    
    const plantsByStrain = clonablePlants.map(p => denormPlant(state, p))
    const tableRows = plantsByStrain.map((plant) => (
      <tr key={plant.id}>
        <td>{plant.strain.name}</td>
        <td>{plant.room ? plant.room.name : ""}</td>
        <td>
          <input type="number" value={cloneRequest[plant.id]} onChange={(e) => updateQuantity(plant.id, e.target.value)}/>
        </td>
      </tr>
    ))
    return (
        <Modal show={props.show} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>New Inventory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    Strain
                  </th>
                  <th>
                    Room
                  </th>
                  <th>
                    # New
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows}
              </tbody>
              </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }

export default NewInventoryModal
  