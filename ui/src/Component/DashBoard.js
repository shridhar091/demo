import React from "react"
import Station from "./Station"
import Company from "./Company"
const DashBoard=(props)=>{
    return(
        <div className="container">
            <h1>Admin DashBoard</h1>
        <div className="row">
            <div className="col-md-4">
                <Company />
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-4">
                
            <Station />
            </div>

        </div>
    </div>
    )
}

export default DashBoard