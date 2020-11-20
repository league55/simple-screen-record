import React from 'react';
import {VIDEO_SIZES} from "../../media/media_constraints";


class VideoSize extends React.Component {

    getSizeRadioButtons = (currentSize) => {
        return Object.keys(VIDEO_SIZES).map((key) => {
            const size = VIDEO_SIZES[key];
            return <td key={size.label + "_td"}><input
                key={size.label + "_radio"}
                type="radio"
                name={size.label}
                onChange={() => this.props.onSizeChange(size)}
                value={size}
                checked={currentSize === size}/>{size.label}</td>
        });
    }

    render() {
        const {size} = this.props;

        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        {this.getSizeRadioButtons(size)}
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default VideoSize;