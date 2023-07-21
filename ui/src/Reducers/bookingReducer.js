import { ADD_BOOKING } from "../Actions/bookingAction"

const intialbooking={error:'',data:[]}

export const bookingReducer=(state=intialbooking,action)=>{
    switch (action.type){
        case ADD_BOOKING:{
            return {...state,data:{...state.data, ...action.payload}}
        }

        default:{
            return {...state}
        }
    }
}