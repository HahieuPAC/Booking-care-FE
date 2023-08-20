import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnchangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        
        this.setState({
            ...copyState
        }, () => {
            console.log('even 1: ', event.target.value, id);
        })
        
    }

    handleAddNewUser = () => {
        console.log('data modal:', this.state)
    }

    render() {
        return (
            <Modal 
            className={'modal-user-container'} 
            isOpen={this.props.isOpen} 
            toggle={() =>{this.toggle()}}
            size='lg'
            >
                <ModalHeader toggle={() =>{this.toggle()}}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input 
                            type='text' onChange={(event) => {this.handleOnchangeInput(event, 'email')}}
                            value = {this.state.email}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' onChange={(event) => {this.handleOnchangeInput(event, 'password')}}
                            value = {this.state.password}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input type='text' onChange={(event) => {this.handleOnchangeInput(event, 'firstName')}}
                            value = {this.state.firstName}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>last Name</label>
                            <input type='text' onChange={(event) => {this.handleOnchangeInput(event, 'lastName')}}
                            value = {this.state.lastName}
                            ></input>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' onChange={(event) => {this.handleOnchangeInput(event, 'address')}}
                            value = {this.state.address}
                            ></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-3' color="primary" onClick={() =>{this.handleAddNewUser()}}>
                        Add new
                    </Button>{' '}
                    <Button className='px-3' color="secondary" onClick={() =>{this.toggle()}}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



