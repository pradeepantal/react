import VideoModel from '../model/video';
import { AppActions } from '../actions';

export type VideosUpdate = {
  [Key: number]: VideoModel
};

export type VideosUpdateState = {
  byId: VideosUpdate,
  videos: VideoModel[]
};

export function defaultVideosUpdateState(): VideosUpdateState {
  return {
    byId: {},
    videos: []
  };
}

export function videosDictReducer(state: VideosUpdateState, action: AppActions): VideosUpdateState {
  if (action.type === 'VIDEOS_UPDATE') {
    return Object.assign({}, state, {
        data: state.videos.filter(item => {
            return item.id !== action.options.id; 
        }).concat(action.options.video) 
     }); 
  }
  return state;
}