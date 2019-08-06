import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AlertContainer, Alert} from "react-bs-notifier";
import {dismissMessage} from '../actions';


export default class Message extends Component {

    static propTypes = {
        translate: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        messages: PropTypes.array
    };

    static defaultTimeout = 3;


    constructor(props) {
        super(props);
    }

    onDismiss(msg) {
        console.debug('onDismiss', msg);
        this.props.dispatch(dismissMessage(msg));
    }


    render() {
        console.debug('render messages', this.props);
        const translate = this.props.translate;

        return (
            
            <AlertContainer position="top-left">
                {
                    this.props.messages.map((message, index) => {
                        let timeout = ((message.timeout) ? message.timeout : Message.defaultTimeout) * 1000;

                        return (
                            <Alert timeout={timeout} type={message.type}
                                   headline={translate(`${message.key}.title`, message.args)}
                                   onDismiss={this.onDismiss.bind(this, message)} key={`msg-${index}`}>
                                {translate(`${message.key}.text`, message.args)}
                            </Alert>

                        )
                    })
                }


            </AlertContainer>

        );
    }
}