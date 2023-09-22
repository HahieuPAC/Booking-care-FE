import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import "./DoctorSchedule.scss";
import userService from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi'

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays : []
        }
    }

    async componentDidMount() {
        let {lang} = this.props;

        console.log(moment(new Date()).format('dddd - DD/MM'));
        console.log(moment(new Date()).locale('en').format('ddd - DD/MM'));

        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            arrDate.push(object);
        }
    }

    componentDidUpdate() {

    }

    render() {

        return (    
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select className=''>
                        <option> 2 </option>
                        <option> 2 </option>
                        <option> 2 </option>
                        <option> 2 </option>
                        <option> 2 </option>
                        <option> 2 </option>
                    </select>
                </div>
                <div className='all-available-time'>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
