class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      video: null,
    };
    this.onTitleClick = this.onTitleClick.bind(this);
    // this.searchYouTube = window.searchYouTube;
    console.log('constructor');
  }

  componentDidMount() {
    // this.searchYouTube();
    //searchYouTube takes 2 arguments 
  // abstract query, func with videos
  // set this.state with new state from real data to fake data 
    console.log('componentDidMount');


    this.props.searchYouTube(undefined, (videos)=>{
      console.log('callback for componentDidMount');
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
    console.log('render');
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            {console.log(this.props)}
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
