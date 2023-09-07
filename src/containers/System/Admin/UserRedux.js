import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from "../../../store/actions";
import"./UserRedux.scss";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImgUrl: '',
            isOpen: false,

        }
    }

    async componentDidMount() {
        // this.props.dispatch(actions.fetchGenderStart);

        this.props.getGendersStart();
        this.props.getPositionsStart();
        this.props.geRolesStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objUrl= URL.createObjectURL(file);
            console.log(">>> check file 0: ", objUrl);
            await this.setState({
                previewImgUrl: objUrl,
            })
        }
        console.log(">>> check previewImgUrl: ", this.state.previewImgUrl);
        
    }

    openPreviewImg = () => {
        if (!this.state.previewImgUrl)
        {
            return;
        }
        this.setState({
            isOpen: true,
        })
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.lang;
        return (
            <div className='user-redux-container'>

                <div className="title" >
                    user redux user "Hieu"
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12  my-3'><FormattedMessage id="manage-user.add"/></div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email"/></label>
                                <input className='form-control' type='email'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password"/></label>
                                <input className='form-control' type='password'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name"/></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name"/></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number"/></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address"/></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender"/></label>
                                <select className="form-control">
                                    {genders&&genders.length > 0 && 
                                    genders.map((item, index) => {
                                        return (<option key={index}>{language === LANGUAGES.VI? item.valueVi : item.valueEn}</option>)
                                    })} 
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position"/></label>
                                <select className="form-control">
                                    {positions&&positions.length > 0 && 
                                    positions.map((item, index) => {
                                        return (<option key={index}>{language === LANGUAGES.VI? item.valueVi : item.valueEn}</option>)
                                    })} 
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role"/></label>
                                <select className="form-control">
                                    {roles&&roles.length > 0 && 
                                    roles.map((item, index) => {
                                        return (<option key={index}>{language === LANGUAGES.VI? item.valueVi : item.valueEn}</option>)
                                    })} 
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image"/></label>
                                <div className='preview-img-container'>
                                    <input onChange={(event) => {
                                        this.handleOnchangeImage(event)
                                    }} id="previewImg" type='file' hidden/>
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className='preview-image'style={{ 
                                        backgroundImage: `url(${this.state.previewImgUrl})`
                                    }}
                                    onClick={() => this.openPreviewImg()}>

                                    </div>
                                </div>
                                
                                
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id="manage-user.save"/></button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen=== true &&
                <Lightbox
                    mainSrc={this.state.previewImgUrl}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                />}
            
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGendersStart: () => dispatch(actions.fetchGenderStart()),
        getPositionsStart: () => dispatch(actions.fetchPositionStart()),
        geRolesStart: () => dispatch(actions.fetchRoleStart()),
        // processLogout: () => dispatch(actions.processLogout()), 
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
