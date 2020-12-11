import React from 'react';
import {Button, Form} from "semantic-ui-react";
import * as recordApi from "../../services/api/records_api";
import download from "../../utils/download";

const WEBM_EXT = ".webm";

class ControlPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {filename: ""};
  }

  upload = () => {
    recordApi.uploadRecord(new File([this.props.currentRecord], this.state.filename + WEBM_EXT))
      .then(() => console.log("upload success"))
      .then(this.props.onNewFileUpload);
  }


  handleFilenameChange = (e) => {
    this.setState(Object.assign({}, this.state, {filename: e.target.value}));
  }

  render() {
    const {isRecording, currentRecordUrl, startRecording, stopRecording} = this.props;
    const {filename} = this.state;

    return (
      <Form.Group>
        <Form.Button onClick={startRecording}>Record</Form.Button>
        <Form.Button onClick={stopRecording} disabled={!isRecording}>Stop</Form.Button>
        {currentRecordUrl &&
        <div>
          <Form.Input onChange={this.handleFilenameChange} value={filename} label={"File name"}
                      required={true}/>
          <Button.Group>
            <Form.Button icon='download'
                         id="downloadRecord"
                         onClick={() => download(currentRecordUrl, filename)}
                         disabled={!currentRecordUrl || !filename}>Download</Form.Button>
            <Button.Or text='or'/>
            <Form.Button onClick={this.upload} target="_blank" disabled={!currentRecordUrl || !filename}>Upload
            </Form.Button>
          </Button.Group>
        </div>}
      </Form.Group>
    )
      ;
  }
}

export default ControlPanel;
