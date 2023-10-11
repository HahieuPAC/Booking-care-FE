import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import userService from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl';
import "./DoctorExtraInfo.scss";
import NumericFormat from 'react-number-format';
import NumberFormat from 'react-number-format';

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
                    <div className='address-clinic'><FormattedMessage id="patient.extra-info-doctor.address-clinic" />
                        
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
                            <div className='title-price'><FormattedMessage id="patient.extra-info-doctor.price" /></div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'> <FormattedMessage id="patient.extra-info-doctor.price" /></span>
                                    <span className='right'> 
                                        {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI && 
                                        <NumberFormat className="currency" value={extraInfo.priceTypeData.valueVi} displayType='text' thousandSeparator="," suffix={'VND'}/>
                                        }  
                                        {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN && 
                                        <NumberFormat className="currency" value={extraInfo.priceTypeData.valueEn} displayType='text' thousandSeparator="," suffix={'$'}/>
                                        }      
                                    </span>
                                </div>
                                <div className='note'>
                                {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                </div>
                            </div>
                            <div className='payment'><FormattedMessage id="patient.extra-info-doctor.payment" />:
                                {extraInfo && extraInfo.paymentTypeData ? extraInfo.paymentTypeData.valueVi : ''
                                }     
                            
                            </div>
                            <div className='hide-price'>
                                <span className='view-detail 'onClick={() => this.showHideDetailInfoDoctor(false)}>
                                <FormattedMessage id="patient.extra-info-doctor.hide-detail" />
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className='show-price'>
                            <FormattedMessage id="patient.extra-info-doctor.price" />: 
                            {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI && 
                            <NumberFormat className="currency" value={extraInfo.priceTypeData.valueVi} displayType='text' thousandSeparator="," suffix={'VND'}/>
                            }  
                            {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN && 
                            <NumberFormat className="currency" value={extraInfo.priceTypeData.valueEn} displayType='text' thousandSeparator="," suffix={'$'}/>
                            }      
                            <span className='view-detail' onClick={() => this.showHideDetailInfoDoctor(true)}>
                            <FormattedMessage id="patient.extra-info-doctor.detail" />
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
