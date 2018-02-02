class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: window.exampleVideoData,
      video: window.exampleVideoData[0],
      input: '',
      description: '',
      autoplay: false
    };
    this.onTitleClick = this.onTitleClick.bind(this);
    this.onUserSearch = _.throttle(this.onUserSearch.bind(this), 300);
    this.onInputUpdate = this.onInputUpdate.bind(this);
    this.getFullDescription = this.getFullDescription.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.toggleAutoPlay = this.toggleAutoPlay.bind(this);
  }

  setDescription(description) {
    this.setState({
      description: description
    });
  }

  toggleAutoPlay() {
    this.setState({
      autoplay: !this.state.autoplay
    });
  }

  componentDidMount() {
    this.props.searchYouTube({query: 'fast cars', max: 5, key: window.YOUTUBE_API_KEY}, (videos)=>{
      this.setState({
        videos: videos,
        video: videos[0]
      }, this.getFullDescription.bind(this, this.setDescription));
    });
  }

  onUserSearch(event) {
    let text;
    if (event.type === 'click') {
      text = this.state.input;
    } else {
      text = event.target.value;
    }

    let options = {
      query: text,
      max: 5,
      key: window.YOUTUBE_API_KEY
    };

    this.props.searchYouTube(options, (videos) => {
      this.setState({
        videos: videos,
        video: videos[0]
      }, this.getFullDescription.bind(this, this.setDescription));
    });
  }

  getFullDescription(callback) {
    let id = this.state.video.id.videoId;
    $.ajax({
      type: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + id,
      data: {
        key: window.YOUTUBE_API_KEY
      },
      success: function(data) {
        callback(data.items[0].snippet.description);
      },
      error: function(data) {
        console.log('error', data);
      }
    });
  }


  onTitleClick(video) {
    this.setState({
      video: video
    });
  }

  onInputUpdate(event) {
    let input = event.target.value;
    this.setState({
      input: input
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search search={this.onUserSearch} currentInput={this.onInputUpdate} autoplay={this.toggleAutoPlay}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            {this.state.video ? <VideoPlayer video={this.state.video} description={this.state.description} autoplay={this.state.autoplay}/> : null}
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videos} titleClick={this.onTitleClick}/>
          </div>
        </div>
      </div>
    );
  }
}
// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
