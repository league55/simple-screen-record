import React from 'react';
import VideoSize from "./Size";
import {MediaConstraints} from "../../media/media_constraints";
import Checkbox from "./Checkbox";


class Settings extends React.Component {

    onFieldChange = (newC) => {
        const merge = Object.assign(new MediaConstraints(), this.props.constraints, newC);
        this.props.onConstraintsChange(Object.assign({}, {constraints: merge}));
    }

    render() {
        const {constraints} = this.props;

        return (
            <div>
                <VideoSize onSizeChange={(value)=>this.onFieldChange({size: value})} size={constraints.size}/>
                <Checkbox onChange={(value)=>this.onFieldChange({audio: value})} isChecked={constraints.audio} label={"Grab audio"}/>
                {constraints.audio && <Checkbox onChange={(value)=>this.onFieldChange({noiseSuppression: value})} isChecked={constraints.noiseSuppression} label={"Noise Suppression"}/>}
                {constraints.audio && <Checkbox onChange={(value)=>this.onFieldChange({echoCancellation: value})} isChecked={constraints.echoCancellation} label={"Echo Cancellation"}/>}
            </div>
        );
    }
}

export default Settings;