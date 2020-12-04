import React from 'react';
import './RecordingScreen.css';
import {getMediaStream} from "../../../media/capture";
import Video from "../../video/Video";
import Constraints from "../../constraints/Constraints";
import {MediaConstraints} from "../../../media/media_constraints";
import {Recorder} from "../../../media/record";
import {uploadRecord} from "../../../services/api/records_api";

const WEBM_EXT = ".webm";

class RecordingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaStream: null,
      constraints: new MediaConstraints(),
      recorder: null,
      lastRecord: null,
      filename: null
    };
  }


  stop = () => {
    if (this.state.recorder) {
      this.state.recorder.stop().then(record => {
        this.setState(Object.assign({}, this.state, {mediaStream: null, recorder: null, lastRecord: record}));
      });
    }
  }

  upload = () => {
    uploadRecord(new File([this.state.lastRecord], this.state.filename + WEBM_EXT))
      .then(() => console.log("upload success"))
      .then(() => {
        this.setState(Object.assign({}, this.state, {filename: null, lastRecord: null}));
      });
  }

  startRecording = async () => {
    const mediaStream = await getMediaStream(this.state.constraints.toMediaStreamConstraints());
    if (mediaStream) {
      const recorder = new Recorder(mediaStream);
      recorder.start();
      this.setState(Object.assign({}, this.state, {mediaStream, recorder: recorder}));
    }
  }

  onConstraintsChange = (constraints) => {
    this.setState(Object.assign({}, this.state, constraints))
  }


  handleFilenameChange = (e) => {
    this.setState(Object.assign({}, this.state, {filename: e.target.value}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Video mediaStream={this.state.mediaStream}/>
          <Constraints onConstraintsChange={this.onConstraintsChange} constraints={this.state.constraints}/>
          <button onClick={this.startRecording}>Record</button>
          <button onClick={this.stop} disabled={!this.state.mediaStream}>Stop</button>
          {this.state.lastRecord &&
          <div>
            <input type="text" onChange={this.handleFilenameChange}/>
            <a id="link" href={URL.createObjectURL(this.state.lastRecord)} disabled={!this.state.filename}
               download={this.state.filename + WEBM_EXT}>Download</a>
            <button onClick={this.upload} disabled={!this.state.lastRecord || !this.state.filename}>Upload</button>
          </div>}


        </header>
      </div>
    );
  }
}

export default RecordingScreen;