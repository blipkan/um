import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class SearchBar extends Component {

    static propTypes = {
        query: PropTypes.string,
        onSubmit: PropTypes.func.isRequired,
        translate: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);


    }

    onChange() {
        if (this.input.value) {
            this.btnClear.style.display = 'inline-block';
        } else {
            this.btnClear.style.display = 'none';
        }
    }

    onClear() {
        console.debug("onClear", this.input.value);
        this.input.value = '';
        this.btnClear.style.display = 'none';
    }

    render() {
        console.debug("this.props.query", this.props.query);
        const subclassClear = (this.props.query) ? '' : ' empty';
        console.debug("subclassClear", subclassClear);
        return (
            <div className="searchbar" >
                <form id="searchForm" onSubmit={e => { e.preventDefault(); this.props.onSubmit(this.input.value) }} >

                    <input type="text" className="inp-search"
                        ref={input => this.input = input}
                        placeholder={this.props.translate('search.placeholder')}
                        defaultValue={this.props.query}
                        onChange={this.onChange.bind(this)}
                    />
                    <button className={`btn-search-clear${subclassClear}`}
                        type="button"
                        title={this.props.translate('hint.clearUserSearch')}
                        ref={btnClear => this.btnClear = btnClear}
                        onClick={this.onClear.bind(this)}
                    >
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                    <button type="submit" className="btn btn-search-submit" title={this.props.translate('hint.searchUser')}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>

                </form>
            </div>

        );
    }
}