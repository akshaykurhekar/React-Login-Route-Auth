const iState ={
    name:"akshay",
    isAuth:false
}

const reducer = (state=iState, action) => {
    if(action.type === 'CHANGE_NAME'){
        return{
            ...state,
            isAuth: action.payload
        }
    }
    return state; 
}

export default reducer;