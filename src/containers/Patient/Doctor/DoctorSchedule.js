import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import "./DoctorSchedule.scss";
import userService from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi'

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays : [],
            allAvailableTime: []
        }
    }


    async componentDidMount() {
        let language = this.props.lang;
        console.log(moment(new Date()).format('dddd - DD/MM'));
        console.log(moment(new Date()).locale('en').format('ddd - DD/MM'));
        this.setArrDays(language);
    }

    setArrDays =  (language) => {
        let arrDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            }
            else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            arrDays.push(object);
        }
        this.setState({
            allDays: arrDays
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.lang !== this.props.lang) {
            this.setArrDays(this.props.lang)
        }
    }

    handleOnchangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res= await userService.getScheduleByDate(doctorId, date);
            let allTimes = [];
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            } 
            console.log("check res getScheduleByDate: ", res)
    
        }
    }


    render() {
        let {allDays, allAvailableTime} = this.state;
        // let language = this.props.lang;

        return (    
            <div className='doctor-schedule-container'> 
                <div className='all-schedule'>
                    <select 
                    onChange={(event) => this.handleOnchangeSelect(event)}
                    className=''>
                        {allDays && allDays.length > 0 &&
                        allDays.map((item, index) => {
                            return (
                                <option 
                                    value={item.value} 
                                    key={index}
                                >
                                        {item.label}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className='all-available-time'>
                        <div className='text-calender'>
                            <i class="fas fa-calendar-alt"><span>Lịch khám</span></i>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 &&
                            allAvailableTime.map((item, index) => {
                                return (
                                    <button key={index}>{item.date}</button>
                                )
                            })}
                        </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
