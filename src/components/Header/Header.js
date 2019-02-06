import React, { PureComponent } from 'react';
import styles from './Header.module.scss';

export class Header extends PureComponent {
    render() {
        return (
            <header className={styles.header} >
                <h1>Welcome to Image Search</h1>
            </header>
        );
    }
}

export default Header;

