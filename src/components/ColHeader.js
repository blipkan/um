import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SortOrder } from '../constants';

export default class ColHeader extends Component {

    static propTypes = {
        by: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        translate: PropTypes.func.isRequired,
        sort: PropTypes.shape({
            by: PropTypes.string,
            order: PropTypes.oneOf([SortOrder.ASC, SortOrder.DESC])
        })
    };

    constructor(props) {
        super(props);
        this.order = SortOrder.ASC;
    }

    onClick() {
        this.props.onSort({ by: this.props.by, order: this.order });
    }

    render() {
        const isSorted = this.props.sort && (this.props.by === this.props.sort.by);
        const orderStr = (isSorted) ? this.props.sort.order : '';
        this.order = (isSorted) ? this.props.sort.order : SortOrder.ASC;

        return (
            <th className={`colheader ${orderStr}`}
                onClick={this.onClick.bind(this)}
                title={this.props.translate('hint.sortUsers', { by: this.props.title })}
            >
                {this.props.title}
            </th>

        );
    }
}
