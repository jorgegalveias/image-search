import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Pagination.module.scss';
import { PageNavigation } from './PageNavigation';

export class Pagination extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            firstPageId: 0,
            pageId: 1,
            itemsPerPage: 10,
            totalItems: 90,
        }
    }

    goToPreviousPage = () => {
        if (this.state.pageId - 1 >= this.state.firstPageId) {
            this.setState(
                (prevState) => ({ pageId: prevState.pageId - 1 }),
                () => this.navegateToPage(this.state.pageId)
            );
        }
    }

    goToNextPage = () => {
        const maxPageNumber = this.getNumberOfPages();
        const { pageId } = this.state;

        if (pageId + 1 <= maxPageNumber) {
            this.setState(
                (prevState) => ({ pageId: prevState.pageId + 1 }),
                () => this.navegateToPage(this.state.pageId)
            );
        }
    }

    navegateToPage = (pageId) => {
        console.log('pageId', pageId);
        this.setState({ pageId: pageId });
    }

    getNumberOfPages = () => (Math.ceil(this.state.totalItems / this.state.itemsPerPage))

    getNavigation = () => {
        const totalNav = this.getNumberOfPages();
        const nav = [];

        for (let pageId = 0; pageId <= totalNav; pageId++) {
            nav.push(<PageNavigation
                key={pageId}
                id={pageId}
                active={pageId === this.state.pageId}
                displayValue={pageId + 1}
                onClick={this.navegateToPage}
            />)
        }

        return nav;
    }

    render() {
        const maxPageNumber = this.getNumberOfPages();

        return (
            <div className={styles.pagination}>
                <div
                    className={classNames(styles.previous, styles.nav, this.state.pageId === this.state.firstPageId && styles.disable)}
                    onClick={this.goToPreviousPage}
                >
                    <FontAwesomeIcon icon='arrow-left' fixedWidth className={styles.icon} />
                </div>
                {this.getNavigation()}
                <div
                    className={classNames(styles.next, styles.nav, this.state.pageId === maxPageNumber && styles.disable)}
                    onClick={this.goToNextPage}
                >
                    <FontAwesomeIcon icon='arrow-right' fixedWidth className={styles.icon} />
                </div>
            </div>
        );
    }
}

export default Pagination;

