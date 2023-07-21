
import axios from '../confi_axios/axios';
export const GET_USER = 'GET_USER'
export const USER_INFO='USER_INFO'
export const startRegisterUser = (formdata, props) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const user = await axios.post(`/user/register`, formdata)
                    if (user.data._id) {
                       props.props.history.push('/login')
                    }
                    else if (user.data._message) {
                        alert(user.data._message)
                    }
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}

export const setUserInfo=(data)=>{
    return{
        type:USER_INFO,
        payload:data
    }
}

export const startLoginUser = (formdata, reset, history) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const user = await axios.post(`/user/login`, formdata)
                    console.log(user);
                    if (user.data.token) {
                        localStorage.setItem('token', user.data.token)
                        history.push('/')
                        reset()
                        if (user.data.token) {
                            const user=await axios.get('user/info',{headers:{'Authorization':localStorage.getItem('token')}})
                            dispatch(setUserInfo(user.data))
                        }
                    }
                } catch (error) {
                    alert(error)
                }
            }
        )()

    }
}

export const setAllUser=(data)=>{
    return{
        type:GET_USER,
        payload:data
    }
}
export const startAllUserInfo=()=>{
    return(dispatch)=>{
        (
            async()=>{
                try {
                    const user=await axios.get('user/list',{headers:{'Authorization':localStorage.getItem('token')}})
                    dispatch(setAllUser(user.data))
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}