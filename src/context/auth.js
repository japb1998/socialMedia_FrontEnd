import React,{useReducer,createContext} from 'react';
import jwtDecode from 'jwt-decode';


//initial State
const initialState = {
    user:null,
};


//if localStorage have a token
if(localStorage.getItem('jwtToken')){
const token = jwtDecode(localStorage.getItem('jwtToken'));
//if token is still valid
if(token.exp * 1000 < Date.now()){
    localStorage.removeItem('jwtToken');
} else {
    initialState.user = token;
    // console.log(token)
}
}

//create context and set a default value
const AuthContext = createContext({
    user:null,
    login:(userData)=>{},
    logout:()=>{}
});

//reducer
function authReducer(state,action){
    switch(action.type){
        case 'LOGIN':return {
            ...state,
            user:action.payload
        }
        case 'LOGOUT':
          return   {
...state, user:null
            }

        default:
            return state
    }
}

function AuthProvider(props){
    const [state,dispatch] = useReducer(authReducer,initialState);
    function login(userData){
localStorage.setItem('jwtToken',userData.token)
        dispatch({
            type:'LOGIN',
            payload:userData
        })
    };

    function logout(){
        localStorage.removeItem('jwtToken');
        dispatch({
            type:'LOGOUT'
        })
    }

    return (<AuthContext.Provider value={{user:state.user,login,logout}}{...props}></AuthContext.Provider>)
}

export {AuthContext, AuthProvider}