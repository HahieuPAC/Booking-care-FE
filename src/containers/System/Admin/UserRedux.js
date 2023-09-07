import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import userService from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as actions from "../../../store/actions"
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: []

        }
    }

    async componentDidMount() {
        // this.props.dispatch(actions.fetchGenderStart);

        this.props.getGendersStart();
        this.props.getPositionsStart();
        this.props.geRolesStart();
        // try {
        //     let res = await userService.getAllCodeService("gender");
        //     if (res&&res.errCode === 0) {
        //         this.setState ({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
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
                                <div>
                                    <input id="previewImg" type='file' />
                                    <label htmlFor='previewImg'>Tai anh</label>
                                    <div className='preview-image'></div>
                                </div>
                                
                                
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id="manage-user.save"/></button>
                            </div>
                        </div>
                    </div>
                </div>
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
