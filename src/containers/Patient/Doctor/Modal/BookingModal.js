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

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
        }
    }

    async componentDidMount() {
        this.props.getGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.lang;

        if (data && data.length > 0) {
            data.map(item => {
                let obj = {};
                obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                Object.value = item.keyMap;
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

    handleChangeSelect = () => {
    }

    render() {
        // toggle={ };
        let {isOpenModalBooking, closeBookingModal, dataTime} = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
        console.log(">>> check state genders: ", this.state);
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
                            Thông tin đặt lịch khám bệnh
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
                                    Họ và tên
                                </label>
                                <input className='form-control'
                                value={this.state.fullName}
                                onChange={(event)=> this.handleOnchangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    Số điện thoại
                                </label>
                                <input className='form-control'
                                value={this.state.phoneNumber}
                                onChange={(event)=> this.handleOnchangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    Địa chỉ Email
                                </label>
                                <input className='form-control'
                                value={this.state.address}
                                onChange={(event)=> this.handleOnchangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    Địa chỉ liên hệ
                                </label>
                                <input className='form-control'
                                value={this.state.phoneNumber}
                                onChange={(event)=> this.handleOnchangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>
                                    Lý do khám
                                </label>
                                <input className='form-control'
                                value={this.state.reason}
                                onChange={(event)=> this.handleOnchangeInput(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    Đặt cho ai
                                </label>
                                <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    Giới tính
                                </label>
                                <select
                                value={this.state.selectedGender}
                                onChange={this.handleChangeSelect}
                                options={this.state.gender}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    Ngày sinh
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
                        onClick={closeBookingModal}>Xác nhận</button>
                        <button
                        onClick={closeBookingModal}
                        className='btn-booking-cancel'>Hủy</button>
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
