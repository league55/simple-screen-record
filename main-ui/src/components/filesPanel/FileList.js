import React from 'react';
import {Table} from "semantic-ui-react";

class FileList extends React.Component {

  getFileRows(fileNames) {
    return fileNames.map(file => (<Table.Row key={file + "_table_row"}>
      <Table.Cell key={file + "_table_cell"}>
        {file}
      </Table.Cell>
    </Table.Row>));
  }

  render() {
    const {filenames} = this.props;

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Files</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.getFileRows(filenames)}
        </Table.Body>
      </Table>
    )
      ;
  }
}

export default FileList;
