import { ADD_COMPANY, DELETE_COMPANY } from "../Actions/companyAction";
import { GET_COMPANY } from "../Actions/companyAction";
const initialCompany = { error: '', data: [] }

export const companyReducer = (state = initialCompany, action) => {
    switch (action.type) {
        //post
        case ADD_COMPANY: {
            return { ...state, data: [...state.data,action.payload]}
        }
        //get
        case GET_COMPANY:{
            return{...state,data:action.payload}
        }
        case DELETE_COMPANY:{
            const result=state.data.filter(ele=>ele._id!==action.payload._id)
            return{...state,data:result}
        }
        default: {
            return { ...state }
        }
    }
}
