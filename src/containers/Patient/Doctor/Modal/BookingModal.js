import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./BookingModal.scss";
import { Modal, ModalHeader } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {

            }
        }

    async componentDidMount() {
        
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props.lang !== prevProps.lang) {
            
        }
    }

    showHideDetailInfoDoctor = (status) => {
        this.setState({
            isShowDetail: status,
        })
    }

    render() {
        // toggle={ };
        let {isOpenModalBooking, closeBookingModal, dataTime} = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
        console.log(">>> check data props from modal: ", this.props)
        console.log(">>> check doctorID: ", doctorId)
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
                                />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>
                                    Họ và tên
                                </label>
                                <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    Số điện thoại
                                </label>
                                <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    Địa chỉ Email
                                </label>
                                <input type="email" className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    Địa chỉ liên hệ
                                </label>
                                <input className='form-control'/>
                            </div>
                            <div className='col-12 form-group'>
                                <label>
                                    Lý do khám
                                </label>
                                <input className='form-control'/>
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
                                <input className='form-control'/>
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

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);