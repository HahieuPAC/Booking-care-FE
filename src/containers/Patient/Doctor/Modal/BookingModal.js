import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./BookingModal.scss";
import { Modal, ModalHeader } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import userService from '../../../../services/userService';
import { ToastContainer, toast } from 'react-toastify';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
        }
    }

    async componentDidMount() {
        await this.props.getGenders();
        console.log("check state in did mount: ", this.state)
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.lang;

        if (data && data.length > 0) {
            data.map(item => {
                let obj = {};
                obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                obj.value = item.keyMap;
                result.push(obj);
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props.lang !== prevProps.lang) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    showHideDetailInfoDoctor = (status) => {
        this.setState({
            isShowDetail: status,
        })
    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = {...this.state};
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChargeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })   
    }

    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();
        //validate input
        let res = await userService.postPatientBookingAppointment({
            
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            email: this.state.email,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,

        })

        if (res && res.errCode === 0) {
            toast.success('Booking BookingAppointment succeed')
        }
        else {
            toast.error('Booking BookingAppointment error')
        }

        console.log(">> check state: ", this.state)
    }

    render() {
        // toggle={ };
        let {isOpenModalBooking, closeBookingModal, dataTime} = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
        return (    
            <Modal 
                centered
                isOpen={isOpenModalBooking}  
                className={'Booking-modal-container'}
                size='lg'
            >
                < div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span 
                            className='right'
                            onClick={closeBookingModal}
                        ><i className="fas fa-times"></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-info'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor ={false}
                                dataTime = {dataTime}
                                />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>
                                <FormattedMessage id="patient.booking-modal.fullName" />
                                </label>
                                <input className='form-control'
                                value={this.state.fullName}
                                onChange={(event)=> this.handleOnchangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                <FormattedMessage id="patient.booking-modal.phone-number" />
                                </label>
                                <input className='form-control'
                                value={this.state.phoneNumber}
                                onChange={(event)=> this.handleOnchangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                <FormattedMessage id="patient.booking-modal.email" />
                                </label>
                                <input className='form-control'
                                value={this.state.email}
                                onChange={(event)=> this.handleOnchangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                <FormattedMessage id="patient.booking-modal.address" />
                                </label>
                                <input className='form-control'
                                value={this.state.address}
                                onChange={(event)=> this.handleOnchangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>
                                <FormattedMessage id="patient.booking-modal.reason" />
                                </label>
                                <input className='form-control'
                                value={this.state.reason}
                                onChange={(event)=> this.handleOnchangeInput(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                <FormattedMessage id="patient.booking-modal.schedule-for" />
                                </label>
                                <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                <FormattedMessage id="patient.booking-modal.gender" />
                                </label>
                                <Select
                                value={this.state.selectedGender}
                                onChange={this.handleChangeSelect}
                                options={this.state.genders}
                            />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                <FormattedMessage id="patient.booking-modal.birthday" />
                                </label>
                                <DatePicker
                                className="form-control"
                                onChange = {this.handleOnChargeDatePicker}
                                value = {this.state.birthday}
                            />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                        onClick={this.handleConfirmBooking}>
                            <FormattedMessage id="patient.booking-modal.confirm" />
                            </button>
                        <button
                        onClick={closeBookingModal}
                        className='btn-booking-cancel'><FormattedMessage id="patient.booking-modal.cancel" /></button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        genders: state.admin.genders,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
