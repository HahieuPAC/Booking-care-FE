import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import userService from '../../services/userService';
import ModalUser from './ModalUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers : [],
            isOpenModalUser: false   
        }
    }

    state = {

    }

    async componentDidMount() {
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

    /** life cycle
     * run component:
     * 1. run constructor -> init state
     * 2. did mount (set state) mount = born, die == unmount
     * 3. render
     */
}
    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen = {this.state.isOpenModalUser}
                    toggleFromParent = {this.toggleUserModal}
                />
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
                                                <button className='btn-edit'><i class="fas fa-edit"></i></button>
                                                <button className='btn-delete'><i class="fas fa-trash-alt"></i></button>
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
