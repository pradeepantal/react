import React from 'react';
import Video from '../Video';
import VideoModel from '../../model/video';
import { VideosSearchOptions } from '../../reducers/videos-list';
import { connect } from 'react-redux';
import { actionFetchVideos, actionSearchVideos, actionUpdateVideos } from '../../actions';
import { AppState } from '../../reducers';
import SearchComponent from '../../components/search';

const style = require('./style.scss');

export interface VideosListProps {
  videos: VideoModel[],
  searchVideos: (options: VideosSearchOptions) => void,
  updateVideos: (options: UpdateVideosOptions) => void,
  filter: boolean;
}
interface UpdateVideosOptions {
  id: number,
  video: VideoModel
}
export interface VideosListState {
  videos: number[],
  
}
//static defaultProps = {profileStore:{}}


class VideosList extends React.Component<VideosListProps, VideosListState> {
  constructor(props: VideosListProps, state: VideosListProps) {

    super(props, state);
    this.searchVideos = this.searchVideos.bind(this);
    this.updateVideos = this.updateVideos.bind(this);
  }
  searchVideos(text: string, cols: string) {
    this.props.searchVideos({
      searchText: text,
      col: cols
    });
  }

  updateVideos(ids: number, v: VideoModel) {
    console.log(ids);
    console.log(v);
    this.props.updateVideos({
      id: ids,
      video: v
    });
  }

  render() {
    return (
      <>{this.props.filter ? <tr><td></td><td><SearchComponent col="title" onChange={this.searchVideos} /></td><td></td><td><SearchComponent col="description" onChange={this.searchVideos} /></td><td></td></tr> : null
      }
        {this.props.videos.map((video: VideoModel) => <Video key={video.id} video={video} callBck={this.updateVideos}/>)}</>
    )
  }
}
const mapStateToProps = (state: AppState, ownProps: VideosListProps) => {
  return {
    videos: state.ui.list.videos.map((noteId) => state.entities.videos.byId[noteId]),
    state: state.ui.list.state,
    errorMessage: state.ui.list.errorMessage
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    //searchVideos: (options: VideosSearchOptions) => dispatch(actionSearchVideos(options)),
    updateVideos: (options1: UpdateVideosOptions) => dispatch(actionUpdateVideos(options1))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideosList);