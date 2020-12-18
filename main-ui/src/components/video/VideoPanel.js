import React from 'react';
import {Form, Segment} from "semantic-ui-react";
import Video from "./Video";


class VideoPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {play: false, pause: false, stop: true, mute: false};
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
  mute = (e) => {
    e.preventDefault();
    this.setState(Object.assign({}, this.state, {mute: !this.state.mute}));
  }

  render() {
    const {videoSourceProps} = this.props;

    return (
      <Form>
        <Segment placeholder>
          <Video videoSourceProps={videoSourceProps} playerProps={Object.assign({}, this.state)} />
        </Segment>
        <Segment>

          <Form.Group>
            <Form.Button onClick={this.play}>Play</Form.Button>
            <Form.Button onClick={this.pause}>Pause</Form.Button>
            <Form.Button onClick={this.stop}>Stop</Form.Button>
            <Form.Button onClick={this.mute}>Mute</Form.Button>
          </Form.Group>
        </Segment>
      </Form>
    )
      ;
  }
}

export default VideoPanel;
