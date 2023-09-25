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
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctor  = () => {
    return axios.get(`/api/get-all-doctor`);
}

const saveDetailDoctorService = (data) => {
    return axios.post("/api/save-info-doctor", data);
} 

const getDetailInfoDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
}

const bulkCreateSchedule = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
}

const getScheduleByDate  = (doctorId, date) => {
    // let momentDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
    // console("moment date: ", momentDate)
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}



export default { handleLoginApi, 
    getAllUser,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctor,
    saveDetailDoctorService,
    getDetailInfoDoctor,
    bulkCreateSchedule,
    getScheduleByDate}