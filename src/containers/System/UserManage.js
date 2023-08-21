import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import userService from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers : [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {

            }
        }
    }

    state = {

    }

    async componentDidMount() {
        await this.getAllUserFormReact();
    }


    createNewUser = async(data) => {
        try {
            let response = await userService.createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(`response: ${response.errMessage}`);
            }
            else {
                await this.getAllUserFormReact();
                this.setState({
                    isOpenModalUser: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id'});
            }
        } catch (error) {
            console.log(error)
        } 
    };


    getAllUserFormReact = async () => {
        let response =  await userService.getAllUser ('ALL');
        if (response && response.errCode === 0) {
            this.setState ( {
                arrUsers : response.user
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    


    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        });
    }


    

    /** life cycle
     * run component:
     * 1. run constructor -> init state
     * 2. did mount (set state) mount = born, die == unmount
     * 3. render
     */

    handleEditUser = async (user) => {
        this.setState({
            isOpenModalEditUser:true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await userService.editUserService(user);
            if (res && res.errCode === 0) {
                await this.getAllUserFormReact();
                this.setState({
                    isOpenModalEditUser:false,
                })
            }
            else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteUser = async (item) => {
        try {
            let res = await userService.deleteUserService(item.id);
            if (res && res.errCode === 0) {
                await this.getAllUserFormReact();
            }
            else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen = {this.state.isOpenModalUser}
                    toggleFromParent = {this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                />
                { 
                
                this.state.isOpenModalEditUser && 
                <ModalEditUser
                    isOpen = {this.state.isOpenModalEditUser}
                    toggleFromParent = {this.toggleUserEditModal}
                    currentUser = {this.state.userEdit}
                    editUser = {this.doEditUser}
                />}
                
                <div className='title text-center'> manage users </div>
                <div className='mx-1'>
                    <button className='btn- btn-primary px-3' onClick={this.handleAddNewUser}><i className="fas fa-plus"></i>Add new user</button>
                </div>
                <div className='users-table'>
                    
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                return(
                                    <>
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit'><i class="fas fa-edit"
                                                onClick={()=>{this.handleEditUser(item)}}
                                                ></i></button>
                                                <button className='btn-delete'
                                                onClick={()=>{this.handleDeleteUser(item)}}
                                                ><i class="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                            }
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
