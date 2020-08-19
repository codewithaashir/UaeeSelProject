/* eslint-disable prettier/prettier */
//actions
export const ADD_SIGNUP_DATA = 'ADD_SIGNUP_DATA';
export const CLEAR_SIGNUP_DATA = 'CLEAR_SIGNUP_DATA';
export const CLEAR_SIGNUP_DETAILS = 'CLEAR_SIGNUP_DETAILS';
//action creators
export function addsignupdata(data) {
    return {
        type: ADD_SIGNUP_DATA,
        data,
    };
}

export function clearsignupdata() {
    return {
        type: CLEAR_SIGNUP_DATA,
    };
}
export function clearsignupdetails() {
    return {
        type: CLEAR_SIGNUP_DETAILS,
    };
}

//global state
let data = {
    f_name: '',
    l_name:'',
    date_of_birth: '',
    password: '',
    phone_no: '',
    email: '',
    avatar: '',
    gender: '',
};

//reducer
function signUpReducer(state = data, action) {
    switch (action.type) {
        case ADD_SIGNUP_DATA:
            return {
                ...state,
                [action.data.name]: action.data.value,
            };
        case CLEAR_SIGNUP_DETAILS:
            return {
                ...state,
                f_name: '',
                l_name:'',
                date_of_birth: '',
                password: '',
                phone_no: '',
                email: '',
                avatar: '',
                gender: '',
            };

        case CLEAR_SIGNUP_DATA:
            return {
                ...state,
                f_name: '',
                l_name:'',
                date_of_birth: '',
                password: '',
                phone_no: '',
                email: '',
                avatar: '',
                gender: '',
            };
        default:
            return state;
    }
}
export default signUpReducer;
