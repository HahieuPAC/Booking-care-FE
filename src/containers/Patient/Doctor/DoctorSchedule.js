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
            allDays : [moment(new Date()).format('dddd - DD/MM')]
        }
    }


    async componentDidMount() {
        let language = this.props.lang;
        console.log(moment(new Date()).format('dddd - DD/MM'));
        console.log(moment(new Date()).locale('en').format('ddd - DD/MM'));
        this.setArrDays(language);
    }

    setArrDays = (language) => {
        let arrDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            }
            else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            arrDays.push(object);
        }

        this.setState({
            allDays: arrDays
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.lang !== this.props.lang) {
            this.setArrDays(this.props.lang)
        }
    }

    

    render() {
        let {allDays} = this.state;
        // let language = this.props.lang;

        return (    
            <div className='doctor-schedule-container'> 
                <div className='all-schedule'>
                    <select className=''>
                        {allDays && allDays.length > 0 &&
                        allDays.map((item, index) => {
                            return (
                                <option 
                                    value={item.value} 
                                    key={index}
                                >
                                        {item.label}
                                </option>
                            )
                        })}
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
