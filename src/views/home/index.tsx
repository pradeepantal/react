import React from 'react';
import { Helmet } from 'react-helmet';
import VideosList from '../../components/videoList';
import VideoModel from '../../model/video';
import { actionFetchVideos, actionSearchVideos ,actionUpdateVideos} from '../../actions';
import { connect } from 'react-redux';
import { AppState } from '../../reducers';
import { VideosSearchOptions,UpdateVideosOptions } from '../../reducers/videos-list';
import SearchComponent from '../../components/search';

const style = require('./style.scss');
interface HomeViewProps {
  loadData: () => () => void,
  searchVideos: (options: VideosSearchOptions) => void,
  updateVideos: (options: UpdateVideosOptions) => void,
  videos: VideoModel[],
  state: string,
  errorMessage?: string
}

interface HomeViewState {
}


class HomeView extends React.Component<HomeViewProps, HomeViewState> {
  constructor(props: HomeViewProps, state: HomeViewState) {

    super(props, state);
    //this.searchVideos = this.searchVideos.bind(this);
  }

  state = {
    shown: false,
  };
  componentDidMount() {
    if (this.props.state === 'INIT') {
      console.log(this.props.videos);
      this.props.loadData();
    }
  }

  /*searchVideos(text: string) {
    this.props.searchVideos({
      searchText: text,
      col:"title"
    });
  }*/

  render() {
    return (
      <section>
        <Helmet>
          <title>
            Videos
        </title>
        </Helmet>
        <div id="container">
        <button onClick={() => this.setState({ shown: !this.state.shown })}>Filter</button>
        <table id="customers" className={style.videosList}>
        <tbody><tr>
          <th>Id</th><th>Title</th><th>genre</th><th>Description</th><th>Action</th></tr>
          
          {this.renderVideos()}
          </tbody>
        </table>
        </div>
      </section>
    );
  }

  renderVideos() {

    if (this.props.state === 'LOADING') {
      return (<p className={style.loading}>Loading ...</p>);
    } else if (this.props.state === 'ERROR') {
      return (<p className={style.error}>Error: {this.props.errorMessage}</p>);
    } else if (this.props.state === 'LOADED') {
      return (<VideosList videos={this.props.videos} filter={this.state.shown} searchVideos={this.props.searchVideos} updateVideos={this.props.updateVideos} />);
    } else {
      return 'Init State';
    }
  }

}

const mapStateToProps = (state: AppState, ownProps: HomeViewProps) => {
  return {
    videos: state.ui.list.videos.map((noteId) => state.entities.videos.byId[noteId]),
    state: state.ui.list.state,
    errorMessage: state.ui.list.errorMessage
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadData: () => dispatch(actionFetchVideos()),
    searchVideos: (options: VideosSearchOptions) => dispatch(actionSearchVideos(options)),
    updateVideos: (options1: UpdateVideosOptions) => dispatch(actionUpdateVideos(options1))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);





