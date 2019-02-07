import React, { Component } from 'react';
import styles from './ErrorPage.module.scss';

class ErrorPage extends Component {
    render() {
        return (
            <main className={this.props.className}>
                <div className={styles.root}>
                    <h1>Opps Something went wrong</h1>
                </div>
            </main>
        );
    }
}

export default ErrorPage;