import {
  FETCH_STORIES_REQUEST,
  FETCH_STORIES_SUCCESS,
  FETCH_STORIES_FAILURE,
  RESET_STORIES,
  DELTE_STORY_BY_ID,
} from './actionsTypes';

export const fetchStoriesRequest = (page = 1, searchKey = '') => ({
  type: FETCH_STORIES_REQUEST,
  payload: {page, searchKey},
});

export const fetchStoriesSuccess = (stories, hasMore) => ({
  type: FETCH_STORIES_SUCCESS,
  payload: {stories, hasMore},
});

export const fetchStoriesFailure = error => ({
  type: FETCH_STORIES_FAILURE,
  payload: error,
});

export const resetStories = () => ({
  type: RESET_STORIES,
});

export const deleteStoryById = (story, config) => ({
  type: DELTE_STORY_BY_ID,
  payload: {story, config},
});
