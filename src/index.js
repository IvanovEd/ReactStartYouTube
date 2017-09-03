import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_data';

const API_KEY = 'AIzaSyD-zCqHyAt-_awoEp6qaOysr62lfHPs4Is';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.onSearchVideo('ed')
    }

    onSearchVideo(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos : videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearchTimeLimit = _.debounce(term => {this.onSearchVideo(term)}, 300);
        return (<dev>
            <SearchBar onSearchVideo={videoSearchTimeLimit}/>
            <VideoDetail video={this.state.selectedVideo}/>
            <VideoList
                onVideoSelected={selectedVideo => this.setState({selectedVideo: selectedVideo})}
                videos={this.state.videos}
            />
        </dev>);
    }
}


ReactDOM.render(<App/>, document.querySelector('.container'));
