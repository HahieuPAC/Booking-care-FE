import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import * as actions from "../../../store/actions";
import"./UserRedux.scss";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import CommonUtils from '../../../utils/CommonUtils';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar:'',

            action: CRUD_ACTIONS.CREATE,
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
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ?  arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role:   arrRoles&& arrRoles.length > 0 ?  arrRoles[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ?  arrPositions[0].key : ''
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux
            this.setState({
                userEditId: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ?  arrGenders[0].keyMap : '',
                role:   arrRoles&& arrRoles.length > 0 ?  arrRoles[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ?  arrPositions[0].keyMap : '',
                avatar:'',
                actions: CRUD_ACTIONS.CREATE,
                
            })
        }
    }
    

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objUrl= URL.createObjectURL(file);
            await this.setState({
                previewImgUrl: objUrl,
                avatar: base64
            })
        }
        
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

    


    onChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required : '+ arrCheck[i]);;
                break;
            }
        }

        return {
            isValid
        }
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid=== false ) return;

        let action = this.state.action;
        console.log(">> Check action: ",action)
        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
                previewImgUrl: "",
                base64: ""
            })
        }
        if  (action === CRUD_ACTIONS.EDIT) {
            console.log("check editAUserRedux state: ", this.state)
            //fire redux edit user
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
                previewImgUrl: "",
                base64: ""
            })
        }
        this.setState({
            action: CRUD_ACTIONS.CREATE,
            previewImgUrl: "",
            base64:""
        })
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = "";
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        console.log(">>> check handleEditUser from parent: ", user);
        this.setState ({
            email: user.email,
            password: 'hardcode',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            role:   user.roleId,
            position: user.positionId,
            avatar: '',
            previewImgUrl: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        }, () => {
            console.log(">>> check base64 : ", this.state);
        })
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.lang;
        let { email, password, firstName, lastName, address, phoneNumber,gender,position,avatar, role} = this.state;

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
                                <input className='form-control' type='email'
                                value={email}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'email')}}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password"/></label>
                                <input className='form-control' type='password'
                                value={password}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'password')}}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}>
                                    </input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name"/></label>
                                <input className='form-control' type='text'
                                value={firstName}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'firstName')}}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name"/></label>
                                <input className='form-control' type='text'
                                value={lastName}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'lastName')}}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number"/></label>
                                <input className='form-control' type='text'
                                value={phoneNumber}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'phoneNumber')}}></input>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address"/></label>
                                <input className='form-control' type='text'
                                value={address}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'address')}}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender"/></label>
                                <select className="form-control"
                                onChange={(event) => {
                                    this.onChangeInput(event, 'gender')}}
                                    value={this.state.gender}
                                    >
                                    {genders&&genders.length > 0 && 
                                    genders.map((item, index) => {
                                        return (<option key={index} value={item.keyMap}>{language === LANGUAGES.VI? item.valueVi : item.valueEn}</option>)
                                    })} 
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position"/></label>
                                <select className="form-control"
                                onChange={(event) => {
                                    this.onChangeInput(event, 'position')}}
                                    value={this.state.position}
                                    >
                                    {positions&&positions.length > 0 && 
                                    positions.map((item, index) => {
                                        return (<option key={index} value={item.keyMap}>{language === LANGUAGES.VI? item.valueVi : item.valueEn}</option>)
                                    })} 
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role"/></label>
                                <select className="form-control"
                                onChange={(event) => {
                                    this.onChangeInput(event, 'role')}}
                                    value={this.state.role}
                                >
                                    {roles&&roles.length > 0 && 
                                    roles.map((item, index) => {
                                        return (<option key={index} value={item.keyMap}>{language === LANGUAGES.VI? item.valueVi : item.valueEn}</option>)
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
                            <div className='col-12 my-3'>
                                <button className= {this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary' }
                                onClick={()=> this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? 
                                    <FormattedMessage id="manage-user.edit"/>:
                                    <FormattedMessage id="manage-user.save"/>}
                                    
                                    </button>
                            </div>

                            <div className='col-12 mb-5'>
                                <TableManageUser
                                handleEditUserFromParent={this.handleEditUserFromParent}
                                action={this.state.action}
                                />
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
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGendersStart: () => dispatch(actions.fetchGenderStart()),
        getPositionsStart: () => dispatch(actions.fetchPositionStart()),
        geRolesStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) =>dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data)),
        // processLogout: () => dispatch(actions.processLogout()), 
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
