import React, { PureComponent } from 'react';

import styles from './Refiner.module.scss';

export class Refiner extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: 'placeholder',
        }
    }

    onChange = (event) => {
        console.log('value', event.target.value);
        this.setState({ value: event.target.value });
    }


    render() {
        return (
            <div className={styles.refiner} >
                <select
                    value={this.state.value}
                    onChange={this.onChange}
                    className={styles.sort}
                >
                    <option value='placeholder' hidden>Sort by</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>
            </div>
        );
    }
}

export default Refiner;

