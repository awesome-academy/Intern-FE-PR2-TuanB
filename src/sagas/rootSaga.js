import { all } from 'redux-saga/effects'
import authorSaga from '../pages/author/authorSaga';
import MovieSaga from '../pages/movies/moviesSaga';
import ticketSaga from '../pages/ticket/ticketSaga';

function* rootSaga() {
    yield all([
        MovieSaga(),
        authorSaga(),
        ticketSaga()
    ]);
}

export default rootSaga
