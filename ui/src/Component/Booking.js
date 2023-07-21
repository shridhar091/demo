import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { startGetAllStations } from "../Actions/stationAction";
import { startBooking } from "../Actions/bookingAction";

const Booking = (props) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  useEffect(() => {
    dispatch(startGetAllStations());
  }, []);

  const ports = useSelector((state) => {
    return state.station.data;
  });

  const formData = {
    amount: amount,
    startDateTime:startDateTime,
    endDateTime:endDateTime
  };

  const handleBooking=(e)=>{
    e.preventDefault()
    dispatch(startBooking(formData))
    alert('Booked sucessfully')
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h1>Book your slot</h1>
            <div className="card shadow">
              <div className="card-body"></div>
              <form onSubmit={handleBooking}>
                <div className="mb-3">
                  <label className="form-label">Choose your Port type</label>
                  <br />
                  <select>
                    {ports.map((port) => {
                      return (
                        <div>
                          {port.chargingOptions.map((chargingOption) => {
                            console.log(chargingOption.portType, "type");
                            return <option key={chargingOption._id}>{chargingOption.portType}</option>;
                          })}
                        </div>
                      );
                    })}
                  </select>
                  <br /> 
                </div>
                <div className="mb-3 form-check">
                  <label htmlFor="startDateTime">Start Date and Time:</label>
                  <input
                    type="datetime-local"
                    id="startDateTime"
                    name="startDateTime"
                    value={startDateTime}
                    onChange={(e)=>setStartDateTime(e.target.value)}
                  />
                  <br />
                </div>
                <div>
                  <label htmlFor="endDateTime">End Date and Time:</label>
                  <input
                    type="datetime-local"
                    id="endDateTime"
                    name="endDateTime"
                    value={endDateTime}
                    onChange={(e)=>setEndDateTime(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    type="String"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};
export default Booking;
