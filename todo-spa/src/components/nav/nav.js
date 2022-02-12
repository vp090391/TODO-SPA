import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './nav.css';

export default class Nav extends Component {
    render() {
        return (
            <nav className={'nav'}>
                <Link to={'/'}>
                    Main page
                </Link>
                <Link to={'/todo'}>
                    Todo page
                </Link>
            </nav>
        )
    }
}