
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startAllUserInfo } from "../Actions/userActions"
import AllCompanyD from "./AccountHelper/AllCompanyD"
import { AllStationD } from "./AccountHelper/AllStationD"
const Account = (props) => {
    const dispatch=useDispatch()
    const user=useSelector(state=>{
        if (state.user.data) {
            return state.user.data.filter(ele=>{
                return ele.role!=='admin'
            })
        }
    })
   
    useEffect(()=>{
        dispatch(startAllUserInfo())
    },[dispatch])

    return (
        <div className="container divPadding">
            <div className="row">
                <div className="col-md-4">
                    <div className="card shodow">
                        <div className="card-body">
                        <h3>List Of All User({user.length})</h3>
                        
                            {user.map(ele=>{
                                return <ul key={ele._id}><li >{ele.name}({ele.role})</li></ul>
                            })}
                        
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-4">
                    <div className="card shodow">
                        <div className="card-body">

                        </div>
                    </div>
                </div> */}
                <div className="col-md-6">
                        <AllCompanyD />
                </div>
            </div>

            <div className="row divPadding">
                {/* <div className="col-md-2">
                    <div className="card shodow">
                        <div className="card-body">
                        <h3>List Of All User({user.length})</h3>
                        
                            {user.map(ele=>{
                                return <ul key={ele._id}><li >{ele.name}</li></ul>
                            })}
                        
                        </div>
                    </div>
                </div> */}
                <div className="col-md-2">

                </div>
                <div className="col-md-9">
                    <AllStationD />
                </div>
            </div>
            
        </div>
    )
}
export default Account