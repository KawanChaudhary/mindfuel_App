import {call, put, takeLatest} from 'redux-saga/effects';
import axiosInstance from '../../axiosInstance';
import {
  fetchStoriesSuccess,
  fetchStoriesFailure,
  deleteStoryById,
} from '../Actions/storyActions';
import {DELTE_STORY_BY_ID, FETCH_STORIES_REQUEST} from '../Actions/actionsTypes';

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

function* deleteStorySaga(action) {
  console.log(action.payload.story.slug, action.payload.story._id, action.payload.config);
  if(!action.payload.config) {return;}
  try {
    yield call(axiosInstance.delete, `/story/${action.payload.story.slug}/delete`, action.payload.config);
    yield put(deleteStoryById(action.payload.story));
  } catch (error) {
    console.error(`Error deleting story with id: ${action.payload.story._id}`, error.message);
  }
}

export default function* storySagas() {
  yield takeLatest(FETCH_STORIES_REQUEST, fetchStoriesSaga);
  yield takeLatest(DELTE_STORY_BY_ID, deleteStorySaga);
}
