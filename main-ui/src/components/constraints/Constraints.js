import React from 'react';
import {MediaConstraints, VIDEO_SIZES} from "../../media/media_constraints";
import CheckboxField from "../primitives/CheckboxField";
import RadioBtns from "../primitives/RadioBtns";
import {Form} from "semantic-ui-react";


class Constraints extends React.Component {

  onFieldChange = (newC) => {
    const merge = Object.assign(new MediaConstraints(), this.props.constraints, newC);
    this.props.onConstraintsChange(Object.assign({}, {constraints: merge}));
  }

  getCustomSizeInputs(constraints) {
    return <Form.Group inline>
      <Form.Input onChange={(e) => this.onFieldChange({width: +e.target.value})}
                  value={constraints.size.width}
                  type="number"
                  label={"Width"}
                  required={true}/>
      <Form.Input onChange={(e) => this.onFieldChange({height: +e.target.value})}
                  value={constraints.size.height}
                  type="number"
                  label={"Height"}
                  required={true}/>
    </Form.Group>;
  }

  render() {
    const {constraints} = this.props;

    return (
      <Form>
        <Form.Group inline>
          <RadioBtns onChange={(value) => this.onFieldChange({size: value})} value={constraints.size}
                     values={VIDEO_SIZES} labelField={"label"}/>
          {constraints.size === VIDEO_SIZES.CUSTOM && this.getCustomSizeInputs(constraints)}
        </Form.Group>
        <Form.Group inline>
          <CheckboxField onChange={(value) => this.onFieldChange({grabMic: value})} isChecked={constraints.grabMic}
                         label={"Grab mic"}/>
          <CheckboxField onChange={(value) => this.onFieldChange({audio: value})} isChecked={constraints.audio}
                         label={"Grab audio"}/>
          {constraints.audio && <CheckboxField onChange={(value) => this.onFieldChange({noiseSuppression: value})}
                                               isChecked={constraints.noiseSuppression} label={"Noise Suppression"}/>}
          {constraints.audio && <CheckboxField onChange={(value) => this.onFieldChange({echoCancellation: value})}
                                               isChecked={constraints.echoCancellation} label={"Echo Cancellation"}/>}
        </Form.Group>
      </Form>
    )
      ;
  }

}

export default Constraints;
