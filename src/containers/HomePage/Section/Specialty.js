import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import specialtyImg from "../../../assets/specialty/co-xuong-khop.jpg"

class specialty extends Component {

    render() { 
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 3,

        };
        return (
            <div className='section-specialty'>
                <div className='section-container'>      
                    <div className='section-header'>
                        <span className='title-section'>Chuyen khoa pho bien</span>
                        <button className='btn-section'>Xem them</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className='specialty_customize'>
                                <div className='bg-image'/>
                                <div>Co xuong khop 1</div>
                            </div>
                            <div className='specialty_customize'>
                                <div className='bg-image'/>
                                <div>Co xuong khop 2</div>
                            </div>
                            <div className='specialty_customize'>
                                <div className='bg-image'/>
                                <div>Co xuong khop 3</div>
                            </div>
                            <div className='specialty_customize'>
                                <div className='bg-image'/>
                                <div>Co xuong khop 4</div>
                            </div>
                            <div className='specialty_customize'>
                                <div className='bg-image'/>
                                <div>Co xuong khop 5</div>
                            </div>
                            <div className='specialty_customize'>
                                <div className='bg-image'/>
                                <div>Co xuong khop 6</div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
        //inject
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(specialty);
