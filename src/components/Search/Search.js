import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Search.module.scss';
import Refiner from './Refiner';

import search from '../../state/search';

class Search extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            term: '',
        }
    }

    onChange = (event) => {
        const term = event.target.value;
        this.setState({ term: event.target.value });


        if (term === '') {
            this.props.history.push('/');
            this.props.reset();
        }
    }

    onEnter = (event) => {
        const code = event.keyCode ? event.keyCode : event.which;

        if (code === 13) {
            event.preventDefault();
            this.onSearch();
        }
    }

    onSearch = () => {
        this.props.history.push('/1');
        this.props.searchImages(1, this.state.term);
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
                                type='search'
                                name='q'
                                value={this.state.term}
                                className={styles.input}
                                onChange={this.onChange}
                                onKeyPress={this.onEnter}
                            />
                            <span className={styles.searchIcon} ><FontAwesomeIcon icon='search' fixedWidth /></span>
                        </div>
                    </div>
                    <button className={styles.searchButton} onClick={this.onSearch} disabled={this.state.term === ''}>
                        <FontAwesomeIcon icon='search' fixedWidth className={styles.icon} />Search
                    </button>
                </div>
                {this.props.showRefiner && <Refiner />}
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    searchTerm: search.selectors.getSearchTerm(state),
    showRefiner: search.selectors.showRefiner(state, ownProps.page),
});

const mapDispatchToProps = (dispatch) => ({
    searchImages: (page, term) => dispatch(search.actions.searchImages(page, term)),
    reset: () => dispatch(search.actions.reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));

