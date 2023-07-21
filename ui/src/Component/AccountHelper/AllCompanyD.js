import React, { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startDeleteCompany, startGetAllCompany } from "../../Actions/companyAction"
import { Modal,ModalBody,ModalHeader } from "reactstrap"
import Company from "../Company"
const AllCompanyD = (props) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [edit, setEdit] = useState({})
    const dispatch = useDispatch()
    const company = useSelector(state => state.company.data)
    
    useEffect(() => {
        dispatch(startGetAllCompany())
    }, [dispatch])
    //Delete company
    const handleDelete=(id)=>{
        dispatch(startDeleteCompany(id))
    }
    //Edit company
    const handleEdit=(ele)=>{
        toggle()
        setEdit(ele)
    }
    return (
        <div className="card shodow">
            <div className="card-body">
            {company.length!==0 ?<div> <h3>List Of All Company({company.length})</h3>
                <table >
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>PortType</th>
                        </tr>
                    </thead>
                    <tbody>
                        { company.map((ele, i) => {
                            return <tr key={i}><td>{i + 1}</td><td>{ele.name}</td><td><select className="form-select">
                                {ele.chargingOption.map((port, i) => {
                                    return <option key={i}>{port.portType}</option>
                                })}
                            </select></td>
                                <td className="btn btn-secondary" onClick={(e) => { handleEdit(ele) }}>Edit</td>
                                <td className="btn btn-danger" onClick={(e) => { handleDelete(ele._id) }}>Delete</td>
                            </tr>
                        })}
                    </tbody>
                </table>
                </div>: <h2>No Company Found</h2>}
                {/* {company.map(ele=>{
            return <ul key={ele._id}>
                <li>{ele.name}</li>
            </ul>
        })} */}
            </div>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Edit Company</ModalHeader>
                <ModalBody >
                    <div className="col-md-12">
                        <Company data={edit} toggle={toggle} />
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default AllCompanyD