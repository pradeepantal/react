import {
    AppActions
  } from '../actions';
  
  import VideoModel from '../model/video';
  import { VideosDictState } from './videoDict';

  export interface VideosSearchOptions {
    searchText: string,
    col:string
  }
  export interface UpdateVideosOptions {
    id: number,
    video: VideoModel
  }

  export interface VideosListState {
    state: string, // 'INIT', 'LOADING' | 'LOADED' | 'ERROR',
    videos: number[],
    errorMessage?: string,
    searchOptions: VideosSearchOptions,
  }
  
  export function defaultVideosListState() {
    return {
      state: 'INIT',
      videos: [],
      searchOptions: {
        searchText: '',
        col:''
      }
    };
  }

  function filterByTitle(text: string): (n: VideoModel) => boolean  {
    return (video: VideoModel): boolean => {
      return video.title.toLowerCase().indexOf(text) > -1 
    };
  }

  function filterByDescription(text: string): (n: VideoModel) => boolean  {
    return (video: VideoModel): boolean => {
      return video.description.toLowerCase().indexOf(text) > -1;
    };
  }
  
  export function videosListReducer(state: VideosListState, action: AppActions, videos: VideosDictState): VideosListState {

    if (action.type === 'VIDEOS_FETCH') {
      return {
        ...state,
        state: 'LOADING',
        videos: [],
      };
    }
    if (action.type === 'VIDEOS_FETCH_SUCCESS') {
      return {
        ...state,
        state: 'LOADED',
       // videos: action.videos,
       videos:[...action.videos.map((n: VideoModel) => n.id)],
      };
    }
    if (action.type === 'VIDEOS_FETCH_ERROR') {
      return {
        ...state,
        state: 'ERROR',
        videos: [],
        errorMessage: action.errorMessage
      };
    } 
    if (action.type === 'VIDEOS_SEARCH') {
      console.log(action.options.col);
      if(action.options.col=="title"){
      return {
        ...state,
        videos: videos.allIds
          .map((id) => videos.byId[id])
          .filter(filterByTitle(action.options.searchText.toLowerCase()))
          .map((n) => n.id)
      };
    }else{
      return {
        ...state,
        videos: videos.allIds
          .map((id) => videos.byId[id])
          .filter(filterByDescription(action.options.searchText.toLowerCase()))
          .map((n) => n.id)
      };
    }
    }
    if (action.type === 'VIDEOS_UPDATE') {
      //return {
       /* ...state,
         videos.allIds.map((video) => videos.byId[action.options.id])
          .map((n) => n).concat(action.options.video)
      };*/
      console.log(state)    
    }
  
    
    return state;
  }
  function filterById(id: number): (n: VideoModel) => boolean  {
    return (video: VideoModel): boolean => {
      return true;
    };
  }
  

  