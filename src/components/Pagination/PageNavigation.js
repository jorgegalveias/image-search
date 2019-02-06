import React, { PureComponent } from 'react';
import classNames from 'classnames';

import styles from './PageNavigation.module.scss';

export class PageNavigation extends PureComponent {

    onClick = () => {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <div onClick={this.onClick} className={classNames(styles.pageNavigation, this.props.className, this.props.active && styles.active)}>
                {this.props.displayValue}
            </div>
        );
    }
}

export default PageNavigation;

