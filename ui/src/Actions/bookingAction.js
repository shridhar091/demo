import axios from "../confi_axios/axios";
export const ADD_BOOKING='ADD_BOOKING'

export const setBooking=(data)=>{
     return{
        type:ADD_BOOKING,
        payload:data
     }
}

export const startBooking=(formData)=>{
    return(dispatch)=>{
        (
            async ()=>{
                try {
                    const booking=await axios.post('/api/booking',formData,{headers:{'Authorization':localStorage.getItem('token')}})
                    console.log(booking,'booking')
                    dispatch(setBooking(booking.data))
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}