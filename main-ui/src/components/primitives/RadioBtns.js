import React from 'react';
import {Form, Radio} from 'semantic-ui-react'


class RadioBtns extends React.Component {

  getRadioButtonsGroup(currValue, values, labelField, onChange) {
    return Object.keys(values).map((key) => {
      const value = values[key];
      let textValue = value[labelField];

      return <Form.Field
        control={Radio}
        key={textValue + "_radio"}
        onChange={() => onChange(value)}
        value={textValue}
        checked={currValue === value}
        label={textValue}/>
    });
  }

  render() {
    const {value, values, labelField, onChange} = this.props;

    return this.getRadioButtonsGroup(value, values, labelField, onChange);
  }
}

export default RadioBtns;
