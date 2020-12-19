import React from 'react';
import {Button, Header, Icon, Segment, Statistic} from "semantic-ui-react";
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

  getPlaceholder(placeholder, noVideo) {
    if (placeholder === "Recording") {
      return <Header icon>
        <Icon name='record' color='red'/>
        Recording
      </Header>;
    } else if (placeholder > 0 && placeholder <= 3) {
      return <Statistic>
        <Statistic.Value>{placeholder}</Statistic.Value>
      </Statistic>
    }

    if (noVideo) {
      return <Header icon>
        <Icon name='file video' color='grey'/>
      </Header>
    }
  }

  render() {
    const {videoSourceProps, placeholder} = this.props;
    const {play, pause, stop, muted} = this.state;
    const noVideo = !Object.values(videoSourceProps).find(v => v !== null);
    const video = <Video videoSourceProps={videoSourceProps} playerProps={Object.assign({}, this.state)}/>;
    return (
      <div>
        <Segment placeholder>
          {(noVideo || placeholder) && this.getPlaceholder(placeholder, noVideo)}
          {!noVideo && !placeholder && video}
        </Segment>
        <Segment>
          <Button icon onClick={this.play} disabled={noVideo || play}>
            <Icon name='play' color='green'/>
          </Button>
          <Button icon onClick={this.pause} disabled={noVideo || pause || stop}>
            <Icon name='pause' color='grey'/>
          </Button>
          <Button icon onClick={this.stop} disabled={noVideo || stop}>
            <Icon name='stop' color='grey'/>
          </Button>
          <Button icon onClick={this.toggleMuted}>
            {muted ? <Icon name='volume off' color='grey'/> : <Icon name='volume up' color='grey'/>}
          </Button>
        </Segment>
      </div>
    )
      ;
  }
}

export default VideoPanel;
