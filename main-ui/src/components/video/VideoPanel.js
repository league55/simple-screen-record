import React from 'react';
import {Button, Icon, Segment} from "semantic-ui-react";
import Video from "./Video";


class VideoPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {play: false, pause: false, stop: true, muted: false};
  }

  play = (e) => {
    e.preventDefault();
    this.setState(Object.assign({}, this.state, {play: true, pause: false, stop: false}));
  }
  pause = (e) => {
    e.preventDefault();
    this.setState(Object.assign({}, this.state, {play: false, pause: true, stop: false}));
  }
  stop = (e) => {
    e.preventDefault();
    this.setState(Object.assign({}, this.state, {play: false, pause: false, stop: true}));
  }
  toggleMuted = (e) => {
    e.preventDefault();
    this.setState(Object.assign({}, this.state, {muted: !this.state.muted}));
  }

  render() {
    const {videoSourceProps} = this.props;

    return (
      <div>
        <Segment placeholder>
          <Video videoSourceProps={videoSourceProps} playerProps={Object.assign({}, this.state)}/>
        </Segment>
        <Segment>
          <Button icon onClick={this.play}>
            <Icon name='play' color='green'/>
          </Button>
          <Button icon onClick={this.pause}>
            <Icon name='pause' color='grey'/>
          </Button>
          <Button icon onClick={this.stop}>
            <Icon name='stop' color='grey'/>
          </Button>
          <Button icon onClick={this.toggleMuted}>
            {this.state.muted ? <Icon name='volume off' color='grey'/> : <Icon name='volume up' color='grey'/>}
          </Button>
        </Segment>
      </div>
    )
      ;
  }
}

export default VideoPanel;
