import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UserRow extends Component {

    static propTypes = {
        item: PropTypes.shape({
            id: PropTypes.number,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            email: PropTypes.string,
            age: PropTypes.number
        }).isRequired,
        onSelect: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
        isSelected: PropTypes.bool.isRequired,
        translate: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {

        const item = this.props.item;
        const cssStr = (this.props.isSelected) ? ' userrow-act' : '';
        
        return (

            <tr onClick={this.props.onSelect.bind(this, item)} className={`userrow${cssStr}`}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.age}</td>
                <td>
                    <button type='button' className="btn btn-user-row btn-user-row-delete"
                        onClick={e => { e.stopPropagation(); this.props.onDelete(item) }}
                        title={this.props.translate('hint.deleteUser')}
                    >
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                    
                    <button type='button' className="btn btn-user-row btn-user-row-edit"
                        onClick={e => { e.stopPropagation(); this.props.onEdit(item); }}
                        title={this.props.translate('hint.editUser')}
                    >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>

        );
    }
}