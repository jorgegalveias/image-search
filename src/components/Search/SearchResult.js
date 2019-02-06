import React, { PureComponent } from 'react';

import styles from './SearchResult.module.scss';

export class SearchResult extends PureComponent {
    renderSearchResult = (columnId) => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        return arr.filter((id, index) => {
            if (id < arr.length) {
                return id % 3 === columnId;
            }
            return id === arr.length && columnId === 0
        }).map((id, index) => (
            <div
                key={index}
                style={{
                    width: '100%',
                    height: `${id * 55}px`,
                }}
                className={styles.result}
            >
                <div className={styles.content}>Image {id}</div>
            </div>
        ));
    }


    render() {
        return (
            <div className={styles.searchResult}>
                <div>{this.renderSearchResult(1)}</div>
                <div>{this.renderSearchResult(2)}</div>
                <div>{this.renderSearchResult(0)}</div>
            </div>
        );
    }
}

export default SearchResult;

