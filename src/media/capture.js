
export async function getMediaStream(displayMediaOptions) {
    let captureStream = null;

    try {
        captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    } catch(err) {
        console.error("Error: " + err);
    }
    return captureStream;
}

export function debugTrackSetup(video) {
    if (video.srcObject) {
        const videoTrack = video.srcObject.getVideoTracks()[0];

        console.debug("Track settings:");
        console.debug(JSON.stringify(videoTrack.getSettings(), null, 2));
        console.debug("Track constraints:");
        console.debug(JSON.stringify(videoTrack.getConstraints(), null, 2));

        const audioTrack = video.srcObject.getAudioTracks()[0];
        if(audioTrack) {
            console.debug("Track settings:");
            console.debug(JSON.stringify(audioTrack.getSettings(), null, 2));
            console.debug("Track constraints:");
            console.debug(JSON.stringify(audioTrack.getConstraints(), null, 2));
        }
    }
}
