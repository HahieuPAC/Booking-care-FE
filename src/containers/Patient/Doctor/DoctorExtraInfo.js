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
            isShowDetail: false,
            extraInfo: {

            }
        }
    }

    async componentDidMount() {
        
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props.lang !== prevProps.lang) {
            
        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await userService.getExtraInfoDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode ===0) {
                this.setState({
                    extraInfo: res.data
                })
            }
        }
    }

    showHideDetailInfoDoctor = (status) => {
        this.setState({
            isShowDetail: status,
        })
    }

    render() {
        let language = this.props.lang;
        let {isShowDetail, extraInfo} = this.state;
        console.log(extraInfo);


        return (    
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='address-clinic'>
                        ĐỊA CHỈ KHÁM
                    </div>
                    <div className='name-clinic'>
                        {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic :<span></span>}
                    </div>
                    <div className='detail-address'>
                    {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic :<span></span>}
                    </div>
                </div>
                <div className='content-down'>
                    {isShowDetail ? (
                        <>
                            <div className='title-price'>GIÁ KHÁM:</div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'>Giá khám: </span>
                                    <span className='right'> {extraInfo && extraInfo.priceTypeData ? extraInfo.priceTypeData.valueVi :<span></span>
                            } </span>
                                </div>

                                <div className='note'>
                                {extraInfo && extraInfo.note ? extraInfo.note :<span></span>}
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
                            Giá khám: 
                            {extraInfo && extraInfo.priceTypeData ? extraInfo.priceTypeData.valueVi :<span></span>
                            }    
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
