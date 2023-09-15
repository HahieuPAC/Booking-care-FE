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
            contentMarkdown: "",
            contentHTML: "",
            selectedOption: "",
            description: "",
            listDoctors: ""
        }
    }

    componentDidMount() {
        this.props.getAllDoctorRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.lang !== this.props.lang) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
            let labelVi = `${item.lastName} ${item.firstName}`;
            let labelEn = `${item.firstName} ${item.lastName}`;
            object.label = this.props.lang === LANGUAGES.VI ? labelVi : labelEn;
            object.value = item.id;
            console.log("this.props.lang: ", this.props.lang)
            console.log("object.label: ", object.label)
            result.push(object);
            })
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
        console.log(">> check state: ", this.state)
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption }
            // ,() => console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    handleOnchangeDesc = (event) => {
        this.setState({
            description: event.target.value,
        })
    }

    render() {
        console.log(">> check state manage doctor: ", this.state);
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    ManageDoctor
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label className=''>
                            Chon bac si
                        </label>
                        <Select
                            className="form -control"
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className='content-right'>
                        <label>
                                Thong tin gioi thieu
                            </label>
                        <textarea 
                        rows="4" 
                        className='form-control'
                        onChange={(event) =>this.handleOnchangeDesc(event)}
                        value={this.state.description}
                        >
                                abcxyz
                        </textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor 
                    style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={this.handleEditorChange} 
                    />
                </div>
                <button className='save-content-doctor'
                onClick={()=> this.handSaveContentMarkdown()}>
                    Luu thong tin
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allDoctors: state.admin.allDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
