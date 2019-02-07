import * as actionTypes from './actionTypes';
import { getSearchTerm, getItemsPerPage, getImages } from './selectors';
//import imagesSample from './images.sample.json';

import Unsplash from 'unsplash-js';

const unsplash = new Unsplash({
    applicationId: process.env.REACT_APP_UNSPLASH_APP_ACCESS_KEY,
    secret:  process.env.REACT_APP_UNSPLASH_APP_SECRET_KEY,
    callbackUrl: process.env.REACT_APP_UNSPLASH_APP_CALLBACK_URL
});

export const setSortBy = (sortBy) => ({
    type: actionTypes.SET_SORT_BY,
    payload: sortBy,
});

export const reset = () => ({
    type: actionTypes.RESET,
});

//TODO: Check if cache has expired
export const searchImages = (page, term) => (dispatch, getState) => {

    const state = getState();
    const currentTerm = getSearchTerm(state);
    const currentImages = getImages(state, page)

    //Return cache and do not perform search
    if (term && term === currentTerm && currentImages) {
        return dispatch({
            type: actionTypes.SEARCH_IMAGES_CACHE,
        });
    }

    //Search comes from pagination - retunr cache
    if (!term && currentImages) {
        return dispatch({
            type: actionTypes.SEARCH_IMAGES_CACHE,
        });
    }

    //Clen up store when seraching new terms
    if (term && term !== currentTerm) {
        dispatch(reset());
    }

    const searchTerm = term || getSearchTerm(state);
    const itemsPerPage = getItemsPerPage(state) || 10;

    if (!searchTerm) {
        return;
    }
    dispatch({
        type: actionTypes.SEARCH_IMAGES_REQUEST,
        payload: {
            page: page || 1,
            fetchDate: Date.now(),
            term: searchTerm,
        }
    });

    return unsplash.search.photos(searchTerm, page || 1, itemsPerPage)
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: actionTypes.SEARCH_IMAGES_SUCCESS,
                payload: {
                    term: searchTerm,
                    total: data.total,
                    totalPages: data.total_pages,
                    results: data.results,
                    page: page || 1,
                },
            });
        })
        .catch(err => {
            console.warn('Cannot fecth image', err);
            dispatch({
                type: actionTypes.SEARCH_IMAGES_FAILURE,
                payload: err || new Error('Cannot fecth image'),
            });
        });
};

