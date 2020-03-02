import VideoModel from '../model/video';
import { Action, Dispatch } from 'redux';
import VideoService from '../api/video-api';
import { type } from 'os';

export const ACTION_VIDEOS_FETCH = 'VIDEOS_FETCH';
export const ACTION_VIDEOS_FETCH_SUCCESS = 'VIDEOS_FETCH_SUCCESS';
export const ACTION_VIDEOS_FETCH_ERROR = 'VIDEOS_FETCH_ERROR';
export const ACTION_VIDEOS_SEARCH = 'VIDEOS_SEARCH';
export const ACTION_VIDEOS_UPDATE = 'VIDEOS_UPDATE';

export function isAction<A extends Action>(action: Action, type: string): action is A {
  return action.type === type;
}

export interface IActionVideosFetch extends Action {
  type: 'VIDEOS_FETCH'
}

export interface IActionVideosFetchSuccess extends Action {
  type: 'VIDEOS_FETCH_SUCCESS',
  videos: VideoModel[]
}

export interface IActionVideosFetchError extends Action {
  type: 'VIDEOS_FETCH_ERROR',
  errorMessage: string
}

export interface IActionSearchVideos {
  type: 'VIDEOS_SEARCH',
  options: {
    searchText: string,
    col:string
  }
}



export interface IActionVideosUpdateSuccess {
  type: 'VIDEOS_UPDATE',
  options: {
    id: number,
    video:VideoModel
  }
}

export type AppActions = IActionVideosFetch | IActionVideosFetchSuccess | IActionVideosFetchError| IActionSearchVideos|IActionVideosUpdateSuccess;;

function dispatchFetchVideosProgress(): IActionVideosFetch {
  return {
    type: ACTION_VIDEOS_FETCH
  };
}

function dispatchFetchVideosSuccess(videos: VideoModel[]): IActionVideosFetchSuccess {
  return {
    type: ACTION_VIDEOS_FETCH_SUCCESS,
    videos
  };
}

function dispatchFetchVideosError(e: Error): IActionVideosFetchError {
  return {
    type: ACTION_VIDEOS_FETCH_ERROR,
    errorMessage: e.message
  };
}

/*function dispatchUpdateVideo(videos: VideoModel[]): IActionVideosUpdateSuccess {
  return {
    type: ACTION_VIDEOS_UPDATE,
    videos
  };
}*/

export function actionFetchVideos() {
  return (dispatch: Dispatch) => {
   dispatch(dispatchFetchVideosProgress());
    return VideoService.getAll()
    .then((videos) => {
      return dispatch(dispatchFetchVideosSuccess(videos));
    })
    .catch((e: Error) => {
      return dispatch(dispatchFetchVideosError(e));
    });
  };
}

interface SearchVideosOptions {
  searchText: string,
  col:string
}

export function actionSearchVideos(options: SearchVideosOptions) {
  return (dispatch: Dispatch) => {
    return dispatch({
      type: ACTION_VIDEOS_SEARCH,
      options
    });
  };
}

interface UpdateVideosOptions {
  id: number,
  video: VideoModel
}

export function actionUpdateVideos(options:UpdateVideosOptions) {
  return (dispatch: Dispatch) => {
    return dispatch({
      type: ACTION_VIDEOS_UPDATE,
      options
    });
  };
}