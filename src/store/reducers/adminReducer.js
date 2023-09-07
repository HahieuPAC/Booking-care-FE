import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    isLoadingGender: false,
    genders: [],
    role: [],
    position: [],
    
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: 
            let copyStateStart = {...state};
            copyStateStart.isLoadingGender = true; 
            console.log('fire fetch gender start: ', action)
            return {
                ...copyStateStart
            }
        case actionTypes.FETCH_GENDER_SUCCESS: 
            let copyState = {...state};
            copyState.genders = action.data;
            copyState.isLoadingGender = false; 
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_FAILED: 
        let copyStateFailed = {...state};
            copyStateFailed.isLoadingGender = false; 
            copyStateFailed.genders = [];
            return {
                ...copyStateFailed
            }
    
    
        default:
                return state;
        }
}

export default adminReducer;