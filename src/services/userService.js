import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('api/login', {email: userEmail, password: userPassword});
}
const getAllUser = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`);
}

const createNewUserService = (data) => {
    console.log(">>> Check create data: ", data)
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', { 
        data: {
            id: userId
        }});
}

const editUserService = (data) => {
    console.log(" check data editUserService: ", data);
    console.log(">> check : ", data.id ,data.roleId,data.positionId ,data.gender)
    return axios.put('/api/edit-user', data)
}

const getAllCodeService = (data) => {
    return axios.get(`/api/allcode?type=${data}`);
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`po`);
}

export default { handleLoginApi, 
    getAllUser,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService}