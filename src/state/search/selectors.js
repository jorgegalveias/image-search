import { SORT_BY } from './constants';

export const getSearchTerm = state => state.search.term;

export const getSortBy = state => state.search.sortBy;

export const getItemsPerPage = state => state.search.itemsPerPage || 10;

export const getTotal = state => state.search.total;

export const getGridColumns = state => state.search.gridColumns || 3;

export const getGridColumnsOrder = state => {
    const columns = getGridColumns(state);

    const order = [];

    for (let i = 1; i <= columns; i++) {
        order.push(i % columns);
    }

    return order;
}

/**
 * Return total number of page
 * * If total page is lower or equal than 10 return _totalPages_ otherwise return _10_
 * @param {*} state
 */
export const getTotalPages = state => {
    const total = state.search.totalPages;
    if (!total) {
        return 0;
    }

    return total <= 10 ? total : 10;
}

export const getSearchError = state => state.search.error;

const getSearchResults = state => state.search.byPageId;

const getResultByPage = (state, page) => {
    const results = getSearchResults(state);
    return results ? results[page] : null;
}

const sortByDate = (a, b, asc = true) => {
    const dateA = new Date(a.updated_at);
    const dateB = new Date(b.updated_at);
    let res = 0;

    if (dateA < dateB) res = -1;
    if (dateA > dateB) res = 1;

    return asc ? res : res * -1;
}
//TODO: Use Reselect to improve performance
export const getImages = (state, page = 1) => {
    const imageResult = getResultByPage(state, page);
    const images = imageResult ? imageResult.results : null;

    if (!Array.isArray(images)) {
        return null;
    }

    const sortedImage = images.slice();
    const sortBy = getSortBy(state);

    switch (sortBy) {
        case SORT_BY.LEAST_RECENT:
            sortedImage.sort((a, b) => sortByDate(a, b, true));
            break;
        case SORT_BY.MOST_RECENT:
            sortedImage.sort((a, b) => sortByDate(a, b, false));
            break;

        default:
            break;
    }

    return sortedImage;
}


export const getIsloading = (state, page = 1) => {
    const imageResult = getResultByPage(state, page);

    return imageResult ? imageResult.isLoading : false;
}

export const showRefiner = (state, page = 1) => {
    const loading = getIsloading(state, page);
    const images = getImages(state, page);
    const error = getSearchError(state);

    if (loading || error) {
        return false;
    }

    return images !== null;
}