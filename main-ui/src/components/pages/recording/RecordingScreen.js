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


class RecordingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaStream: null,
      constraints: new MediaConstraints(),
      recorder: null,
      currentRecord: null,
      currentRecordUrl: null,
      files: null
    };
  }

  componentDidMount() {
    this.loadFileList();
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
        this.setState(Object.assign({}, this.state, {
          mediaStream: null,
          recorder: null,
          currentRecord: record,
          currentRecordUrl: URL.createObjectURL(record)
        }));
      });
    }
  }


  startRecording = async () => {
    const mediaStream = await getMediaStream(this.state.constraints);
    if (mediaStream) {
      const recorder = new Recorder(mediaStream);
      recorder.start();
      this.setState(Object.assign({}, this.state, {
        mediaStream,
        recorder: recorder,
        currentRecord: null,
        currentRecordUrl: null
      }));
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
    const {mediaStream, currentRecord, currentRecordUrl, constraints, files} = this.state;

    return (
      <Container>
        <Segment>
          <Grid divided='vertically'>
            <Grid.Row columns={2}>
              <Grid.Column width={9}>
                <VideoPanel videoSourceProps={{mediaStream, record: currentRecord, recordUrl: currentRecordUrl}}/>
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
              {files && <Grid.Column width={5}>
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
