import React from 'react';
import {Table} from "semantic-ui-react";
import download from "../../utils/download";
import { Icon, Button } from 'semantic-ui-react'

class FileList extends React.Component {
  getFileRows(files) {
    return files.map(file => (<Table.Row key={file.name + "_table_row"}>
      <Table.Cell key={file.name + "_table_cell_name"}>
        {file.name}
      </Table.Cell>
      <Table.Cell key={file.name + "_table_cell_button_download"}>
        <Button icon labelPosition='right' key={file.name + "_table_cell_download_button"} onClick={() => download(file.url, file.name)}>
          Download
            <Icon name='download' key={file.name + "_table_cell_download_icon"}/>
        </Button>
      </Table.Cell>
        <Table.Cell key={file.name + "_table_cell_button_play"}>
        <Button icon labelPosition='right' key={file.name + "_table_cell_play_button"} onClick={() => this.props.play(file)}>
          Play
            <Icon name='play' color='green' key={file.name + "_table_cell_play_icon"}/>
        </Button>
      </Table.Cell>
    </Table.Row>));
  }

  render() {
    const {files} = this.props;

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Files</Table.HeaderCell>
            <Table.HeaderCell/>
            <Table.HeaderCell/>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.getFileRows(files)}
        </Table.Body>
      </Table>
    )
      ;
  }
}

export default FileList;
