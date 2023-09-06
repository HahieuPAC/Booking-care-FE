import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    genders: [],
    role: [],
    position: [],
    
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: 
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS: 
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED: 
            return {
                ...state
            }
    
    
        default:
                return state;
        }
}

export default adminReducer;