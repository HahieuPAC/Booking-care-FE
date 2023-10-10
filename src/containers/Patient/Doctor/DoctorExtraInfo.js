import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import userService from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl';
import "./DoctorExtraInfo.scss"

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: true,
        }
    }

    async componentDidMount() {
        
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props.lang !== prevProps.lang) {
            
        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let data = await userService.getExtraInfoDoctorById(this.props.doctorIdFromParent);
            console.log(">>> check getdata from doctorIdFromParent: ", data)
        }
    }

    showHideDetailInfoDoctor = (status) => {
        this.setState({
            isShowDetail: status,
        })
    }

    render() {;
        console.log(">>> check prop: ", this.props.doctorIdFromParent)
        let language = this.props.lang;
        let {isShowDetail} = this.state;

        return (    
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='address-clinic'>
                        ĐỊA CHỈ KHÁM
                    </div>
                    <div className='name-clinic'>
                        Phòng khám Chuyên khoa Da Liễu
                    </div>
                    <div className='detail-address'>
                        207 Phố Huế - Hai Bà Trưng - Hà Nội
                    </div>
                </div>
                <div className='content-down'>
                    {isShowDetail ? (
                        <>
                            <div className='title-price'>GIÁ KHÁM:</div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'>Gia kham</span>
                                    <span className='right'>250.000</span>
                                </div>

                                <div className='note'>
                                    Phòng khám hiện không áp dụng bảo hiểm bảo lạnh trực tiếp và chưa có xuất hóa đơn tài chính (hóa đơn đỏ)
                                </div>
                            </div>
                            <div className='payment'>Nguoi benh co the thanh toan qua tien mat hoc the ngan hang</div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfoDoctor(false)}>
                                    An bang gia
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className='show-price'>
                            GIÁ KHÁM: 250.000. 
                            <span onClick={() => this.showHideDetailInfoDoctor(true)}>
                                Xem chi tiet
                            </span>
                        </div>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
