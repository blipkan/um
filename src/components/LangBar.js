import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Locales} from '../constants';


export default class LangBar extends Component {

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        translate: PropTypes.func.isRequired,
        currentLanguage: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
    }

    onSelect(code) {
        this.refs.langList.style.display = 'none';
        this.props.onChange(code);
    }

    onControlOver() {
        this.refs.langList.style.display = 'block';
    }

    onControlOut() {
        this.refs.langList.style.display = 'none';
    }


    render() {
        const icon_base = 'data/i/lang/';
        const curLangCode = this.props.currentLanguage;
        const curLocale = Locales[curLangCode];


        return (
            <div className="lang-bar">
                <div className="lang-control" onMouseOver={this.onControlOver.bind(this)}
                     onMouseOut={this.onControlOut.bind(this)}>
                    <button className="btn lang-btn"><img src={`${icon_base}${curLangCode}.png`} alt={curLocale.name}></img></button>
                    <div className="lang-list" ref="langList">
                        <span onClick={this.onSelect.bind(this, curLocale.code)} title={curLocale.name}
                              key={curLocale.code}>
                            {curLocale.name}
                            <img src={`${icon_base}${curLocale.code}.png`} alt={curLocale.name}></img>
                        </span>
                        {Object.values(Locales).map((lang) => {
                                return (lang.code !== curLangCode) && (
                                    <span onClick={this.onSelect.bind(this, lang.code)} title={lang.name} key={lang.code}>
                                    {lang.name}
                                        <img src={`${icon_base}${lang.code}.png`} alt={curLocale.name}></img>
                                </span>

                                )
                            }
                        )
                        }

                    </div>
                </div>
            </div>

        );
    }
}