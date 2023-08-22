import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
class HomeHeader extends Component {

    render() { 
    
        return (
            <React.Fragment>
                <div className='home-header-container'>
                        <div className='home-header-content'> 
                            <div className='left-content'>
                                <i class="fas fa-bars"></i>
                                <div className='header-logo'></div>
                            </div>
                            <div className='center-content'>
                                <div className='child-content'> 
                                    <div><b> Chuyen khoa </b></div>
                                    <div className='sub-title'>Tim bac si theo chuy khoa</div> 
                                </div>
                                <div className='child-content'>
                                    <div><b>Co so Y te</b></div>
                                    <div className='sub-title'>cho benh vien phong kham</div>
                                </div>
                                <div className='child-content'>
                                    <div><b> Bac Si </b></div>
                                    <div className='sub-title'>Chon bac si gioi</div>
                                </div>
                                <div className='child-content'>
                                    <div><b>Goi Kham</b></div>
                                    <div className='sub-title'>Kham suc khoe tong quat</div>
                                </div>
                            </div>
                            <div className='right-content'>
                                <div className='support'><i className="fas fa-question-circle"></i>Ho tro</div>
                                <div className='flag'>VN</div>
                            </div>
                        </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>NỀN TẢNG Y TẾ</div>
                        <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input placeholder='Tìm bác sĩ' type='text'></input>
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="far fa-hospital"></i></div>
                                <div className='text-child'>Kham chuyen khoa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="far fa-hospital"></i></div>
                                <div className='text-child'>Kham chuyen khoa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="far fa-hospital"></i></div>
                                <div className='text-child'>Kham chuyen khoa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="far fa-hospital"></i></div>
                                <div className='text-child'>Kham chuyen khoa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="far fa-hospital"></i></div>
                                <div className='text-child'>Kham chuyen khoa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="far fa-hospital"></i></div>
                                <div className='text-child'>Kham chuyen khoa</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
