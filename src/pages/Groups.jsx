import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import { Form, FormGroup, Button, Table, Modal } from 'react-bootstrap'

import {getEmployees, createGroup, getGroups} from '../redux/actions/userAction'

import SideNav from '../components/SideNav'
import Group from '../components/Group'


const Groups = () => {
    const userData = useSelector(store => store.userRoot)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [groupName, setGroupName] = useState("")
    const [checkedValue, setCheckedValue] = useState([])

    const handleInputChange = (e) => {
       
        const tempCheck = checkedValue
        let index
        if (e.target.checked) {
            tempCheck.push(e.target.value)
        }
        else {
            index = tempCheck.indexOf(e.target.value)
            tempCheck.splice(index, 1)
        }
        setCheckedValue(tempCheck)
    }

    useEffect(() => {
        if (userData.employees.length === 0) {
            dispatch(getEmployees())
        }
        if (userData.groups.length === 0) {
           // dispatch(getGroups())
        }
    }, [])

    

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createGroup({user:checkedValue, challengetype: "idea", name: groupName}))
    }

    



    return (

        <>
            <Modal show={show} size="lg" onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>CREATE NEW GROUP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Form.Label>Group name</Form.Label>
                            <Form.Control value={groupName} onChange={e => setGroupName(e.target.value)} type="text" />
                        </FormGroup>
                        <FormGroup>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th className="text-center">First Name</th>
                                        <th className="text-center">Last Name</th>
                                        <th className="text-center">email</th>
                                        <th className="text-center">Role</th>
                                        <th className="text-center">Add</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.employees.length !== 0 ? userData.employees.map((emp, index) =>
                                        
                                        <Group key={emp._id} index={index + 1} handleInputChange={handleInputChange} employee={emp} />

                                        ) : <h1>No Empoloyee Found</h1>}
                                </tbody>
                            </Table>
                        </FormGroup>

                        <Button type="submit" variant="primary">Add Group</Button>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
          </Button>
                </Modal.Footer>
            </Modal>

            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-2">
                        <SideNav />

                    </div>
                    <div className="col-md-8">
                        <h1 className="display-4">Groups</h1>


                    </div>
                    <div className="col-md-2 mt-3">
                        <Button variant="primary" onClick={() => setShow(true)}>
                            Add New Group
                         </Button>

                    </div>
                </div>


            </div>
        </>

    )
}

export default Groups
