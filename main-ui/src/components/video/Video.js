import React from 'react';
import isEqual from 'lodash.isequal';
import {debugTrackSetup} from "../../media/capture";

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.videoElem = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !isEqual(nextProps, this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevProps.videoSourceProps, this.props.videoSourceProps)) {
      const {recordUrl, lastRec, record} = this.props.videoSourceProps;

      this.videoElem.current.srcObject = null;
      this.videoElem.current.src = "";
      if (recordUrl) {
        this.videoElem.current.src = recordUrl;
      } else if (lastRec) {
        this.videoElem.current.src = window.URL.createObjectURL(record);
      } else {
        this.videoElem.current.srcObject = this.props.mediaStream;
      }
    }

    if (!isEqual(prevProps.playerProps.videoSourceProps, this.props.playerProps)) {
      const {play, pause, stop, muted} = this.props.playerProps;
      if (play) {
        this.videoElem.current.play();
      }
      if (pause) {
        this.videoElem.current.pause();
      }
      if (stop) {
        this.videoElem.current.pause();
        this.videoElem.current.currentTime = 0;
      }
      this.videoElem.current.muted = muted;
    }


    debugTrackSetup(this.videoElem.current);
  }

  render() {
    const {width = 550, height = 400} = this.props;
    return (
      <video id="video"
             loop
             ref={this.videoElem}
             width={width}
             height={height}
             autoPlay
             title={"main vid"}/>
    );
  }
}

export default Video;
