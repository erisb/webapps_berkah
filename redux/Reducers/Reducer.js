import { combineReducers } from 'redux';

const INITIAL_STATE = {
    username : '',
    userID : '',
    status : 'MANTAP',
    token : '',
    token_type : '',
    status_user: ''
};

const AuthReducer = ( state = INITIAL_STATE, action ) => {
    switch(action.type){
        default:
            return state;
        case 'LOGIN':
            let newState = Object.assign({},state,{
                username : action.payload.username,
                userID:action.payload.id_user,
                token : action.payload.token,
                token_type : action.payload.token_type,
                status : 'SUCCESS',
                status_user: action.payload.status_user
            })
            return newState;
        case 'LOGOUT':
            return INITIAL_STATE;
    }
};

const rootReducer = combineReducers({
    auth :  AuthReducer
});

export default rootReducer;