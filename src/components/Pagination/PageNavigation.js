import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './PageNavigation.module.scss';

export class PageNavigation extends PureComponent {

    hasPrev = () => (this.props.page - 1 > 0)

    hasNext = () => (this.props.page + 1 <= this.props.totalPages)

    isDisabled = () => {
        if (!this.props.prev && !this.props.next) {
            return false;
        }

        if(this.props.prev){
            return !this.hasPrev();
        }

        return this.props.next && !this.hasNext();
    }

    getLink = () => {
        if (this.props.prev) {
            return this.hasPrev() ? `/${this.props.page - 1}` : '/';
        }

        if (this.props.next) {
            return this.hasNext() ? `/${this.props.page + 1}` : '/';
        }

        return `/${this.props.id}`;
    }

    renderContent = () => {
        if (this.props.prev) {
            return <FontAwesomeIcon icon='arrow-left' fixedWidth className={styles.icon} />;
        }

        if (this.props.next) {
            return <FontAwesomeIcon icon='arrow-right' fixedWidth className={styles.icon} />;
        }

        return this.props.text;
    }

    render() {
        return (
            <NavLink to={this.getLink()}
                className={classNames(
                    styles.root,
                    this.props.className,
                    this.props.active && styles.active,
                    this.isDisabled() && styles.disabled,
                    this.props.prev && styles.prev,
                    this.props.next && styles.next
                )}
                activeClassName={this.props.active ?  styles.active : undefined}
            >
                {this.renderContent()}
            </NavLink>
        );
    }
}

PageNavigation.propTypes = {
    id: PropTypes.number,
    text: PropTypes.any,
    prev: PropTypes.bool,
    next: PropTypes.bool,
    totalPages: PropTypes.number,
    page: PropTypes.number,
}

export default PageNavigation;

