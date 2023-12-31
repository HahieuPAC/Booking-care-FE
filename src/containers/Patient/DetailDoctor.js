import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../HomePage/HomeHeader';
import './DetailDoctor.scss';
import userService from '../../services/userService';
import { LANGUAGES } from '../../utils';


class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let response = await userService.getDetailInfoDoctor(id);
            if (response && response.errCode === 0) {
                this.setState({
                    detailDoctor: response.data
                })
            }
        }
    }

    componentDidUpdate() {

    }

    render() {
        console.log("state: ", this.state);
        let {detailDoctor} = this.state;
        let language = this.props.lang;
        let nameVI = "", nameEn = ""; 
        if (detailDoctor && detailDoctor.positionData) {
        nameVI = `${detailDoctor.positionData.valueVi}: ${detailDoctor.lastName} ${detailDoctor.firstName}`;
        nameEn = `${detailDoctor.positionData.valueEn}: ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        return (    
            <>
                <HomeHeader isShowBanner = {false}/>
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left' style={{ 
                                        backgroundImage: `url(${detailDoctor.image? detailDoctor.image : ""})`
                                    }}>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVI : nameEn}
                            </div>  
                            <div className='down'>
                                {detailDoctor.Markdown && detailDoctor.Markdown.description 
                                && <span>
                                    {detailDoctor.Markdown.description}
                                    </span>} 
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>

                    </div>
                    <div className='detail-info-doctor'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                        && 
                        <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHTML}}>

                        </div>}
                    </div>
                    <div className='comment-doctor'>

                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
