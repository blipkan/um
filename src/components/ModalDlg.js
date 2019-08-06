import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import {connect, Provider} from 'react-redux';


import {Dialogs} from '../constants';
import {getTranslate, getActiveLanguage} from 'react-localize-redux';

import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import {confirmable} from 'react-confirm';

class ModalDlg extends Component {

    constructor(props) {
        super(props);
    }

    defineTitleKey() {
        console.debug('makeTitleKey', this.props);

        if (this.props.dialog === Dialogs.CONFIRM_DELETE_USER) {
            return 'dlg.title.CONFIRM_DELETE_USER'
        }
        else if (this.props.dialog === Dialogs.MSG_USER_DELETE_OK) {
            return 'dlg.title.MSG_USER_DELETE_OK'
        }
        else if (this.props.msgKey) {
            return this.props.msgKey
        }
        return '';
    }

    defineSubClassName() {
        if (this.props.status) {
            return ' ' + this.props.status;
        }
    }

    renderBody() {
        console.debug('renderBody', this.props);


        if (this.props.dialog === Dialogs.CONFIRM_DELETE_USER) {
            return (
                this.renderUser(this.props.user)
            )
        }


        return '';
    }

    renderUser(user) {
        return (
            <div>
                {user.id} <br/>
                {user.firstName} <br/>
                {user.lastName} <br/>
                {user.email} <br/>
            </div>

        )
    }

    renderFooterButtons() {
        if (this.props.dialog === Dialogs.CONFIRM_DELETE_USER) {
            return (
                <div>
                    <Button onClick={this.props.cancel}>{this.props.translate('btn.cancel')}</Button>
                    <Button className='button-l' bsStyle="primary"
                            onClick={this.props.proceed}>{this.props.translate('btn.delete')}</Button>
                </div>
            )
        }
        return (

            <Button onClick={this.props.cancel}>{this.props.translate('btn.msg')}</Button>
        )

    }


    render() {
        const {
            okLabbel = 'OK',
            cancelLabel = 'Cancel',
            title,
            confirmation,
            show,
            proceed,
            dismiss,
            cancel,
            enableEscape = true,
            translate,
            dialog,
            status
        } = this.props;

        console.debug('ModalDlg', this.props);


        return (

            <div className="static-modal">
                <Modal dialogClassName={`dlg-modal${this.defineSubClassName()}`} show={show} onHide={dismiss}
                       backdrop={enableEscape ? true : 'static'} keyboard={enableEscape}>
                    <Modal.Header closeButton={true}>
                        <Modal.Title>{translate(this.defineTitleKey())}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.renderBody()}
                    </Modal.Body>
                    <Modal.Footer>
                        {this.renderFooterButtons()}
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
}

ModalDlg.propTypes = {
    okLabbel: PropTypes.string,
    cancelLabel: PropTypes.string,
    title: PropTypes.string,
    confirmation: PropTypes.string,
    show: PropTypes.bool,
    proceed: PropTypes.func,     // called when ok button is clicked.
    cancel: PropTypes.func,      // called when cancel button is clicked.
    dismiss: PropTypes.func,     // called when backdrop is clicked or escaped.
    enableEscape: PropTypes.bool,
    translate: PropTypes.func.isRequired,
    dialog: PropTypes.string.isRequired
};


const mapStateToProps = (state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
    }
};


export default confirmable(ModalDlg);