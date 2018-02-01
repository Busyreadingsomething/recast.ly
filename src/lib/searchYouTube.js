var searchYouTube = (options, callback) => {
  //declare a data object
  let dataObj = {
    videoEmbeddable: true,
    type: 'video',
    part: 'snippet'
  };

  if (options === undefined) {
    dataObj.q = 'ghost howl';
    dataObj.maxResults = 5;
    dataObj.key = window.YOUTUBE_API_KEY;
  } else {
    dataObj.q = options.query;
    dataObj.maxResults = options.max;
    dataObj.key = options.key;
  }

  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: dataObj,
    success: (data) => {
      console.log('success');
      callback(data.items);
    },
    error: (data) => {
      console.log('error', data);
    }
  });
};

window.searchYouTube = searchYouTube;
