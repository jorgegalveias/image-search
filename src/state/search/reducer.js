
import createReducer from '../CreateReducer';
import * as actiontypes from './actionTypes';

const setSortBy = (state, action) => ({
    ...state,
    sortBy: action.payload,
});


const setLoading = (state, action) => {
    const { page, fetchDate, term } = action.payload;
    const { byPageId } = state;
    const data = byPageId[page] || {};

    return {
        ...state,
        term,
        fetchDate,
        byPageId: {
            ...byPageId,
            [page]: {
                ...data,
                isLoading: true,
            }
        }

    }
};

const setSearchData = (state, action) => {
    const { page, results, total, totalPages } = action.payload;
    const { byPageId } = state;
    const currentData = byPageId[page] || {};

    return {
        ...state,
        total: total,
        totalPages: totalPages,
        byPageId: {
            ...byPageId,
            [page]: {
                ...currentData,
                results: results,
                isLoading: false,
            }
        }
    }
};

const setError = (state, action) => ({
    ...state,
    total: null,
    totalPages: null,
    byPageId: {},
    fetchDate: null,
    error: action.payload,
});

const reset = (state, action ) => ({...initialState});

const initialState = {
    term: '',
    gridColumns: 3,
    sortBy: null,
    itemsPerPage: 10,
    total: null,
    totalPages: null,
    byPageId: {},
    fetchDate: null,
    error: null,
};

const reducer = createReducer(initialState, {
    [actiontypes.SET_SORT_BY]: setSortBy,
    [actiontypes.RESET]: reset,
    [actiontypes.SEARCH_IMAGES_REQUEST]: setLoading,
    [actiontypes.SEARCH_IMAGES_SUCCESS]: setSearchData,
    [actiontypes.SEARCH_IMAGES_FAILURE]: setError,
})

export default reducer;