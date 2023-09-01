import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// Import css files

class About extends Component {

    render() { 
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói gì về Hà Trung Hiếu?
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                    <iframe width="100%" height="400px" src="https://www.youtube.com/embed/SDgHUOd_5dk" title="Thế hệ tao - DSK &amp; KraziNoyze  [VRG]" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            Thế hệ của tao không thiếu những điều ngang trái và báta công
                            Rừng vàng biển bạc dần mất hết mà rác rưởi, cặn bã lại cứ chất đống
                            Đôi khi cũng vì cả nể mà không dám nói ra sự thật, sợ mất lòng
                            Thế hệ của tao đầy tự tin nhưng cũng vì ảo tưởng nên chỉ biết thất vọng
                            Thế hệ tao nhiều bản sao, lũ mất gốc, nhà mất nóc
                            Nhiều đứa mang tiếng có giáo dục nhưng đéo bằng bọn thất học
                            Thế hệ tao nhiều đứa coi thường tao chỉ vì tao khác biệt
                            Đéo dám lên tiếng vì chủ quyền nhưng lên mạng chửi vô cùng ác liệt
                            Thế hệ tao đánh giặc bằng bàn phím, từ thiện bằng click chuột
                            Yêu thương qua vài ba câu thả thính, chưa gì đã thích luôn
                            Thế hệ của tao trong quá khứ là tương lai của đất nước
                            Nhưng thế hệ tao hiện tại còn tụt hậu như con cờ bị mất nước
                            Thế hệ của tao nhiều bất mãn, nhiều thằng lạc đường khi vừa mới cất bước
                            Nhiều thằng chùn chân, nhiều thằng liều lấy mang ra đặt cược
                            Nhiều thằng chìm đắm trong những giấc mơ không bao giờ thành hiện thực
                            Nhiều thằng ngủ quên, bỏ thế giới sau lưng, không ai đánh thức
                            Thôi, tỉnh dậy đi!
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
