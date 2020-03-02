import VideoModel from '../model/video';
import { AppActions } from '../actions';

export type VideosDict = {
  [Key: number]: VideoModel
};

export type VideosDictState = {
  byId: VideosDict,
  allIds: number[]
};

export function defaultVideosDictState(): VideosDictState {
  return {
    byId: {},
    allIds: []
  };
}

export function videosDictReducer(state: VideosDictState, action: AppActions): VideosDictState {
  if (action.type === 'VIDEOS_FETCH_SUCCESS') {
    return {
      byId: action.videos.reduce((acc, video) => ({ ...acc, [video.id]: video}), state),
      allIds: action.videos.map((n) => n.id)
    };
  }
  return state;
}