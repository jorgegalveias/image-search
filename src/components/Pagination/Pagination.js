import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Pagination.module.scss';
import { PageNavigation } from './PageNavigation';

import search from '../../state/search';

class Pagination extends PureComponent {

    getPages = (start, end) => {
        return Array(end || 10 - start + 1).fill().map((item, index) => start + index);
    }

    getNavigation = () => {
        const end = this.props.totalPages;
        const pages = this.getPages(1, end)

        return pages.map(pageId => (<PageNavigation
            key={pageId}
            id={pageId}
            active={pageId === this.props.page}
            text={pageId}
        />))
    }

    render() {
        if (!this.props.totalPages || this.props.totalPages <= 1) {
            return null;
        }

        return (
            <div className={styles.pagination}>
                <PageNavigation
                    prev
                    page={this.props.page}
                    totalPages={this.props.totalPages}
                    className={styles.nav}
                />
                {this.getNavigation()}
                <PageNavigation
                    next
                    page={this.props.page}
                    totalPages={this.props.totalPages}
                    className={styles.nav}
                />
            </div>
        );
    }
}

PageNavigation.propTypes = {
    page: PropTypes.number,
    totalPages: PropTypes.number,
    perPage: PropTypes.number,
}

const mapStateToProps = (state) => ({
    totalPages: search.selectors.getTotalPages(state),
    perPage: search.selectors.getItemsPerPage(state),
});

export default connect(mapStateToProps)(Pagination);

