import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import userService from '../../../services/userService';
import ModalUser from '../ModalUser';
import ModalEditUser from '../ModalEditUser';
import { emitter } from '../../../utils/emitter';
import * as actions from "../../../store/actions";
import { LANGUAGES,} from '../../../utils';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS } from '../../../utils';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //Save to markdown table
            contentMarkdown: "",
            contentHTML: "",
            selectedOption: "",
            description: "",
            note: "",
            listDoctors: [],
            hasOldData: false,

            //Save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
        }
    }

    componentDidMount() {
        this.props.getAllDoctorRedux();
        this.props.getAllRequireDoctorInfo();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.lang !== this.props.lang) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let {resPayment, resPrice, resProvince} = this.props.allRequireDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
        if (prevProps.allRequireDoctorInfo !== this.props.allRequireDoctorInfo) { 
            let {resPayment, resPrice, resProvince, resSpecialty} = this.props.allRequireDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty
            });
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        if(inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = this.props.lang === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = this.props.lang === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'PAYMENT' || type === "PROVINCE") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = this.props.lang === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === "SPECIALTY") {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
        }
        return result;
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    
    handSaveContentMarkdown = () => {
        let {hasOldData} = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : "",
            specialtyId: this.state.selectedSpecialty.value
        })
        this.setState({
            contentHTML: "",
            contentMarkdown: "",
            description: "",
            hasOldData: false,
            selectedOption: "",
        })
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let {listPayment, listPrice, listProvince, listSpecialty} = this.state;
        let response = await userService.getDetailInfoDoctor(selectedOption.value)
        if (response && response.errCode === 0 && response.data && response.data.Markdown) {
            let markdown = response.data.Markdown;
            let addressClinic = '';
            let nameClinic = '';
            let priceId = '';
            let paymentId = '';
            let provinceId = '';
            let specialtyId = '';
            let note = '';
            let selectedPayment = '', selectedPrice = '', selectedProvince = '', selectedSpecialty = ''; 

            if(response.data.doctor_info) {
                addressClinic = response.data.doctor_info.addressClinic;
                nameClinic = response.data.doctor_info.nameClinic;
                note = response.data.doctor_info.note;
                paymentId = response.data.doctor_info.paymentId;
                priceId = response.data.doctor_info.priceId;
                provinceId = response.data.doctor_info.provinceId;
                specialtyId = response.data.doctor_info.specialtyId
                selectedPayment = listPayment.find(item => {
                    if (item && item.value === paymentId) 
                    return item 
                });
                
                selectedPrice = listPrice.find(item => {
                    if (item && item.value === priceId) 
                    return item
                });

                selectedProvince = listProvince.find(item => {
                    if (item && item.value === provinceId) 
                    return item
                });

                selectedSpecialty = listSpecialty.find(item => {
                    if (item &&item.value === specialtyId) {
                        return item
                    }
                })
                console.log(">>> check find array: ", selectedPayment, selectedPrice, selectedProvince, specialtyId);
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                note: note,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                selectedPayment : selectedPayment,
                selectedPrice : selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty
            })
        }
        else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",
                hasOldData: false,
                note: '',
                nameClinic: '',
                addressClinic: '',
                selectedPayment : '',
                selectedPrice : '',
                selectedProvince: '',
                selectedSpecialty: ''
            })
        }
    };

    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
        console.log(">>> check state: ", this.state)
    }

    handleOnchangeText = (event, id) => {
        let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    render() {
        let {hasOldData, listSpecialty} = this.state;
        console.log(">> check state manage doctor: ", this.state);
        console.log(">> check props manage doctor: ", this.props.allRequireDoctorInfo);
        
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                <FormattedMessage id="admin.manage-doctor.title"/>
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-doctor"/>
                        </label>
                        <Select
                            className=""
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor"/>}
                            name={"selectedOption"}
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className='content-right'>
                        <label>
                        <FormattedMessage id="admin.manage-doctor.intro-doctor"/>
                            </label>
                        <textarea 
                        rows="4" 
                        className='form-control'
                        onChange={(event) =>this.handleOnchangeText(event, 'description')}
                        value={this.state.description}
                        >
                                abcxyz
                        </textarea>
                    </div>
                </div>
                <div className='more-info-extra row'>
                    <div className='first-content col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price"/></label>
                        <Select
                            className=""
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPrice}
                            name="selectedPrice"
                            placeholder={<FormattedMessage id="admin.manage-doctor.price"/>}
                        />
                    </div>
                    <div className='first-content col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.payment"/></label>
                        <Select
                            className=""
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPayment}
                            name="selectedPayment"
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment"/>}
                        />
                    </div>
                    <div className='first-content col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.province"/></label>
                        <Select
                            className=""
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listProvince}
                            name="selectedProvince"
                            placeholder={<FormattedMessage id="admin.manage-doctor.province"/>}
                        />
                    </div>
                    <div className='first-content col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic"/></label>
                        <input className='form-control'
                                onChange={(event) =>this.handleOnchangeText(event, 'nameClinic')}
                                value={this.state.nameClinic}
                        />
                    </div>
                    <div className='first-content col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic"/></label>
                        <input className='form-control'
                                onChange={(event) =>this.handleOnchangeText(event, 'addressClinic')}
                                value={this.state.addressClinic}
                        />
                    </div>
                    <div className='first-content col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note"/></label>
                        <input className='form-control'
                                onChange={(event) =>this.handleOnchangeText(event, 'note')}
                                value={this.state.note}
                        />
                    </div>
                </div> 
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label className=''>
                        <FormattedMessage id="admin.manage-doctor.specialty"/>
                        </label>
                        <Select
                            className=""
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty"/>}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label className=''>
                            <FormattedMessage id="admin.manage-doctor.clinic"/>
                        </label>
                        <Select
                            className=""
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.clinic"/>}
                            name="selectedClinic"
                        />
                    </div>
                </div>

                <div className='manage-doctor-editor'>
                    <MdEditor 
                    style={{ height: '300px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={this.handleEditorChange}
                    value={this.state.contentMarkdown} 
                    />
                </div>
                <button className={hasOldData === true? 'save-content-doctor' : "create-content-doctor"} 
                onClick={()=> this.handSaveContentMarkdown()}>
                    {hasOldData === true? 
                    <span><FormattedMessage id="admin.manage-doctor.save"/></span> : <span><FormattedMessage id="admin.manage-doctor.add"/></span>}
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequireDoctorInfo: state.admin.allRequireDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        getAllRequireDoctorInfo: () => dispatch(actions.getRequireDoctorInfo()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
