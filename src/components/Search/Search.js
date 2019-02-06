import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Search.module.scss';
import { Refiner } from './Refiner';

export class Search extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
        }
    }

    onChange = (event) => {
        console.log('serachTerm', event.target.value);
        this.setState({ searchTerm: event.target.value });
    }

    onSearch = () => {
        console.log('Perform Search');
    }

    render() {
        return (
            <div className={styles.searchBox}>
                <div className={styles.searchContainer} >
                    <div className={styles.inputContainer}>
                        <label htmlFor='search-input' className={styles.label}>Hey, try typing something...</label>
                        <div className={styles.search}>
                            <input
                                id='search-input'
                                type='text'
                                onChange={this.onChange}
                                value={this.state.searchTerm}
                                className={styles.input}
                            />
                            <span className={styles.searchIcon} ><FontAwesomeIcon icon='search' fixedWidth /></span>
                        </div>
                    </div>
                    <button className={styles.searchButton} onClick={this.onSearch}>
                        <FontAwesomeIcon icon='search' fixedWidth className={styles.icon} />Search
                    </button>
                </div>
                <Refiner />
            </div>
        );
    }
}

export default Search;

