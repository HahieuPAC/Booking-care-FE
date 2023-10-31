import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./DetailSpecialty.scss";
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import userService from '../../../services/userService';
import _ from 'lodash';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            location: ''

        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await userService.getDetailSpecialtyById({
                id: id,
                location: "ALL"
            });
            let resProvince = await userService.getAllCodeService('PROVINCE');
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }

                let dataProvince = resProvince.data;
                let result={}
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "ALL",
                        valueVi: "Toàn quốc",
                        createdAt: null,
                        updatedAt: null
                    })
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }

    getDataDetailSpecialty = () => {
        
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if (this.state.location !== prevProps.location) {
            if (this.props.match && this.props.match.params && this.props.match.params.id) {
                let id = this.props.match.params.id;
                let res = await userService.getDetailSpecialtyById({
                    id: id,
                    location: this.state.location
                });
                if (res && res.errCode === 0 ) {
                    let data = res.data;
                    let arrDoctorId = [];
                    if (data && !_.isEmpty(data)) {
                        let arr = data.doctorSpecialty;
                        if (arr && arr.length > 0) {
                            arr.map(item => {
                                arrDoctorId.push(item.doctorId);
                            })
                        }
                    }
                    this.setState({
                        dataDetailSpecialty: res.data,
                        arrDoctorId: arrDoctorId,
                    })
                }
            }
        }
    }

    showHideDetailInfoDoctor = (status) => {
        this.setState({
            isShowDetail: status,
        })
    }

    handleOnchangeSelect = (event, location) => {
        console.log(">> check select province: ", event.target.value)
        let copyState = {...this.state};
        copyState[location] = event.target.value;
        this.setState({
            ...copyState
        })
        console.log(">> check handleOnchangeSelect: ",  this.state)
    }

    
    render() {
        let {arrDoctorId, dataDetailSpecialty, listProvince} = this.state;
        let language = this.props.lang;

        console.log(">> check statedetailspecialty: ",  this.state)
        return (    
            <div className='detail-specialty-container'>
                <HomeHeader/>
                <div className='detail-specialty-body'>

                
                    <div className='description-specialty'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                        &&
                        <div dangerouslySetInnerHTML={{__html: dataDetailSpecialty.descriptionHTML}}>
                        </div>}
                    </div>
                    <div className='search-sp-doctor'>
                        <select onChange={(event) => this.handleOnchangeSelect(event, "location")}>
                            {listProvince && listProvince.length > 0 &&
                            listProvince.map((item, index) => {
                                return(
                                    <option key={index} value={item.keyMap}> 
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    
                    {arrDoctorId && arrDoctorId.length > 0 && 
                    arrDoctorId.map((item, index) => {
                        return( 
                            <div className='each-doctor' key={index}>
                                <div className='dt-content-left'>
                                    <div className='profile-doctor'>
                                        <ProfileDoctor
                                        doctorId={item}
                                        isShowDescriptionDoctor ={true}
                                        // dataTime = {dataTime}
                                        />
                                    </div>
            
                                </div>
                                <div className='dt-content-right'>
                                    <div className='doctor-schedule'>
                                        <DoctorSchedule
                                            doctorIdFromParent ={item}
                                        />
                                    </div>  
                                    <div className='doctor-extra-info'>
                                    <DoctorExtraInfo
                                        doctorIdFromParent ={item}/>
                                    </div>
                                </div> 
                        </div>
                        )
                    })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
