import React, { Component } from 'react';

import Pagination from '../Pagination/Pagination';
import SearchResult from '../Search/SearchResult';

class SearchPage extends Component {
    render() {
        const {page} = this.props;

        return (
            <main className={this.props.className}>
                <SearchResult page={page} />
                <Pagination page={page} />
            </main>
        );
    }
}

export default SearchPage;