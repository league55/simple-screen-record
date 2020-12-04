import React from 'react';
import {Form, Checkbox} from 'semantic-ui-react'


class CheckboxField extends React.Component {

    render() {
        const {isChecked, label} = this.props;

        return (
          <Form.Checkbox label={label} checked={!!isChecked} onChange={() => this.props.onChange(!isChecked)}/>
        );
    }
}

export default CheckboxField;
