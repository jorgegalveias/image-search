import React, { Component } from 'react';

import Header from '../Header/Header';
import styles from './HomePage.module.scss';
import { Search } from '../Search/Search';
import { Pagination } from '../Pagination/Pagination';
import { SearchResult } from '../Search/SearchResult';

class HomePage extends Component {
    render() {
        return (
            <div className={styles.homePage}>
                <Header />
                <Search />
                <main className={styles.main}>
                    <SearchResult />
                    <Pagination />
                </main>
            </div>
        );
    }
}

export default HomePage;