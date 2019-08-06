import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ColHeader from '../components/ColHeader'
import SearchBar from '../components/SearchBar'
import LangBar from '../components/LangBar'
import UserRow from '../components/UserRow'
import Message from '../components/Message'

import {getTranslate, getActiveLanguage, setActiveLanguage} from 'react-localize-redux';
import * as actions from '../actions';
import {SortOrder, languages} from '../constants';

import confirmDeleteUser from '../util/confirm';


class UserList extends Component {
    constructor(props) {
        super(props);
        this.sortByCol = this.sortByCol.bind(this);
        this.searchUser = this.searchUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.selectUser = this.selectUser.bind(this);
        this.changeLang = this.changeLang.bind(this);
    }

    sortByCol(col) {
        const req = {
            query: this.props.userlist.query,
            sort: {
                by: col.by,
                order: (col.order === SortOrder.DESC) ? SortOrder.ASC : SortOrder.DESC
            }
        };

        console.debug('sortByCol req', req);
        this.props.dispatch(actions.fetchUsers(this.props, req));
    }

    selectUser(user) {
        console.debug('selecting user', user);
        this.props.dispatch(actions.selectUser(user));
    }

    deleteUser(user) {

        console.debug('deleting user', user);
        this.selectUser(user);
        confirmDeleteUser(this.props.translate, user).then(() => {
            console.debug('proceed!');
            this.props.dispatch(actions.deleteUser(this.props, user));
        }, () => {
            console.debug('cancel deleting user!');
        });
    }

    editUser(user) {
        console.debug('edit user', user);
        this.props.dispatch(actions.editUser(user));
    }

    searchUser(text) {
        const req = {
            query: text,
            sort: this.props.userlist.sort
        };
        console.debug('searchUser ', req);
        this.props.dispatch(actions.fetchUsers(this.props, req));
    }

    addUser() {
        console.debug('show new user form ');
        this.props.dispatch(actions.addUser());
    }

    changeLang(code) {
        this.props.dispatch(setActiveLanguage((languages.indexOf(code) !== -1) ? code : 'ru'));
    }

    componentDidMount() {
        this.searchUser('');
    }

    render() {
        const list = this.props.userlist;
        const translate = this.props.translate;
        const tableSubClass = (list.isFetching) ? ' loading' : '';

        console.debug('render UserList', this.props);
        console.debug('isFetching', list.isFetching);
        return (
            <div>

                <Message translate={translate} messages={list.messages} dispatch={this.props.dispatch}/>
                <div className="toolbar">
                    {/* <button type='button' className="btn toolbar-btn" onClick={this.addUser}>add</button> */}
                </div>
                <LangBar onChange={this.changeLang} translate={translate} currentLanguage={this.props.currentLanguage}/>
                <SearchBar query={list.query} onSubmit={this.searchUser} translate={translate}/>
                {list.isFetching &&
                <div className="user-list-splash"><i className="fa fa-refresh fa-spin fa-4x"></i></div>
                }
                {<table className={`user-list${tableSubClass}`}>
                    <thead>
                    <tr>
                        <ColHeader by="id" title="id" sort={list.sort} onSort={this.sortByCol} translate={translate}/>
                        <ColHeader by="firstName" title={translate('user.firstName')} sort={list.sort}
                                   onSort={this.sortByCol} translate={translate}/>
                        <ColHeader by="lastName" title={translate('user.lastName')} sort={list.sort}
                                   onSort={this.sortByCol} translate={translate}/>
                        <ColHeader by="email" title={translate('user.email')} sort={list.sort} onSort={this.sortByCol}
                                   translate={translate}/>
                        <ColHeader by="age" title={translate('user.age')} sort={list.sort} onSort={this.sortByCol}
                                   translate={translate}/>
                        <td colSpan='2'>
                            <button type='button' className="btn btn-add" onClick={this.addUser}
                                    title={translate('hint.addUser')}
                            >
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </button>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.userlist.items.map(item => {
                            return (
                                <UserRow item={item} key={`user-row-${item.id}`}
                                         onSelect={this.selectUser}
                                         onDelete={this.deleteUser}
                                         onEdit={this.editUser}
                                         isSelected={item.id === list.selectedId}
                                         translate={translate}
                                />
                            )
                        })
                    }

                    </tbody>
                </table>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        userlist: state.userlist
    }
};

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}


export default connect(mapStateToProps)(UserList);