import React from 'react';
import './App.css';
import {getMediaStream} from "../media/capture";
import Video from "./video/Video";
import Constraints from "./constraints/Constraints";
import {MediaConstraints} from "../media/media_constraints";
import {record} from "../media/record";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mediaStream: null, constraints: new MediaConstraints(), recording: false, downloadLink: null};
    }

    startCapturing = async () => {
        const mediaStream = await getMediaStream(this.state.constraints.toMediaStreamConstraints());
        this.setState(Object.assign({}, this.state, {mediaStream, recording: false}));
    }

    stop = () => {
        if(this.state.mediaStream) {
            this.state.mediaStream.getTracks().forEach(track => track.stop());
        }
        this.setState(Object.assign({}, this.state, {mediaStream: null, recording: false}));
    }

    startRecording = async () => {
        const mediaStream = await getMediaStream(this.state.constraints.toMediaStreamConstraints());
        this.setState(Object.assign({}, this.state, {mediaStream, recording: true}));

        const recording = await record(mediaStream, 5000);
        mediaStream.getTracks().forEach(track => track.stop())
        const downloadLink = URL.createObjectURL(new Blob(recording));
        this.setState(Object.assign({}, this.state, {mediaStream: null, recording: false, downloadLink}));
    }

    onConstraintsChange = (constraints) => {
        let newState = Object.assign({}, this.state, constraints);
        this.setState(newState)
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Video mediaStream={this.state.mediaStream}/>
                    <Constraints onConstraintsChange={this.onConstraintsChange} constraints={this.state.constraints}/>
                    <button onClick={this.startCapturing} disabled={!!this.state.mediaStream}>Capture</button>
                    <button onClick={this.startRecording}>Record</button>
                    <button onClick={this.stop} disabled={!this.state.mediaStream}>Stop</button>
                    {this.state.downloadLink && <a id="link" href={this.state.downloadLink} download={"recording.webm"}>Download</a>}
                </header>
            </div>
        );
    }
}

export default App;
