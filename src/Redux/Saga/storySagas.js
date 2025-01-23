import {call, put, takeLatest} from 'redux-saga/effects';
import axiosInstance from '../../axiosInstance';
import {
  fetchStoriesSuccess,
  fetchStoriesFailure,
} from '../Actions/storyActions';
import {FETCH_STORIES_REQUEST} from '../Actions/actionsTypes';

function* fetchStoriesSaga(action) {
  const {page = 1, searchKey = ''} = action.payload || {};
  const pageSize = 12;

  try {
    const {data} = yield call(
      axiosInstance.get,
      `/story/getAllStories?page=${page}&limit=${pageSize}&search=${searchKey}`,
    );
    yield put(fetchStoriesSuccess(data.data, data.data.length === pageSize));
  } catch (error) {
    yield put(fetchStoriesFailure(error.message));
  }
}

export default function* storySagas() {
  yield takeLatest(FETCH_STORIES_REQUEST, fetchStoriesSaga);
}
