import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import RootReducer from './RootReducer';

const middleware = [thunk];
const composeEnhancers = composeWithDevTools({
    name: 'Image Search',
    serialize: true,
});

const store = createStore(
    RootReducer,
    composeEnhancers(
        applyMiddleware(...middleware)
    )
);

export default store;