import React from 'react';
import {MediaConstraints, VIDEO_SIZES} from "../../media/media_constraints";
import Checkbox from "../primitives/Checkbox";
import RadioBtns from "../primitives/RadioBtns";


class Constraints extends React.Component {

    onFieldChange = (newC) => {
        const merge = Object.assign(new MediaConstraints(), this.props.constraints, newC);
        this.props.onConstraintsChange(Object.assign({}, {constraints: merge}));
    }

    render() {
        const {constraints} = this.props;

        return (
            <div>
                <RadioBtns onChange={(value)=>this.onFieldChange({size: value})} value={constraints.size} values={VIDEO_SIZES} labelField={"label"}/>
                <Checkbox onChange={(value)=>this.onFieldChange({audio: value})} isChecked={constraints.audio} label={"Grab audio"}/>
                {constraints.audio && <Checkbox onChange={(value)=>this.onFieldChange({noiseSuppression: value})} isChecked={constraints.noiseSuppression} label={"Noise Suppression"}/>}
                {constraints.audio && <Checkbox onChange={(value)=>this.onFieldChange({echoCancellation: value})} isChecked={constraints.echoCancellation} label={"Echo Cancellation"}/>}
            </div>
        );
    }
}

export default Constraints;