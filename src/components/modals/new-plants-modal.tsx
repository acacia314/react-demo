import { Modal, Button, Table } from 'react-bootstrap'
import React, { useState, useContext } from 'react'
import { store } from '../../store/store';
import stages from '../../const/stages';
import { groupBy } from 'helpers/utilities';
import createPlants from 'store/actions/create-plants';
import { VEG_ROOM_1 } from 'store/intial-data';

function NewPlantsModal(props: { show: boolean, onClose: Function }) {
  
    const {state, dispatch}  = useContext(store);
    const plantSources = Object.values(state.entities.plants)
      .filter(p => p.stage === stages.Inventory && p.cloneGroup && p.room === state.ui.modal?.props.room)

    const plantsByCloneGroup = groupBy(plantSources, p => p.cloneGroup as string)

    const [plantRequest, setPlantRequests] = useState(Object.keys(plantsByCloneGroup)
      .reduce<{[key:string]: any}>((p, k) => { p[k] = { quantity: 0, destroyLeftovers: false}; return p}, {}))

    const handleClose = () => {
      props.onClose();
      const newPlantRequests = Object.entries(plantRequest).map(([k,v]) => ({
        sourceCloneGroupId: k,
        quantity: v.quantity,
        targetRoomId: VEG_ROOM_1,
        destroyLeftovers:  v.destroyLeftovers,
        sourceRoomId: state.ui.modal?.props.room
      }))

      dispatch(createPlants.createAction(newPlantRequests))
    }
    const update = (plantId: string, property: string, value: string | boolean) => {
      let thisRequest = {...plantRequest[plantId], ...{[property]: value}}
      setPlantRequests({...plantRequest, ...{ [plantId]: thisRequest }})
    }

    const cloneSources = Object.entries(plantsByCloneGroup).map(([k,v]) =>({ 
      id: k,
      strain: state.entities.strains[v[0].strain],
      quantity: v.length
    }))
    
    // const plantsByStrain = plantSources.map(p => denormPlant(state, p))
    const tableRows = cloneSources.map((s) => (
      <tr key={s.id}>
        <td>{s.id}</td>
        <td>{s.strain.name}</td>
        <td>{s.quantity}</td>
        <td>
          <input type="number" name="quantity" value={plantRequest[s.id].quantity} onChange={(e) => update(s.id, e.target.name, e.target.value)}/>
        </td>
        <td>
          {s.quantity - plantRequest[s.id].quantity}
        </td>
        <td>
          <input type="checkbox" name="destroyLeftovers" checked={plantRequest[s.id].destroyLeftovers} onChange={(e) => update(s.id, e.target.name, e.target.checked)} />
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
                    Id #
                  </th>
                  <th>
                    Strain
                  </th>
                  <th>
                    Source Qty
                  </th>
                  <th>
                    New Plants
                  </th>
                  <th>
                    Left Over
                  </th>
                  <th>
                    Destroy Left Overs?
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

export default NewPlantsModal
  