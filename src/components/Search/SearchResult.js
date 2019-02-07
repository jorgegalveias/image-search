import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import throttle from 'lodash.throttle';
import styles from './SearchResult.module.scss';
import search from '../../state/search';
import ImageCard from '../ImageCard/ImageCard';
import Spinner from '../Spinner/Spinner';

class SearchResult extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            images: null,
            grid: null,
            hasGrid: false,
        };
    }

    componentDidMount() {
        this.mounted = true;

        window.addEventListener('resize', this.throttledResize);
        this.updateGrid();
    }

    componentWillMount() {
        this.mounted = false;
        this.throttledResize.cancel();
    }

    getItemOrder = () => {
        const start = 0;
        return Array(this.props.itemsPerPage - start).fill().map((item, index) => start + index);
    }

    getGrid = () => {
        const arr = this.getItemOrder();
        const gridColumnsId = this.props.columnsOrder;
        const { columns } = this.props;

        const placeLastItem = arr.length % columns === 1;

        const grid = gridColumnsId.reduce((acc, columnId) => {
            const imgs = arr.filter((id, index) => {
                const col = id + 1;

                if (col < arr.length) {
                    return col % columns === columnId;
                }

                if (!placeLastItem) {
                    return col % columns === columnId;
                }

                return col === arr.length && columnId === 0
            })

            return [...acc, imgs]
        }, []);

        return grid;
    }

    updateGrid = () => {
        if (window.innerWidth <= 900) {
            if (this.mounted && this.state.hasGrid) {
                this.setState({ hasGrid: false });
            }
            return;
        }

        //Prevent setting state after component is unmounted
        if (this.mounted) {
            const state = this.state.grid ? { hasGrid: true } : { grid: this.getGrid(), hasGrid: true };

            this.setState({ ...state })
        }
    }
    throttledResize = throttle(this.updateGrid, 300);

    render3ColumnGrid = () => {
        const { grid, hasGrid } = this.state;

        if (!grid || !hasGrid) {
            return this.props.images.map(image => <ImageCard key={image.id} image={image} className={styles.imageRow} />);
        }

        return grid.map((images, index) => (
            <div key={index} className={styles.columns}>
                {images.map(id => this.props.images[id] ? <ImageCard key={this.props.images[id].id} image={this.props.images[id]} index={id} className={styles.item} /> : null)}
            </div>
        ))
    };

    render() {
        return (
            <div className={classNames(styles.searchResult, this.props.isLoading && styles.loading)}>
                {this.props.isLoading && <Spinner />}
                {!this.props.isLoading && this.props.images && this.render3ColumnGrid()}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    images: search.selectors.getImages(state, ownProps.page),
    error: search.selectors.getSearchError(state),
    isLoading: search.selectors.getIsloading(state, ownProps.page),
    total: search.selectors.getTotal(state),
    itemsPerPage: search.selectors.getItemsPerPage(state),
    columns: search.selectors.getGridColumns(state),
    columnsOrder: search.selectors.getGridColumnsOrder(state),
});

export default connect(mapStateToProps)(SearchResult);
