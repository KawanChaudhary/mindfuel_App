import {
  FETCH_STORIES_REQUEST,
  FETCH_STORIES_SUCCESS,
  FETCH_STORIES_FAILURE,
  RESET_STORIES,
} from '../Actions/actionsTypes';

const initialState = {
  stories: [],
  loading: true,
  error: null,
  page: 1,
  hasMore: true,
  refreshing: false,
};

const storyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        page: action.payload.page,
        refreshing: false,
      };
    case FETCH_STORIES_SUCCESS:
      return {
        ...state,
        stories:
          state.page === 1
            ? action.payload.stories
            : [...state.stories, ...action.payload.stories],
        hasMore: action.payload.hasMore,
        loading: false,
        refreshing: false,
      };
    case FETCH_STORIES_FAILURE:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: action.payload,
      };
    case RESET_STORIES:
      return initialState;
    default:
      return state;
  }
};

export default storyReducer;
