import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import userService from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import moment from 'moment';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

    getInfoDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await userService.getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result= res.data
            }
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props.lang !== prevProps.lang) {
            
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            // let data = this.getInfoDoctor(this.props.doctorId);
            // this.setState({
            //     dataProfile: data
            // })
        }
    }

    showHideDetailInfoDoctor = (status) => {
        this.setState({
            isShowDetail: status,
        })
    }
    

    renderTimeBooking = (dataTime) => {
        let language = this.props.lang;
        console.log(">> checck lannguage: ", language)
        console.log(">>> check inside: ", dataTime)
        if (dataTime && !_.isEmpty(dataTime)) {
            let date = language === LANGUAGES.VI ? 
            moment(dataTime.date).format('DD/MM/YYYY') :
            moment(dataTime.date).format('MM/DD/YYYY');
            let time = language === LANGUAGES.VI ? 
            dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            moment(dataTime.date).format('MM/DD/YYYY');
            return(
                <>
                <div>
                    {time}---{date}
                </div>

                <div>
                    Mien phi dat lich
                </div>
                </>
            )
        }

        return <>
        </>
    }

    render() {
        console.log(">>> check dataProfile state: ", this.state)
        let { dataProfile } = this.state;
        let { isShowDescriptionDoctor, dataTime } = this.props;
        let language = this.props.lang;
        let nameVI = "", nameEn = "";
        if (dataProfile && dataProfile.positionData) {
            nameVI = `${dataProfile.positionData.valueVi}: ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}: ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        console.log(">>> check props: ", dataTime)
        return (    
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                        <div className='content-left' style={{ 
                                        backgroundImage: `url(${dataProfile.image? dataProfile.image : ""})`
                                    }}>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVI : nameEn}
                            </div>  
                            <div className='down'>
                                {isShowDescriptionDoctor === true ?
                                    <>
                                    {dataProfile.Markdown && dataProfile.Markdown.description 
                                        && 
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>} 
                                    </>
                                    :
                                    <>
                                        {this.renderTimeBooking(dataTime)}
                                    </>
                                }
                            </div>
                        </div>
                </div>
                <div className='price'><FormattedMessage id="patient.extra-info-doctor.price" />
                            {dataProfile.doctor_info && dataProfile.doctor_info.priceTypeData && language === LANGUAGES.VI && 
                            <NumberFormat className="currency" value={dataProfile.doctor_info.priceTypeData.valueVi} displayType='text' thousandSeparator="," suffix={'VND'}/>
                            }  
                            {dataProfile.doctor_info && dataProfile.doctor_info.priceTypeData && language === LANGUAGES.EN && 
                            <NumberFormat className="currency" value={dataProfile.doctor_info.priceTypeData.valueEn} displayType='text' thousandSeparator="," suffix={'$'}/>
                            }      
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
