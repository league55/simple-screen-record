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
        this.state = {mediaStream: null, constraints: new MediaConstraints(), recorder: null, lastRecord: null};
    }


    stop = () => {
        if (this.state.recorder) {
            this.state.recorder.stop().then(record => {
                this.setState(Object.assign({}, this.state, {mediaStream: null, recorder: null, lastRecord: record}));
            });
        }
    }

    upload = () => {
        const formData = new FormData();
        formData.append('file', this.state.lastRecord);
        fetch(process.env.REACT_APP_RECORD_SERVICE_URL,
            {
                method: 'post',
                body: formData
            })
            .then(response => {
                return response.text();
            })
            .then((text) => {
                console.log(text);
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


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Video mediaStream={this.state.mediaStream}/>
                    <Constraints onConstraintsChange={this.onConstraintsChange} constraints={this.state.constraints}/>
                    <button onClick={this.startRecording}>Record</button>
                    <button onClick={this.stop} disabled={!this.state.mediaStream}>Stop</button>
                    {this.state.lastRecord &&
                    <a id="link" href={URL.createObjectURL(this.state.lastRecord)} download={"recording.webm"}>Download</a>}
                    <button onClick={this.upload} disabled={!this.state.lastRecord}>Upload</button>

                </header>
            </div>
        );
    }
}

export default App;
