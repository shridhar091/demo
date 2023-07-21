import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StartEditStation, startRegisterStation } from '../Actions/stationAction';

const Station = (props) => {
    //console.log(props.data.chargingOptions.map(ele=>ele._id));
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [chargingOptions, setChargingOptions] = useState([{ portType: '' }]);
    //const [unit, setUnit] = useState('');
    const [staff, setStaff] = useState('');
    const [chargingOptionId, setChargingOptionIds] = useState('')


    useEffect(() => {
        if (props.data) {
            setName(props.data.name || "")
            setAddress(props.data.address || "")
            setLandmark(props.data.landmark || "")
            setLatitude(props.data.geo.latitude || "")
            setLongitude(props.data.geo.longitude || "")
            setChargingOptions(props.data.chargingOptions || [{ portType: "" }])
            setStaff(props.data.staff || "")
            // Extract chargingOptions IDs
            const chargingOptionIds = props.data.chargingOptions.map((option) => option._id);
            setChargingOptionIds(chargingOptionIds);
        }

    }, [props.data])
    const dispatch = useDispatch()

    const handleChangeOption = (index, value) => {
        const options = [...chargingOptions];
        options[index].portType = value;
        setChargingOptions(options);
    };

    const handleAddOption = () => {
        setChargingOptions([...chargingOptions, { portType: '' }]);
    };

    const handleRemoveOption = (index) => {
        const options = [...chargingOptions];
        options.splice(index, 1);
        setChargingOptions(options);
    };
    const handleLocation = (e) => {
        e.preventDefault()
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create an object with the form data
        const formData = {
            name,
            address,
            landmark,
            geo: {
                latitude,
                longitude
            },
            chargingOptions,
            // : [
            //     {
            //         portType
            //     }
            // ],
            staff
        };
        console.log(formData);
        // Reset the form
        const resetForm = () => {
            setName('');
            setAddress('');
            setLandmark('');
            setLatitude('');
            setLongitude('');
            setChargingOptions([{ portType: '' }]);
            //setUnit('');
            setStaff('');
        }
        // send it to a server
        if (props.data) {
            dispatch(StartEditStation(props.data._id, chargingOptionId, formData))
            props.toggle()
        } else {
            dispatch(startRegisterStation(formData, resetForm))
        }
    }



    return (
        <div className="container">
            <h2>Add Station</h2>
            <div className="card shodow divWidth" >
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="form-label text-left" >Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                className="form-control inputBorder"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                className="form-control"
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="landmark">Landmark</label>
                            <input
                                type="text"
                                id="landmark"
                                value={landmark}
                                className="form-control"
                                onChange={(e) => setLandmark(e.target.value)}
                                required
                            />
                        </div>
                        {latitude.length === 0 && longitude.length === 0 ? <div>
                            <label htmlFor='submit' >Station Location</label><br />
                            <input type='submit'
                                value='Location'
                                className='btn btn-primary'
                                onClick={handleLocation}
                                required
                            />
                        </div> : <div>
                            <label htmlFor='submit' >Station Location</label><br />
                            {props.data ? <input type='submit'
                                value='Location'
                                className='btn btn-primary'
                                onClick={handleLocation}
                                required

                            /> : <input type='submit'
                                value='Location'
                                className='btn btn-primary'
                                onClick={handleLocation}
                                required
                                disabled
                            />}
                        </div>}
                        {/* <div>
                            <label htmlFor="latitude">Latitude</label>
                            <input
                                type="text"
                                id="latitude"
                                value={latitude}
                                className="form-control"
                                onChange={(e) => setLatitude(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="longitude">Longitude</label>
                            <input
                                type="text"
                                id="longitude"
                                value={longitude}
                                className="form-control"
                                onChange={(e) => setLongitude(e.target.value)}
                            />
                        </div> */}
                        {/* <div className="mb-3">
                            <label htmlFor="portType" className="form-label">
                                Port Type
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="portType"
                                value={portType}
                                onChange={(e) => setPortType(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="unit" className="form-label">
                                Unit
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="unit"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                            />
                        </div> */}
                        <div>
                            <label className="form-label labelFont" >ChargingOptions(portTypes)</label>
                            {chargingOptions.map((option, index) => (
                                <div key={index} className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={option.portType}
                                        onChange={(e) => handleChangeOption(index, e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveOption(index)}

                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddOption}
                            >
                                Add Option
                            </button>
                        </div>
                        {/* <div>
                                <label htmlFor="unit">Unit</label>
                                <input
                                    type="text"
                                    id="unit"
                                    value={unit}
                                    className="form-control"
                                    onChange={(e) => setUnit(e.target.value)}
                                />
                            </div> */}
                        <div>
                            <label htmlFor="staff">Staff</label>
                            <input
                                type="text"
                                id="staff"
                                value={staff}
                                className="form-control"
                                onChange={(e) => setStaff(e.target.value)}
                            />
                        </div>

                        <button type="submit" className='btn btn-primary'>{props.data ? 'Edit' : "Submit"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Station;