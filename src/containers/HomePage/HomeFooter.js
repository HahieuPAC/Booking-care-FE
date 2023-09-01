import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// Import css files

class HomeFooter extends Component {

    render() { 
        return (
            <div className='section-share section-homefooter'>
                <p>&copy; 2023 Ha Trung Hieu. 
                    <a target='_blank' href='https://www.facebook.com/hahieu93/'>More info  &#8594; Click here &#8592;</a>
                </p>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
