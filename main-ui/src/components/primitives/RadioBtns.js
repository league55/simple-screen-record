import React from 'react';
import {Form, Radio} from 'semantic-ui-react'


class RadioBtns extends React.Component {

  getRadioButtonsGroup(currValue, values, labelField, onChange) {
    return Object.keys(values).map((key) => {
      const value = values[key];
      return <Form.Radio
          key={value[labelField] + "_radio"}
          onChange={() => onChange(value)}
          value={value}
          checked={currValue === value}
          label={value[labelField]}/>
    });
  }

  render() {
    const {value, values, labelField, onChange} = this.props;

    return this.getRadioButtonsGroup(value, values, labelField, onChange);
  }
}

export default RadioBtns;
