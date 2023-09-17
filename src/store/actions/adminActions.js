import actionTypes from './actionTypes';
import userService from '../../services/userService';
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type:actionTypes.FETCH_GENDER_START
            })
            let res = await userService.getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }
            else
            {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log("fetchgenderstart: ",error)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }
            else
            {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log("fetchPositionStart: ",error)
        }
    }
}


export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }
            else
            {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log("fetchRoleStart: ",error)
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})

export const fetchRoleFailed  = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type:actionTypes.FETCH_GENDER_START
            })
            let res = await userService.createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user success");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else
            {
                dispatch(saveUserFailed());
                toast.success("Create a new user failed");
            }
        } catch (error) {
            dispatch(saveUserFailed());
            console.log("saveUserFailed: ",error)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllUser("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.user.reverse()));
            }
            else
            {
                dispatch(fetchAllUserFailed());
            }
        } catch (error) {
            dispatch(fetchAllUserFailed());
            console.log("saveUserFailed: ",error)
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUserFailed = (data) => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

export const deleteAUser = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type:actionTypes.FETCH_GENDER_START
            })
            let res = await userService.deleteUserService(id);
            if (res && res.errCode === 0) {
                toast.success("Delete user success");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else
            {
                dispatch(deleteUserFailed());
                toast.error("Delete user failed");
            }
        } catch (error) {
            dispatch(deleteUserFailed());
            console.log("saveUserFailed: ",error)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.editUserService(data);
            console.log(">>> check res Edit: ", res);
            
            if (res && res.errCode === 0) {
                toast.success("Update user success");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else
            {
                dispatch(editUserFailed());
                toast.error("Edit user failed");
            }
        } catch (error) {
            toast.error("Edit user failed");
            dispatch(editUserFailed());
            console.log("saveUserFailed: ",error)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let users = await userService.getTopDoctorHomeService("5");
            if (users && users.errCode === 0) {
                dispatch({
                    type:   actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: users.data
                })
                console.log(">> check res fetchTopDoctor: ", users.errCode);
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
            })
        }
    }
}

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let doctors = await userService.getAllDoctor();
            if (doctors && doctors.errCode === 0) {
                dispatch({
                    type:   actionTypes.FETCH_All_DOCTOR_SUCCESS,
                    dataAllDoctors: doctors.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_All_DOCTOR_FAILED,
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.FETCH_All_DOCTOR_FAILED,
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.saveDetailDoctorService(data);
            console.log(">> check log res: ", res);
            if (res && res.errCode === 0) {
                // Xử lý thành công
                toast.success("Save detail doctor success");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                // Xử lý lỗi
                toast.error("Save detail doctor error");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
            
        } catch (error) {
            toast.success("Save detail doctor error");
            console.log(error);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}