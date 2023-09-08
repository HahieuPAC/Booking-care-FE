import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import userService from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
                    <table>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            <tr>
                                <td>{'item.emai'l}</td>
                                <td>{'item.firstName'}</td>
                                <td>{'item.lastName'}</td>
                                <td>{'item.address'}</td>
                            </tr>
                        </tbody>
                    </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
