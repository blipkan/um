import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {getTranslate, getActiveLanguage} from 'react-localize-redux';


/* Validation fuctions */

const required = (value, allValues, props) => (value ? undefined : props.translate('valid.required'));

const maxLength = max => (value, allValues, props) =>
    value && value.length > max ? props.translate('valid.maxLength', {num: max}) : undefined;

const maxLength15 = maxLength(15);

const minLength = min => (value, allValues, props) =>
    value && value.length < min ? props.translate('valid.minLength', {num: min}) : undefined;

const minLength2 = minLength(2);

const number = (value, allValues, props) =>
    value && isNaN(Number(value)) ? props.translate('valid.number') : undefined;

const minValue = min => (value, allValues, props) =>
    value && value < min ? props.translate('valid.minValue', {num: min}) : undefined;

const minValue12 = minValue(12);

const email = (value, allValues, props) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? props.translate('valid.email')
        : undefined;

const tooOld = (value, allValues, props) =>
    value && value > 110 ? props.translate('valid.tooOld') : undefined;


const userName = (value, allValues, props) =>
    value && /[%]/i.test(value)
        ? props.translate('valid.userName')
        : undefined;


const renderField = ({
                         input,
                         label,
                         type,
                         meta: {touched, error, warning}
                     }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched &&
            ((error && <span className='error'>{error}</span>) ||
                (warning && <span className='warning'>{warning}</span>))}
        </div>
    </div>
);

let UserForm = props => {
    const {handleSubmit, pristine, reset, submitting, translate} = props;

    return (

        <div>

            <form onSubmit={e => {
                e.preventDefault();
                handleSubmit()
            }}>
                <Field
                    name="firstName"
                    type="text"
                    component={renderField}
                    label={translate('user.firstName')}
                    validate={[required, maxLength15, minLength2]}
                    warn={userName}
                />
                <Field
                    name="lastName"
                    type="text"
                    component={renderField}
                    label={translate('user.lastName')}
                    validate={[required, maxLength15, minLength2]}
                    warn={userName}
                />
                <Field
                    name="email"
                    type="email"
                    component={renderField}
                    label={translate('user.email')}
                    validate={[required, email]}
                />
                <Field
                    name="age"
                    type="number"
                    component={renderField}
                    label={translate('user.age')}
                    validate={[required, number, minValue12]}
                    warn={tooOld}
                />
                <div>
                    <button type="submit" disabled={submitting}>
                        {translate('form.submit')}
                    </button>
                    <button type="button" disabled={pristine || submitting} onClick={reset}>
                        {translate('form.clear')}
                    </button>
                </div>
            </form>
        </div>
    )
};


// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
UserForm = reduxForm({
    form: 'userForm' // a unique identifier for this form
})(UserForm);

// You have to connect() to any reducers that you wish to connect to yourself
UserForm = connect(
    state => ({
        initialValues: state.usercard.user, // pull initial values from usercard reducer
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code
    })
)(UserForm);

export default UserForm


