import React from 'react';
import {debugTrackSetup} from "../../media/capture";

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.videoElem = React.createRef();
    }

    componentDidUpdate() {
        this.videoElem.current.srcObject = this.props.mediaStream;
        debugTrackSetup(this.videoElem.current);
    }

    render() {
        const {width = 600, height = 400} = this.props;
        return (
            <video id="video"
                   ref={this.videoElem}
                   width={width}
                   height={height}
                   autoPlay
                   title={"main vid"}/>
        );
    }
}

export default Video;
