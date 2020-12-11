import React from 'react';

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.videoElem = React.createRef();
    }

    componentDidUpdate() {

        this.videoElem.current.srcObject = null;
        this.videoElem.current.src = null;
        const lastRec = this.props.record;
        if(this.props.recordUrl) {
            this.videoElem.current.src = this.props.recordUrl;
        } else if (lastRec) {
            this.videoElem.current.src = window.URL.createObjectURL(this.props.record);
        } else {
            this.videoElem.current.srcObject = this.props.mediaStream;

        }
        // debugTrackSetup(this.videoElem.current);
    }

    render() {
        const {width = 600, height = 400} = this.props;
        return (
            <video id="video"
                   loop
                   ref={this.videoElem}
                   width={width}
                   height={height}
                   autoPlay
                   title={"main vid"}/>
        );
    }
}

export default Video;
