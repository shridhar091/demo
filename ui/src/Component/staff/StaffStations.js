import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  startStaffStation } from "../../Actions/stationAction";
import jwtDecode from "jwt-decode"; 
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Booking from "../Booking";
import Station from "../Station";
const StaffStations = (props) => {
    const [modal,setModal]=useState(false)
    const toggle=()=>setModal(!modal)
    const [book,setHandleBook]=useState({})
    const token = localStorage.getItem('token')
    let tokendata
    if (token) {
        tokendata = jwtDecode(token)
    }
 
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startStaffStation(tokendata.name))
    }, [dispatch])
    const staff = useSelector((state) => {
        return state.station.data
    })
    console.log(staff);
    const handleBook=(ele)=>{
        toggle()
        setHandleBook(ele)

    }
    return (
        <div className="card shodow divWidth">
            <div className="card-body ">
                <table className="table-responsive">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>address</th>
                            <th>Landmark</th>
                            <th>Location</th>
                            <th>portTypes</th>
                            <th>Staff</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map((ele, i) => {
                            return <tr key={i}>
                                <td>{ele.name}</td>
                                <td>{ele.address}</td>
                                <td>{ele.landmark}</td>
                                <td>{ele.geo.latitude},{ele.geo.longitude}</td>
                                <td><select>
                                    {ele.chargingOptions.map((portType, i) => {
                                        return <option key={i}>{portType.portType}</option>
                                    })
                                    }
                                </select></td>
                                <td>{ele.staff}</td>
                                <td>
                                <button onClick={()=>{handleBook(ele)}}>Book</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <Modal>
                <ModalHeader isOpen={modal} toggle={toggle}>Book </ModalHeader>
                    <ModalBody toggle={toggle}>
                        <div className="col-md-12">
                        <Station data={book} toggle={toggle}/>
                        </div>
                    </ModalBody>
            </Modal>
        </div>
    )
}
export default StaffStations