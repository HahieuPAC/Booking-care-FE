import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import CommonUtils from '../../../utils/CommonUtils';
import { withRouter } from 'react-router-dom/cjs/react-router-dom';
class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux != this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    handleViewDetailDoctor = (doctor) => {
        if(this.props.history)
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    render() {
        let arrDoctors = this.state.arrDoctors;
        let language = this.props.lang;
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>      
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id = "homepage.outstanding-doctor"/>
                        </span>
                        <button className='btn-section'><FormattedMessage id = "homepage.more-info"/></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0 
                            && arrDoctors.map((item, index) => {
                                let imageBase64 = "";
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    console.log(">> check imageBase64: ", item.image);
                                }
                                let nameVI = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div className='section_customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                        <div className='customize-border'>
                                            <div className='outer-bag'>
                                                <div className='bg-image section-outstanding-doctor' style={{ 
                                        backgroundImage: `url(${imageBase64})`
                                    }}/>
                                            </div>
                                            <div className='Position text-center'>
                                                <div>{language === LANGUAGES.VI ? nameVI : nameEn}</div>
                                                <div>Cơ xương khớp</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
        topDoctorsRedux: state.admin.topDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
