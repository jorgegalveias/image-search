import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import styles from './HomePage.module.scss';
import Search from '../Search/Search';
import SearchPage from './SearchPage';
import Logo from './Logo';
import ErrorPage from './ErrorPage'

import search from '../../state/search';

class HomePage extends Component {
    componentWillReceiveProps(nextProps) {
        const nextPage = parseInt(nextProps.match.params.pageId);
        const currentPage = parseInt(this.props.match.params.pageId);

        if (nextPage !== currentPage && !isNaN(nextPage)) {
            this.props.searchImages(nextPage);
        }

    }

    render() {
        const pageId = parseInt(this.props.match.params.pageId);
        const page = isNaN(pageId) ? 1 : pageId;

        return (
            <div className={styles.homePage}>
                <Header />
                <Search page={page}/>
                <Switch>
                    {(!this.props.searchTerm || !pageId) && <Route render={props => <Logo {...props} className={styles.main} />} />}
                    {this.props.error && <Route render={props => <ErrorPage {...props} className={styles.main}/>}/>}
                    <Route path='/:pageId?' render={props => <SearchPage page={page} className={styles.main} />} />
                </Switch>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    searchTerm: search.selectors.getSearchTerm(state),
    error: search.selectors.getSearchError(state),
});

const mapDispatchToProps = (dispatch) => ({
    setSearchTerm: (serachTerm) => dispatch(search.actions.setSearchTerm(serachTerm)),
    searchImages: (page) => dispatch(search.actions.searchImages(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
