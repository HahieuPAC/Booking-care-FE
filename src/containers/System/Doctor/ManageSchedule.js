import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as action from "../../../store/actions";
import { LANGUAGES,} from '../../../utils';
import userService from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: new Date(),
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
            this.setState({
                rangeTime: this.props.allScheduleTimes
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

    handleOnChargeDatePicker = () => {

    }

    render() {
        let {rangeTime} = this.state;
        let language = this.props.lang;
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
                                minDate = {new Date()}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className='btn btn-schedule' key = {index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn btn-save-schedule'><FormattedMessage id = "manage-schedule.save"/></button>
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
