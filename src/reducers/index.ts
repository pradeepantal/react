
import { videosListReducer, VideosListState, defaultVideosListState } from './videos-list';
import { videosDictReducer, VideosDictState, defaultVideosDictState } from './videoDict';

import { Action } from 'redux';


export interface AppState {
  entities: {
    videos: VideosDictState,
  },
  ui: {
    list: VideosListState
  }
}


export function defaultState() {
  return {
    entities: {
      videos: defaultVideosDictState(),
    },
    ui: {
      list: defaultVideosListState()
    }
  };
}

export function mainReducer(state: AppState = defaultState(), action: Action) {
  return {
    entities: {
      videos: videosDictReducer(state.entities.videos, action),
    },
    ui: {
      list: videosListReducer(state.ui.list, action, state.entities.videos)
    }
  };
}
