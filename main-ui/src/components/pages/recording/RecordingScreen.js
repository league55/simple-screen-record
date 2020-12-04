import React from 'react';
import './RecordingScreen.css';
import {getMediaStream} from "../../../media/capture";
import Video from "../../video/Video";
import Constraints from "../../constraints/Constraints";
import {MediaConstraints} from "../../../media/media_constraints";
import {Recorder} from "../../../media/record";
import * as recordApi from "../../../services/api/records_api";
import {Form, Grid, Item, Button} from 'semantic-ui-react'
import FileList from "../../filesPanel/FileList";

const WEBM_EXT = ".webm";

class RecordingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaStream: null,
      constraints: new MediaConstraints(),
      recorder: null,
      currentRecord: null,
      filename: null,
      filenames: null
    };
  }

  componentDidMount() {
    recordApi.listFiles()
      .then((filenames) => {
         this.setState(Object.assign( {}, this.state, {filenames: filenames}));
      })
  }

  stop = () => {
    if (this.state.recorder) {
      this.state.recorder.stop().then(record => {
        this.setState(Object.assign({}, this.state, {mediaStream: null, recorder: null, currentRecord: record}));
      });
    }
  }

  upload = () => {
    recordApi.uploadRecord(new File([this.state.currentRecord], this.state.filename + WEBM_EXT))
      .then(() => console.log("upload success"));
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


  handleFilenameChange = (e) => {
    this.setState(Object.assign({}, this.state, {filename: e.target.value}));
  }

  download = (url, name) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = url;
    link.click();
  }


  render() {
    return (
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column width={10}>
            <Item.Group>
              <Item>
                <Video mediaStream={this.state.mediaStream} record={this.state.currentRecord}/>
              </Item>
              <Item> <Form>

                <Constraints onConstraintsChange={this.onConstraintsChange} constraints={this.state.constraints}/>
                <Item>
                  <Form.Group>
                    <Form.Button onClick={this.startRecording}>Record</Form.Button>
                    <Form.Button onClick={this.stop} disabled={!this.state.mediaStream}>Stop</Form.Button>
                    {this.state.currentRecord &&
                    <div>
                      <Form.Input onChange={this.handleFilenameChange} value={this.state.filename} label={"File name"}
                                  required={true}/>
                      <Button.Group>
                        <Form.Button icon='download'
                                     id="downloadRecord"
                                     onClick={() => this.download(URL.createObjectURL(this.state.currentRecord), this.state.filename)}
                                     disabled={!this.state.filename}>Download</Form.Button>
                        <Button.Or text='or' />
                        <Form.Button onClick={this.upload} target="_blank"
                                     disabled={!this.state.currentRecord || !this.state.filename}>Upload
                        </Form.Button>
                      </Button.Group>
                    </div>}
                  </Form.Group>
                </Item>
              </Form>
              </Item>
            </Item.Group>
          </Grid.Column>
          {this.state.filenames && <Grid.Column width={2}>
            <FileList filenames={this.state.filenames}/>
          </Grid.Column>}
        </Grid.Row>
      </Grid>
    );
  }
}

export default RecordingScreen;
