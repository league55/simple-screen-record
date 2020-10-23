import React from 'react';
import './App.css';
import {getMediaStream} from "../media/capture";
import Video from "./video/Video";
import Constraints from "./constraints/Constraints";
import {MediaConstraints} from "../media/media_constraints";
import {Recorder} from "../media/record";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mediaStream: null, constraints: new MediaConstraints(), recorder: null, downloadLink: null};
    }


    stop = () => {
        if (this.state.recorder) {
            this.state.recorder.stop().then(link => {
                this.setState(Object.assign({}, this.state, {mediaStream: null, recorder: null, downloadLink: link}));
            });
        }
    }

    startRecording = async () => {
        const mediaStream = await getMediaStream(this.state.constraints.toMediaStreamConstraints());
        const recorder = new Recorder(mediaStream);
        recorder.start();
        this.setState(Object.assign({}, this.state, {mediaStream, recorder: recorder}));
    }

    onConstraintsChange = (constraints) => {
        this.setState(Object.assign({}, this.state, constraints))
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Video mediaStream={this.state.mediaStream}/>
                    <Constraints onConstraintsChange={this.onConstraintsChange} constraints={this.state.constraints}/>
                    <button onClick={this.startRecording}>Record</button>
                    <button onClick={this.stop} disabled={!this.state.mediaStream}>Stop</button>
                    {this.state.downloadLink &&
                    <a id="link" href={this.state.downloadLink} download={"recording.webm"}>Download</a>}
                </header>
            </div>
        );
    }
}

export default App;
