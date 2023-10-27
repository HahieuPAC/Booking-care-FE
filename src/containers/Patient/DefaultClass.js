import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

class DefaultClass extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {
        
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props.lang !== prevProps.lang) {
            
        }
    }

    showHideDetailInfoDoctor = (status) => {
        this.setState({
            isShowDetail: status,
        })
    }

    render() {
        return (    
            <div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
