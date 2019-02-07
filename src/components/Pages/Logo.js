import React, { Component } from 'react';
import logo from '../../logo.svg';
import styles from './Logo.module.scss';

class Logo extends Component {
    render() {
        return (
            <main className={this.props.className}>
                <div className={styles.root}><img alt='Search' src={logo} /></div>
            </main>
        );
    }
}

export default Logo;