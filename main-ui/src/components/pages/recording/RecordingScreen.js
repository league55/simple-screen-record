import React from 'react';
import './RecordingScreen.css';
import {getMediaStream} from "../../../media/capture";
import Video from "../../video/Video";
import Constraints from "../../constraints/Constraints";
import {MediaConstraints} from "../../../media/media_constraints";
import {Recorder} from "../../../media/record";
import * as recordApi from "../../../services/api/records_api";
import {Form, Grid, Item} from 'semantic-ui-react'
import FileList from "../../filesPanel/FileList";
import ControlPanel from "../../controlPanel/ControlPanel";


class RecordingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaStream: null,
      constraints: new MediaConstraints(),
      recorder: null,
      currentRecord: null,
      filenames: null
    };
  }

  componentDidMount() {
    this.loadFileList();
  }

  loadFileList = () => {
    recordApi.listFiles()
      .then((filenames) => {
        this.setState(Object.assign({}, this.state, {filenames: filenames}));
      })
  }

  stopRecording = () => {
    if (this.state.recorder) {
      this.state.recorder.stop().then(record => {
        this.setState(Object.assign({}, this.state, {mediaStream: null, recorder: null, currentRecord: record}));
      });
    }
  }


  startRecording = async () => {
    const mediaStream = await getMediaStream(this.state.constraints.toMediaStreamConstraints());
    if (mediaStream) {
      const recorder = new Recorder(mediaStream);
      recorder.start();
      this.setState(Object.assign({}, this.state, {mediaStream, recorder: recorder, currentRecord: null}));
    }
  }

  onConstraintsChange = (constraints) => {
    this.setState(Object.assign({}, this.state, constraints))
  }

  onNewFileUpload = () => {
    this.loadFileList();
  }


  render() {
    const {mediaStream, currentRecord, constraints, filenames} = this.state;

    return (
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column width={10}>
            <Item.Group>
              <Item>
                <Video mediaStream={mediaStream} record={currentRecord}/>
              </Item>
              <Item>
                <Form>
                  <Constraints onConstraintsChange={this.onConstraintsChange} constraints={constraints}/>
                  <Item>
                    <ControlPanel isRecording={!!mediaStream}
                                  currentRecord={currentRecord}
                                  stopRecording={this.stopRecording}
                                  startRecording={this.startRecording}
                                  onNewFileUpload={this.onNewFileUpload}/>
                  </Item>
                </Form>
              </Item>
            </Item.Group>
          </Grid.Column>
          {filenames && <Grid.Column width={2}>
            <FileList filenames={filenames}/>
          </Grid.Column>}
        </Grid.Row>
      </Grid>
    );
  }
}

export default RecordingScreen;
