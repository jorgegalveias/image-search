import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import styles from './Refiner.module.scss';

import search from '../../state/search';
const { SORT_BY, SORT_BY_TEXT } = search.constants;

class Refiner extends PureComponent {
    onChange = (event) => {
        this.props.setSortBy(event.target.value);
    }

    renderOptions = () => (Object.keys(SORT_BY).map(key => <option key={key} value={key}>{SORT_BY_TEXT[key]}</option>))

    render() {
        return (
            <div className={styles.refiner} >
                <select
                    value={this.props.value || 'placeholder'}
                    onChange={this.onChange}
                    className={styles.sort}
                >
                    <option key={'placeholder'} value='placeholder' hidden>Sort by</option>
                    {this.renderOptions()}
                </select>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    value: search.selectors.getSortBy(state),
});

const mapDispatchToProps = (dispatch) => ({
    setSortBy: (sort) => dispatch(search.actions.setSortBy(sort)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Refiner);

