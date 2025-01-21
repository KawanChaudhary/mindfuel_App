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
};

const storyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_STORIES_SUCCESS:
      return {
        ...state,
        stories:
          action.payload.page === 1
            ? action.payload.stories
            : [...state.stories, ...action.payload.stories],
        hasMore: action.payload.hasMore,
        loading: false,
      };
    case FETCH_STORIES_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case RESET_STORIES:
      return initialState;
    default:
      return state;
  }
};

export default storyReducer;
