import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from "../../../store/actions";
class OutStandingDoctor extends Component {

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    render() {
        console.log(">>> check topDoctorsRedux: ", this.props.topDoctorsRedux);
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>      
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section_customize'>
                                <div className='customize-border'>
                                    <div className='outer-bag'>
                                        <div className='bg-image section-outstanding-doctor'/>
                                    </div>
                                    
                                    <div className='Position text-center'>
                                        <div>Giáo sư, tiến sĩ Hà Trung Hiếu</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section_customize'>
                                <div className='customize-border'>
                                    <div className='outer-bag'>
                                        <div className='bg-image section-outstanding-doctor'/>
                                    </div>
                                    
                                    <div className='Position text-center'>
                                        <div>Giáo sư, tiến sĩ Hà Trung Hiếu</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section_customize'>
                                <div className='customize-border'>
                                    <div className='outer-bag'>
                                        <div className='bg-image section-outstanding-doctor'/>
                                    </div>
                                    
                                    <div className='Position text-center'>
                                        <div>Giáo sư, tiến sĩ Hà Trung Hiếu</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section_customize'>
                                <div className='customize-border'>
                                    <div className='outer-bag'>
                                        <div className='bg-image section-outstanding-doctor'/>
                                    </div>
                                    
                                    <div className='Position text-center'>
                                        <div>Giáo sư, tiến sĩ Hà Trung Hiếu</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section_customize'>
                                <div className='customize-border'>
                                    <div className='outer-bag'>
                                        <div className='bg-image section-outstanding-doctor'/>
                                    </div>
                                    
                                    <div className='Position text-center'>
                                        <div>Giáo sư, tiến sĩ Hà Trung Hiếu</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section_customize'>
                                <div className='customize-border'>
                                    <div className='outer-bag'>
                                        <div className='bg-image section-outstanding-doctor'/>
                                    </div>
                                    
                                    <div className='Position text-center'>
                                        <div>Giáo sư, tiến sĩ Hà Trung Hiếu</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
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
        topDoctorsRedux: state.admin.topDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
