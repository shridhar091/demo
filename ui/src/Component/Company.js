import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startAddCompany } from '../Actions/companyAction';

const Company = (props) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [chargingOptions, setChargingOptions] = useState([{ portType: '' }]);
    //charging option on change
    const handleChangeOption = (index, value) => {
        const options = [...chargingOptions];
        options[index].portType = value;
        setChargingOptions(options);
    };

    //add multiple input chargingoptions
    const handleAddOption = () => {
        setChargingOptions([...chargingOptions, { portType: '' }]);
    };

    //remove added input charging option
    const handleRemoveOption = (index) => {
        const options = [...chargingOptions];
        options.splice(index, 1);
        setChargingOptions(options);
    };

    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // Create an object with the form data
        const formData = {
            name,
            chargingOption: chargingOptions
        };

        // Reset the form
        const reset = () => {
            setName('');
            setChargingOptions([{ portType: '' }]);
        }
        //  send it to a server
        dispatch(startAddCompany(formData, reset))

    };
    console.log(props);
    //props from AllCompanyD and edit
    // useEffect(()=>{
    //     setName(props.data.name || "")
    //     setChargingOptions(props.data.chargingOption || [{portType:""}])
    // },[props.data])
    return (
        <div className='container'>
            <div className="card shodow">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Charging Options</label>
                            {chargingOptions.map((option, index) => (
                                <div key={index} className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={option.portType}
                                        onChange={(e) => handleChangeOption(index, e.target.value)}
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
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Company;
