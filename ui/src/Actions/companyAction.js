import axios from "../confi_axios/axios"

export const ADD_COMPANY = 'ADD_COMPANY'
export const GET_COMPANY='GET_COMPANY'
export const DELETE_COMPANY='DELETE_COMPANY'
export const setCompany = (data) => {
    return {
        type: ADD_COMPANY,
        payload: data
    }
}

export  const startAddCompany=(formdata,reset)=>{
    return(dispatch)=>{
        (
            async()=>{
                const company=await axios.post('/company/register',formdata,{headers:{'Authorization':localStorage.getItem('token')}})
                dispatch(setCompany(company.data))
                reset()
            }
        )()
    }
}
//get all company details
export const setAllCompany=(data)=>{
    return{
        type:GET_COMPANY,
        payload:data
    }
}

export const startGetAllCompany=()=>{
    return(dispatch)=>{
        (
            async()=>{
                const company=await axios.get('/company/register',{headers:{'Authorization':localStorage.getItem('token')}})
                dispatch(setAllCompany(company.data))
            }
        )()
    }
}

//Delete company based on Id
export const setDeleteCompany=(data)=>{
    return{
        type:DELETE_COMPANY,
        payload:data
    }
}
export const startDeleteCompany=(id)=>{
    return(dispatch)=>{
        (
            async()=>{
                const company=await axios.delete(`/company/delete/${id}`,{headers:{'Authorization':localStorage.getItem('token')}})
                dispatch(setDeleteCompany(company.data))
            }
        )()
    }
}