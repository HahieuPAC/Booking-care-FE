import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
// Import css files

class HandBook extends Component {

    render() { 
        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>      
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section_customize'>
                                <div className='bg-image section-handbook'/>
                                <div>Co xuong khop 1</div>
                            </div>
                            <div className='section_customize'>
                                <div className='bg-image section-handbook'/>
                                <div>Co xuong khop 2</div>
                            </div>
                            <div className='section_customize'>
                                <div className='bg-image section-handbook'/>
                                <div>Co xuong khop 3</div>
                            </div>
                            <div className='section_customize'>
                                <div className='bg-image section-handbook'/>
                                <div>Co xuong khop 4</div>
                            </div>
                            <div className='section_customize'>
                                <div className='bg-image section-handbook'/>
                                <div>Co xuong khop 5</div>
                            </div>
                            <div className='section_customize'>
                                <div className='bg-image section-handbook'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
