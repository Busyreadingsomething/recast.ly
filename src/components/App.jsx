class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: window.exampleVideoData,
      video: window.exampleVideoData[0],
    };
    this.onTitleClick = this.onTitleClick.bind(this);
  }

  componentDidMount() {
    // this.searchYouTube();
    //searchYouTube takes 2 arguments 
  // abstract query, func with videos
  // set this.state with new state from real data to fake data 

    this.props.searchYouTube({query: 'fast cars', max: 5, key: window.YOUTUBE_API_KEY}, (videos)=>{
      this.setState({
        videos: videos,
        video: videos[0]
      });
    });
  }

  onUserSearch(text) {
    // create an object
    let options = {
      // query prop set to text
      // max set to 5
      // key set to window.YOUTUBE key
      query: text,
      max: 5,
      key: window.YOUTUBE_API_KEY
    };
    
    // call searchYouTube passing in object and callback to setState values
    this.props.searchYouTube(options, (videos) => {
      this.setState({
        videos: videos,
        video: videos[0]
      });
    });
  }

  onTitleClick(video) {
    this.setState({
      video: video
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            {this.state.video ? <VideoPlayer video={this.state.video}/> : null}
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
