import React from 'react';
import './RecordingScreen.css';
import {getMediaStream} from "../../../media/capture";
import Constraints from "../../constraints/Constraints";
import {MediaConstraints} from "../../../media/media_constraints";
import {Recorder} from "../../../media/record";
import * as recordApi from "../../../services/api/records_api";
import {Container, Form, Grid, Segment} from 'semantic-ui-react'
import FileList from "../../filesPanel/FileList";
import ControlPanel from "../../controlPanel/ControlPanel";
import VideoPanel from "../../video/VideoPanel";
import {wait} from "../../../utils/wait";
import {UI_ONLY} from "../../../variables/variables";


class RecordingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaStream: null,
      constraints: new MediaConstraints(),
      recorder: null,
      currentRecord: null,
      currentRecordUrl: null,
      files: [],
      countdown: 0
    };
  }

  componentDidMount() {
    if(!UI_ONLY) this.loadFileList();
  }

  loadFileList = () => {
    recordApi.listFiles()
      .then((files) => {
        this.setState(Object.assign({}, this.state, {files: files}));
      });
  }

  stopRecording = () => {
    if (this.state.recorder) {
      this.state.recorder.stop().then(record => {
        const currentRecordUrl = URL.createObjectURL(record);
        const filesCopy = this.state.files.concat({name: "video" + this.state.files.length, url: currentRecordUrl});
        this.setState(Object.assign({}, this.state, {
          mediaStream: null,
          recorder: null,
          currentRecord: record,
          currentRecordUrl: currentRecordUrl,
          files: filesCopy
        }));
      });
    }
  }

  countdown = async () => {
    const SECOND = 1000;
    return wait(1)
      .then(() => this.setState(Object.assign({}, this.state, {countdown: 3})))
      .then(() => wait(SECOND))
      .then(() => this.setState(Object.assign({}, this.state, {countdown: 2})))
      .then(() => wait(SECOND))
      .then(() => this.setState(Object.assign({}, this.state, {countdown: 1})))
      .then(() => wait(SECOND))
      .then(() => this.setState(Object.assign({}, this.state, {countdown: 0})));
  }

  startRecording = async () => {
    const mediaStream = await getMediaStream(this.state.constraints);
    if (mediaStream) {
      const recorder = new Recorder(mediaStream);
      this.countdown().then(()=> {
        recorder.start();
        this.setState(Object.assign({}, this.state, {
          mediaStream,
          recorder: recorder,
          currentRecord: null,
          currentRecordUrl: null
        }));
      })
    }
  }

  onHitPlay = (file) => {
    this.setState({
      mediaStream: null,
      constraints: new MediaConstraints(),
      recorder: null,
      currentRecord: file,
      currentRecordUrl: file.url,
      files: this.state.files
    });
  }

  onConstraintsChange = (constraints) => {
    this.setState(Object.assign({}, this.state, constraints))
  }

  onNewFileUpload = () => {
    this.loadFileList();
  }


  render() {
    const {mediaStream, currentRecord, currentRecordUrl, constraints, files, countdown, recorder} = this.state;

    let videoPlaceHolder;
    if (countdown > 0) {
      videoPlaceHolder = countdown;
    } else if (recorder) {
      videoPlaceHolder = "Recording";
    }

    return (
      <Container>
        <Segment>
          <Grid divided='vertically'>
            <Grid.Row columns={2}>
              <Grid.Column width={9}>
                <VideoPanel videoSourceProps={{mediaStream, record: currentRecord, recordUrl: currentRecordUrl}} placeholder={videoPlaceHolder}/>
                <Segment>
                  <Form>
                    <Constraints onConstraintsChange={this.onConstraintsChange} constraints={constraints}/>
                    <ControlPanel isRecording={!!mediaStream}
                                  currentRecord={currentRecord}
                                  currentRecordUrl={currentRecordUrl}
                                  stopRecording={this.stopRecording}
                                  startRecording={this.startRecording}
                                  onNewFileUpload={this.onNewFileUpload}
                    />
                  </Form>
                </Segment>
              </Grid.Column>
              {<Grid.Column width={5}>
                <FileList files={files} play={this.onHitPlay}/>
              </Grid.Column>}
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default RecordingScreen;
