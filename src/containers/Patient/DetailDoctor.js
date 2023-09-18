import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../HomePage/HomeHeader';
import './DetailDoctor.scss';
import userService from '../../services/userService';


class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let response = await userService.getDetailInfoDoctor(id);
            if (response && response.errCode === 0) {
                this.setState({
                    detailDoctor: response.data
                })
            }
        }
    }

    componentDidUpdate() {

    }

    render() {
        console.log("state: ", this.state);
        let {detailDoctor} = this.state
        return (    
            <>
                <HomeHeader isShowBanner = {false}/>
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left' style={{ 
                                        backgroundImage: `url(${detailDoctor.image})`
                                    }}>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                PGS LE van A
                            </div>
                            <div className='down'>
                                haha
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>

                    </div>
                    <div className='detail-infor-doctor'>
                        //
                    </div>
                    <div className='comment-doctor'>

                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
