import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./BookingModal.scss";
import { Modal, ModalHeader } from 'reactstrap';

class BookingModal extends Component {

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
        // toggle={ }
        return (    
            <Modal centered
            isOpen={true}  className={'Booking-modal-container'}
            size='lg'
            >
                <ModalHeader >Modal title</ModalHeader>
                <div style={{
                    height: '100px'
                }}>
                    from modal
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
