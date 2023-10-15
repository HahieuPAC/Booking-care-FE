import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import "./DoctorSchedule.scss";
import userService from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays : [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }


    async componentDidMount() {
        let language = this.props.lang;
        let allDays = this.getArrDays(language);
        this.setState({
            allDays: allDays,
        })
    }


    capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


    getArrDays =  (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM =  moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                }
                else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi);
                }

            }
            else {
                if (i === 0) {
                    let ddMM =  moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                }
                else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object);
        }

        return allDays
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.lang !== this.props.lang) {
            let allDays = this.getArrDays(this.props.lang);
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.lang);
            let res= await userService.getScheduleByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvailableTime : res.data? res.data : []
            })
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
        }
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time})
        console.log(">> check time: ", time);
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false})
    }

    render() {
        let {allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal} = this.state;
        let language = this.props.lang;

        return (    
            <>
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
                                <i class="fas fa-calendar-alt">
                                    <span><FormattedMessage id="patient.detail-doctor.schedule" />
                                    </span>
                                </i>
                            </div>
                            <div className='time-content'>
                                {allAvailableTime && allAvailableTime.length > 0 ?
                                allAvailableTime.map((item, index) => {
                                    let timeDisplay = language === LANGUAGES.VI ? 
                                    item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                    return (
                                        <button 
                                            key={index}
                                            onClick={()=> this.handleClickScheduleTime(item)}
                                            >{timeDisplay}
                                        </button>
                                    )
                                })  
                            : <div>Bac si khong co lich hen trong thoi gian nay</div>
                            }
                            </div>
                    </div>
                </div>
                <BookingModal
                isOpenModalBooking = {isOpenModalBooking}
                closeBookingModal={this.closeBookingModal}
                dataTime= {dataScheduleTimeModal}
                
                />
            </>
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
