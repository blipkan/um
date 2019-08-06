import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import {getTranslate, getActiveLanguage} from 'react-localize-redux';
import UserForm from '../components/UserForm';
import * as actions from '../actions';
import {bindActionCreators} from "redux";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },

    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    }
};

class UserCard extends Component {
    constructor(props) {
        super(props);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    handleSubmit(form) {

        this.props.dispatch(actions.updateUser(this.props, form));
    }

    afterOpenModal() {
        console.debug("afterOpenModal")
    }

    closeModal() {
        console.debug("closeModal");
        this.props.dispatch(actions.closeUserForm());
    }


    render() {

        const usercard = this.props.usercard;
        const headKey = (usercard.user) ? "form.editUser" : "form.addUser";
        const translate = this.props.translate;
        return (
            <Modal
                isOpen={usercard.isFormOpened}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="User Form"
            >

                <div className='usercard'>
                    <div className='usercard-head'>
                        <div className="usercard-head-left"><h2>{translate(headKey)}</h2></div>
                        <div className="usercard-head-right">
                            <button className="btn btn-usercard-close" onClick={this.closeModal}
                                    title={translate('form.close')}>
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <UserForm onSubmit={this.handleSubmit.bind(this)}/>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        usercard: state.usercard
    }
};

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps)(UserCard);