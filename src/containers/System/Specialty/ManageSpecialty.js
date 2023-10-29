import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./ManageSpecialty.scss";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import CommonUtils from '../../../utils/CommonUtils';
import userService from '../../../services/userService';
import { ToastContainer, toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

        }
    }

    async componentDidMount() {
        
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props.lang !== prevProps.lang) {
            
        }
    }

    showHideDetailInfoDoctor = (status) => {
        this.setState({
            isShowDetail: status,
        })
    }

    handleOnchangeInput = (event, name) => {
        let stateCopy = {...this.state};
        stateCopy[name] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            await this.setState({
                imageBase64: base64
            })
        }
        
    }

    handleSaveNewSpecialty = async() => {
        let res = await userService.createNewSpecialty(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new specialty succeed');
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        }
        else {
            toast.error('Add new specialty error')
            console.log(">> check res add new specialty: ", res)
        }
    }

    render() {
        return (    
            <div className='manage-specialty-container'>
                <div className='manage-title'>Quan ly chuyen khoa</div>
                <div className='add-new-specialty'>
                    <div className='add-new-specialty row'>
                        <div className='col-6 form-group'>
                            <label>ten chuyen khoa</label>
                            <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnchangeInput(event, 'name')}/>
                        </div>

                        <div className='col-6 form-group'>
                            <label>Upload anh chuyen khoa</label>
                            <input className='form-control-file' type='file'
                            onChange={(event) => this.handleOnchangeImage(event)}
                            />
                        </div>
                        
                    </div>
                    <div className='col-12'>
                        <MdEditor 
                            style={{ height: '300px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown} 
                        />
                    </div>

                    <div className='col-12'>
                        <button className='btn-save-specialty'
                        onClick={()=> this.handleSaveNewSpecialty()}>save</button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
