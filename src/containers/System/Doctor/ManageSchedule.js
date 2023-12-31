import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as action from "../../../store/actions";
import { LANGUAGES,} from '../../../utils';
import userService from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { Button } from 'bootstrap';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: new Date(),    
            rangeTime : [],
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
        if (prevProps.allScheduleTime !== this.props.allScheduleTime){
            this.setState({
                rangeTime: this.props.allScheduleTime
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
            console.log("this.props.lang: ", this.props.lang)
            console.log("object.label: ", object.label)
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
        console.log(">>> check State: ", this.state);
    };

    handleOnChargeDatePicker = (date) => {
        this.setState({
            currentDate: date
        })
    }

    render() {
        console.log(">>> check rangeTime : ",this.state.rangeTime);
        let rangeTime= this.state.rangeTime;
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title"/>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6'> 
                            <label className=''>
                                Chon bac si
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6'> 
                            <label>Chọn ngày</label>
                            <DatePicker
                                className="form-control"
                                onChange = {this.handleOnChargeDatePicker}
                                value={this.state.currentDate[0]}
                                minDate = {new Date()}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length >0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <Button className="btn" key = {index}>{item.valueVi}</Button>
                                    )
                                })
                            }
                        </div>
                        <button className='btn btn-primary'>Lưu thông tin</button>
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
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux: () => dispatch(action.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(action.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
