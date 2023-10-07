import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as action from "../../../store/actions";
import { LANGUAGES, dateFormat} from '../../../utils';
import userService from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash';


class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: "",
            rangeTime: [],
        }
    }

    componentDidMount() {
        this.props.getAllDoctorRedux();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allScheduleTimes !== this.props.allScheduleTimes) {
            let data = this.props.allScheduleTimes;
            if (data && data.length > 0) {
                data = data.map(item => ({...item, isSelected: false}))
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
            let labelVi = `${item.lastName} ${item.firstName}`;
            let labelEn = `${item.firstName} ${item.lastName}`;
            object.label = this.props.lang === LANGUAGES.VI ? labelVi : labelEn;
            object.value = item.id;
            result.push(object);
            })
        }
        return result;
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor }
            // ,() => console.log(`Option selected:`, this.state.selectedDoctor)
        );
        let response = await userService.getDetailInfoDoctor(selectedDoctor.value)
        if (response && response.errCode === 0 && response.data && response.data.Markdown) {
            let markdown = response.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            })
        }
        else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",
                hasOldData: false
            })
        }
    };

    handleOnChargeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let {rangeTime} = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
        
    }

    handleSaveSchedule = async () => {
        let result = [];
        let {rangeTime, selectedDoctor, currentDate} = this.state;
        if(!currentDate) {
            toast.error("Invalid Date");
            return
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid select doctor");
            return
        }
        // let fomatedDate = currentDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        // let fomatedDate = currentDate = moment(currentDate).unix;
        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime = selectedTime.map(item => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = item.keyMap;
                    result.push(object);
                })
                
            } 
            else {
                toast.error("Invalid selected time");
            }
        }
        console.log(">> check result: ", result)

        let response = await userService.bulkCreateSchedule({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatedDate
        });

        if (response && response.errCode === 0) {
            toast.success("saveBulkCreateSchedule complete")
        }
        else {
            toast.error("error saveBulkCreateSchedule");
            console.log("error saveBulkCreateSchedule >>> res: ", response);
        }

    }


    render() {
        let {rangeTime} = this.state;
        let language = this.props.lang;
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title"/>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6'> 
                            <label className=''>
                                <FormattedMessage id = "manage-schedule.choose-doctor"/>
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6'> 
                            <label><FormattedMessage id = "manage-schedule.choose-date"/></label>
                            <DatePicker
                                className="form-control"
                                onChange = {this.handleOnChargeDatePicker}
                                value = {this.state.currentDate}
                                minDate = {yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button 
                                            className= {item.isSelected === true ? "btn btn-schedule active" : 'btn btn-schedule'}
                                            key = {index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                            >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button 
                                className='btn btn-primary btn btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                                
                                >
                                <FormattedMessage id = "manage-schedule.save"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        allScheduleTimes: state.admin.allTimes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux: () => dispatch(action.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(action.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
